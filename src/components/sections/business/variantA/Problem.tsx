import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";

const PILLARS = [
  { label: "ENTREGANDO", bold: "MAIS RÁPIDO" },
  { label: "OPERANDO", bold: "SEM VOCÊ" },
  { label: "CRESCENDO", bold: "SEM CONTRATAR" },
];

export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[72px] lg:py-[110px]">
        <div className="relative z-10 container-page text-center">
          <Reveal>
            <h2
              className="font-extrabold text-[28px] sm:text-[36px] lg:text-[46px] leading-[1.08] tracking-[-0.02em]"
              style={{ textWrap: "balance" }}
            >
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontWeight: 500,
                  color: "var(--color-primary)",
                }}
              >
                O sistema que libera a operação
              </em>{" "}
              <span className="text-foreground">e escala a receita.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-5 text-[15px] lg:text-[17px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              O mesmo que já entregamos em mais de 50 empresas no Brasil e fora do país.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-[960px] mx-auto">
              {PILLARS.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-6 py-10 lg:py-12 flex flex-col items-center justify-center"
                  style={{
                    background: "rgba(200,224,64,0.06)",
                    border: "1px solid rgba(200,224,64,0.18)",
                    boxShadow: "0 20px 40px -20px rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    className="text-[13px] tracking-[0.18em] uppercase text-sage"
                    style={{
                      fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                    }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="mt-1.5 text-[22px] lg:text-[26px] font-extrabold tracking-[-0.02em] leading-[1.1]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {p.bold}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 lg:mt-16">
              <OriginButton onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}>
                quero meu diagnóstico
              </OriginButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
