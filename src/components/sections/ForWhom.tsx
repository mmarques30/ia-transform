import { Reveal } from "@/components/Reveal";

const PROFILES = [
  {
    title: "CEO ou fundador(a)",
    text: "De empresa entre 50 e 2.000 pessoas que quer tirar IA do discurso e colocar no operacional do próprio negócio.",
  },
  {
    title: "Head ou Diretor(a) de área",
    text: "Ops, CX, Growth, Marketing, Produto, RH com mandato de levar IA pra dentro da área sem depender da TI.",
  },
  {
    title: "C-level de empresa grande",
    text: "Que precisa de uma visão externa pra organizar as múltiplas iniciativas de IA que já existem e sustentar resultado.",
  },
  {
    title: "Líder de transformação",
    text: "CDO, CIO, CTO que precisa de braço executor — alguém que desce ao time, mapeia processo e implementa de verdade.",
  },
];

export function ForWhom() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[800px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ Indicado para</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              Business faz sentido se você é...
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {PROFILES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="rounded-lg border border-border bg-card p-8 h-full">
                <h3 className="text-[20px] font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sage leading-[1.6] text-[15px]">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm text-muted-foreground italic max-w-[640px] mx-auto">
            Se você é profissional individual buscando aprender IA, o{" "}
            <a href="#" className="text-primary-glow hover:underline">
              Academy
            </a>{" "}
            é o caminho.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
