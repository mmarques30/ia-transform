import { useIapIn } from "./useIapIn";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

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
const COPY: LpCopy<typeof COPY_PT_BR> = {
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

/**
 * PainelAtlas (V2) — serviços recorrentes (contábil).
 * Extraído do mockups_painel_lp_businessv2.html seção V2.
 * Copy/valores/cores preservados.
 */
export function PainelAtlas() {
  const c = useLpCopy(COPY);
  const { ref, isIn } = useIapIn();
  return (
    <div
      className="iap-stage"
      style={
        {
          "--iap-g1": "#2dd4a7",
          "--iap-g2": "#38bdf8",
          "--iap-glow": "rgba(45,212,180,.35)",
          "--iap-tintA": "rgba(45,212,167,.12)",
          "--iap-tintB": "rgba(56,189,248,.11)",
        } as React.CSSProperties
      }
    >
      <div ref={ref} className={`iap-device${isIn ? " iap-in" : ""}`}>
        <div className="iap-chrome">
          <div className="iap-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="iap-urlbar">
            <span className="iap-lock">●</span> {c.url}
          </div>
        </div>
        <div className="iap-panel">
          <div
            className="iap-panel-head iap-anim"
            style={{ "--iap-d": ".05s" } as React.CSSProperties}
          >
            <div className="iap-company">
              <div className="iap-logo">A</div>{c.company}
            </div>
            <div className="iap-live">
              <span className="iap-live-dot"></span>
              <span className="iap-on">{c.live}</span>
              <span className="iap-clock">{c.clock}</span>
            </div>
          </div>

          <div className="iap-ai-bar iap-anim" style={{ "--iap-d": ".15s" } as React.CSSProperties}>
            <div className="iap-ai-inner">
              <div className="iap-ai-spark">✦</div>
              <div className="iap-ai-text">
                {c.aiA}
                <span className="iap-money">{c.aiMoney}</span>
                {c.aiB}
              </div>
              <span className="iap-ai-tag">{c.aiTag}</span>
            </div>
          </div>

          <div className="iap-kpis">
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".25s" } as React.CSSProperties}>
              <div className="iap-kpi-label">{c.kpis[0].label}</div>
              <div className="iap-kpi-value">{c.kpis[0].value}</div>
              <span className="iap-trend iap-up">{c.kpis[0].trend}</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".33s" } as React.CSSProperties}>
              <div className="iap-kpi-label">{c.kpis[1].label}</div>
              <div className="iap-kpi-value">{c.kpis[1].value}</div>
              <span className="iap-trend iap-down">{c.kpis[1].trend}</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".41s" } as React.CSSProperties}>
              <div className="iap-kpi-label">{c.kpis[2].label}</div>
              <div className="iap-kpi-value iap-grad">{c.kpis[2].value}</div>
              <span className="iap-trend iap-up">{c.kpis[2].trend}</span>
            </div>
          </div>

          <div className="iap-grid2">
            <div className="iap-box iap-anim" style={{ "--iap-d": ".5s" } as React.CSSProperties}>
              <div className="iap-box-title">
                {c.chartTitle} <em style={{ color: "#34d399" }}>+22%</em>
              </div>
              <svg className="iap-chart" viewBox="0 0 420 118" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#2dd4a7" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="gaf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2dd4a7" stopOpacity=".25" />
                    <stop offset="1" stopColor="#2dd4a7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="iap-area"
                  d="M20,88 96,80 172,72 248,54 324,42 400,24 L400,104 20,104 Z"
                  fill="url(#gaf)"
                />
                <polyline
                  className="iap-line"
                  points="20,88 96,80 172,72 248,54 324,42 400,24"
                  fill="none"
                  stroke="url(#ga)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g fill="#38bdf8">
                  <circle
                    className="iap-pt"
                    style={{ transitionDelay: "1s" }}
                    cx="20"
                    cy="88"
                    r="3.5"
                    opacity=".5"
                  />
                  <circle
                    className="iap-pt"
                    style={{ transitionDelay: "1.15s" }}
                    cx="96"
                    cy="80"
                    r="3.5"
                    opacity=".5"
                  />
                  <circle
                    className="iap-pt"
                    style={{ transitionDelay: "1.3s" }}
                    cx="172"
                    cy="72"
                    r="3.5"
                    opacity=".5"
                  />
                  <circle
                    className="iap-pt"
                    style={{ transitionDelay: "1.45s" }}
                    cx="248"
                    cy="54"
                    r="3.5"
                    opacity=".5"
                  />
                  <circle
                    className="iap-pt"
                    style={{ transitionDelay: "1.6s" }}
                    cx="324"
                    cy="42"
                    r="3.5"
                    opacity=".5"
                  />
                  <circle
                    className="iap-pt"
                    style={{ transitionDelay: "1.75s" }}
                    cx="400"
                    cy="24"
                    r="5"
                  />
                </g>
                <text
                  className="iap-pt"
                  style={{ transitionDelay: "1.9s" }}
                  x="400"
                  y="12"
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  fontWeight="700"
                  fill="#38bdf8"
                  textAnchor="end"
                >
                  {c.chartEnd}
                </text>
                <g
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fill="rgba(236,238,242,.4)"
                  textAnchor="middle"
                >
                  <text x="20" y="114">
                    {c.months[0]}
                  </text>
                  <text x="96" y="114">
                    {c.months[1]}
                  </text>
                  <text x="172" y="114">
                    {c.months[2]}
                  </text>
                  <text x="248" y="114">
                    {c.months[3]}
                  </text>
                  <text x="324" y="114">
                    {c.months[4]}
                  </text>
                  <text x="400" y="114" fontWeight="700" fill="#fff">
                    {c.months[5]}
                  </text>
                </g>
              </svg>
            </div>
            <div className="iap-box iap-anim" style={{ "--iap-d": ".6s" } as React.CSSProperties}>
              <div className="iap-box-title">{c.decide}</div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  {c.actions[0].label}
                  <small>{c.actions[0].detail}</small>
                </span>
                <span className="iap-btn" aria-hidden>{c.actions[0].btn}</span>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  {c.actions[1].label}
                  <small>{c.actions[1].detail}</small>
                </span>
                <span className="iap-btn" aria-hidden>{c.actions[1].btn}</span>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-opp">↗</span>
                <span className="iap-lbl">
                  {c.actions[2].label}
                  <small>{c.actions[2].detail}</small>
                </span>
                <span className="iap-btn iap-ghost" aria-hidden>{c.actions[2].btn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
