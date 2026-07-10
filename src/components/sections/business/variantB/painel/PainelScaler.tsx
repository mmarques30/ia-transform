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
 *  3. ResizeObserver calcula scale = viewport.width / 990 e ajusta
 *     transform: scale(s) no inner
 *  4. Height do viewport é ajustada pra scaledInner.offsetHeight * s
 *     — assim o parent reserva o espaço certo pós-scale (sem
 *     overlap com o próximo elemento)
 *
 * Usado no HeroMockup pra evitar que o painel V4 Vetra quebre em
 * KPIs verticais + cards esmagados na coluna do hero.
 *
 * Scale máximo travado em 1 (não amplia se o container for maior
 * que 990px — evita blur/artefatos de scale up desnecessário).
 */

const NATIVE_WIDTH = 990;

export function PainelScaler({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const vp = viewportRef.current;
    const sc = scaleRef.current;
    if (!vp || !sc) return;

    const fit = () => {
      // Trava scale em [0, 1] — não amplia se container for maior que
      // 990px. Se estivesse, viraria upscale com pixels borrados.
      const s = Math.min(1, vp.clientWidth / NATIVE_WIDTH);
      setScale(s);
      setHeight(sc.offsetHeight * s);
    };

    fit();
    const roViewport = new ResizeObserver(fit);
    roViewport.observe(vp);
    // Observa TAMBÉM o inner — se o conteúdo mudar de altura (imagens
    // carregando, animações que alteram DOM), reajustamos a viewport.
    const roScale = new ResizeObserver(fit);
    roScale.observe(sc);

    return () => {
      roViewport.disconnect();
      roScale.disconnect();
    };
  }, []);

  return (
    <div ref={viewportRef} className="iap-device-viewport" style={{ height: height ?? undefined }}>
      <div ref={scaleRef} className="iap-device-scale" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
