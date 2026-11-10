import { AlertCircle, Clock, Puzzle, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/lpx/SectionHead";
import { LeadCta } from "./LeadCta";

interface LeadProblemProps {
  onOpenModal: () => void;
}

const PROBLEMS: { icon: typeof AlertCircle; title: string; text: string }[] = [
  {
    icon: AlertCircle,
    title: "Dependência total de você",
    text: "Cada decisão operacional passa por você. A empresa só avança quando você está presente.",
  },
  {
    icon: Clock,
    title: "Tempo desperdiçado",
    text: "O time gasta horas em tarefas que deveriam ser automáticas. Todo santo dia.",
  },
  {
    icon: Puzzle,
    title: "IA sem encaixe",
    text: "Você experimenta ferramentas de IA, mas nada encaixa no processo real da operação.",
  },
  {
    icon: Users,
    title: "Mais gente, mesmo gargalo",
    text: "Contratar mais gente resolve no curto prazo. E cria outro gargalo logo depois.",
  },
];

/** O problema: quatro sinais em cards e o fechamento com o botão. */
export function LeadProblem({ onOpenModal }: LeadProblemProps) {
  return (
    <section id="lead-section2" className="lpx-section relative">
      <div className="lpx-glow" aria-hidden style={{ top: 40, left: -260 }} />
      <div className="lpx-wrap relative">
        <SectionHead
          size="xl"
          eyebrow="O problema"
          title={
            <>
              Sua empresa está refém da sua presença.{" "}
              <em>E&nbsp;contratar mais gente não&nbsp;resolve.</em>
            </>
          }
        />

        <ol className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {PROBLEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Reveal delay={0.06 * i} className="h-full">
                  <div className="lpx-card lpx-card--hover lpx-spot h-full p-7">
                    <div className="flex items-center justify-between">
                      <span className="lpx-icon">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span className="lpx-mono text-[12px] text-[var(--lpx-faint)]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-8 text-[19px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--lpx-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--lpx-muted)]">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.2}>
          <div className="lpx-callout mt-10 lg:mt-12">
            <p className="text-[17px] lg:text-[20px] leading-[1.45] text-[var(--lpx-muted)]">
              IA não é hype. É a única forma de{" "}
              <strong className="font-semibold text-[var(--lpx-lime-hi)]">
                escalar sem inflar a folha.
              </strong>{" "}
              E este kit mostra como começar.
            </p>
            <div className="lpx-callout-cta">
              <LeadCta onClick={onOpenModal}>Quero o kit gratuito</LeadCta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
