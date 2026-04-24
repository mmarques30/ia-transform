import { Reveal } from "@/components/Reveal";

const STEPS = [
  { n: "01", title: "Diagnóstico", meta: "30 min", text: "Conversa. Contexto e maturidade." },
  { n: "02", title: "Imersão", meta: "2 sem", text: "Entrevistas, mapeamento, observação." },
  { n: "03", title: "Plano", meta: "1 sem", text: "Prioridades, cronograma, métricas." },
  { n: "04", title: "Execução", meta: "8–16 sem", text: "Construção, treinamento, integração." },
  { n: "05", title: "Continuidade", meta: "ongoing", text: "Handover. Time sustenta sozinho." },
];

export function Process() {
  return (
    <section className="py-[90px] lg:py-[120px] bg-background">
      <div className="container-page">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O processo
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              Do "alô" ao time rodando sozinho.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="card-soft p-5 h-full flex flex-col">
                <div
                  className="num-display text-[28px] leading-none"
                  style={{ color: "var(--color-primary)" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {s.meta}
                </p>
                <p className="mt-3 text-[13px] text-sage leading-[1.55]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
