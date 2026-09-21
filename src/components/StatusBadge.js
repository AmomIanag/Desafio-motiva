import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { STATUS_OCORRENCIA } from "../domain/ocorrenciaSelectors";
import { colors, radius } from "../theme";

export default function StatusBadge({ status }) {
  const rotulo = STATUS_OCORRENCIA[status] ?? status;
  const resolvida = status === "resolvida";

  return (
    <View
      style={[
        styles.badge,
        resolvida ? styles.resolvida : styles.operacional,
      ]}
    >
      <Text
        style={[
          styles.texto,
          resolvida ? styles.textoResolvida : styles.textoOperacional,
        ]}
      >
        {rotulo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  operacional: {
    backgroundColor: colors.brandSoft,
  },
  resolvida: {
    backgroundColor: colors.resolvedSoft,
  },
  texto: {
    fontSize: 12,
    fontWeight: "600",
  },
  textoOperacional: {
    color: colors.brand,
  },
  textoResolvida: {
    color: colors.resolved,
  },
});
