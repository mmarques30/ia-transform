import { Reveal } from "@/components/Reveal";
import { Compass, Wrench, GraduationCap, ArrowRight } from "lucide-react";

const FORMATS = [
  {
    icon: Compass,
    title: "Mentoria estratégica contínua",
    meta: "C-level · Recorrência mensal",
    text: "Um copiloto externo que senta com a diretoria, desafia decisões, organiza o portfólio de iniciativas de IA e mantém a maturidade crescendo sem descontinuidade. Agenda fixa, governança clara, entregáveis por trimestre.",
  },
  {
    icon: Wrench,
    title: "Implementação sob demanda",
    meta: "Por projeto · 3 a 6 meses",
    text: "Para desafios específicos: automação de um processo crítico, construção de um assistente interno, reengenharia de um fluxo. Desenhamos, construímos, treinamos e deixamos documentado. O time opera sozinho no fim.",
  },
  {
    icon: GraduationCap,
    title: "Capacitação de lideranças",
    meta: "Turmas fechadas · 8 a 12 sem",
    text: "Para squads de líderes e times operacionais que precisam subir o nível de IA aplicada no contexto real do cargo, não em aulas genéricas. Casos reais da empresa viram material de aula.",
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
              Depois do diagnóstico, o formato é construído pra você. Pode ser mais próximo de uma
              mentoria estratégica contínua, de uma consultoria de implementação, ou da construção
              de sistemas sob demanda. Pode ser uma combinação. O que nunca muda: método,
              acompanhamento e resultado mensurável.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="rounded-lg border border-border bg-card p-8 h-full flex flex-col">
                <f.icon className="h-6 w-6 text-primary-glow" strokeWidth={1.5} />
                <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-primary">
                  {f.meta}
                </p>
                <h3 className="mt-2 text-[21px] font-semibold text-foreground leading-snug">
                  {f.title}
                </h3>
                <p className="mt-4 text-sage leading-[1.6] text-[15px]">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <p className="text-sage">O formato certo pra você a gente descobre em 30 minutos.</p>
            <a
              href="#diagnostico-form"
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
