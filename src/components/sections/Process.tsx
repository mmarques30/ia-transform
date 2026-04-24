import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    meta: "30 min, gratuito",
    text: "Conversa curta pra entender seu contexto, desafios e o estágio atual da empresa com IA. Se fizer sentido, a gente continua. Se não fizer, indicamos o caminho.",
  },
  {
    n: "02",
    title: "Imersão",
    meta: "2 semanas",
    text: "Entrevistas com líderes, mapeamento de processos, observação de rotina. Saímos com um retrato honesto de onde IA pode e onde não pode ajudar.",
  },
  {
    n: "03",
    title: "Plano",
    meta: "1 semana",
    text: "Entrega do plano de implementação: prioridades, cronograma, times envolvidos, métricas. Apresentação pra liderança.",
  },
  {
    n: "04",
    title: "Execução",
    meta: "8-16 semanas",
    text: "Construção dos fluxos, treinamento no contexto, integração com ferramentas existentes. Ritmo semanal, acompanhamento quinzenal.",
  },
  {
    n: "05",
    title: "Continuidade",
    meta: "ongoing",
    text: "Handover documentado, rituais estabelecidos, acompanhamento opcional. O time sustenta sozinho ou seguimos como parceiros estratégicos.",
  },
];

export function Process() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[800px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ O processo</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              Do primeiro "alô" ao time rodando sozinho
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="rounded-lg border border-border bg-card p-6 h-full flex flex-col">
                <div
                  className="num-display text-[56px] leading-none"
                  style={{ color: "var(--color-primary-glow)" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-5 text-[18px] font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-primary">{s.meta}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
