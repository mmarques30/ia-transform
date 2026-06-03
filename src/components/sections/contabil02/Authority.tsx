import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";

/**
 * "Quem vai te atender" — versão da Authority dedicada à /contabil02.
 * Recompõe os 4 quadrantes ao redor da pergunta que o sócio receoso faz
 * antes de marcar a call: "quem é essa gente e por que devo confiar?".
 *
 * Forkada da Authority compartilhada pra evoluir independente — o
 * quando clica no logo do header: "quem são vocês, de onde veio o método,
 * funciona em escala, e o que isso prova?".
 *
 * A composição ecossistêmica vem de uma camada SVG atrás de tudo: anéis
 * concêntricos amplos + 4 linhas diagonais que ligam o centro aos
 * quadrantes, sugerindo nodos conectados. Zero JS extra.
 */
const QUADRANTS = [
  {
    n: "01",
    label: "Fundadora",
    text: "Mariana Marques liderou operações em ambientes onde caos não é opção. Trouxe esse padrão pra dentro do escritório contábil.",
  },
  {
    n: "02",
    label: "De onde vem o método",
    text: "A IAplicada nasceu da operação real de gigantes. Depois adaptamos esse padrão pra escritórios contábeis que precisam parar de improvisar.",
    enterpriseRefs: ["Mercado Livre", "Suzano", "AngloGold Ashanti"],
  },
  {
    n: "03",
    label: "Foco contábil",
    text: "Não construímos por hype. Cada sistema resolve um problema operacional específico do escritório, dentro do fluxo que o seu time já usa.",
  },
  {
    n: "04",
    label: "Prova concreta",
    text: "+700 profissionais usando a IAplicada dentro das empresas. +17 PMEs ativas em serviços, indústria e varejo.",
  },
] as const;

