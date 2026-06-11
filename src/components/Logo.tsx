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

/** Marca completa oficial — versão pra fundo escuro (default na LP dark).
 *  WebP é o primário (~19 kB, 50% menor que PNG). PNG fica como fallback
 *  via <picture> pra browsers muito antigos (sem suporte WebP). */
const LOGO_DARK_WEBP = "/brand/iaplicada-logo-dark.webp";
const LOGO_DARK_PNG = "/brand/iaplicada-logo-dark.png";
/** Marca completa oficial — versão pra fundo claro. */
const LOGO_LIGHT_WEBP = "/brand/iaplicada-logo-light.webp";
const LOGO_LIGHT_PNG = "/brand/iaplicada-logo-light.png";
/** Aspect ratio do PNG oficial (2108x500). */
const LOGO_FULL_RATIO = 2108 / 500;

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
  const webpSrc = variant === "light" ? LOGO_LIGHT_WEBP : LOGO_DARK_WEBP;
  const pngSrc = variant === "light" ? LOGO_LIGHT_PNG : LOGO_DARK_PNG;
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt="IAplicada"
        width={width}
        height={size}
        decoding="async"
        className={className}
        style={{
          display: "block",
          height: size,
          width: "auto",
          ...style,
        }}
      />
    </picture>
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
