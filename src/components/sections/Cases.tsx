import { Reveal } from "@/components/Reveal";

interface CaseStudy {
  segment: string;
  company: string;
  size: string;
  before: string;
  after: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  Scene: () => React.ReactElement;
}

const CASES: CaseStudy[] = [
  {
    segment: "Varejo",
    company: "Rede de varejo regional",
    size: "~45 colaboradores · 6 lojas",
    before:
      "Sócios travados no operacional, fechamento de mês em planilhas e sem visibilidade entre lojas.",
    after:
      "Painel único de vendas e estoque, reposição automatizada e sócios fora da rotina diária.",
    metrics: [
      { value: "−30h", label: "sócios/semana" },
      { value: "+18%", label: "margem" },
      { value: "8 sem", label: "go-live" },
    ],
    quote: "Voltei a tocar a estratégia.",
    author: "Sócia-fundadora",
    Scene: VarejoScene,
  },
  {
    segment: "Tech",
    company: "SaaS B2B",
    size: "~28 colaboradores",
    before:
      "Time pequeno apagando incêndio, processos espalhados pelo Slack e pipeline sem clareza.",
    after:
      "Pipeline estruturado, papéis definidos e entregas com previsibilidade — sem aumentar o time.",
    metrics: [
      { value: "+40%", label: "capacidade time" },
      { value: "0", label: "contratações" },
      { value: "6 sem", label: "go-live" },
    ],
    quote: "A operação começou a respirar.",
    author: "CEO",
    Scene: FintechScene,
  },
  {
    segment: "Indústria",
    company: "Indústria de pequeno porte",
    size: "~85 colaboradores",
    before:
      "Produção desorganizada, ordens duplicadas e gargalo recorrente na expedição.",
    after:
      "Fluxo de ordens claro, expedição com SLA e fábrica rodando previsível.",
    metrics: [
      { value: "−40%", label: "retrabalho" },
      { value: "+25%", label: "expedição" },
      { value: "10 sem", label: "go-live" },
    ],
    quote: "Hoje eu sei o que vai sair amanhã.",
    author: "Diretor industrial",
    Scene: IndustriaScene,
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Cases reais
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              O que acontece quando a <em>IAplicada</em>
              <br />
              chega na empresa.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[15.5px] text-sage leading-[1.6] max-w-[620px] mx-auto">
              PMEs reais — entre 20 e 100 colaboradores — que pararam de depender do dono no
              operacional.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.06}>
              <article
                className="card-soft overflow-hidden h-full flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Cena ilustrada do nicho — paleta olive */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <c.Scene />
                  <div className="absolute top-4 left-5 z-10">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold"
                      style={{
                        backgroundColor: "oklch(1 0 0 / 0.18)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        color: "oklch(1 0 0)",
                        border: "1px solid oklch(1 0 0 / 0.22)",
                      }}
                    >
                      {c.segment}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-[18px] font-semibold text-foreground">{c.company}</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">{c.size}</p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.16em] font-bold"
                        style={{ color: "oklch(0.55 0.16 25)" }}
                      >
                        Antes
                      </p>
                      <p className="mt-1 text-[13.5px] text-sage leading-[1.55]">{c.before}</p>
                    </div>
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.16em] font-bold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Depois
                      </p>
                      <p className="mt-1 text-[13.5px] text-foreground leading-[1.55] font-medium">
                        {c.after}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 py-4 border-y border-border">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          className="num-display text-[20px] leading-none"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {m.value}
                        </div>
                        <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground leading-tight">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-auto pt-5">
                    <p className="text-foreground text-[14px] leading-[1.5] italic">"{c.quote}"</p>
                    <footer className="mt-2 text-[12px] text-muted-foreground">— {c.author}</footer>
                  </blockquote>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cenas SVG por nicho — paleta brand (olive)                          */
/* ------------------------------------------------------------------ */

