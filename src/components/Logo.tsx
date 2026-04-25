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
        <mask id={`ia-mark-mask-${size}`}>
          <rect width="64" height="64" fill="black" />
          <circle cx="32" cy="32" r="23" fill="white" />
          <rect x="30" y="6" width="4" height="52" rx="2" fill="black" />
          <rect x="6" y="30" width="52" height="4" rx="2" fill="black" />
          <polygon points="32,28 36,32 32,36 28,32" fill="white" />
        </mask>
      </defs>
      <rect width="64" height="64" rx="13" fill="#8BAB23" />
      <rect width="64" height="64" fill="white" mask={`url(#ia-mark-mask-${size})`} />
    </svg>
  );
}

/**
 * Animated mark — same glyph but with tech motion inspired by AI brand identities
 * (Caitlyn / Kallan-style). The whole symbol breathes (subtle scale + glow pulse),
 * the diamond at the center pulses out of phase, and a soft halo orbits around the
 * rounded square. Keeps everything readable and respects prefers-reduced-motion.
 */
export function AnimatedLogoMark({ size = 96, className }: LogoMarkProps) {
  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer rotating halo — creates the "tech orbit" feeling */}
      <span
        className="absolute inset-0 rounded-full motion-safe:animate-[ia-orbit_22s_linear_infinite]"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.82 0.2 115 / 0.55) 80deg, transparent 160deg, oklch(0.62 0.17 125 / 0.4) 260deg, transparent 340deg)",
          filter: "blur(10px)",
          transform: "scale(1.45)",
          opacity: 0.7,
        }}
      />
      {/* Glow pulse layer */}
      <span
        className="absolute inset-0 rounded-[18px] motion-safe:animate-[ia-pulse-glow_3.6s_ease-in-out_infinite]"
        style={{
          backgroundColor: "oklch(0.82 0.2 115 / 0.5)",
          filter: "blur(18px)",
        }}
      />

      {/* The mark itself — breathes subtly */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative motion-safe:animate-[ia-breathe_4s_ease-in-out_infinite]"
        style={{ display: "block", filter: "drop-shadow(0 8px 24px oklch(0.58 0.16 125 / 0.35))" }}
      >
        <defs>
          <mask id={`ia-mark-anim-${size}`}>
            <rect width="64" height="64" fill="black" />
            <circle cx="32" cy="32" r="23" fill="white" />
            <rect x="30" y="6" width="4" height="52" rx="2" fill="black" />
            <rect x="6" y="30" width="52" height="4" rx="2" fill="black" />
          </mask>
        </defs>
        <rect width="64" height="64" rx="13" fill="#8BAB23" />
        <rect width="64" height="64" fill="white" mask={`url(#ia-mark-anim-${size})`} />
        {/* Diamond pulses out of phase */}
        <polygon
          points="32,28 36,32 32,36 28,32"
          fill="white"
          className="motion-safe:animate-[ia-diamond_2.4s_ease-in-out_infinite]"
          style={{ transformOrigin: "32px 32px", transformBox: "fill-box" }}
        />
      </svg>
    </div>
  );
}
