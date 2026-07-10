import { useIapIn } from "./useIapIn";

/**
 * PainelBlocaz (V1) — indústria de pré-moldados.
 * Extraído do mockups_painel_lp_businessv2.html seção V1.
 * Copy/valores/cores preservados.
 */
export function PainelBlocaz() {
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
            <span className="iap-lock">●</span> painel.blocaz.ind.br
          </div>
        </div>
        <div className="iap-panel">
          <div
            className="iap-panel-head iap-anim"
            style={{ "--iap-d": ".05s" } as React.CSSProperties}
          >
            <div className="iap-company">
              <div className="iap-logo">B</div>Blocaz Pré-Moldados
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
                Cimento subiu 6%. Reajuste de <span className="iap-money">+4% na tabela</span>{" "}
                protege sua margem.
              </div>
              <span className="iap-ai-tag">IA · AGORA</span>
            </div>
          </div>

          <div className="iap-kpis">
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".25s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Pedidos hoje</div>
              <div className="iap-kpi-value">R$ 87 mil</div>
              <span className="iap-trend iap-up">↗ 9 de 14 fechados</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".33s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Margem · mês</div>
              <div className="iap-kpi-value">24,3%</div>
              <span className="iap-trend iap-down">↘ −2,1 p.p.</span>
            </div>
            <div className="iap-kpi iap-anim" style={{ "--iap-d": ".41s" } as React.CSSProperties}>
              <div className="iap-kpi-label">Estoque cimento</div>
              <div className="iap-kpi-value iap-grad">3 sem</div>
              <span className="iap-trend iap-down">! demanda +18% em ago</span>
            </div>
          </div>

          <div className="iap-grid2">
            <div className="iap-box iap-anim" style={{ "--iap-d": ".5s" } as React.CSSProperties}>
              <div className="iap-box-title">
                Pedidos vs. capacidade <em style={{ color: "#fb7185" }}>gargalo qui·sex</em>
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
                    seg
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
                    ter
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
                    qua
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
                    qui
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
                    sex
                  </text>
                </g>
              </svg>
            </div>
            <div className="iap-box iap-anim" style={{ "--iap-d": ".6s" } as React.CSSProperties}>
              <div className="iap-box-title">Pra você decidir</div>
              <div className="iap-action">
                <span className="iap-ico iap-risk">!</span>
                <span className="iap-lbl">
                  Compra de cimento
                  <small>R$ 38 mil · pedido pronto</small>
                </span>
                <button className="iap-btn">Aprovar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-opp">↗</span>
                <span className="iap-lbl">
                  Pedido Construtora Alfa
                  <small>R$ 54 mil · fora da alçada</small>
                </span>
                <button className="iap-btn">Revisar</button>
              </div>
              <div className="iap-action">
                <span className="iap-ico iap-ai">✦</span>
                <span className="iap-lbl">
                  Reajuste +4% na tabela
                  <small>simulação de impacto pronta</small>
                </span>
                <button className="iap-btn iap-ghost">Aplicar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
