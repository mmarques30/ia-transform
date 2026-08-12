import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";

interface LeadCtaFinalProps {
  onOpenModal: () => void;
}

export function LeadCtaFinal({ onOpenModal }: LeadCtaFinalProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 0%, rgba(200,224,64,0.14), transparent 65%), linear-gradient(180deg, #0a0c07 0%, #0f1109 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block"
        style={{
          top: "5%",
          right: "-10%",
          width: "50%",
          height: "80%",
          background: "radial-gradient(ellipse at center, rgba(200,224,64,0.16), transparent 60%)",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block"
        style={{
          top: "20%",
          left: "-10%",
          width: "40%",
          height: "60%",
          background: "radial-gradient(ellipse at center, rgba(60,80,30,0.3), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-page relative py-[80px] lg:py-[120px]">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <p
              className="text-[11px] lg:text-[12px] uppercase tracking-[0.22em] font-bold"
              style={{
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Acesso imediato
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-4 font-extrabold text-[30px] sm:text-[40px] lg:text-[52px] leading-[1.03] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              O kit que levei meses testando.{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                Para você em minutos.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              className="mt-6 font-black text-[64px] sm:text-[72px] leading-none tracking-[-0.04em]"
              style={{ color: "var(--color-primary)" }}
            >
              R$ 0
            </p>
            <p
              className="mt-2.5 text-[12px] uppercase tracking-[0.06em]"
              style={{ color: "var(--text-muted, #8a8e82)" }}
            >
              Gratuito &#10038; Acesso imediato
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10">
              <OriginButton onClick={onOpenModal}>
                Quero o kit completo &rarr;
              </OriginButton>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
