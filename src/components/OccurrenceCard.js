import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { STATUS_OCORRENCIA } from "../domain/ocorrenciaSelectors";
import { colors, radius, shadow, spacing, typography, visualCriticidade } from "../theme";
import CriticidadeBadge from "./CriticidadeBadge";

export default function OccurrenceCard({
  ocorrencia,
  onPress,
  onPressDetalhe,
  acao,
  processando = false,
  acaoDesabilitada = false,
  mostrarDescricao = false,
}) {
  const visual = visualCriticidade(ocorrencia.criticidade);
  const statusRotulo = STATUS_OCORRENCIA[ocorrencia.status] ?? ocorrencia.status;
  const Conteudo = (
    <View style={styles.interno}>
      <View style={[styles.acento, { backgroundColor: visual.accent }]} />

      <View style={styles.corpo}>
        <View style={styles.topo}>
          <CriticidadeBadge criticidade={ocorrencia.criticidade} />
          <Text style={styles.km}>KM {ocorrencia.km}</Text>
        </View>

        <Text style={styles.titulo} numberOfLines={2}>
          {ocorrencia.titulo}
        </Text>

        {mostrarDescricao ? (
          <Text style={styles.descricao} numberOfLines={3}>
            {ocorrencia.descricao}
          </Text>
        ) : null}

        <Text style={styles.meta} numberOfLines={1}>
          {statusRotulo} · {ocorrencia.origem}
        </Text>

        <View style={styles.acoes}>
          {onPressDetalhe ? (
            <Pressable
              onPress={onPressDetalhe}
              hitSlop={6}
              android_ripple={{ color: colors.brandMuted }}
              style={({ pressed }) => [
                styles.linkDetalhe,
                pressed && styles.pressionado,
              ]}
            >
              <Text style={styles.textoDetalhe}>Ver detalhes</Text>
            </Pressable>
          ) : (
            <Text style={styles.textoDetalhe}>Ver detalhes</Text>
          )}

          {acao ? (
            <Pressable
              onPress={() => acao.executar(ocorrencia.id)}
              disabled={acaoDesabilitada}
              android_ripple={{ color: "rgba(255,255,255,0.18)" }}
              style={({ pressed }) => [
                styles.botaoAcao,
                acaoDesabilitada && styles.botaoDesabilitado,
                pressed && !acaoDesabilitada && styles.pressionado,
              ]}
            >
              <Text style={styles.textoAcao}>
                {processando ? "Salvando..." : acao.rotulo}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <View style={styles.sombra}>
        <Pressable
          onPress={onPress}
          android_ripple={{ color: colors.brandSoft }}
          style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
        >
          {Conteudo}
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.sombra}>
      <View style={styles.card}>{Conteudo}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  sombra: {
    marginBottom: spacing.md,
    borderRadius: radius.md,
    ...shadow.card,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  interno: {
    flexDirection: "row",
  },
  acento: {
    width: 4,
    alignSelf: "stretch",
  },
  corpo: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  km: {
    ...typography.meta,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  titulo: {
    ...typography.cardTitle,
    color: colors.text,
    marginTop: 8,
  },
  descricao: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
  },
  meta: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 8,
  },
  acoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    gap: spacing.sm,
  },
  linkDetalhe: {
    minHeight: 36,
    justifyContent: "center",
    paddingRight: spacing.sm,
  },
  textoDetalhe: {
    ...typography.meta,
    color: colors.brand,
    fontWeight: "600",
  },
  botaoAcao: {
    backgroundColor: colors.brand,
    borderRadius: radius.pill,
    minHeight: 36,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoDesabilitado: {
    opacity: 0.65,
  },
  textoAcao: {
    ...typography.meta,
    color: colors.textInverse,
    fontWeight: "600",
  },
  pressionado: {
    opacity: 0.82,
  },
});
