import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroForm } from "@/components/HeroForm";
import { BgDobra } from "@/components/BgDobra";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";

/**
 * /businessv2/diagnostico — página dedicada do formulário LP-B.
 *
 * Destino de TODOS os CTAs "Quero o diagnóstico" da /businessv2. Motivo
 * de existir em rota separada em vez de modal:
 *  - cada preenchimento vira URL trackável (view /diagnostico → conversão)
 *  - o form fica em contexto próprio, sem competir com as seções da LP
 *  - permite pixel + Clarity + Ads segmentarem "intent alto" separado
 *  - o form é o mesmo HeroForm do site — só troca de contexto de tela
 *
 * `formSlug` continua "business" (mesmo funil no CRM), mas
 * `thankYouPath` continua no /thank-you-business (post-submit unificado).
 */
export const Route = createFileRoute("/businessv2/diagnostico")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Solicitar diagnóstico",
      },
      {
        name: "description",
        content:
          "Preencha os dados pra receber o diagnóstico da sua operação. Um sócio da IAplicada revisa e chama por WhatsApp em até 24h úteis.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: DiagnosticoPage,
});

function DiagnosticoPage() {
  return (
    <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
      <QualifierStrip />
      <BgDobra intensity="alta">
        <section className="relative py-[64px] lg:py-[100px]">
          <div className="container-page relative">
            <div className="max-w-[720px] mx-auto text-center">
              <Reveal>
                <Link
                  to="/businessv2"
                  className="inline-flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <LogoMark size={22} />
                  <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-foreground">
                    IAplicada · Business
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="h-mix mt-8 text-[28px] sm:text-[38px] lg:text-[46px] leading-[1.05] text-foreground">
                  Primeiro passo para <em>sair do operacional.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 text-[15.5px] lg:text-[16px] text-sage leading-[1.6] max-w-[520px] mx-auto">
                  Preencha abaixo. Nosso time entra em contato em até{" "}
                  <strong className="text-foreground font-semibold">24h</strong> para agendar seu
                  diagnóstico gratuito com a Mari.
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

            <Reveal delay={0.25}>
              <p className="mt-8 text-center text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground opacity-60">
                GRUPO <span style={{ color: "var(--color-primary)" }}>IAPLICADA</span> · MÉTODO
                APLICA · 2026
              </p>
            </Reveal>
          </div>
        </section>
      </BgDobra>
    </main>
  );
}
