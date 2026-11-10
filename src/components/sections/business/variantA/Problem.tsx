import { Rocket, Users, Workflow } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/lpx/CtaButton";
import { SectionHead } from "@/components/lpx/SectionHead";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const PILLARS = [
  { label: "ENTREGANDO", bold: "Mais rápido" },
  { label: "OPERANDO", bold: "Sem você" },
  { label: "CRESCENDO", bold: "Sem contratar" },
];

const COPY_PT_BR = {
  eyebrow: "O que é a IAplicada",
  titleA: "O sistema que libera a operação",
  titleB: "e escala a receita.",
  // Frase de definição logo no início da página: é o trecho que buscadores
  // e IAs extraem pra responder "o que é a IAplicada".
  sub: "A IAplicada constrói software com IA sob medida que automatiza a operação da sua empresa. O mesmo sistema que já entregamos em mais de 50 empresas no Brasil e fora do\u00a0país.",
  pillars: PILLARS,
  cta: "Quero meu diagnóstico",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  "pt-us": {
    ...COPY_PT_BR,
    sub: "A IAplicada constrói software com IA sob medida que automatiza a operação da sua empresa. O mesmo sistema que já entregamos em mais de 50 empresas, dentro e fora do\u00a0Brasil.",
  },
  en: {
    eyebrow: "What IAplicada is",
    titleA: "The system that frees up your operations",
    titleB: "and scales your revenue.",
    sub: "IAplicada builds custom AI-powered software that automates your company's operations. The same system we've delivered to more than 50 companies in Brazil and\u00a0abroad.",
    pillars: [
      { label: "DELIVERING", bold: "Faster" },
      { label: "RUNNING", bold: "Without you" },
      { label: "GROWING", bold: "Without hiring" },
    ],
    cta: "Request my diagnostic",
  },
};

const PILLAR_ICONS = [Rocket, Workflow, Users];

/**
 * "O sistema que libera a operação": definição da IAplicada e os três
 * ganhos em cards numerados (o do meio em destaque lime).
 */
export function Problem() {
  const c = useLpCopy(COPY);
  return (
    <section className="lpx-section relative">
      <div className="lpx-grid" aria-hidden />
      <div className="lpx-glow" aria-hidden style={{ top: -120, left: "50%", marginLeft: -320 }} />

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

        <ol className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {c.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            const lime = i === 1;
            return (
              <li key={p.bold}>
                <Reveal delay={0.08 * i} className="h-full">
                  <div
                    className={`lpx-card lpx-card--hover lpx-spot flex h-full min-h-[170px] md:min-h-[220px] flex-col justify-between p-7 lg:p-8${lime ? " lpx-card--lime" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`lpx-mono text-[13px] ${lime ? "text-[#0a0c07]/60" : "text-[var(--lpx-faint)]"}`}
                      >
                        0{i + 1}
                      </span>
                      {lime ? (
                        <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-[#0a0c07] text-[var(--lpx-lime)]">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                      ) : (
                        <span className="lpx-icon">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                      )}
                    </div>
                    <div>
                      <span
                        className={`lpx-mono block text-[11.5px] uppercase tracking-[0.18em] ${lime ? "text-[#0a0c07]/65" : "text-[var(--lpx-muted)]"}`}
                      >
                        {p.label}
                      </span>
                      <span
                        className={`mt-2 block font-[600] text-[30px] lg:text-[34px] leading-[1.02] tracking-[-0.035em] ${lime ? "text-[#0a0c07]" : "text-[var(--lpx-text)]"}`}
                        style={{ fontFamily: '"Inter Tight", "Inter", system-ui, sans-serif' }}
                      >
                        {p.bold}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.2}>
          <div className="mt-12 lg:mt-14 flex justify-center">
            <CtaButton>{c.cta}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
