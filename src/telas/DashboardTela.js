import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import ContainerTela from "../components/ContainerTela";
import CriticidadeBadge from "../components/CriticidadeBadge";
import EstadoConteudo from "../components/EstadoConteudo";
import HeaderApp from "../components/HeaderApp";
import StatusBadge from "../components/StatusBadge";
import { periodoClimatico } from "../data/mockData";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  CRITICIDADES,
  selecionarContagemPorCriticidade,
  selecionarDestaqueMonitoramento,
} from "../domain/ocorrenciaSelectors";
import {
  colors,
  radius,
  shadow,
  spacing,
  typography,
  visualCriticidade,
} from "../theme";

export default function DashboardTela({ navigation, aoSair }) {
  const { ocorrencias, carregando, erro, recarregar } = useOcorrencias();

  const contagem = useMemo(
    () => selecionarContagemPorCriticidade(ocorrencias),
    [ocorrencias],
  );
  const destaque = useMemo(
    () => selecionarDestaqueMonitoramento(ocorrencias),
    [ocorrencias],
  );
  const indicadores = [
    { id: "critico", quantidade: contagem.critico, ...CRITICIDADES.critico },
    { id: "atencao", quantidade: contagem.atencao, ...CRITICIDADES.atencao },
    { id: "moderado", quantidade: contagem.moderado, ...CRITICIDADES.moderado },
  ];

  if (carregando) {
    return (
      <ContainerTela edges={["left", "right"]}>
        <HeaderApp titulo="Dashboard" aoSair={aoSair} />
        <EstadoConteudo
          tipo="carregando"
          titulo="Carregando monitoramento"
          mensagem="Recuperando as informações operacionais."
        />
      </ContainerTela>
    );
  }

  return (
    <ContainerTela edges={["left", "right"]}>
      <HeaderApp titulo="Dashboard" aoSair={aoSair} />

      <ScrollView contentContainerStyle={styles.conteudo}>
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

        {ocorrencias.length === 0 ? (
          <EstadoConteudo
            titulo="Nenhuma ocorrência"
            mensagem="Não há trechos monitorados neste cenário."
          />
        ) : (
          <>
            <View style={styles.cardPeriodo}>
              <View style={styles.iconeClima}>
                <Ionicons
                  name="rainy-outline"
                  size={22}
                  color={colors.brand}
                />
              </View>

              <View style={styles.textoClima}>
                <Text style={styles.tituloPeriodo}>
                  Período: {periodoClimatico.nome}
                </Text>
                <Text style={styles.textoPeriodo}>
                  {periodoClimatico.descricao}
                </Text>
              </View>
            </View>

            <View style={styles.visaoGeral}>
              <Text style={styles.secaoTitulo}>Visão geral</Text>

              <View style={styles.indicadores}>
                {indicadores.map((item, indice) => {
                  const visual = visualCriticidade(item.id);

                  return (
                    <Pressable
                      key={item.id}
                      android_ripple={{ color: colors.brandSoft }}
                      style={({ pressed }) => [
                        styles.cardIndicador,
                        indice < indicadores.length - 1 && styles.indicadorDivisor,
                        pressed && styles.pressionado,
                      ]}
                      onPress={() =>
                        navigation.navigate("Alertas", {
                          filtroInicial:
                            item.id === "critico"
                              ? "Crítico"
                              : item.id === "atencao"
                                ? "Atenção"
                                : "Todos",
                        })
                      }
                    >
                      <View
                        style={[styles.ponto, { backgroundColor: visual.accent }]}
                      />
                      <Text style={styles.quantidade}>{item.quantidade}</Text>
                      <Text style={styles.nomeIndicador}>{item.rotulo}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {destaque ? (
              <Pressable
                style={({ pressed }) => [
                  styles.monitoramento,
                  pressed && styles.pressionado,
                ]}
                android_ripple={{ color: colors.brandSoft }}
                onPress={() =>
                  navigation.navigate("DetalheOcorrencia", {
                    ocorrenciaId: destaque.id,
                  })
                }
              >
                <View style={styles.monitoramentoHeader}>
                  <Text style={styles.secaoTitulo}>Monitoramento</Text>
                  <Text style={styles.ia}>IA ativa</Text>
                </View>

                <View style={styles.monitoramentoConteudo}>
                  <Image
                    source={destaque.imagem}
                    style={styles.imagem}
                  />

                  <View style={styles.informacoes}>
                    <Text style={styles.drone}>
                      {destaque.origem} · KM {destaque.km}
                    </Text>
                    <Text style={styles.descricao} numberOfLines={2}>
                      {destaque.titulo}
                    </Text>
                    <View style={styles.selos}>
                      <CriticidadeBadge criticidade={destaque.criticidade} />
                      <StatusBadge status={destaque.status} />
                    </View>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textMuted}
                  />
                </View>
              </Pressable>
            ) : null}
          </>
        )}
      </ScrollView>
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  cardPeriodo: {
    backgroundColor: colors.brandSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.brandMuted,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  iconeClima: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textoClima: {
    flex: 1,
  },
  tituloPeriodo: {
    ...typography.sectionTitle,
    color: colors.text,
  },
  textoPeriodo: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 2,
  },
  visaoGeral: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: spacing.md,
    ...shadow.card,
  },
  secaoTitulo: {
    ...typography.sectionTitle,
    color: colors.text,
  },
  indicadores: {
    flexDirection: "row",
    marginTop: 12,
  },
  cardIndicador: {
    flex: 1,
    alignItems: "center",
    minHeight: 72,
    justifyContent: "center",
    paddingVertical: spacing.sm,
  },
  indicadorDivisor: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  quantidade: {
    ...typography.kpi,
    color: colors.text,
  },
  nomeIndicador: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 2,
  },
  monitoramento: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.md,
    padding: 14,
    ...shadow.card,
  },
  monitoramentoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ia: {
    ...typography.meta,
    color: colors.moderateText,
    fontWeight: "600",
  },
  monitoramentoConteudo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  imagem: {
    width: 72,
    height: 72,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted,
  },
  informacoes: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  drone: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  descricao: {
    ...typography.cardTitle,
    fontSize: 15,
    color: colors.text,
    marginTop: 4,
  },
  selos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  pressionado: {
    opacity: 0.86,
  },
});
