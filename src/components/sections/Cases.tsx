import { Reveal } from "@/components/Reveal";

interface CaseStudy {
  company: string;
  segment: string;
  challenge: string;
  implementation: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
}

const CASES: CaseStudy[] = [
  {
    company: "Grupo de varejo",
    segment: "~2.500 colaboradores",
    challenge:
      "Área de atendimento com volume crescente, tempo de resposta caindo, time estressado. Ferramenta de IA de prateleira já tinha sido comprada, mas ninguém usava.",
    implementation:
      "Mapeamos os 12 fluxos mais frequentes de atendimento, desenhamos prompts e roteiros contextuais, treinamos 40 atendentes em 4 semanas, integramos com o sistema atual.",
    metrics: [
      { value: "−47%", label: "tempo médio de resposta" },
      { value: "+3,2×", label: "casos resolvidos no 1º contato" },
      { value: "12 sem", label: "até o time operar sozinho" },
    ],
    quote:
      "Não era mais um workshop. Era implementação real. A diferença apareceu na terceira semana.",
    author: "Diretora de Customer Experience",
  },
  {
    company: "Fintech em Série A",
    segment: "~80 colaboradores",
    challenge:
      "Time de produto pequeno, muita coisa repetitiva na operação de backoffice e suporte, CEO queria acelerar sem contratar.",
    implementation:
      "Diagnóstico de 2 semanas revelou 6 processos automatizáveis imediatamente. Construímos 4 automações e um assistente interno pra time de operações.",
    metrics: [
      { value: "+22h", label: "por semana liberadas em ops" },
      { value: "0", label: "contratações em 6 meses" },
      { value: "R$ 480k", label: "de economia anualizada" },
    ],
    quote:
      "Em 3 meses mudou a cara da nossa operação. E o time deixou de ver IA como hype.",
    author: "CEO",
  },
  {
    company: "Grupo industrial",
    segment: "~5.000 colaboradores",
    challenge:
      "6 iniciativas de IA rodando em paralelo, sem coordenação, sem ROI claro. Liderança queria um norte.",
    implementation:
      "Mentoria estratégica mensal com o C-level, governança de IA, priorização de casos de uso por área, rituais de acompanhamento.",
    metrics: [
      { value: "6 → 3", label: "frentes com ROI mensurável" },
      { value: "R$ 2,1M", label: "em eficiência no 1º ano" },
      { value: "5 áreas", label: "com maturidade alta em IA" },
    ],
    quote:
      "A IAplicada virou parte do nosso time de liderança estratégica. Decisão de IA no nosso grupo passa por ela.",
    author: "CEO",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-[120px] lg:py-[160px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[800px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ Cases</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              O que acontece quando a IA chega no operacional
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 space-y-6">
          {CASES.map((c, i) => (
            <Reveal key={c.company + i} delay={i * 0.05}>
              <article className="rounded-lg border border-border bg-card p-8 lg:p-12">
                <header className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <h3 className="text-[24px] font-semibold text-foreground">
                      {c.company}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.segment}
                    </p>
                  </div>
                  <span className="label-chip">Case {String(i + 1).padStart(2, "0")}</span>
                </header>

                <div className="mt-8 grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-primary">
                      Desafio
                    </p>
                    <p className="mt-3 text-sage leading-[1.6] text-[15px]">
                      {c.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-primary">
                      Implementação
                    </p>
                    <p className="mt-3 text-sage leading-[1.6] text-[15px]">
                      {c.implementation}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border pt-8">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className="num-display text-[44px] lg:text-[52px] leading-none"
                        style={{ color: "var(--color-primary-glow)" }}
                      >
                        {m.value}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <blockquote className="mt-10 border-l-2 border-primary pl-6">
                  <p className="text-foreground text-[17px] leading-[1.5]">
                    "{c.quote}"
                  </p>
                  <footer className="mt-3 text-sm text-muted-foreground">
                    — {c.author}
                  </footer>
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
