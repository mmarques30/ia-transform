import { Reveal } from "@/components/Reveal";

const MODULES = [
  {
    n: "01",
    title: "Prompts de IA para Operacao",
    desc: "Prompts prontos e calibrados para atendimento ao cliente, analise financeira rapida e aceleracao de vendas. Copie, ajuste e use hoje.",
  },
  {
    n: "02",
    title: "Automacoes Prontas",
    desc: "Fluxos completos para n8n, Make e Zapier que eliminam tarefas manuais repetitivas. Importe direto, sem precisar construir do zero.",
  },
  {
    n: "03",
    title: "Agentes de IA Configurados",
    desc: "Exemplos reais de agentes rodando em operacoes — com contexto de como foram configurados e o que cada um resolve.",
  },
];

export function LeadKitContent() {
  return (
    <section className="section-veil py-[80px] lg:py-[110px]">
      <div className="container-page">
        <Reveal>
          <span
            className="text-[11px] uppercase tracking-[0.13em] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            O que esta dentro
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-4 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.12] tracking-[-0.025em] text-foreground"
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
        </Reveal>

        <Reveal delay={0.08}>
          <p
            className="mt-5 text-[15.5px] lg:text-[16px] leading-[1.8] max-w-[640px]"
            style={{ color: "var(--text-sage, #c4c8bc)" }}
          >
            Cada modulo foi construido a partir de implementacoes reais. Nao e conteudo
            teorico — e o que ja esta funcionando em empresas como a sua.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-14 grid md:grid-cols-3 gap-[2px]">
          {MODULES.map((mod, i) => (
            <Reveal key={mod.n} delay={0.12 + i * 0.08}>
              <div
                className="p-8 lg:p-9 h-full flex flex-col"
                style={{
                  background: "#141613",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  className="text-[52px] font-black leading-none"
                  style={{ color: "rgba(139,155,58,0.12)" }}
                >
                  {mod.n}
                </span>
                <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-foreground">
                  {mod.title}
                </h3>
                <p
                  className="mt-3 text-[14px] leading-[1.7]"
                  style={{ color: "var(--text-muted, #8a8e82)" }}
                >
                  {mod.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
