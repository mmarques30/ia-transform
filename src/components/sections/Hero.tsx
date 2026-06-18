import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";

interface HeroProps {
  formSlug?: string;
  thankYouPath?: string;
}

/**
 * Hero da LP / (Business) — versão academy theme (cream + Fraunces).
 *
 * Layout 2-col, sem decoração WebGL/glow. Copy idêntica à versão
 * anterior dark — só visual mudou. Form (HeroForm) mantém fields,
 * validação, submit, redirect — só ganha tratamento light no card.
 *
 * As outras LPs (/contabil, /contabil02, /contabilcalculo,
 * /indicacaobusiness) continuam usando seus respectivos Heroes dark.
 */
export function Hero({ formSlug, thankYouPath }: HeroProps = {}) {
  return (
    <section id="top" className="bg-hero-canvas relative overflow-hidden">
      <HeroDecoration />

      <div className="h-[72px]" aria-hidden />

      <div className="relative z-10 pt-[48px] lg:pt-[88px] pb-[96px] lg:pb-[140px] px-6">
        <div className="container-wide-academy">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <Reveal>
                <span className="eyebrow">IAplicada · Business</span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="h-hero mt-7">
                  Sua empresa
                  <br />
                  inteira em
                  <br />
                  <span className="serif-italic text-accent-mark">um lugar só</span>,
                  <br />
                  em até 8 semanas.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="lede mt-8" style={{ fontWeight: 500 }}>
                  Sem refém da planilha. Você acompanha, seu time opera.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p
                  className="hidden lg:block mt-5 text-[15px] leading-[1.6]"
                  style={{ color: "var(--academy-cocoa-soft)", maxWidth: "46ch" }}
                >
                  A gente integra os fluxos da sua operação com IA aplicada. É o fim das
                  ferramentas soltas.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ClientsProof />
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div
                id="diagnostico-form"
                className="lg:sticky lg:top-24 scroll-mt-24"
              >
                <HeroForm formSlug={formSlug} thankYouPath={thankYouPath} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Decoração de entrada do Hero — glow radial na cor da brand (verde)
 * + logo icon-only opaca, ambos posicionados à direita, atrás do
 * conteúdo. Animação CSS (fade + scale/slide) entra no mount,
 * referência: minimalist-hero do 21st.dev mas com cor da marca.
 *
 * Sem framer-motion no entry chunk — animação pura CSS pra não
 * regredir o INP.
 */
function HeroDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="hero-decor-glow absolute"
        style={{
          right: "-12%",
          top: "4%",
          width: "min(900px, 70vw)",
          aspectRatio: "1 / 1",
          backgroundImage:
            "radial-gradient(circle at center, var(--academy-brand) 0%, transparent 70%)",
          mixBlendMode: "multiply",
        }}
      />
      <img
        src="/brand/logo-mark.svg"
        alt=""
        className="hero-decor-mark absolute"
        style={{
          right: "4%",
          top: "32%",
          width: "min(460px, 40vw)",
          height: "auto",
        }}
      />
    </div>
  );
}

const PROOF_THUMBS = [
  { src: "/clients/people/person-1.webp", alt: "" },
  { src: "/clients/people/person-5.webp", alt: "" },
  { src: "/clients/people/person-2.webp", alt: "" },
  { src: "/clients/people/person-3.webp", alt: "" },
  { src: "/clients/people/person-4.webp", alt: "" },
];

function ClientsProof() {
  const SIZE = 40;
  return (
    <div className="mt-10 flex items-center gap-4">
      <div className="flex" aria-hidden>
        {PROOF_THUMBS.map((t, i) => (
          <img
            key={t.src}
            src={t.src}
            alt={t.alt}
            width={SIZE}
            height={SIZE}
            loading="lazy"
            decoding="async"
            className="rounded-full object-cover"
            style={{
              width: SIZE,
              height: SIZE,
              marginLeft: i === 0 ? 0 : -12,
              border: "2px solid var(--academy-cream)",
              boxShadow: "0 2px 6px -2px rgba(13, 13, 13, 0.2)",
              zIndex: PROOF_THUMBS.length - i,
              filter: "saturate(0.95) contrast(1.02) sepia(0.04)",
            }}
          />
        ))}
      </div>
      <p
        className="text-[14px] font-semibold leading-tight"
        style={{ color: "var(--academy-cocoa)" }}
      >
        +80 empresas saindo da operação manual.
      </p>
    </div>
  );
}
