/**
 * Cloudflare Worker entry custom — wrappa o handler default do TanStack
 * Start com um proxy /c/* pra Microsoft Clarity.
 *
 * Motivação: adblockers (uBlock Origin, Brave Shields, AdBlock Plus)
 * bloqueiam *.clarity.ms na lista padrão. Como o POST do form-submit
 * vai pra supabase.co (não bloqueado), o lead é registrado mas a
 * sessão Clarity não — resultado: submissions > sessions no dashboard,
 * impossível medir conv real.
 *
 * Servindo o tag do Clarity pelo mesmo domínio (iaplicada.com), o
 * adblock não tem como bloquear sem quebrar o próprio site. Worker
 * proxia transparentemente pra clarity.ms e reescreve as URLs internas
 * do SDK pra que TODA comunicação subsequente também passe pelo proxy.
 *
 * Patterns de URL aceitos:
 *   /c/tag/<id>              → www.clarity.ms/tag/<id>
 *   /c/<subdomain>/<path>    → <subdomain>.clarity.ms/<path>
 *
 * Tudo fora de /c/* cai pro handler TanStack normal — zero impacto
 * em rotas existentes da app.
 */
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

const tanstackFetch = createStartHandler(defaultStreamHandler);

/**
 * Subdomínios conhecidos do Clarity. Whitelist evita que alguém
 * mande request arbitrária pra /c/<qualquer-coisa>/ tentando turn
 * o nosso domínio num open proxy.
 */
const CLARITY_SUBDOMAINS = new Set([
  "www",
  "e",
  "r",
  "b",
  "z",
  "f",
  "j",
  "m",
]);

/** Headers do cliente que faz sentido encaminhar pro clarity.ms.
 *  Stripamos sec-fetch-*, host, origin, etc pra não confundir o backend. */
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-encoding",
  "accept-language",
  "cache-control",
  "content-type",
  "cookie",
  "pragma",
  "referer",
  "user-agent",
];

/** Headers da resposta do clarity.ms que repassamos pro browser.
 *  Filtra coisas problemáticas tipo content-length (vai mudar após
 *  rewrite), strict-transport-security (escopo do clarity.ms, não nosso). */
function copyResponseHeaders(src: Headers): Headers {
  const out = new Headers();
  const skip = new Set([
    "content-length",
    "content-encoding",
    "transfer-encoding",
    "connection",
    "keep-alive",
    "strict-transport-security",
    "alt-svc",
  ]);
  for (const [key, value] of src.entries()) {
    if (skip.has(key.toLowerCase())) continue;
    out.set(key, value);
  }
  return out;
}

function buildForwardedRequestHeaders(src: Headers): Headers {
  const out = new Headers();
  for (const key of FORWARDED_REQUEST_HEADERS) {
    const value = src.get(key);
    if (value) out.set(key, value);
  }
  return out;
}

/**
 * Reescreve URLs do clarity.ms no corpo da resposta JS pra apontar
 * pro nosso proxy. Quando o SDK do Clarity tentar fazer fetch/beacon
 * pra https://r.clarity.ms/collect, vai chamar
 * https://iaplicada.com/c/r/collect — passando pelo proxy de novo.
 */
function rewriteClarityUrls(body: string, origin: string): string {
  // https://r.clarity.ms/foo  →  https://iaplicada.com/c/r/foo
  // https://clarity.ms/foo    →  https://iaplicada.com/c/www/foo
  return body
    .replace(
      /https?:\/\/([a-z0-9]+)\.clarity\.ms/gi,
      (_match, sub) => `${origin}/c/${sub}`,
    )
    .replace(
      /https?:\/\/clarity\.ms/gi,
      `${origin}/c/www`,
    )
    // Protocol-relative
    .replace(
      /\/\/([a-z0-9]+)\.clarity\.ms/gi,
      (_match, sub) => `/c/${sub}`,
    )
    .replace(/\/\/clarity\.ms/gi, "/c/www");
}

interface ClarityRoute {
  subdomain: string;
  path: string;
}

/**
 * Resolve /c/<...>/ pro par {subdomain, path} no clarity.ms.
 *
 * Backwards-compat: /c/tag/<id> assume subdomain=www. Outros casos
 * usam /c/<subdomain>/<path>.
 */
function parseClarityRoute(pathname: string): ClarityRoute | null {
  // Remove o prefixo /c/
  const rest = pathname.replace(/^\/c\/?/, "");
  if (!rest) return null;

  const segments = rest.split("/");
  const first = segments[0];

  // /c/tag/... ou /c/c.gif → subdomínio www
  if (first === "tag" || first.includes(".") || first === "collect") {
    return { subdomain: "www", path: "/" + segments.join("/") };
  }

  // /c/<sub>/<path>
  if (CLARITY_SUBDOMAINS.has(first.toLowerCase())) {
    return {
      subdomain: first.toLowerCase(),
      path: "/" + segments.slice(1).join("/"),
    };
  }

  // Subdomain desconhecido — bloqueia (evita open proxy)
  return null;
}

async function proxyClarity(req: Request, url: URL): Promise<Response> {
  const route = parseClarityRoute(url.pathname);
  if (!route) {
    return new Response("Not Found", { status: 404 });
  }

  const targetUrl = `https://${route.subdomain}.clarity.ms${route.path}${url.search}`;

  const init: RequestInit = {
    method: req.method,
    headers: buildForwardedRequestHeaders(req.headers),
    redirect: "follow",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, init);
  } catch (err) {
    console.error("[clarity-proxy] upstream fetch failed", {
      target: targetUrl,
      err: err instanceof Error ? err.message : String(err),
    });
    return new Response("Bad Gateway", { status: 502 });
  }

  const headers = copyResponseHeaders(upstream.headers);
  const contentType = (upstream.headers.get("content-type") || "").toLowerCase();
  const isJs =
    contentType.includes("javascript") ||
    contentType.includes("ecmascript");

  // Pra responses JS, reescreve URLs antes de devolver pro browser.
  // Outros tipos (gif pixel, imagens, JSON) passam intactos.
  if (isJs) {
    const body = await upstream.text();
    const rewritten = rewriteClarityUrls(body, url.origin);
    headers.set("cache-control", "public, max-age=300");
    return new Response(rewritten, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

/**
 * Entry pro Worker — intercepta /c/* pra proxyar Clarity. Qualquer
 * outra rota cai pro handler TanStack Start padrão (rotas da app,
 * SSR, assets, server functions).
 */
const fetchHandler = async (
  request: Request,
  env: unknown,
  ctx: unknown,
): Promise<Response> => {
  const url = new URL(request.url);

  if (url.pathname === "/c" || url.pathname.startsWith("/c/")) {
    return proxyClarity(request, url);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tanstackFetch as any)(request, env, ctx);
};

export default { fetch: fetchHandler };
