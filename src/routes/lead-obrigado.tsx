import { useEffect, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { BgDobra } from "@/components/BgDobra";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { VideoPlayer } from "@/components/ui/video-player";

/** Vídeo de boas-vindas exibido logo após o envio do kit. */
const WELCOME_VIDEO_ID = "DB2wiUEPT18";

interface LeadObrigadoSearch {
  eid?: string;
}

export const Route = createFileRoute("/lead-obrigado")({
  validateSearch: (search: Record<string, unknown>): LeadObrigadoSearch => ({
    eid: typeof search.eid === "string" ? search.eid : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kit enviado · IAplicada" },
      {
        name: "description",
        content:
          "Seu kit de automação com IA foi enviado. Confira seu WhatsApp e e-mail.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Kit enviado · IAplicada" },
    ],
  }),
  component: LeadObrigadoPage,
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
      {
        content_name: "kit_automacao_ia",
        content_category: "lead_magnet",
      },
      { eventID: eid },
    );
  }, [eid]);
}

function LeadObrigadoPage() {
  const { eid } = Route.useSearch();
  useFireLeadBackup(eid);

  return (
    <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
      <BgDobra intensity="alta">
        <section className="relative pt-[72px] pb-[56px] lg:pt-[96px] lg:pb-[80px]">
          <div className="container-page">
            {/* Cabeçalho enxuto — o vídeo é o protagonista */}
            <div className="text-center max-w-[880px] mx-auto">
              <Reveal>
                <img
                  src="/brand/iaplicada-logo-dark.png"
                  alt="IAplicada"
                  height={26}
                  className="block mx-auto"
                  style={{ height: 26, width: "auto" }}
                />
              </Reveal>

              <Reveal delay={0.05}>
                <span
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold"
                  style={{
                    backgroundColor: "rgba(139,155,58,0.08)",
                    color: "var(--color-primary)",
                    border: "1px solid rgba(139,155,58,0.3)",
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Kit enviado
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="h-mix mt-5 text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.06] text-foreground">
                  Pronto! Antes de abrir o kit, <em>assista isso.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-4 text-[15px] sm:text-[17px] text-sage leading-[1.6] max-w-[560px] mx-auto">
                  O acesso completo já está indo pro seu WhatsApp e e-mail.
                </p>
              </Reveal>
            </div>

            {/* Vídeo */}
            <Reveal delay={0.2}>
              <div className="mt-8 lg:mt-10 max-w-[920px] mx-auto">
                <VideoPlayer
                  videoId={WELCOME_VIDEO_ID}
                  size="full"
                  title="Vídeo de boas-vindas ao kit de automação com IA"
                  className="rounded-2xl"
                  style={{
                    border: "1px solid rgba(139,155,58,0.28)",
                    boxShadow:
                      "0 0 60px -12px rgba(200,224,64,0.18), 0 0 120px -24px rgba(139,155,58,0.14), 0 28px 70px -20px rgba(0,0,0,0.7)",
                  }}
                />
              </div>
            </Reveal>

            {/* Onde o kit chega — segundo plano, discreto, enquanto ela assiste */}
            <Reveal delay={0.28}>
              <div className="mt-5 lg:mt-6 max-w-[560px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <ChannelPill
                  icon={<MessageCircle className="h-4.5 w-4.5" />}
                  label="WhatsApp"
                  hint="Verifique suas mensagens"
                />
                <ChannelPill
                  icon={<Mail className="h-4.5 w-4.5" />}
                  label="E-mail"
                  hint="Confira a caixa de entrada"
                />
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <p
                className="mt-8 text-center text-[11px] uppercase tracking-[0.08em]"
                style={{ color: "var(--text-muted, #8a8e82)" }}
              >
                &#10038; IAplicada
              </p>
            </Reveal>
          </div>
        </section>
      </BgDobra>

      <Footer />
    </main>
  );
}

function ChannelPill({
  icon,
  label,
  hint,
}: {
  icon: ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(139,155,58,0.16)",
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: "rgba(139,155,58,0.12)",
          color: "var(--color-primary)",
        }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.86)" }}>{label}</p>
        <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted, #8a8e82)" }}>
          {hint}
        </p>
      </div>
    </div>
  );
}
