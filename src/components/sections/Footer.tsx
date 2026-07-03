import { Logo } from "@/components/Logo";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marianamarquescabral/" },
  { label: "Instagram", href: "https://www.instagram.com/marimarquescb/" },
];

/**
 * Footer compacto — single-row no desktop, stack no mobile.
 * Contém: logo · #hashtag | redes | © + email + telefone.
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
            <span
              className="text-[10.5px] font-mono"
              style={{ color: "var(--color-primary)" }}
            >
              #menoshypemaisentrega
            </span>
          </div>

          {/* Redes */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
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
              href="mailto:comercial@iaplicada.com"
              className="hover:text-foreground transition-colors"
            >
              comercial@iaplicada.com
            </a>
            <a
              href="tel:+5511950566101"
              className="hover:text-foreground transition-colors"
            >
              (11) 95056-6101
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
