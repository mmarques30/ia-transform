import { ArrowRight } from "lucide-react";
import { scrollToForm } from "./scrollToForm";

interface CtaButtonProps {
  children: React.ReactNode;
  size?: "md" | "sm";
  className?: string;
  /** Padrão: rola até o formulário do hero. */
  onClick?: () => void;
}

/** Botão principal da LP: pill lime com a seta num círculo escuro. */
export function CtaButton({ children, size = "md", className = "", onClick }: CtaButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick ?? scrollToForm}
      className={`lpx-btn${size === "sm" ? " lpx-btn--sm" : ""} ${className}`}
    >
      <span>{children}</span>
      <span className="lpx-btn-arrow" aria-hidden>
        <ArrowRight className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} strokeWidth={2.2} />
      </span>
    </button>
  );
}
