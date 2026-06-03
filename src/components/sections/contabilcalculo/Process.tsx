import { Reveal } from "@/components/Reveal";
import { ListChecks, Eye, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Seção 5 do brief — Como funciona. 3 passos curtos descrevendo
 * a experiência do diagnóstico (calculadora + WhatsApp follow-up).
 */
interface Step {
  n: string;
  title: string;
  text: string;
  Icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    n: "1",
    title: "Responda 8 perguntas rápidas",
    text: "Tamanho do escritório, base de clientes, onde sua equipe gasta tempo hoje. Já vem com valores padrão de mercado pra você só ajustar pra sua realidade.",
    Icon: ListChecks,
  },
  {
    n: "2",
    title: "Veja o diagnóstico na hora",
    text: "Resultado completo na tela. Sem espera, sem PDF que chega por e-mail amanhã.",
    Icon: Eye,
  },
  {
    n: "3",
    title: "Receba sua trilha por WhatsApp",
    text: "Em até 5 minutos depois do diagnóstico, mandamos pelo WhatsApp os próximos passos e como aplicar isso no seu escritório.",
    Icon: MessageCircle,
  },
];

export function Process() {
  return (
    <section
      id="como-funciona"
      className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden"
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
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] text-foreground">
              3 passos. <em>3 minutos.</em>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 max-w-[1080px] mx-auto grid md:grid-cols-3 gap-4 lg:gap-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={0.1 + i * 0.08}>
              <div
                className="relative rounded-2xl border border-border p-6 lg:p-7 h-full"
                style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
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
                  </span>
                  <span
                    className="num-display text-[42px] lg:text-[52px] leading-none"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {step.n}
                  </span>
                </div>
                <p className="mt-5 text-[17px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.25]">
                  {step.title}
                </p>
                <p className="mt-2.5 text-[14px] text-sage leading-[1.55]">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
