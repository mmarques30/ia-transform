import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "#sistemas", label: "Sistemas" },
  { href: "#abordagem", label: "Abordagem" },
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
      className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Ornamento geométrico scroll-aware atrás de tudo */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-60"
        }`}
      >
        {/* Polígono angular esquerdo — mesma família da diagonal do OliveWave */}
        <svg
          className="absolute -left-8 top-0 h-full w-[420px]"
          viewBox="0 0 420 72"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hdr-grad-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,0 280,0 360,72 0,72" fill="url(#hdr-grad-l)" />
          <line
            x1="280"
            y1="0"
            x2="360"
            y2="72"
            stroke="oklch(0.75 0.20 122)"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        </svg>

        {/* Polígono angular direito — espelhado */}
        <svg
          className="absolute -right-8 top-0 h-full w-[380px]"
          viewBox="0 0 380 72"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hdr-grad-r" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <polygon points="60,0 380,0 380,72 0,72" fill="url(#hdr-grad-r)" />
          <line
            x1="60"
            y1="0"
            x2="0"
            y2="72"
            stroke="oklch(0.75 0.20 122)"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        </svg>

        {/* Glow ambient atrás da logo */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[140px] w-[280px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.25), transparent 70%)",
          }}
        />

      </div>

      <div className="container-page flex items-center justify-between w-full relative z-10">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={26} />
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
          className="inline-flex items-center gap-1.5 justify-center rounded-md bg-primary text-primary-foreground font-semibold text-[13px] px-4 py-2.5 hover:bg-primary/90 transition-colors"
        >
          Agendar diagnóstico
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
