import { Reveal } from "@/components/Reveal";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { HeroForm } from "@/components/HeroForm";

/**
 * Hero (LP-B) — form inline + fluxo de dados SVG no background.
 *
 * A dobra hero traz o HeroForm creme no lado direito (mesmo componente
 * da /businessv2/diagnostico e do FinalForm no fim da LP — os leads
 * caem no mesmo funil business no CRM).
 *
 * Título 100% Instrument Serif italic (mix white/lime) — mesma face
 * do "Aula de IA todo mês. De graça." da hero da / (LP-A).
 *
 * Background: SVG de linhas curvas convergindo do lado esquerdo (nós
 * de origem próximos ao título) pro cluster de destino atrás do form,
 * com pontos de dados ao longo. Metáfora: input (problema) → sistema
 * IA (form/output). Fica atrás de todo o conteúdo via z-index, com
 * pointer-events: none pra não interceptar cliques.
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
                <span className="hero-b-h1-sans">Você foi feito para</span>
                <br />
                <em className="hero-b-h1-em">crescer a empresa,</em>
                <br />
                <span className="hero-b-h1-sans">não para</span>{" "}
                <em className="hero-b-h1-em">apagar incêndio.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="hero-b-sub">
                Em <em style={{ color: "var(--color-primary)" }}>90 dias</em> a gente te tira do
                operacional.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="hero-b-p">
                Construímos sistemas de IA sob medida que colocam seu time pra executar com padrão.
                Para você focar em fechar, não em resolver.
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
 * SVG viewBox 1440×852 (dimensão nominal do fold em 1440×900) com
 * preserveAspectRatio="xMidYMid slice" — cobre a section proporcionalmente
 * em qualquer viewport, cortando o excedente.
 *
 * Zero interatividade: pointer-events: none no wrapper + aria-hidden
 * pro screen reader ignorar. z-index: 1 fica abaixo do .hero-b (z-index:
 * 3 no CSS) mas acima do fundo gradiente da section.
 *
 * Um dos pontos (cluster central) tem SMIL animation nativa (radius
 * pulsando 2s cycle) — respeita prefers-reduced-motion via CSS que
 * pausa animações no wrapper.
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
          <linearGradient id="hero-flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d5e95a" stopOpacity="0" />
            <stop offset="0.3" stopColor="#d5e95a" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#d5e95a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d5e95a" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-flow-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* 5 linhas curvadas — cada uma vindo de um Y diferente à
            esquerda e convergindo pro cluster de destino (~x=940). */}
        <g
          stroke="url(#hero-flow-grad)"
          strokeWidth="1.4"
          fill="none"
          filter="url(#hero-flow-blur)"
        >
          <path d="M 200 200 C 500 220, 700 350, 940 380" opacity="0.7" />
          <path d="M 240 320 C 520 320, 720 400, 940 430" opacity="0.6" />
          <path d="M 260 470 C 520 460, 720 490, 940 490" opacity="0.7" />
          <path d="M 220 600 C 520 580, 720 560, 940 550" opacity="0.55" />
          <path d="M 320 700 C 560 660, 760 620, 940 600" opacity="0.4" />
        </g>

        {/* Dots ao longo das linhas — simulam dados fluindo */}
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

        {/* Nós de origem (esquerda) — anéis concêntricos, reforçam "input" */}
        <g fill="none" stroke="#d5e95a" strokeWidth="1" opacity="0.35">
          <circle cx="200" cy="200" r="6" />
          <circle cx="200" cy="200" r="12" opacity="0.4" />
          <circle cx="260" cy="470" r="6" />
          <circle cx="260" cy="470" r="12" opacity="0.4" />
        </g>

        {/* Cluster de destino (atrás do form) — reforça "output" */}
        <g fill="none" stroke="#d5e95a" strokeWidth="1" opacity="0.5">
          <circle cx="940" cy="490" r="10" />
          <circle cx="940" cy="490" r="18" opacity="0.5" />
          <circle cx="940" cy="490" r="28" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
