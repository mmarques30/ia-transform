export function Footer() {
  return (
    <footer
      className="py-20 border-t border-border"
      style={{ backgroundColor: "oklch(0.155 0.035 122)" }}
    >
      <div className="container-page">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  IA
                </span>
              </div>
              <span className="text-foreground font-semibold tracking-tight">
                IAplicada
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              IAplicada é a casa da IA aplicada ao trabalho real.
            </p>
            <p className="mt-4 text-xs text-primary-glow font-mono">
              #menoshypemaisentrega
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Business",
                "Academy",
                "Skills",
                "Blog",
                "Contato",
                "Termos",
                "Privacidade",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sage hover:text-foreground transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Redes
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#" className="text-sage hover:text-foreground transition-colors">
                  LinkedIn — Mariana Marques
                </a>
              </li>
              <li>
                <a href="#" className="text-sage hover:text-foreground transition-colors">
                  Instagram — @marimarquescb
                </a>
              </li>
              <li>
                <a href="#" className="text-sage hover:text-foreground transition-colors">
                  YouTube — @iaplicadaa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 IAplicada · CNPJ 00.000.000/0001-00</span>
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
