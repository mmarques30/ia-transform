import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { useDiagnosticoModal } from "@/components/sections/business/variantB/DiagnosticoModal";

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
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                90 dias.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16.5px] text-sage leading-[1.6] max-w-[640px] mx-auto">
              O Método <strong className="text-foreground font-bold">APLICA</strong> identifica onde
              sua operação sangra, constrói o sistema que para o sangramento e implementa dentro do
              seu negócio — em 90 dias, com marcos semanais, sem depender de você para funcionar.
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

        <Reveal delay={0.35}>
          <MetodoCta />
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

function MetodoCta() {
  const modal = useDiagnosticoModal();
  return (
    <div className="mt-10 lg:mt-12 text-center">
      <OriginButton onClick={modal?.openModal}>
        quero meu diagnóstico
      </OriginButton>
    </div>
  );
}
