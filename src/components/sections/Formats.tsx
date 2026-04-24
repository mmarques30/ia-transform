import { Reveal } from "@/components/Reveal";
import { Compass, Wrench, GraduationCap, ArrowRight } from "lucide-react";

const FORMATS = [
  {
    icon: Compass,
    title: "Estratégia contínua",
    text: "Para empresas que precisam de um copiloto externo que desafia decisões e mantém a maturidade de IA crescendo sem descontinuidade.",
  },
  {
    icon: Wrench,
    title: "Construção sob demanda",
    text: "Para quando você tem um desafio específico e quer um sistema próprio, desenhado pra sua operação. Entregamos, documentamos, treinamos.",
  },
  {
    icon: GraduationCap,
    title: "Capacitação profunda",
    text: "Para líderes e times que precisam subir de nível com IA aplicada no contexto do cargo deles, não no genérico.",
  },
];

export function Formats() {
  return (
    <section
      className="py-[120px] lg:py-[160px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="text-center max-w-[800px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ Formatos</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              Cada empresa recebe o formato que faz sentido pra ela
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] text-sage leading-[1.6] max-w-[720px] mx-auto">
              Depois do diagnóstico, o formato é construído pra você. Pode ser
              mais próximo de uma mentoria estratégica contínua, de uma
              consultoria de implementação, ou da construção de sistemas sob
              demanda. Pode ser uma combinação. O que nunca muda: método,
              acompanhamento e resultado mensurável.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="rounded-lg border border-border bg-card p-8 h-full">
                <f.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                <h3 className="mt-6 text-[20px] font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sage leading-[1.6] text-[15px]">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <p className="text-sage">
              O formato certo pra você a gente descobre em 30 minutos.
            </p>
            <a
              href="#cta-final"
              className="mt-4 inline-flex items-center gap-2 text-primary-glow hover:text-primary font-semibold transition-colors"
            >
              Agendar diagnóstico
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
