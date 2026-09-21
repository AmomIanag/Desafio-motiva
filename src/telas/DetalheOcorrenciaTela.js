import React, { useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ContainerTela from "../components/ContainerTela";
import EstadoConteudo from "../components/EstadoConteudo";
import { useOcorrencias } from "../context/OcorrenciasContext";
import {
  CRITICIDADES,
  STATUS_OCORRENCIA,
  selecionarOcorrenciaPorId,
} from "../domain/ocorrenciaSelectors";

function formatarData(valor) {
  if (!valor) {
    return "Não informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(valor));
}

export default function DetalheOcorrenciaTela({ route, navigation }) {
  const { ocorrencias, carregando } = useOcorrencias();
  const ocorrenciaId = route?.params?.ocorrenciaId;
  const ocorrencia = useMemo(
    () => selecionarOcorrenciaPorId(ocorrencias, ocorrenciaId),
    [ocorrenciaId, ocorrencias],
  );

  if (carregando) {
    return (
      <ContainerTela>
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>Detalhe da ocorrência</Text>
        </View>
        <EstadoConteudo tipo="carregando" titulo="Carregando ocorrência" />
      </ContainerTela>
    );
  }

  if (!ocorrencia) {
    return (
      <ContainerTela>
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>Detalhe da ocorrência</Text>
        </View>
        <EstadoConteudo
          tipo="erro"
          titulo="Ocorrência não encontrada"
          mensagem="O item informado não existe ou não está mais disponível."
          textoAcao="Voltar"
          aoPressionar={() => navigation.goBack()}
        />
      </ContainerTela>
    );
  }

  const criticidade = CRITICIDADES[ocorrencia.criticidade];

  return (
    <ContainerTela>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>‹ Voltar</Text>
        </Pressable>
        <Text style={styles.tituloHeader}>Detalhe</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cardTitulo}>
          <Text style={styles.km}>
            {ocorrencia.rodovia} · KM {ocorrencia.km}
          </Text>
          <Text style={styles.titulo}>{ocorrencia.titulo}</Text>
          <View style={styles.selos}>
            <Text style={[styles.selo, { backgroundColor: criticidade.cor }]}>
              {criticidade.rotulo}
            </Text>
            <Text style={styles.seloStatus}>
              {STATUS_OCORRENCIA[ocorrencia.status]}
            </Text>
          </View>
        </View>

        <View style={styles.cardInformacoes}>
          <Text style={styles.rotulo}>Descrição</Text>
          <Text style={styles.valor}>{ocorrencia.descricao}</Text>

          <Text style={styles.rotulo}>Origem</Text>
          <Text style={styles.valor}>{ocorrencia.origem}</Text>

          <Text style={styles.rotulo}>Detectada em</Text>
          <Text style={styles.valor}>{formatarData(ocorrencia.detectadaEm)}</Text>

          {ocorrencia.equipe ? (
            <>
              <Text style={styles.rotulo}>Equipe</Text>
              <Text style={styles.valor}>{ocorrencia.equipe.nome}</Text>
              <Text style={styles.valorSecundario}>
                {ocorrencia.equipe.acionadaEm
                  ? `Acionada em ${formatarData(ocorrencia.equipe.acionadaEm)}`
                  : `Agendada para ${formatarData(ocorrencia.equipe.agendadaPara)}`}
              </Text>
            </>
          ) : null}
        </View>

        <Image source={ocorrencia.imagem} style={styles.imagem} resizeMode="cover" />

        <Pressable
          style={styles.botaoImagem}
          onPress={() =>
            navigation.navigate("ImagemDrone", { ocorrenciaId: ocorrencia.id })
          }
        >
          <Text style={styles.textoBotao}>Ver imagem do drone</Text>
        </Pressable>
      </ScrollView>
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 76,
    backgroundColor: "#5D20F5",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  voltar: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  tituloHeader: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },
  conteudo: { padding: 20, paddingBottom: 36 },
  cardTitulo: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },
  km: { color: "#666666", fontSize: 13, fontWeight: "bold" },
  titulo: { color: "#111111", fontSize: 22, fontWeight: "bold", marginTop: 5 },
  selos: { flexDirection: "row", flexWrap: "wrap", marginTop: 14 },
  selo: {
    color: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },
  seloStatus: {
    color: "#5D20F5",
    backgroundColor: "#E6DCFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },
  cardInformacoes: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  rotulo: { color: "#5D20F5", fontSize: 12, fontWeight: "bold", marginTop: 10 },
  valor: { color: "#333333", fontSize: 14, marginTop: 3 },
  valorSecundario: { color: "#777777", fontSize: 12, marginTop: 3 },
  imagem: { width: "100%", height: 170, borderRadius: 18, marginTop: 18 },
  botaoImagem: {
    height: 46,
    backgroundColor: "#5D20F5",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  textoBotao: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});
