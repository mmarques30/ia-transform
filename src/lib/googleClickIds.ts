/**
 * Cliques do Google Ads (gclid, gbraid, wbraid) guardados por 90 dias.
 *
 * O Google só põe o id do clique na URL de chegada. Pra a conversão ser
 * atribuída ao anúncio, o formulário precisa mandar esse id mesmo que a
 * pessoa navegue pelo site (ou volte outro dia) antes de enviar. Por isso
 * vai pro localStorage, e não pra sessão: a janela de conversão do Google
 * Ads é de até 90 dias.
 *
 * Cada id fica na sua chave (iap_gclid, iap_gbraid, iap_wbraid) com a data
 * em que foi salvo. Página sem o parâmetro não apaga nada; um clique novo
 * substitui o anterior; depois de 90 dias o valor é descartado.
 */

const GOOGLE_CLICK_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
type GoogleClickParam = (typeof GOOGLE_CLICK_PARAMS)[number];
export type GoogleClickIds = Record<GoogleClickParam, string>;

const TTL_MS = 90 * 24 * 60 * 60 * 1000;

interface StoredClick {
  value: string;
  /** ISO 8601 de quando o clique foi salvo. */
  savedAt: string;
}

function storageKey(param: GoogleClickParam): string {
  return `iap_${param}`;
}

/** Salva os ids do Google que estiverem na URL atual. Chamado em toda página. */
export function saveGoogleClickIds(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  for (const param of GOOGLE_CLICK_PARAMS) {
    const value = params.get(param)?.trim();
    if (!value) continue;
    const stored: StoredClick = { value, savedAt: new Date().toISOString() };
    try {
      localStorage.setItem(storageKey(param), JSON.stringify(stored));
    } catch {
      // modo privado / storage bloqueado: o form ainda manda o que estiver na URL
    }
  }
}

function readStoredClick(param: GoogleClickParam): string {
  try {
    const raw = localStorage.getItem(storageKey(param));
    if (!raw) return "";
    const stored = JSON.parse(raw) as Partial<StoredClick>;
    const savedAt = Date.parse(String(stored.savedAt ?? ""));
    if (typeof stored.value !== "string" || !stored.value || Number.isNaN(savedAt)) {
      localStorage.removeItem(storageKey(param));
      return "";
    }
    if (Date.now() - savedAt > TTL_MS) {
      localStorage.removeItem(storageKey(param));
      return "";
    }
    return stored.value;
  } catch {
    return "";
  }
}

/**
 * Ids do Google válidos pra ir no payload do form-submit. Salva antes o que
 * estiver na URL (cobre envio antes do efeito do root rodar) e, sem
 * localStorage, cai no valor da URL atual.
 */
export function getGoogleClickIds(): GoogleClickIds {
  const out: GoogleClickIds = { gclid: "", gbraid: "", wbraid: "" };
  if (typeof window === "undefined") return out;
  saveGoogleClickIds();
  const params = new URLSearchParams(window.location.search);
  for (const param of GOOGLE_CLICK_PARAMS) {
    out[param] = readStoredClick(param) || params.get(param)?.trim() || "";
  }
  return out;
}
