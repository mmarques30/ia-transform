import { Reveal } from "@/components/Reveal";
import { ListChecks, Eye, MessageCircle, ArrowRight } from "lucide-react";

/**
 * Como funciona — 3 passos como flow visual horizontal.
 * Cada passo é um ícone grande dentro de círculo + título + texto curto.
 * Setas conectam os passos no desktop (vertical no mobile).
 */
const STEPS = [
  {
    n: "1",
    Icon: ListChecks,
    title: "Responda 8 perguntas",
    text: "Tamanho do escritório + horas por tarefa. Valores padrão de mercado pré-preenchidos.",
  },
  {
    n: "2",
    Icon: Eye,
    title: "Veja na hora",
    text: "Resultado com conta aberta na tela. Sem espera, sem PDF que chega amanhã.",
  },
  {
    n: "3",
    Icon: MessageCircle,
    title: "Receba pelo WhatsApp",
    text: "Em até 5 minutos, mandamos a trilha com próximos passos pra aplicar.",
  },
];

export function Process() {
  return (
    <section
      id="como-funciona"
      className="section-veil py-[64px] lg:py-[110px] relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Como funciona
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-5 text-[28px] sm:text-[36px] lg:text-[46px] leading-[1.1] text-foreground">
              3 passos. <em>3 minutos.</em>
            </h2>
          </Reveal>
        </div>

        {/* Flow horizontal — passos + setas */}
        <div className="mt-12 lg:mt-16 max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-8 lg:gap-y-0 items-center">
            {STEPS.map((step, i) => (
              <Step key={step.n} step={step} i={i} />
            )).flatMap((node, i) =>
              i < STEPS.length - 1
                ? [
                    node,
                    <FlowConnector key={`c-${i}`} delay={0.05 + i * 0.1} />,
                  ]
                : [node],
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  i,
}: {
  step: (typeof STEPS)[number];
  i: number;
}) {
  return (
    <Reveal delay={0.1 + i * 0.1}>
      <div className="flex flex-col items-center text-center px-4">
        <span
          className="relative inline-flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full"
          style={{
            backgroundColor: "oklch(0.18 0.025 122 / 0.6)",
            border: "1px solid oklch(0.75 0.20 122 / 0.5)",
            boxShadow: "0 14px 28px -14px oklch(0.75 0.2 122 / 0.5)",
          }}
        >
          <step.Icon
            className="h-8 w-8 lg:h-9 lg:w-9"
            strokeWidth={1.75}
            style={{ color: "var(--color-primary)" }}
          />
          <span
            className="absolute -top-2 -right-1 num-display text-[12px] inline-flex items-center justify-center h-7 w-7 rounded-full"
            style={{
              backgroundColor: "var(--color-background)",
              border: "1px solid var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            {step.n}
          </span>
        </span>
        <p className="mt-5 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground">
          {step.title}
        </p>
        <p className="mt-2 text-[13.5px] lg:text-[14px] text-sage leading-[1.55] max-w-[240px]">
          {step.text}
        </p>
      </div>
    </Reveal>
  );
}

function FlowConnector({ delay }: { delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center justify-center" aria-hidden>
        {/* Mobile: seta vertical pra baixo. Desktop: seta horizontal. */}
        <ArrowRight
          className="h-5 w-5 lg:h-6 lg:w-6 rotate-90 lg:rotate-0"
          strokeWidth={1.5}
          style={{ color: "oklch(0.55 0.08 125 / 0.55)" }}
        />
      </div>
    </Reveal>
  );
}
