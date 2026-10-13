/**
 * Campo de WhatsApp do formulário da LP: máscara, validação de formato,
 * checagem remota (existe no WhatsApp?) e o rascunho usado pela tela de
 * obrigado pro link "errou? corrigir".
 *
 * Nada aqui bloqueia o envio. Cada função só classifica o número; quem
 * decide o que mostrar é o HeroForm, e o lead sempre entra no CRM com o
 * resultado em `whatsapp_check`.
 */

import { FORM_HEADERS } from "./formSubmit";

export const WHATSAPP_CHECK_ENDPOINT =
  "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/whatsapp-check";

/** Tempo máximo da checagem remota. Passou disso, segue sem verificar. */
export const WHATSAPP_CHECK_TIMEOUT_MS = 2500;

export const PHONE_MAX_DIGITS = 11;

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Máscara progressiva (DD) 9XXXX-XXXX. Dígitos além de 11 (só chegam por
 * colagem) ficam visíveis no fim pra o aviso de "dígito a mais" fazer
 * sentido pra quem lê.
 */
export function formatPhone(digits: string): string {
  const d = digits;
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 5) return `(${ddd}) ${rest}`;
  const main = `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
  return rest.length > 9 ? `${main}${rest.slice(9)}` : main;
}

/**
 * Normaliza o que entrou no campo. Digitação para em 11 dígitos. Colagem
 * ou autofill com código do país (55 + 10/11 dígitos) perde o 55; outra
 * colagem longa fica como está pra o aviso de dígito a mais aparecer.
 */
export function normalizePhoneInput(
  raw: string,
  previousDigits: string,
  inputType: string | undefined,
): string {
  let digits = onlyDigits(raw);
  const typing = inputType === "insertText" || inputType === "insertCompositionText";

  // Apagar um caractere da máscara ("(", ")", " ", "-") não muda os dígitos
  // e a máscara reapareceria na hora. Nesse caso apaga o último dígito.
  if (inputType === "deleteContentBackward" && digits === previousDigits) {
    digits = digits.slice(0, -1);
  }

  if (digits.length > PHONE_MAX_DIGITS) {
    if (typing) {
      digits = digits.slice(0, PHONE_MAX_DIGITS);
    } else if (digits.startsWith("55") && digits.length - 2 >= 10 && digits.length - 2 <= 11) {
      digits = digits.slice(2);
    }
  }
  return digits;
}

/** DDDs em uso no Brasil (Anatel). */
const VALID_DDDS = new Set<string>([
  ...range(11, 19),
  "21",
  "22",
  "24",
  "27",
  "28",
  ...range(31, 35),
  "37",
  "38",
  ...range(41, 49),
  "51",
  "53",
  "54",
  "55",
  ...range(61, 69),
  "71",
  "73",
  "74",
  "75",
  "77",
  "79",
  ...range(81, 89),
  ...range(91, 99),
]);

function range(from: number, to: number): string[] {
  const out: string[] = [];
  for (let n = from; n <= to; n++) out.push(String(n));
  return out;
}

export type FormatMotivo =
  | "faltou_digito"
  | "digito_a_mais"
  | "ddd_inexistente"
  | "telefone_fixo"
  | "sem_nove"
  | "numero_inventado";

export interface FormatIssue {
  motivo: FormatMotivo;
  mensagem: string;
  /** Mostra o reforço de confiança junto com a mensagem. */
  reforco: boolean;
}

/** Os 8 dígitos finais todos iguais ou em sequência (12345678 / 87654321). */
function looksInvented(last8: string): boolean {
  if (/^(\d)\1{7}$/.test(last8)) return true;
  let up = true;
  let down = true;
  for (let i = 1; i < last8.length; i++) {
    const diff = Number(last8[i]) - Number(last8[i - 1]);
    if (diff !== 1) up = false;
    if (diff !== -1) down = false;
  }
  return up || down;
}

/** Primeira regra que o número quebra, na ordem combinada. null = formato ok. */
export function validatePhoneFormat(digits: string): FormatIssue | null {
  if (digits.length < PHONE_MAX_DIGITS) {
    return {
      motivo: "faltou_digito",
      mensagem: "Faltou dígito: use DDD + número, ex: (11) 99999-8888.",
      reforco: false,
    };
  }
  if (digits.length > PHONE_MAX_DIGITS) {
    return {
      motivo: "digito_a_mais",
      mensagem: "Dígito a mais: use só DDD + número, ex: (11) 99999-8888.",
      reforco: false,
    };
  }
  if (!VALID_DDDS.has(digits.slice(0, 2))) {
    return {
      motivo: "ddd_inexistente",
      mensagem: "Esse DDD não existe. Confere os dois primeiros dígitos?",
      reforco: false,
    };
  }
  const first = digits[2];
  if (first >= "2" && first <= "5") {
    return {
      motivo: "telefone_fixo",
      mensagem: "Parece telefone fixo. Precisamos do seu celular com WhatsApp.",
      reforco: false,
    };
  }
  if (first !== "9") {
    return {
      motivo: "sem_nove",
      mensagem: "Celular começa com 9 depois do DDD, ex: (11) 99999-8888.",
      reforco: false,
    };
  }
  if (looksInvented(digits.slice(-8))) {
    return {
      motivo: "numero_inventado",
      mensagem: "Esse número não parece real. Confere o seu WhatsApp?",
      reforco: true,
    };
  }
  return null;
}

export const WHATSAPP_REFORCO =
  "Sem o número certo a gente não consegue te chamar, e a sua experiência fica pela metade. " +
  "A gente entende o receio de ser incomodado por experiências anteriores. " +
  "Aqui é diferente: uma conversa breve pra te levar à melhor solução pro seu negócio. " +
  "Se você chegou até aqui, vale deixar o número correto.";

export function naoWhatsappMensagem(digits: string): string {
  return `Não achamos WhatsApp em ${formatPhone(digits)}. Confere o DDD e os dígitos?`;
}

export type WhatsappRemoteResult =
  | { kind: "verificado"; telefone: string }
  | { kind: "nao_verificado" }
  | { kind: "invalido"; motivo: string; mensagem: string }
  | { kind: "erro" };

/**
 * Pergunta à função whatsapp-check se o número existe no WhatsApp.
 * Nunca lança: timeout, erro de rede, resposta inesperada ou função
 * ausente viram { kind: "erro" } e o formulário segue sem verificar.
 */
export async function checkWhatsappRemote(phone: string): Promise<WhatsappRemoteResult> {
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = setTimeout(() => ctrl?.abort(), WHATSAPP_CHECK_TIMEOUT_MS);
  try {
    const res = await fetch(WHATSAPP_CHECK_ENDPOINT, {
      method: "POST",
      headers: FORM_HEADERS,
      body: JSON.stringify({ phone }),
      signal: ctrl?.signal,
    });
    const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || typeof body !== "object") return { kind: "erro" };
    if (body.ok === true) {
      const telefone = typeof body.telefone === "string" ? onlyDigits(body.telefone) : "";
      if (body.verificado === true && /^55\d{10,11}$/.test(telefone)) {
        return { kind: "verificado", telefone };
      }
      return { kind: "nao_verificado" };
    }
    if (body.ok === false) {
      return {
        kind: "invalido",
        motivo: typeof body.motivo === "string" && body.motivo ? body.motivo : "desconhecido",
        mensagem: typeof body.mensagem === "string" ? body.mensagem : "",
      };
    }
    return { kind: "erro" };
  } catch {
    return { kind: "erro" };
  } finally {
    clearTimeout(timer);
  }
}

/** Motivo vindo da API em formato seguro pra `formato:<motivo>`. */
export function sanitizeMotivo(motivo: string): string {
  return (
    motivo
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 40) || "desconhecido"
  );
}

/* ─── Rascunho pra tela de obrigado / "errou? corrigir" ─────────────── */

const LEAD_DRAFT_KEY = "iap_lead_draft";
export const CORRIGIR_PARAM = "corrigir";

export interface LeadDraft {
  firstname: string;
  email: string;
  phone: string;
  cargo: string;
  faixa_de_faturamento: string;
  /** Caminho + query da LP de origem, já com ?corrigir=1. */
  returnHref: string;
}

export function saveLeadDraft(draft: LeadDraft): void {
  try {
    sessionStorage.setItem(LEAD_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // modo privado / storage bloqueado — tela de obrigado só não mostra o número
  }
}

export function readLeadDraft(): LeadDraft | null {
  try {
    const raw = sessionStorage.getItem(LEAD_DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<LeadDraft>;
    if (typeof d.phone !== "string" || typeof d.returnHref !== "string") return null;
    return {
      firstname: String(d.firstname ?? ""),
      email: String(d.email ?? ""),
      phone: d.phone,
      cargo: String(d.cargo ?? ""),
      faixa_de_faturamento: String(d.faixa_de_faturamento ?? ""),
      returnHref: d.returnHref,
    };
  } catch {
    return null;
  }
}

/** URL relativa da página atual com ?corrigir=1 (mantém UTMs). */
export function buildCorrigirHref(): string {
  const url = new URL(window.location.href);
  url.searchParams.set(CORRIGIR_PARAM, "1");
  url.hash = "";
  return `${url.pathname}${url.search}`;
}
