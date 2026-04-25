import type { CSSProperties } from "react";

interface LogoProps {
  /** Altura em pixels da logo horizontal. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Logo horizontal completa (mark + wordmark) — fundo escuro embutido. */
const LOGO_FULL_SRC = "/brand/iaplicada-logo.jpg";
/** Mark quadrada (só o ícone) — usada em pontos isolados (ex.: Authority). */
const LOGO_MARK_SRC = "/brand/capa_biz_sistemas.jpg";

/**
 * Logo horizontal completa da IAplicada — usa o asset oficial em
 * /public/brand/iaplicada-logo.jpg. Como a imagem já contém o wordmark, não
 * acrescentamos texto "iaplicada" ao lado.
 */
export function Logo({ size = 34, className, style }: LogoProps) {
  return (
    <img
      src={LOGO_FULL_SRC}
      alt="IAplicada"
      className={className}
      style={{
        display: "block",
        height: size,
        width: "auto",
        borderRadius: Math.round(size * 0.18),
        objectFit: "contain",
        ...style,
      }}
    />
  );
}

/** Mark quadrada — só o ícone, fundo embutido. */
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

/**
 * Mark animada (orbit halo + breath + glow). Mantém a versão quadrada da
 * marca pra preservar o impacto visual no Authority.
 */
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
