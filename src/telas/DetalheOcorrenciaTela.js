import React, { useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ContainerTela from "../components/ContainerTela";
import CriticidadeBadge from "../components/CriticidadeBadge";
import EstadoConteudo from "../components/EstadoConteudo";
import LogoMarca from "../components/LogoMarca";
import StatusBadge from "../components/StatusBadge";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { selecionarOcorrenciaPorId } from "../domain/ocorrenciaSelectors";
import { colors, radius, shadow, spacing, typography } from "../theme";

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
  const insets = useSafeAreaInsets();
  const { ocorrencias, carregando } = useOcorrencias();
  const ocorrenciaId = route?.params?.ocorrenciaId;
  const ocorrencia = useMemo(
    () => selecionarOcorrenciaPorId(ocorrencias, ocorrenciaId),
    [ocorrenciaId, ocorrencias],
  );

  function abrirImagem() {
    navigation.navigate("ImagemDrone", { ocorrenciaId: ocorrencia.id });
  }

  if (carregando) {
    return (
      <ContainerTela>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <LogoMarca compacto />
          <Text style={styles.tituloHeader} numberOfLines={1}>
            Ocorrência
          </Text>
          <View style={styles.ladoHeader} />
        </View>
        <EstadoConteudo tipo="carregando" titulo="Carregando ocorrência" />
      </ContainerTela>
    );
  }

  if (!ocorrencia) {
    return (
      <ContainerTela>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <LogoMarca compacto />
          <Text style={styles.tituloHeader} numberOfLines={1}>
            Ocorrência
          </Text>
          <View style={styles.ladoHeader} />
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

  return (
    <ContainerTela>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          android_ripple={{ color: "rgba(255,255,255,0.16)" }}
          style={({ pressed }) => [
            styles.ladoHeader,
            pressed && styles.pressionado,
          ]}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textInverse} />
          <Text style={styles.voltar}>Voltar</Text>
        </Pressable>

        <Text style={styles.tituloHeader} numberOfLines={1}>
          {ocorrencia.rodovia} · KM {ocorrencia.km}
        </Text>

        <View style={[styles.ladoHeader, styles.ladoHeaderDireito]}>
          <Image
            source={require("../../assets/simbolo-motiva.png")}
            style={styles.simboloHeader}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cardTitulo}>
          <Text style={styles.km}>
            {ocorrencia.rodovia} · KM {ocorrencia.km}
          </Text>
          <Text style={styles.titulo}>{ocorrencia.titulo}</Text>
          <View style={styles.selos}>
            <CriticidadeBadge criticidade={ocorrencia.criticidade} />
            <StatusBadge status={ocorrencia.status} />
          </View>
        </View>

        <View style={styles.cardInformacoes}>
          <Text style={styles.rotulo}>Descrição</Text>
          <Text style={styles.valor}>{ocorrencia.descricao}</Text>

          <View style={styles.grade}>
            <View style={styles.celula}>
              <Text style={styles.rotulo}>Origem</Text>
              <Text style={styles.valor}>{ocorrencia.origem}</Text>
            </View>
            <View style={styles.celula}>
              <Text style={styles.rotulo}>Detectada em</Text>
              <Text style={styles.valor}>
                {formatarData(ocorrencia.detectadaEm)}
              </Text>
            </View>
          </View>

          {ocorrencia.equipe ? (
            <View style={styles.blocoEquipe}>
              <Text style={styles.rotulo}>Equipe</Text>
              <Text style={styles.valor}>{ocorrencia.equipe.nome}</Text>
              <Text style={styles.valorSecundario}>
                {ocorrencia.equipe.acionadaEm
                  ? `Acionada em ${formatarData(ocorrencia.equipe.acionadaEm)}`
                  : `Agendada para ${formatarData(ocorrencia.equipe.agendadaPara)}`}
              </Text>
            </View>
          ) : null}
        </View>

        <Pressable
          onPress={abrirImagem}
          android_ripple={{ color: colors.brandSoft }}
          style={({ pressed }) => [
            styles.cardImagem,
            pressed && styles.pressionado,
          ]}
        >
          <Image
            source={ocorrencia.imagem}
            style={styles.imagem}
            resizeMode="cover"
          />
          <View style={styles.legendaImagem}>
            <Text style={styles.textoImagem}>Ver imagem do drone</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.brand} />
          </View>
        </Pressable>
      </ScrollView>
    </ContainerTela>
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
  ladoHeader: {
    minWidth: 72,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
  },
  ladoHeaderDireito: {
    justifyContent: "flex-end",
  },
  simboloHeader: {
    width: 22,
    height: 18,
  },
  voltar: {
    ...typography.meta,
    color: colors.textInverse,
    fontWeight: "600",
    marginLeft: 2,
  },
  tituloHeader: {
    ...typography.title,
    flex: 1,
    color: colors.textInverse,
    textAlign: "center",
  },
  conteudo: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  cardTitulo: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    ...shadow.card,
  },
  km: {
    ...typography.meta,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  titulo: {
    ...typography.title,
    fontSize: 20,
    color: colors.text,
    marginTop: 6,
  },
  selos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  cardInformacoes: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: spacing.md,
  },
  rotulo: {
    ...typography.meta,
    color: colors.textSecondary,
    fontWeight: "600",
    marginTop: 4,
  },
  valor: {
    ...typography.body,
    color: colors.text,
    marginTop: 3,
  },
  valorSecundario: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 3,
  },
  grade: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: 12,
  },
  celula: {
    flex: 1,
  },
  blocoEquipe: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cardImagem: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    marginTop: spacing.md,
    ...shadow.card,
  },
  imagem: {
    width: "100%",
    height: 190,
    backgroundColor: colors.surfaceMuted,
  },
  legendaImagem: {
    minHeight: 44,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textoImagem: {
    ...typography.meta,
    color: colors.brand,
    fontWeight: "600",
  },
  pressionado: {
    opacity: 0.86,
  },
});
