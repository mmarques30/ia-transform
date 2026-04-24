import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Diagnosticar",
    text: "Mapeamos rotinas, decisões, gargalos. Identificamos onde IA gera valor real e onde não passa de enfeite. Saímos do diagnóstico com um plano de 90 dias, não com uma lista de ferramentas.",
  },
  {
    n: "02",
    title: "Implementar",
    text: "Desenhamos os fluxos, escolhemos as ferramentas certas, treinamos no contexto do seu time, construímos os sistemas onde faz sentido. Tudo documentado. Tudo replicável.",
  },
  {
    n: "03",
    title: "Sustentar",
    text: "Acompanhamento dos rituais do time, ajuste dos fluxos, expansão para novas áreas. A roda não para quando a implementação termina.",
  },
];

export function Approach() {
  return (
    <section
      id="abordagem"
      className="py-[120px] lg:py-[160px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="text-center max-w-[800px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ Como a IAplicada trabalha</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              Uma única abordagem.
              <br />
              Três pilares que sustentam.
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="rounded-lg border border-border bg-card p-8 h-full">
                <div
                  className="num-display text-[64px] leading-none"
                  style={{ color: "var(--color-primary-glow)" }}
                >
                  {p.n}
                </div>
                <h3 className="mt-6 text-[22px] font-semibold text-foreground">
                  Pilar {p.n} — {p.title}
                </h3>
                <p className="mt-4 text-sage leading-[1.6] text-[16px]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm text-muted-foreground italic max-w-[680px] mx-auto">
            O formato de cada projeto (mentoria estratégica, construção de sistema, automação
            pontual) é definido no diagnóstico. Não engessamos o escopo antes de entender o seu
            contexto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
