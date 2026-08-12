import { Reveal } from "@/components/Reveal";

interface DeliverableItem {
  n: string;
  title: string;
  detail: string;
}

const KIT_ITEMS: DeliverableItem[] = [
  {
    n: "01",
    title: "Prompts de IA para Operacao",
    detail:
      "Prompts prontos e calibrados para atendimento ao cliente, analise financeira rapida e aceleracao de vendas. Copie, ajuste e use hoje.",
  },
  {
    n: "02",
    title: "Automacoes Prontas",
    detail:
      "Fluxos completos para n8n, Make e Zapier que eliminam tarefas manuais repetitivas. Importe direto, sem precisar construir do zero.",
  },
  {
    n: "03",
    title: "Agentes de IA Configurados",
    detail:
      "Exemplos reais de agentes rodando em operacoes — com contexto de como foram configurados e o que cada um resolve.",
  },
];

export function LeadKitContent() {
  return (
    <section className="relative section-veil py-[80px] lg:py-[110px] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 80% at 70% 50%, rgba(200,224,64,0.08), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1080px] mx-auto">
          <Reveal>
            <div>
              <span
                className="inline-block px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold"
                style={{
                  border: "1px solid rgba(200,224,64,0.4)",
                  background: "rgba(200,224,64,0.06)",
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                O que esta dentro
              </span>
              <h2
                className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Tres modulos.{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  Resultado na semana.
                </em>
              </h2>
              <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                Cada modulo foi construido a partir de implementacoes reais. Nao e conteudo
                teorico — e o que ja esta funcionando em empresas como a sua.
              </p>
              <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                Sem teoria. Sem enrolacao.{" "}
                <strong className="text-foreground font-bold">
                  O que ja funciona, pronto pra aplicar.
                </strong>
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p
                className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Voce leva
              </p>
            </Reveal>
            <ul className="guarantee-list">
              {KIT_ITEMS.map((item, i) => (
                <Reveal key={item.n} delay={0.05 + i * 0.12}>
                  <DeliverableRow item={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverableRow({ item }: { item: DeliverableItem }) {
  return (
    <li className="guarantee-item">
      <span className="guarantee-item__n">{item.n}</span>
      <div className="guarantee-item__body">
        <h3 className="guarantee-item__title">{item.title}</h3>
        <p className="guarantee-item__detail">{item.detail}</p>
      </div>
    </li>
  );
}
