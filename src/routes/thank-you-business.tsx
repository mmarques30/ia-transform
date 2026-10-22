import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  CalendarClock,
  ClipboardCheck,
} from "lucide-react";
import { BgDobra } from "@/components/BgDobra";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { formatPhone, onlyDigits, readLeadDraft } from "@/lib/whatsapp";

interface ThankYouSearch {
  eid?: string;
}

export const Route = createFileRoute("/thank-you-business")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): ThankYouSearch => ({
    eid: typeof search.eid === "string" ? search.eid : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Inscrição confirmada · IAplicada Business" },
      {
        name: "description",
        content:
          "Recebemos suas informações. Em breve você será contatado para dar continuidade ao seu diagnóstico estratégico.",
      },
      { property: "og:url", content: "https://iaplicada.com/thank-you-business" },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Inscrição confirmada · IAplicada Business" },
    ],
  }),
  component: ThankYouBusinessPage,
});

function useFireLeadBackup(eid: string | undefined) {
  useEffect(() => {
    if (!eid) return;
    type FbqFn = (
      action: "track",
      event: string,
      params?: Record<string, unknown>,
      opts?: { eventID: string },
    ) => void;
    const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
    if (typeof fbq !== "function") return;
    fbq(
      "track",
      "Lead",
      { content_name: "business_diagnostic", content_category: "business" },
      { eventID: eid },
    );
  }, [eid]);
}

/**
 * Conversão do Google Ads (tag base AW-18531612150 carregada no __root.tsx).
 *
 * Uma única vez por envio de formulário: só dispara com eid (gerado no
 * envio) e guarda os eids já convertidos no localStorage, então recarregar
 * a página, voltar pelo histórico ou abrir o link de novo não conta outra
 * conversão. transaction_id = eid faz o próprio Google descartar repetição.
 */
const GADS_CONVERSION_SEND_TO = "AW-18531612150/u9k7CMHqk6YdEPbrx4RF";
const GADS_CONVERTED_KEY = "iap_gads_converted";

function readConvertedEids(): string[] {
  try {
    const list = JSON.parse(localStorage.getItem(GADS_CONVERTED_KEY) ?? "[]");
    return Array.isArray(list) ? list.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function markConverted(eid: string): void {
  try {
    // Só os últimos 20: o suficiente pra cobrir reenvios no mesmo aparelho.
    const list = [...readConvertedEids().filter((x) => x !== eid), eid].slice(-20);
    localStorage.setItem(GADS_CONVERTED_KEY, JSON.stringify(list));
  } catch {
    // storage bloqueado: o transaction_id ainda evita contagem dupla no Google
  }
}

function useFireGoogleAdsConversion(eid: string | undefined) {
  useEffect(() => {
    if (!eid || readConvertedEids().includes(eid)) return;
    type GtagFn = (command: "event", action: string, params: Record<string, unknown>) => void;
    const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
    if (typeof gtag !== "function") return;
    markConverted(eid);
    try {
      gtag("event", "conversion", { send_to: GADS_CONVERSION_SEND_TO, transaction_id: eid });
    } catch (err) {
      console.warn("[thank-you] Google Ads conversion throw", err);
    }
  }, [eid]);
}

const NEXT_STEPS = [
  {
    n: "01",
    Icon: MessageSquare,
    title: "WhatsApp",
    text: "Nosso time já te chamou pra entender sobre a sua operação.",
  },
  {
    n: "02",
    Icon: CalendarClock,
    title: "Diagnóstico",
    text: "Agendamos 30 min pra mapear seu gargalo em detalhe.",
  },
  {
    n: "03",
    Icon: ClipboardCheck,
    title: "Plano",
    text: "Você recebe o diagnóstico com as melhorias mapeadas.",
  },
];

/**
 * Número que a pessoa digitou no form (sessionStorage, mesma aba) + link
 * de volta pra LP de origem com o campo de WhatsApp em foco.
 */
function useSubmittedWhatsapp() {
  const [data, setData] = useState<{ phone: string; returnHref: string } | null>(null);
  useEffect(() => {
    const draft = readLeadDraft();
    const digits = draft ? onlyDigits(draft.phone) : "";
    if (draft && digits) setData({ phone: formatPhone(digits), returnHref: draft.returnHref });
  }, []);
  return data;
}

function ThankYouBusinessPage() {
  const { eid } = Route.useSearch();
  useFireLeadBackup(eid);
  useFireGoogleAdsConversion(eid);
  const whatsapp = useSubmittedWhatsapp();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
      <BgDobra intensity="alta">
        <section
          id="top"
          className="relative flex flex-col items-center justify-center"
          style={{ minHeight: "100dvh", padding: "80px 0 60px" }}
        >
          <div className="container-page">
            <div className="text-center max-w-[680px] mx-auto">
              <Reveal>
                <img
                  src="/brand/iaplicada-logo-dark.png"
                  alt="IAplicada"
                  height={28}
                  className="block mx-auto"
                  style={{ height: 28, width: "auto" }}
                />
              </Reveal>

              <Reveal delay={0.05}>
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full mt-8"
                  style={{
                    backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                    border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                  }}
                >
                  <CheckCircle2
                    className="h-8 w-8"
                    strokeWidth={2}
                    style={{ color: "var(--color-primary)" }}
                  />
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="h-mix mt-6 text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.05] text-foreground">
                  Recebemos suas <em>informações.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-5 text-[16px] sm:text-[17px] text-sage leading-[1.65] max-w-[480px] mx-auto">
                  Em breve você será contatado pra dar continuidade ao seu diagnóstico.
                </p>
              </Reveal>

              {whatsapp && (
                <Reveal delay={0.18}>
                  <p className="mt-4 text-[15px] sm:text-[16px] text-sage leading-[1.6]">
                    Vamos te chamar no WhatsApp{" "}
                    <strong className="text-foreground font-semibold whitespace-nowrap">
                      {whatsapp.phone}
                    </strong>
                    .{" "}
                    <a
                      href={whatsapp.returnHref}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate({ href: whatsapp.returnHref });
                      }}
                      className="underline underline-offset-4 whitespace-nowrap"
                      style={{ color: "var(--color-primary)" }}
                    >
                      errou? corrigir
                    </a>
                  </p>
                </Reveal>
              )}

              <Reveal delay={0.2}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[600px] mx-auto">
                  {NEXT_STEPS.map((step) => (
                    <div
                      key={step.n}
                      className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 px-4 py-4 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: "oklch(0.75 0.20 122 / 0.12)",
                          border: "1px solid oklch(0.75 0.20 122 / 0.25)",
                        }}
                      >
                        <step.Icon
                          className="h-4 w-4"
                          strokeWidth={2}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </span>
                      <div className="sm:text-center">
                        <span
                          className="text-[10px] uppercase tracking-[0.14em] font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {step.n}
                        </span>
                        <p className="text-[13px] text-sage leading-[1.4] mt-0.5">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-10">
                  <Link to="/" className="cta-primary">
                    Voltar pro site
                    <span className="arrow">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </BgDobra>

      <Footer />
    </main>
  );
}
