import { Reveal } from "@/components/Reveal";
import { ArrowRight, Sparkles, LayoutGrid, Compass, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PATTERNS = [
  "Financeiro fragmentado",
  "Relatórios manuais",
  "Dados espalhados",
  "Decisões lentas",
  "Risco constante de erro",
];

interface Benefit {
  Icon: LucideIcon;
  label: string;
  text: string;
  tint: string;
  border: string;
  iconColor: string;
}

const BENEFITS: Benefit[] = [
  {
    Icon: Sparkles,
    label: "Liberdade",
    text: "O dono sai da operação. Decisão deixa de depender de uma cabeça só.",
    tint: "linear-gradient(180deg, oklch(0.97 0.045 80) 0%, oklch(0.99 0.015 80) 100%)",
    border: "oklch(0.85 0.06 80)",
    iconColor: "oklch(0.55 0.13 60)",
  },
  {
    Icon: LayoutGrid,
    label: "Estrutura",
    text: "Processos no mesmo lugar, papéis claros, hand-off documentado.",
    tint: "linear-gradient(180deg, oklch(0.96 0.04 125) 0%, oklch(0.99 0.015 125) 100%)",
    border: "oklch(0.82 0.08 125)",
    iconColor: "oklch(0.45 0.16 125)",
  },
  {
    Icon: Compass,
    label: "Gestão",
    text: "Indicador semanal pra cada área. Reunião de gestão deixa de ser desabafo.",
    tint: "linear-gradient(180deg, oklch(0.96 0.025 240) 0%, oklch(0.99 0.01 240) 100%)",
    border: "oklch(0.84 0.05 240)",
    iconColor: "oklch(0.45 0.13 240)",
  },
  {
    Icon: TrendingUp,
    label: "Previsibilidade",
    text: "Você sabe o que vai entrar, o que vai sair, e onde tá o gargalo do mês.",
    tint: "linear-gradient(180deg, oklch(0.96 0.035 195) 0%, oklch(0.99 0.012 195) 100%)",
    border: "oklch(0.82 0.06 195)",
    iconColor: "oklch(0.45 0.13 195)",
  },
];

export function Segmentation() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        {/* Same pattern of chaos */}
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Empresas diferentes.
              <br />O <em>mesmo padrão</em> de caos.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Indústrias, consultorias, empresas de serviço, operações em crescimento.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-[18px] font-semibold text-foreground">
            O cenário se repete:
          </p>
        </Reveal>

        <div className="mt-10 relative">
          {/* Connector dotted line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[5%] right-[5%] top-[13px]"
            style={{
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(to right, oklch(0.6 0.14 125 / 0.6) 0 6px, transparent 6px 14px)",
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 relative max-w-[1000px] mx-auto">
            {PATTERNS.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="flex flex-col items-center text-center">
                  <span
                    className="h-7 w-7 rounded-full flex items-center justify-center relative z-10"
                    style={{ backgroundColor: "var(--color-olive)" }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <p className="mt-4 text-[14px] font-semibold text-foreground">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* When structure changes — clean 2-col split with 2x2 benefit grid */}
        <div className="mt-24 lg:mt-28 grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center max-w-[1100px] mx-auto">
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Resultado real
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="h-mix mt-5 text-[32px] sm:text-[40px] lg:text-[46px] text-foreground">
                Quando a estrutura muda,
                <br />o <em>jogo muda</em>.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[16px] text-sage leading-[1.65] max-w-[440px]">
                E isso não depende do tamanho da empresa, mas da maturidade da gestão.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.label} delay={i * 0.06}>
                  <div
                    className="rounded-2xl p-6 h-full transition-transform hover:-translate-y-0.5"
                    style={{
                      background: b.tint,
                      border: `1px solid ${b.border}`,
                    }}
                  >
                    <span
                      className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "oklch(1 0 0)",
                        border: `1px solid ${b.border}`,
                      }}
                    >
                      <b.Icon
                        className="h-5 w-5"
                        style={{ color: b.iconColor }}
                        strokeWidth={1.75}
                      />
                    </span>
                    <p
                      className="mt-5 text-[16px] font-bold tracking-tight"
                      style={{ color: b.iconColor }}
                    >
                      {b.label}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-[1.5] text-sage">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
