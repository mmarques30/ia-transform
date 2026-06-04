import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

/**
 * Dor + Resposta — padrão visual da /contabil (label-chip + h-mix
 * centralizado + 3 tech-cards com num-display + gradient line). Substitui
 * o layout assimétrico anterior que ficou infantil.
 *
 * Estrutura:
 *   1. Header centralizado (chip · h2 · sub)
 *   2. Grid 3-col com tech-cards numerados (a sequência da dor)
 *   3. Resposta como bloco final centralizado
 */
const SEQUENCIA = [
  {
    n: "01",
    title: "Você fecha 4 clientes novos",
    text: "Volume sobe. O escritório precisa entregar no mesmo prazo, com o mesmo padrão.",
  },
  {
    n: "02",
    title: "Contrata 2 auxiliares",
    text: "Folha cresce junto. Onboarding consome semanas de sêniores que deveriam estar entregando.",
  },
  {
    n: "03",
    title: "A margem some",
    text: "Mais demanda, mais custo, mesma operação manual. O escritório cresce sem virar lucro.",
  },
];

export function DorResposta() {
  return (
    <section className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        {/* Header centralizado — padrão /contabil */}
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O cenário do escritório
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.05] text-foreground">
              Crescer sem escalar margem <em>tem um nome</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] lg:text-[17px] text-sage leading-[1.6] max-w-[620px] mx-auto">
              O problema não é vender mais clientes. É que a operação contábil ainda escala
              proporcional à contratação.
            </p>
          </Reveal>
        </div>

        {/* 3 tech-cards numerados */}
        <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-4 lg:gap-5 max-w-[1100px] mx-auto">
          {SEQUENCIA.map((step, i) => (
            <Reveal key={step.n} delay={0.08 + i * 0.06}>
              <TiltCard className="tech-card p-6 lg:p-7 h-full" maxTilt={6}>
                <div className="flex items-center gap-3">
                  <span
                    className="num-display text-[13px] tracking-wider"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {step.n}
                  </span>
                  <span
                    className="h-[1px] flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-primary), transparent)",
                    }}
                  />
                </div>
                <h3 className="mt-4 text-[17px] lg:text-[19px] font-bold tracking-tight text-foreground leading-[1.25]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[14px] text-sage leading-[1.55]">{step.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Bloco de resposta — centralizado, padrão /contabil */}
        <Reveal delay={0.32}>
          <div className="mt-16 lg:mt-20 max-w-[760px] mx-auto text-center">
            <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground mb-4">
              A virada
            </p>
            <p className="text-[18px] lg:text-[22px] leading-[1.45] text-foreground tracking-[-0.005em]">
              A IA <em className="text-primary">não substitui</em> contador. Assume o pedaço
              operacional que tomava o tempo da equipe pra ela voltar ao que paga melhor:{" "}
              <span className="font-semibold">consultoria, planejamento</span> e{" "}
              <span className="font-semibold">relação com cliente</span>.
            </p>
            <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.6]">
              Em <span className="font-bold text-foreground">7 dias</span>, primeira rotina
              automatizada em produção. Em{" "}
              <span className="font-bold text-foreground">8 semanas</span>, time autônomo. Sem
              trocar de sistema, sem depender de TI.
            </p>

            <a
              href="#calculadora"
              className="mt-9 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-primary)" }}
            >
              Quanto isso vale pra você
              <span aria-hidden>↓</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
