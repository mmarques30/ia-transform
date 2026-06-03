import { Reveal } from "@/components/Reveal";
import { BarChart3, Receipt, TrendingUp, Lightbulb } from "lucide-react";

/**
 * Seções 3 + 4 do brief — A Virada + O que você recebe.
 *
 * Virada: "A pergunta não é se IA serve. É quanto ela já podia estar
 * economizando." Reposiciona da dúvida pro custo de não agir.
 *
 * O que você recebe: 4 cards com entregáveis concretos do diagnóstico.
 */
const DELIVERABLES = [
  {
    icon: BarChart3,
    title: "Seu cenário atual quantificado",
    text: "Total de horas que sua equipe gasta hoje em tarefas automatizáveis, convertido em quantos colaboradores em tempo integral isso equivale.",
  },
  {
    icon: Receipt,
    title: "Cenário com IA, tarefa por tarefa",
    text: "Conta aberta: quanto cada tarefa (conciliação, apuração, atendimento, onboarding) custa hoje, quanto custaria com IA, e quanto você economiza por mês.",
  },
  {
    icon: TrendingUp,
    title: "Projeção de economia em 12 meses",
    text: "Quanto isso vira em economia anual no seu escritório, no seu cenário, com o seu custo real de equipe.",
  },
  {
    icon: Lightbulb,
    title: "3 recomendações priorizadas",
    text: "Baseado no maior gargalo que você apontar, entregamos as 3 frentes de automação que dão mais ROI pro seu caso específico.",
  },
];

export function Solution() {
  return (
    <section className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        {/* Virada — reposiciona a pergunta */}
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />A virada
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] text-foreground">
              A pergunta não é se IA serve pro seu escritório.
              <br className="hidden sm:block" />
              É <em>quanto</em> ela já podia estar economizando.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 lg:mt-7 text-[15.5px] lg:text-[17px] text-sage leading-[1.65] max-w-[680px] mx-auto">
              A IA não vem substituir contador. Vem assumir o pedaço operacional que tomava o
              tempo da sua equipe pra ela voltar a fazer o que paga melhor: consultoria,
              planejamento tributário, relacionamento com o cliente.
            </p>
          </Reveal>
        </div>

        {/* 4 cards de entregáveis — Seção 4 do brief */}
        <div className="mt-14 lg:mt-20 max-w-[1080px] mx-auto">
          <Reveal>
            <p className="text-center text-[11.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
              O que você sai daqui com (em 3 minutos, sem custo, sem compromisso)
            </p>
          </Reveal>
          <div className="mt-7 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {DELIVERABLES.map((d, i) => (
              <Reveal key={d.title} delay={0.12 + i * 0.06}>
                <div
                  className="rounded-2xl border border-border p-6 lg:p-7 h-full"
                  style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                    }}
                  >
                    <d.icon
                      className="h-5 w-5"
                      strokeWidth={2}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                  <p className="mt-5 text-[17px] font-bold tracking-tight text-foreground leading-[1.25]">
                    {d.title}
                  </p>
                  <p className="mt-2.5 text-[14px] text-sage leading-[1.55]">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
