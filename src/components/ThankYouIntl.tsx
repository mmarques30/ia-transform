import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Mail,
  CalendarClock,
  ClipboardCheck,
} from "lucide-react";
import { BgDobra } from "@/components/BgDobra";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { LpLocaleProvider } from "@/lib/lpLocale";
import { readLeadDraft } from "@/lib/whatsapp";

/**
 * Obrigado das LPs dos EUA (/thank-you-us e /thank-you-en). Mesmo layout da
 * /thank-you-business, que fica intocada: a conversão personalizada do Meta
 * pro Brasil é "URL contém /thank-you-business", então cada trilha tem a
 * própria URL.
 *
 * Pixel: o Lead de sempre (mesmos parâmetros e eventID do envio, backup do
 * disparo no form) + o evento próprio da trilha (lead_us_pt / lead_us_en),
 * que só existe aqui.
 */

export type IntlMarket = "pt-us" | "en";

export const THANK_YOU_EVENTS: Record<IntlMarket, string> = {
  "pt-us": "lead_us_pt",
  en: "lead_us_en",
};

interface Step {
  n: string;
  Icon: typeof MessageSquare;
  text: string;
}

interface ThankYouCopy {
  titleA: string;
  titleEm: string;
  sub: string;
  steps: Step[];
  back: string;
  backTo: "/us-contratacao" | "/en-contratacao";
}

const COPY: Record<IntlMarket, ThankYouCopy> = {
  "pt-us": {
    titleA: "Recebemos suas",
    titleEm: "informações.",
    sub: "Em breve você será contatado pra dar continuidade ao seu diagnóstico.",
    steps: [
      {
        n: "01",
        Icon: MessageSquare,
        text: "Nosso time já te chamou pra entender sobre a sua operação.",
      },
      { n: "02", Icon: CalendarClock, text: "Agendamos 30 min pra mapear seu gargalo em detalhe." },
      {
        n: "03",
        Icon: ClipboardCheck,
        text: "Você recebe o diagnóstico com as melhorias mapeadas.",
      },
    ],
    back: "Voltar pro site",
    backTo: "/us-contratacao",
  },
  en: {
    titleA: "We received your",
    titleEm: "information.",
    sub: "We'll get back to you by email shortly to continue with your diagnostic.",
    steps: [
      { n: "01", Icon: Mail, text: "Our team will email you to learn more about your operations." },
      {
        n: "02",
        Icon: CalendarClock,
        text: "We'll schedule 30 minutes to map your bottleneck in detail.",
      },
      {
        n: "03",
        Icon: ClipboardCheck,
        text: "You'll receive the diagnostic with the improvements we mapped.",
      },
    ],
    back: "Back to site",
    backTo: "/en-contratacao",
  },
};

export const THANK_YOU_HEAD: Record<
  IntlMarket,
  { path: string; title: string; description: string }
> = {
  "pt-us": {
    path: "/thank-you-us",
    title: "Inscrição confirmada · IAplicada Business",
    description:
      "Recebemos suas informações. Em breve você será contatado para dar continuidade ao seu diagnóstico estratégico.",
  },
  en: {
    path: "/thank-you-en",
    title: "Request received · IAplicada Business",
    description:
      "We received your information. We'll get back to you by email shortly to continue with your diagnostic.",
  },
};

export function thankYouHead(market: IntlMarket) {
  const h = THANK_YOU_HEAD[market];
  return {
    meta: [
      { title: h.title },
      { name: "description", content: h.description },
      { property: "og:url", content: `https://iaplicada.com${h.path}` },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: h.title },
    ],
  };
}

type FbqFn = (
  action: "track" | "trackCustom",
  event: string,
  params?: Record<string, unknown>,
  opts?: { eventID: string },
) => void;

/** eventIDs já disparados nesta aba: remontagem não repete o evento. */
const firedEventIds = new Set<string>();

function useFireLeadEvents(eid: string | undefined, market: IntlMarket) {
  useEffect(() => {
    if (!eid || firedEventIds.has(eid)) return;
    const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
    if (typeof fbq !== "function") return;
    firedEventIds.add(eid);
    const params = { content_name: "business_diagnostic", content_category: "business" };
    try {
      fbq("track", "Lead", params, { eventID: eid });
    } catch (err) {
      console.warn("[thank-you] Lead pixel throw", err);
    }
    try {
      fbq("trackCustom", THANK_YOU_EVENTS[market], params, { eventID: eid });
    } catch (err) {
      console.warn("[thank-you] custom pixel throw", err);
    }
  }, [eid, market]);
}

/** O que a pessoa enviou no form (sessionStorage, mesma aba). */
function useSubmittedDraft() {
  const [data, setData] = useState<{ phone: string; email: string; returnHref: string } | null>(
    null,
  );
  useEffect(() => {
    const draft = readLeadDraft();
    if (draft)
      setData({
        phone: draft.phone.trim(),
        email: draft.email.trim(),
        returnHref: draft.returnHref,
      });
  }, []);
  return data;
}

export function ThankYouIntl({ market, eid }: { market: IntlMarket; eid?: string }) {
  useFireLeadEvents(eid, market);
  const c = COPY[market];
  const draft = useSubmittedDraft();
  const navigate = useNavigate();

  return (
    <LpLocaleProvider locale={market}>
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
                    {c.titleA} <em>{c.titleEm}</em>
                  </h1>
                </Reveal>

                <Reveal delay={0.15}>
                  <p className="mt-5 text-[16px] sm:text-[17px] text-sage leading-[1.65] max-w-[480px] mx-auto">
                    {c.sub}
                  </p>
                </Reveal>

                {market === "pt-us" && draft?.phone && (
                  <Reveal delay={0.18}>
                    <p className="mt-4 text-[15px] sm:text-[16px] text-sage leading-[1.6]">
                      Vamos te chamar no WhatsApp{" "}
                      <strong className="text-foreground font-semibold whitespace-nowrap">
                        {draft.phone}
                      </strong>
                      .{" "}
                      <a
                        href={draft.returnHref}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate({ href: draft.returnHref });
                        }}
                        className="underline underline-offset-4 whitespace-nowrap"
                        style={{ color: "var(--color-primary)" }}
                      >
                        errou? corrigir
                      </a>
                    </p>
                  </Reveal>
                )}

                {market === "en" && draft?.email && (
                  <Reveal delay={0.18}>
                    <p className="mt-4 text-[15px] sm:text-[16px] text-sage leading-[1.6]">
                      We'll reach out at{" "}
                      <strong className="text-foreground font-semibold break-all">
                        {draft.email}
                      </strong>
                      .
                    </p>
                  </Reveal>
                )}

                <Reveal delay={0.2}>
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[600px] mx-auto">
                    {c.steps.map((step) => (
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
                    <Link to={c.backTo} className="cta-primary">
                      {c.back}
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
    </LpLocaleProvider>
  );
}
