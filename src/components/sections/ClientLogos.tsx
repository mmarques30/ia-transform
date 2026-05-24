/**
 * Faixa de logos de clientes/empresas — marquee horizontal contínuo
 * (estilo "trusted by"). Usa wordmarks tipográficos por enquanto;
 * trocar por <img> quando os arquivos das logos chegarem em
 * /public/clients/logos/.
 */
const CLIENTS = [
  "PSA Consultores",
  "Focus FinTax",
  "LCR Contabilidade",
  "Borges & Zembruski",
  "Turystar",
  "Ambev",
  "Cimed",
  "Uiara Intimates",
];

export function ClientLogos() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section className="section-veil py-[56px] lg:py-[72px] overflow-hidden">
      <div className="container-page">
        <p className="text-center text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
          Empresas que já operam com a IAplicada
        </p>
      </div>

      <div className="relative mt-9 overflow-hidden">
        {/* Fades laterais */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(90deg, var(--color-background) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(270deg, var(--color-background) 0%, transparent 100%)",
          }}
        />

        <div className="ticker-track items-center" aria-hidden>
          {loop.map((name, i) => (
            <span key={i} className="inline-flex items-center gap-8 whitespace-nowrap">
              <span
                className="text-[20px] lg:text-[24px] font-bold tracking-tight transition-colors"
                style={{ color: "oklch(0.96 0.012 110 / 0.55)" }}
              >
                {name}
              </span>
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-primary)", opacity: 0.5 }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
