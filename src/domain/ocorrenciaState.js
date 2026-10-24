const STATUS_VALIDOS = [
  "nova",
  "agendada",
  "equipe_enviada",
  "em_atendimento",
  "resolvida",
];

export function aplicarPatches(baseline, alteracoes) {
  return baseline.map((ocorrencia) => {
    const patch = alteracoes[ocorrencia.id];

    if (!patch || typeof patch !== "object") {
      return ocorrencia;
    }

    return {
      ...ocorrencia,
      status: STATUS_VALIDOS.includes(patch.status)
        ? patch.status
        : ocorrencia.status,
      resolvidaEm:
        typeof patch.resolvidaEm === "string" || patch.resolvidaEm === null
          ? patch.resolvidaEm
          : ocorrencia.resolvidaEm,
      equipe:
        patch.equipe === null ||
        (typeof patch.equipe === "object" && !Array.isArray(patch.equipe))
          ? patch.equipe
          : ocorrencia.equipe,
    };
  });
}

export function criarTransicao(ocorrencia, evento, instante = new Date()) {
  const agora = instante.toISOString();

  if (evento === "AGENDAR_EQUIPE") {
    if (ocorrencia.criticidade !== "atencao" || ocorrencia.status !== "nova") {
      return null;
    }

    return {
      ...ocorrencia,
      status: "agendada",
      equipe: {
        nome: "Equipe programada",
        agendadaPara: new Date(
          instante.getTime() + 24 * 60 * 60 * 1000,
        ).toISOString(),
        acionadaEm: null,
      },
    };
  }

  if (evento === "ENVIAR_EQUIPE") {
    const podeEnviar =
      (ocorrencia.criticidade === "critico" && ocorrencia.status === "nova") ||
      ocorrencia.status === "agendada";

    if (!podeEnviar) {
      return null;
    }

    return {
      ...ocorrencia,
      status: "equipe_enviada",
      equipe: {
        nome: ocorrencia.equipe?.nome ?? "Equipe operacional",
        agendadaPara: ocorrencia.equipe?.agendadaPara ?? null,
        acionadaEm: agora,
      },
    };
  }

  if (evento === "INICIAR_ATENDIMENTO") {
    if (ocorrencia.status !== "equipe_enviada") {
      return null;
    }

    return { ...ocorrencia, status: "em_atendimento" };
  }

  if (evento === "RESOLVER_OCORRENCIA") {
    if (ocorrencia.status !== "em_atendimento") {
      return null;
    }

    return { ...ocorrencia, status: "resolvida", resolvidaEm: agora };
  }

  return null;
}

export function criarPatch(ocorrencia) {
  return {
    status: ocorrencia.status,
    resolvidaEm: ocorrencia.resolvidaEm,
    equipe: ocorrencia.equipe,
  };
}
