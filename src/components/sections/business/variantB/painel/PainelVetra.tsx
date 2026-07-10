import { useIapIn } from "./useIapIn";

/**
 * PainelVetra (V4) — usado como HeroMockup da LP-B.
 *
 * Extraído do arquivo mockups_painel_lp_businessv2.html, section V4.
 * Copy, valores e cores preservados exatamente como estavam.
 *
 * Cores (CSS vars locais no wrapper):
 *   --iap-g1: #4f7cff
 *   --iap-g2: #9f6bff
 *   --iap-glow: rgba(111,110,255,.4)
 *   --iap-tintA: rgba(79,124,255,.14)
 *   --iap-tintB: rgba(159,107,255,.12)
 *
 * Animações portadas do <script> original via useIapIn hook —
 * IntersectionObserver threshold 0.25, "unobserve after first hit".
 */
export function PainelVetra() {
  const { ref, isIn } = useIapIn();
  return (
    <div
      className="iap-stage"
      style={
        {
          "--iap-g1": "#4f7cff",
          "--iap-g2": "#9f6bff",
          "--iap-glow": "rgba(111,110,255,.4)",
          "--iap-tintA": "rgba(79,124,255,.14)",
          "--iap-tintB": "rgba(159,107,255,.12)",
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
            <span className="iap-lock">●</span> painel.vetraengenharia.com.br
          </div>
        </div>
        <div className="iap-panel">
          <div
            className="iap-panel-head iap-anim"
            style={{ "--iap-d": ".05s" } as React.CSSProperties}
          >
            <div className="iap-company">
              <div className="iap-logo">V</div>Vetra Engenharia
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
                Você bate a meta <span className="iap-money">dia 27</span>. Só 2 decisões te
                esperam.
              </div>
              <span className="iap-ai-tag">IA · AGORA</span>
            </div>
          </div>

          <div className="iap-kpis">
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".25s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Julho</div>
              <div className="iap-kpi-value">R$ 842 mil</div>
              <div className="iap-meta-bar">
                <i style={{ width: "84%" }}></i>
              </div>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".33s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Projeção IA</div>
              <div className="iap-kpi-value iap-grad">R$ 1,06 M</div>
              <span className="iap-trend iap-up">↗ meta +6%</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".41s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Parado em propostas</div>
              <div className="iap-kpi-value">R$ 96 mil</div>
              <span className="iap-trend iap-down">! 3 sem resposta</span>
            </div>
          </div>

          <div className="iap-grid2">
            <div className="iap-box iap-anim" style={{ "--iap-d": ".5s" } as React.CSSProperties}>
              <div className="iap-box-title">
                Receita · 7 dias <em style={{ color: "#34d399" }}>+12%</em>
              </div>
              <svg className="iap-chart" viewBox="0 0 420 118" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#9f6bff" />
                    <stop offset="1" stopColor="#4f7cff" />
                  </linearGradient>
                </defs>
                <g
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fill="rgba(236,238,242,.4)"
                  textAnchor="middle"
                >
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".5s" }}
                    x="12"
                    y="56"
                    width="38"
                    height="52"
                    rx="5"
                    fill="url(#gv)"
                    opacity=".3"
                  />
                  <text x="31" y="116">
                    q
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".58s" }}
                    x="70"
                    y="44"
                    width="38"
                    height="64"
                    rx="5"
                    fill="url(#gv)"
                    opacity=".3"
                  />
                  <text x="89" y="116">
                    q
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".66s" }}
                    x="128"
                    y="62"
                    width="38"
                    height="46"
                    rx="5"
                    fill="url(#gv)"
                    opacity=".3"
                  />
                  <text x="147" y="116">
                    s
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".74s" }}
                    x="186"
                    y="76"
                    width="38"
                    height="32"
                    rx="5"
                    fill="url(#gv)"
                    opacity=".3"
                  />
                  <text x="205" y="116">
                    s
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".82s" }}
                    x="244"
                    y="82"
                    width="38"
                    height="26"
                    rx="5"
                    fill="url(#gv)"
                    opacity=".3"
                  />
                  <text x="263" y="116">
                    d
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".9s" }}
                    x="302"
                    y="36"
                    width="38"
                    height="72"
                    rx="5"
                    fill="url(#gv)"
                    opacity=".3"
                  />
                  <text x="321" y="116">
                    s
                  </text>
                  <rect
                    className="iap-bar"
                    style={{ transitionDelay: ".98s" }}
                    x="360"
                    y="14"
                    width="38"
                    height="94"
                    rx="5"
                    fill="url(#gv)"
                  />
                  <text x="379" y="116" fontWeight="700" fill="#fff">
                    hoje
                  </text>
                  <text
                    className="iap-pt"
                    style={{ transitionDelay: "1.5s" }}
                    x="379"
                    y="8"
                    fontWeight="700"
                    fill="#9f6bff"
                    fontSize="10"
                  >
                    58k
                  </text>
                </g>
              </svg>
            </div>
            <div className="iap-box iap-anim" style={{ "--iap-d": ".6s" } as React.CSSProperties}>
              <div className="iap-box-title">Pra você decidir</div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  Contrato #88
                  <small>R$ 32 mil · vence sexta</small>
                </span>
                <button className="iap-btn">Assinar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  2 boletos vencidos
                  <small>R$ 21 mil · cobrança pronta</small>
                </span>
                <button className="iap-btn">Cobrar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-ai">✦</span>
                <span className="iap-lbl">
                  Follow-up nas 3 propostas
                  <small>R$ 96 mil em jogo</small>
                </span>
                <button className="iap-btn iap-ghost">Aprovar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
