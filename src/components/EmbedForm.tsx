import { useEffect, useRef } from "react";

/**
 * Form embed da IAplicada (Lovable) via iframe, com auto-resize por
 * postMessage e repasse de UTMs. Usado nas LPs de funil dedicado cujo
 * formulário tem campos próprios configurados no Lovable (ex: contábil →
 * slug business-contabil, com perguntas específicas do escritório).
 */
const FORM_ORIGIN = "https://saasiaplicada.lovable.app";

interface EmbedFormProps {
  /** Slug do form no Lovable (ex: "business-contabil"). */
  slug: string;
}

export function EmbedForm({ slug }: EmbedFormProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const utmQuery = utmKeys
      .map((k) => `${k}=${encodeURIComponent(params.get(k) || "")}`)
      .join("&");

    iframe.src = `${FORM_ORIGIN}/form/${slug}?${utmQuery}&embed=1`;

    const onMessage = (e: MessageEvent) => {
      if (!e.data || e.data.type !== "iaplicada-form-resize") return;
      if (e.data.slug !== slug) return;
      iframe.style.height = `${e.data.height + 20}px`;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [slug]);

  return (
    <div className="w-full mx-auto" style={{ maxWidth: 640 }}>
      <iframe
        ref={iframeRef}
        title="Formulário IAplicada"
        loading="lazy"
        style={{ width: "100%", minHeight: 720, border: 0, borderRadius: 16 }}
      />
    </div>
  );
}
