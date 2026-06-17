import { Logo } from "@/components/Logo";

const PRODUCTS = [
  { label: "Business", href: "/" },
  { label: "Academy", href: "https://academy.iaplicada.com" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marianamarquescabral/" },
  { label: "Instagram", href: "https://www.instagram.com/marimarquescb/" },
  { label: "YouTube", href: "https://www.youtube.com/@iaplicadaa" },
];

/**
 * Footer compacto — single-row no desktop, stack no mobile.
 * Versão anterior tinha 3 colunas grandes + bottom row separada,
 * ocupando muito espaço vertical. Agora tudo numa linha enxuta:
 * logo · tagline · #hashtag | produtos · redes | © + email.
 */
export function Footer() {
  return (
    <footer className="py-6 border-t border-border bg-background">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-6">
          {/* Brand */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Logo size={20} />
              <span
                className="text-muted-foreground text-[12px] font-normal border-l border-border pl-2.5 ml-0.5"
                style={{ letterSpacing: "0.02em" }}
              >
                Business
              </span>
            </div>
            <span className="text-[11.5px] text-muted-foreground">
              IA aplicada ao trabalho real.
            </span>
            <span
              className="text-[10.5px] font-mono"
              style={{ color: "var(--color-primary)" }}
            >
              #menoshypemaisentrega
            </span>
          </div>

          {/* Links inline */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
              Produtos
            </span>
            {PRODUCTS.map((p) => {
              const external = p.href.startsWith("http");
              return (
                <a
                  key={p.label}
                  href={p.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-sage hover:text-foreground transition-colors"
                >
                  {p.label}
                </a>
              );
            })}
            <span
              aria-hidden
              className="hidden sm:inline-block h-3 w-px bg-border"
            />
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
              Redes
            </span>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-foreground transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Copyright + contato */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span>© 2026 IAplicada</span>
            <a
              href="mailto:equipe@iaplicada.com"
              className="hover:text-foreground transition-colors"
            >
              equipe@iaplicada.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
