/**
 * Helpers compartilhados pra submissão de formulários pra a Edge Function
 * form-submit do Supabase. Usado por HeroFormContabil e pela calculadora
 * da /contabilcalculo.
 *
 * Endpoint e chave anon estão hardcoded ao lado um do outro. A anon key
 * é pública por design (mesma que o @supabase/supabase-js expõe em qualquer
 * integração client). NÃO confundir com SERVICE_ROLE_KEY.
 */

export const FORM_ENDPOINT =
  "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/form-submit";

export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpd2RsY2V5anNubG51bmt0cXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTU3OTksImV4cCI6MjA4OTc5MTc5OX0.tl-7gEObYBB7wDUS5_pKh9UyRlJQNdnWPiRpMFYrbUM";

export const FORM_HEADERS = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

interface TrafficContext {
  utm: {
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
  };
  attribution: { fbclid: string; gclid: string };
  meta: { page_url: string; referrer: string; user_agent: string };
}

/**
 * Captura UTMs, attribution clicks e metadata da página atual. Mesma
 * lógica do HeroFormContabil pra os leads das duas vias chegarem com
 * o mesmo shape de payload.
 *
 * utm_term default por path (contabil-v1, contabil-v2, contabil-calculo)
 * já é aplicado aqui se não vier no URL.
 */
export function captureTrafficContext(): TrafficContext {
  if (typeof window === "undefined") {
    return {
      utm: { source: "", medium: "", campaign: "", term: "", content: "" },
      attribution: { fbclid: "", gclid: "" },
      meta: { page_url: "", referrer: "", user_agent: "" },
    };
  }

  const params = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;

  const defaultUtmTerm = pathname.startsWith("/contabil02")
    ? "contabil-v2"
    : pathname.startsWith("/contabilcalculo")
      ? "contabil-calculo"
      : pathname.startsWith("/contabil")
        ? "contabil-v1"
        : "";
  const urlUtmTerm = params.get("utm_term");
  const utmTerm = urlUtmTerm && urlUtmTerm.trim() ? urlUtmTerm : defaultUtmTerm;

  return {
    utm: {
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      term: utmTerm,
      content: params.get("utm_content") ?? "",
    },
    attribution: {
      fbclid: params.get("fbclid") ?? "",
      gclid: params.get("gclid") ?? "",
    },
    meta: {
      page_url: window.location.href,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    },
  };
}

/**
 * Captura ?deal_id da URL atual. Retorna null se ausente ou vazio.
 *
 * O CRM (bot Mari da cadência Leva 2) envia links de WhatsApp com
 *   iaplicada.com/contabilcalculo?deal_id=<uuid>
 * Quando o lead abre, lemos esse id e injetamos no payload do form-submit
 * pra Edge Function fazer merge no deal existente em vez de criar um
 * novo lead anônimo.
 *
 * Quando o lead acessa a calculadora direto (sem deal_id), retorna null
 * e o fluxo continua anônimo como hoje — zero impacto.
 */
export function captureDealId(): string | null {
  if (typeof window === "undefined") return null;
  const id = new URLSearchParams(window.location.search).get("deal_id");
  return id && id.trim() ? id.trim() : null;
}
