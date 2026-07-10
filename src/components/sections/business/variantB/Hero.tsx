import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { PainelVetra } from "@/components/sections/business/variantB/painel/PainelVetra";
import { PainelScaler } from "@/components/sections/business/variantB/painel/PainelScaler";

/**
 * Hero (LP-B) — refeito do zero com estrutura travada.
 *
 * Grade fixa via CSS (.hero-b) — max-width 1360, padding 96/48,
 * 5fr texto / 6fr mockup, gap 56. Sem margin/padding extra na
 * coluna de texto: começa exatamente no padding do container.
 *
 * Headline com 3 linhas fixas via <br> — cada segmento em uma linha,
 * `white-space: nowrap` no h1 impede o browser de recompor as
 * quebras em desktop. Solta em <=1100px.
 *
 * Mockup: PainelVetra dentro de PainelScaler dentro de .hero-mockup-b.
 * O wrapper tem width calc(100% + 6vw) pra sangrar até 6vw pra
 * direita, com teto absoluto 980px. Rotate 3D fica no CSS
 * (.hero-mockup-b .iap-device).
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

            <Reveal delay={0.03}>
              <p className="hero-b-eyebrow">IAplicada · Sistemas de IA sob medida</p>
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
                Construímos sistemas de IA sob medida que colocam seu time para executar com padrão.
                Você <strong className="text-foreground font-bold">sai do dia a dia</strong> e foca
                em fechar clientes, não em resolver problema interno.
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
