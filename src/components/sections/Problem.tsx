import { Reveal } from "@/components/Reveal";

const PROBLEMS = [
  {
    n: "01",
    title: "Softwares prontos que obrigam sua empresa a se adaptar",
    text: "Você molda a operação ao software, e não o contrário. Resultado: workflow torto e time frustrado.",
  },
  {
    n: "02",
    title: "ERPs caros que prometem controle e entregam complexidade",
    text: "Módulos genéricos, consultoria cara, 18 meses de implementação — e ninguém usa metade.",
  },
  {
    n: "03",
    title: "Automações soltas que só aceleram processos ruins",
    text: "Acelerar o errado não resolve. Automação sem estrutura é só caos mais rápido.",
  },
  {
    n: "04",
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
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="tech-card p-7 lg:p-8 h-full">
                <div className="relative flex items-center gap-3">
                  <span
                    className="num-display text-[14px] tracking-wider"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {p.n}
                  </span>
                  <span
                    className="h-[1px] flex-1"
                    style={{
                      background: "linear-gradient(90deg, var(--color-primary), transparent)",
                    }}
                  />
                </div>
                <h3 className="relative mt-6 text-[18px] lg:text-[20px] font-bold tracking-tight text-foreground leading-[1.3]">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-[14.5px] text-sage leading-[1.6]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
