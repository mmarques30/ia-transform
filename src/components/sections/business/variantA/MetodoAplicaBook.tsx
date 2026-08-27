import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { PainelClientesShowcase } from "@/components/sections/business/variantB/painel/PainelClientesShowcase";

interface CompareCard {
  eyebrow: string;
  title: string;
  detail: string;
  highlight?: boolean;
}

const CARDS: CompareCard[] = [
  {
    eyebrow: "ERP",
    title: "Feito pra padronizar",
    detail: "Foi projetado para operações padrão. A sua não é.",
  },
  {
    eyebrow: "Consultoria",
    title: "Entrega diagnóstico",
    detail: "Você ainda precisa implementar. O slide não roda sozinho.",
  },
  {
    eyebrow: "IAplicada",
    title: "Software com IA que roda",
    detail: "Na sua operação, do jeito que ela funciona. Construído, implementado e funcionando.",
    highlight: true,
  },
];

export function MetodoAplicaBook() {
  return (
    <section
      id="metodo-aplica"
      className="py-[80px] lg:py-[120px] relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0f07 0%, #111408 50%, #0c0f07 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 40%, rgba(200,224,64,0.05), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <span
              className="inline-block px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold"
              style={{
                border: "1px solid rgba(200,224,64,0.4)",
                background: "rgba(200,224,64,0.06)",
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Como a gente faz
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Um diagnóstico. Um sistema.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                30 dias para o primeiro resultado.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16.5px] text-sage leading-[1.6] max-w-[640px] mx-auto">
              O Método <strong className="text-foreground font-bold">APLICA</strong> identifica onde
              sua operação trava, constrói o sistema que resolve e implementa dentro do seu negócio.
              Sem ERP engessado. Sem consultoria que some depois da apresentação.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-5 lg:gap-6 max-w-[1000px] mx-auto">
          {CARDS.map((card, i) => (
            <Reveal key={card.eyebrow} delay={0.1 + i * 0.08}>
              <CompareCardComponent card={card} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 max-w-[820px] mx-auto text-center">
          <Reveal delay={0.3}>
            <h3
              className="font-extrabold text-[24px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-[-0.02em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Sua operação roda. Seu time entrega.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Você acompanha tudo sem estar no meio de tudo.
              </span>
            </h3>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="mt-10 max-w-[720px] mx-auto">
            <PainelClientesShowcase />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <OriginButton onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}>
              quero meu sistema
            </OriginButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompareCardComponent({ card }: { card: CompareCard }) {
  return (
    <div
      className="rounded-[16px] px-6 py-7 lg:px-7 lg:py-8 h-full flex flex-col"
      style={{
        background: card.highlight
          ? "linear-gradient(160deg, rgba(200,224,64,0.12) 0%, rgba(200,224,64,0.04) 100%)"
          : "rgba(255,255,255,0.03)",
        border: card.highlight
          ? "1.5px solid rgba(200,224,64,0.4)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.2em] font-bold"
        style={{
          color: card.highlight ? "var(--color-primary)" : "rgba(255,255,255,0.4)",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {card.eyebrow}
      </span>
      <h3
        className="mt-3 text-[18px] lg:text-[20px] font-extrabold leading-[1.15] tracking-[-0.01em]"
        style={{ color: card.highlight ? "var(--color-primary)" : "var(--color-foreground)" }}
      >
        {card.title}
      </h3>
      <p className="mt-3 text-[13.5px] lg:text-[14.5px] text-sage leading-[1.55]">{card.detail}</p>
    </div>
  );
}
