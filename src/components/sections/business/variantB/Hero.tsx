import { Reveal } from "@/components/Reveal";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { HeroForm } from "@/components/HeroForm";

/**
 * Hero (LP-B) — versão com form inline no lugar do mockup.
 *
 * A dobra hero agora traz o HeroForm creme no lado direito (mesmo
 * componente da /businessv2/diagnostico e do FinalForm no fim da LP —
 * os leads caem no mesmo funil business no CRM). Assim o visitante
 * pode converter sem clicar no CTA da modal, com o form já visível
 * na primeira dobra.
 *
 * Título com tratamento editorial: linhas "sans extrabold" alternando
 * com "Instrument Serif italic" nas partes destacadas em lime — mesma
 * cadência da hero da / (LP-A), pra a página de biz sênior ler como
 * material editorial e não como landing pop.
 *
 * Grade travada via CSS (.hero-b): container 1280 max, padding 80/48,
 * 45/55, gap 56, section com min-height 100vh - 48 (QualifierStrip)
 * pra preencher o fold sem next-section peek-through.
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
                <em className="hero-b-h1-em">crescer a empresa,</em>
                <br />
                não para <em className="hero-b-h1-em">apagar incêndio.</em>
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
                Construímos sistemas de IA sob medida que colocam seu time pra executar com padrão.
                Para você focar em fechar, não em resolver.
              </p>
            </Reveal>
          </div>

          <div className="hero-b-form-col">
            <Reveal delay={0.15}>
              <HeroForm formSlug="business" thankYouPath="/thank-you-business" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
