import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { FOUNDER } from "@/config/brand";
import { LogoMark } from "@/components/Logo";

export function Authority() {
  return (
    <section
      id="time"
      className="py-[100px] lg:py-[140px] relative overflow-hidden"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* diagonal grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.82 0.03 122 / 0.3) 1px, transparent 1px)",
          backgroundSize: "68px 100%",
          maskImage: "linear-gradient(90deg, transparent, black 30%, black 70%, transparent)",
          transform: "skewX(-18deg)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <LogoMark size={56} />
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                className="mt-8 text-[40px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.05] tracking-tight"
                style={{ color: "var(--color-primary)" }}
              >
                Sobre a IAplicada
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 space-y-3">
                <p className="inline-flex items-center gap-3 text-[16px] text-foreground">
                  <span
                    className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--color-olive)" }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  Aqui, tecnologia não é moda.
                </p>
                <p className="inline-flex items-center gap-3 text-[16px] text-foreground">
                  <span
                    className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--color-olive)" }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  É ferramenta estratégica.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 space-y-5 text-sage text-[16px] leading-[1.65] max-w-[520px]">
              <Reveal delay={0.15}>
                <p>
                  A IAplicada nasceu da experiência prática em operações complexas de empresas como{" "}
                  <span className="text-foreground font-semibold">
                    Mercado Livre, Suzano e AngloGold Ashanti
                  </span>
                  .
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Depois de anos lidando com rotinas, indicadores e gargalos em negócios líderes em
                  e-commerce, indústria e mineração, transformamos o que funciona lá fora em uma
                  plataforma acessível para a sua empresa.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.28}>
              <a href="#top" className="mt-10 cta-primary">
                Entender como funciona o diagnóstico
                <span className="arrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7H12M12 7L7 2M12 7L7 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <FounderCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FounderCard() {
  return (
    <div className="relative w-full aspect-[4/5] lg:aspect-[0.92]">
      <img
        src={FOUNDER.photoSrc}
        alt={FOUNDER.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top rounded-[24px]"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== FOUNDER.photoFallback) img.src = FOUNDER.photoFallback;
        }}
      />
      {/* Rotating badge */}
      <RotatingBadge />
    </div>
  );
}

function RotatingBadge() {
  const text = "IAplicada — Mariana Marques — ";
  const repeated = text + text;

  return (
    <div
      className="absolute -right-3 top-6 lg:-right-6 lg:top-10 h-28 w-28 lg:h-36 lg:w-36 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: "var(--color-surface)",
        boxShadow: "0 10px 30px oklch(0.2 0.02 122 / 0.25)",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
      >
        <defs>
          <path id="circlePath" d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
        </defs>
        <text fill="oklch(0.62 0.17 125)" fontSize="13" fontWeight="600" letterSpacing="1">
          <textPath xlinkHref="#circlePath" startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>
      <LogoMark size={56} className="relative z-10" />
    </div>
  );
}
