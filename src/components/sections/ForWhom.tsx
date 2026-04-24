import { Reveal } from "@/components/Reveal";
import { Check, X } from "lucide-react";

const PROFILES = [
  {
    title: "CEO ou fundador(a)",
    text: "De empresa entre 50 e 2.000 pessoas que quer tirar IA do discurso e colocar no operacional da companhia — com indicador de ROI claro pro board.",
  },
  {
    title: "C-level de empresa grande",
    text: "Que precisa de uma visão externa pra organizar as múltiplas iniciativas de IA que já existem — e sustentar resultado sem depender de mais uma contratação.",
  },
  {
    title: "Head ou Diretor(a) de área",
    text: "Ops, CX, Growth, Marketing, Produto, RH, Finanças com mandato de levar IA pra dentro da área — e sem depender 100% da TI pra destravar.",
  },
  {
    title: "Líder de transformação",
    text: "CDO, CIO, CTO que precisa de braço executor — alguém que desce ao time, mapeia processo, desenha fluxo e entrega em cadência semanal.",
  },
];

const NOT_FOR = [
  "Empresas que ainda não têm operação consolidada (faturamento abaixo de R$ 5M/ano).",
  "Projetos de TI core (migração de ERP, infraestrutura, core banking) — não é nosso escopo.",
  "Quem busca só capacitação individual — aí o caminho é o Academy.",
  "Quem espera terceirizar decisão. O projeto só funciona com sponsor sênior engajado.",
];

export function ForWhom() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ Quem entra · quem não entra</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              Business não é pra todo mundo.
              <br />E isso é bom pra você.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] text-sage leading-[1.6] max-w-[720px] mx-auto">
              A gente atende, no máximo, 6 novas empresas por trimestre. Por isso qualifica antes de
              vender. Veja se você se encaixa — e se não, dizemos antes de te tomar tempo.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid lg:grid-cols-[7fr_5fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {PROFILES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="rounded-lg border border-border bg-card p-7 h-full">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Faz sentido
                  </div>
                  <h3 className="mt-4 text-[19px] font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-sage leading-[1.6] text-[15px]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div
              className="rounded-lg border border-border p-8 h-full"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                Não é pra você se
              </div>
              <ul className="mt-6 space-y-5">
                {NOT_FOR.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-sage leading-[1.55]">
                    <span className="text-muted-foreground mt-[2px]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground italic">
                Se você é profissional individual buscando aprender IA, o caminho é o{" "}
                <a href="#" className="text-primary-glow hover:underline">
                  Academy
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
