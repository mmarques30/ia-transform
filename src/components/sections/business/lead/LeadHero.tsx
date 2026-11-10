import { Reveal } from "@/components/Reveal";
import { LockKeyhole } from "lucide-react";
import { LeadCta } from "./LeadCta";

interface LeadHeroProps {
  onOpenModal: () => void;
}

/** Prévia do kit em leque, abaixo do botão. */
const PREVIEW = [
  { src: "/mockups/mockup-prompts.png", label: "Prompts de IA" },
  { src: "/mockups/mockup-automacao.png", label: "Automações" },
  { src: "/mockups/mockup-agente.png", label: "Agente Virtual" },
  { src: "/mockups/mockup-financeiro.png", label: "Financeiro IA" },
];

/**
 * Hero da /lead no visual da LP: grade, anéis com o símbolo da IAplicada,
 * título com a frase em serifa, botão que abre o form e a prévia do kit.
 */
export function LeadHero({ onOpenModal }: LeadHeroProps) {
  return (
    <section id="lead-hero" className="lpx-hero lpx-lead-hero">
      <div className="lpx-grid" aria-hidden />
      <div className="lpx-portal lpx-lead-portal" aria-hidden>
        <div className="lpx-portal-ring" />
        <div className="lpx-portal-ring" />
        <div className="lpx-portal-ring" />
        <div className="lpx-portal-core" />
        <img className="lpx-portal-logo" src="/brand/logo-petals.png" alt="" decoding="async" />
        <div className="lpx-portal-spin">
          <div className="lpx-portal-orbit" />
        </div>
      </div>

      <div className="lpx-wrap relative z-[3]">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <span className="lpx-eyebrow-line lpx-eyebrow-line--center">
              Kit gratuito · Acesso imediato
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="lpx-h1 lpx-lead-h1 mt-6">
              <span className="hero-b-h1-sans">Automatize o que trava sua operação.</span>
              <em className="hero-b-h1-em">Sem contratar ninguém.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lpx-hero-sub mx-auto">
              Prompts, automações e agentes de IA <em>prontos para usar</em> na sua empresa,
              testados em operações reais. Tudo num kit gratuito pra você começar a automatizar.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <LeadCta onClick={onOpenModal}>Quero o kit completo</LeadCta>
              <span className="inline-flex items-center gap-2 text-[12.5px] text-[var(--lpx-faint)]">
                <LockKeyhole
                  className="h-3.5 w-3.5 text-[var(--lpx-lime)]"
                  strokeWidth={2}
                  aria-hidden
                />
                Gratuito. Você recebe o acesso na hora.
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="lpx-fan" aria-hidden>
            {PREVIEW.map((p, i) => (
              <figure
                key={p.src}
                className="lpx-fan-card"
                style={{ "--i": i } as React.CSSProperties}
              >
                <img src={p.src} alt="" loading="eager" decoding="async" draggable={false} />
                <figcaption>{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
