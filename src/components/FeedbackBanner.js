import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../theme";

export default function FeedbackBanner({ mensagem, tipo = "sucesso" }) {
  if (!mensagem) {
    return null;
  }

  const erro = tipo === "erro";

  return (
    <View style={[styles.banner, erro ? styles.erro : styles.sucesso]}>
      <Text style={[styles.texto, erro ? styles.textoErro : styles.textoSucesso]}>
        {mensagem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: spacing.sm,
  },
  sucesso: {
    backgroundColor: colors.successSoft,
  },
  erro: {
    backgroundColor: colors.criticalSoft,
  },
  texto: {
    ...typography.meta,
    fontWeight: "600",
    textAlign: "center",
  },
  textoSucesso: {
    color: colors.success,
  },
  textoErro: {
    color: colors.danger,
  },
});
