import { Reveal } from "@/components/Reveal";

const STATS = [
  { big: "78%", text: "das iniciativas de IA não passam do piloto em 6 meses" },
  { big: "9/10", text: "empresas compram ferramenta antes de mapear o processo" },
  { big: "1/5", text: "líderes consegue mostrar ROI real pra diretoria" },
];

export function Problem() {
  return (
    <section className="py-[90px] lg:py-[120px] bg-background">
      <div className="container-page">
        <div className="max-w-[820px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O problema real
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              Sua empresa não precisa de mais um curso.
              <br />
              Precisa que a <em>IA chegue no fluxo</em>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.05}>
              <div className="card-soft p-7 h-full">
                <div
                  className="num-display text-[48px] lg:text-[56px] leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  {s.big}
                </div>
                <p className="mt-4 text-[14px] text-sage leading-[1.5]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
