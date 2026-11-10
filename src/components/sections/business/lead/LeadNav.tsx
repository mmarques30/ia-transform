import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/** Menu fixo da /lead: logo e o botão que abre o form do kit. */
export function LeadNav({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="lpx-nav" data-scrolled={scrolled}>
      <div className="lpx-wrap">
        <nav className="lpx-nav-bar" aria-label="Principal">
          <a href="#lead-hero" className="flex shrink-0 items-center" aria-label="IAplicada">
            <img
              src="/brand/iaplicada-logo-dark.png"
              alt="IAplicada"
              height={26}
              style={{ height: 26, width: "auto" }}
            />
          </a>
          <span className="lpx-eyebrow hidden lg:inline-flex">Kit de Automação com IA</span>
          <button type="button" onClick={onOpenModal} className="lpx-btn lpx-btn--sm">
            <span>
              <span className="hidden sm:inline">Quero o kit gratuito</span>
              <span className="sm:hidden">Quero o kit</span>
            </span>
            <span className="lpx-btn-arrow" aria-hidden>
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
