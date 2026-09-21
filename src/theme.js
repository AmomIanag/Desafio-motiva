export const colors = {
  brand: "#5D20F5",
  brandDark: "#4A18C9",
  brandSoft: "#F3EEFF",
  brandMuted: "#E6DCFF",

  background: "#F6F6F8",
  surface: "#FFFFFF",
  surfaceMuted: "#F4F4F6",
  border: "#E6E6EC",

  text: "#1A1A1A",
  textSecondary: "#6B6B75",
  textMuted: "#8A8A94",
  textInverse: "#FFFFFF",

  critical: "#ED2427",
  criticalSoft: "#FDECEC",
  criticalText: "#B42318",

  warning: "#C99200",
  warningSoft: "#FFF6D6",
  warningText: "#8A6A00",

  moderate: "#16A94F",
  moderateSoft: "#E8F6EE",
  moderateText: "#0F7A3A",

  resolved: "#0F7A3A",
  resolvedSoft: "#E6F7ED",

  danger: "#B42318",
  success: "#087A36",
  successSoft: "#E6F7ED",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 12,
  md: 16,
  pill: 999,
};

export const typography = {
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
  },
  meta: {
    fontSize: 12,
    fontWeight: "400",
  },
  kpi: {
    fontSize: 24,
    fontWeight: "700",
  },
};

export const shadow = {
  card: {
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export function visualCriticidade(criticidade) {
  if (criticidade === "atencao") {
    return {
      accent: colors.warning,
      soft: colors.warningSoft,
      text: colors.warningText,
    };
  }

  if (criticidade === "moderado") {
    return {
      accent: colors.moderate,
      soft: colors.moderateSoft,
      text: colors.moderateText,
    };
  }

  return {
    accent: colors.critical,
    soft: colors.criticalSoft,
    text: colors.criticalText,
  };
}
