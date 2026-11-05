/**
 * Arquivo de código que sumiu por causa de deploy.
 *
 * Cada deploy troca os nomes dos arquivos JS (hash) e apaga os antigos. Quem
 * abriu a LP antes do deploy e navega depois (ex.: envia o form e vai pro
 * /thank-you-business) pede um arquivo que não existe mais, o import()
 * dinâmico falha e o roteador mostra "Something went wrong" — com o lead já
 * salvo no CRM, mas sem a página de obrigado (nem as conversões dela).
 *
 * A saída é recarregar a página uma vez: o HTML novo aponta pros arquivos
 * novos e a pessoa cai na mesma URL, agora funcionando. A trava em
 * sessionStorage evita loop se o problema for outro (rede caída, por exemplo).
 */

const RELOAD_KEY = "iap_chunk_reload_at";
const RELOAD_WINDOW_MS = 15_000;

/** Mensagens dos navegadores quando um import() dinâmico não acha o arquivo. */
const CHUNK_ERROR_RE =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|ChunkLoadError|Loading chunk [\w-]+ failed/i;

export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return CHUNK_ERROR_RE.test(message);
}

/**
 * Recarrega a página, no máximo uma vez a cada 15s. Devolve true se mandou
 * recarregar (quem chamou pode esconder a tela de erro enquanto isso).
 */
export function reloadOnceForChunkError(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < RELOAD_WINDOW_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // sem sessionStorage não dá pra garantir que não entra em loop
    return false;
  }
  window.location.reload();
  return true;
}
