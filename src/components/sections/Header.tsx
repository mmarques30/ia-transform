import { useEffect, useState } from "react";

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
      className={`fixed top-0 inset-x-0 z-50 h-[68px] flex items-center transition-all duration-200 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between w-full">
        <a href="#top" className="flex items-center gap-2.5">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <span className="font-bold text-[11px]" style={{ color: "var(--color-primary-glow)" }}>
              IA
            </span>
          </div>
          <span className="text-foreground font-semibold tracking-tight text-[15px]">
            IAplicada
            <span className="text-muted-foreground font-normal"> · Business</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta-final"
          className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground font-semibold text-[13px] px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Agendar diagnóstico
        </a>
      </div>
    </header>
  );
}
