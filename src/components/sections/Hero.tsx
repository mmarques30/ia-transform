import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";
import { Check } from "lucide-react";

const BULLETS = [
  "Diagnóstico estratégico em 2 semanas",
  "Sistemas de IA construídos sob medida",
  "Treinamento e handover pro seu time",
  "Acompanhamento contínuo depois do go-live",
];

const LOGOS = ["Natura", "Ambev", "Magazine Luiza", "Globo"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[130px] pb-[80px] lg:pt-[170px] lg:pb-[120px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Soft grid background for premium editorial feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                IAplicada · Business
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="h-mix mt-7 text-[44px] sm:text-[56px] lg:text-[72px] text-foreground">
                A IA da sua empresa,
                <br />
                <em>construída, entregue</em>
                <br />e rodando.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 text-[18px] lg:text-[20px] text-sage leading-[1.55] max-w-[560px]">
                <span className="text-foreground font-semibold">Business</span> é o programa da
                IAplicada que diagnostica, constrói e sustenta sistemas de IA no operacional de
                empresas de{" "}
                <span className="text-foreground font-semibold">50 a 2.000 colaboradores</span>. A
                gente implementa — seu time opera.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-y-3 gap-x-6 max-w-[580px]">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-foreground">
                    <span
                      className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Já implementamos em
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {LOGOS.map((logo) => (
                    <span
                      key={logo}
                      className="text-[16px] font-semibold tracking-tight text-foreground/75"
                    >
                      {logo}
                    </span>
                  ))}
                  <span className="text-[13px] text-muted-foreground">+80 empresas</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="lg:sticky lg:top-24">
              <HeroForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
