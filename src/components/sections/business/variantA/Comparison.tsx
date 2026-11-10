import { Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/lpx/CtaButton";
import { SectionHead } from "@/components/lpx/SectionHead";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const LEFT_ITEMS = [
  "Tudo passa pelo fundador",
  "Operação vive em planilha e WhatsApp",
  "Decisão trava por falta de dado",
  "Crescer significa contratar mais",
  "Retrabalho entra como custo fixo",
];

const RIGHT_ITEMS = [
  "Sistema resolve o que é rotina",
  "Dados centralizados e integrados",
  "Decisão acontece no sistema, não no WhatsApp",
  "IA elimina o retrabalho na raiz",
  "Time executa, você escala",
];

const COPY_PT_BR = {
  eyebrow: "Antes e depois",
  titleA: "As empresas que mais escalam hoje",
  titleB: "são as que automatizam a operação antes de contratar mais gente.",
  sub: "Existe uma diferença fundamental entre empresas que crescem com eficiência e as que crescem multiplicando problema. É uma questão de sistema, não de equipe.",
  leftTitle: "Como a maioria opera:",
  leftItems: LEFT_ITEMS,
  leftResult: "Crescimento que cria gargalo, não velocidade.",
  rightTitle: "Como opera com a IAplicada:",
  rightItems: RIGHT_ITEMS,
  rightResult: "Mais receita com o time que você já tem.",
  resultLabel: "Resultado:",
  cta: "Quero meu diagnóstico",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    eyebrow: "Before and after",
    titleA: "The companies scaling fastest today",
    titleB: "are the ones that automate operations before hiring more people.",
    sub: "There's a fundamental difference between companies that grow efficiently and the ones that grow by multiplying problems. It's a matter of systems, not headcount.",
    leftTitle: "How most companies operate:",
    leftItems: [
      "Everything goes through the founder",
      "Operations live in spreadsheets and group chats",
      "Decisions stall for lack of data",
      "Growing means hiring more people",
      "Rework becomes a fixed cost",
    ],
    leftResult: "Growth that creates bottlenecks, not speed.",
    rightTitle: "How it runs with IAplicada:",
    rightItems: [
      "The system handles the routine work",
      "Centralized, integrated data",
      "Decisions happen in the system, not in group chats",
      "AI eliminates rework at the root",
      "Your team executes, you scale",
    ],
    rightResult: "More revenue with the team you already have.",
    resultLabel: "Result:",
    cta: "Request my diagnostic",
  },
};

/**
 * Antes × depois: card apagado com X (como a maioria opera) contra o card
 * iluminado com check (com a IAplicada), com o selo "VS" no meio.
 */
export function Comparison() {
  const c = useLpCopy(COPY);
  return (
    <section className="lpx-section relative">
      <div className="lpx-glow" aria-hidden style={{ bottom: -200, right: -160 }} />

      <div className="lpx-wrap relative">
        <SectionHead
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleA} <span className="lpx-dim">{c.titleB}</span>
            </>
          }
          sub={c.sub}
        />

        <div className="relative mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-[1040px] mx-auto">
          <Reveal>
            <ComparisonCard
              title={c.leftTitle}
              items={c.leftItems}
              result={c.leftResult}
              resultLabel={c.resultLabel}
              variant="negative"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ComparisonCard
              title={c.rightTitle}
              items={c.rightItems}
              result={c.rightResult}
              resultLabel={c.resultLabel}
              variant="positive"
            />
          </Reveal>
          <span className="lpx-vs" aria-hidden>
            VS
          </span>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 lg:mt-14 flex justify-center">
            <CtaButton>{c.cta}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  items,
  result,
  resultLabel,
  variant,
}: {
  title: string;
  items: string[];
  result: string;
  resultLabel: string;
  variant: "negative" | "positive";
}) {
  const positive = variant === "positive";
  const Mark = positive ? Check : X;

  return (
    <div className={`lpx-compare h-full${positive ? " lpx-compare--pos lpx-spot" : ""}`}>
      <div className="p-7 lg:p-9">
        <p
          className={`text-[19px] lg:text-[21px] font-semibold tracking-[-0.02em] ${positive ? "text-[var(--lpx-text)]" : "text-[var(--lpx-muted)]"}`}
        >
          {title}
        </p>

        <ul className="mt-6 space-y-1">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3.5 py-2.5">
              <span className={`lpx-mark${positive ? " lpx-mark--pos" : ""}`}>
                <Mark className="h-3.5 w-3.5" strokeWidth={2.6} />
              </span>
              <span
                className={`text-[15px] leading-[1.5] ${positive ? "text-[var(--lpx-text)] font-medium" : "text-[#8a8f7d]"}`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`lpx-compare-foot${positive ? " lpx-compare-foot--pos" : ""}`}>
        <span className="lpx-mono text-[11px] uppercase tracking-[0.16em]">{resultLabel}</span>
        <p className="mt-1.5 text-[15.5px] leading-[1.45] font-semibold">{result}</p>
      </div>
    </div>
  );
}
