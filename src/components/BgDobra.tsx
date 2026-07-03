import type { ReactNode } from "react";
import { IABackground, type IABackgroundIntensity } from "@/components/IABackground";

/**
 * BgDobra — wrap section com a camada IABackground atrás e o conteúdo
 * em z-index positivo. Serve pra dobras EFFECT da cadência intercalada
 * (Hero, Solution, OliveWave, Process, Comparison, CTAFinal), enquanto
 * dobras NEUTRAS renderizam direto no <main> sem esse wrapper.
 *
 * A classe .ia-dobra afina o .section-veil (0.34 alpha) dentro do
 * escopo, deixando o grid/glow/sparks vazarem.
 *
 * Usado por /, /businessv2 e /businessv3 pra manter o mesmo sistema
 * visual entre as 3 LPs.
 */
interface BgDobraProps {
  intensity: IABackgroundIntensity;
  children: ReactNode;
}

export function BgDobra({ intensity, children }: BgDobraProps) {
  return (
    <div className="relative overflow-hidden ia-dobra">
      <IABackground intensity={intensity} />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
