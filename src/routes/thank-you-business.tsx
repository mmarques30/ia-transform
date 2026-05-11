import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/thank-you-business")({
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

function ThankYouBusinessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO confirmação */}
      <section
        id="top"
        className="relative pt-[140px] pb-[60px] lg:pt-[180px] lg:pb-[80px] overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 80%)",
          }}
        />

        <div className="container-page relative">
          <div className="text-center max-w-[720px] mx-auto">
            <Reveal>
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "oklch(0.97 0.025 125)",
                  border: "1px solid oklch(0.85 0.05 125)",
                }}
              >
                <CheckCircle2
                  className="h-9 w-9"
                  strokeWidth={2}
                  style={{ color: "var(--color-primary)" }}
                />
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <span className="mt-7 label-chip">
                <span className="dot" />
                Inscrição confirmada
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="h-mix mt-6 text-[36px] sm:text-[46px] lg:text-[56px] text-foreground">
                Recebemos suas <em>informações</em>.
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 text-[17px] lg:text-[19px] text-foreground font-medium leading-[1.55] max-w-[560px] mx-auto">
                Em breve você será contatado pra dar continuidade ao seu diagnóstico.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MOCKUPS de devices */}
      <section
        className="py-[60px] lg:py-[90px] relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 tech-bg-dots opacity-40"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)",
          }}
        />

        <div className="container-page relative">
          <div className="text-center max-w-[640px] mx-auto">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                Operação que enxerga
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-3 text-[26px] sm:text-[32px] lg:text-[38px] text-foreground">
                A sua empresa em <em>todas as telas</em>.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-12 lg:mt-14 relative mx-auto" style={{ maxWidth: 980 }}>
              <DeviceComposition />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA voltar */}
      <section className="py-[50px] lg:py-[70px] bg-background">
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
 * Mockups CSS-puros de laptop + tablet + phone compondo um único frame.
 * Sem imagens externas: a UI interna é renderizada com divs estilizadas
 * sugerindo dashboard/operação (KPIs, lista, mini-gráfico).
 * ------------------------------------------------------------------ */

const PANEL_BG = "oklch(0.99 0.005 110)";
const PANEL_BORDER = "oklch(0.9 0.01 115)";
const ACCENT = "var(--color-primary)";
const INK = "oklch(0.2 0.02 122)";
const MUTED = "oklch(0.7 0.015 115)";

function DeviceComposition() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
      {/* Laptop — centro/fundo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0"
        style={{ width: "78%" }}
      >
        <Laptop />
      </div>

      {/* Tablet — esquerda na frente */}
      <div
        className="absolute hidden md:block"
        style={{
          width: "26%",
          left: "2%",
          bottom: "8%",
          transform: "rotate(-4deg)",
          zIndex: 2,
        }}
      >
        <Tablet />
      </div>

      {/* Phone — direita na frente */}
      <div
        className="absolute"
        style={{
          width: "16%",
          right: "4%",
          bottom: "4%",
          transform: "rotate(5deg)",
          zIndex: 3,
          minWidth: 110,
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
      {/* Tela */}
      <div
        className="rounded-[14px] p-[8px]"
        style={{
          backgroundColor: "oklch(0.15 0.015 122)",
          boxShadow: "0 25px 60px -20px oklch(0 0 0 / 0.35)",
        }}
      >
        <div
          className="rounded-[6px] overflow-hidden relative"
          style={{
            backgroundColor: PANEL_BG,
            border: `1px solid ${PANEL_BORDER}`,
            aspectRatio: "16 / 10",
          }}
        >
          <DashboardScreen />
        </div>
      </div>
      {/* Base */}
      <div
        className="mx-auto"
        style={{
          width: "108%",
          marginLeft: "-4%",
          height: 12,
          background:
            "linear-gradient(180deg, oklch(0.18 0.015 122) 0%, oklch(0.12 0.015 122) 100%)",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 8px 16px -6px oklch(0 0 0 / 0.3)",
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: "16%",
          height: 4,
          backgroundColor: "oklch(0.1 0.015 122)",
          borderRadius: "0 0 6px 6px",
        }}
      />
    </div>
  );
}

