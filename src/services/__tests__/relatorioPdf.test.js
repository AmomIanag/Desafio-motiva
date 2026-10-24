import { criarHtmlRelatorio, escaparHtml } from "../relatorioPdf";

describe("relatório PDF", () => {
  test("escapa conteúdo que será inserido no HTML", () => {
    expect(escaparHtml('<script>alert("x")</script> & teste')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; teste",
    );
  });

  test("gera HTML coerente e identifica os dados como simulados", () => {
    const html = criarHtmlRelatorio({
      geradoEm: new Date("2026-10-23T15:00:00.000Z"),
      metricas: {
        total: 1,
        abertas: 1,
        resolvidas: 0,
        taxaResolucao: 0,
        distribuicao: { critico: 1, atencao: 0, moderado: 0 },
      },
      ocorrencias: [
        {
          rodovia: "SP-330",
          km: 84,
          titulo: "Placa <encoberta>",
          criticidade: "critico",
          status: "nova",
        },
      ],
    });

    expect(html).toContain("Relatório de conformidade operacional");
    expect(html).toContain("Documento acadêmico demonstrativo");
    expect(html).toContain("Placa &lt;encoberta&gt;");
    expect(html).toContain("Críticas: 1");
    expect(html).not.toContain("Placa <encoberta>");
  });
});
