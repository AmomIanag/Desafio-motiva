import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
        <ActivityIndicator size={compacto ? "small" : "large"} color="#5D20F5" />
      ) : null}

      {titulo ? (
        <Text style={[styles.titulo, erro && styles.tituloErro]}>{titulo}</Text>
      ) : null}

      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

      {textoAcao && aoPressionar ? (
        <Pressable style={styles.botao} onPress={aoPressionar}>
          <Text style={styles.textoBotao}>{textoAcao}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  containerCompacto: {
    minHeight: 0,
    backgroundColor: "#FFF4F4",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
  },
  titulo: {
    color: "#333333",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  tituloErro: {
    color: "#B42318",
  },
  mensagem: {
    color: "#666666",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
  botao: {
    backgroundColor: "#5D20F5",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginTop: 12,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
});
