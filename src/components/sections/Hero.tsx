import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";
import { Check } from "lucide-react";

const BULLETS = [
  "Diagnóstico estratégico em 2 semanas",
  "Sistemas de IA construídos sob medida",
  "Treinamento contínuo do time interno",
  "Handover documentado ao fim do projeto",
];

const LOGOS = ["Natura", "Ambev", "Magazine Luiza", "Globo"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[120px] pb-[60px] lg:pt-[160px] lg:pb-[100px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Business · Implementação de IA B2B
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="h-mix mt-7 text-[44px] sm:text-[56px] lg:text-[68px] text-foreground">
                IA dentro da sua
                <br />
                empresa — <em>entregue,</em>
                <br />
                rodando e medida.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] lg:text-[19px] text-sage leading-[1.55] max-w-[540px]">
                Business é um programa de{" "}
                <span className="text-foreground font-semibold">
                  diagnóstico, construção e continuidade
                </span>{" "}
                de IA aplicada pra empresas de 50 a 2.000 pessoas. A gente implementa — seu time
                opera.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-y-3 gap-x-6 max-w-[560px]">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] text-foreground">
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
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Empresas que já confiaram
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {LOGOS.map((logo) => (
                    <span
                      key={logo}
                      className="text-[15px] font-semibold tracking-tight text-muted-foreground/80"
                    >
                      {logo}
                    </span>
                  ))}
                  <span className="text-[13px] text-muted-foreground">+80 empresas</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <HeroForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
