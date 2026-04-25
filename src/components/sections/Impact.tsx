import { Reveal } from "@/components/Reveal";
import {
  ChevronRight,
  ShoppingCart,
  Factory,
  Briefcase,
  HeartPulse,
  Wrench,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const IMPACTS = [
  "Menos tarefas manuais",
  "Menos retrabalho",
  "Mais visibilidade",
  "Mais segurança nas decisões",
  "Menos dependência do dono",
  "Crescimento com controle",
];

interface Segment {
  Icon: LucideIcon;
  label: string;
  /** Soft tint backgrounds — cada segmento tem um tom próprio. */
  tint: string;
  border: string;
  iconColor: string;
}

const SEGMENTS: Segment[] = [
  {
    Icon: ShoppingCart,
    label: "Varejo",
    tint: "linear-gradient(180deg, oklch(0.97 0.045 80) 0%, oklch(0.99 0.015 80) 100%)",
    border: "oklch(0.85 0.06 80)",
    iconColor: "oklch(0.55 0.13 60)",
  },
  {
    Icon: Factory,
    label: "Indústria",
    tint: "linear-gradient(180deg, oklch(0.95 0.03 240) 0%, oklch(0.99 0.01 240) 100%)",
    border: "oklch(0.82 0.06 240)",
    iconColor: "oklch(0.45 0.13 240)",
  },
  {
    Icon: Briefcase,
    label: "Consultoria",
    tint: "linear-gradient(180deg, oklch(0.96 0.04 125) 0%, oklch(0.99 0.015 125) 100%)",
    border: "oklch(0.82 0.08 125)",
    iconColor: "oklch(0.45 0.16 125)",
  },
  {
    Icon: HeartPulse,
    label: "Saúde",
    tint: "linear-gradient(180deg, oklch(0.96 0.035 25) 0%, oklch(0.99 0.012 25) 100%)",
    border: "oklch(0.85 0.06 25)",
    iconColor: "oklch(0.5 0.15 25)",
  },
  {
    Icon: Wrench,
    label: "Serviços",
    tint: "linear-gradient(180deg, oklch(0.96 0.025 280) 0%, oklch(0.99 0.01 280) 100%)",
    border: "oklch(0.82 0.05 280)",
    iconColor: "oklch(0.45 0.14 280)",
  },
  {
    Icon: GraduationCap,
    label: "Educação",
    tint: "linear-gradient(180deg, oklch(0.96 0.03 195) 0%, oklch(0.99 0.012 195) 100%)",
    border: "oklch(0.82 0.06 195)",
    iconColor: "oklch(0.45 0.13 195)",
  },
];

export function Impact() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background relative overflow-hidden">
      {/* Tech background — drifting dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 tech-bg-dots ia-anim-grid-drift opacity-50"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)",
        }}
      />
      <div className="container-page relative">
        {/* Headline + benefícios */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-[1100px] mx-auto card-soft p-8 lg:p-12">
          <div>
            <Reveal>
              <h2 className="h-mix text-[32px] sm:text-[40px] lg:text-[48px] text-foreground">
                Quando a empresa
                <br />
                deixa de operar
                <br />
                <em>no improviso,</em>
                <br />o impacto é imediato.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-[15.5px] text-sage leading-[1.65] max-w-[440px]">
                O Business é uma solução de estruturação operacional com Inteligência Artificial
                aplicada, criada para empresas que precisam organizar a casa antes de escalar.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.15}>
              <ul className="space-y-4">
                {IMPACTS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[17px] text-foreground">
                    <ChevronRight
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--color-primary)" }}
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-10 text-[18px] lg:text-[20px] font-bold leading-[1.4]"
                style={{ color: "var(--color-primary)" }}
              >
                Clareza gera controle.
                <br />
                Controle gera crescimento sustentável.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid de segmentos — cada um com tom próprio, mostrando que serve pra vários verticais */}
        <div className="mt-20 lg:mt-24">
          <Reveal>
            <p className="text-center text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
              Empresas que organizamos
            </p>
            <h3 className="mt-4 text-center text-[22px] lg:text-[28px] font-semibold text-foreground tracking-tight max-w-[680px] mx-auto">
              Operações diferentes, mesma estrutura — adaptada por segmento.
            </h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1100px] mx-auto">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 6) * 0.04}>
                <div className="tech-card p-5 h-full flex flex-col items-start gap-4">
                  <span
                    className="relative h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "oklch(0.97 0.005 110)",
                      border: `1px solid var(--color-border)`,
                    }}
                  >
                    <s.Icon
                      className="h-5 w-5 relative z-10"
                      style={{ color: s.iconColor }}
                      strokeWidth={1.5}
                    />
                  </span>
                  <div className="relative">
                    <p
                      className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                      style={{ color: s.iconColor, opacity: 0.75 }}
                    >
                      Vertical
                    </p>
                    <p className="mt-1 text-[15px] font-semibold tracking-tight text-foreground">
                      {s.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
