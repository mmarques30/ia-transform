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

/**
 * Símbolo oficial — flor de 4 pétalas + diamante central em branco sobre
 * quadrado oliva arredondado. Replica /public/brand/logo.svg inline pra
 * garantir nitidez em qualquer tamanho.
 */
function LogoSymbol({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <mask id="ia-logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
          <rect width="128" height="128" fill="black" />
          <circle cx="64" cy="64" r="48" fill="white" />
          <rect x="60" y="10" width="8" height="108" rx="4" fill="black" />
          <rect x="10" y="60" width="108" height="8" rx="4" fill="black" />
          <polygon points="64,57 71,64 64,71 57,64" fill="white" />
        </mask>
      </defs>
      <rect width="128" height="128" rx="24" fill="#8BAB23" />
      <rect width="128" height="128" fill="white" mask="url(#ia-logo-mask)" />
    </svg>
  );
}

/**
 * Logo IAplicada — símbolo oficial (SVG inline) + wordmark.
 * Tamanho compacto por default pra caber em headers e footers sem dominar.
 */
export function Logo({ size = 22, className, style, iconOnly = false }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className ?? ""}`}
      style={style}
    >
      <LogoSymbol size={size} />
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
