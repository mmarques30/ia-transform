import { ArrowRight } from "lucide-react";

/** Botão principal da /lead (pill lime com seta), abre o form do kit. */
export function LeadCta({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="lpx-btn">
      <span>{children}</span>
      <span className="lpx-btn-arrow" aria-hidden>
        <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </span>
    </button>
  );
}
