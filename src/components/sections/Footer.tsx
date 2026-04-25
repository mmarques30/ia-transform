import { Logo } from "@/components/Logo";

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
              {["Business", "Academy", "Skills"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sage hover:text-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
              Redes
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li>
                <a href="#" className="text-sage hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-sage hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sage hover:text-foreground transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap justify-between gap-3 text-[11px] text-muted-foreground">
          <span>© 2026 IAplicada</span>
          <a
            href="mailto:business@iaplicada.com"
            className="hover:text-foreground transition-colors"
          >
            business@iaplicada.com
          </a>
        </div>
      </div>
    </footer>
  );
}
