import { Reveal } from "@/components/Reveal";

interface LeadHeroProps {
  onOpenModal: () => void;
}

export function LeadHero({ onOpenModal }: LeadHeroProps) {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroGlow />
        <div className="container-page relative z-10 py-[120px] lg:py-[140px]">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <span
                  className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.13em]"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span
                    className="inline-block w-6 h-px"
                    style={{ background: "var(--color-primary)" }}
                  />
                  Kit gratuito &#10038; Acesso imediato
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1
                  className="mt-7 font-extrabold text-[36px] sm:text-[46px] lg:text-[58px] leading-[1.08] tracking-[-0.03em] text-foreground"
                  style={{ textWrap: "balance" }}
                >
                  Automatize
                  <br />
                  <em
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      color: "var(--color-primary)",
                      fontWeight: 500,
                    }}
                  >
                    o que trava
                  </em>
                  <br />
                  sua operacao.
                  <br />
                  <em
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      color: "var(--color-primary)",
                      fontWeight: 500,
                    }}
                  >
                    Sem contratar ninguem.
                  </em>
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-[16px] lg:text-[17px] leading-[1.75] max-w-[500px]" style={{ color: "var(--text-sage, #a3a898)" }}>
                  Prompts, automacoes e agentes de IA prontos para usar na sua empresa
                  — testados em operacoes reais, nao em teoria.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="mt-8 flex flex-col gap-3.5">
                  {[
                    "Prompts calibrados para processos reais de empresa",
                    "Fluxos prontos para n8n, Make e Zapier — copiar e usar",
                    "Sem precisar de equipe de TI ou saber programar",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14.5px] lg:text-[15px]" style={{ color: "var(--text-sage, #c4c8bc)" }}>
                      <span
                        className="shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--color-primary)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="cta-glow-btn inline-flex items-center gap-2.5 px-8 py-[18px] font-black text-[13px] uppercase tracking-[0.08em] rounded-[10px]"
                    style={{
                      background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                      color: "#0a0c07",
                      boxShadow:
                        "0 0 0 6px rgba(200,224,64,0.15), 0 24px 48px -14px rgba(200,224,64,0.5), inset 0 -2px 0 rgba(0,0,0,0.2)",
                    }}
                  >
                    Quero o kit completo
                    <span className="text-[16px]">&rarr;</span>
                  </button>
                  <p
                    className="mt-3.5 text-[12px] tracking-[0.04em]"
                    style={{ color: "var(--text-muted, #8a8e82)" }}
                  >
                    Gratuito &#10038; Acesso imediato &#10038; Sem cartao de credito
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <KitPreviewCard />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

const KIT_MODULES = [
  { n: "01", title: "Prompts de IA para Operacao", desc: "Atendimento, financeiro e vendas" },
  { n: "02", title: "Automacoes Prontas", desc: "Fluxos no-code para n8n e Make" },
  { n: "03", title: "Agentes de IA Configurados", desc: "Exemplos rodando em empresas reais" },
];

function KitPreviewCard() {
  return (
    <div
      className="relative rounded-none lg:rounded-none overflow-hidden"
      style={{
        background: "#141613",
        border: "1px solid rgba(139,155,58,0.18)",
      }}
    >
      <div className="p-7 lg:p-8">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.14em] block mb-5"
          style={{ color: "var(--color-primary)" }}
        >
          O que esta dentro
        </span>
        <h3 className="text-[18px] font-bold tracking-[-0.02em] text-foreground">
          Kit de Automacao com IA
        </h3>
        <p className="mt-1.5 text-[12px]" style={{ color: "var(--text-muted, #8a8e82)" }}>
          3 modulos prontos para implementar
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          {KIT_MODULES.map((m) => (
            <div
              key={m.n}
              className="flex items-start gap-3.5 p-3.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="shrink-0 text-[10px] font-bold tracking-[0.1em] pt-0.5"
                style={{ color: "var(--color-primary)" }}
              >
                {m.n}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{m.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted, #8a8e82)" }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <span
            className="inline-block px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{
              background: "rgba(139,155,58,0.1)",
              border: "1px solid rgba(139,155,58,0.3)",
              color: "var(--color-primary)",
            }}
          >
            R$ 0 — Acesso imediato
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 55%, rgba(139,155,58,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(139,155,58,0.04) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
