/**
 * IABackground — camada de fundo escuro/técnica usada nas dobras
 * da LP `/`. Grade blueprint deslizando + glows verdes que derivam
 * + feixe varrendo + sparks ✱ + grão + sistema fantasma (só ALTA).
 *
 * Regras (do brief):
 * - Vai atrás do conteúdo (position:absolute inset:0 z-index:0)
 * - Pointer-events desligado
 * - Section wrapper precisa position:relative overflow:hidden
 * - Conteúdo do wrapper vai em z-index:1
 *
 * 3 intensidades:
 * - "alta"  → header e CTA final (glow direito emoldura o form)
 * - "media" → dobras intermediárias (só grid + glow-1 mais suave)
 * - "baixa" → dobras com visual próprio (só grade + grão)
 *
 * O CSS mora em styles.css sob o prefixo `.ia-bg`. Animação
 * respeita prefers-reduced-motion e reduz peso no mobile.
 */
export type IABackgroundIntensity = "alta" | "media" | "baixa";

interface IABackgroundProps {
  intensity: IABackgroundIntensity;
}

export function IABackground({ intensity }: IABackgroundProps) {
  return (
    <div className={`ia-bg ia-bg--${intensity}`} aria-hidden="true">
      <div className="ia-bg__grid" />
      {intensity !== "baixa" ? <div className="ia-bg__glow ia-bg__glow--1" /> : null}
      {intensity === "alta" ? <div className="ia-bg__glow ia-bg__glow--2" /> : null}
      {intensity !== "baixa" ? <div className="ia-bg__sweep" /> : null}
      {intensity !== "baixa" ? (
        <>
          <div className="ia-bg__spark" style={{ top: "14%", left: "38%" }}>
            ✱
          </div>
          <div className="ia-bg__spark" style={{ top: "70%", left: "24%" }}>
            ✱
          </div>
          <div className="ia-bg__spark" style={{ top: "26%", right: "34%" }}>
            ✱
          </div>
        </>
      ) : null}
      <div className="ia-bg__grain" />
      {intensity === "alta" ? (
        <div className="ia-bg__ghost">
          <div className="ia-bg__ghost-win">
            <div className="ia-bg__ghost-row" style={{ top: "22%", width: "60%" }} />
            <div className="ia-bg__ghost-row" style={{ top: "30%", width: "44%" }} />
            <div className="ia-bg__ghost-row" style={{ top: "38%", width: "52%" }} />
            <div className="ia-bg__ghost-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
