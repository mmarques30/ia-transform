/**
 * Ticker (dobra 2 LP-C) — faixa horizontal animada entre o Hero
 * e o Problem, com 5 cases nomeados e métricas auditadas.
 * Reforça o ângulo "prova social pura" da LP-C.
 */

const TICKER_ITEMS = [
  "PSA · assertividade tributária 85%→94%",
  "CB Move · +233% de pacientes · R$0 em headcount",
  "Borges & Zembruski · 190 processos · SDR autônomo",
  "Turystar · 17.886 vendas num ERP",
  "Quadra · +225% de valor entregue vs contratado",
];

export function Ticker() {
  const seq = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const FADE = "#0d1a0d";
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: FADE,
        borderTop: "1px solid oklch(0.28 0.04 122)",
        borderBottom: "1px solid oklch(0.28 0.04 122)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: `linear-gradient(90deg, ${FADE} 0%, transparent 100%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: `linear-gradient(270deg, ${FADE} 0%, transparent 100%)` }}
      />
      <div
        className="ticker-track py-3.5 select-none"
        style={{ cursor: "default", pointerEvents: "none" }}
        aria-hidden
      >
        {seq.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span
              className="text-[11.5px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap"
              style={{ color: "oklch(0.96 0.012 110)" }}
            >
              {item}
            </span>
            <span
              className="inline-block"
              style={{ color: "var(--color-primary)", fontSize: 9, lineHeight: 1 }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
