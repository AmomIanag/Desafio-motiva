import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, radius, spacing, typography } from "../theme";

export default function EstadoConteudo({
  tipo = "vazio",
  titulo,
  mensagem,
  textoAcao,
  aoPressionar,
  compacto = false,
}) {
  const carregando = tipo === "carregando";
  const erro = tipo === "erro";

  return (
    <View style={[styles.container, compacto && styles.containerCompacto]}>
      {carregando ? (
        <ActivityIndicator
          size={compacto ? "small" : "large"}
          color={colors.brand}
        />
      ) : null}

      {titulo ? (
        <Text style={[styles.titulo, erro && styles.tituloErro]}>{titulo}</Text>
      ) : null}

      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

      {textoAcao && aoPressionar ? (
        <Pressable
          onPress={aoPressionar}
          android_ripple={{ color: "rgba(255,255,255,0.18)" }}
          style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>{textoAcao}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  containerCompacto: {
    minHeight: 0,
    backgroundColor: colors.criticalSoft,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: spacing.sm,
  },
  titulo: {
    ...typography.sectionTitle,
    color: colors.text,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  tituloErro: {
    color: colors.danger,
  },
  mensagem: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  botao: {
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    minHeight: 40,
    paddingHorizontal: 18,
    justifyContent: "center",
    marginTop: 12,
  },
  pressionado: {
    opacity: 0.88,
  },
  textoBotao: {
    ...typography.meta,
    color: colors.textInverse,
    fontWeight: "600",
  },
});
