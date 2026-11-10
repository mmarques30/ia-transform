import { Receipt } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/lpx/CountUp";
import { CtaButton } from "@/components/lpx/CtaButton";
import { SectionHead } from "@/components/lpx/SectionHead";
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
  eyebrow: "Faça as contas",
  titleA: "A conta que",
  titleB: "ninguém faz.",
  sub: "E que segura o crescimento no fim do ano.",
  steps: STEPS,
  closingA: "Esse é o custo real de operar sem automação.",
  closingB: "Não aparece no DRE. Fica diluído no CLT do time.",
  cta: "Quero meu diagnóstico",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  // DRE e CLT são termos do Brasil: na LP dos EUA vira P&L e folha.
  "pt-us": {
    ...COPY_PT_BR,
    closingB: "Não aparece no P&L. Fica diluído na folha do time.",
  },
  en: {
    eyebrow: "Run the numbers",
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
    cta: "Request my diagnostic",
  },
};

/** "400h" → 400 + "h": o número anima, o sufixo fica fixo. */
function splitNum(num: string): [number, string] {
  const m = num.match(/^(\d+)(.*)$/);
  return m ? [Number(m[1]), m[2]] : [0, num];
}

/**
 * A conta que ninguém faz: 10 × 2h = 400h = 2 pessoas, em cards com
 * número animado ligados por operadores; o resultado fecha em lime.
 */
export function ContaQueNinguemFaz() {
  const c = useLpCopy(COPY);
  return (
    <section id="a-conta" className="lpx-section relative overflow-hidden">
      <div className="lpx-grid" aria-hidden />
      <div className="lpx-horizon" aria-hidden style={{ top: "62%", opacity: 0.55 }} />

      <div className="lpx-wrap relative">
        <SectionHead
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleA} <em>{c.titleB}</em>
            </>
          }
          sub={c.sub}
        />

        <ol className="lpx-conta mt-14 lg:mt-20">
          {c.steps.map((step, i) => {
            const [n, suffix] = splitNum(step.num);
            const last = i === c.steps.length - 1;
            return (
              <li key={step.num} className="lpx-conta-step">
                <Reveal delay={0.08 + i * 0.1} className="h-full">
                  <div
                    className={`lpx-card lpx-card--hover lpx-spot h-full p-6 lg:p-7${last ? " lpx-card--lime" : ""}`}
                  >
                    <span
                      className={`lpx-mono text-[12px] ${last ? "text-[#0a0c07]/55" : "text-[var(--lpx-faint)]"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={`lpx-mono mt-8 text-[52px] lg:text-[60px] font-semibold leading-none tracking-[-0.04em] ${last ? "text-[#0a0c07]" : "text-[var(--lpx-text)]"}`}
                    >
                      <CountUp value={n} />
                      {suffix}
                    </p>
                    <p
                      className={`mt-3 text-[15px] font-semibold ${last ? "text-[#0a0c07]" : "text-[var(--lpx-lime-hi)]"}`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`mt-1 text-[14px] leading-[1.5] ${last ? "text-[#0a0c07]/75" : "text-[var(--lpx-muted)]"}`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
                {i < OPERATORS.length && (
                  <span className="lpx-op" aria-hidden>
                    {OPERATORS[i]}
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.4}>
          <div className="lpx-callout mt-10 lg:mt-12">
            <span className="lpx-icon">
              <Receipt className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <p className="text-[16px] lg:text-[18px] leading-[1.5] text-[var(--lpx-muted)]">
              {c.closingA}{" "}
              <strong className="font-semibold text-[var(--lpx-text)]">{c.closingB}</strong>
            </p>
            <div className="lpx-callout-cta">
              <CtaButton>{c.cta}</CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
