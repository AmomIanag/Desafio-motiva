import React from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { selecionarOcorrenciaPorId } from "../domain/ocorrenciaSelectors";

export default function DroneImagemTela({ route, navigation }) {
  const { ocorrencias, carregando } = useOcorrencias();
  const ocorrenciaId = route?.params?.ocorrenciaId;
  const ocorrencia = selecionarOcorrenciaPorId(ocorrencias, ocorrenciaId);

  if (carregando) {
    return (
      <ContainerTela style={styles.fallback}>
        <EstadoConteudo tipo="carregando" titulo="Carregando imagem" />
      </ContainerTela>
    );
  }

  if (!ocorrencia?.imagem) {
    return (
      <ContainerTela style={styles.fallback}>
        <EstadoConteudo
          tipo="erro"
          titulo="Imagem indisponível"
          mensagem="A ocorrência informada não possui uma imagem válida."
          textoAcao="Voltar"
          aoPressionar={() => navigation.goBack()}
        />
      </ContainerTela>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={ocorrencia.imagem}
        style={styles.imagem}
        resizeMode="cover"
      />

      <Pressable
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoVoltar}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 18,
    paddingTop: 34,
    paddingBottom: 25,
  },

  imagem: {
    width: "100%",
    height: "100%",
  },

  botaoVoltar: {
    position: "absolute",
    top: 57,
    right: 27,
    padding: 6,
  },

  textoVoltar: {
    color: "#FFFFFF",
    fontSize: 25,
    textShadowColor: "#000000",
    textShadowRadius: 4,
  },
});
