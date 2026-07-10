import { PainelVetra } from "./painel/PainelVetra";
import { PainelScaler } from "./painel/PainelScaler";

/**
 * HeroMockup (LP-B) — painel V4 Vetra em perspectiva 3D vazando pela
 * lateral direita da tela.
 *
 * Composição:
 *   1. Wrapper `.hero-mockup-3d` — perspective 1600px + rotate 3D
 *      no filho (rotateY -10deg com hover -6deg)
 *   2. Wrapper `.hero-mockup-bleed` — margin-right: -12vw pra o
 *      painel sangrar pra fora da coluna (o overflow-x: clip no
 *      grid do hero garante que não crie scroll horizontal)
 *   3. PainelScaler com factor 1.15 — escala 15% acima do que
 *      caberia no container, aumentando o tamanho visual do
 *      painel sem borrar (mantém aspect ratio interno)
 *
 * Mobile (<900px): o CSS `.hero-mockup-3d` remove o rotate 3D,
 * o bleed e volta scale 1 — o painel empilha abaixo do texto com
 * proporção normal.
 */
export function HeroMockup() {
  return (
    <div className="hero-mockup-3d">
      <div className="hero-mockup-bleed">
        <PainelScaler factor={1.15}>
          <PainelVetra />
        </PainelScaler>
      </div>
    </div>
  );
}
