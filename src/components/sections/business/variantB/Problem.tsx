import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const PROBLEMS = [
  {
    n: "01",
    title: "Cada cliente novo vira mais trabalho manual",
    text: "Crescer deveria ser positivo. Mas sem sistema, cada contrato novo é mais horas do mesmo time fazendo a mesma coisa na mão. E a margem some no meio do caminho.",
  },
  {
    n: "02",
    title: "Os sistemas não conversam entre si",
    text: "CRM num lugar, financeiro em outro, planilha em outro. Integrar isso manualmente custa horas toda semana e gera inconsistências que custam ainda mais.",
  },
  {
    n: "03",
    title: "O gestor vira gargalo",
    text: "Aprovação, revisão, decisão. Tudo passa por uma pessoa. A operação para quando ela some por dois dias.",
  },
  {
    n: "04",
    title: "O processo existe na cabeça de alguém",
    text: "Se essa pessoa sai ou tira férias, o processo some junto. O conhecimento nunca foi documentado nem sistematizado em nenhum lugar.",
  },
];

/**
 * Problem (LP-B) — mesma estrutura da LP-A: fluxo natural sem pin/scrub
 * GSAP, cards com Reveal + fade-up staggered, alturas iguais na linha,
 * sem SVG diagonal, sem dial. Copy da LP-B mantido.
 */
export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[80px] lg:py-[120px]">
        <div className="relative z-10 container-page w-full">
          <div className="text-center max-w-[860px] mx-auto">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />O cenário da sua operação
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
                Seu time opera. Mas a operação <em>não escala.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.6] max-w-[640px] mx-auto">
                O problema não é gente ruim. É processo que depende de gente pra existir.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-5 max-w-[980px] mx-auto items-stretch">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={0.18 + i * 0.09} className="h-full">
                <TiltCard
                  className="problem-card tech-card p-6 lg:p-7 relative h-full flex flex-col"
                  maxTilt={6}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="num-display text-[13px] tracking-wider"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {p.n}
                    </span>
                    <span
                      className="h-[1px] flex-1"
                      style={{
                        background: "linear-gradient(90deg, var(--color-primary), transparent)",
                      }}
                    />
                  </div>
                  <h3 className="mt-4 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.3]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-sage leading-[1.55]">{p.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.65}>
            <p className="hidden lg:block mt-10 text-center text-[13.5px] text-sage leading-[1.6] max-w-[760px] mx-auto">
              <span className="font-semibold text-foreground">Sintomas comuns:</span>{" "}
              onboarding de cliente demorado, relatório montado toda semana pela mesma pessoa,
              processo diferente conforme quem está fazendo, fechamento que trava o time, crescimento
              que aumenta custo proporcionalmente.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
