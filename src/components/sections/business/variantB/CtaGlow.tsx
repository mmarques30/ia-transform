import { Link } from "@tanstack/react-router";

interface CtaGlowProps {
  children: React.ReactNode;
  /** Rota interna. Default: /businessv2/diagnostico. */
  to?: string;
  /** Formato pílula (default hero) vs retângulo arredondado (default nas outras seções). */
  shape?: "pill" | "rect";
  /** Tamanho do glow — hero usa "xl" (maior + com box-shadow pulsante). */
  size?: "md" | "lg" | "xl";
  className?: string;
}

/**
 * CTA gigante lime com glow pulsante — CTA principal de conversão da LP-B.
 *
 * Sempre navega pra rota externa do form (não abre modal, não faz scroll pra
 * âncora). Cada aparecimento na LP conta como impressão, cada clique é
 * trackado no CRM como fonte do lead.
 */
export function CtaGlow({
  children,
  to = "/businessv2/diagnostico",
  shape = "rect",
  size = "lg",
  className = "",
}: CtaGlowProps) {
  const padding =
    size === "xl"
      ? "px-8 py-[22px] text-[15px]"
      : size === "lg"
        ? "px-7 py-5 text-[13.5px] lg:text-[14.5px]"
        : "px-6 py-4 text-[13px]";
  const radius = shape === "pill" ? "rounded-full" : "rounded-[10px]";

  return (
    <Link
      to={to}
      className={`cta-glow-btn inline-flex items-center justify-center gap-2.5 ${padding} ${radius} font-black uppercase tracking-[0.06em] no-underline ${className}`}
      style={{
        background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
        color: "#0a0c07",
        boxShadow:
          "0 0 0 6px rgba(200,224,64,0.15), 0 24px 48px -14px rgba(200,224,64,0.5), inset 0 -2px 0 rgba(0,0,0,0.2)",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}
