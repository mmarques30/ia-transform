import { useIapIn } from "./useIapIn";

/**
 * PainelAtlas (V2) — serviços recorrentes (contábil).
 * Extraído do mockups_painel_lp_businessv2.html seção V2.
 * Copy/valores/cores preservados.
 */
export function PainelAtlas() {
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
            <span className="iap-lock">●</span> painel.atlascontabil.com.br
          </div>
        </div>
        <div className="iap-panel">
          <div
            className="iap-panel-head iap-anim"
            style={{ "--iap-d": ".05s" } as React.CSSProperties}
          >
            <div className="iap-company">
              <div className="iap-logo">A</div>Atlas Contábil
            </div>
            <div className="iap-live">
              <span className="iap-live-dot"></span>
              <span className="iap-on">AO VIVO</span>
              <span className="iap-clock">TER 22:14</span>
            </div>
          </div>

          <div className="iap-ai-bar iap-anim" style={{ "--iap-d": ".15s" } as React.CSSProperties}>
            <div className="iap-ai-inner">
              <div className="iap-ai-spark">✦</div>
              <div className="iap-ai-text">
                Vertex com padrão de churn — <span className="iap-money">R$ 8,5 mil/mês</span> em
                risco.
              </div>
              <span className="iap-ai-tag">IA · AGORA</span>
            </div>
          </div>

          <div className="iap-kpis">
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".25s" } as React.CSSProperties}>
              <div className="iap-kpi-label">MRR</div>
              <div className="iap-kpi-value">R$ 214 mil</div>
              <span className="iap-trend iap-up">↗ +R$ 11 mil</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".33s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Propostas paradas</div>
              <div className="iap-kpi-value">R$ 74 mil</div>
              <span className="iap-trend iap-down">! 4 sem resposta</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".41s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Upgrades possíveis</div>
              <div className="iap-kpi-value iap-grad">+R$ 19 mil</div>
              <span className="iap-trend iap-up">↗ 8 clientes prontos</span>
            </div>
          </div>

          <div className="iap-grid2">
            <div className="iap-box iap-anim" style={{ "--iap-d": ".5s" } as React.CSSProperties}>
              <div className="iap-box-title">
                MRR · 6 meses <em style={{ color: "#34d399" }}>+22%</em>
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
                  214k
                </text>
                <g
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fill="rgba(236,238,242,.4)"
                  textAnchor="middle"
                >
                  <text x="20" y="114">
                    fev
                  </text>
                  <text x="96" y="114">
                    mar
                  </text>
                  <text x="172" y="114">
                    abr
                  </text>
                  <text x="248" y="114">
                    mai
                  </text>
                  <text x="324" y="114">
                    jun
                  </text>
                  <text x="400" y="114" fontWeight="700" fill="#fff">
                    jul
                  </text>
                </g>
              </svg>
            </div>
            <div className="iap-box iap-anim" style={{ "--iap-d": ".6s" } as React.CSSProperties}>
              <div className="iap-box-title">Pra você decidir</div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  Reunião com a Vertex
                  <small>dossiê do cliente pronto</small>
                </span>
                <button className="iap-btn">Agendar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  Desconto Grupo Naves
                  <small>12% · acima da alçada</small>
                </span>
                <button className="iap-btn">Decidir</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-opp">↗</span>
                <span className="iap-lbl">
                  8 upgrades de plano
                  <small>+R$ 19 mil/mês</small>
                </span>
                <button className="iap-btn iap-ghost">Ver</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
