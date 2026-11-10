import type { LpCopy } from "@/lib/lpLocale";

/** Textos e números (fictícios) do painel Blocaz, por idioma. */
const COPY_PT_BR = {
  url: "painel.blocaz.ind.br",
  company: "Blocaz Pré-Moldados",
  live: "AO VIVO",
  clock: "TER 22:14",
  aiA: "Cimento subiu 6%. Reajuste de ",
  aiMoney: "+4% na tabela",
  aiB: " protege sua margem.",
  aiTag: "IA · AGORA",
  kpis: [
    { label: "Pedidos hoje", value: "R$ 87 mil", trend: "↗ 9 de 14 fechados" },
    { label: "Margem · mês", value: "24,3%", trend: "↘ −2,1 p.p." },
    { label: "Estoque cimento", value: "3 sem", trend: "! demanda +18% em ago" },
  ],
  chartTitle: "Pedidos vs. capacidade",
  chartTag: "gargalo qui·sex",
  days: ["seg", "ter", "qua", "qui", "sex"],
  decide: "Pra você decidir",
  actions: [
    { label: "Compra de cimento", detail: "R$ 38 mil · pedido pronto", btn: "Aprovar" },
    { label: "Pedido Construtora Alfa", detail: "R$ 54 mil · fora da alçada", btn: "Revisar" },
    { label: "Reajuste +4% na tabela", detail: "simulação de impacto pronta", btn: "Aplicar" },
  ],
};

/** Empresa fictícia; nos EUA com nome, domínio e valores em dólar. */
export const BLOCAZ_COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  "pt-us": {
    ...COPY_PT_BR,
    url: "painel.blocazprecast.com",
    company: "Blocaz Precast",
    kpis: [
      { label: "Pedidos hoje", value: "US$ 42 mil", trend: "↗ 9 de 14 fechados" },
      COPY_PT_BR.kpis[1],
      COPY_PT_BR.kpis[2],
    ],
    actions: [
      { label: "Compra de cimento", detail: "US$ 18 mil · pedido pronto", btn: "Aprovar" },
      { label: "Pedido Alfa Builders", detail: "US$ 26 mil · fora da alçada", btn: "Revisar" },
      COPY_PT_BR.actions[2],
    ],
  },
  en: {
    url: "dashboard.blocazprecast.com",
    company: "Blocaz Precast",
    live: "LIVE",
    clock: "TUE 10:14 PM",
    aiA: "Cement is up 6%. A ",
    aiMoney: "+4% price list increase",
    aiB: " protects your margin.",
    aiTag: "AI · NOW",
    kpis: [
      { label: "Orders today", value: "$42K", trend: "↗ 9 of 14 closed" },
      { label: "Margin · month", value: "24.3%", trend: "↘ −2.1 pts" },
      { label: "Cement stock", value: "3 wks", trend: "! demand +18% in Aug" },
    ],
    chartTitle: "Orders vs. capacity",
    chartTag: "bottleneck Thu·Fri",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    decide: "For you to decide",
    actions: [
      { label: "Cement purchase", detail: "$18K · order ready", btn: "Approve" },
      { label: "Alfa Builders order", detail: "$26K · above approval limit", btn: "Review" },
      { label: "+4% price list increase", detail: "impact simulation ready", btn: "Apply" },
    ],
  },
};
