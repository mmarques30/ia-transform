import { Reveal } from "@/components/Reveal";

const PROBLEMS = [
  {
    title: "Softwares prontos que obrigam sua empresa a se adaptar",
    text: "Você molda a operação ao software, e não o contrário. Resultado: workflow torto e time frustrado.",
  },
  {
    title: "ERPs caros que prometem controle e entregam complexidade",
    text: "Módulos genéricos, consultoria cara, 18 meses de implementação — e ninguém usa metade.",
  },
  {
    title: "Automações soltas que só aceleram processos ruins",
    text: "Acelerar o errado não resolve. Automação sem estrutura é só caos mais rápido.",
  },
  {
    title: "Consultorias que entregam relatórios, mas não deixam execução",
    text: "Slide bonito, deliverable teórico, zero sistema em produção. Na semana seguinte, nada mudou.",
  },
];

export function Problem() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O diagnóstico do mercado
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Por que quase <em>ninguém resolve</em>
              <br />
              esse problema do jeito certo?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Porque a maioria tenta resolver estrutura com atalhos.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-5 max-w-[980px] mx-auto">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="card-soft p-7 lg:p-8 h-full relative">
                <div
                  className="absolute top-0 left-7 h-[2px] w-10"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
                <div
                  className="h-8 w-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-olive)" }}
                >
                  <img src="/brand/logo.svg" alt="" aria-hidden className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[17px] lg:text-[18px] font-semibold text-foreground leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-sage leading-[1.6]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
