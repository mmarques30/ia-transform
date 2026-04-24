import { Reveal } from "@/components/Reveal";

interface CaseStudy {
  company: string;
  segment: string;
  summary: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  image: string;
}

const CASES: CaseStudy[] = [
  {
    company: "Grupo de varejo",
    segment: "~2.500 colaboradores",
    summary:
      "Atendimento explodindo, ferramenta de IA comprada e parada. Em 12 semanas, 40 atendentes operando o novo fluxo.",
    metrics: [
      { value: "−47%", label: "tempo de resposta" },
      { value: "3,2×", label: "resolução no 1º contato" },
      { value: "12 sem", label: "até operar sozinhos" },
    ],
    quote: "A diferença apareceu na terceira semana.",
    author: "Diretora de CX",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Fintech Série A",
    segment: "~80 colaboradores",
    summary:
      "CEO queria acelerar ops sem contratar. 6 processos mapeados, 4 automatizados, 1 assistente interno.",
    metrics: [
      { value: "+22h", label: "por semana em ops" },
      { value: "0", label: "contratações em 6m" },
      { value: "R$ 480k", label: "economia anual" },
    ],
    quote: "Mudou a cara da operação em 3 meses.",
    author: "CEO",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Grupo industrial",
    segment: "~5.000 colaboradores",
    summary:
      "6 iniciativas de IA em paralelo, sem coordenação. Mentoria estratégica com C-level e governança viraram o jogo.",
    metrics: [
      { value: "6→3", label: "frentes com ROI claro" },
      { value: "R$ 2,1M", label: "em eficiência no 1º ano" },
      { value: "5 áreas", label: "com alta maturidade" },
    ],
    quote: "Virou parte do nosso time de liderança.",
    author: "CEO",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-[90px] lg:py-[120px] bg-background">
      <div className="container-page">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Cases reais
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              O que acontece quando IA chega no operacional.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.05}>
              <article
                className="card-soft overflow-hidden h-full flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="aspect-[16/10] bg-surface overflow-hidden border-b border-border"
                  style={{
                    backgroundImage: `linear-gradient(135deg, oklch(0.2 0.02 122 / 0.35), oklch(0.2 0.02 122 / 0.1)), url('${c.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-[18px] font-semibold text-foreground">{c.company}</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">{c.segment}</p>
                  <p className="mt-4 text-[14px] text-sage leading-[1.55]">{c.summary}</p>

                  <div className="mt-5 grid grid-cols-3 gap-3 py-4 border-y border-border">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          className="num-display text-[20px] leading-none"
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

                  <blockquote className="mt-5 mt-auto pt-5">
                    <p className="text-foreground text-[14px] leading-[1.5] italic">“{c.quote}”</p>
                    <footer className="mt-2 text-[12px] text-muted-foreground">— {c.author}</footer>
                  </blockquote>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
