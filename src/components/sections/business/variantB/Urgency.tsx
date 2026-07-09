import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * Urgency (LP-B) — banda de escassez ("vagas abertas agora").
 *
 * Fundo vermelho glow (radial suave) + h2 forte + copy justificando a
 * escassez (Mari faz o diagnóstico individualmente) + contador de
 * vagas disponíveis no mês corrente + CTA glow. Fecha o ciclo antes
 * do manifesto editorial e do form.
 *
 * Nota: o contador "N vagas em <mês>" é hard-coded — atualizar
 * manualmente conforme o mês/ciclo real. Se em algum momento passarmos
 * a puxar do CRM, viraria prop.
 */
const OPEN_SLOTS = 4;
const MONTH_LABEL = "julho";

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
            className="font-extrabold uppercase text-[28px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.02em] max-w-[780px] mx-auto text-foreground"
            style={{ textWrap: "balance" }}
          >
            Vagas <span style={{ color: "#ef4444" }}>abertas agora.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.55] max-w-[560px] mx-auto">
            Cada diagnóstico é feito{" "}
            <strong className="text-foreground font-bold">por mim, individualmente</strong>. Por
            isso só aceito{" "}
            <strong className="text-foreground font-bold">
              {OPEN_SLOTS} novas empresas por mês
            </strong>
            .
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 inline-flex items-baseline gap-3">
            <span
              className="text-[54px] sm:text-[64px] lg:text-[72px] font-black leading-none tabular-nums"
              style={{
                color: "#ef4444",
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
              }}
            >
              {OPEN_SLOTS}
            </span>
            <span
              className="text-[11px] lg:text-[12px] uppercase tracking-[0.2em] font-bold text-sage"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace' }}
            >
              vagas disponíveis
              <br />
              em {MONTH_LABEL}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8">
            <CtaGlow size="lg">Garantir minha vaga →</CtaGlow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
