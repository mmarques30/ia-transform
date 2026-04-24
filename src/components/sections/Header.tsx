import { useEffect, useState } from "react";

const NAV = [
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
      className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-colors duration-200 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between w-full">
        <a href="#top" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">IA</span>
          </div>
          <span className="text-foreground font-semibold tracking-tight">
            IAplicada
            <span className="text-muted-foreground font-normal"> · Business</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta-final"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 hover:bg-primary-glow transition-colors"
        >
          Agendar diagnóstico
        </a>
      </div>
    </header>
  );
}
