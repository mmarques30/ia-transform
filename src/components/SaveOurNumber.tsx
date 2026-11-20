import { useState } from "react";
import { Check, Copy, MessageCircle, UserPlus } from "lucide-react";

/**
 * "Salva o nosso número": aparece nas telas de obrigado logo depois do
 * envio do form. Com o contato salvo, a mensagem da IAplicada não cai em
 * "desconhecidos" no WhatsApp. Botões pra salvar o contato (arquivo .vcf,
 * que o celular abre direto na tela de novo contato) e copiar o número.
 */

const PHONE_E164 = "+5511950566101";

type Lang = "pt-br" | "pt-us" | "en";

const COPY: Record<
  Lang,
  { label: string; display: string; text: string; save: string; copy: string; copied: string }
> = {
  "pt-br": {
    label: "Salva o nosso número",
    display: "(11) 95056-6101",
    text: "É por ele que a gente te chama nos próximos minutos. Com o contato salvo, a nossa mensagem não se perde no meio do seu WhatsApp.",
    save: "Salvar contato",
    copy: "Copiar número",
    copied: "Copiado",
  },
  "pt-us": {
    label: "Salva o nosso número",
    display: "+55 11 95056-6101",
    text: "É por ele que a gente te chama nos próximos minutos. Com o contato salvo, a nossa mensagem não se perde no meio do seu WhatsApp.",
    save: "Salvar contato",
    copy: "Copiar número",
    copied: "Copiado",
  },
  en: {
    label: "Save our number",
    display: "+55 11 95056-6101",
    text: "If we reach out on WhatsApp, it will be from this number. With our contact saved, our message won't get lost in your chats.",
    save: "Save contact",
    copy: "Copy number",
    copied: "Copied",
  },
};

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:IAplicada",
  "ORG:IAplicada",
  `TEL;TYPE=CELL:${PHONE_E164}`,
  "EMAIL:mariana@iaplicada.com",
  "URL:https://iaplicada.com",
  "END:VCARD",
].join("\r\n");

function downloadContact() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "IAplicada.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function SaveOurNumber({ lang = "pt-br" }: { lang?: Lang }) {
  const c = COPY[lang];
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(PHONE_E164);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // sem clipboard (navegador antigo ou bloqueado): o número fica visível pra copiar à mão
    }
  }

  return (
    <div
      className="mx-auto mt-8 max-w-[560px] rounded-2xl px-5 py-5 sm:px-6 text-left"
      style={{
        background:
          "radial-gradient(90% 120% at 100% 0%, rgba(200,224,64,0.12), transparent 60%), rgba(255,255,255,0.03)",
        border: "1px solid rgba(200,224,64,0.3)",
        boxShadow: "0 30px 70px -40px rgba(200,224,64,0.45)",
      }}
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--color-primary)", color: "#0a0c07" }}
          aria-hidden
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] sm:text-[16px] font-semibold leading-snug text-foreground">
            {c.label}:{" "}
            <a
              href={`tel:${PHONE_E164}`}
              className="whitespace-nowrap"
              style={{ color: "var(--color-primary)" }}
            >
              {c.display}
            </a>
          </p>
          <p className="mt-1.5 text-[13.5px] sm:text-[14px] leading-[1.6] text-sage">{c.text}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 sm:pl-[60px]">
        <button
          type="button"
          onClick={downloadContact}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--color-primary)", color: "#0a0c07" }}
        >
          <UserPlus className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          {c.save}
        </button>
        <button
          type="button"
          onClick={copyNumber}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-foreground transition-colors"
          style={{
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.03)",
          }}
          aria-live="polite"
        >
          {copied ? (
            <Check
              className="h-4 w-4"
              strokeWidth={2.4}
              style={{ color: "var(--color-primary)" }}
              aria-hidden
            />
          ) : (
            <Copy className="h-4 w-4" strokeWidth={2} aria-hidden />
          )}
          {copied ? c.copied : c.copy}
        </button>
      </div>
    </div>
  );
}