/** Varejo — fachada de loja com vitrine, toldo e calçada. */
function VarejoScene() {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Ilustração: fachada de loja de varejo"
    >
      <defs>
        <linearGradient id="sky-varejo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.13 122)" />
          <stop offset="100%" stopColor="oklch(0.55 0.15 125)" />
        </linearGradient>
        <linearGradient id="facade-varejo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.13 125)" />
          <stop offset="100%" stopColor="oklch(0.32 0.09 125)" />
        </linearGradient>
        <linearGradient id="window-varejo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.08 122)" />
          <stop offset="100%" stopColor="oklch(0.78 0.14 122)" />
        </linearGradient>
        <linearGradient id="awning-varejo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.66 0.18 122)" />
          <stop offset="100%" stopColor="oklch(0.52 0.16 125)" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="320" height="180" fill="url(#sky-varejo)" />

      {/* sun glow */}
      <circle cx="260" cy="40" r="38" fill="oklch(0.92 0.1 122 / 0.45)" />
      <circle cx="260" cy="40" r="18" fill="oklch(0.96 0.08 122 / 0.7)" />

      {/* sidewalk */}
      <rect x="0" y="150" width="320" height="30" fill="oklch(0.86 0.04 122)" />
      <line x1="0" y1="158" x2="320" y2="158" stroke="oklch(0.7 0.06 122)" strokeWidth="1" />
      {[40, 110, 180, 250].map((x) => (
        <line
          key={x}
          x1={x}
          y1="160"
          x2={x}
          y2="178"
          stroke="oklch(0.7 0.06 122)"
          strokeWidth="0.8"
        />
      ))}

      {/* building facade */}
      <rect x="30" y="40" width="260" height="115" fill="url(#facade-varejo)" />
      <rect x="30" y="40" width="260" height="6" fill="oklch(0.55 0.14 125)" />

      {/* signboard */}
      <rect x="60" y="50" width="200" height="22" rx="2" fill="oklch(0.92 0.08 122)" />
      <rect x="64" y="54" width="192" height="14" rx="1" fill="oklch(0.42 0.12 125)" />
      {/* fake LOJA letters as bars */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={120 + i * 22}
          y="58"
          width="14"
          height="6"
          fill="oklch(0.85 0.14 122)"
        />
      ))}

      {/* awning */}
      <path
        d="M40,82 L280,82 L268,102 L52,102 Z"
        fill="url(#awning-varejo)"
      />
      <path d="M40,82 L280,82" stroke="oklch(0.42 0.12 125)" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line
          key={i}
          x1={52 + i * 24}
          y1="82"
          x2={52 + i * 24 - 2}
          y2="102"
          stroke="oklch(0.42 0.12 125 / 0.5)"
          strokeWidth="0.8"
        />
      ))}

      {/* showcase windows */}
      <rect x="50" y="108" width="100" height="44" fill="url(#window-varejo)" />
      <rect x="170" y="108" width="100" height="44" fill="url(#window-varejo)" />
      {/* mullions */}
      <line x1="100" y1="108" x2="100" y2="152" stroke="oklch(0.42 0.12 125)" strokeWidth="2" />
      <line x1="220" y1="108" x2="220" y2="152" stroke="oklch(0.42 0.12 125)" strokeWidth="2" />
      <line x1="50" y1="108" x2="150" y2="108" stroke="oklch(0.42 0.12 125)" strokeWidth="2" />
      <line x1="170" y1="108" x2="270" y2="108" stroke="oklch(0.42 0.12 125)" strokeWidth="2" />
      <line x1="50" y1="152" x2="150" y2="152" stroke="oklch(0.42 0.12 125)" strokeWidth="2" />
      <line x1="170" y1="152" x2="270" y2="152" stroke="oklch(0.42 0.12 125)" strokeWidth="2" />

      {/* mannequins / shapes inside */}
      <rect x="62" y="124" width="10" height="22" fill="oklch(0.5 0.13 125 / 0.7)" rx="2" />
      <circle cx="67" cy="120" r="4" fill="oklch(0.5 0.13 125 / 0.7)" />
      <rect x="86" y="128" width="10" height="18" fill="oklch(0.5 0.13 125 / 0.7)" rx="2" />
      <circle cx="91" cy="124" r="3.5" fill="oklch(0.5 0.13 125 / 0.7)" />
      <rect x="112" y="126" width="10" height="20" fill="oklch(0.5 0.13 125 / 0.7)" rx="2" />
      <circle cx="117" cy="122" r="3.8" fill="oklch(0.5 0.13 125 / 0.7)" />

      {/* shopping bags right window */}
      <rect x="186" y="130" width="14" height="16" fill="oklch(0.46 0.14 125 / 0.7)" rx="1" />
      <rect x="187" y="126" width="12" height="4" fill="none" stroke="oklch(0.46 0.14 125 / 0.7)" strokeWidth="1" />
      <rect x="206" y="132" width="12" height="14" fill="oklch(0.46 0.14 125 / 0.7)" rx="1" />
      <rect x="240" y="128" width="16" height="18" fill="oklch(0.46 0.14 125 / 0.7)" rx="1" />
      <rect x="241" y="124" width="14" height="4" fill="none" stroke="oklch(0.46 0.14 125 / 0.7)" strokeWidth="1" />

      {/* door */}
      <rect x="155" y="108" width="14" height="44" fill="oklch(0.36 0.1 125)" />
      <circle cx="166" cy="132" r="0.8" fill="oklch(0.85 0.14 122)" />

      {/* people walking — small silhouettes */}
      <g fill="oklch(0.32 0.08 125 / 0.8)">
        <circle cx="76" cy="160" r="2" />
        <rect x="74" y="162" width="4" height="8" rx="1" />
      </g>
      <g fill="oklch(0.32 0.08 125 / 0.8)">
        <circle cx="200" cy="162" r="1.8" />
        <rect x="198.4" y="164" width="3.4" height="7" rx="1" />
      </g>
    </svg>
  );
}

