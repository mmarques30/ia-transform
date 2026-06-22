import { useEffect } from "react";

/**
 * Tracker server-side de pageview pra LPs.
 *
 * Envia 1 beacon por mount pra edge function do Supabase
 * (mads-lp-pageview), capturando URL, referrer, UTMs, fbclid,
 * gclid, viewport e um session_id persistido por aba.
 *
 * Usa navigator.sendBeacon quando disponível (não bloqueia
 * unload). Cai em fetch keepalive como fallback. Falha em
 * silêncio — tracker não pode quebrar UX.
 *
 * Captura tráfego que Microsoft Clarity perde (in-app browsers
 * Instagram/Facebook bloqueiam o script Clarity) pra ter CVR
 * real em LPs sem paid.
 *
 * Chame em cada componente de página de LP pública —
 * NÃO chame em thank-you / admin / rotas internas.
 */

const ENDPOINT =
  "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/mads-lp-pageview";
const SESSION_KEY = "mads_session_id";

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
  useEffect(() => {
    if (typeof window === "undefined") return;
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
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon(ENDPOINT, blob);
      } else {
        fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // silent — tracker nunca quebra UX
    }
  }, []);
}
