import { Reveal } from "@/components/Reveal";
import { QualifierStrip } from "@/components/sections/business/variantA/QualifierStrip";
import { HeroForm } from "@/components/HeroForm";

/**
 * Hero (LP-A) — mesma estrutura da /businessv2 com copy própria da /.
 *
 * Layout/tipografia/background travados via classes .hero-b-* no
 * styles.css (compartilhado com /businessv2). Copy própria pro ângulo
 * "recupere o controle da operação e escale a receita sem contratar".
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
                <span className="hero-b-h1-sans">Recupere o controle</span>
                <br />
                <em className="hero-b-h1-em">da operação</em>
                <br />
                <span className="hero-b-h1-sans">e escale a receita.</span>
                <br />
                <em className="hero-b-h1-em">Sem aumentar a folha.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="hero-b-sub">
                Em até <em style={{ color: "var(--color-primary)" }}>90 dias</em> implementamos os
                sistemas de IA que automatizam o operacional e liberam seu time para crescer.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="hero-b-p">
                Construímos sistemas de IA sob medida que eliminam o trabalho manual que trava sua
                operação — para você escalar receita sem precisar contratar mais ninguém.
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
 * Cópia idêntica do componente da variantB/Hero (ids sufixados -a pra
 * não colidir com o do LP-B se as duas telas coexistirem no bundle).
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
