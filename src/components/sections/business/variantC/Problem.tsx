import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const PROBLEMS = [
  {
    n: "01",
    title: "A PSA operava em ferramentas separadas",
    text: "110+ profissionais em sistemas diferentes. Assertividade tributária em 85%. Reuniões dependiam de alguém montar um relatório toda semana.",
  },
  {
    n: "02",
    title: "A CB Move queria crescer de 30 para 100 pacientes",
    text: "Cada novo paciente precisava de ação manual em todas as etapas. Contratar não era opção.",
  },
  {
    n: "03",
    title: "A Borges & Zembruski gastava R$5k/mês com SDR humano",
    text: "O SDR não escalava. Leads chegavam, follow-up não acontecia na hora certa, receita ficava na mesa.",
  },
  {
    n: "04",
    title: "Todas tentaram atalhos antes. Não funcionou.",
    text: "Software genérico que o time não adotou. Consultor que entregou slides. Automação interna que quebrou. A IAplicada foi a primeira entrega que ficou rodando.",
  },
];

/**
 * Problem (LP-C) — mesma estrutura da LP-A: fluxo natural sem pin/scrub
 * GSAP, cards com Reveal + fade-up staggered, alturas iguais na linha,
 * sem SVG diagonal, sem dial. Copy da LP-C mantido.
 */
export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[80px] lg:py-[120px]">
        <div className="relative z-10 container-page w-full">
          <div className="text-center max-w-[860px] mx-auto">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />O cenário da sua operação
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
                Esses resultados não vieram do nada.{" "}
                <em>Vieram de um problema real resolvido.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.6] max-w-[640px] mx-auto">
                Cada empresa chegou com um processo específico quebrando. A IAplicada mapeou,
                construiu e entregou.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-5 max-w-[980px] mx-auto items-stretch">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={0.18 + i * 0.09} className="h-full">
                <TiltCard
                  className="problem-card tech-card p-6 lg:p-7 relative h-full flex flex-col"
                  maxTilt={6}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="num-display text-[13px] tracking-wider"
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
                  <h3 className="mt-4 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.3]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-sage leading-[1.55]">{p.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.65}>
            <p className="hidden lg:block mt-10 text-center text-[13.5px] text-sage leading-[1.6] max-w-[760px] mx-auto">
              <span className="font-semibold text-foreground">Sintomas comuns:</span>{" "}
              processo manual que se repete todo mês, sistema que o time não usa, automação que
              funcionou por 30 dias e parou, relatório que sempre depende da mesma pessoa.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
