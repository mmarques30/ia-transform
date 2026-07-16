import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";

/**
 * FinalForm (LP-A) — dobra de conversão embedded no fim da LP.
 *
 * Reusa o mesmo HeroForm (formSlug=business) que o hero da / e da
 * /businessv2 — leads caem no mesmo funil no CRM.
 *
 * Copy adaptada pro ângulo LP-A: "primeiro passo para recuperar o
 * controle". Mantém "chama agora no WhatsApp" (decisão anterior) e
 * disclaimer "sem compromisso, 100% confidencial".
 */
export function FinalForm() {
  return (
    <section
      id="form-final"
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
              Preencha agora
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-4 font-extrabold text-[30px] sm:text-[40px] lg:text-[52px] leading-[1.03] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Primeiro passo para{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                recuperar o controle.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[15.5px] lg:text-[17px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Preencha abaixo. Um sócio da IAplicada te chama{" "}
              <strong className="text-foreground font-semibold">agora</strong> no WhatsApp pra
              agendar seu diagnóstico gratuito.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 max-w-[560px] mx-auto">
            <HeroForm formSlug="business" thankYouPath="/thank-you-business" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-[12px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
            Sem compromisso.{" "}
            <span style={{ color: "var(--color-primary)" }}>100% confidencial.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
