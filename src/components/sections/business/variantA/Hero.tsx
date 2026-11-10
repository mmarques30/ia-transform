import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

/**
 * Hero da LP Business.
 *
 * Fundo em camadas: grade fina, brilho lime e um "portal" (anéis + o
 * símbolo da IAplicada girando devagar) entre o texto e o formulário.
 * Coluna de texto enxuta (rótulo, título, descrição, prova social),
 * centralizada na altura do formulário à direita.
 *
 * Título e subtítulo podem vir da rota (variantes); o resto é do idioma.
 */

interface HeroProps {
  /** H1 alternativo (variantes). Default: copy da /. */
  title?: React.ReactNode;
  /** Sub-headline alternativa. Default: copy da /. */
  subtitle?: React.ReactNode;
  /** Slug fixo da rota enviado como `landing_page` no lead. */
  landingPage?: string;
}

const DEFAULT_TITLE = (
  <>
    <span className="hero-b-h1-sans">Faça o dobro.</span>
    <br />
    <em className="hero-b-h1-em">Entregue em metade do tempo.</em>
    <br />
    <span className="hero-b-h1-sans">Com o time que você já tem.</span>
  </>
);

const DEFAULT_SUBTITLE = (
  <>
    Em até <em>90 dias</em>, o software com IA que automatiza sua operação, sob medida para o jeito
    que seu negócio funciona. Sem ERP engessado. Sem consultoria que some.
  </>
);

interface HeroCopy {
  trustStrong: string;
  trust: string;
}

const HERO_PT: HeroCopy = {
  trustStrong: "+50 empresas",
  trust: "já operam com sistemas da IAplicada",
};

const COPY: LpCopy<HeroCopy> = {
  "pt-br": HERO_PT,
  en: {
    trustStrong: "50+ companies",
    trust: "already run IAplicada systems",
  },
};

/** Fotos reais dos clientes dos depoimentos. */
const CLIENT_FACES = [
  "/clients/mariana-quadra.png",
  "/clients/patricia.jpg",
  "/clients/carlos-prado.jpg",
  "/clients/karen.jpg",
  "/clients/bruno-lcr.jpg",
];

export function Hero({ title, subtitle, landingPage }: HeroProps = {}) {
  const c = useLpCopy(COPY);

  return (
    <section id="top" className="lpx-hero">
      <div className="lpx-grid" aria-hidden />
      <HeroPortal />

      <div className="lpx-wrap">
        <div className="lpx-hero-grid">
          <div className="min-w-0 max-w-[580px]">
            <Reveal delay={0.05}>
              <h1 className="lpx-h1">{title ?? DEFAULT_TITLE}</h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="lpx-hero-sub">{subtitle ?? DEFAULT_SUBTITLE}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-4">
                <div className="lpx-avatars shrink-0" aria-hidden>
                  {CLIENT_FACES.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                  ))}
                </div>
                <p className="text-[13.5px] leading-snug text-[var(--lpx-muted)]">
                  <strong className="font-semibold text-[var(--lpx-text)]">{c.trustStrong}</strong>{" "}
                  {c.trust}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="hero-b-form-col">
            <Reveal delay={0.12}>
              {/* Slug do form e página de obrigado vêm do idioma da LP
                  (business + /thank-you-business no Brasil). */}
              <HeroForm landingPage={landingPage} compact variant="dark" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Anéis concêntricos com o símbolo da IAplicada e uma órbita girando. */
function HeroPortal() {
  return (
    <div className="lpx-portal" aria-hidden>
      <div className="lpx-portal-ring" />
      <div className="lpx-portal-ring" />
      <div className="lpx-portal-ring" />
      <div className="lpx-portal-core" />
      <img className="lpx-portal-logo" src="/brand/logo-petals.png" alt="" decoding="async" />
      <div className="lpx-portal-spin">
        <div className="lpx-portal-orbit" />
      </div>
    </div>
  );
}
