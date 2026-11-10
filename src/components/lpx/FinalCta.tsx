import { LockKeyhole } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";
import { CtaButton } from "./CtaButton";

interface FinalCopy {
  eyebrow: string;
  titleA: string;
  titleB: string;
  sub: string;
  cta: string;
  note: string;
}

const PT: FinalCopy = {
  eyebrow: "Diagnóstico gratuito",
  titleA: "Vamos construir",
  titleB: "o seu?",
  sub: "Em até 90 dias, o software com IA que automatiza sua operação, sob medida para o jeito que seu negócio funciona.",
  cta: "Solicitar diagnóstico",
  note: "Sem custo e sem compromisso de contratação.",
};

const COPY: LpCopy<FinalCopy> = {
  "pt-br": PT,
  en: {
    eyebrow: "Free diagnostic",
    titleA: "Shall we build",
    titleB: "yours?",
    sub: "In up to 90 days, the AI-powered software that automates your operations, built around the way your business works.",
    cta: "Request diagnostic",
    note: "No cost and no commitment to hire us.",
  },
};

/** Fechamento da LP: card com anéis e a marca da IAplicada, CTA pro form. */
export function FinalCta() {
  const c = useLpCopy(COPY);
  return (
    <section className="lpx-section--tight relative">
      <div className="lpx-wrap">
        <Reveal>
          <div className="lpx-final">
            <div className="lpx-final-art" aria-hidden>
              <div className="lpx-portal-ring" />
              <div className="lpx-portal-ring" />
              <div className="lpx-portal-ring" />
              <img src="/brand/logo-petals.png" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="lpx-grid" aria-hidden />

            <div className="relative max-w-[640px]">
              <span className="lpx-eyebrow">{c.eyebrow}</span>
              <h2 className="lpx-h2 mt-6">
                {c.titleA} <em>{c.titleB}</em>
              </h2>
              <p className="lpx-lead mt-5">{c.sub}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <CtaButton>{c.cta}</CtaButton>
                <span className="inline-flex items-center gap-2 text-[13px] text-[var(--lpx-muted)]">
                  <LockKeyhole
                    className="h-3.5 w-3.5 text-[var(--lpx-lime)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {c.note}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
