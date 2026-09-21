import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import HeaderApp from "../components/HeaderApp";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  CRITICIDADES,
  STATUS_OCORRENCIA,
  selecionarOcorrenciasPorFiltro,
} from "../domain/ocorrenciaSelectors";

const FILTROS = ["Todos", "Crítico", "Atenção", "Resolvido"];

function obterAcao(ocorrencia, acoes) {
  if (ocorrencia.status === "resolvida") {
    return null;
  }

  if (ocorrencia.status === "agendada") {
    return { rotulo: "Enviar equipe", executar: acoes.enviarEquipe };
  }

  if (ocorrencia.status === "equipe_enviada") {
    return {
      rotulo: "Iniciar atendimento",
      executar: acoes.iniciarAtendimento,
    };
  }

  if (ocorrencia.status === "em_atendimento") {
    return { rotulo: "Resolver ocorrência", executar: acoes.resolverOcorrencia };
  }

  if (ocorrencia.status === "nova" && ocorrencia.criticidade === "critico") {
    return { rotulo: "Enviar equipe", executar: acoes.enviarEquipe };
  }

  if (ocorrencia.status === "nova" && ocorrencia.criticidade === "atencao") {
    return { rotulo: "Agendar equipe", executar: acoes.agendarEquipe };
  }

  return null;
}

export default function AlertasTela({ navigation, route, aoSair }) {
  const [filtro, setFiltro] = useState(route?.params?.filtroInicial ?? "Todos");
  const {
    ocorrencias,
    carregando,
    processandoId,
    erro,
    feedback,
    recarregar,
    agendarEquipe,
    enviarEquipe,
    iniciarAtendimento,
    resolverOcorrencia,
  } = useOcorrencias();

  useEffect(() => {
    if (route?.params?.filtroInicial) {
      setFiltro(route.params.filtroInicial);
    }
  }, [route?.params?.filtroInicial]);

  const alertasFiltrados = useMemo(
    () => selecionarOcorrenciasPorFiltro(ocorrencias, filtro),
    [filtro, ocorrencias],
  );

  const acoes = {
    agendarEquipe,
    enviarEquipe,
    iniciarAtendimento,
    resolverOcorrencia,
  };

  if (carregando) {
    return (
      <ContainerTela>
        <HeaderApp titulo="Central de alertas" aoSair={aoSair} />
        <EstadoConteudo tipo="carregando" titulo="Carregando alertas" />
      </ContainerTela>
    );
  }

  function renderizarAlerta({ item: ocorrencia }) {
    const resolvida = ocorrencia.status === "resolvida";
    const criticidade = CRITICIDADES[ocorrencia.criticidade];
    const acao = obterAcao(ocorrencia, acoes);
    const processando = processandoId === ocorrencia.id;
    const algumaAcaoEmAndamento = Boolean(processandoId);
    const cor = resolvida ? "#16A94F" : criticidade.cor;

    return (
      <View style={[styles.card, { backgroundColor: cor }]}>
        <View style={styles.cardTopo}>
          <Text style={styles.tituloCard}>
            KM {ocorrencia.km} - {ocorrencia.titulo}
          </Text>

          <View style={styles.selo}>
            <Text style={styles.textoSelo}>
              {resolvida ? "Resolvida" : criticidade.rotulo}
            </Text>
          </View>
        </View>

        <Text style={styles.descricao}>{ocorrencia.descricao}</Text>
        <Text style={styles.status}>{STATUS_OCORRENCIA[ocorrencia.status]}</Text>

        <View style={styles.areaAcoes}>
          <Pressable
            style={styles.linkDetalhe}
            onPress={() =>
              navigation.navigate("DetalheOcorrencia", {
                ocorrenciaId: ocorrencia.id,
              })
            }
          >
            <Text style={styles.textoDetalhe}>Ver detalhes</Text>
          </Pressable>

          {acao ? (
            <Pressable
              style={[
                styles.botaoAcao,
                algumaAcaoEmAndamento && styles.botaoDesabilitado,
              ]}
              onPress={() => acao.executar(ocorrencia.id)}
              disabled={algumaAcaoEmAndamento}
            >
              <Text style={styles.textoAcao}>
                {processando ? "Salvando..." : acao.rotulo}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <ContainerTela>
      <HeaderApp titulo="Central de alertas" aoSair={aoSair} />

      <FlatList
        data={alertasFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderizarAlerta}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <View>
            <Text style={styles.subtitulo}>
              Monitoramento operacional em tempo real
            </Text>

            {erro ? (
              <EstadoConteudo
                tipo="erro"
                titulo="Atenção"
                mensagem={erro}
                textoAcao="Tentar novamente"
                aoPressionar={recarregar}
                compacto
              />
            ) : null}

            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

            <View style={styles.filtros}>
              {FILTROS.map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.botaoFiltro,
                    filtro === item && styles.filtroAtivo,
                  ]}
                  onPress={() => setFiltro(item)}
                >
                  <Text
                    style={[
                      styles.textoFiltro,
                      filtro === item && styles.textoFiltroAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={
          <EstadoConteudo
            titulo="Nenhum alerta"
            mensagem="Não há ocorrências nessa categoria."
          />
        }
      />
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  lista: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  subtitulo: {
    color: "#666666",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 12,
  },
  feedback: {
    color: "#087A36",
    backgroundColor: "#E6F7ED",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  filtros: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 18,
  },
  botaoFiltro: {
    minWidth: 70,
    height: 29,
    backgroundColor: "#DADADA",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  filtroAtivo: { backgroundColor: "#5D20F5" },
  textoFiltro: { color: "#777777", fontSize: 11, fontWeight: "bold" },
  textoFiltroAtivo: { color: "#FFFFFF" },
  card: {
    minHeight: 150,
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    elevation: 6,
  },
  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tituloCard: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  selo: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  textoSelo: { color: "#FFFFFF", fontSize: 11, fontWeight: "bold" },
  descricao: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 9,
    width: "85%",
  },
  status: { color: "#FFFFFF", fontSize: 11, marginTop: 7 },
  areaAcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  linkDetalhe: { paddingVertical: 7, paddingRight: 10 },
  textoDetalhe: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
  botaoAcao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  botaoDesabilitado: { opacity: 0.65 },
  textoAcao: { color: "#111111", fontSize: 12, fontWeight: "bold" },
});
