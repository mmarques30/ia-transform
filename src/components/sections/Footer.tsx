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

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container-page">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={22} />
              <span
                className="text-muted-foreground text-[13px] font-normal border-l border-border pl-3 ml-1"
                style={{ letterSpacing: "0.02em" }}
              >
                Business
              </span>
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground leading-relaxed max-w-[280px]">
              IA aplicada ao trabalho real.
            </p>
            <p className="mt-3 text-[11px] font-mono" style={{ color: "var(--color-primary)" }}>
              #menoshypemaisentrega
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
              Produtos
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {PRODUCTS.map((p) => {
                const external = p.href.startsWith("http");
                return (
                  <li key={p.label}>
                    <a
                      href={p.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-sage hover:text-foreground transition-colors"
                    >
                      {p.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
              Redes
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-foreground transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap justify-between gap-3 text-[11px] text-muted-foreground">
          <span>© 2026 IAplicada</span>
          <a
            href="mailto:equipe@iaplicada.com"
            className="hover:text-foreground transition-colors"
          >
            equipe@iaplicada.com
          </a>
        </div>
      </div>
    </footer>
  );
}
