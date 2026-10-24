import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const CRITICIDADES = {
  critico: "Crítico",
  atencao: "Atenção",
  moderado: "Moderado",
};

const STATUS = {
  nova: "Nova",
  agendada: "Equipe agendada",
  equipe_enviada: "Equipe enviada",
  em_atendimento: "Em atendimento",
  resolvida: "Resolvida",
};

export function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatarDataHora(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
}

export function criarHtmlRelatorio({ ocorrencias, metricas, geradoEm = new Date() }) {
  const linhas = ocorrencias
    .map(
      (ocorrencia) => `
        <tr>
          <td>${escaparHtml(ocorrencia.rodovia)}</td>
          <td>KM ${escaparHtml(ocorrencia.km)}</td>
          <td>${escaparHtml(ocorrencia.titulo)}</td>
          <td>${escaparHtml(CRITICIDADES[ocorrencia.criticidade] ?? ocorrencia.criticidade)}</td>
          <td>${escaparHtml(STATUS[ocorrencia.status] ?? ocorrencia.status)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <style>
        @page { margin: 28px; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          color: #1A1A1A;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          line-height: 1.4;
        }
        .cabecalho {
          border-bottom: 3px solid #5D20F5;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .marca { color: #5D20F5; font-size: 13px; font-weight: 700; }
        h1 { font-size: 22px; margin: 5px 0 3px; }
        .data { color: #6B6B75; }
        .aviso {
          background: #F3EEFF;
          border: 1px solid #E6DCFF;
          border-radius: 8px;
          color: #4A18C9;
          font-weight: 700;
          margin-bottom: 16px;
          padding: 10px 12px;
        }
        .kpis { display: flex; gap: 8px; margin-bottom: 18px; }
        .kpi {
          border: 1px solid #E6E6EC;
          border-radius: 8px;
          flex: 1;
          padding: 10px;
        }
        .kpi span { color: #6B6B75; display: block; font-size: 9px; }
        .kpi strong { display: block; font-size: 18px; margin-top: 3px; }
        h2 { font-size: 14px; margin: 0 0 8px; }
        .distribuicao { margin-bottom: 18px; }
        .distribuicao span {
          border-radius: 12px;
          display: inline-block;
          margin-right: 6px;
          padding: 5px 9px;
        }
        .critico { background: #FDECEC; color: #B42318; }
        .atencao { background: #FFF6D6; color: #8A6A00; }
        .moderado { background: #E8F6EE; color: #0F7A3A; }
        table { border-collapse: collapse; table-layout: fixed; width: 100%; }
        th, td {
          border: 1px solid #E6E6EC;
          overflow-wrap: anywhere;
          padding: 6px;
          text-align: left;
          vertical-align: top;
        }
        th { background: #F4F4F6; font-size: 9px; }
        tr { break-inside: avoid; page-break-inside: avoid; }
        th:nth-child(1), td:nth-child(1) { width: 14%; }
        th:nth-child(2), td:nth-child(2) { width: 11%; }
        th:nth-child(3), td:nth-child(3) { width: 33%; }
        th:nth-child(4), td:nth-child(4) { width: 18%; }
        th:nth-child(5), td:nth-child(5) { width: 24%; }
        .rodape { color: #6B6B75; font-size: 9px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <header class="cabecalho">
        <div class="marca">MOTIVA CHALLENGE</div>
        <h1>Relatório de conformidade operacional</h1>
        <div class="data">Gerado em ${escaparHtml(formatarDataHora(geradoEm))}</div>
      </header>

      <div class="aviso">
        Documento acadêmico demonstrativo. Ocorrências, imagens e indicadores são dados simulados.
      </div>

      <section class="kpis">
        <div class="kpi"><span>Total de ocorrências</span><strong>${escaparHtml(metricas.total)}</strong></div>
        <div class="kpi"><span>Ocorrências abertas</span><strong>${escaparHtml(metricas.abertas)}</strong></div>
        <div class="kpi"><span>Ocorrências resolvidas</span><strong>${escaparHtml(metricas.resolvidas)}</strong></div>
        <div class="kpi"><span>Taxa de resolução</span><strong>${escaparHtml(metricas.taxaResolucao)}%</strong></div>
      </section>

      <section class="distribuicao">
        <h2>Distribuição por criticidade</h2>
        <span class="critico">Críticas: ${escaparHtml(metricas.distribuicao.critico)}</span>
        <span class="atencao">Atenção: ${escaparHtml(metricas.distribuicao.atencao)}</span>
        <span class="moderado">Moderadas: ${escaparHtml(metricas.distribuicao.moderado)}</span>
      </section>

      <section>
        <h2>Resumo das ocorrências</h2>
        <table>
          <thead>
            <tr>
              <th>Rodovia</th>
              <th>Trecho</th>
              <th>Ocorrência</th>
              <th>Criticidade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
      </section>

      <p class="rodape">
        Motiva Challenge — protótipo acadêmico de monitoramento inteligente de vegetação.
      </p>
    </body>
  </html>`;
}

export async function gerarECompartilharRelatorioPdf(dados) {
  const html = criarHtmlRelatorio(dados);
  const { uri } = await Print.printToFileAsync({ html });
  const compartilhamentoDisponivel = await Sharing.isAvailableAsync();

  if (!compartilhamentoDisponivel) {
    return { uri, compartilhamentoDisponivel: false };
  }

  await Sharing.shareAsync(uri, {
    dialogTitle: "Compartilhar relatório de conformidade",
    mimeType: "application/pdf",
    UTI: "com.adobe.pdf",
  });

  return { uri, compartilhamentoDisponivel: true };
}
