import type { CSSProperties } from "react";

interface LogoProps {
  variant?: "default" | "mono-dark" | "mono-light";
  showWordmark?: boolean;
  markOnly?: boolean;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * IAplicada logo — 4-petal flower with center diamond on a rounded olive square.
 * The mark is a geometric glyph made of 4 rounded quadrants separated by a thin cross,
 * with a small diamond in the negative space at the center.
 */
export function Logo({
  variant = "default",
  showWordmark = true,
  markOnly = false,
  size = 32,
  className,
  style,
}: LogoProps) {
  const wordColor =
    variant === "mono-light"
      ? "oklch(1 0 0)"
      : variant === "mono-dark"
        ? "oklch(0.18 0.02 122)"
        : "var(--color-foreground)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} style={style}>
      <LogoMark variant={variant} size={size} />
      {showWordmark && !markOnly && (
        <span
          className="font-semibold tracking-tight"
          style={{
            color: wordColor,
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

export function LogoMark({
  variant = "default",
  size = 32,
}: {
  variant?: "default" | "mono-dark" | "mono-light";
  size?: number;
}) {
  const bgColor =
    variant === "mono-light"
      ? "oklch(1 0 0)"
      : variant === "mono-dark"
        ? "oklch(0.18 0.02 122)"
        : "oklch(0.62 0.17 125)"; // olive/lime
  const markColor = variant === "mono-light" ? "oklch(0.18 0.02 122)" : "oklch(1 0 0)"; // white petals by default

  // Unique id keeps multiple instances on the same page from colliding.
  const maskId = `ia-mark-${variant}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* What stays visible */}
          <rect width="64" height="64" fill="black" />
          {/* Big circle → becomes the "flower" outline */}
          <circle cx="32" cy="32" r="23" fill="white" />
          {/* Cross cutouts create 4 petals */}
          <rect x="29.5" y="6" width="5" height="52" fill="black" />
          <rect x="6" y="29.5" width="52" height="5" fill="black" />
          {/* Diamond in the center */}
          <path d="M32 27.5 L36.5 32 L32 36.5 L27.5 32 Z" fill="white" />
        </mask>
      </defs>
      {/* Background rounded square */}
      <rect width="64" height="64" rx="12" fill={bgColor} />
      {/* Flower mark */}
      <rect width="64" height="64" fill={markColor} mask={`url(#${maskId})`} />
    </svg>
  );
}
