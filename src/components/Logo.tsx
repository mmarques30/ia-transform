import type { CSSProperties } from "react";

interface LogoProps {
  /** Altura em pixels da logo. Default 22 (compacto pra header). */
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Variant baseada no fundo onde a logo será exibida. Default "dark". */
  variant?: "dark" | "light";
}

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Menu logo (bf-logo.jpg de ibb.co, 173x41) inline como data URI
 *  pra evitar 1 request extra e pra viabilizar commitar sem push
 *  binário via API. Ratio 173/41 ≈ 4.22 — layout do Header/Footer
 *  não muda (era 2108/500 ≈ 4.22). */
const LOGO_MENU_SRC =
  "data:image/jpeg;base64,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";
/** Marca completa oficial — versão pra fundo claro (usa asset webp+png). */
const LOGO_LIGHT_WEBP = "/brand/iaplicada-logo-light.webp";
const LOGO_LIGHT_PNG = "/brand/iaplicada-logo-light.png";
/** Aspect ratio do menu logo (173x41). */
const LOGO_FULL_RATIO = 173 / 41;

/** Path da imagem quadrada (ainda usado em Authority + AnimatedLogoMark). */
const LOGO_MARK_SRC = "/brand/capa_biz_sistemas.jpg";

/**
 * Logo IAplicada — símbolo oficial + wordmark. `variant="dark"` (default)
 * usa a versão pensada pra fundos escuros; `variant="light"` é o asset
 * antigo pra fundos creme.
 *
 * Renderiza via <picture> com WebP primário + PNG fallback. WebP economiza
 * ~20 kB de download (39 kB PNG → 19 kB WebP, mesma qualidade visual).
 */
export function Logo({ size = 22, className, style, variant = "dark" }: LogoProps) {
  const width = Math.round(size * LOGO_FULL_RATIO);
  if (variant === "light") {
    return (
      <picture>
        <source srcSet={LOGO_LIGHT_WEBP} type="image/webp" />
        <img
          src={LOGO_LIGHT_PNG}
          alt="IAplicada"
          width={width}
          height={size}
          decoding="async"
          className={className}
          style={{ display: "block", height: size, width: "auto", ...style }}
        />
      </picture>
    );
  }
  return (
    <img
      src={LOGO_MENU_SRC}
      alt="IAplicada"
      width={width}
      height={size}
      decoding="async"
      className={className}
      style={{ display: "block", height: size, width: "auto", ...style }}
    />
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
