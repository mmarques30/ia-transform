import { lazy, Suspense } from "react";
import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { LeadKitMockups } from "./LeadKitMockups";

const IAPLogo3D = lazy(() =>
  import("./IAPLogo3D").then((m) => ({ default: m.IAPLogo3D }))
);

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
          <div className="mx-auto mb-8 flex items-center justify-center" style={{ width: 90, height: 90 }}>
            <Suspense fallback={null}>
              <IAPLogo3D width={90} height={90} scale={1.8} />
            </Suspense>
          </div>

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
              <br />
              testados em operações reais, não em teoria.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-4 mx-auto"
              style={{
                maxWidth: "56ch",
                fontSize: "15.5px",
                lineHeight: 1.65,
                color: "var(--text-sage, #a3a898)",
              }}
            >
              Um kit gratuito com tudo que você precisa para começar a automatizar
              {" "}processos, sem equipe de TI e sem saber programar.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10">
              <OriginButton onClick={onOpenModal}>
                Quero o kit completo &rarr;
              </OriginButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
