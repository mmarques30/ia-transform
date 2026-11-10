import { Building2, Crown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/lpx/SectionHead";
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
  eyebrow: "Perfil ideal",
  titleA: "Para",
  titleEm: "quem",
  titleB: "é o Business?",
  segments: SEGMENTS,
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    eyebrow: "Ideal fit",
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

const SEGMENT_ICONS = [Crown, Building2];

/** Para quem é: os dois perfis em cards com ícone e borda iluminada. */
export function ParaQuem() {
  const c = useLpCopy(COPY);
  return (
    <section className="lpx-section relative">
      <div className="lpx-glow" aria-hidden style={{ top: 40, right: -240 }} />
      <div className="lpx-wrap relative">
        <SectionHead
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleA} <em>{c.titleEm}</em> {c.titleB}
            </>
          }
        />

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {c.segments.map((seg, i) => {
            const Icon = SEGMENT_ICONS[i];
            return (
              <Reveal key={seg.title} delay={0.08 + i * 0.1} className="h-full">
                <article className="lpx-card lpx-card--hover lpx-spot lpx-edge h-full p-7 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="lpx-icon">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="lpx-mono text-[13px] text-[var(--lpx-faint)]">0{i + 1}</span>
                  </div>
                  <h3
                    style={{ textWrap: "balance" }}
                    className="mt-8 text-[24px] lg:text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--lpx-text)]"
                  >
                    {seg.title.replace(/\n/g, " ")}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-[var(--lpx-muted)]">
                    {seg.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
