import { Reveal } from "@/components/Reveal";
import { Building2, Briefcase, Factory } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CaseStudy {
  Icon: LucideIcon;
  segment: string;
  company: string;
  size: string;
  summary: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  /** Background gradient for the card "image" — pure CSS, no external deps. */
  gradient: string;
}

const CASES: CaseStudy[] = [
  {
    Icon: Building2,
    segment: "Varejo",
    company: "Grupo de varejo",
    size: "~2.500 colaboradores",
    summary:
      "Atendimento explodindo, ferramenta de IA comprada e parada. Em 12 semanas, 40 atendentes operando o novo fluxo.",
    metrics: [
      { value: "−47%", label: "tempo de resposta" },
      { value: "3,2×", label: "1º contato" },
      { value: "12 sem", label: "go-live" },
    ],
    quote: "A diferença apareceu na terceira semana.",
    author: "Diretora de CX",
    gradient: "linear-gradient(135deg, oklch(0.62 0.17 125) 0%, oklch(0.5 0.14 122) 100%)",
  },
  {
    Icon: Briefcase,
    segment: "Fintech",
    company: "Fintech Série A",
    size: "~80 colaboradores",
    summary:
      "CEO queria acelerar ops sem contratar. 6 processos mapeados, 4 automatizados, 1 assistente interno.",
    metrics: [
      { value: "+22h", label: "ops/semana" },
      { value: "0", label: "contratações" },
      { value: "R$ 480k", label: "economia anual" },
    ],
    quote: "Mudou a cara da operação em 3 meses.",
    author: "CEO",
    gradient: "linear-gradient(135deg, oklch(0.32 0.04 122) 0%, oklch(0.18 0.02 122) 100%)",
  },
  {
    Icon: Factory,
    segment: "Indústria",
    company: "Grupo industrial",
    size: "~5.000 colaboradores",
    summary:
      "6 iniciativas de IA em paralelo, sem coordenação. Mentoria com C-level e governança viraram o jogo.",
    metrics: [
      { value: "6→3", label: "frentes com ROI" },
      { value: "R$ 2,1M", label: "eficiência ano 1" },
      { value: "5 áreas", label: "alta maturidade" },
    ],
    quote: "Virou parte do nosso time de liderança.",
    author: "CEO",
    gradient: "linear-gradient(135deg, oklch(0.55 0.16 125) 0%, oklch(0.32 0.04 122) 100%)",
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
              O que acontece <em>quando IA chega</em>
              <br />
              no operacional.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.06}>
              <article
                className="card-soft overflow-hidden h-full flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Visual header — gradient + icon + segment chip */}
                <div
                  className="aspect-[16/9] relative overflow-hidden"
                  style={{ background: c.gradient }}
                >
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, oklch(1 0 0 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.18) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute top-4 left-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-white">
                      {c.segment}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5">
                    <c.Icon className="h-12 w-12 text-white/85" strokeWidth={1.25} />
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-[18px] font-semibold text-foreground">{c.company}</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">{c.size}</p>
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

                  <blockquote className="mt-auto pt-5">
                    <p className="text-foreground text-[14px] leading-[1.5] italic">"{c.quote}"</p>
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
