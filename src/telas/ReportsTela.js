import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import FeedbackBanner from "../components/FeedbackBanner";
import HeaderApp from "../components/HeaderApp";
import PrimaryButton from "../components/PrimaryButton";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  indicadoresEstrategicosMock,
  previsaoEstrategica,
} from "../data/mockData";
import {
  selecionarMetricasRelatorios,
  selecionarSerieMensal,
} from "../domain/ocorrenciaSelectors";
import {
  colors,
  radius,
  shadow,
  spacing,
  typography,
  visualCriticidade,
} from "../theme";

export default function ReportsTela({ aoSair }) {
  const [resumoPreparado, setResumoPreparado] = useState(false);
  const [confirmarRestauracao, setConfirmarRestauracao] = useState(false);
  const {
    ocorrencias,
    carregando,
    processandoId,
    erro,
    feedback,
    recarregar,
    restaurarDemonstracao,
  } = useOcorrencias();

  const metricas = useMemo(
    () => selecionarMetricasRelatorios(ocorrencias),
    [ocorrencias],
  );
  const serieMensal = useMemo(
    () => selecionarSerieMensal(ocorrencias),
    [ocorrencias],
  );
  const maiorValor = Math.max(...serieMensal.map((item) => item.quantidade), 1);

  if (carregando) {
    return (
      <ContainerTela edges={["left", "right"]}>
        <HeaderApp titulo="Relatórios" aoSair={aoSair} />
        <EstadoConteudo tipo="carregando" titulo="Calculando indicadores" />
      </ContainerTela>
    );
  }

  async function confirmarReset() {
    const restaurado = await restaurarDemonstracao();

    if (restaurado) {
      setConfirmarRestauracao(false);
      setResumoPreparado(false);
    }
  }

  const kpis = [
    { rotulo: "Total", valor: metricas.total },
    { rotulo: "Resolvidas", valor: metricas.resolvidas },
    { rotulo: "Abertas", valor: metricas.abertas },
    { rotulo: "Taxa de resolução", valor: `${metricas.taxaResolucao}%` },
  ];

  const distribuicao = [
    { id: "critico", rotulo: "Críticas", valor: metricas.distribuicao.critico },
    { id: "atencao", rotulo: "Atenção", valor: metricas.distribuicao.atencao },
    { id: "moderado", rotulo: "Moderadas", valor: metricas.distribuicao.moderado },
  ];

  return (
    <ContainerTela edges={["left", "right"]}>
      <HeaderApp titulo="Relatórios" aoSair={aoSair} />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.subtitulo}>
          Indicadores estratégicos e conformidade operacional
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

        {metricas.total === 0 ? (
          <EstadoConteudo
            titulo="Sem dados para o relatório"
            mensagem="Adicione ocorrências ao cenário para calcular os indicadores."
          />
        ) : (
          <>
            <View style={styles.kpis}>
              {kpis.map((item, indice) => (
                <View
                  key={item.rotulo}
                  style={[
                    styles.kpiCelula,
                    indice % 2 === 0 && styles.kpiEsquerda,
                    indice < 2 && styles.kpiTopo,
                  ]}
                >
                  <Text style={styles.nomeIndicador}>{item.rotulo}</Text>
                  <Text style={styles.valor}>{item.valor}</Text>
                </View>
              ))}
            </View>

            <View style={styles.grafico}>
              <Text style={styles.tituloBloco}>Ocorrências detectadas por mês</Text>
              <View style={styles.barras}>
                {serieMensal.map((item) => (
                  <View key={item.mes} style={styles.coluna}>
                    <Text style={styles.quantidadeBarra}>{item.quantidade}</Text>
                    <View
                      style={[
                        styles.barra,
                        {
                          height: Math.max(
                            12,
                            (item.quantidade / maiorValor) * 88,
                          ),
                        },
                      ]}
                    />
                    <Text style={styles.mes}>{item.mes}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.distribuicao}>
              <Text style={styles.tituloBloco}>Distribuição atual</Text>
              <View style={styles.chips}>
                {distribuicao.map((item) => {
                  const visual = visualCriticidade(item.id);

                  return (
                    <View
                      key={item.id}
                      style={[styles.chip, { backgroundColor: visual.soft }]}
                    >
                      <View
                        style={[styles.ponto, { backgroundColor: visual.accent }]}
                      />
                      <Text style={[styles.textoChip, { color: visual.text }]}>
                        {item.rotulo}: {item.valor}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.estrategicosMock}>
              <Text style={styles.rotuloEstrategicos}>INDICADORES SIMULADOS</Text>
              <View style={styles.linhaEstrategicos}>
                <View style={styles.dadoSimulado}>
                  <Text style={styles.metaSimulado}>Redução de custos</Text>
                  <Text style={styles.valorSimulado}>
                    {indicadoresEstrategicosMock.reducaoCustos}
                  </Text>
                </View>
                <View style={styles.dadoSimulado}>
                  <Text style={styles.metaSimulado}>Eficiência</Text>
                  <Text style={styles.valorSimulado}>
                    {indicadoresEstrategicosMock.eficienciaOperacional}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardIa}>
              <Text style={styles.rotuloMock}>PREVISÃO SIMULADA</Text>
              <Text style={styles.textoIa}>{previsaoEstrategica}</Text>
            </View>

            <PrimaryButton onPress={() => setResumoPreparado(true)}>
              {resumoPreparado
                ? "Resumo de conformidade preparado"
                : "Preparar resumo de conformidade"}
            </PrimaryButton>

            {resumoPreparado ? (
              <View style={styles.previa}>
                <Text style={styles.tituloPrevia}>Prévia do relatório</Text>
                <Text style={styles.textoPrevia}>
                  {metricas.total} ocorrências monitoradas, {metricas.resolvidas}{" "}
                  resolvidas e taxa de resolução de {metricas.taxaResolucao}%.
                </Text>
              </View>
            ) : null}
          </>
        )}

        {!confirmarRestauracao ? (
          <Pressable
            style={({ pressed }) => [
              styles.linkRestaurar,
              pressed && styles.pressionado,
            ]}
            onPress={() => setConfirmarRestauracao(true)}
          >
            <Text style={styles.textoRestaurar}>Restaurar dados da demonstração</Text>
          </Pressable>
        ) : (
          <View style={styles.confirmacao}>
            <Text style={styles.textoConfirmacao}>
              Restaurar todas as alterações operacionais?
            </Text>
            <View style={styles.acoesConfirmacao}>
              <Pressable
                onPress={() => setConfirmarRestauracao(false)}
                style={styles.cancelarArea}
              >
                <Text style={styles.cancelar}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.botaoRestaurar,
                  pressed && styles.pressionado,
                ]}
                onPress={confirmarReset}
                disabled={processandoId === "restaurar"}
              >
                <Text style={styles.textoBotaoRestaurar}>
                  {processandoId === "restaurar" ? "Restaurando..." : "Restaurar"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  subtitulo: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 12,
  },
  kpis: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.md,
    overflow: "hidden",
    ...shadow.card,
  },
  kpiCelula: {
    width: "50%",
    minHeight: 84,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
    borderColor: colors.border,
  },
  kpiEsquerda: {
    borderRightWidth: 1,
  },
  kpiTopo: {
    borderBottomWidth: 1,
  },
  nomeIndicador: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  valor: {
    ...typography.kpi,
    color: colors.text,
    marginTop: 4,
  },
  grafico: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    marginTop: spacing.md,
    minHeight: 180,
  },
  tituloBloco: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: 12,
  },
  barras: {
    flex: 1,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  coluna: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  barra: {
    width: 14,
    backgroundColor: colors.brand,
    borderRadius: 7,
  },
  quantidadeBarra: {
    ...typography.meta,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  mes: {
    ...typography.meta,
    color: colors.textMuted,
    marginTop: 6,
  },
  distribuicao: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: spacing.md,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  textoChip: {
    ...typography.meta,
    fontWeight: "600",
  },
  estrategicosMock: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: spacing.md,
  },
  rotuloEstrategicos: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.brand,
    letterSpacing: 0.4,
  },
  linhaEstrategicos: {
    flexDirection: "row",
    marginTop: 10,
    gap: spacing.md,
  },
  dadoSimulado: {
    flex: 1,
  },
  metaSimulado: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  valorSimulado: {
    ...typography.cardTitle,
    color: colors.text,
    marginTop: 2,
  },
  cardIa: {
    backgroundColor: colors.brandSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.brandMuted,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: spacing.md,
  },
  rotuloMock: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.brand,
    letterSpacing: 0.4,
  },
  textoIa: {
    ...typography.body,
    color: colors.text,
    marginTop: 6,
  },
  previa: {
    backgroundColor: colors.successSoft,
    borderRadius: radius.sm,
    padding: 13,
    marginTop: spacing.sm,
  },
  tituloPrevia: {
    ...typography.sectionTitle,
    color: colors.text,
  },
  textoPrevia: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 5,
  },
  linkRestaurar: {
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  textoRestaurar: {
    ...typography.meta,
    color: colors.textMuted,
    textDecorationLine: "underline",
  },
  confirmacao: {
    backgroundColor: colors.criticalSoft,
    borderRadius: radius.sm,
    padding: 13,
    marginTop: spacing.md,
  },
  textoConfirmacao: {
    ...typography.meta,
    color: colors.criticalText,
    textAlign: "center",
  },
  acoesConfirmacao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cancelarArea: {
    minHeight: 40,
    justifyContent: "center",
    marginRight: 18,
  },
  cancelar: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  botaoRestaurar: {
    backgroundColor: colors.danger,
    borderRadius: radius.sm,
    minHeight: 36,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  textoBotaoRestaurar: {
    ...typography.meta,
    color: colors.textInverse,
    fontWeight: "600",
  },
  pressionado: {
    opacity: 0.84,
  },
});
