import type { CSSProperties } from "react";

interface LogoProps {
  variant?: "default" | "mono-dark" | "mono-light";
  showWordmark?: boolean;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * IAplicada logo — uses /brand/logo.svg so the user can drop-in replace the official asset
 * at any time without touching code.
 */
export function Logo({
  variant = "default",
  showWordmark = true,
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
      <img
        src="/brand/logo.svg"
        width={size}
        height={size}
        alt="IAplicada"
        style={{ display: "block", width: size, height: size }}
      />
      {showWordmark && (
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
