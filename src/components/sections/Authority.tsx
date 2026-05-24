import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";
import { LogoMark } from "@/components/Logo";

const ENTERPRISE_REFS = ["Mercado Livre", "Suzano", "AngloGold Ashanti"];

const PILLARS = [
  {
    n: "01",
    title: "Tecnologia não é moda.",
    text: "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico.",
  },
  {
    n: "02",
    title: "É ferramenta estratégica.",
    text: "Operação que se mede, escala e sustenta sem depender de uma cabeça só.",
  },
];

export function Authority() {
  return (
    <section
      id="time"
      className="section-veil py-[100px] lg:py-[140px] relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          {/* LEFT — content */}
          <div className="lg:pt-4">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Quem lidera
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
                Sobre a <em>IAplicada</em>.
              </h2>
            </Reveal>

            {/* Numbered pillars — clean, no olive arrow circles */}
            <Reveal delay={0.1}>
              <div className="mt-10 grid sm:grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8">
                {PILLARS.map((p) => (
                  <div key={p.n} className="relative">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="num-display text-[14px] tracking-wider"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {p.n}
                      </span>
                      <span
                        className="h-[1px] flex-1"
                        style={{
                          background: "linear-gradient(90deg, var(--color-primary), transparent)",
                        }}
                      />
                    </div>
                    <p className="mt-3 text-[16px] font-semibold text-foreground tracking-tight">
                      {p.title}
                    </p>
                    <p className="mt-2 text-[14px] text-sage leading-[1.55]">{p.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 space-y-4 text-sage text-[15.5px] leading-[1.65] max-w-[520px]">
              <Reveal delay={0.15}>
                <p>
                  A IAplicada nasce da operação real. Aprendemos em gigantes onde caos é
                  inaceitável — e adaptamos esse padrão pra PMEs que precisam parar de improvisar.
                </p>
              </Reveal>

              {/* Enterprise reference strip — mais credível que arrow circles */}
              <Reveal delay={0.2}>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                    De onde vem o método
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
                    {ENTERPRISE_REFS.map((name) => (
                      <span
                        key={name}
                        className="text-[15px] font-semibold tracking-tight text-foreground"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.55] text-sage">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Aplicado hoje em +17 PMEs
                    </span>{" "}
                    · serviços, indústria, varejo.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.28}>
              <a href="#diagnostico-form" className="mt-10 cta-primary">
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

          {/* RIGHT — founder card */}
          <Reveal delay={0.2}>
            <FounderCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Founder card — photo with proper face centering, name plate at bottom,
 * discreet rotating badge in the bottom-right corner.
 */
function FounderCard() {
  return (
    <div className="relative">
      <div
        className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden"
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <img
          src={FOUNDER.photoSrc}
          alt={FOUNDER.name}
          width={400}
          height={500}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 25%" }}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== FOUNDER.photoFallback) img.src = FOUNDER.photoFallback;
          }}
        />

        {/* Bottom gradient + name plate */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background: "linear-gradient(180deg, transparent 0%, oklch(0.18 0.02 122 / 0.85) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p
            className="text-[10px] uppercase tracking-[0.18em] font-semibold"
            style={{ color: "oklch(0.82 0.2 115)" }}
          >
            Fundadora · IAplicada
          </p>
          <p className="mt-1.5 text-white font-semibold text-[20px] tracking-tight">
            Mariana Marques
          </p>
        </div>
      </div>

      {/* Discreet rotating badge — bottom-right corner */}
      <RotatingBadge />
    </div>
  );
}

function RotatingBadge() {
  const text = "IAplicada · Mariana Marques · ";
  const repeated = text + text;

  return (
    <div
      className="absolute -bottom-5 -right-5 lg:-bottom-6 lg:-right-6 h-20 w-20 lg:h-24 lg:w-24 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: "oklch(1 0 0)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 10px 30px oklch(0.18 0.02 122 / 0.25)",
      }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full ia-anim-rotate-slow">
        <defs>
          <path
            id="circle-rotate-path"
            d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text fill="oklch(0.4 0.14 125)" fontSize="11" fontWeight="600" letterSpacing="1.5">
          <textPath xlinkHref="#circle-rotate-path" startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>
      <LogoMark size={36} className="relative z-10" />
    </div>
  );
}