/** Fintech — skyline com prédios e janelas iluminadas. */
function FintechScene() {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Ilustração: skyline financeiro"
    >
      <defs>
        <linearGradient id="sky-fintech" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.32 0.05 125)" />
          <stop offset="60%" stopColor="oklch(0.42 0.1 125)" />
          <stop offset="100%" stopColor="oklch(0.55 0.15 122)" />
        </linearGradient>
        <linearGradient id="bldg-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.26 0.05 125)" />
          <stop offset="100%" stopColor="oklch(0.18 0.04 125)" />
        </linearGradient>
        <linearGradient id="bldg-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.32 0.07 125)" />
          <stop offset="100%" stopColor="oklch(0.22 0.05 125)" />
        </linearGradient>
        <linearGradient id="bldg-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.4 0.09 125)" />
          <stop offset="100%" stopColor="oklch(0.3 0.06 125)" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="320" height="180" fill="url(#sky-fintech)" />

      {/* moon glow */}
      <circle cx="240" cy="36" r="20" fill="oklch(0.92 0.1 122 / 0.35)" />
      <circle cx="240" cy="36" r="10" fill="oklch(0.96 0.08 122 / 0.6)" />

      {/* far skyline */}
      <g fill="url(#bldg-back)">
        <rect x="0" y="92" width="40" height="88" />
        <rect x="40" y="78" width="28" height="102" />
        <rect x="68" y="86" width="24" height="94" />
        <rect x="190" y="80" width="28" height="100" />
        <rect x="218" y="92" width="22" height="88" />
        <rect x="270" y="84" width="50" height="96" />
      </g>

      {/* mid skyline */}
      <g fill="url(#bldg-mid)">
        <rect x="20" y="64" width="34" height="116" />
        <rect x="92" y="56" width="36" height="124" />
        <rect x="160" y="68" width="30" height="112" />
        <rect x="240" y="60" width="34" height="120" />
      </g>

      {/* tall front towers */}
      <g fill="url(#bldg-front)">
        <rect x="58" y="40" width="28" height="140" />
        {/* spire */}
        <polygon points="72,24 86,40 58,40" />
        <rect x="128" y="32" width="32" height="148" />
        {/* roof */}
        <rect x="138" y="22" width="12" height="10" />
        <rect x="142" y="14" width="4" height="10" />
        <rect x="200" y="50" width="32" height="130" />
      </g>

      {/* lit windows — olive bright */}
      {(() => {
        const lit: { x: number; y: number; w?: number; h?: number; on?: number }[] = [];
        // tower 1 (58-86, 40-180)
        for (let r = 0; r < 16; r++) {
          for (let c = 0; c < 4; c++) {
            lit.push({ x: 62 + c * 6, y: 48 + r * 8, on: ((r * 7 + c * 3) % 5) - 1 });
          }
        }
        // tower 2 (128-160, 32-180)
        for (let r = 0; r < 17; r++) {
          for (let c = 0; c < 5; c++) {
            lit.push({ x: 132 + c * 6, y: 40 + r * 8, on: ((r * 5 + c * 11) % 5) - 1 });
          }
        }
        // tower 3 (200-232, 50-180)
        for (let r = 0; r < 14; r++) {
          for (let c = 0; c < 5; c++) {
            lit.push({ x: 204 + c * 6, y: 58 + r * 8, on: ((r * 11 + c * 7) % 5) - 1 });
          }
        }
        return lit.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width="3"
            height="4"
            fill={
              (w.on ?? 0) > 0
                ? "oklch(0.88 0.18 122 / 0.85)"
                : "oklch(0.55 0.12 125 / 0.4)"
            }
          />
        ));
      })()}

      {/* mid towers windows (smaller dot pattern) */}
      {[
        [20, 34, 64, 116],
        [92, 36, 56, 124],
        [160, 30, 68, 112],
        [240, 34, 60, 120],
      ].map(([x, w, y, h], idx) => (
        <g key={idx}>
          {Array.from({ length: Math.floor(h / 7) }).map((_, r) =>
            Array.from({ length: Math.floor(w / 5) - 1 }).map((__, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + 2 + c * 5}
                y={y + 4 + r * 7}
                width="2"
                height="2.5"
                fill={
                  (r * 3 + c * 5 + idx) % 4 === 0
                    ? "oklch(0.78 0.16 122 / 0.7)"
                    : "oklch(0.42 0.08 125 / 0.4)"
                }
              />
            )),
          )}
        </g>
      ))}

      {/* river / reflection bottom */}
      <rect x="0" y="170" width="320" height="10" fill="oklch(0.22 0.04 125)" />
      <line x1="0" y1="170" x2="320" y2="170" stroke="oklch(0.55 0.14 122 / 0.4)" strokeWidth="0.6" />

      {/* graph line overlay (tech accent) */}
      <path
        d="M0,150 L40,144 L70,148 L100,138 L130,142 L160,128 L190,132 L220,118 L250,124 L280,108 L320,102"
        fill="none"
        stroke="oklch(0.78 0.18 122)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** Indústria — fábrica com chaminés, galpão e tubulação. */
