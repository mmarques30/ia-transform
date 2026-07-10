import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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

interface ThankYouSearch {
  /** Event ID recebido do HeroForm pra deduplicação do evento Lead no Meta. */
  eid?: string;
}

export const Route = createFileRoute("/thank-you-business")({
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
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Inscrição confirmada · IAplicada Business" },
    ],
  }),
  component: ThankYouBusinessPage,
});

/**
 * Dispara o evento Lead no Meta Pixel como backup pro disparo client-side
 * que rodou no HeroForm antes do redirect. O eventID é o mesmo, então o
 * Meta deduplica automaticamente. Se chegou aqui sem eid (acesso direto,
 * F5 etc), não dispara — evita falso-positivo em conversão.
 */
function useFireLeadBackup(eid: string | undefined) {
  useEffect(() => {
    if (!eid) {
      console.log("[thank-you] no eid, skipping Lead backup");
      return;
    }
    type FbqFn = (
      action: "track",
      event: string,
      params?: Record<string, unknown>,
      opts?: { eventID: string },
    ) => void;
    const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
    if (typeof fbq !== "function") {
      console.warn("[thank-you] fbq not available — Lead backup não disparado");
      return;
    }
    fbq(
      "track",
      "Lead",
      {
        content_name: "business_diagnostic",
        content_category: "business",
      },
      { eventID: eid },
    );
    console.log("[thank-you] Lead backup fired", { eventID: eid });
  }, [eid]);
}

const NEXT_STEPS = [
  {
    n: "01",
    Icon: MessageSquare,
    title: "Nosso time já te chamou no WhatsApp",
    text: "Pra entender sobre a sua operação antes do diagnóstico.",
  },
  {
    n: "02",
    Icon: CalendarClock,
    title: "Agendamos um diagnóstico de 30 min",
    text: "Onde o nosso time entende o seu gargalo em detalhe.",
  },
  {
    n: "03",
    Icon: ClipboardCheck,
    title: "Você recebe o diagnóstico detalhado",
    text: "Com as melhorias mapeadas pro seu processo, ao final da conversa.",
  },
];

/**
 * Thank-you shared entre LP-A (/) e LP-B (/businessv2). Reformulada no
 * layout dark das LPs (BgDobra + ia-bg + Reveal + tipografia padronizada
 * 28/36/44), no lugar do academy-theme cream anterior.
 */
