import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const PROBLEMS = [
  {
    n: "01",
    title: "Contratar mais gente pra dar conta do volume",
    text: "Mais pessoas na mesma rotina manual só aumenta o custo. O gargalo continua. O mês seguinte é igual.",
  },
  {
    n: "02",
    title: "Fechamento mensal que consome a sua melhor analista",
    text: "5 dias. Todo mês. A pessoa que mais entende da operação passa a semana em planilha. E ninguém questiona porque é assim que sempre foi.",
  },
  {
    n: "03",
    title: "Follow-up que existe só quando alguém lembrou",
    text: "Leads que somem. Clientes que não foram nutridos. Receita que ficou na mesa porque ninguém fez o segundo contato no momento certo.",
  },
  {
    n: "04",
    title: "Relatório que chega tarde. E ainda pode ter erro",
    text: "A diretoria quer decisão rápida. Os dados chegam na quinta. E podem estar errados porque foram consolidados na mão.",
  },
];

/**
 * Problem (LP-A) — versão sem pin/scrub GSAP.
 *
 * Antes: section de 200vh com sticky + timeline GSAP fazendo giro
 * dos chars + rotação do dial + entrada rígida por scrub. Isso
 * gerava (a) uma "dobra vazia" de ~100vh após o unpin e (b) um
 * "giro" visualmente pesado. User pediu para a entrada dos cards
 * ficar progressiva e delicada.
 *
 * Agora: section flui natural, com <Reveal> IntersectionObserver
 * fazendo fade-up staggered nos elementos. Sem dial, sem pin, sem
 * empty dobra.
 */
export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[80px] lg:py-[120px]">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.14]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="problem-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="-100"
            y1="0"
            x2="1540"
            y2="900"
            stroke="url(#problem-line)"
            strokeWidth="1"
          />
        </svg>

        <div className="relative z-10 container-page w-full">
          <div className="text-center max-w-[860px] mx-auto">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />O cenário da sua operação
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[26px] sm:text-[32px] lg:text-[36px] text-foreground">
                Seu time já tá no limite. Só que o custo{" "}
                <em>não aparece em lugar nenhum.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] text-sage leading-[1.6] max-w-[620px] mx-auto">
                O problema não é falta de esforço. É processo manual demais pra quem você já tem.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-5 max-w-[980px] mx-auto">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={0.18 + i * 0.09}>
                <TiltCard className="problem-card tech-card p-6 lg:p-7 relative" maxTilt={6}>
                  <div className="flex items-center gap-3">
                    <span
                      className="num-display text-[13px] tracking-wider"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {p.n}
                    </span>
                    <span
                      className="h-[1px] flex-1"
                      style={{
                        background: "linear-gradient(90deg, var(--color-primary), transparent)",
                      }}
                    />
                  </div>
                  <h3 className="mt-4 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.3]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-sage leading-[1.55]">{p.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.65}>
            <p className="hidden lg:block mt-10 text-center text-[13.5px] text-sage leading-[1.6] max-w-[760px] mx-auto">
              <span className="font-semibold text-foreground">Sintomas comuns:</span>{" "}
              fechamento que atrasa, follow-up inconsistente, relatório montado manualmente, dado
              incorreto chegando à diretoria, dependência de uma pessoa específica para cada processo
              existir.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
