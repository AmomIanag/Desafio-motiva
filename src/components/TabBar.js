import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { colors } from "../theme";

const ROTULOS = {
  Dashboard: "Dashboard",
  Mapa: "Mapa",
  Alertas: "Alertas",
  Relatorios: "Relatórios",
};

export default function TabBar({ state, descriptors, navigation, insets }) {
  function mostrarIcone(nomeRota, selecionada) {
    const cor = selecionada ? colors.textInverse : "rgba(255,255,255,0.72)";
    const tamanho = 22;

    if (nomeRota === "Dashboard") {
      return (
        <Ionicons
          name={selecionada ? "home" : "home-outline"}
          size={tamanho}
          color={cor}
        />
      );
    }

    if (nomeRota === "Mapa") {
      return (
        <Ionicons
          name={selecionada ? "map" : "map-outline"}
          size={tamanho}
          color={cor}
        />
      );
    }

    if (nomeRota === "Alertas") {
      return (
        <Ionicons
          name={selecionada ? "alert-circle" : "alert-circle-outline"}
          size={tamanho}
          color={cor}
        />
      );
    }

    return (
      <MaterialCommunityIcons
        name={selecionada ? "clipboard-text" : "clipboard-text-outline"}
        size={tamanho}
        color={cor}
      />
    );
  }

  return (
    <View
      style={[
        styles.barra,
        {
          height: 58 + (insets?.bottom ?? 0),
          paddingBottom: insets?.bottom ?? 0,
        },
      ]}
    >
      {state.routes.map((rota, indice) => {
        const selecionada = state.index === indice;

        function abrirTela() {
          const evento = navigation.emit({
            type: "tabPress",
            target: rota.key,
            canPreventDefault: true,
          });

          if (!selecionada && !evento.defaultPrevented) {
            navigation.navigate(rota.name);
          }
        }

        const opcoes = descriptors[rota.key]?.options ?? {};
        const rotulo = ROTULOS[rota.name] ?? rota.name;

        return (
          <Pressable
            key={rota.key}
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.pressionado,
            ]}
            onPress={abrirTela}
            onLongPress={() =>
              navigation.emit({ type: "tabLongPress", target: rota.key })
            }
            accessibilityRole="button"
            accessibilityState={selecionada ? { selected: true } : {}}
            accessibilityLabel={opcoes.tabBarAccessibilityLabel ?? rotulo}
            android_ripple={{ color: "rgba(255,255,255,0.12)" }}
          >
            {selecionada ? <View style={styles.indicador} /> : null}
            {mostrarIcone(rota.name, selecionada)}
            <Text
              style={[
                styles.label,
                selecionada ? styles.labelAtivo : styles.labelInativo,
              ]}
              numberOfLines={1}
            >
              {rotulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    height: 58,
    backgroundColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  botao: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
  },
  indicador: {
    position: "absolute",
    top: 0,
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.textInverse,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
  labelAtivo: {
    color: colors.textInverse,
    fontWeight: "600",
  },
  labelInativo: {
    color: "rgba(255,255,255,0.72)",
    fontWeight: "400",
  },
  pressionado: {
    opacity: 0.86,
  },
});
