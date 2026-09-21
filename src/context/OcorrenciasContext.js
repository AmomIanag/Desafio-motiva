import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import { cenariosMock, ocorrenciasIniciais } from "../data/mockData";
import {
  buscarAlteracoesOcorrencias,
  removerAlteracoesOcorrencias,
  salvarAlteracoesOcorrencias,
} from "../storage/ocorrenciasStorage";

// Altere apenas durante testes manuais: "padrao", "vazio" ou "erro".
export const CENARIO_MOCK_ATIVO = "padrao";

const OcorrenciasContext = createContext(null);

const estadoInicial = {
  ocorrencias: [],
  alteracoes: {},
  carregando: true,
  processandoId: null,
  erro: null,
  feedback: null,
};

function aplicarPatches(baseline, alteracoes) {
  const statusValidos = [
    "nova",
    "agendada",
    "equipe_enviada",
    "em_atendimento",
    "resolvida",
  ];

  return baseline.map((ocorrencia) => {
    const patch = alteracoes[ocorrencia.id];

    if (!patch || typeof patch !== "object") {
      return ocorrencia;
    }

    return {
      ...ocorrencia,
      status: statusValidos.includes(patch.status)
        ? patch.status
        : ocorrencia.status,
      resolvidaEm:
        typeof patch.resolvidaEm === "string" || patch.resolvidaEm === null
          ? patch.resolvidaEm
          : ocorrencia.resolvidaEm,
      equipe:
        patch.equipe === null ||
        (typeof patch.equipe === "object" && !Array.isArray(patch.equipe))
          ? patch.equipe
          : ocorrencia.equipe,
    };
  });
}

function reducer(estado, acao) {
  switch (acao.type) {
    case "CARREGAR":
      return { ...estado, carregando: true, erro: null };
    case "HIDRATAR":
      return {
        ...estado,
        ocorrencias: acao.ocorrencias,
        alteracoes: acao.alteracoes,
        carregando: false,
        erro: acao.aviso,
      };
    case "FALHA_HIDRATACAO":
      return {
        ...estado,
        ocorrencias: acao.ocorrencias,
        alteracoes: {},
        carregando: false,
        erro: acao.mensagem,
      };
    case "PROCESSAR":
      return {
        ...estado,
        processandoId: acao.id,
        feedback: null,
      };
    case "TRANSICAO_CONCLUIDA":
      return {
        ...estado,
        ocorrencias: estado.ocorrencias.map((item) =>
          item.id === acao.ocorrencia.id ? acao.ocorrencia : item,
        ),
        alteracoes: acao.alteracoes,
        processandoId: null,
        erro: null,
        feedback: acao.feedback,
      };
    case "FALHA_OPERACAO":
      return {
        ...estado,
        processandoId: null,
        erro: acao.mensagem,
        feedback: null,
      };
    case "RESTAURAR":
      return {
        ...estadoInicial,
        ocorrencias: acao.ocorrencias,
        alteracoes: {},
        carregando: false,
        feedback: "Dados da demonstração restaurados.",
      };
    case "LIMPAR_FEEDBACK":
      return { ...estado, feedback: null };
    default:
      return estado;
  }
}

function criarTransicao(ocorrencia, evento) {
  const agora = new Date().toISOString();

  if (evento === "AGENDAR_EQUIPE") {
    if (ocorrencia.criticidade !== "atencao" || ocorrencia.status !== "nova") {
      return null;
    }

    return {
      ...ocorrencia,
      status: "agendada",
      equipe: {
        nome: "Equipe programada",
        agendadaPara: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        acionadaEm: null,
      },
    };
  }

  if (evento === "ENVIAR_EQUIPE") {
    const podeEnviar =
      (ocorrencia.criticidade === "critico" && ocorrencia.status === "nova") ||
      ocorrencia.status === "agendada";

    if (!podeEnviar) {
      return null;
    }

    return {
      ...ocorrencia,
      status: "equipe_enviada",
      equipe: {
        nome: ocorrencia.equipe?.nome ?? "Equipe operacional",
        agendadaPara: ocorrencia.equipe?.agendadaPara ?? null,
        acionadaEm: agora,
      },
    };
  }

  if (evento === "INICIAR_ATENDIMENTO") {
    if (ocorrencia.status !== "equipe_enviada") {
      return null;
    }

    return { ...ocorrencia, status: "em_atendimento" };
  }

  if (evento === "RESOLVER_OCORRENCIA") {
    if (ocorrencia.status !== "em_atendimento") {
      return null;
    }

    return { ...ocorrencia, status: "resolvida", resolvidaEm: agora };
  }

  return null;
}

