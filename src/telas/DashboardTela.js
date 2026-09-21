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
import EstadoConteudo from "../components/EstadoConteudo";
import HeaderApp from "../components/HeaderApp";
import { periodoClimatico } from "../data/mockData";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  CRITICIDADES,
  selecionarContagemPorCriticidade,
  selecionarDestaqueMonitoramento,
} from "../domain/ocorrenciaSelectors";

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
      <ContainerTela>
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
    <ContainerTela>
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
          <View>
            <Text style={styles.tituloPeriodo}>
              Período: {periodoClimatico.nome}
            </Text>

            <Text style={styles.textoPeriodo}>
              {periodoClimatico.descricao}
            </Text>
          </View>

          <View style={styles.iconeClima}>
            <Ionicons
            name="rainy-outline"
            size={43}
            color="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.indicadores}>
          {indicadores.map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.cardIndicador,
                { backgroundColor: item.cor },
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
              <Text style={styles.quantidade}>
                {item.quantidade}
              </Text>

              <Text style={styles.nomeIndicador}>
                {item.rotulo}
              </Text>
            </Pressable>
          ))}
        </View>

        {destaque ? (
          <Pressable
            style={styles.monitoramento}
            onPress={() =>
              navigation.navigate("DetalheOcorrencia", {
                ocorrenciaId: destaque.id,
              })
            }
          >
          <View style={styles.monitoramentoHeader}>
            <Text style={styles.monitoramentoTitulo}>
              Monitoramento Inteligente
            </Text>

            <Text style={styles.ia}>● IA Ativa</Text>
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

              <Text style={styles.descricao}>
                {destaque.titulo}
              </Text>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 28,
  },

  cardPeriodo: {
    height: 95,
    backgroundColor: "#5D20F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  tituloPeriodo: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  textoPeriodo: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 6,
  },

  iconeClima: {
    width: 53,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
  },

  indicadores: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  cardIndicador: {
    width: "30%",
    height: 77,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  quantidade: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  nomeIndicador: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  monitoramento: {
    height: 138,
    backgroundColor: "#DADADA",
    borderRadius: 20,
    marginTop: 31,
    padding: 13,
  },

  monitoramentoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  monitoramentoTitulo: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "bold",
  },

  ia: {
    color: "#16B957",
    fontSize: 11,
    fontWeight: "bold",
  },

  monitoramentoConteudo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  imagem: {
    width: 80,
    height: 70,
    borderRadius: 14,
  },

  informacoes: {
    marginLeft: 16,
  },

  drone: {
    fontSize: 13,
    fontWeight: "bold",
  },

  descricao: {
    color: "#555555",
    fontSize: 12,
    marginTop: 6,
  },
});
