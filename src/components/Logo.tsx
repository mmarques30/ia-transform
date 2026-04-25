import type { CSSProperties } from "react";

interface LogoProps {
  /** Altura em pixels da logo. Default 22 (compacto pra header). */
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Esconde o wordmark "IAplicada" — útil pra contextos de só ícone. */
  iconOnly?: boolean;
}

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Path da imagem quadrada (ainda usado em Authority + AnimatedLogoMark). */
const LOGO_MARK_SRC = "/brand/capa_biz_sistemas.jpg";

const PETAL_DARK = "oklch(0.42 0.13 125)";
const PETAL_BRIGHT = "oklch(0.72 0.2 122)";

/** Quatrefoil (4 pétalas, 2 tons de oliva) — versão SVG inline da marca. */
function Quatrefoil({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="-32 -32 64 64"
      width={size}
      height={size}
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      {[
        { rot: 45, fill: PETAL_DARK },
        { rot: 135, fill: PETAL_BRIGHT },
        { rot: 225, fill: PETAL_DARK },
        { rot: 315, fill: PETAL_BRIGHT },
      ].map(({ rot, fill }) => (
        <ellipse
          key={rot}
          cx="0"
          cy="-15"
          rx="11"
          ry="17"
          fill={fill}
          transform={`rotate(${rot})`}
        />
      ))}
    </svg>
  );
}

/**
 * Logo IAplicada — SVG inline (sem fundo preto), com mark + wordmark.
 * Tamanho default compacto (22px) pra caber em headers e footers sem dominar.
 */
export function Logo({ size = 22, className, style, iconOnly = false }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className ?? ""}`}
      style={style}
    >
      <Quatrefoil size={size} />
      {!iconOnly && (
        <span
          className="font-semibold tracking-tight text-foreground"
          style={{
            fontSize: Math.round(size * 0.78),
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          IAplicada
        </span>
      )}
    </span>
  );
}

/** Mark quadrada — só o ícone (mantida pra Authority etc). */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <img
      src={LOGO_MARK_SRC}
      width={size}
      height={size}
      alt="IAplicada"
      className={className}
      style={{
        display: "block",
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.21),
        objectFit: "cover",
      }}
    />
  );
}

/** Mark animada (orbit halo + breath + glow). */
export function AnimatedLogoMark({ size = 96, className }: LogoMarkProps) {
  const radius = Math.round(size * 0.21);
  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="ia-anim-orbit absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.82 0.2 115 / 0.6) 80deg, transparent 160deg, oklch(0.62 0.17 125 / 0.5) 260deg, transparent 340deg)",
          filter: "blur(12px)",
          opacity: 0.85,
        }}
      />
      <span
        className="ia-anim-pulse-glow absolute inset-0"
        style={{
          backgroundColor: "oklch(0.82 0.2 115 / 0.6)",
          filter: "blur(20px)",
          borderRadius: radius,
        }}
      />
      <img
        src={LOGO_MARK_SRC}
        alt=""
        className="ia-anim-breathe relative"
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: radius,
          objectFit: "cover",
          filter: "drop-shadow(0 8px 24px oklch(0.58 0.16 125 / 0.4))",
        }}
      />
    </div>
  );
}