function criarPatch(ocorrencia) {
  return {
    status: ocorrencia.status,
    resolvidaEm: ocorrencia.resolvidaEm,
    equipe: ocorrencia.equipe,
  };
}

export function OcorrenciasProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);
  const falhaMockConsumida = useRef(false);

  const baseline = useMemo(
    () => cenariosMock[CENARIO_MOCK_ATIVO] ?? ocorrenciasIniciais,
    [],
  );

  const carregar = useCallback(async () => {
    dispatch({ type: "CARREGAR" });

    try {
      if (CENARIO_MOCK_ATIVO === "erro" && !falhaMockConsumida.current) {
        falhaMockConsumida.current = true;
        throw new Error("Falha simulada de hidratação.");
      }

      const { alteracoes, aviso } = await buscarAlteracoesOcorrencias();

      if (aviso) {
        await removerAlteracoesOcorrencias();
      }

      dispatch({
        type: "HIDRATAR",
        ocorrencias: aplicarPatches(baseline, alteracoes),
        alteracoes,
        aviso,
      });
    } catch {
      dispatch({
        type: "FALHA_HIDRATACAO",
        ocorrencias: baseline,
        mensagem: "Não foi possível carregar as alterações salvas.",
      });
    }
  }, [baseline]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const executarTransicao = useCallback(
    async (id, evento) => {
      if (estado.processandoId) {
        return false;
      }

      const atual = estado.ocorrencias.find((item) => item.id === id);

      if (!atual) {
        dispatch({
          type: "FALHA_OPERACAO",
          mensagem: "Ocorrência não encontrada.",
        });
        return false;
      }

      const atualizada = criarTransicao(atual, evento);

      if (!atualizada) {
        dispatch({
          type: "FALHA_OPERACAO",
          mensagem: "Esta ação não está disponível para o status atual.",
        });
        return false;
      }

      dispatch({ type: "PROCESSAR", id });
      const alteracoes = {
        ...estado.alteracoes,
        [id]: criarPatch(atualizada),
      };

      try {
        await salvarAlteracoesOcorrencias(alteracoes);
        dispatch({
          type: "TRANSICAO_CONCLUIDA",
          ocorrencia: atualizada,
          alteracoes,
          feedback: "Ação registrada com sucesso.",
        });
        return true;
      } catch {
        dispatch({
          type: "FALHA_OPERACAO",
          mensagem: "Não foi possível salvar a alteração. Tente novamente.",
        });
        return false;
      }
    },
    [estado.alteracoes, estado.ocorrencias, estado.processandoId],
  );

  const restaurarDemonstracao = useCallback(async () => {
    dispatch({ type: "PROCESSAR", id: "restaurar" });

    try {
      await removerAlteracoesOcorrencias();
      dispatch({ type: "RESTAURAR", ocorrencias: ocorrenciasIniciais });
      return true;
    } catch {
      dispatch({
        type: "FALHA_OPERACAO",
        mensagem: "Não foi possível restaurar os dados da demonstração.",
      });
      return false;
    }
  }, []);

  const valor = useMemo(
    () => ({
      ...estado,
      agendarEquipe: (id) => executarTransicao(id, "AGENDAR_EQUIPE"),
      enviarEquipe: (id) => executarTransicao(id, "ENVIAR_EQUIPE"),
      iniciarAtendimento: (id) =>
        executarTransicao(id, "INICIAR_ATENDIMENTO"),
      resolverOcorrencia: (id) =>
        executarTransicao(id, "RESOLVER_OCORRENCIA"),
      restaurarDemonstracao,
      recarregar: carregar,
      limparFeedback: () => dispatch({ type: "LIMPAR_FEEDBACK" }),
    }),
    [carregar, estado, executarTransicao, restaurarDemonstracao],
  );

  return (
    <OcorrenciasContext.Provider value={valor}>
      {children}
    </OcorrenciasContext.Provider>
  );
}

export function useOcorrencias() {
  const contexto = useContext(OcorrenciasContext);

  if (!contexto) {
    throw new Error("useOcorrencias deve ser usado dentro de OcorrenciasProvider.");
  }

  return contexto;
}
