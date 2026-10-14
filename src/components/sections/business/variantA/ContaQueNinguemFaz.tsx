import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const STEPS = [
  { num: "10", label: "pessoas", desc: "no time" },
  { num: "2h", label: "por dia", desc: "em trabalho manual repetitivo" },
  { num: "400h", label: "por mês", desc: "perdidas em coisa que sistema deveria fazer sozinho" },
  { num: "2", label: "pessoas full-time", desc: "só pra manter o que deveria ser automático" },
];

// Operador que liga cada card ao próximo: 10 × 2h = 400h = 2 pessoas
const OPERATORS = ["×", "=", "="];

const COPY_PT_BR = {
  titleA: "A conta que",
  titleB: "ninguém faz.",
  sub: "E que segura o crescimento no fim do ano.",
  steps: STEPS,
  closingA: "Esse é o custo real de operar sem automação.",
  closingB: "Não aparece no DRE. Fica diluído no CLT do time.",
  cta: "quero meu diagnóstico",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  // DRE e CLT são termos do Brasil: na LP dos EUA vira P&L e folha.
  "pt-us": {
    ...COPY_PT_BR,
    closingB: "Não aparece no P&L. Fica diluído na folha do time.",
  },
  en: {
    titleA: "The math",
    titleB: "nobody does.",
    sub: "And it's what holds back growth by year-end.",
    steps: [
      { num: "10", label: "people", desc: "on the team" },
      { num: "2h", label: "a day", desc: "of repetitive manual work" },
      { num: "400h", label: "a month", desc: "lost on work a system should be doing on its own" },
      { num: "2", label: "full-time people", desc: "just to keep up what should be automatic" },
    ],
    closingA: "That's the real cost of running without automation.",
    closingB: "It doesn't show up on the P&L. It's buried in payroll.",
    cta: "request diagnostic",
  },
};

export function ContaQueNinguemFaz() {
  const c = useLpCopy(COPY);
  return (
    <section
      id="a-conta"
      className="conta-section"
      style={{ background: "linear-gradient(180deg, #0c0f07 0%, #0f1209 50%, #0c0f07 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgba(200,224,64,0.07), transparent 65%)",
        }}
      />
      <div className="container-page relative">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2
              className="font-extrabold text-[30px] sm:text-[40px] lg:text-[52px] leading-[1.03] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              {c.titleA} <span style={{ color: "var(--color-primary)" }}>{c.titleB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="conta-sub">{c.sub}</p>
          </Reveal>
        </div>

        <ol className="conta-grid">
          {c.steps.map((step, i) => (
            <li key={step.num} className="conta-step" data-step={i + 1}>
              <Reveal delay={0.08 + i * 0.1}>
                <div className="conta-card">
                  <span className="conta-card-index">{String(i + 1).padStart(2, "0")}</span>
                  <div className="conta-card-num">
                    {step.num}
                    <span className="conta-card-label">{step.label}</span>
                  </div>
                  <p className="conta-card-desc">{step.desc}</p>
                </div>
              </Reveal>
              {i < OPERATORS.length && (
                <span className="conta-op" aria-hidden>
                  {OPERATORS[i]}
                </span>
              )}
            </li>
          ))}
        </ol>

        <Reveal delay={0.5}>
          <p className="conta-closing">
            {c.closingA} <strong>{c.closingB}</strong>
          </p>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-10 text-center">
            <OriginButton
              onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
            >
              {c.cta}
            </OriginButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