function ThankYouBusinessPage() {
  const { eid } = Route.useSearch();
  useFireLeadBackup(eid);

  return (
    <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
      {/* HERO confirmação */}
      <BgDobra intensity="alta">
        <section id="top" className="relative pt-[100px] pb-[60px] lg:pt-[140px] lg:pb-[80px]">
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
                    backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                    border: "1px solid oklch(0.75 0.20 122 / 0.4)",
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
                    borderColor: "oklch(0.75 0.20 122 / 0.3)",
                    backgroundColor: "oklch(0.75 0.20 122 / 0.08)",
                    color: "oklch(0.85 0.15 122)",
                    border: "1px solid oklch(0.75 0.20 122 / 0.3)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  Inscrição confirmada
                </span>
              </Reveal>

              <Reveal delay={0.15}>
                <h1 className="h-mix mt-7 text-[34px] sm:text-[48px] lg:text-[62px] leading-[1.05] text-foreground">
                  Recebemos suas <em>informações.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-7 text-[17px] sm:text-[18px] text-sage leading-[1.65] max-w-[600px] mx-auto">
                  Em breve você será contatado pra dar continuidade ao seu diagnóstico.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </BgDobra>

      {/* PRÓXIMOS PASSOS */}
      <section className="section-veil py-[80px] lg:py-[120px]">
        <div className="container-page">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center max-w-[720px] mx-auto">
              <Reveal>
                <span className="label-chip">
                  <span className="dot" />
                  Próximos passos
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h-mix mt-6 text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
                  O que <em>vem a seguir.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.6] max-w-[640px] mx-auto">
                  Como funciona o processo do seu diagnóstico.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 lg:mt-14 grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
              {NEXT_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={0.18 + i * 0.09} className="h-full">
                  <div className="tech-card p-6 lg:p-7 relative h-full flex flex-col">
                    <div className="flex items-center gap-3">
                      <span
                        className="num-display text-[13px] tracking-wider"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {step.n}
                      </span>
                      <span
                        className="h-[1px] flex-1"
                        style={{
                          background: "linear-gradient(90deg, var(--color-primary), transparent)",
                        }}
                      />
                    </div>
                    <span
                      className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: "oklch(0.75 0.20 122 / 0.12)",
                        border: "1px solid oklch(0.75 0.20 122 / 0.3)",
                      }}
                    >
                      <step.Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                        style={{ color: "var(--color-primary)" }}
                      />
                    </span>
                    <h3 className="mt-4 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.3]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-sage leading-[1.55]">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW OPERAÇÃO — mantido, ajustado pro dark */}
      <BgDobra intensity="media">
        <section className="relative py-[80px] lg:py-[120px] overflow-hidden">
          <div className="container-page relative">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1100px] mx-auto">
              <div className="lg:order-1 order-2">
                <Reveal>
                  <span className="label-chip">
                    <span className="dot" />
                    Operação que enxerga
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="h-mix mt-6 text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
                    A sua empresa em <em className="whitespace-nowrap">todas as telas.</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.65] max-w-[520px]">
                    Depois do diagnóstico, é isso que a gente constrói com você. Um sistema próprio
                    que mostra a operação em tempo real, no desktop, tablet e celular.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Indicadores em tempo real, acessíveis a quem decide",
                      "Processos documentados e papéis claros",
                      "Operação que roda sem depender do dono",
                    ].map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 text-[14px] lg:text-[15px] text-foreground"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <div
                  className="lg:order-2 order-1 relative mx-auto w-full"
                  style={{ maxWidth: 520 }}
                >
                  <DeviceComposition />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </BgDobra>

      {/* CTA voltar */}
      <section className="section-veil py-[60px] lg:py-[80px]">
        <div className="container-page">
          <Reveal>
            <div className="text-center">
              <Link to="/" className="cta-primary">
                Voltar pro site
                <span className="arrow">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ------------------------------------------------------------------
 * Composição compacta: laptop principal + tablet à esquerda + phone à
 * direita. Palette adaptada pro dark theme das LPs — panels em tom
 * off-white pra ainda "brilharem" contra o fundo escuro sem quebrar
 * a leitura.
 * ------------------------------------------------------------------ */

const PANEL_BG = "oklch(0.99 0.005 110)";
const PANEL_BORDER = "oklch(0.86 0.01 115)";
const ACCENT = "oklch(0.62 0.17 125)";
const INK = "oklch(0.2 0.02 122)";
const MUTED = "oklch(0.7 0.015 115)";

function DeviceComposition() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "5 / 4" }}>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0" style={{ width: "82%" }}>
        <Laptop />
      </div>
      <div
        className="absolute hidden sm:block"
        style={{
          width: "26%",
          left: "0%",
          bottom: "6%",
          transform: "rotate(-4deg)",
          zIndex: 2,
        }}
      >
        <Tablet />
      </div>
      <div
        className="absolute"
        style={{
          width: "17%",
          right: "2%",
          bottom: "2%",
          transform: "rotate(5deg)",
          zIndex: 3,
          minWidth: 80,
        }}
      >
        <Phone />
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative">
      <div
        className="rounded-[12px] p-[7px]"
        style={{
          backgroundColor: "oklch(0.12 0.015 122)",
          boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.7)",
          border: "1px solid oklch(0.28 0.02 122)",
        }}
      >
        <div
          className="rounded-[5px] overflow-hidden relative"
          style={{
            backgroundColor: PANEL_BG,
            border: `1px solid ${PANEL_BORDER}`,
            aspectRatio: "16 / 10",
          }}
        >
          <DashboardScreen />
        </div>
      </div>
      <div
        className="mx-auto"
        style={{
          width: "108%",
          marginLeft: "-4%",
          height: 10,
          background:
            "linear-gradient(180deg, oklch(0.18 0.015 122) 0%, oklch(0.1 0.015 122) 100%)",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 8px 16px -6px oklch(0 0 0 / 0.5)",
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: "14%",
          height: 3,
          backgroundColor: "oklch(0.08 0.015 122)",
          borderRadius: "0 0 5px 5px",
        }}
      />
    </div>
  );
}

