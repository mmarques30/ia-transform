import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";

/**
 * "Sobre a IAplicada" — composição em 4 quadrantes em torno de uma marca
 * central com profundidade em camadas. Inspirado em Stillwood Residences:
 * o centro carrega o símbolo (com sensação de relevo via SVG empilhado) e
 * os 4 cantos respondem à pergunta que o público frio faz quando clica no
 * logo do header: "quem são vocês, de onde veio o método, funciona em
 * escala, e o que isso prova?".
 *
 * Substituiu o card com foto da fundadora — a foto colocava o foco na
 * pessoa, e este público está perguntando sobre marca/produto. Mariana
 * volta como assinatura em outro contexto se necessário.
 */
const QUADRANTS = [
  {
    n: "01",
    label: "Tecnologia não é moda",
    text: "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico.",
  },
  {
    n: "02",
    label: "É ferramenta estratégica",
    text: "Operação que se mede, escala e sustenta sem depender de uma cabeça só.",
  },
  {
    n: "03",
    label: "De onde vem o método",
    text: "Aprendido em operação real de gigantes — depois adaptado pra PMEs que precisam parar de improvisar.",
    enterpriseRefs: ["Mercado Livre", "Suzano", "AngloGold Ashanti"],
  },
  {
    n: "04",
    label: "Aplicado em escala",
    text: "+17 PMEs ativas em serviços, indústria e varejo. +700 profissionais usando dentro das empresas.",
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
                Quem lidera
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-5 text-[36px] sm:text-[44px] lg:text-[56px] text-foreground">
                Sobre a <em>IAplicada</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-[11.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground max-w-[280px] lg:text-right">
              // método ancorado no operacional real
            </p>
          </Reveal>
        </div>

        {/* Watermark "operação real" — desktop only, serif outline, baixa
            opacidade. Dialoga com o "quiet spaces" da referência sem
            competir com o conteúdo. */}
        <p
          aria-hidden
          className="hidden lg:block absolute pointer-events-none select-none"
          style={{
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(160px, 22vw, 280px)",
            fontStyle: "italic",
            color: "transparent",
            WebkitTextStroke: "1px oklch(0.55 0.06 122 / 0.22)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          operação real
        </p>

        {/* Composition: 4 quadrants around centered logo */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-y-10 lg:gap-y-16 lg:gap-x-8 z-10">
          {/* Q1 — top-left */}
          <Reveal>
            <Quadrant {...QUADRANTS[0]} corner="tl" />
          </Reveal>

          {/* Center column — desktop spans 2 rows */}
          <div className="hidden lg:flex lg:row-span-2 items-center justify-center">
            <CenterMark />
          </div>

          {/* Q2 — top-right */}
          <Reveal delay={0.05}>
            <Quadrant {...QUADRANTS[1]} corner="tr" />
          </Reveal>

          {/* Mobile-only: center mark entre top e bottom rows */}
          <div className="flex lg:hidden items-center justify-center py-4">
            <CenterMark />
          </div>

          {/* Q3 — bottom-left */}
          <Reveal delay={0.1}>
            <Quadrant {...QUADRANTS[2]} corner="bl" />
          </Reveal>

          {/* Q4 — bottom-right */}
          <Reveal delay={0.15}>
            <Quadrant {...QUADRANTS[3]} corner="br" />
          </Reveal>
        </div>

        {/* Dual CTA — primário (form) + secundário (ler metodologia) */}
        <Reveal delay={0.25}>
          <div className="mt-14 lg:mt-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 relative z-10">
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
            <a
              href="#abordagem"
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-foreground/75 hover:text-foreground transition-colors px-4 py-3 underline-offset-4 hover:underline"
            >
              Ler metodologia
              <span aria-hidden>→</span>
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
          className={`mt-5 flex flex-wrap gap-x-5 gap-y-2 ${isRight ? "lg:justify-end" : ""}`}
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
 * Marca central com profundidade — empilha 3 camadas do LogoMark
 * (blur de fundo, drop-shadow olive, camada nítida) num frame quadrado.
 * O anel concêntrico dashed gira lento e dialoga com a referência
 * (Stillwood). Zero JS extra: tudo SVG/CSS estático.
 */
function CenterMark() {
  return (
    <div className="relative" style={{ width: 280, height: 280 }}>
      {/* Outer concentric rings — dashed, rotação lenta */}
      <svg
        aria-hidden
        className="absolute inset-0 ia-anim-rotate-slow"
        viewBox="0 0 280 280"
        style={{ animationDuration: "80s" }}
      >
        <circle
          cx="140"
          cy="140"
          r="132"
          fill="none"
          stroke="oklch(0.55 0.08 125 / 0.4)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
        />
        <circle
          cx="140"
          cy="140"
          r="108"
          fill="none"
          stroke="oklch(0.55 0.08 125 / 0.22)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Olive glow atrás do frame */}
      <div
        aria-hidden
        className="absolute"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.75 0.20 122 / 0.42) 0%, transparent 65%)",
          filter: "blur(28px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Frame quadrado central com glassmorphism sutil */}
      <div
        className="absolute"
        style={{
          width: 168,
          height: 168,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid oklch(0.55 0.08 125 / 0.45)",
          borderRadius: "10px",
          backgroundColor: "oklch(0.08 0.01 122 / 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Camadas empilhadas do LogoMark — efeito de profundidade */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Camada traseira — escala maior + blur + low opacity */}
          <div
            aria-hidden
            className="absolute"
            style={{
              transform: "scale(1.2)",
              filter: "blur(10px)",
              opacity: 0.35,
            }}
          >
            <LogoMark size={68} />
          </div>
          {/* Camada média — sombra projetada */}
          <div
            aria-hidden
            className="absolute"
            style={{
              transform: "scale(1.06)",
              filter: "drop-shadow(0 8px 28px oklch(0.75 0.20 122 / 0.55))",
              opacity: 0.7,
            }}
          >
            <LogoMark size={68} />
          </div>
          {/* Camada frontal — nítida */}
          <LogoMark size={76} />
        </div>

        {/* Labels de canto — meta-info visual à la Stillwood */}
        <span
          className="absolute -top-3 left-4 text-[9px] uppercase tracking-[0.22em] font-semibold px-2"
          style={{
            color: "oklch(0.78 0.08 125)",
            backgroundColor: "var(--color-background)",
          }}
        >
          // iaplicada
        </span>
        <span
          className="absolute -bottom-3 right-4 text-[9px] uppercase tracking-[0.22em] font-semibold px-2"
          style={{
            color: "oklch(0.78 0.08 125)",
            backgroundColor: "var(--color-background)",
          }}
        >
          +17 pmes
        </span>
      </div>
    </div>
  );
}
