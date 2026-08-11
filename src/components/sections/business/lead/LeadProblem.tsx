import { Reveal } from "@/components/Reveal";

const PAIN_CARDS = [
  "Cada decisao operacional passa por voce. A empresa so avanca quando voce esta presente.",
  "Voce experimenta ferramentas de IA, mas nada encaixa de verdade no processo da empresa.",
  "Voce sabe que a solucao existe — mas nao tem tempo para descobrir e implementar.",
];

export function LeadProblem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[80px] lg:py-[110px]">
        <div className="relative z-10 container-page">
          <Reveal>
            <span
              className="text-[11px] uppercase tracking-[0.13em] font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              O problema que resolve
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-4 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.12] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Sua empresa esta{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                refem da sua presenca.
              </em>
              <br />
              E contratar mais gente nao resolve.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              className="mt-5 text-[15.5px] lg:text-[16px] leading-[1.8] max-w-[640px]"
              style={{ color: "var(--text-sage, #c4c8bc)" }}
            >
              Cada processo que trava quando voce sai e um processo que nao existe de verdade.
              IA nao e hype — e a unica forma de escalar sem inflar a folha de pagamento.
            </p>
          </Reveal>

          <div className="mt-12 lg:mt-14 grid md:grid-cols-3 gap-4">
            {PAIN_CARDS.map((text, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <div
                  className="p-7 h-full"
                  style={{
                    background: "#141613",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderLeft: "2px solid var(--color-primary)",
                  }}
                >
                  <p
                    className="text-[14.5px] lg:text-[15px] leading-[1.75]"
                    style={{ color: "var(--text-sage, #c4c8bc)" }}
                  >
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
