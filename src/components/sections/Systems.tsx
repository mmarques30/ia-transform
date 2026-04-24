import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import {
  AtendimentoMockup,
  CopilotoMockup,
  BackofficeMockup,
  RelatorioMockup,
  AssistenteMockup,
  DashboardMockup,
} from "@/components/mockups/SystemMockups";

const SYSTEMS = [
  {
    tag: "Atendimento",
    title: "Triagem inteligente de tickets",
    text: "IA lê, classifica e sugere resposta. Atendente só revisa e envia.",
    Mockup: AtendimentoMockup,
  },
  {
    tag: "Backoffice",
    title: "Conciliação automática de NF",
    text: "Bate boletos, contratos e ERP. Só sobe pra humano o que diverge.",
    Mockup: BackofficeMockup,
  },
  {
    tag: "Comercial",
    title: "Copiloto de proposta",
    text: "Gera draft comercial a partir de briefing e histórico de ganhos.",
    Mockup: CopilotoMockup,
  },
  {
    tag: "Gestão",
    title: "Relatório executivo semanal",
    text: "Lê planilhas, CRM e e-mail e entrega 1 página pra diretoria.",
    Mockup: RelatorioMockup,
  },
  {
    tag: "Interno",
    title: "Assistente de políticas",
    text: "Responde dúvidas do time com base em docs internos, com fonte.",
    Mockup: AssistenteMockup,
  },
  {
    tag: "Dados",
    title: "Dashboard operacional em linguagem natural",
    text: "Pergunta em português, recebe gráfico e insight acionável.",
    Mockup: DashboardMockup,
  },
];

export function Systems() {
  return (
    <section
      id="sistemas"
      className="py-[100px] lg:py-[140px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-[1100px]">
          <div className="max-w-[620px]">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Sistemas que construímos
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
                Não vendemos slides.
                <br />
                <em>Entregamos coisa rodando.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-[16px] text-sage leading-[1.55] max-w-[360px]">
              Seis exemplos reais de sistemas que saíram do diagnóstico pra operação. Cada um
              construído em 4 a 12 semanas.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <article
                className="group rounded-xl border border-border bg-card overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="aspect-[16/10] relative overflow-hidden border-b border-border"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <s.Mockup />
                </div>
                <div className="p-6 flex flex-col grow">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-primary font-semibold">
                    {s.tag}
                  </p>
                  <h3 className="mt-2 text-[18px] font-semibold text-foreground leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-sage leading-[1.55]">{s.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href="#cta-final"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero construir um desses pra minha operação
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
