import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { BgDobra } from "@/components/BgDobra";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";

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
        <section className="relative pt-[100px] pb-[60px] lg:pt-[140px] lg:pb-[80px]">
          <div className="container-page">
            <div className="text-center max-w-[760px] mx-auto">
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
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full mt-8"
                  style={{
                    backgroundColor: "rgba(139,155,58,0.15)",
                    border: "1.5px solid rgba(139,155,58,0.4)",
                    boxShadow: "0 0 30px -6px rgba(200,224,64,0.2)",
                  }}
                >
                  <CheckCircle2
                    className="h-9 w-9"
                    strokeWidth={2}
                    style={{ color: "var(--color-primary)" }}
                  />
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <span
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold"
                  style={{
                    backgroundColor: "rgba(139,155,58,0.08)",
                    color: "var(--color-primary)",
                    border: "1px solid rgba(139,155,58,0.3)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  Kit enviado
                </span>
              </Reveal>

              <Reveal delay={0.15}>
                <h1 className="h-mix mt-7 text-[34px] sm:text-[48px] lg:text-[62px] leading-[1.05] text-foreground">
                  Pronto! Kit <em>a caminho.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-7 text-[17px] sm:text-[18px] text-sage leading-[1.65] max-w-[600px] mx-auto">
                  Enviamos o acesso completo para você.
                  <br />
                  Confira agora nos canais abaixo:
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </BgDobra>

      <section className="section-veil py-[80px] lg:py-[120px]">
        <div className="container-page">
          <div className="max-w-[480px] mx-auto flex flex-col gap-4">
            <Reveal>
              <div
                className="flex items-center gap-4 rounded-xl px-6 py-5"
                style={{
                  background: "rgba(139,155,58,0.08)",
                  border: "1px solid rgba(139,155,58,0.25)",
                }}
              >
                <MessageCircle className="h-6 w-6 shrink-0" style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-[15px] font-semibold text-foreground">WhatsApp</p>
                  <p className="text-[13px] mt-0.5" style={{ color: "var(--text-sage, #c4c8bc)" }}>
                    Verifique suas mensagens
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                className="flex items-center gap-4 rounded-xl px-6 py-5"
                style={{
                  background: "rgba(139,155,58,0.08)",
                  border: "1px solid rgba(139,155,58,0.25)",
                }}
              >
                <Mail className="h-6 w-6 shrink-0" style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-[15px] font-semibold text-foreground">E-mail</p>
                  <p className="text-[13px] mt-0.5" style={{ color: "var(--text-sage, #c4c8bc)" }}>
                    Confira sua caixa de entrada
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p
              className="mt-10 text-center text-[11px] uppercase tracking-[0.08em]"
              style={{ color: "var(--text-muted, #8a8e82)" }}
            >
              &#10038; IAplicada
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
