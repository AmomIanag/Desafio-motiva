import {
  aplicarPatches,
  criarPatch,
  criarTransicao,
} from "../ocorrenciaState";

const instante = new Date("2026-10-23T15:00:00.000Z");

function criarOcorrencia(sobrescritas = {}) {
  return {
    id: "oc-1",
    criticidade: "critico",
    status: "nova",
    resolvidaEm: null,
    equipe: null,
    ...sobrescritas,
  };
}

describe("transições de ocorrência", () => {
  test("agenda somente ocorrência nova de atenção", () => {
    const original = criarOcorrencia({ criticidade: "atencao" });
    const atualizada = criarTransicao(original, "AGENDAR_EQUIPE", instante);

    expect(atualizada).toEqual({
      ...original,
      status: "agendada",
      equipe: {
        nome: "Equipe programada",
        agendadaPara: "2026-10-24T15:00:00.000Z",
        acionadaEm: null,
      },
    });
    expect(original.status).toBe("nova");
    expect(criarTransicao(criarOcorrencia(), "AGENDAR_EQUIPE", instante)).toBeNull();
  });

  test("envia equipe para ocorrência crítica nova ou previamente agendada", () => {
    const critica = criarTransicao(
      criarOcorrencia(),
      "ENVIAR_EQUIPE",
      instante,
    );
    const agendada = criarTransicao(
      criarOcorrencia({
        criticidade: "atencao",
        status: "agendada",
        equipe: { nome: "Equipe 2", agendadaPara: "2026-10-24T12:00:00.000Z" },
      }),
      "ENVIAR_EQUIPE",
      instante,
    );

    expect(critica.status).toBe("equipe_enviada");
    expect(critica.equipe.acionadaEm).toBe("2026-10-23T15:00:00.000Z");
    expect(agendada.equipe).toEqual({
      nome: "Equipe 2",
      agendadaPara: "2026-10-24T12:00:00.000Z",
      acionadaEm: "2026-10-23T15:00:00.000Z",
    });
  });

  test("inicia atendimento e resolve apenas nos status permitidos", () => {
    const emAtendimento = criarTransicao(
      criarOcorrencia({ status: "equipe_enviada" }),
      "INICIAR_ATENDIMENTO",
      instante,
    );
    const resolvida = criarTransicao(
      emAtendimento,
      "RESOLVER_OCORRENCIA",
      instante,
    );

    expect(emAtendimento.status).toBe("em_atendimento");
    expect(resolvida.status).toBe("resolvida");
    expect(resolvida.resolvidaEm).toBe("2026-10-23T15:00:00.000Z");
    expect(
      criarTransicao(criarOcorrencia(), "RESOLVER_OCORRENCIA", instante),
    ).toBeNull();
    expect(criarTransicao(criarOcorrencia(), "EVENTO_INVALIDO", instante)).toBeNull();
  });
});

describe("patches persistidos", () => {
  test("aplica somente campos válidos sem alterar o baseline", () => {
    const baseline = [criarOcorrencia()];
    const patch = {
      "oc-1": {
        status: "resolvida",
        resolvidaEm: "2026-10-23T15:00:00.000Z",
        equipe: { nome: "Equipe 1" },
      },
    };

    const resultado = aplicarPatches(baseline, patch);

    expect(resultado[0]).toEqual({
      ...baseline[0],
      status: "resolvida",
      resolvidaEm: "2026-10-23T15:00:00.000Z",
      equipe: { nome: "Equipe 1" },
    });
    expect(baseline[0]).toEqual(criarOcorrencia());
  });

  test("ignora valores inválidos e IDs fora do baseline", () => {
    const baseline = [criarOcorrencia()];
    const resultado = aplicarPatches(baseline, {
      "oc-1": { status: "invalido", resolvidaEm: 123, equipe: [] },
      inexistente: { status: "resolvida" },
    });

    expect(resultado[0]).toEqual(baseline[0]);
    expect(resultado).toHaveLength(1);
  });

  test("cria patch somente com estado operacional persistível", () => {
    expect(
      criarPatch(
        criarOcorrencia({
          status: "em_atendimento",
          titulo: "Campo não persistido",
          equipe: { nome: "Equipe 3" },
        }),
      ),
    ).toEqual({
      status: "em_atendimento",
      resolvidaEm: null,
      equipe: { nome: "Equipe 3" },
    });
  });
});
