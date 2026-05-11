import { useEffect, useRef } from "react";

const FORM_SLUG = "business";
const FORM_ORIGIN = "https://saasiaplicada.lovable.app";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * HeroForm — wrapper escuro + iframe oficial do form Business no Lovable.
 * Implementa o snippet exato fornecido pela IAplicada: cria o iframe via DOM
 * API depois do mount, propaga UTMs da URL atual e escuta `iaplicada-form-resize`
 * pra ajustar altura dinamicamente.
 */
export function HeroForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const utmQuery = UTM_KEYS.map(
      (k) => `${k}=${encodeURIComponent(params.get(k) ?? "")}`,
    ).join("&");

    const iframe = document.createElement("iframe");
    iframe.src = `${FORM_ORIGIN}/form/${FORM_SLUG}?${utmQuery}&embed=1`;
    iframe.style.width = "100%";
    iframe.style.minHeight = "720px";
    iframe.style.border = "0";
    iframe.style.borderRadius = "12px";
    iframe.style.display = "block";
    iframe.style.backgroundColor = "#ffffff";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("title", "Formulário IAplicada");
    iframe.setAttribute(
      "allow",
      "clipboard-write; clipboard-read; payment; autoplay; encrypted-media",
    );

    container.appendChild(iframe);

    function onMessage(e: MessageEvent) {
      const data = e.data as { type?: string; slug?: string; height?: number } | null;
      if (!data || data.type !== "iaplicada-form-resize" || data.slug !== FORM_SLUG) return;
      if (typeof data.height === "number") {
        iframe.style.height = `${data.height + 20}px`;
      }
    }
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
      if (iframe.parentNode === container) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div
      className="rounded-[24px] overflow-hidden relative"
      style={{
        backgroundColor: "var(--color-accent)",
        border: "1px solid oklch(0.3 0.025 122)",
        boxShadow:
          "0 40px 80px -30px oklch(0 0 0 / 0.55), 0 10px 25px -8px oklch(0.18 0.02 122 / 0.25)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
      />

      <div className="px-7 pt-8 lg:px-9 lg:pt-10 relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.16em] font-semibold"
              style={{ color: "oklch(0.65 0.015 115)" }}
            >
              Diagnóstico estratégico
            </p>
            <p className="mt-1.5 text-[18px] font-semibold text-white tracking-tight">
              Conversa de 30 min · gratuita
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold rounded-full px-2.5 py-1 shrink-0"
            style={{
              backgroundColor: "oklch(1 0 0 / 0.08)",
              color: "oklch(0.85 0.04 110)",
              border: "1px solid oklch(1 0 0 / 0.1)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "oklch(0.82 0.2 115)" }}
            />
            Vagas abertas
          </span>
        </div>
      </div>

      <div className="px-3 pb-3 pt-5 lg:px-4 lg:pb-4 lg:pt-6 relative">
        <div
          ref={containerRef}
          id="iaplicada-form-business"
          className="overflow-hidden rounded-[12px]"
          style={{ backgroundColor: "oklch(1 0 0)", width: "100%", maxWidth: 640, margin: "0 auto" }}
        />

        <p
          className="pt-4 text-[11.5px] text-center leading-relaxed"
          style={{ color: "oklch(0.65 0.015 115)" }}
        >
          Seus dados não são compartilhados. Sem SPAM. Cancele a qualquer momento.
        </p>
      </div>
    </div>
  );
}
