import type { LpCopy } from "@/lib/lpLocale";

/** Textos e números (fictícios) do painel Atlas, por idioma. */
const COPY_PT_BR = {
  url: "painel.atlascontabil.com.br",
  company: "Atlas Contábil",
  live: "AO VIVO",
  clock: "TER 22:14",
  aiA: "Vertex com padrão de churn — ",
  aiMoney: "R$ 8,5 mil/mês",
  aiB: " em risco.",
  aiTag: "IA · AGORA",
  kpis: [
    { label: "MRR", value: "R$ 214 mil", trend: "↗ +R$ 11 mil" },
    { label: "Propostas paradas", value: "R$ 74 mil", trend: "! 4 sem resposta" },
    { label: "Upgrades possíveis", value: "+R$ 19 mil", trend: "↗ 8 clientes prontos" },
  ],
  chartTitle: "MRR · 6 meses",
  chartEnd: "214k",
  months: ["fev", "mar", "abr", "mai", "jun", "jul"],
  decide: "Pra você decidir",
  actions: [
    { label: "Reunião com a Vertex", detail: "dossiê do cliente pronto", btn: "Agendar" },
    { label: "Desconto Grupo Naves", detail: "12% · acima da alçada", btn: "Decidir" },
    { label: "8 upgrades de plano", detail: "+R$ 19 mil/mês", btn: "Ver" },
  ],
};

/** Empresa fictícia; nos EUA com nome, domínio e valores em dólar. */
export const ATLAS_COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  "pt-us": {
    ...COPY_PT_BR,
    url: "painel.atlasaccounting.com",
    company: "Atlas Accounting",
    aiMoney: "US$ 4,2 mil/mês",
    kpis: [
      { label: "MRR", value: "US$ 108 mil", trend: "↗ +US$ 5,5 mil" },
      { label: "Propostas paradas", value: "US$ 37 mil", trend: "! 4 sem resposta" },
      { label: "Upgrades possíveis", value: "+US$ 9,5 mil", trend: "↗ 8 clientes prontos" },
    ],
    chartEnd: "108k",
    actions: [
      COPY_PT_BR.actions[0],
      { label: "Desconto Naves Group", detail: "12% · acima da alçada", btn: "Decidir" },
      { label: "8 upgrades de plano", detail: "+US$ 9,5 mil/mês", btn: "Ver" },
    ],
  },
  en: {
    url: "dashboard.atlasaccounting.com",
    company: "Atlas Accounting",
    live: "LIVE",
    clock: "TUE 10:14 PM",
    aiA: "Vertex shows a churn pattern — ",
    aiMoney: "$4.2K/month",
    aiB: " at risk.",
    aiTag: "AI · NOW",
    kpis: [
      { label: "MRR", value: "$108K", trend: "↗ +$5.5K" },
      { label: "Stalled proposals", value: "$37K", trend: "! 4 with no reply" },
      { label: "Possible upgrades", value: "+$9.5K", trend: "↗ 8 clients ready" },
    ],
    chartTitle: "MRR · 6 months",
    chartEnd: "108k",
    months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    decide: "For you to decide",
    actions: [
      { label: "Meeting with Vertex", detail: "client dossier ready", btn: "Schedule" },
      { label: "Naves Group discount", detail: "12% · above approval limit", btn: "Decide" },
      { label: "8 plan upgrades", detail: "+$9.5K/month", btn: "View" },
    ],
  },
};
