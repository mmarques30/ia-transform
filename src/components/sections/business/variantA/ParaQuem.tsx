import { Reveal } from "@/components/Reveal";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const SEGMENTS = [
  {
    title: "Empresários,\nFundadores\ne Sócios",
    description:
      "Que estão presos no operacional, apagando incêndio todo dia, e querem um sistema que faça a empresa rodar sem depender deles no meio de tudo.",
  },
  {
    title: "Diretores de\nOperações e\nGestores de Área",
    description:
      "Que lideram times de qualquer área, seja comercial, financeiro, logística, CS, contábil ou qualquer outra, e precisam de automação que elimine processos manuais e retrabalho, funcionando do jeito que a equipe já trabalha.",
  },
];

const COPY_PT_BR = {
  titleA: "Para",
  titleEm: "quem",
  titleB: "é o Business?",
  segments: SEGMENTS,
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    titleA: "Who is",
    titleEm: "Business",
    titleB: "for?",
    segments: [
      {
        title: "Business Owners,\nFounders\nand Partners",
        description:
          "Who are stuck in day-to-day operations, putting out fires every day, and want a system that keeps the company running without them in the middle of everything.",
      },
      {
        title: "Operations Directors\nand Department\nManagers",
        description:
          "Who lead teams in any area, whether sales, finance, logistics, customer success, accounting or anything else, and need automation that eliminates manual processes and rework while fitting the way the team already works.",
      },
    ],
  },
};

export function ParaQuem() {
  const c = useLpCopy(COPY);
  return (
    <section
      className="para-quem-section"
      style={{
        background:
          "linear-gradient(180deg, #0c0f07 0%, #131710 50%, #0c0f07 100%)",
      }}
    >
      <div className="container-page">
        <div className="para-quem-inner">
          <Reveal>
            <h2 className="para-quem-title">
              {c.titleA}{" "}
              <strong className="para-quem-title-em">{c.titleEm}</strong> {c.titleB}
            </h2>
          </Reveal>

          <div className="para-quem-grid">
            {c.segments.map((seg, i) => (
              <Reveal key={i} delay={0.08 + i * 0.1}>
                <div className="para-quem-card">
                  <h3 className="para-quem-card-title">
                    {seg.title.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < seg.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="para-quem-card-desc">{seg.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
