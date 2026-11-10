import { BrainCircuit, Plug } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/lpx/CtaButton";
import { SistemaShowcase } from "@/components/lpx/SistemaMockup";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const COPY_PT_BR = {
  eyebrow: "Como a gente faz",
  titleA: "Sua operação roda. Seu time entrega.",
  titleB: "Você acompanha tudo sem estar no meio de tudo.",
  /** Texto em volta de APLICA e de "90 dias" (que vão em negrito). */
  subA: "O Método ",
  subB: " identifica onde sua operação trava, constrói o sistema que resolve e implementa dentro do seu negócio em até ",
  days: "90 dias",
  subC: ".",
  cta: "Quero meu sistema",
  steps: [
    {
      tag: "Ponto de partida",
      title: "Diagnóstico gratuito",
      text: "Mapeamos os processos e montamos o ranking de gargalos da operação.",
    },
    {
      tag: "Até 30 dias",
      title: "MVP funcionando",
      text: "Começamos pelo que gera resultado primeiro. Entrega funcional, não promessa.",
    },
    {
      tag: "Até 90 dias",
      title: "Sistema completo",
      text: "Integrado ao que você já usa: planilha, CRM, ERP, WhatsApp, e-mail.",
    },
  ],
  chipAi: "IA treinada no seu processo",
  chipIntegra: "Integra com o que você já usa",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    eyebrow: "How we do it",
    titleA: "Your operations run. Your team delivers.",
    titleB: "You keep track of everything without being in the middle of everything.",
    subA: "The ",
    subB: " Method pinpoints where your operations get stuck, builds the system that fixes it, and implements it inside your business in up to ",
    days: "90 days",
    subC: ".",
    cta: "I want my system",
    steps: [
      {
        tag: "Starting point",
        title: "Free diagnostic",
        text: "We map your processes and rank your operation's bottlenecks.",
      },
      {
        tag: "Up to 30 days",
        title: "Working MVP",
        text: "We start with what drives results first. A working delivery, not a promise.",
      },
      {
        tag: "Up to 90 days",
        title: "Complete system",
        text: "Integrated with what you already use: spreadsheets, CRM, ERP, email.",
      },
    ],
    chipAi: "AI trained on your process",
    chipIntegra: "Works with the tools you already use",
  },
};

/**
 * Método APLICA: as três etapas (diagnóstico → MVP → sistema) numa linha
 * do tempo à esquerda e o painel de demonstração numa moldura iluminada
 * à direita, com chips flutuantes e abas por setor.
 */
export function MetodoAplicaBook() {
  const c = useLpCopy(COPY);
  return (
    <section id="metodo-aplica" className="lpx-section relative">
      <div className="lpx-grid lpx-grid--fine" aria-hidden />
      <div
        className="lpx-glow"
        aria-hidden
        style={{ top: "30%", right: -220, width: 820, height: 820 }}
      />

      <div className="lpx-wrap relative">
        <div className="max-w-[860px]">
          <Reveal>
            <span className="lpx-eyebrow">{c.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="lpx-h2 mt-6">
              {c.titleA} <span className="lpx-dim">{c.titleB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lpx-lead mt-5">
              {c.subA}
              <strong className="font-semibold text-[var(--lpx-text)]">APLICA</strong>
              {c.subB}
              <strong className="font-semibold text-[var(--lpx-lime-hi)]">{c.days}</strong>
              {c.subC}
            </p>
          </Reveal>
        </div>

        <ol className="lpx-steps lpx-steps--row mt-12 lg:mt-16">
          {c.steps.map((step, i) => (
            <li key={step.title} className="lpx-step">
              <span className="lpx-step-dot" aria-hidden>
                {i + 1}
              </span>
              <Reveal delay={0.08 * i}>
                <span className="lpx-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lpx-lime-hi)]">
                  {step.tag}
                </span>
                <p className="mt-2 text-[19px] font-semibold tracking-[-0.02em] text-[var(--lpx-text)]">
                  {step.title}
                </p>
                <p className="mt-1.5 max-w-[34ch] text-[14.5px] leading-[1.6] text-[var(--lpx-muted)]">
                  {step.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12}>
          <div className="relative mt-10 lg:mt-14">
            <div className="lpx-device">
              <div className="p-4 sm:p-6">
                <SistemaShowcase />
              </div>
            </div>

            <div
              className="lpx-float lpx-float--chip hidden md:flex"
              style={{ left: -28, bottom: -22 }}
            >
              <span className="lpx-icon lpx-icon--sm">
                <BrainCircuit className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[13px] font-medium text-[var(--lpx-text)]">{c.chipAi}</span>
            </div>
            <div
              className="lpx-float lpx-float--chip hidden md:flex"
              style={{ right: -20, top: -26, animationDelay: "-3.5s" }}
            >
              <span className="lpx-icon lpx-icon--sm">
                <Plug className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[13px] font-medium text-[var(--lpx-text)]">
                {c.chipIntegra}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 lg:mt-14 flex justify-center">
            <CtaButton>{c.cta}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
