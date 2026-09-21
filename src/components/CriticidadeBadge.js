import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { CRITICIDADES } from "../domain/ocorrenciaSelectors";
import { radius, visualCriticidade } from "../theme";

export default function CriticidadeBadge({ criticidade }) {
  const config = CRITICIDADES[criticidade] ?? CRITICIDADES.critico;
  const visual = visualCriticidade(criticidade);

  return (
    <View style={[styles.badge, { backgroundColor: visual.soft }]}>
      <View style={[styles.ponto, { backgroundColor: visual.accent }]} />
      <Text style={[styles.texto, { color: visual.text }]}>
        {config.rotulo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  texto: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
