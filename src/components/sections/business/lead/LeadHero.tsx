import { Reveal } from "@/components/Reveal";

interface LeadHeroProps {
  onOpenModal: () => void;
}

export function LeadHero({ onOpenModal }: LeadHeroProps) {
  return (
    <section className="hero-section-b">
      <HeroFlowBg />
      <div
        className="relative z-[3] w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-[72px]"
      >
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <h1
              className="font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                fontSize: "clamp(40px, 7vw, 68px)",
                textWrap: "balance",
              }}
            >
              Automatize{" "}
              <span style={{ color: "var(--color-primary)" }}>o que trava</span>{" "}
              sua operacao.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Sem contratar ninguem.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.05}>
            <p
              className="mt-5"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                fontSize: "clamp(18px, 3vw, 24px)",
                lineHeight: 1.35,
                color: "var(--color-foreground, #f4f5ec)",
              }}
            >
              Prompts, automacoes e agentes de IA{" "}
              <em style={{ color: "var(--color-primary)" }}>prontos para usar</em> na sua empresa
              — testados em operacoes reais, nao em teoria.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              className="mt-4 mx-auto"
              style={{
                maxWidth: "42ch",
                fontSize: "15.5px",
                lineHeight: 1.65,
                color: "var(--text-sage, #a3a898)",
              }}
            >
              Um kit gratuito com tudo que voce precisa para comecar a automatizar
              processos — sem equipe de TI e sem saber programar.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-9">
              <button
                type="button"
                onClick={onOpenModal}
                className="cta-glow-btn inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-[10px] font-black text-[14px] lg:text-[15px] uppercase tracking-[0.06em]"
                style={{
                  background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                  color: "#0a0c07",
                  boxShadow:
                    "0 0 0 6px rgba(200,224,64,0.15), 0 24px 48px -14px rgba(200,224,64,0.5), inset 0 -2px 0 rgba(0,0,0,0.2)",
                }}
              >
                Quero o kit completo &rarr;
              </button>
              <p
                className="mt-3.5 text-[12px] tracking-[0.04em]"
                style={{ color: "var(--text-muted, #8a8e82)" }}
              >
                Gratuito &#10038; Acesso imediato &#10038; Sem cartao de credito
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

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
          <linearGradient id="hero-flow-grad-lead" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d5e95a" stopOpacity="0" />
            <stop offset="0.3" stopColor="#d5e95a" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#d5e95a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d5e95a" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-flow-blur-lead">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        <g
          stroke="url(#hero-flow-grad-lead)"
          strokeWidth="1.4"
          fill="none"
          filter="url(#hero-flow-blur-lead)"
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
