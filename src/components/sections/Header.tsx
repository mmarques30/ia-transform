import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

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
          <Logo />
          <span
            className="hidden sm:inline text-muted-foreground text-[13px] font-normal ml-1"
            style={{ marginLeft: "2px" }}
          >
            · Business
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
          href="#top"
          className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground font-semibold text-[13px] px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Agendar diagnóstico
        </a>
      </div>
    </header>
  );
}
