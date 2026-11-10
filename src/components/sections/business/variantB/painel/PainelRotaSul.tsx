import { useIapIn } from "./useIapIn";
import { useLpCopy } from "@/lib/lpLocale";
import { ROTASUL_COPY as COPY } from "./painelRotaSulCopy";

/**
 * PainelRotaSul (V3) — operação física / logística.
 * Extraído do mockups_painel_lp_businessv2.html seção V3.
 * Copy/valores/cores preservados.
 */
export function PainelRotaSul() {
  const c = useLpCopy(COPY);
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
            <span className="iap-lock">●</span> {c.url}
          </div>
        </div>
        <div className="iap-panel">
          <div
            className="iap-panel-head iap-anim"
            style={{ "--iap-d": ".05s" } as React.CSSProperties}
          >
            <div className="iap-company">
              <div className="iap-logo">{c.logo}</div>
              {c.company}
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
              <div className="iap-meta-bar">
                <i style={{ width: "88%" }}></i>
              </div>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".33s" } as React.CSSProperties}>
              <div className="iap-kpi-label">{c.kpis[1].label}</div>
              <div className="iap-kpi-value iap-grad">{c.kpis[1].value}</div>
              <span className="iap-trend iap-up">{c.kpis[1].trend}</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".41s" } as React.CSSProperties}>
              <div className="iap-kpi-label">{c.kpis[2].label}</div>
              <div className="iap-kpi-value">{c.kpis[2].value}</div>
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
                  <linearGradient id="gr" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#f472b6" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <g fontFamily="JetBrains Mono" fontSize="9.5">
                  <text x="10" y="18" fill="rgba(236,238,242,.6)">
                    {c.routes[0]}
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
                    {c.routes[1]}
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
                    {c.routes[2]}
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
                    {c.routes[3]}
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
                    {c.routes[4]}
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
              <div className="iap-box-title">{c.decide}</div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  {c.actions[0].label}
                  <small>{c.actions[0].detail}</small>
                </span>
                <span className="iap-btn" aria-hidden>
                  {c.actions[0].btn}
                </span>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-opp">↗</span>
                <span className="iap-lbl">
                  {c.actions[1].label}
                  <small>{c.actions[1].detail}</small>
                </span>
                <span className="iap-btn" aria-hidden>
                  {c.actions[1].btn}
                </span>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-ai">✦</span>
                <span className="iap-lbl">
                  {c.actions[2].label}
                  <small>{c.actions[2].detail}</small>
                </span>
                <span className="iap-btn iap-ghost" aria-hidden>
                  {c.actions[2].btn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
