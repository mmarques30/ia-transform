import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowDown, ArrowUp, Activity } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/motion";

interface Metric {
  label: string;
  delta: string;
  fill: number;
  trend: "up" | "down";
  isGoodWhen: "up" | "down";
}

const METRICS: Metric[] = [
  { label: "Tarefas manuais", delta: "−62%", fill: 38, trend: "down", isGoodWhen: "down" },
  { label: "Retrabalho", delta: "−54%", fill: 46, trend: "down", isGoodWhen: "down" },
  { label: "Visibilidade ops", delta: "+88%", fill: 88, trend: "up", isGoodWhen: "up" },
  { label: "Confiança em decisões", delta: "+74%", fill: 74, trend: "up", isGoodWhen: "up" },
  { label: "Dependência do dono", delta: "−71%", fill: 29, trend: "down", isGoodWhen: "down" },
  { label: "Crescimento previsível", delta: "+92%", fill: 92, trend: "up", isGoodWhen: "up" },
];

export function Impact() {
  return (
    <section className="section-veil py-[100px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        {/* ATO 1 — A virada operacional (claim + monitor) */}
        <div className="text-center max-w-[760px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Impacto operacional
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Sem improviso, a operação ganha <em>previsibilidade</em>
              <br className="hidden sm:block" /> e os indicadores acompanham.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Não é um KPI isolado. É a operação estruturada refletindo nos resultados.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 max-w-[1080px] mx-auto">
            <ImpactMonitor />
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact monitor — same dashboard live                              */
/* ------------------------------------------------------------------ */

function ImpactMonitor() {
  const monitorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = monitorRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bars = el.querySelectorAll<HTMLElement>(".impact-bar-fill");
    const deltas = el.querySelectorAll<HTMLElement>(".impact-delta");

    if (reduced) {
      bars.forEach((b) => (b.style.width = b.dataset.fill + "%"));
      return;
    }

    gsap.set(bars, { width: "0%" });
    gsap.set(deltas, { opacity: 0, y: 6 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        bars.forEach((b, i) => {
          gsap.to(b, {
            width: (b.dataset.fill || "0") + "%",
            duration: 1.1,
            delay: i * 0.08,
            ease: "power3.out",
          });
        });
        gsap.to(deltas, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: "power2.out",
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={monitorRef}
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "oklch(1 0 0)",
        border: "1px solid oklch(0.92 0.005 110)",
        boxShadow:
          "0 30px 60px -20px oklch(0.18 0.02 122 / 0.18), 0 8px 20px -8px oklch(0.18 0.02 122 / 0.08)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{
          borderColor: "oklch(0.92 0.005 110)",
          backgroundColor: "oklch(0.985 0.004 110)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
          <p className="ml-2 text-[10.5px] font-mono" style={{ color: "oklch(0.5 0.015 115)" }}>
            iaplicada · monitor operacional
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.55 0.16 145)" }}
        >
          <Activity className="h-2.5 w-2.5" strokeWidth={2.5} />
          ao vivo
        </span>
      </div>

      <div className="px-6 lg:px-8 pt-6 pb-4 flex items-end justify-between border-b" style={{ borderColor: "oklch(0.94 0.005 110)" }}>
        <div>
          <p
            className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
            style={{ color: "oklch(0.5 0.015 115)" }}
          >
            Operação · últimos 90 dias
          </p>
          <p
            className="mt-1.5 text-[20px] font-bold tracking-tight"
            style={{ color: "oklch(0.18 0.02 122)" }}
          >
            Antes vs. depois da estruturação
          </p>
        </div>
        <div className="text-right">
          <span
            className="block text-[32px] font-bold tracking-tight leading-none"
            style={{ color: "oklch(0.55 0.16 125)" }}
          >
            +73%
          </span>
          <span
            className="block mt-1 text-[10px] uppercase tracking-[0.14em] font-semibold"
            style={{ color: "oklch(0.5 0.015 115)" }}
          >
            ganho médio
          </span>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {METRICS.map((m) => {
          const isGood = m.trend === m.isGoodWhen;
          const TrendIcon = m.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13.5px] font-medium" style={{ color: "oklch(0.22 0.02 122)" }}>
                  {m.label}
                </p>
                <span
                  className="impact-delta inline-flex items-center gap-1 text-[13px] font-bold tracking-tight"
                  style={{
                    color: isGood ? "oklch(0.55 0.16 125)" : "oklch(0.55 0.16 25)",
                  }}
                >
                  <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
                  {m.delta}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
              >
                <div
                  className="impact-bar-fill h-full rounded-full"
                  data-fill={m.fill}
                  style={{
                    width: `${m.fill}%`,
                    background: isGood
                      ? "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))"
                      : "linear-gradient(90deg, oklch(0.55 0.16 25), oklch(0.7 0.18 25))",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="px-5 lg:px-6 py-3.5 border-t flex items-center justify-between text-[11px]"
        style={{
          borderColor: "oklch(0.92 0.005 110)",
          backgroundColor: "oklch(0.985 0.004 110)",
        }}
      >
        <span style={{ color: "oklch(0.5 0.015 115)" }}>
          Calculado sobre média de 80+ implementações
        </span>
        <span
          className="font-semibold inline-flex items-center gap-1"
          style={{ color: "oklch(0.55 0.16 125)" }}
        >
          tudo no verde
        </span>
      </div>
    </div>
  );
}

