import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";

export default function LogoMarca({ compacto = false }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/simbolo-motiva.png")}
        style={compacto ? styles.simboloCompacto : styles.simbolo}
        resizeMode="contain"
      />

      <Text style={compacto ? styles.textoCompacto : styles.texto}>
        motiva
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  simbolo: {
    width: 32,
    height: 28,
    marginRight: 6,
  },
  simboloCompacto: {
    width: 26,
    height: 22,
    marginRight: 6,
  },
  texto: {
    color: colors.textInverse,
    fontSize: 18,
    fontWeight: "600",
  },
  textoCompacto: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "600",
  },
});
