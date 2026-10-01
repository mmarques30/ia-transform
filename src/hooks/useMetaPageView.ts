import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";

type FbqFn = (action: "track", event: string, params?: Record<string, unknown>) => void;

/**
 * Dispara PageView do Meta Pixel a cada navegação SPA.
 *
 * O script inline do __root.tsx só dispara o PageView da carga
 * inicial. Como o TanStack Router troca de rota sem recarregar,
 * sem este hook todos os eventos do pixel ficam registrados na
 * URL da primeira carga — o que quebra qualquer conversão
 * personalizada ou público de remarketing baseado em URL.
 *
 * Diferente do usePageViewBeacon, NÃO pula rotas de thank-you:
 * é exatamente nelas que a conversão é medida.
 */
export function useMetaPageView() {
  const { pathname } = useLocation();
  const primeiroRender = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // O PageView da carga inicial já saiu no script inline do __root.
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }

    const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
    if (typeof fbq !== "function") return;

    try {
      fbq("track", "PageView");
    } catch (err) {
      // fbevents.js lança em WebView in-app (Instagram/Facebook).
      console.warn("[pixel] PageView throw na navegação", err);
    }
  }, [pathname]);
}
