import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Tracker server-side de pageview pra LPs.
 *
 * Envia 1 beacon por mount / por navegação SPA pra edge function do
 * Supabase (mads-lp-pageview), capturando URL, referrer, UTMs,
 * fbclid, gclid, viewport e um session_id persistido por aba.
 *
 * Decisões:
 * - sendBeacon com Blob `text/plain`. Usar `application/json`
 *   aciona CORS preflight implícito que alguns browsers/CDNs
 *   dropam silenciosamente. A edge function faz `req.json()` no
 *   payload mesmo com Content-Type text/plain.
 * - Fallback fetch keepalive quando sendBeacon recusa (queue
 *   cheio, payload > 64KB) ou não existe.
 * - Hook chamado UMA vez no __root.tsx. O effect re-dispara em
 *   cada navegação SPA porque depende de `pathname`.
 * - Paths internos (thank-you, admin) são pulados — só LPs
 *   públicas devem virar pageview.
 * - Falha em silêncio — tracker não pode quebrar UX.
 */

const ENDPOINT =
  "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/mads-lp-pageview";
const SESSION_KEY = "mads_session_id";

function shouldSkip(pathname: string): boolean {
  if (/thank-you/i.test(pathname)) return true;
  if (/^\/admin/i.test(pathname)) return true;
  return false;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function pickUTMs() {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source: sp.get("utm_source") || undefined,
    utm_medium: sp.get("utm_medium") || undefined,
    utm_campaign: sp.get("utm_campaign") || undefined,
    utm_content: sp.get("utm_content") || undefined,
    utm_term: sp.get("utm_term") || undefined,
    fbclid: sp.get("fbclid") || undefined,
    gclid: sp.get("gclid") || undefined,
  };
}

export function usePageViewBeacon() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldSkip(pathname)) return;

    const payload = {
      url: window.location.href,
      referrer: document.referrer || undefined,
      session_id: getOrCreateSessionId(),
      screen_width: window.screen?.width,
      screen_height: window.screen?.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      ...pickUTMs(),
    };

    const sendFallback = () => {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    };

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
        const ok = navigator.sendBeacon(ENDPOINT, blob);
        if (!ok) sendFallback();
      } else {
        sendFallback();
      }
    } catch {
      // silent — tracker nunca quebra UX
    }
  }, [pathname]);
}
