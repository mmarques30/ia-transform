import { useIapIn } from "./useIapIn";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

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
const COPY: LpCopy<typeof COPY_PT_BR> = {
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

/**
 * PainelBlocaz (V1) — indústria de pré-moldados.
 * Extraído do mockups_painel_lp_businessv2.html seção V1.
 * Copy/valores/cores preservados.
 */
export function PainelBlocaz() {
  const c = useLpCopy(COPY);
  const { ref, isIn } = useIapIn();
  return (
    <div
      className="iap-stage"
      style={
        {
          "--iap-g1": "#ff8a3d",
          "--iap-g2": "#ff4d6d",
          "--iap-glow": "rgba(255,107,84,.38)",
          "--iap-tintA": "rgba(255,138,61,.13)",
          "--iap-tintB": "rgba(255,77,109,.11)",
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
              <div className="iap-logo">B</div>{c.company}
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
              <span className="iap-trend iap-down">{c.kpis[2].trend}</span>
            </div>
          </div>

          <div className="iap-grid2">
            <div className="iap-box iap-anim" style={{ "--iap-d": ".5s" } as React.CSSProperties}>
              <div className="iap-box-title">
                {c.chartTitle} <em style={{ color: "#fb7185" }}>{c.chartTag}</em>
              </div>
              <svg className="iap-chart" viewBox="0 0 420 118" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ff4d6d" />
                    <stop offset="1" stopColor="#ff8a3d" />
                  </linearGradient>
                </defs>
                <line
                  x1="10"
                  y1="28"
                  x2="410"
                  y2="28"
                  stroke="#fb7185"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                  opacity=".7"
                />
                <g
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fill="rgba(236,238,242,.4)"
                  textAnchor="middle"
                >
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".5s" }}
                    x="24"
                    y="64"
                    width="44"
                    height="44"
                    rx="5"
                    fill="url(#gb)"
                    opacity=".35"
                  />
                  <text x="46" y="116">
                    {c.days[0]}
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".6s" }}
                    x="98"
                    y="54"
                    width="44"
                    height="54"
                    rx="5"
                    fill="url(#gb)"
                    opacity=".35"
                  />
                  <text x="120" y="116">
                    {c.days[1]}
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".7s" }}
                    x="172"
                    y="46"
                    width="44"
                    height="62"
                    rx="5"
                    fill="url(#gb)"
                    opacity=".35"
                  />
                  <text x="194" y="116">
                    {c.days[2]}
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".8s" }}
                    x="246"
                    y="20"
                    width="44"
                    height="88"
                    rx="5"
                    fill="url(#gb)"
                  />
                  <text x="268" y="116" fontWeight="700" fill="#fff">
                    {c.days[3]}
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".9s" }}
                    x="320"
                    y="14"
                    width="44"
                    height="94"
                    rx="5"
                    fill="url(#gb)"
                  />
                  <text x="342" y="116" fontWeight="700" fill="#fff">
                    {c.days[4]}
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
                <span className="iap-ico iap-opp">↗</span>
                <span className="iap-lbl">
                  {c.actions[1].label}
                  <small>{c.actions[1].detail}</small>
                </span>
                <span className="iap-btn" aria-hidden>{c.actions[1].btn}</span>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-ai">✦</span>
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
