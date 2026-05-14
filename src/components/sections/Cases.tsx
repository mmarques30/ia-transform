import { Reveal } from "@/components/Reveal";

interface CaseStudy {
  segment: string;
  company: string;
  size: string;
  before: string;
  after: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
}

const CASES: CaseStudy[] = [
  {
    segment: "Varejo",
    company: "Rede de varejo regional",
    size: "~45 colaboradores · 6 lojas",
    before:
      "Sócios travados no operacional, fechamento de mês em planilhas e sem visibilidade entre lojas.",
    after:
      "Painel único de vendas e estoque, reposição automatizada e sócios fora da rotina diária.",
    metrics: [
      { value: "−30h", label: "sócios/semana" },
      { value: "+18%", label: "margem" },
      { value: "8 sem", label: "go-live" },
    ],
    quote: "Voltei a tocar a estratégia.",
    author: "Sócia-fundadora",
  },
  {
    segment: "Tech",
    company: "SaaS B2B",
    size: "~28 colaboradores",
    before:
      "Time pequeno apagando incêndio, processos espalhados pelo Slack e pipeline sem clareza.",
    after:
      "Pipeline estruturado, papéis definidos e entregas com previsibilidade — sem aumentar o time.",
    metrics: [
      { value: "+40%", label: "capacidade time" },
      { value: "0", label: "contratações" },
      { value: "6 sem", label: "go-live" },
    ],
    quote: "A operação começou a respirar.",
    author: "CEO",
  },
  {
    segment: "Indústria",
    company: "Indústria de pequeno porte",
    size: "~85 colaboradores",
    before:
      "Produção desorganizada, ordens duplicadas e gargalo recorrente na expedição.",
    after:
      "Fluxo de ordens claro, expedição com SLA e fábrica rodando previsível.",
    metrics: [
      { value: "−40%", label: "retrabalho" },
      { value: "+25%", label: "expedição" },
      { value: "10 sem", label: "go-live" },
    ],
    quote: "Hoje eu sei o que vai sair amanhã.",
    author: "Diretor industrial",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Cases reais
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              O que acontece quando a <em>IAplicada</em>
              <br />
              chega na empresa.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[15.5px] text-sage leading-[1.6] max-w-[620px] mx-auto">
              PMEs reais — entre 20 e 100 colaboradores — que pararam de depender do dono no
              operacional.
            </p>
          </Reveal>
        </div>

        {/* Layout limpo, sem card background — separadores verticais entre
            colunas (md+) e horizontais entre rows (mobile). Sem ilustrações. */}
        <div className="cases-grid mt-16 lg:mt-20 grid md:grid-cols-3 max-w-[1180px] mx-auto">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.06}>
              <article className="px-2 md:px-7 py-8 md:py-2 h-full flex flex-col">
                {/* Numerador + segment */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="num-display text-[18px] leading-none"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    {c.segment}
                  </span>
                </div>

                {/* Company + porte */}
                <h3 className="mt-4 text-[20px] font-semibold text-foreground leading-snug">
                  {c.company}
                </h3>
                <p className="mt-1 text-[12.5px] text-muted-foreground">{c.size}</p>

                {/* Antes */}
                <div className="mt-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] font-bold"
                    style={{ color: "oklch(0.55 0.16 25)" }}
                  >
                    Antes
                  </p>
                  <p className="mt-1.5 text-[13.5px] text-sage leading-[1.55]">{c.before}</p>
                </div>

                {/* Depois */}
                <div className="mt-4">
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Depois
                  </p>
                  <p className="mt-1.5 text-[13.5px] text-foreground leading-[1.55] font-medium">
                    {c.after}
                  </p>
                </div>

                {/* Métricas — sem border-y de card, só uma linha sutil acima */}
                <div
                  className="mt-6 grid grid-cols-3 gap-3 pt-5"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className="num-display text-[19px] leading-none"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {m.value}
                      </div>
                      <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground leading-tight">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quote — discreto */}
                <blockquote className="mt-auto pt-6">
                  <p className="text-foreground text-[13.5px] leading-[1.5] italic">"{c.quote}"</p>
                  <footer className="mt-1.5 text-[11.5px] text-muted-foreground">
                    — {c.author}
                  </footer>
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Separadores entre items: top no mobile (stack), left em md+ (3-col) */}
      <style>{`
        .cases-grid > * + * article {
          border-top: 1px solid var(--color-border);
        }
        @media (min-width: 768px) {
          .cases-grid > * + * article {
            border-top: 0;
            border-left: 1px solid var(--color-border);
          }
        }
      `}</style>
    </section>
  );
}
