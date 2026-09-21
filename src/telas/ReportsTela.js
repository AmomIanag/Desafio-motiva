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
import HeaderApp from "../components/HeaderApp";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  indicadoresEstrategicosMock,
  previsaoEstrategica,
} from "../data/mockData";
import {
  selecionarMetricasRelatorios,
  selecionarSerieMensal,
} from "../domain/ocorrenciaSelectors";

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
      <ContainerTela>
        <HeaderApp titulo="Relatórios & ROI" aoSair={aoSair} />
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

  return (
    <ContainerTela>
      <HeaderApp titulo="Relatórios & ROI" aoSair={aoSair} />

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

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

        {metricas.total === 0 ? (
          <EstadoConteudo
            titulo="Sem dados para o relatório"
            mensagem="Adicione ocorrências ao cenário para calcular os indicadores."
          />
        ) : (
          <>
            <View style={styles.indicadores}>
              <View style={styles.cardIndicador}>
                <Text style={styles.nomeIndicador}>Total</Text>
                <Text style={styles.valor}>{metricas.total}</Text>
              </View>
              <View style={styles.cardIndicador}>
                <Text style={styles.nomeIndicador}>Resolvidas</Text>
                <Text style={styles.valor}>{metricas.resolvidas}</Text>
              </View>
              <View style={styles.cardIndicador}>
                <Text style={styles.nomeIndicador}>Abertas</Text>
                <Text style={styles.valor}>{metricas.abertas}</Text>
              </View>
              <View style={styles.cardIndicador}>
                <Text style={styles.nomeIndicador}>Taxa de resolução</Text>
                <Text style={styles.valor}>{metricas.taxaResolucao}%</Text>
              </View>
            </View>

            <View style={styles.grafico}>
              <Text style={styles.tituloGrafico}>Ocorrências detectadas por mês</Text>
              <View style={styles.barras}>
                {serieMensal.map((item) => (
                  <View key={item.mes} style={styles.coluna}>
                    <Text style={styles.quantidadeBarra}>{item.quantidade}</Text>
                    <View
                      style={[
                        styles.barra,
                        { height: 20 + (item.quantidade / maiorValor) * 75 },
                      ]}
                    />
                    <Text style={styles.mes}>{item.mes}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.distribuicao}>
              <Text style={styles.tituloDistribuicao}>Distribuição atual</Text>
              <Text style={styles.textoDistribuicao}>
                Críticas: {metricas.distribuicao.critico} · Atenção:{" "}
                {metricas.distribuicao.atencao} · Moderadas:{" "}
                {metricas.distribuicao.moderado}
              </Text>
            </View>

            <View style={styles.estrategicosMock}>
              <Text style={styles.rotuloEstrategicos}>INDICADORES SIMULADOS</Text>
              <View style={styles.linhaEstrategicos}>
                <Text style={styles.textoEstrategico}>
                  Redução de custos {indicadoresEstrategicosMock.reducaoCustos}
                </Text>
                <Text style={styles.textoEstrategico}>
                  Eficiência {indicadoresEstrategicosMock.eficienciaOperacional}
                </Text>
              </View>
            </View>

            <View style={styles.cardIa}>
              <Text style={styles.rotuloMock}>PREVISÃO SIMULADA</Text>
              <Text style={styles.textoIa}>{previsaoEstrategica}</Text>
            </View>

            <Pressable
              style={[
                styles.botaoResumo,
                resumoPreparado && styles.botaoSucesso,
              ]}
              onPress={() => setResumoPreparado(true)}
            >
              <Text style={styles.textoResumo}>
                {resumoPreparado
                  ? "✓ Resumo de conformidade preparado"
                  : "Preparar resumo de conformidade"}
              </Text>
            </Pressable>

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
            style={styles.linkRestaurar}
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
              <Pressable onPress={() => setConfirmarRestauracao(false)}>
                <Text style={styles.cancelar}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.botaoRestaurar}
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
  conteudo: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 35 },
  subtitulo: {
    color: "#666666",
    fontSize: 12,
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
  indicadores: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cardIndicador: {
    width: "48%",
    height: 76,
    backgroundColor: "#DDDDDD",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginBottom: 12,
  },
  nomeIndicador: { color: "#111111", fontSize: 12, fontWeight: "bold" },
  valor: { color: "#13A84D", fontSize: 25, fontWeight: "bold", marginTop: 3 },
  grafico: {
    height: 170,
    marginTop: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingTop: 26,
  },
  tituloGrafico: {
    position: "absolute",
    top: 0,
    left: 8,
    color: "#666666",
    fontSize: 11,
    fontWeight: "bold",
  },
  barras: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  coluna: { alignItems: "center", justifyContent: "flex-end" },
  barra: { width: 10, backgroundColor: "#9BCFEB", borderRadius: 5 },
  quantidadeBarra: { color: "#777777", fontSize: 9, marginBottom: 3 },
  mes: { color: "#999999", fontSize: 9, marginTop: 5 },
  distribuicao: {
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    padding: 13,
    marginTop: 15,
  },
  tituloDistribuicao: { color: "#222222", fontSize: 13, fontWeight: "bold" },
  textoDistribuicao: { color: "#666666", fontSize: 12, marginTop: 5 },
  estrategicosMock: {
    backgroundColor: "#F3EEFF",
    borderRadius: 16,
    padding: 13,
    marginTop: 12,
  },
  rotuloEstrategicos: { color: "#6B38C4", fontSize: 9, fontWeight: "bold" },
  linhaEstrategicos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 6,
  },
  textoEstrategico: { color: "#333333", fontSize: 12, fontWeight: "bold" },
  cardIa: {
    minHeight: 84,
    backgroundColor: "#7430E8",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginTop: 16,
  },
  rotuloMock: { color: "#DCCEFF", fontSize: 9, fontWeight: "bold" },
  textoIa: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold", marginTop: 4 },
  botaoResumo: {
    minHeight: 47,
    backgroundColor: "#5B20BE",
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 17,
  },
  botaoSucesso: { backgroundColor: "#16A94F" },
  textoResumo: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  previa: {
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    padding: 13,
    marginTop: 10,
  },
  tituloPrevia: { color: "#333333", fontSize: 13, fontWeight: "bold" },
  textoPrevia: { color: "#666666", fontSize: 12, marginTop: 5 },
  linkRestaurar: { alignItems: "center", paddingVertical: 14, marginTop: 15 },
  textoRestaurar: { color: "#777777", fontSize: 11, textDecorationLine: "underline" },
  confirmacao: {
    backgroundColor: "#FFF4F4",
    borderRadius: 14,
    padding: 13,
    marginTop: 16,
  },
  textoConfirmacao: { color: "#7A271A", fontSize: 12, textAlign: "center" },
  acoesConfirmacao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cancelar: { color: "#666666", fontSize: 12, marginRight: 18 },
  botaoRestaurar: {
    backgroundColor: "#B42318",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  textoBotaoRestaurar: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
});