export function Authority() {
  return (
    <section
      id="time"
      className="section-veil py-[100px] lg:py-[160px] relative overflow-hidden"
    >
      <div className="container-page relative">
        {/* Header row — chip + título + meta-label */}
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-20">
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Quem vai te atender
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-5 text-[36px] sm:text-[44px] lg:text-[56px] text-foreground">
                Por trás da <em>IAplicada</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-[11.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground max-w-[280px] lg:text-right">
              // método ancorado no operacional real
            </p>
          </Reveal>
        </div>

        {/* Watermark "operação real" — desktop only */}
        <p
          aria-hidden
          className="hidden lg:block absolute pointer-events-none select-none"
          style={{
            bottom: "6%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(160px, 22vw, 300px)",
            fontStyle: "italic",
            color: "transparent",
            WebkitTextStroke: "1px oklch(0.55 0.06 122 / 0.18)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          operação real
        </p>

        {/* DESKTOP: composição em 3 colunas (Q1 | centro | Q2 / Q3 | _ | Q4)
            com a camada de ecossistema (anéis + linhas) atrás. */}
        <div className="hidden lg:block relative">
          <EcosystemRings />

          <div className="relative grid lg:grid-cols-[1fr_1.3fr_1fr] gap-y-24 gap-x-10 z-10">
            <Reveal>
              <Quadrant {...QUADRANTS[0]} corner="tl" />
            </Reveal>

            <div className="flex row-span-2 items-center justify-center">
              <CenterMark />
            </div>

            <Reveal delay={0.05}>
              <Quadrant {...QUADRANTS[1]} corner="tr" />
            </Reveal>

            <Reveal delay={0.1}>
              <Quadrant {...QUADRANTS[2]} corner="bl" />
            </Reveal>

            <Reveal delay={0.15}>
              <Quadrant {...QUADRANTS[3]} corner="br" />
            </Reveal>
          </div>
        </div>

        {/* MOBILE: stack vertical com a marca como âncora no topo + 4
            quadrantes em cards sutis. A composição "quadrantes orbitando
            o centro" não traduz pra coluna única — então o centro vira
            o cabeçalho visual da seção e os quadrantes viram contexto
            estruturado abaixo. */}
        <div className="lg:hidden flex flex-col gap-5">
          <Reveal>
            <div className="flex justify-center py-2">
              <CenterMark />
            </div>
          </Reveal>
          {QUADRANTS.map((q, i) => (
            <Reveal key={q.n} delay={(i + 1) * 0.05}>
              <div
                className="rounded-xl border border-border p-5"
                style={{
                  backgroundColor: "oklch(0.18 0.025 122 / 0.4)",
                }}
              >
                <Quadrant {...q} corner="tl" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dual CTA — primário + secundário com mesmo peso visual de pill */}
        <Reveal delay={0.25}>
          <div className="mt-14 lg:mt-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-10">
            <a href="#diagnostico-form" className="cta-primary">
              Entender como funciona o diagnóstico
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
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
            <a href="#abordagem" className="cta-secondary">
              Ler metodologia
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface QuadrantProps {
  n: string;
  label: string;
  text: string;
  enterpriseRefs?: readonly string[];
  corner: "tl" | "tr" | "bl" | "br";
}

function Quadrant({ n, label, text, enterpriseRefs, corner }: QuadrantProps) {
  const isRight = corner === "tr" || corner === "br";
  return (
    <div className={isRight ? "lg:text-right" : "lg:text-left"}>
      <p
        className="text-[10.5px] uppercase tracking-[0.22em] font-semibold"
        style={{ color: "oklch(0.78 0.08 125)" }}
      >
        {n} <span className="text-muted-foreground">·</span> {label}
      </p>
      <p
        className={`mt-3 text-[14.5px] text-foreground leading-[1.6] max-w-[280px] ${
          isRight ? "lg:ml-auto" : ""
        }`}
      >
        {text}
      </p>
      {enterpriseRefs && (
        <div
          className={`mt-5 flex flex-wrap gap-x-5 gap-y-2 ${
            isRight ? "lg:justify-end" : ""
          }`}
        >
          {enterpriseRefs.map((name) => (
            <span
              key={name}
              className="text-[13px] font-bold tracking-tight text-foreground whitespace-nowrap"
              style={{ letterSpacing: "0.01em" }}
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * EcosystemRings — camada decorativa que dá a sensação de "rede conectada"
 * entre os quadrantes e a marca central. Anéis concêntricos grandes +
 * 4 linhas diagonais finas que partem do centro em direção aos quadrantes,
 * com nodos discretos onde as linhas tocam o anel externo.
 *
 * Posicionada absoluta atrás do grid (z-0). Desktop only — no mobile o
 * stack vertical já comunica a relação visual sem precisar das linhas.
 */
function EcosystemRings() {
  return (
    <svg
      aria-hidden
      className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid meet"
      style={{ zIndex: 1 }}
    >
      <defs>
        <radialGradient id="ring-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.35" />
          <stop offset="70%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-fade-tl" x1="600" y1="300" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="line-fade-tr" x1="600" y1="300" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="line-fade-bl" x1="600" y1="300" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="line-fade-br" x1="600" y1="300" x2="1200" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Anéis concêntricos — grandes, baixa opacidade. O externo é tracejado;
          o interno sólido. Centro alinhado com a marca central. */}
      <circle
        cx="600"
        cy="300"
        r="280"
        fill="none"
        stroke="oklch(0.55 0.08 125 / 0.32)"
        strokeWidth="0.6"
        strokeDasharray="2 7"
      />
      <circle
        cx="600"
        cy="300"
        r="200"
        fill="none"
        stroke="oklch(0.55 0.08 125 / 0.22)"
        strokeWidth="0.6"
      />
      <circle
        cx="600"
        cy="300"
        r="130"
        fill="none"
        stroke="oklch(0.55 0.08 125 / 0.4)"
        strokeWidth="0.6"
      />

      {/* Halo radial sutil atrás da marca central */}
      <circle cx="600" cy="300" r="180" fill="url(#ring-fade)" />

      {/* 4 linhas diagonais — conectam centro aos quadrantes. Fade gradiente
          do centro pra fora, sugerindo "energia" emanando da marca. */}
      <line x1="600" y1="300" x2="180" y2="60" stroke="url(#line-fade-tl)" strokeWidth="0.7" />
      <line x1="600" y1="300" x2="1020" y2="60" stroke="url(#line-fade-tr)" strokeWidth="0.7" />
      <line x1="600" y1="300" x2="180" y2="540" stroke="url(#line-fade-bl)" strokeWidth="0.7" />
      <line x1="600" y1="300" x2="1020" y2="540" stroke="url(#line-fade-br)" strokeWidth="0.7" />

      {/* Nodos nos extremos das linhas — ponto de conexão visual com cada
          quadrante. */}
      {[
        [180, 60],
        [1020, 60],
        [180, 540],
        [1020, 540],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="3" fill="oklch(0.75 0.20 122 / 0.55)" />
          <circle
            cx={cx}
            cy={cy}
            r="7"
            fill="none"
            stroke="oklch(0.75 0.20 122 / 0.3)"
            strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Marca central com profundidade — versão sem moldura. O logo é o
 * destaque visual da composição: tamanho generoso (160px no desktop),
 * 4 camadas empilhadas para criar relevo (back blur, mid shadow, glint,
 * crisp front) e um halo olive radial atrás. Embaixo, stat "+17 PMES
 * ATIVAS" tipografado como um número de destaque, não como label.
 */
function CenterMark() {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 280 }}>
      <div className="relative" style={{ width: 220, height: 220 }}>
        {/* Halo radial — olive glow forte, suaviza nas bordas */}
        <div
          aria-hidden
          className="absolute inset-0 m-auto"
          style={{
            width: 240,
            height: 240,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.75 0.20 122 / 0.55) 0%, oklch(0.75 0.20 122 / 0.1) 45%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        {/* Camadas empilhadas — efeito de profundidade real */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Back layer — escala maior + blur forte + baixa opacidade */}
          <div
            aria-hidden
            className="absolute"
            style={{
              transform: "scale(1.28)",
              filter: "blur(14px)",
              opacity: 0.4,
            }}
          >
            <LogoMark size={160} />
          </div>
          {/* Mid layer — sombra projetada olive */}
          <div
            aria-hidden
            className="absolute"
            style={{
              transform: "scale(1.08) translateY(4px)",
              filter: "drop-shadow(0 10px 32px oklch(0.75 0.20 122 / 0.65))",
              opacity: 0.6,
            }}
          >
            <LogoMark size={160} />
          </div>
          {/* Glint — leve highlight branco no topo */}
          <div
            aria-hidden
            className="absolute"
            style={{
              transform: "scale(1.02) translateY(-2px)",
              filter: "drop-shadow(0 -2px 6px oklch(1 0 0 / 0.25))",
              opacity: 0.5,
              mixBlendMode: "screen",
            }}
          >
            <LogoMark size={160} />
          </div>
          {/* Front layer — nítida, é o que o olho lê */}
          <LogoMark size={160} />
        </div>
      </div>

      {/* Stat em destaque — "+17 PMEs ativas" como número, não como label */}
      <div className="mt-6 text-center">
        <p
          className="num-display text-[28px] leading-none"
          style={{ color: "var(--color-primary)" }}
        >
          +17
        </p>
        <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
          PMEs ativas
        </p>
      </div>
    </div>
  );
}
