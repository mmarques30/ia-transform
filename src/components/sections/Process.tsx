import { Reveal } from "@/components/Reveal";
import { ChevronRight } from "lucide-react";

const KEYWORDS = ["Clareza", "Análise", "Eficiência", "Inovação", "Produtividade"];

const STEPS = [
  {
    n: "1",
    title: "Você agenda o diagnóstico estratégico.",
  },
  {
    n: "2",
    title: "Eu mergulho na sua operação: processos, dados, pessoas e gargalos.",
  },
  {
    n: "3",
    title: "Analiso tudo durante a semana.",
  },
  {
    n: "4",
    title:
      "Na segunda conversa, você recebe a visão completa de um sistema integrado. Sua operação em um só lugar.",
  },
];

export function Process() {
  return (
    <section id="abordagem" className="bg-background relative overflow-hidden">
      {/* Animated keyword ticker */}
      <div
        className="border-y py-4 overflow-hidden"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="ticker-track whitespace-nowrap">
          {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((k, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 text-[28px] lg:text-[40px] font-serif italic font-light"
              style={{ color: "oklch(0.58 0.16 125 / 0.35)" }}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "oklch(0.62 0.17 125 / 0.4)" }}
              />
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="container-page py-[100px] lg:py-[140px] relative">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Tudo começa com um diagnóstico
              <br />
              para um <em>MAPA ESTRATÉGICO</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[15px] text-foreground font-semibold">
              <span className="inline-flex items-center gap-2">
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                  strokeWidth={2.5}
                />
                Primeiro, eu escuto.
              </span>
              <span className="inline-flex items-center gap-2">
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                  strokeWidth={2.5}
                />
                Depois, eu analiso.
              </span>
              <span className="inline-flex items-center gap-2">
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                  strokeWidth={2.5}
                />
                Só então, eu desenho.
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <h3
            className="mt-16 text-center text-[22px] lg:text-[26px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            O processo funciona assim:
          </h3>
        </Reveal>

        <div className="mt-14 relative">
          {/* Connector dotted line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[8%] right-[8%] top-[16px]"
            style={{
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(to right, oklch(0.6 0.14 125) 0 6px, transparent 6px 12px)",
            }}
          />

          <div className="grid md:grid-cols-4 gap-5 lg:gap-6 relative">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  <div
                    className="absolute -top-[2px] left-6 h-[2px] w-10"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  <div className="card-soft p-6 lg:p-7 h-full">
                    <p
                      className="num-display text-[26px] leading-none"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {s.n}
                    </p>
                    <p className="mt-5 text-[15px] text-foreground leading-[1.55]">{s.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-14 text-center">
            <a href="#top" className="cta-primary">
              Quero um mapa estratégico
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7H12M12 7L7 2M12 7L7 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