function Tablet() {
  return (
    <div
      className="rounded-[14px] p-[6px]"
      style={{
        backgroundColor: "oklch(0.12 0.015 122)",
        boxShadow: "0 20px 40px -14px oklch(0 0 0 / 0.7)",
        border: "1px solid oklch(0.28 0.02 122)",
      }}
    >
      <div
        className="rounded-[9px] overflow-hidden"
        style={{
          backgroundColor: PANEL_BG,
          border: `1px solid ${PANEL_BORDER}`,
          aspectRatio: "3 / 4",
        }}
      >
        <TabletScreen />
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div
      className="rounded-[18px] p-[4px] relative"
      style={{
        backgroundColor: "oklch(0.1 0.015 122)",
        boxShadow: "0 18px 36px -12px oklch(0 0 0 / 0.75)",
        border: "1px solid oklch(0.28 0.02 122)",
      }}
    >
      <div
        className="rounded-[14px] overflow-hidden relative"
        style={{
          backgroundColor: PANEL_BG,
          aspectRatio: "9 / 19",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1 rounded-full"
          style={{
            width: "30%",
            height: 6,
            backgroundColor: "oklch(0.1 0.015 122)",
          }}
        />
        <PhoneScreen />
      </div>
    </div>
  );
}

/* ---- "Telas" sugerindo UI ---- */

function DashboardScreen() {
  return (
    <div className="absolute inset-0 flex">
      <div
        className="h-full flex flex-col gap-[5px] p-[7px]"
        style={{
          width: "18%",
          backgroundColor: "oklch(0.96 0.01 115)",
          borderRight: `1px solid ${PANEL_BORDER}`,
        }}
      >
        <div className="flex items-center gap-1">
          <span
            className="inline-block rounded-sm"
            style={{ width: 6, height: 6, backgroundColor: ACCENT }}
          />
          <span className="rounded-sm" style={{ width: "60%", height: 3, backgroundColor: INK }} />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: i === 1 ? "85%" : "70%",
              height: 3,
              backgroundColor: i === 1 ? ACCENT : MUTED,
              opacity: i === 1 ? 1 : 0.5,
              marginTop: i === 0 ? 3 : 0,
            }}
          />
        ))}
      </div>

      <div className="flex-1 p-[8px] flex flex-col gap-[6px]">
        <div className="flex items-center justify-between">
          <div className="rounded-sm" style={{ width: 50, height: 4, backgroundColor: INK }} />
          <div className="flex gap-1">
            <div
              className="rounded-full"
              style={{ width: 8, height: 8, backgroundColor: MUTED, opacity: 0.5 }}
            />
            <div
              className="rounded-full"
              style={{ width: 8, height: 8, backgroundColor: ACCENT }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {[
            { v: "R$ 2.4M", l: "Pipeline" },
            { v: "184", l: "Deals" },
            { v: "32%", l: "Conversão" },
          ].map((k, i) => (
            <div
              key={i}
              className="rounded-md p-1.5"
              style={{ backgroundColor: "white", border: `1px solid ${PANEL_BORDER}` }}
            >
              <div
                className="rounded-sm"
                style={{ width: "55%", height: 2.5, backgroundColor: MUTED, opacity: 0.6 }}
              />
              <div className="mt-0.5 font-bold" style={{ fontSize: 8, color: INK, lineHeight: 1 }}>
                {k.v}
              </div>
              <div className="mt-0.5" style={{ fontSize: 5, color: MUTED }}>
                {k.l}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-md p-1.5 flex-1 relative"
          style={{ backgroundColor: "white", border: `1px solid ${PANEL_BORDER}` }}
        >
          <div
            className="rounded-sm"
            style={{ width: "30%", height: 3, backgroundColor: INK, opacity: 0.7 }}
          />
          <div className="absolute inset-x-1.5 bottom-1.5 flex items-end gap-[2px] h-[55%]">
            {[35, 52, 28, 68, 44, 80, 60, 90, 72, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i === 9
                      ? ACCENT
                      : i % 2 === 0
                        ? "oklch(0.85 0.04 115)"
                        : "oklch(0.92 0.02 115)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletScreen() {
  return (
    <div className="absolute inset-0 p-[6px] flex flex-col gap-[5px]">
      <div className="flex items-center justify-between">
        <div className="rounded-sm" style={{ width: 22, height: 3, backgroundColor: INK }} />
        <div className="rounded-full" style={{ width: 5, height: 5, backgroundColor: ACCENT }} />
      </div>

      <div
        className="rounded-md p-1.5"
        style={{ backgroundColor: "white", border: `1px solid ${PANEL_BORDER}` }}
      >
        <div
          className="rounded-sm"
          style={{ width: "40%", height: 2.5, backgroundColor: MUTED, opacity: 0.5 }}
        />
        <div className="mt-1 font-bold" style={{ fontSize: 9, color: INK, lineHeight: 1 }}>
          R$ 482k
        </div>
        <div className="mt-1.5 flex items-end gap-0.5 h-[18px]">
          {[40, 60, 35, 75, 50, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                backgroundColor: i === 5 ? ACCENT : "oklch(0.85 0.03 115)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-md flex items-center gap-1 p-1"
            style={{ backgroundColor: "white", border: `1px solid ${PANEL_BORDER}` }}
          >
            <div
              className="rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: i === 0 ? ACCENT : MUTED,
                opacity: i === 0 ? 1 : 0.5,
              }}
            />
            <div className="flex-1 flex flex-col gap-0.5">
              <div
                className="rounded-sm"
                style={{ width: "70%", height: 2.5, backgroundColor: INK, opacity: 0.7 }}
              />
              <div
                className="rounded-sm"
                style={{ width: "45%", height: 2, backgroundColor: MUTED, opacity: 0.4 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="absolute inset-0 pt-[14%] px-[8%] pb-[8%] flex flex-col gap-0.5">
      <div className="rounded-sm" style={{ width: "45%", height: 2.5, backgroundColor: INK }} />
      <div
        className="rounded-sm"
        style={{ width: "70%", height: 2, backgroundColor: MUTED, opacity: 0.5 }}
      />

      <div className="mt-1.5 rounded-md p-1" style={{ backgroundColor: ACCENT, color: "white" }}>
        <div
          className="rounded-sm"
          style={{ width: "50%", height: 1.5, backgroundColor: "white", opacity: 0.5 }}
        />
        <div className="mt-0.5 font-bold" style={{ fontSize: 7, lineHeight: 1 }}>
          R$ 184k
        </div>
      </div>

      <div className="mt-1 flex-1 flex flex-col gap-0.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md flex items-center gap-1 p-0.5"
            style={{ backgroundColor: "white", border: `1px solid ${PANEL_BORDER}` }}
          >
            <div
              className="rounded-full shrink-0"
              style={{
                width: 4,
                height: 4,
                backgroundColor: i === 0 ? ACCENT : MUTED,
                opacity: i === 0 ? 1 : 0.4,
              }}
            />
            <div className="flex-1">
              <div
                className="rounded-sm"
                style={{ width: "80%", height: 1.5, backgroundColor: INK, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
