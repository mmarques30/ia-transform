import { Reveal } from "@/components/Reveal";
import { LeadKitMockups } from "./LeadKitMockups";

interface LeadHeroProps {
  onOpenModal: () => void;
}

export function LeadHero({ onOpenModal }: LeadHeroProps) {
  return (
    <section
      id="lead-hero"
      className="lead-hero-wrap relative"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,224,64,0.07), transparent 70%), #080a07",
      }}
    >
      <LeadKitMockups />

      <div className="relative z-[3] w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-[72px]">
        <div className="max-w-[860px] mx-auto text-center">
          <div
            id="lead-logo-anchor"
            className="mx-auto mb-10"
            style={{ width: 52, height: 52 }}
            aria-hidden
          />

          <Reveal delay={0.05}>
            <h1
              className="font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                fontSize: "clamp(48px, 8vw, 80px)",
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

          <Reveal delay={0.08}>
            <p
              className="mt-6"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                fontSize: "clamp(18px, 3vw, 24px)",
                lineHeight: 1.35,
                color: "var(--color-foreground, #f4f5ec)",
              }}
            >
              Prompts, automações e agentes de IA{" "}
              <em style={{ color: "var(--color-primary)" }}>prontos para usar</em> na sua empresa,
              testados em operações reais, não em teoria.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-4 mx-auto"
              style={{
                maxWidth: "42ch",
                fontSize: "15.5px",
                lineHeight: 1.65,
                color: "var(--text-sage, #a3a898)",
              }}
            >
              Um kit gratuito com tudo que você precisa para começar a automatizar
              processos, sem equipe de TI e sem saber programar.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
