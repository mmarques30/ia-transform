import type { LpCopy } from "@/lib/lpLocale";

/** Textos e números (fictícios) do painel RotaSul, por idioma. */
const COPY_PT_BR = {
  url: "painel.rotasul.com.br",
  logo: "R",
  company: "Rota Sul Transportes",
  live: "AO VIVO",
  clock: "TER 22:14",
  aiA: "A rota CWB→POA está com ",
  aiMoney: "margem de 9%",
  aiB: " — puxando seu mês pra baixo.",
  aiTag: "IA · AGORA",
  kpis: [
    { label: "Julho", value: "R$ 638 mil", trend: "" },
    { label: "Ocupação da frota", value: "81%", trend: "↗ +9 p.p." },
    { label: "Custo por km", value: "R$ 4,86", trend: "↘ +7%" },
  ],
  chartTitle: "Margem por rota",
  chartTag: "1 abaixo do mínimo",
  routes: ["CWB→SP", "CWB→FLN", "SP→CWB", "CWB→CXS", "CWB→POA"],
  decide: "Pra você decidir",
  actions: [
    { label: "Frete spot fora da tabela", detail: "R$ 14 mil · margem 31%", btn: "Aprovar" },
    { label: "Contrato mensal Mega", detail: "R$ 92 mil/mês · minuta pronta", btn: "Revisar" },
    { label: "Reajuste CWB→POA", detail: "simulação de frete pronta", btn: "Simular" },
  ],
};

/** Empresa fictícia; nos EUA com nome, domínio, rotas e valores de lá. */
export const ROTASUL_COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  "pt-us": {
    ...COPY_PT_BR,
    url: "painel.southlinefreight.com",
    logo: "S",
    company: "Southline Freight",
    aiA: "A rota MIA→ATL está com ",
    kpis: [
      { label: "Julho", value: "US$ 320 mil", trend: "" },
      COPY_PT_BR.kpis[1],
      { label: "Custo por milha", value: "US$ 2,41", trend: "↘ +7%" },
    ],
    routes: ["MIA→ORL", "MIA→TPA", "ORL→MIA", "MIA→JAX", "MIA→ATL"],
    actions: [
      { label: "Frete spot fora da tabela", detail: "US$ 7 mil · margem 31%", btn: "Aprovar" },
      { label: "Contrato mensal Mega", detail: "US$ 46 mil/mês · minuta pronta", btn: "Revisar" },
      { label: "Reajuste MIA→ATL", detail: "simulação de frete pronta", btn: "Simular" },
    ],
  },
  en: {
    url: "dashboard.southlinefreight.com",
    logo: "S",
    company: "Southline Freight",
    live: "LIVE",
    clock: "TUE 10:14 PM",
    aiA: "The MIA→ATL lane is running at a ",
    aiMoney: "9% margin",
    aiB: " — dragging your month down.",
    aiTag: "AI · NOW",
    kpis: [
      { label: "July", value: "$320K", trend: "" },
      { label: "Fleet utilization", value: "81%", trend: "↗ +9 pts" },
      { label: "Cost per mile", value: "$2.41", trend: "↘ +7%" },
    ],
    chartTitle: "Margin by lane",
    chartTag: "1 below minimum",
    routes: ["MIA→ORL", "MIA→TPA", "ORL→MIA", "MIA→JAX", "MIA→ATL"],
    decide: "For you to decide",
    actions: [
      { label: "Spot freight off the rate card", detail: "$7K · 31% margin", btn: "Approve" },
      { label: "Mega monthly contract", detail: "$46K/month · draft ready", btn: "Review" },
      { label: "MIA→ATL rate increase", detail: "freight simulation ready", btn: "Simulate" },
    ],
  },
};
