import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

const DEFAULT_NAV = [
  { href: "#sistemas", label: "Sistemas" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#time", label: "Time" },
  { href: "#faq", label: "FAQ" },
];

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  /**
   * Caminho da LP de origem desta página (default "/"). Usado pelo clique
   * no logo: se já estamos na rota destino, faz scroll-to-top; senão,
   * navega de volta. Necessário pra que o logo numa thank-you page de
   * uma vertical (ex: /contabil-thank-you) volte pra LP correta da
   * vertical (/contabil), não pra LP business raiz.
   */
  homePath?: string;
  /**
   * Esconde o CTA "Agendar diagnóstico" do header. Usado em LPs onde a
   * conversão acontece via modal disparado por CTAs internos (ex:
   * /contabilcalculo), pra evitar concorrência com o fluxo principal.
   * Quando true, a nav fica alinhada à direita via justify-between.
   */
  hideCta?: boolean;
  /**
   * Lista customizada de itens da nav. Default = NAV principal (Sistemas /
   * Abordagem / Time / FAQ). LPs como /contabilcalculo passam um set
   * próprio com âncoras que de fato existem na página.
   */
  nav?: NavItem[];
  /**
   * Label da pílula de contexto ao lado do logo. Default detecta pela
   * homePath ("/contabil*" → "Contábil", outros → "Business"). LPs podem
   * sobrescrever quando o logo aponta pra uma rota diferente da vertical
   * (ex: /contabilcalculo com homePath="/" mas badge "Contábil").
   */
  badgeLabel?: string;
  /**
   * Tema visual do header. Default "dark" mantém o look atual (charcoal
   * com nav muted/sage). "light" usa paleta academy (cream/cocoa) — apenas
   * a LP / passa light. Demais LPs seguem dark intactas.
   */
  theme?: "dark" | "light";
}

export function Header({
  homePath = "/",
  hideCta = false,
  nav = DEFAULT_NAV,
  badgeLabel,
  theme = "dark",
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLight = theme === "light";

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
          ? isLight
            ? "backdrop-blur-lg border-b"
            : "bg-background/80 backdrop-blur-lg border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
      style={
        isLight && scrolled
          ? {
              backgroundColor: "rgba(255, 255, 246, 0.85)",
              borderBottomColor: "rgba(13, 13, 13, 0.08)",
            }
          : undefined
      }
    >
      {/* Ornamento geométrico (só na variante dark — light é minimal) */}
      {!isLight && <div
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

      </div>}

      <div className="container-page flex items-center justify-between w-full relative z-10">
        <Link
          to={homePath}
          className="flex items-center gap-2.5"
          onClick={() => {
            // Já estamos na LP destino: complementa a navegação com scroll
            // pro topo. Em rotas diferentes (ex: numa thank-you page), o
            // Link cuida da navegação real.
            if (location.pathname === homePath) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo size={26} variant={isLight ? "light" : "dark"} />
          {!isLight && (
            <span
              className="hidden sm:inline text-[13px] font-normal pl-3 ml-1"
              style={{
                letterSpacing: "0.02em",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <span className="text-muted-foreground">
                {badgeLabel ?? (homePath.startsWith("/contabil") ? "Contábil" : "Business")}
              </span>
            </span>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13.5px] transition-colors font-medium ${
                isLight ? "" : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                isLight
                  ? { color: "var(--academy-cocoa-soft)" }
                  : undefined
              }
              onMouseEnter={
                isLight
                  ? (e) => (e.currentTarget.style.color = "var(--academy-cocoa)")
                  : undefined
              }
              onMouseLeave={
                isLight
                  ? (e) => (e.currentTarget.style.color = "var(--academy-cocoa-soft)")
                  : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {!hideCta &&
          (isLight ? (
            <a href="#diagnostico-form" className="btn-primary-academy text-[13px]">
              Agendar diagnóstico
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-1.5 justify-center rounded-md bg-primary text-primary-foreground font-semibold text-[13px] px-4 py-2.5 hover:bg-primary/90 transition-colors"
            >
              Agendar diagnóstico
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ))}
      </div>
    </header>
  );
}
