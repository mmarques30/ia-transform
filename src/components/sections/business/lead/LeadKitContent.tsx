import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/lpx/SectionHead";

interface Module {
  n: string;
  title: string;
  detail: string;
  img: string;
}

const MODULES: Module[] = [
  {
    n: "01",
    title: "Prompts de IA para Operação",
    detail:
      "Prompts prontos e calibrados para atendimento ao cliente, análise financeira rápida e aceleração de vendas. Copie, ajuste e use hoje.",
    img: "/mockups/mockup-prompts.png",
  },
  {
    n: "02",
    title: "Automações Prontas",
    detail:
      "Fluxos completos para n8n, Make e Zapier que eliminam tarefas manuais repetitivas. Importe direto, sem precisar construir do zero.",
    img: "/mockups/mockup-automacao.png",
  },
  {
    n: "03",
    title: "Agentes de IA Configurados",
    detail:
      "Exemplos reais de agentes rodando em operações, com contexto de como foram configurados e o que cada um resolve.",
    img: "/mockups/mockup-agente.png",
  },
];

/** O que está dentro: os três módulos em cards com a prévia de cada um. */
export function LeadKitContent() {
  return (
    <section className="lpx-section relative">
      <div className="lpx-grid lpx-grid--fine" aria-hidden />
      <div className="lpx-wrap relative">
        <SectionHead
          size="xl"
          eyebrow="O que está dentro"
          title={
            <>
              Três módulos. <em>Resultado na semana.</em>
            </>
          }
          sub={
            <>
              Cada módulo foi construído a partir de implementações reais. Sem teoria, sem
              enrolação:{" "}
              <strong className="font-semibold text-[var(--lpx-text)]">
                o que já funciona, pronto pra aplicar.
              </strong>
            </>
          }
        />

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {MODULES.map((m, i) => (
            <Reveal key={m.n} delay={0.08 * i} className="h-full">
              <article
                className={`lpx-card lpx-card--hover lpx-spot lpx-module h-full${i === 1 ? " lpx-module--hl" : ""}`}
              >
                <div className="lpx-module-shot" aria-hidden>
                  <img src={m.img} alt="" loading="lazy" decoding="async" draggable={false} />
                </div>
                <div className="p-7">
                  <span className="lpx-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lpx-lime-hi)]">
                    Módulo {m.n}
                  </span>
                  <h3 className="mt-2 text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--lpx-text)]">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--lpx-muted)]">
                    {m.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
