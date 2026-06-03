import { Reveal } from "@/components/Reveal";
import { Target, Timer, Compass } from "lucide-react";

/**
 * Seção 3 do brief — O QUE É O DIAGNÓSTICO.
 * Promete exatamente o que o slide 5 do criativo prometeu: 3 frentes
 * priorizadas + tempo estimado + por onde começar. Zero atrito entre
 * o anúncio e a entrega.
 */
const DELIVERABLES = [
  {
    icon: Target,
    title: "3 frentes priorizadas",
    text: "As rotinas do seu escritório que mais consomem hora, ordenadas pelo retorno potencial.",
  },
  {
    icon: Timer,
    title: "Tempo de retorno",
    text: "Estimativa concreta de quanto cada frente devolve em horas ou margem por mês.",
  },
  {
    icon: Compass,
    title: "Por onde começar",
    text: "Caminho claro pra primeira rotina rodando, sem trocar de sistema.",
  },
];

export function Solution() {
  return (
    <section
      id="diagnostico"
      className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="max-w-[780px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O diagnóstico
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] text-foreground">
              30 minutos pra mapear onde a IA <em>cabe</em> no seu escritório.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-[15.5px] lg:text-[17px] text-sage leading-[1.6]">
              Não é reunião de vendas disfarçada. Você sai com o mapa mesmo se a gente não fechar.
            </p>
          </Reveal>
        </div>

        {/* 3 entregáveis — promessa palavra por palavra do criativo */}
        <div className="mt-12 lg:mt-16 max-w-[1080px] mx-auto">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
            Você sai com
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {DELIVERABLES.map((d, i) => (
              <Reveal key={d.title} delay={0.12 + i * 0.07}>
                <div
                  className="rounded-2xl border border-border p-6 lg:p-7 h-full"
                  style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                    }}
                  >
                    <d.icon
                      className="h-5 w-5"
                      strokeWidth={2}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                  <p className="mt-5 text-[17px] font-bold tracking-tight text-foreground leading-[1.25]">
                    {d.title}
                  </p>
                  <p className="mt-2 text-[14px] text-sage leading-[1.55]">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Formato — meta info do encontro */}
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] uppercase tracking-[0.15em] font-semibold text-muted-foreground">
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              Online
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              30 min
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              Com a Mari e equipe
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              Gratuito
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-10 flex justify-center">
            <a href="#diagnostico-form" className="cta-primary">
              Quero o diagnóstico
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 7H12M12 7L7 2M12 7L7 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
