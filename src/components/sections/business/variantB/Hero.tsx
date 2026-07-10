import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { PainelVetra } from "@/components/sections/business/variantB/painel/PainelVetra";
import { PainelScaler } from "@/components/sections/business/variantB/painel/PainelScaler";

/**
 * Hero (LP-B) — ajuste final da estrutura.
 *
 * Grade via CSS (.hero-b) — max-width 1280, padding 80/48, 45%/55%,
 * gap 56. Coluna esquerda com 4 elementos apenas (logo, h1, sub,
 * parágrafo, CTA) — eyebrow "IAplicada · Sistemas de IA sob medida"
 * removido (o logo já identifica a marca).
 *
 * Headline com 3 linhas fixas via <br> + `white-space: nowrap`, solta
 * em <=1100px. Clamp da fonte calibrado (30/2.8vw/40) pra "não para
 * apagar incêndio." caber na col de ~508px sem overflow.
 *
 * Mockup: PainelVetra dentro de PainelScaler dentro de .hero-mockup-b
 * com width calc(100% + 40px) (sangramento discreto pra direita) e
 * teto de max-width 780. Rotate 3D suavizado: -6deg Y / 1.5deg X.
 */

export function Hero() {
  return (
    <>
      <QualifierStrip />
      <section id="top" className="hero-section-b">
        <div className="hero-b">
          <div className="hero-b-text">
            <Reveal>
              <img
                src="/brand/iaplicada-logo-dark.png"
                alt="IAplicada"
                height={28}
                className="hero-b-logo"
              />
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="hero-b-h1">
                Você foi feito para
                <br />
                <span style={{ color: "var(--color-primary)" }}>crescer a empresa,</span>
                <br />
                não para <span style={{ color: "var(--color-primary)" }}>apagar incêndio.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="hero-b-sub">
                Em <em style={{ color: "var(--color-primary)" }}>90 dias</em> a gente te tira do
                operacional.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="hero-b-p">
                Construímos sistemas de IA sob medida que colocam seu time pra executar com padrão —
                para você focar em fechar, não em resolver.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="hero-b-cta">
                <CtaGlow shape="pill" size="xl">
                  Quero sair do operacional →
                </CtaGlow>
              </div>
            </Reveal>
          </div>

          <div className="hero-b-mockup-col">
            <Reveal delay={0.15}>
              <div className="hero-mockup-b">
                <PainelScaler>
                  <PainelVetra />
                </PainelScaler>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
