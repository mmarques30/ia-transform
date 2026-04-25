import type { CSSProperties } from "react";

interface LogoProps {
  showWordmark?: boolean;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Path to the official IAplicada logo asset (the file the user uploaded). */
const LOGO_SRC = "/brand/capa_biz_sistemas.jpg";

/**
 * IAplicada logo (mark + wordmark) using the OFFICIAL asset that lives in
 * /public/brand/. No SVG recreation anymore.
 */
export function Logo({ showWordmark = true, size = 32, className, style }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} style={style}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className="font-semibold tracking-tight text-foreground"
          style={{
            fontSize: size >= 32 ? "18px" : "16px",
            letterSpacing: "-0.02em",
          }}
        >
          iaplicada
        </span>
      )}
    </span>
  );
}

/** Standalone mark — uses the real official logo image. */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <img
      src={LOGO_SRC}
      width={size}
      height={size}
      alt="IAplicada"
      className={className}
      style={{
        display: "block",
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.21), // ~13/64 to match the rounded square
        objectFit: "cover",
      }}
    />
  );
}

/**
 * Animated mark — same official logo with tech motion (orbit halo, breath,
 * pulse glow). The diamond pulse precisava de SVG separado então removi:
 * agora o efeito vem de glow + breathe + orbit ao redor da imagem real.
 */
export function AnimatedLogoMark({ size = 96, className }: LogoMarkProps) {
  const radius = Math.round(size * 0.21);
  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer rotating halo — "tech orbit" feeling */}
      <span
        className="ia-anim-orbit absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.82 0.2 115 / 0.6) 80deg, transparent 160deg, oklch(0.62 0.17 125 / 0.5) 260deg, transparent 340deg)",
          filter: "blur(12px)",
          opacity: 0.85,
        }}
      />
      {/* Glow pulse layer */}
      <span
        className="ia-anim-pulse-glow absolute inset-0"
        style={{
          backgroundColor: "oklch(0.82 0.2 115 / 0.6)",
          filter: "blur(20px)",
          borderRadius: radius,
        }}
      />

      {/* The mark — breathes subtly */}
      <img
        src={LOGO_SRC}
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
