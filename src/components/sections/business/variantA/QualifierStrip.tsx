/**
 * QualifierStrip (LP-A) — barra vermelha do ICP, copy simplificada.
 *
 * Aparece no topo do Hero e no rodapé (antes do Footer). Filtra
 * visitantes fora do ICP (faturamento < R$1MM/ano) já no primeiro
 * pixel visível.
 *
 * Copy mais curta que o variantB — cortou "QUE QUEREM SAIR DO
 * OPERACIONAL" pra ficar direto no critério de faturamento.
 */
export function QualifierStrip() {
  return (
    <div
      className="text-white text-center font-extrabold text-[12px] sm:text-[13.5px] tracking-[0.06em] px-5 py-3.5"
      style={{ background: "linear-gradient(180deg, #dc2626, #b91c1c)" }}
    >
      EXCLUSIVO PARA DONOS DE EMPRESA COM{" "}
      <strong className="underline underline-offset-[3px]">
        FATURAMENTO A PARTIR DE R$ 1 MILHÃO/ANO
      </strong>
    </div>
  );
}
