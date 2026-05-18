import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/** Marca completa (mark + wordmark) — asset oficial em /public/brand/. */
const LOGO_FULL_SRC = "/brand/iaplicada-logo-menu.jpg";

const NAV = [
  { href: "#sistemas", label: "Sistemas" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#cases", label: "Cases" },
  { href: "#time", label: "Time" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-all duration-200 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between w-full">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={LOGO_FULL_SRC}
            alt="IAplicada"
            width={110}
            height={26}
            fetchPriority="high"
            decoding="async"
            style={{ height: 26, width: "auto", display: "block" }}
          />
          <span
            className="hidden sm:inline text-muted-foreground text-[13px] font-normal border-l border-border pl-3 ml-1"
            style={{ letterSpacing: "0.02em" }}
          >
            Business
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#diagnostico-form"
          className="inline-flex items-center gap-1.5 justify-center rounded-md bg-accent text-accent-foreground font-semibold text-[13px] px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Agendar diagnóstico
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
