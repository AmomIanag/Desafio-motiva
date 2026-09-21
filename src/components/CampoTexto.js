import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "../theme";

export default function CampoTexto({
  label,
  erro,
  style,
  onFocus,
  onBlur,
  ...props
}) {
  const [focado, setFocado] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        onFocus={(evento) => {
          setFocado(true);
          onFocus?.(evento);
        }}
        onBlur={(evento) => {
          setFocado(false);
          onBlur?.(evento);
        }}
        style={[
          styles.input,
          focado && styles.focado,
          Boolean(erro) && styles.erro,
        ]}
      />

      {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.md,
  },
  label: {
    ...typography.meta,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    width: "100%",
    minHeight: 48,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colors.text,
  },
  focado: {
    borderColor: colors.brand,
    backgroundColor: colors.surface,
  },
  erro: {
    borderColor: colors.danger,
  },
  textoErro: {
    ...typography.meta,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});