function IndustriaScene() {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Ilustração: complexo industrial"
    >
      <defs>
        <linearGradient id="sky-ind" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.1 122)" />
          <stop offset="100%" stopColor="oklch(0.5 0.14 125)" />
        </linearGradient>
        <linearGradient id="hangar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.42 0.11 125)" />
          <stop offset="100%" stopColor="oklch(0.28 0.07 125)" />
        </linearGradient>
        <linearGradient id="stack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.12 125)" />
          <stop offset="100%" stopColor="oklch(0.3 0.07 125)" />
        </linearGradient>
        <radialGradient id="smoke" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.92 0.06 122 / 0.7)" />
          <stop offset="100%" stopColor="oklch(0.92 0.06 122 / 0)" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect width="320" height="180" fill="url(#sky-ind)" />

      {/* sun haze */}
      <circle cx="60" cy="38" r="36" fill="oklch(0.92 0.1 122 / 0.4)" />
      <circle cx="60" cy="38" r="16" fill="oklch(0.96 0.08 122 / 0.7)" />

      {/* smoke plumes */}
      <ellipse cx="118" cy="36" rx="28" ry="14" fill="url(#smoke)" />
      <ellipse cx="138" cy="22" rx="24" ry="10" fill="url(#smoke)" />
      <ellipse cx="206" cy="40" rx="26" ry="12" fill="url(#smoke)" />
      <ellipse cx="228" cy="26" rx="22" ry="9" fill="url(#smoke)" />

      {/* ground */}
      <rect x="0" y="150" width="320" height="30" fill="oklch(0.36 0.06 122)" />
      <line x1="0" y1="150" x2="320" y2="150" stroke="oklch(0.28 0.05 122)" strokeWidth="1" />

      {/* main hangar */}
      <rect x="20" y="100" width="160" height="50" fill="url(#hangar)" />
      {/* sawtooth roof */}
      <path
        d="M20,100 L30,84 L40,100 L50,84 L60,100 L70,84 L80,100 L90,84 L100,100 L110,84 L120,100 L130,84 L140,100 L150,84 L160,100 L170,84 L180,100 Z"
        fill="oklch(0.5 0.13 125)"
      />
      {/* roof shading windows */}
      {[35, 55, 75, 95, 115, 135, 155, 175].map((x) => (
        <polygon
          key={x}
          points={`${x - 4},96 ${x},88 ${x + 4},96`}
          fill="oklch(0.85 0.1 122 / 0.6)"
        />
      ))}

      {/* hangar door */}
      <rect x="56" y="116" width="36" height="34" fill="oklch(0.22 0.05 125)" />
      <line x1="74" y1="116" x2="74" y2="150" stroke="oklch(0.5 0.13 125)" strokeWidth="1" />

      {/* small windows */}
      {[110, 124, 138, 152, 166].map((x) => (
        <rect
          key={x}
          x={x}
          y="120"
          width="8"
          height="10"
          fill="oklch(0.78 0.14 122 / 0.7)"
          stroke="oklch(0.32 0.07 125)"
          strokeWidth="0.6"
        />
      ))}

      {/* secondary block right */}
      <rect x="200" y="118" width="58" height="32" fill="url(#hangar)" />
      <rect x="200" y="112" width="58" height="6" fill="oklch(0.5 0.13 125)" />
      {[208, 220, 232, 244].map((x) => (
        <rect
          key={x}
          x={x}
          y="124"
          width="8"
          height="10"
          fill="oklch(0.78 0.14 122 / 0.7)"
          stroke="oklch(0.32 0.07 125)"
          strokeWidth="0.6"
        />
      ))}

      {/* smokestacks */}
      <rect x="112" y="50" width="14" height="100" fill="url(#stack)" />
      <rect x="110" y="48" width="18" height="6" fill="oklch(0.32 0.07 125)" />
      <rect x="111" y="68" width="16" height="3" fill="oklch(0.85 0.14 122)" />

      <rect x="132" y="36" width="12" height="114" fill="url(#stack)" />
      <rect x="130" y="34" width="16" height="6" fill="oklch(0.32 0.07 125)" />
      <rect x="131" y="54" width="14" height="3" fill="oklch(0.85 0.14 122)" />

      <rect x="200" y="56" width="14" height="94" fill="url(#stack)" />
      <rect x="198" y="54" width="18" height="6" fill="oklch(0.32 0.07 125)" />
      <rect x="199" y="74" width="16" height="3" fill="oklch(0.85 0.14 122)" />

      <rect x="222" y="42" width="12" height="108" fill="url(#stack)" />
      <rect x="220" y="40" width="16" height="6" fill="oklch(0.32 0.07 125)" />
      <rect x="221" y="60" width="14" height="3" fill="oklch(0.85 0.14 122)" />

      {/* large round tank */}
      <ellipse cx="288" cy="118" rx="22" ry="6" fill="oklch(0.32 0.07 125)" />
      <rect x="266" y="100" width="44" height="22" fill="oklch(0.46 0.13 125)" />
      <ellipse cx="288" cy="100" rx="22" ry="6" fill="oklch(0.62 0.16 125)" />
      <rect x="266" y="118" width="44" height="4" fill="oklch(0.32 0.07 125)" />

      {/* pipework */}
      <path
        d="M180,128 L196,128 L196,118 L266,118"
        fill="none"
        stroke="oklch(0.36 0.09 125)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="196" cy="128" r="2" fill="oklch(0.32 0.07 125)" />
      <circle cx="196" cy="118" r="2" fill="oklch(0.32 0.07 125)" />

      {/* ground shadow line */}
      <line x1="0" y1="156" x2="320" y2="156" stroke="oklch(0.28 0.05 122 / 0.6)" strokeWidth="0.8" />
    </svg>
  );
}
