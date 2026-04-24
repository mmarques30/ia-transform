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

/**
 * IAplicada logo (mark + wordmark).
 * SVG is inlined here so it never breaks due to asset serving / 404. The
 * file at /public/brand/logo.svg is kept in sync for OG/social use only.
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

/**
 * Just the mark — a rounded olive square with 4 white petals + a small
 * center diamond (the actual IAplicada glyph).
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <mask id="ia-mark-mask">
          <rect width="64" height="64" fill="black" />
          {/* Outer body that becomes the flower */}
          <circle cx="32" cy="32" r="23" fill="white" />
          {/* Cross cutouts with rounded ends → petals get rounded inner corners */}
          <rect x="30" y="6" width="4" height="52" rx="2" fill="black" />
          <rect x="6" y="30" width="52" height="4" rx="2" fill="black" />
          {/* Tiny diamond at the very center */}
          <polygon points="32,28 36,32 32,36 28,32" fill="white" />
        </mask>
      </defs>
      {/* Rounded olive square background */}
      <rect width="64" height="64" rx="13" fill="#8BAB23" />
      {/* White flower + diamond */}
      <rect width="64" height="64" fill="white" mask="url(#ia-mark-mask)" />
    </svg>
  );
}
