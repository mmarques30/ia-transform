import { Reveal } from "@/components/Reveal";

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
                Para voce em minutos.
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
              Gratuito &#10038; Acesso imediato &#10038; Sem cartao
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10">
              <button
                type="button"
                onClick={onOpenModal}
                className="cta-glow-btn inline-flex items-center justify-center gap-2.5 px-7 py-5 rounded-[10px] font-black text-[13.5px] lg:text-[14.5px] uppercase tracking-[0.06em] no-underline"
                style={{
                  background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                  color: "#0a0c07",
                  boxShadow:
                    "0 0 0 6px rgba(200,224,64,0.15), 0 24px 48px -14px rgba(200,224,64,0.5), inset 0 -2px 0 rgba(0,0,0,0.2)",
                }}
              >
                Quero o kit completo &rarr;
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-[12px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
              Sem compromisso.{" "}
              <span style={{ color: "var(--color-primary)" }}>100% confidencial.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
