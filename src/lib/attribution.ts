/**
 * Captura de atribuição (UTMs + click ids) na abertura da página.
 *
 * Os parâmetros são lidos da URL e guardados em sessionStorage pra
 * sobreviver a navegação por âncora, rolagem e re-render — o form pode
 * ser submetido segundos depois com a URL já sem query string.
 *
 * Regra: se a URL atual traz QUALQUER parâmetro rastreado, esse
 * conjunto substitui o guardado (um novo clique de anúncio não herda
 * fbclid/campanha de uma sessão anterior). Sem parâmetro na URL, usa o
 * que foi guardado. Sem nada guardado, tudo vazio — nunca inventa valor.
 */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Record<AttributionKey, string>;

const STORAGE_KEY = "iap_attribution";

export function emptyAttribution(): Attribution {
  return Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, ""])) as Attribution;
}

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    const out = emptyAttribution();
    for (const k of ATTRIBUTION_KEYS) out[k] = typeof parsed[k] === "string" ? parsed[k]! : "";
    return out;
  } catch {
    return null;
  }
}

function writeStored(a: Attribution) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    // modo privado / cookies bloqueados — segue só com a URL atual
  }
}

/**
 * Lê a URL atual; se houver parâmetro rastreado, persiste e devolve.
 * Senão devolve o guardado na sessão (ou tudo vazio).
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution();
  const params = new URLSearchParams(window.location.search);
  const fromUrl = emptyAttribution();
  let any = false;
  for (const k of ATTRIBUTION_KEYS) {
    const v = params.get(k);
    if (v) {
      fromUrl[k] = v;
      any = true;
    }
  }
  if (any) {
    writeStored(fromUrl);
    return fromUrl;
  }
  return readStored() ?? emptyAttribution();
}

/** Slug fixo da LP a partir do pathname: "/" → "home", "/x/" → "x". */
export function landingPageFromPath(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "home" : p.replace(/^\//, "");
}
