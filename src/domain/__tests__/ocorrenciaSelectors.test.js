import {
  selecionarContagemPorCriticidade,
  selecionarOcorrenciaPorId,
  selecionarOcorrenciasAbertas,
  selecionarOcorrenciasPorFiltro,
  selecionarMetricasRelatorios,
  selecionarSerieMensal,
} from "../ocorrenciaSelectors";

const ocorrencias = [
  {
    id: "critica-aberta",
    criticidade: "critico",
    status: "nova",
    detectadaEm: "2026-05-10T12:00:00.000Z",
  },
  {
    id: "atencao-aberta",
    criticidade: "atencao",
    status: "agendada",
    detectadaEm: "2026-06-12T12:00:00.000Z",
  },
  {
    id: "moderada-aberta",
    criticidade: "moderado",
    status: "em_atendimento",
    detectadaEm: "2026-09-08T12:00:00.000Z",
  },
  {
    id: "atencao-resolvida",
    criticidade: "atencao",
    status: "resolvida",
    detectadaEm: "2026-10-01T12:00:00.000Z",
  },
];

describe("seletores de ocorrências", () => {
  test("seleciona somente ocorrências abertas", () => {
    expect(selecionarOcorrenciasAbertas(ocorrencias).map((item) => item.id)).toEqual([
      "critica-aberta",
      "atencao-aberta",
      "moderada-aberta",
    ]);
  });

  test("conta criticidades considerando somente ocorrências abertas", () => {
    expect(selecionarContagemPorCriticidade(ocorrencias)).toEqual({
      critico: 1,
      atencao: 1,
      moderado: 1,
    });
  });

  test.each([
    ["Todos", ["critica-aberta", "atencao-aberta", "moderada-aberta", "atencao-resolvida"]],
    ["Crítico", ["critica-aberta"]],
    ["Atenção", ["atencao-aberta"]],
    ["Moderado", ["moderada-aberta"]],
    ["Resolvido", ["atencao-resolvida"]],
  ])("aplica o filtro %s", (filtro, idsEsperados) => {
    expect(
      selecionarOcorrenciasPorFiltro(ocorrencias, filtro).map((item) => item.id),
    ).toEqual(idsEsperados);
  });

  test("busca ocorrência por ID com fallback nulo", () => {
    expect(selecionarOcorrenciaPorId(ocorrencias, "moderada-aberta")?.id).toBe(
      "moderada-aberta",
    );
    expect(selecionarOcorrenciaPorId(ocorrencias, "inexistente")).toBeNull();
  });

  test("calcula métricas derivadas sem inventar dados", () => {
    expect(selecionarMetricasRelatorios(ocorrencias)).toEqual({
      total: 4,
      abertas: 3,
      resolvidas: 1,
      taxaResolucao: 25,
      distribuicao: { critico: 1, atencao: 2, moderado: 1 },
    });
  });

  test("gera a série mensal do período configurado", () => {
    expect(selecionarSerieMensal(ocorrencias)).toEqual([
      { mes: "Mai", quantidade: 1 },
      { mes: "Jun", quantidade: 1 },
      { mes: "Jul", quantidade: 0 },
      { mes: "Ago", quantidade: 0 },
      { mes: "Set", quantidade: 1 },
    ]);
  });
});