function Tablet() {
  return (
    <div
      className="rounded-[18px] p-[7px]"
      style={{
        backgroundColor: "oklch(0.15 0.015 122)",
        boxShadow: "0 20px 50px -15px oklch(0 0 0 / 0.4)",
      }}
    >
      <div
        className="rounded-[12px] overflow-hidden"
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
      className="rounded-[22px] p-[5px] relative"
      style={{
        backgroundColor: "oklch(0.12 0.015 122)",
        boxShadow: "0 18px 40px -12px oklch(0 0 0 / 0.45)",
      }}
    >
      <div
        className="rounded-[17px] overflow-hidden relative"
        style={{
          backgroundColor: PANEL_BG,
          aspectRatio: "9 / 19",
        }}
      >
        {/* Notch */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1.5 rounded-full"
          style={{
            width: "30%",
            height: 8,
            backgroundColor: "oklch(0.12 0.015 122)",
          }}
        />
        <PhoneScreen />
      </div>
    </div>
  );
}

/* ---- "Telas" sugerindo UI do produto ---- */

function DashboardScreen() {
  return (
    <div className="absolute inset-0 flex">
      {/* Sidebar */}
      <div
        className="h-full flex flex-col gap-[6px] p-[8px]"
        style={{
          width: "18%",
          backgroundColor: "oklch(0.96 0.01 115)",
          borderRight: `1px solid ${PANEL_BORDER}`,
        }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-sm"
            style={{ width: 8, height: 8, backgroundColor: ACCENT }}
          />
          <span
            className="rounded-sm"
            style={{ width: "65%", height: 4, backgroundColor: INK }}
          />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: i === 1 ? "85%" : "70%",
              height: 4,
              backgroundColor: i === 1 ? ACCENT : MUTED,
              opacity: i === 1 ? 1 : 0.5,
              marginTop: i === 0 ? 4 : 0,
            }}
          />
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-[10px] flex flex-col gap-[8px]">
        {/* Topbar */}
        <div className="flex items-center justify-between">
          <div
            className="rounded-sm"
            style={{ width: 60, height: 5, backgroundColor: INK }}
          />
          <div className="flex gap-1.5">
            <div
              className="rounded-full"
              style={{ width: 10, height: 10, backgroundColor: MUTED, opacity: 0.5 }}
            />
            <div
              className="rounded-full"
              style={{ width: 10, height: 10, backgroundColor: ACCENT }}
            />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { v: "R$ 2.4M", l: "Pipeline" },
            { v: "184", l: "Deals" },
            { v: "32%", l: "Conversão" },
          ].map((k, i) => (
            <div
              key={i}
              className="rounded-md p-1.5"
              style={{
                backgroundColor: "white",
                border: `1px solid ${PANEL_BORDER}`,
              }}
            >
              <div
                className="rounded-sm"
                style={{ width: "55%", height: 3, backgroundColor: MUTED, opacity: 0.6 }}
              />
              <div
                className="mt-1 font-bold"
                style={{ fontSize: 9, color: INK, lineHeight: 1 }}
              >
                {k.v}
              </div>
              <div className="mt-0.5" style={{ fontSize: 5.5, color: MUTED }}>
                {k.l}
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico */}
        <div
          className="rounded-md p-2 flex-1 relative"
          style={{
            backgroundColor: "white",
            border: `1px solid ${PANEL_BORDER}`,
          }}
        >
          <div
            className="rounded-sm"
            style={{ width: "30%", height: 4, backgroundColor: INK, opacity: 0.7 }}
          />
          <div className="absolute inset-x-2 bottom-2 flex items-end gap-[3px] h-[55%]">
            {[35, 52, 28, 68, 44, 80, 60, 90, 72, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i === 9 ? ACCENT : i % 2 === 0 ? "oklch(0.85 0.04 115)" : "oklch(0.92 0.02 115)",
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
    <div className="absolute inset-0 p-[8px] flex flex-col gap-[6px]">
      <div className="flex items-center justify-between">
        <div
          className="rounded-sm"
          style={{ width: 30, height: 4, backgroundColor: INK }}
        />
        <div
          className="rounded-full"
          style={{ width: 7, height: 7, backgroundColor: ACCENT }}
        />
      </div>

      <div
        className="rounded-md p-2"
        style={{
          backgroundColor: "white",
          border: `1px solid ${PANEL_BORDER}`,
        }}
      >
        <div
          className="rounded-sm"
          style={{ width: "40%", height: 3, backgroundColor: MUTED, opacity: 0.5 }}
        />
        <div className="mt-1.5 font-bold" style={{ fontSize: 11, color: INK, lineHeight: 1 }}>
          R$ 482k
        </div>
        <div className="mt-2 flex items-end gap-0.5 h-[24px]">
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

      <div className="flex-1 flex flex-col gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md flex items-center gap-1.5 p-1.5"
            style={{
              backgroundColor: "white",
              border: `1px solid ${PANEL_BORDER}`,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: i === 0 ? ACCENT : MUTED,
                opacity: i === 0 ? 1 : 0.5,
              }}
            />
            <div className="flex-1 flex flex-col gap-0.5">
              <div
                className="rounded-sm"
                style={{ width: "70%", height: 3, backgroundColor: INK, opacity: 0.7 }}
              />
              <div
                className="rounded-sm"
                style={{ width: "45%", height: 2.5, backgroundColor: MUTED, opacity: 0.4 }}
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
    <div className="absolute inset-0 pt-[14%] px-[8%] pb-[8%] flex flex-col gap-1">
      <div
        className="rounded-sm"
        style={{ width: "45%", height: 3, backgroundColor: INK }}
      />
      <div
        className="rounded-sm"
        style={{ width: "70%", height: 2.5, backgroundColor: MUTED, opacity: 0.5 }}
      />

      <div
        className="mt-2 rounded-md p-1.5"
        style={{ backgroundColor: ACCENT, color: "white" }}
      >
        <div
          className="rounded-sm"
          style={{ width: "50%", height: 2, backgroundColor: "white", opacity: 0.5 }}
        />
        <div className="mt-1 font-bold" style={{ fontSize: 9, lineHeight: 1 }}>
          R$ 184k
        </div>
      </div>

      <div className="mt-1 flex-1 flex flex-col gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md flex items-center gap-1 p-1"
            style={{
              backgroundColor: "white",
              border: `1px solid ${PANEL_BORDER}`,
            }}
          >
            <div
              className="rounded-full shrink-0"
              style={{
                width: 5,
                height: 5,
                backgroundColor: i === 0 ? ACCENT : MUTED,
                opacity: i === 0 ? 1 : 0.4,
              }}
            />
            <div className="flex-1">
              <div
                className="rounded-sm"
                style={{ width: "80%", height: 2, backgroundColor: INK, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
