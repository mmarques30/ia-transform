import { useEffect, useState } from "react";

/**
 * Detecta WebView nativo de apps (Instagram, Facebook/Messenger, WeChat, Line).
 * Esses browsers têm engine JS mais fraca, WebGL instável e gestos nativos
 * sensíveis a smooth-scroll customizado — convém degradar elegantemente.
 *
 * Como 95% do tráfego da LP vem desses WebViews (medido via Clarity), o que
 * é "edge case" pra a maioria das LPs é o caminho default aqui.
 */
const IN_APP_BROWSER_RE =
  /(Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Line\/|MicroMessenger|KAKAOTALK)/i;

/** Versão síncrona — usar dentro de useEffect ou eventos. */
export function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return IN_APP_BROWSER_RE.test(navigator.userAgent);
}

/**
 * Hook reativo. Retorna `false` na primeira render (SSR-safe) e atualiza
 * após hidratação. Componentes que dependem disso devem aguentar 1 tick
 * de re-render sem quebrar layout.
 */
export function useIsInAppBrowser(): boolean {
  const [isInApp, setIsInApp] = useState(false);
  useEffect(() => {
    setIsInApp(isInAppBrowser());
  }, []);
  return isInApp;
}
