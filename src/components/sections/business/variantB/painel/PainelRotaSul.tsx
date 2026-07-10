import { useIapIn } from "./useIapIn";

/**
 * PainelRotaSul (V3) — operação física / logística.
 * Extraído do mockups_painel_lp_businessv2.html seção V3.
 * Copy/valores/cores preservados.
 */
export function PainelRotaSul() {
  const { ref, isIn } = useIapIn();
  return (
    <div
      className="iap-stage"
      style={
        {
          "--iap-g1": "#f472b6",
          "--iap-g2": "#a78bfa",
          "--iap-glow": "rgba(217,127,216,.35)",
          "--iap-tintA": "rgba(244,114,182,.12)",
          "--iap-tintB": "rgba(167,139,250,.11)",
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
            <span className="iap-lock">●</span> painel.rotasul.com.br
          </div>
        </div>
        <div className="iap-panel">
          <div
            className="iap-panel-head iap-anim"
            style={{ "--iap-d": ".05s" } as React.CSSProperties}
          >
            <div className="iap-company">
              <div className="iap-logo">R</div>Rota Sul Transportes
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
                A rota CWB→POA está com <span className="iap-money">margem de 9%</span> — puxando
                seu mês pra baixo.
              </div>
              <span className="iap-ai-tag">IA · AGORA</span>
            </div>
          </div>

          <div className="iap-kpis">
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".25s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Julho</div>
              <div className="iap-kpi-value">R$ 638 mil</div>
              <div className="iap-meta-bar">
                <i style={{ width: "88%" }}></i>
              </div>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".33s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Ocupação da frota</div>
              <div className="iap-kpi-value iap-grad">81%</div>
              <span className="iap-trend iap-up">↗ +9 p.p.</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".41s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Custo por km</div>
              <div className="iap-kpi-value">R$ 4,86</div>
              <span className="iap-trend iap-down">↘ +7%</span>
            </div>
          </div>

          <div className="iap-grid2">
            <div className="iap-box iap-anim" style={{ "--iap-d": ".5s" } as React.CSSProperties}>
              <div className="iap-box-title">
                Margem por rota <em style={{ color: "#fb7185" }}>1 abaixo do mínimo</em>
              </div>
              <svg className="iap-chart" viewBox="0 0 420 118" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#f472b6" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <g fontFamily="JetBrains Mono" fontSize="9.5">
                  <text x="10" y="18" fill="rgba(236,238,242,.6)">
                    CWB→SP
                  </text>
                  <rect
                    className="iap-hbar"
                    style={{ transitionDelay: ".5s" }}
                    x="105"
                    y="8"
                    width="240"
                    height="12"
                    rx="6"
                    fill="url(#gr)"
                  />
                  <text x="353" y="18" fill="#fff" fontWeight="700">
                    28%
                  </text>
                  <text x="10" y="42" fill="rgba(236,238,242,.6)">
                    CWB→FLN
                  </text>
                  <rect
                    className="iap-hbar"
                    style={{ transitionDelay: ".6s" }}
                    x="105"
                    y="32"
                    width="206"
                    height="12"
                    rx="6"
                    fill="url(#gr)"
                    opacity=".7"
                  />
                  <text x="319" y="42" fill="#fff" fontWeight="700">
                    24%
                  </text>
                  <text x="10" y="66" fill="rgba(236,238,242,.6)">
                    SP→CWB
                  </text>
                  <rect
                    className="iap-hbar"
                    style={{ transitionDelay: ".7s" }}
                    x="105"
                    y="56"
                    width="171"
                    height="12"
                    rx="6"
                    fill="url(#gr)"
                    opacity=".5"
                  />
                  <text x="284" y="66" fill="#fff" fontWeight="700">
                    20%
                  </text>
                  <text x="10" y="90" fill="rgba(236,238,242,.6)">
                    CWB→CXS
                  </text>
                  <rect
                    className="iap-hbar"
                    style={{ transitionDelay: ".8s" }}
                    x="105"
                    y="80"
                    width="137"
                    height="12"
                    rx="6"
                    fill="url(#gr)"
                    opacity=".35"
                  />
                  <text x="250" y="90" fill="#fff" fontWeight="700">
                    16%
                  </text>
                  <text x="10" y="114" fill="#fb7185" fontWeight="700">
                    CWB→POA
                  </text>
                  <rect
                    className="iap-hbar"
                    style={{ transitionDelay: ".9s" }}
                    x="105"
                    y="104"
                    width="77"
                    height="12"
                    rx="6"
                    fill="#fb7185"
                  />
                  <text x="190" y="114" fill="#fb7185" fontWeight="700">
                    9%
                  </text>
                </g>
              </svg>
            </div>
            <div className="iap-box iap-anim" style={{ "--iap-d": ".6s" } as React.CSSProperties}>
              <div className="iap-box-title">Pra você decidir</div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  Frete spot fora da tabela
                  <small>R$ 14 mil · margem 31%</small>
                </span>
                <button className="iap-btn">Aprovar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-opp">↗</span>
                <span className="iap-lbl">
                  Contrato mensal Mega
                  <small>R$ 92 mil/mês · minuta pronta</small>
                </span>
                <button className="iap-btn">Revisar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-ai">✦</span>
                <span className="iap-lbl">
                  Reajuste CWB→POA
                  <small>simulação de frete pronta</small>
                </span>
                <button className="iap-btn iap-ghost">Simular</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
