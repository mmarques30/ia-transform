import { Reveal } from "@/components/Reveal";
import { ArrowRight, Check } from "lucide-react";

const PATTERNS = [
  "Financeiro fragmentado",
  "Relatórios manuais",
  "Dados espalhados",
  "Decisões lentas",
  "Risco constante de erro",
];

const BENEFITS = ["Liberdade", "Estrutura", "Gestão", "Previsibilidade"];

export function Segmentation() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        {/* Same pattern of chaos */}
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Empresas diferentes.
              <br />O <em>mesmo padrão</em> de caos.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Indústrias, consultorias, empresas de serviço, operações em crescimento.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-[18px] font-semibold text-foreground">
            O cenário se repete:
          </p>
        </Reveal>

        <div className="mt-10 relative">
          {/* Connector dotted line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[5%] right-[5%] top-[13px]"
            style={{
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(to right, oklch(0.6 0.14 125 / 0.6) 0 6px, transparent 6px 14px)",
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 relative max-w-[1000px] mx-auto">
            {PATTERNS.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="flex flex-col items-center text-center">
                  <span
                    className="h-7 w-7 rounded-full flex items-center justify-center relative z-10"
                    style={{ backgroundColor: "var(--color-olive)" }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <p className="mt-4 text-[14px] font-semibold text-foreground">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* When structure changes */}
        <div className="mt-28 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center max-w-[1100px] mx-auto card-soft p-8 lg:p-12">
          <div>
            <Reveal>
              <h3 className="h-mix text-[32px] sm:text-[40px] lg:text-[46px] text-foreground">
                Quando a estrutura muda,
                <br />o <em>jogo muda</em>.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[440px]">
                E isso não depende do tamanho da empresa, mas da maturidade da gestão.
              </p>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal delay={0.15}>
              <div className="flex flex-col items-end gap-4">
                {BENEFITS.map((b, i) => (
                  <div
                    key={b}
                    className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[15px] font-semibold"
                    style={{
                      backgroundColor: "var(--color-olive)",
                      color: "oklch(0.1 0.01 110)",
                      transform: `translateX(${i * -14}px)`,
                    }}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                    {b}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
