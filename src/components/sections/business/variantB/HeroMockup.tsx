import { PainelVetra } from "./painel/PainelVetra";
import { PainelScaler } from "./painel/PainelScaler";

/**
 * HeroMockup (LP-B) — painel V4 Vetra escalado via transform pra
 * manter proporção horizontal em qualquer coluna.
 *
 * O painel é desenhado horizontal (990px de largura nativa). Sem o
 * scaler, ele reflow em coluna estreita — KPIs quebram em 3 linhas,
 * cards de decisão esmagam. PainelScaler resolve mantendo o painel
 * SEMPRE 990px internamente e aplicando transform: scale().
 */
export function HeroMockup() {
  return (
    <PainelScaler>
      <PainelVetra />
    </PainelScaler>
  );
}
