import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * Urgency (LP-B) — banda de escassez ("4 slots/semana").
 *
 * Fundo vermelho glow (radial suave) + h2 uppercase + copy justificando
 * a escassez (sócio faz o diagnóstico, não é delegado) + CTA glow. Fecha
 * o ciclo antes do manifesto editorial e do form.
 */
export function Urgency() {
  return (
    <section
      id="urgencia"
      className="relative"
      style={{
        background:
          "radial-gradient(80% 100% at 50% 0%, rgba(239, 68, 68, 0.12), transparent 60%), #0f1109",
        borderTop: "1px solid rgba(239, 68, 68, 0.3)",
        borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
      }}
    >
      <div className="container-page py-[60px] lg:py-[80px] text-center">
        <Reveal>
          <h2
            className="font-extrabold uppercase text-[24px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-[-0.02em] max-w-[780px] mx-auto text-foreground"
            style={{ textWrap: "balance" }}
          >
            A IAplicada abre <span style={{ color: "#ef4444" }}>apenas 4 slots</span> de diagnóstico
            por semana
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 text-[14.5px] lg:text-[15px] text-sage leading-[1.55] max-w-[540px] mx-auto">
            O diagnóstico é feito por um sócio do time — não delegamos. Por isso o funil é
            controlado. Se as vagas do ciclo acabam, você entra na próxima semana.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8">
            <CtaGlow size="lg">Garantir meu diagnóstico</CtaGlow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
