import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useIapIn } from "@/components/sections/business/variantB/painel/useIapIn";

/**
 * SelectedClients (LP-B) — prova de amplitude só com os 3 números
 * agregados (37 empresas · +40 sistemas · R$ 2M+ recuperados) com
 * count-up quando a seção entra no viewport.
 *
 * O bloco de tickers (2 marquees em direções opostas) foi retirado
 * a pedido do fundador — os depoimentos logo abaixo já dão o mesmo
 * papel visual.
 */

const STATS = [
  {
    value: 37,
    prefix: "",
    suffix: "",
    label: "empresas atendidas",
    accent: null as null | "prefix" | "suffix",
  },
  {
    value: 40,
    prefix: "+",
    suffix: "",
    label: "sistemas implementados",
    accent: "prefix" as const,
  },
  {
    value: 2,
    prefix: "R$ ",
    suffix: "M+",
    label: "em horas de operação recuperadas",
    accent: "both" as const,
  },
];

export function SelectedClients() {
  return (
    <section
      id="clientes-selecionados"
      className="section-veil py-[80px] lg:py-[110px] overflow-hidden"
    >
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span
              className="inline-block px-5 py-2 rounded-full font-extrabold text-[15px] tracking-[-0.01em]"
              style={{
                background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                color: "#0a0c07",
              }}
            >
              Construído dentro de empresas como a sua
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-4 font-extrabold text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.15] tracking-[-0.02em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                +40 sistemas
              </em>{" "}
              implementados.
            </h2>
          </Reveal>
        </div>

        <StatsRow />
      </div>
    </section>
  );
}

/**
 * StatsRow — 3 números gigantes com count-up ao entrar no viewport.
 * Separadores verticais hairline entre eles (desktop only).
 */
function StatsRow() {
  const { ref, isIn } = useIapIn(0.4);
  return (
    <div
      ref={ref}
      className="mt-14 lg:mt-16 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0"
    >
      {STATS.map((s, i) => (
        <div key={s.label} className="flex items-stretch">
          <StatCell stat={s} run={isIn} />
          {i < STATS.length - 1 && (
            <span
              aria-hidden
              className="hidden md:block self-center mx-8 lg:mx-12"
              style={{
                width: 1,
                height: 64,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StatCell({ stat, run }: { stat: (typeof STATS)[number]; run: boolean }) {
  const displayValue = useCountUp(stat.value, run, 1600);
  return (
    <div className="text-center flex flex-col items-center">
      <span
        className="font-extrabold leading-none tracking-[-0.03em] text-foreground"
        style={{
          fontSize: "clamp(56px, 7vw, 88px)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stat.prefix ? <span style={{ color: "var(--color-primary)" }}>{stat.prefix}</span> : null}
        {displayValue}
        {stat.suffix ? <span style={{ color: "var(--color-primary)" }}>{stat.suffix}</span> : null}
      </span>
      <span
        className="mt-3 uppercase max-w-[180px]"
        style={{
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.4,
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

/**
 * Conta de 0 até `target` em `durationMs` com easing ease-out (curva
 * 1 - (1 - t)^3 — cubic ease-out, desacelera no fim). Só roda uma vez
 * quando `active` vira true. Respeita prefers-reduced-motion.
 */
function useCountUp(target: number, active: boolean, durationMs: number): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) rafId = requestAnimationFrame(tick);
      else setValue(target);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, durationMs]);

  return Math.round(value);
}
