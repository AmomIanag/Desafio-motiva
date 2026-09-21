export const CRITICIDADES = {
  critico: { rotulo: "Crítico", cor: "#ED2427" },
  atencao: { rotulo: "Atenção", cor: "#F5C400" },
  moderado: { rotulo: "Moderado", cor: "#16A94F" },
};

export const STATUS_OCORRENCIA = {
  nova: "Nova",
  agendada: "Equipe agendada",
  equipe_enviada: "Equipe enviada",
  em_atendimento: "Em atendimento",
  resolvida: "Resolvida",
};

export function selecionarOcorrenciasAbertas(ocorrencias) {
  return ocorrencias.filter((item) => item.status !== "resolvida");
}

export function selecionarOcorrenciasResolvidas(ocorrencias) {
  return ocorrencias.filter((item) => item.status === "resolvida");
}

export function selecionarContagemPorCriticidade(ocorrencias) {
  const abertas = selecionarOcorrenciasAbertas(ocorrencias);

  return abertas.reduce(
    (contagem, item) => ({
      ...contagem,
      [item.criticidade]: contagem[item.criticidade] + 1,
    }),
    { critico: 0, atencao: 0, moderado: 0 },
  );
}

export function selecionarOcorrenciasPorFiltro(ocorrencias, filtro) {
  if (filtro === "Resolvido") {
    return selecionarOcorrenciasResolvidas(ocorrencias);
  }

  if (filtro === "Crítico") {
    return ocorrencias.filter(
      (item) => item.criticidade === "critico" && item.status !== "resolvida",
    );
  }

  if (filtro === "Atenção") {
    return ocorrencias.filter(
      (item) => item.criticidade === "atencao" && item.status !== "resolvida",
    );
  }

  return ocorrencias;
}

export function selecionarOcorrenciaPorId(ocorrencias, id) {
  return ocorrencias.find((item) => item.id === id) ?? null;
}

export function selecionarOcorrenciasDoMapa(ocorrencias) {
  return ocorrencias.filter((item) => item.destaqueMapa);
}

export function selecionarDestaqueMonitoramento(ocorrencias) {
  return (
    ocorrencias.find(
      (item) => item.criticidade === "critico" && item.status !== "resolvida",
    ) ?? ocorrencias.find((item) => item.status !== "resolvida") ?? null
  );
}

export function selecionarMetricasRelatorios(ocorrencias) {
  const resolvidas = selecionarOcorrenciasResolvidas(ocorrencias);
  const abertas = selecionarOcorrenciasAbertas(ocorrencias);
  const total = ocorrencias.length;

  const distribuicao = ocorrencias.reduce(
    (contagem, item) => ({
      ...contagem,
      [item.criticidade]: contagem[item.criticidade] + 1,
    }),
    { critico: 0, atencao: 0, moderado: 0 },
  );

  return {
    total,
    abertas: abertas.length,
    resolvidas: resolvidas.length,
    taxaResolucao: total === 0 ? 0 : Math.round((resolvidas.length / total) * 100),
    distribuicao,
  };
}

export function selecionarSerieMensal(ocorrencias) {
  const meses = ["Mai", "Jun", "Jul", "Ago", "Set"];
  const contagens = [0, 0, 0, 0, 0];

  ocorrencias.forEach((item) => {
    const mes = new Date(item.detectadaEm).getMonth();

    if (mes >= 4 && mes <= 8) {
      contagens[mes - 4] += 1;
    }
  });

  return meses.map((mes, indice) => ({ mes, quantidade: contagens[indice] }));
}
