import React from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { selecionarOcorrenciaPorId } from "../domain/ocorrenciaSelectors";
import { colors, spacing, typography } from "../theme";

function formatarData(valor) {
  if (!valor) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(valor));
}

export default function DroneImagemTela({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { ocorrencias, carregando } = useOcorrencias();
  const ocorrenciaId = route?.params?.ocorrenciaId;
  const ocorrencia = selecionarOcorrenciaPorId(ocorrencias, ocorrenciaId);
  const dataDetectada = formatarData(ocorrencia?.detectadaEm);

  if (carregando) {
    return (
      <ContainerTela style={styles.fallback}>
        <EstadoConteudo tipo="carregando" titulo="Carregando imagem" />
      </ContainerTela>
    );
  }

  if (!ocorrencia?.imagem) {
    return (
      <ContainerTela style={styles.fallback}>
        <EstadoConteudo
          tipo="erro"
          titulo="Imagem indisponível"
          mensagem="A ocorrência informada não possui uma imagem válida."
          textoAcao="Voltar"
          aoPressionar={() => navigation.goBack()}
        />
      </ContainerTela>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={ocorrencia.imagem}
        style={styles.imagem}
        resizeMode="cover"
      />

      <View
        style={[
          styles.topo,
          { paddingTop: insets.top + spacing.sm },
        ]}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          style={({ pressed }) => [
            styles.botaoVoltar,
            pressed && styles.pressionado,
          ]}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textInverse} />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </Pressable>

        <View style={styles.contextoTopo}>
          <Text style={styles.km} numberOfLines={1}>
            {ocorrencia.rodovia} · KM {ocorrencia.km}
          </Text>
          <Text style={styles.titulo} numberOfLines={1}>
            {ocorrencia.titulo}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.rodape,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        <Text style={styles.meta} numberOfLines={1}>
          {ocorrencia.origem}
          {dataDetectada ? ` · ${dataDetectada}` : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  imagem: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  topo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: 12,
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  botaoVoltar: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  textoVoltar: {
    ...typography.meta,
    color: colors.textInverse,
    fontWeight: "600",
    marginLeft: 2,
  },
  contextoTopo: {
    marginTop: 4,
    paddingBottom: 4,
  },
  km: {
    ...typography.meta,
    color: "rgba(255,255,255,0.82)",
  },
  titulo: {
    ...typography.sectionTitle,
    color: colors.textInverse,
    marginTop: 2,
  },
  rodape: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  meta: {
    ...typography.meta,
    color: "rgba(255,255,255,0.9)",
  },
  pressionado: {
    opacity: 0.8,
  },
});
