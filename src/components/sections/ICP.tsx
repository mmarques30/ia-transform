import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * ICP — seção compacta logo após o Hero que define o público-alvo
 * antes do visitante ter que rolar até o comparativo pra descobrir.
 * Quem não cabe no Business é redirecionado pra Mentoria/Academy via
 * link explícito.
 */
export function ICP() {
  return (
    <section className="py-[60px] lg:py-[80px] bg-background">
      <div className="container-page">
        <div
          className="mx-auto max-w-[920px] rounded-2xl px-8 py-9 lg:px-12 lg:py-11 grid lg:grid-cols-[1fr_auto] gap-8 items-center"
          style={{
            backgroundColor: "oklch(0.97 0.012 115)",
            border: "1px solid oklch(0.88 0.025 115)",
          }}
        >
          <div>
            <Reveal>
              <p
                className="text-[11px] uppercase tracking-[0.16em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Pra quem é o Business
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 text-[18px] lg:text-[20px] text-foreground leading-[1.5]">
                Empresa de serviço com <span className="font-semibold">30–100 colaboradores</span>{" "}
                e faturamento <span className="font-semibold">R$ 5–50MM/ano</span>, que precisa
                parar de depender do dono no operacional.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <a
              href="https://academy.iaplicada.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-[13px] font-semibold transition-colors group"
              style={{
                backgroundColor: "oklch(1 0 0)",
                border: "1px solid var(--color-border)",
                color: "var(--color-foreground)",
              }}
            >
              <span className="flex flex-col items-start leading-tight">
                <span
                  className="text-[10.5px] uppercase tracking-[0.14em] font-semibold"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  Empresa menor?
                </span>
                <span>Conheça a Mentoria 1:1</span>
              </span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
