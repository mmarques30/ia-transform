import { Reveal } from "@/components/Reveal";
import { ListChecks, Eye, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Como funciona — 3 passos curtos posicionados ANTES da calculadora
 * (set de expectativa, não follow-up). Visualmente compacto pra
 * encadear com a próxima dobra sem virar separação dura.
 *
 * Reuso da informação da Seção 5 do brief original ("Como funciona"),
 * agora como banda horizontal de set-up.
 */
interface Step {
  n: string;
  Icon: LucideIcon;
  title: string;
  text: string;
}

const STEPS: Step[] = [
  {
    n: "1",
    Icon: ListChecks,
    title: "Responda 8 perguntas",
    text: "Tamanho do escritório + horas por tarefa. Valores padrão pré-preenchidos.",
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
    text: "Em até 5 minutos, mandamos a trilha personalizada com próximos passos.",
  },
];

export function Process() {
  return (
    <section
      id="como-funciona"
      className="section-veil py-[48px] lg:py-[64px] relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
              Antes de começar · como funciona em 3 minutos
            </p>
          </Reveal>
        </div>

        {/* 3 passos horizontal compacto — banda visual integradora */}
        <div className="mt-7 lg:mt-9 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={0.05 + i * 0.06}>
                <div
                  className="rounded-2xl border border-border p-5 h-full flex items-start gap-4"
                  style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.35)" }}
                >
                  <span
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                    }}
                  >
                    <step.Icon
                      className="h-5 w-5"
                      strokeWidth={2}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      className="absolute -top-1.5 -right-1.5 num-display text-[10.5px] inline-flex items-center justify-center h-5 w-5 rounded-full"
                      style={{
                        backgroundColor: "var(--color-background)",
                        border: "1px solid var(--color-primary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {step.n}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14.5px] lg:text-[15.5px] font-bold tracking-tight text-foreground leading-tight">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-[12.5px] lg:text-[13px] text-sage leading-[1.5]">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
