import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing, typography } from "../theme";
import LogoMarca from "./LogoMarca";

export default function HeaderApp({ titulo, aoSair }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.marca}>
        <LogoMarca compacto />
      </View>

      {titulo ? (
        <Text style={styles.titulo} numberOfLines={1}>
          {titulo}
        </Text>
      ) : (
        <View style={styles.titulo} />
      )}

      {aoSair ? (
        <Pressable
          onPress={aoSair}
          hitSlop={8}
          android_ripple={{ color: "rgba(255,255,255,0.16)" }}
          style={({ pressed }) => [
            styles.logoutArea,
            pressed && styles.pressionado,
          ]}
        >
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
      ) : (
        <View style={styles.logoutArea} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.md,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
  },
  marca: {
    minWidth: 92,
    flexShrink: 0,
  },
  titulo: {
    ...typography.title,
    flex: 1,
    minWidth: 0,
    color: colors.textInverse,
    textAlign: "center",
    marginHorizontal: spacing.sm,
  },
  logoutArea: {
    minWidth: 56,
    minHeight: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  logout: {
    ...typography.meta,
    color: colors.textInverse,
    fontWeight: "600",
  },
  pressionado: {
    opacity: 0.8,
  },
});
