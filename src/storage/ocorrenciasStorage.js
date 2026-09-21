import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_OCORRENCIAS = "@motiva_ocorrencias_v1";
const VERSAO_ATUAL = 1;

// Altere apenas durante QA manual para validar que a interface não exibe falso sucesso.
export const SIMULAR_FALHA_PERSISTENCIA = false;

export async function buscarAlteracoesOcorrencias() {
  const conteudo = await AsyncStorage.getItem(CHAVE_OCORRENCIAS);

  if (!conteudo) {
    return { alteracoes: {}, aviso: null };
  }

  try {
    const dados = JSON.parse(conteudo);

    if (
      dados?.versao !== VERSAO_ATUAL ||
      !dados.alteracoes ||
      typeof dados.alteracoes !== "object" ||
      Array.isArray(dados.alteracoes)
    ) {
      return {
        alteracoes: {},
        aviso: "Dados operacionais incompatíveis foram ignorados.",
      };
    }

    return { alteracoes: dados.alteracoes, aviso: null };
  } catch {
    return {
      alteracoes: {},
      aviso: "Dados operacionais inválidos foram ignorados.",
    };
  }
}

export async function salvarAlteracoesOcorrencias(alteracoes) {
  if (SIMULAR_FALHA_PERSISTENCIA) {
    throw new Error("Falha simulada de escrita.");
  }

  const dados = JSON.stringify({
    versao: VERSAO_ATUAL,
    alteracoes,
  });

  await AsyncStorage.setItem(CHAVE_OCORRENCIAS, dados);
}

export async function removerAlteracoesOcorrencias() {
  await AsyncStorage.removeItem(CHAVE_OCORRENCIAS);
}
