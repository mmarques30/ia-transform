import { Reveal } from "@/components/Reveal";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { HeroForm } from "@/components/HeroForm";

/**
 * Hero (LP-A) — mesma estrutura da /businessv2 (variantB/Hero) aplicada
 * na `/`. Estrutura, layout, grid, tipografia e background são idênticos
 * ao LP-B; só a copy do title + sub + paragraph muda pra o ângulo da
 * LP-A ("custo escondido no processo") em vez do LP-B ("crescer, não
 * apagar incêndio").
 *
 * Título 100% Instrument Serif italic com trechos destacados em lime
 * (mesmo padrão editorial do LP-B). QualifierStrip vermelha no topo,
 * HeroFlowBg SVG no fundo (linhas curvadas + nós), HeroForm compact no
 * canto direito. Grade 56fr/44fr, section fills fold (min-height calc
 * 100vh - 48 pra QualifierStrip).
 */

export function Hero() {
  return (
    <>
      <QualifierStrip />
      <section id="top" className="hero-section-b">
        <HeroFlowBg />
        <div className="hero-b">
          <div className="hero-b-text">
            <Reveal>
              <img
                src="/brand/iaplicada-logo-dark.png"
                alt="IAplicada"
                height={28}
                className="hero-b-logo"
              />
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="hero-b-h1">
                <span className="hero-b-h1-sans">Contratar mais</span>
                <br />
                <em className="hero-b-h1-em">não vai resolver.</em>
                <br />
                <span className="hero-b-h1-sans">O problema está</span>
                <br />
                <em className="hero-b-h1-em">no processo.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="hero-b-sub">
                <em style={{ color: "var(--color-primary)" }}>+40 empresas</em> já operam com a
                IAplicada.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="hero-b-p">
                A IAplicada encontra esse custo invisível, coloca número nele e constrói o sistema
                que o elimina.
              </p>
            </Reveal>
          </div>

          <div className="hero-b-form-col">
            <Reveal delay={0.15}>
              <HeroForm formSlug="business" thankYouPath="/thank-you-business" compact />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * HeroFlowBg — camada decorativa de fluxo de dados no fundo da hero.
 * Cópia idêntica do componente da variantB/Hero: 5 linhas curvadas
 * convergindo do lado esquerdo pro cluster de destino atrás do form,
 * com pontos de dados ao longo e nós de origem/destino. Um circle
 * central tem SMIL animation (radius pulsando 2s cycle) — respeita
 * prefers-reduced-motion via CSS.
 *
 * Duplicado aqui (não importado de variantB) pra manter cada Hero
 * self-contained e evitar cross-variant coupling. As duas versões
 * devem ficar sincronizadas manualmente se o desenho do fluxo mudar.
 */
function HeroFlowBg() {
  return (
    <div className="hero-flow-bg" aria-hidden="true">
      <div className="hero-flow-glow" />
      <svg
        viewBox="0 0 1440 852"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-flow-grad-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d5e95a" stopOpacity="0" />
            <stop offset="0.3" stopColor="#d5e95a" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#d5e95a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d5e95a" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-flow-blur-a">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        <g
          stroke="url(#hero-flow-grad-a)"
          strokeWidth="1.4"
          fill="none"
          filter="url(#hero-flow-blur-a)"
        >
          <path d="M 200 200 C 500 220, 700 350, 940 380" opacity="0.7" />
          <path d="M 240 320 C 520 320, 720 400, 940 430" opacity="0.6" />
          <path d="M 260 470 C 520 460, 720 490, 940 490" opacity="0.7" />
          <path d="M 220 600 C 520 580, 720 560, 940 550" opacity="0.55" />
          <path d="M 320 700 C 560 660, 760 620, 940 600" opacity="0.4" />
        </g>

        <g fill="#d5e95a">
          <circle cx="380" cy="270" r="2.5" opacity="0.85" />
          <circle cx="620" cy="330" r="2" opacity="0.7" />
          <circle cx="810" cy="370" r="1.8" opacity="0.5" />
          <circle cx="450" cy="340" r="2" opacity="0.65" />
          <circle cx="720" cy="410" r="2.5" opacity="0.85" />
          <circle cx="380" cy="465" r="2.2" opacity="0.7" />
          <circle cx="660" cy="480" r="2.8" opacity="0.9">
            <animate attributeName="r" values="2.8;4;2.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="880" cy="495" r="2" opacity="0.6" />
          <circle cx="400" cy="590" r="1.8" opacity="0.5" />
          <circle cx="700" cy="570" r="2.2" opacity="0.65" />
        </g>

        <g fill="none" stroke="#d5e95a" strokeWidth="1" opacity="0.35">
          <circle cx="200" cy="200" r="6" />
          <circle cx="200" cy="200" r="12" opacity="0.4" />
          <circle cx="260" cy="470" r="6" />
          <circle cx="260" cy="470" r="12" opacity="0.4" />
        </g>

        <g fill="none" stroke="#d5e95a" strokeWidth="1" opacity="0.5">
          <circle cx="940" cy="490" r="10" />
          <circle cx="940" cy="490" r="18" opacity="0.5" />
          <circle cx="940" cy="490" r="28" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
