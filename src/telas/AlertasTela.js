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
import FeedbackBanner from "../components/FeedbackBanner";
import HeaderApp from "../components/HeaderApp";
import OccurrenceCard from "../components/OccurrenceCard";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { selecionarOcorrenciasPorFiltro } from "../domain/ocorrenciaSelectors";
import { colors, radius, spacing, typography } from "../theme";

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
      <ContainerTela edges={["left", "right"]}>
        <HeaderApp titulo="Central de alertas" aoSair={aoSair} />
        <EstadoConteudo tipo="carregando" titulo="Carregando alertas" />
      </ContainerTela>
    );
  }

  function renderizarAlerta({ item: ocorrencia }) {
    const acao = obterAcao(ocorrencia, acoes);
    const processando = processandoId === ocorrencia.id;
    const algumaAcaoEmAndamento = Boolean(processandoId);

    return (
      <OccurrenceCard
        ocorrencia={ocorrencia}
        mostrarDescricao
        onPressDetalhe={() =>
          navigation.navigate("DetalheOcorrencia", {
            ocorrenciaId: ocorrencia.id,
          })
        }
        acao={acao}
        processando={processando}
        acaoDesabilitada={algumaAcaoEmAndamento}
      />
    );
  }

  return (
    <ContainerTela edges={["left", "right"]}>
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

            <FeedbackBanner mensagem={feedback} />

            <View style={styles.filtros}>
              {FILTROS.map((item) => (
                <Pressable
                  key={item}
                  android_ripple={{ color: colors.brandMuted }}
                  style={({ pressed }) => [
                    styles.botaoFiltro,
                    filtro === item && styles.filtroAtivo,
                    pressed && styles.pressionado,
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  subtitulo: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 12,
  },
  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  botaoFiltro: {
    minHeight: 36,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  filtroAtivo: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  textoFiltro: {
    ...typography.meta,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  textoFiltroAtivo: {
    color: colors.textInverse,
  },
  pressionado: {
    opacity: 0.84,
  },
});
