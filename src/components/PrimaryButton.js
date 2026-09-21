import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "../theme";

export default function PrimaryButton({
  children,
  onPress,
  disabled = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: "rgba(255,255,255,0.18)" }}
      style={({ pressed }) => [
        styles.botao,
        disabled && styles.desabilitado,
        pressed && !disabled && styles.pressionado,
      ]}
    >
      <Text style={styles.texto}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: "100%",
    minHeight: 48,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  desabilitado: {
    opacity: 0.65,
  },
  pressionado: {
    opacity: 0.88,
  },
  texto: {
    ...typography.body,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textInverse,
  },
});
