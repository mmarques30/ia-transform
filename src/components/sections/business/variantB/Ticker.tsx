/**
 * Ticker (dobra 2 LP-B) — faixa horizontal animada inserida entre
 * o Hero e a Problem. Serve como separador visual + cintura de
 * prova social antes de entrar na narrativa do problema.
 *
 * Copy LP-B abre com o hook do ângulo (operação fragmentada → escala)
 * e emenda com 4 cases reais nomeados.
 */

const TICKER_ITEMS = [
  "De operação fragmentada a operação que escala",
  "PSA Consultores · 110+ profissionais num único sistema",
  "Quadra Arquitetura · R$10k contratado, R$32k+ entregue",
  "Turystar · 17.886 vendas processadas no ERP",
  "CB Move · de 30 a 100+ pacientes sem contratar",
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
