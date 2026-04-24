import type { CSSProperties } from "react";

interface LogoProps {
  variant?: "default" | "mono-dark" | "mono-light";
  showWordmark?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * IAplicada wordmark with geometric mark.
 * The mark is a stylized "i·A" glyph — a tall stroke + a dot + a triangular A.
 */
export function Logo({ variant = "default", showWordmark = true, className, style }: LogoProps) {
  const markColor =
    variant === "mono-light"
      ? "oklch(1 0 0)"
      : variant === "mono-dark"
        ? "oklch(0.18 0.02 122)"
        : "var(--color-accent)";
  const accentColor =
    variant === "mono-light" || variant === "mono-dark" ? markColor : "var(--color-primary)";
  const wordColor =
    variant === "mono-light"
      ? "oklch(1 0 0)"
      : variant === "mono-dark"
        ? "oklch(0.18 0.02 122)"
        : "var(--color-foreground)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} style={style}>
      <LogoMark markColor={markColor} accentColor={accentColor} />
      {showWordmark && (
        <span
          className="font-semibold tracking-tight"
          style={{
            color: wordColor,
            fontSize: "17px",
            letterSpacing: "-0.02em",
          }}
        >
          iaplicada
        </span>
      )}
    </span>
  );
}

function LogoMark({
  markColor,
  accentColor,
  size = 28,
}: {
  markColor: string;
  accentColor: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill={markColor} />
      {/* "i" stem */}
      <rect x="8.5" y="12" width="2.6" height="12" rx="1.3" fill="oklch(1 0 0)" />
      {/* "i" dot — accent */}
      <circle cx="9.8" cy="8.6" r="1.6" fill={accentColor} />
      {/* "A" — two strokes forming a triangle */}
      <path
        d="M15 24 L19 8 L23 24"
        stroke="oklch(1 0 0)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "A" crossbar */}
      <path d="M16.7 18 H 21.3" stroke="oklch(1 0 0)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
