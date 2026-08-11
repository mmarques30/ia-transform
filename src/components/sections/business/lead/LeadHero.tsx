import { Reveal } from "@/components/Reveal";

interface LeadHeroProps {
  onOpenModal: () => void;
}

export function LeadHero({ onOpenModal }: LeadHeroProps) {
  return (
    <section className="hero-section-b">
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
              <span className="hero-b-h1-sans">Automatize</span>
              <br />
              <em className="hero-b-h1-em">o que trava</em>
              <br />
              <span className="hero-b-h1-sans">sua operacao.</span>
              <br />
              <em className="hero-b-h1-em">Sem contratar ninguem.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="hero-b-sub">
              Prompts, automacoes e agentes de IA{" "}
              <em style={{ color: "var(--color-primary)" }}>prontos para usar</em> na sua empresa
              — testados em operacoes reais, nao em teoria.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="hero-b-p">
              Um kit gratuito com tudo que voce precisa para comecar a automatizar
              processos — sem equipe de TI e sem saber programar.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8">
              <button
                type="button"
                onClick={onOpenModal}
                className="cta-glow-btn inline-flex items-center justify-center gap-2.5 px-7 py-5 rounded-[10px] font-black text-[13.5px] lg:text-[14.5px] uppercase tracking-[0.06em] no-underline"
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

        <div className="hero-b-form-col">
          <Reveal delay={0.15}>
            <KitPreviewCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const KIT_MODULES = [
  { n: "01", title: "Prompts de IA para Operacao", desc: "Atendimento, financeiro e vendas" },
  { n: "02", title: "Automacoes Prontas", desc: "Fluxos no-code para n8n e Make" },
  { n: "03", title: "Agentes de IA Configurados", desc: "Exemplos rodando em empresas reais" },
];

function KitPreviewCard() {
  return (
    <div
      style={{
        background: "#141613",
        border: "1px solid rgba(139,155,58,0.18)",
      }}
    >
      <div className="p-7 lg:p-8">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.14em] block mb-5"
          style={{
            color: "var(--color-primary)",
            fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
          }}
        >
          O que esta dentro
        </span>
        <h3 className="text-[18px] font-bold tracking-[-0.02em] text-foreground">
          Kit de Automacao com IA
        </h3>
        <p className="mt-1.5 text-[12px]" style={{ color: "var(--text-muted, #8a8e82)" }}>
          3 modulos prontos para implementar
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          {KIT_MODULES.map((m) => (
            <div
              key={m.n}
              className="flex items-start gap-3.5 p-3.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="shrink-0 text-[10px] font-bold tracking-[0.1em] pt-0.5"
                style={{ color: "var(--color-primary)" }}
              >
                {m.n}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{m.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted, #8a8e82)" }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <span
            className="inline-block px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{
              background: "rgba(139,155,58,0.1)",
              border: "1px solid rgba(139,155,58,0.3)",
              color: "var(--color-primary)",
            }}
          >
            R$ 0 — Acesso imediato
          </span>
        </div>
      </div>
    </div>
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
