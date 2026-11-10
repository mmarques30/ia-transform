import { useEffect, useState } from "react";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";
import { CtaButton } from "./CtaButton";

interface NavCopy {
  links: Array<{ id: string; label: string }>;
  cta: string;
  ctaShort: string;
}

const NAV_PT: NavCopy = {
  links: [
    { id: "metodo-aplica", label: "Método" },
    { id: "a-conta", label: "A conta" },
    { id: "depoimentos", label: "Resultados" },
    { id: "time", label: "Time" },
    { id: "faq", label: "Dúvidas" },
  ],
  cta: "Diagnóstico gratuito",
  ctaShort: "Diagnóstico",
};

const COPY: LpCopy<NavCopy> = {
  "pt-br": NAV_PT,
  en: {
    links: [
      { id: "metodo-aplica", label: "Method" },
      { id: "a-conta", label: "The math" },
      { id: "depoimentos", label: "Results" },
      { id: "time", label: "Team" },
      { id: "faq", label: "FAQ" },
    ],
    cta: "Free diagnostic",
    ctaShort: "Diagnostic",
  },
};

/**
 * Menu superior fixo: barra de vidro em pill que ganha fundo ao rolar,
 * links pras dobras com a seção atual marcada e o CTA que leva ao form.
 */
export function LpNav() {
  const c = useLpCopy(COPY);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = c.links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [c.links]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="lpx-nav" data-scrolled={scrolled}>
      <div className="lpx-wrap">
        <nav className="lpx-nav-bar" aria-label="Principal">
          <a
            href="#top"
            onClick={go("top")}
            className="flex items-center shrink-0"
            aria-label="IAplicada"
          >
            <img
              src="/brand/iaplicada-logo-dark.png"
              alt="IAplicada"
              height={26}
              style={{ height: 26, width: "auto" }}
            />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {c.links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="lpx-navlink"
                data-active={active === l.id}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden sm:block">
            <CtaButton size="sm">{c.cta}</CtaButton>
          </div>
          <div className="sm:hidden">
            <CtaButton size="sm">{c.ctaShort}</CtaButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
