import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";

import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import HeaderApp from "../components/HeaderApp";
import OccurrenceCard from "../components/OccurrenceCard";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { selecionarOcorrenciasDoMapa } from "../domain/ocorrenciaSelectors";
import { colors, radius, spacing, typography } from "../theme";

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
      <ContainerTela edges={["left", "right"]}>
        <HeaderApp titulo="Mapa" aoSair={aoSair} />
        <EstadoConteudo tipo="carregando" titulo="Carregando mapa" />
      </ContainerTela>
    );
  }

  return (
    <ContainerTela edges={["left", "right"]}>
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
            <ActivityIndicator size="small" color={colors.brand} />
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

        <View style={styles.mapaMoldura}>
          <Image
            source={require("../../assets/mapa.png")}
            style={styles.mapa}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.secaoTitulo}>Ocorrências em destaque</Text>

        {pontosMapa.map((item) => (
          <OccurrenceCard
            key={item.id}
            ocorrencia={item}
            onPress={() => abrirDetalhe(item)}
          />
        ))}

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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  avisoLocalizacao: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.brandSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.brandMuted,
  },
  textoLocalizacao: {
    ...typography.meta,
    color: colors.brand,
    textAlign: "center",
  },
  mapaMoldura: {
    height: 240,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.surfaceMuted,
    marginBottom: spacing.lg,
  },
  mapa: {
    width: "100%",
    height: "100%",
  },
  secaoTitulo: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: 12,
  },
});
