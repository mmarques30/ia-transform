import { useEffect, useRef, useState } from "react";

/**
 * PainelScaler — envolve qualquer painel do LP-B com scale via
 * transform pra manter a proporção horizontal (990px nativa)
 * quando a coluna do parent é estreita.
 *
 * Como funciona:
 *  1. Wrapper externo `.iap-device-viewport` ocupa 100% da coluna
 *  2. Wrapper interno `.iap-device-scale` mantém 990px fixo com
 *     transform-origin: top left
 *  3. ResizeObserver calcula scale = viewport.width / 990 * factor
 *     e ajusta transform: scale(s) no inner
 *  4. Height do viewport é ajustada pra scaledInner.offsetHeight * s
 *     — assim o parent reserva o espaço certo pós-scale
 *
 * Usado no HeroMockup pra evitar que o painel V4 Vetra quebre em
 * KPIs verticais + cards esmagados na coluna do hero.
 *
 * Props:
 *   factor — multiplicador opcional do scale calculado. Ex: 1.15
 *   torna o painel 15% maior que a largura do viewport, permitindo
 *   que ele "vaze" pra fora do container (útil no hero com
 *   `margin-right: -12vw` no wrapper externo pra criar efeito de
 *   painel saindo pela borda direita da tela). Default 1.
 *
 *   maxScale — teto do scale, default 1 (não amplia se container >
 *   990px). Passe > 1 quando quiser deixar amplificar.
 */

const NATIVE_WIDTH = 990;

interface PainelScalerProps {
  children: React.ReactNode;
  factor?: number;
  maxScale?: number;
}

export function PainelScaler({ children, factor = 1, maxScale = 1 }: PainelScalerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const vp = viewportRef.current;
    const sc = scaleRef.current;
    if (!vp || !sc) return;

    const fit = () => {
      const base = vp.clientWidth / NATIVE_WIDTH;
      const s = Math.min(maxScale, base * factor);
      setScale(s);
      setHeight(sc.offsetHeight * s);
    };

    fit();
    const roViewport = new ResizeObserver(fit);
    roViewport.observe(vp);
    const roScale = new ResizeObserver(fit);
    roScale.observe(sc);

    return () => {
      roViewport.disconnect();
      roScale.disconnect();
    };
  }, [factor, maxScale]);

  return (
    <div ref={viewportRef} className="iap-device-viewport" style={{ height: height ?? undefined }}>
      <div ref={scaleRef} className="iap-device-scale" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
