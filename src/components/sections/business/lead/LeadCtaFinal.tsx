import { Reveal } from "@/components/Reveal";

interface LeadCtaFinalProps {
  onOpenModal: () => void;
}

export function LeadCtaFinal({ onOpenModal }: LeadCtaFinalProps) {
  return (
    <section className="relative py-[100px] lg:py-[120px] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(200,224,64,0.06), transparent 70%)",
        }}
      />
      <div className="container-page relative text-center">
        <Reveal>
          <span
            className="text-[11px] uppercase tracking-[0.13em] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Acesso imediato
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-4 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.12] tracking-[-0.025em] text-foreground max-w-[620px] mx-auto"
            style={{ textWrap: "balance" }}
          >
            O kit que levei meses testando.
            <br />
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
