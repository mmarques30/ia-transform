/**
 * Util pra ler cookies do pixel Meta (_fbp / _fbc) e o fbclid da URL —
 * vai junto no payload do form-submit pra alimentar Meta CAPI server-side.
 *
 * Quem cria os cookies:
 *   - _fbp: sempre, no carregamento do fbevents.js (mesmo sem ads)
 *   - _fbc: só quando a URL tem ?fbclid=... (clique direto de ad Meta)
 *
 * Backend trata o caso onde fbclid existe mas _fbc ainda não — monta
 * o fbc no padrão "fb.1.{timestamp}.{fbclid}".
 *
 * Importante: NUNCA criar/sobrescrever esses cookies no client.
 * Só ler o que o pixel já criou.
 */

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escaped}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getMetaPixelCookies() {
  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
}

export function getFbclidFromUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid && fbclid.trim() ? fbclid : undefined;
}
