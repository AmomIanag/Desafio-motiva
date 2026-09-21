import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";

import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import HeaderApp from "../components/HeaderApp";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  CRITICIDADES,
  STATUS_OCORRENCIA,
  selecionarOcorrenciasDoMapa,
} from "../domain/ocorrenciaSelectors";

export default function TelaMapa({ navigation, aoSair }) {
  const { ocorrencias, carregando, erro, recarregar } = useOcorrencias();
  const [estadoLocalizacao, setEstadoLocalizacao] = useState("carregando");
  const pontosMapa = useMemo(
    () => selecionarOcorrenciasDoMapa(ocorrencias),
    [ocorrencias],
  );

  useEffect(() => {
    async function pedirLocalizacao() {
      try {
        const permissao = await Location.requestForegroundPermissionsAsync();
        setEstadoLocalizacao(
          permissao.status === "granted" ? "permitida" : "negada",
        );
      } catch {
        setEstadoLocalizacao("erro");
      }
    }

    pedirLocalizacao();
  }, []);

  function abrirDetalhe(item) {
    navigation.navigate("DetalheOcorrencia", {
      ocorrenciaId: item.id,
    });
  }

  if (carregando) {
    return (
      <ContainerTela>
        <HeaderApp titulo="Mapa" aoSair={aoSair} />
        <EstadoConteudo tipo="carregando" titulo="Carregando mapa" />
      </ContainerTela>
    );
  }

  return (
    <ContainerTela>
      <HeaderApp titulo="Mapa" aoSair={aoSair} />

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

        <View style={styles.avisoLocalizacao}>
          {estadoLocalizacao === "carregando" ? (
            <ActivityIndicator size="small" color="#5D20F5" />
          ) : (
            <Text style={styles.textoLocalizacao}>
              {estadoLocalizacao === "permitida"
                ? "Localização permitida. Mapa demonstrativo ativo."
                : estadoLocalizacao === "negada"
                  ? "Localização negada. O mapa demonstrativo continua disponível."
                  : "Não foi possível consultar a localização. Mapa demonstrativo ativo."}
            </Text>
          )}
        </View>

      <Image
        source={require("../../assets/mapa.png")}
        style={styles.mapa}
        resizeMode="cover"
      />

      <View style={styles.areaCards}>
        {pontosMapa.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => abrirDetalhe(item)}
          >
            <Text style={styles.km}>KM {item.km}</Text>

            <Text style={styles.descricao}>
              {item.titulo}
            </Text>

            <Text
              style={[
                styles.status,
                { color: CRITICIDADES[item.criticidade].cor },
              ]}
            >
              {STATUS_OCORRENCIA[item.status]}
            </Text>

            <Text style={styles.link}>Ver detalhes</Text>
          </Pressable>
        ))}
      </View>

        {pontosMapa.length === 0 ? (
          <EstadoConteudo
            titulo="Nenhum ponto em destaque"
            mensagem="Não há ocorrências selecionadas para o mapa neste cenário."
          />
        ) : null}
      </ScrollView>
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 28,
  },

  avisoLocalizacao: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 14,
    marginHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#F2EDFF",
    borderRadius: 12,
  },

  textoLocalizacao: {
    color: "#5D20F5",
    fontSize: 11,
    textAlign: "center",
  },

  mapa: {
    width: "100%",
    height: 194,
  },

  areaCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 36,
  },

  card: {
    width: "31%",
    minHeight: 112,
    backgroundColor: "#DEDEDE",
    borderRadius: 15,
    paddingHorizontal: 7,
    paddingVertical: 13,
    elevation: 7,
  },

  km: {
    color: "#858585",
    fontSize: 12,
  },

  descricao: {
    color: "#858585",
    fontSize: 11,
    marginTop: 4,
  },

  status: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },

  link: {
    color: "#858585",
    fontSize: 10,
    marginTop: 5,
  },
});
