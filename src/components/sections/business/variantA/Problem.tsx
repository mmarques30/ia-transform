import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/motion";
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

export function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const symptomRef = useRef<HTMLParagraphElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // No mobile a section não usa pin/scrub (ver JSX abaixo) — pula a
    // animação inteira, deixando os elementos visíveis no estado default.
    // Sem isso o gsap.set(opacity: 0) deixaria tudo invisível pra sempre.
    if (window.innerWidth < 1024) return;

    const split = new SplitText(headingRef.current, { type: "chars,words" });

    const ctx = gsap.context(() => {
      gsap.set(split.chars, { opacity: 0, rotateX: -75, y: 16 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 14 });
      gsap.set(cardsRef.current?.querySelectorAll(".problem-card") || [], {
        opacity: 0,
        y: 60,
      });
      gsap.set(symptomRef.current, { opacity: 0, y: 14 });
      gsap.set(dialRef.current, { rotate: 0, scale: 0.85, opacity: 0.4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.to(
        split.chars,
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 0.6,
          stagger: { each: 0.02, from: "start" },
          ease: "power3.out",
        },
        0,
      );

      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.3);

      const cards = cardsRef.current?.querySelectorAll(".problem-card") || [];
      cards.forEach((card, i) => {
        tl.to(
          card,
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          0.42 + i * 0.12,
        );
      });

      tl.to(
        dialRef.current,
        { rotate: 360, scale: 1, opacity: 0.7, ease: "none" },
        0,
      );

      tl.to(symptomRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.95);
    }, sectionRef);

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  return (
    /* Mobile: section flui naturalmente (sem pin, sem overflow-hidden, sem
       sticky). O scroll-jacking funciona em desktop mas no mobile cortava
       cards 3 e 4 (4 cards stacked > 1 viewport). Desktop mantém 200vh
       de pin spacer + sticky inner pro scrub do GSAP rolar a animação. */
    <section ref={sectionRef} className="relative lg:min-h-[200vh]">
      <div className="section-veil w-full flex items-center py-[80px] lg:py-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.18]"
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

        <svg
          ref={dialRef}
          aria-hidden
          className="hidden lg:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px]"
          viewBox="0 0 680 680"
          style={{ transformOrigin: "center center" }}
        >
          <g fill="oklch(0.75 0.20 122)">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const cx = 340 + Math.cos(angle) * 320;
              const cy = 340 + Math.sin(angle) * 320;
              const r = i % 5 === 0 ? 4 : 1.5;
              const op = i % 5 === 0 ? 0.9 : 0.3;
              return <circle key={i} cx={cx} cy={cy} r={r} opacity={op} />;
            })}
          </g>
        </svg>

        <div className="relative z-10 container-page w-full">
          <div className="text-center max-w-[860px] mx-auto">
            <span className="label-chip">
              <span className="dot" />O cenário da sua operação
            </span>
            <h2
              ref={headingRef}
              className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[58px] text-foreground"
              style={{ perspective: "800px" }}
            >
              Seu time já tá no limite. Só que o custo{" "}
              <em>não aparece em lugar nenhum.</em>
            </h2>
            <p
              ref={subtitleRef}
              className="mt-6 text-[17px] text-sage leading-[1.6] max-w-[620px] mx-auto"
            >
              O problema não é falta de esforço. É processo manual demais pra quem você já tem.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-5 max-w-[980px] mx-auto"
          >
            {PROBLEMS.map((p) => (
              <TiltCard
                key={p.n}
                className="problem-card tech-card p-6 lg:p-7 relative"
                maxTilt={6}
              >
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
            ))}
          </div>

          {/* "Sintomas comuns" — escondido no mobile pra evitar parede
              de texto extra na seção de cards. Desktop mantém. */}
          <p
            ref={symptomRef}
            className="hidden lg:block mt-8 text-center text-[13.5px] text-sage leading-[1.6] max-w-[760px] mx-auto"
          >
            <span className="font-semibold text-foreground">Sintomas comuns:</span>{" "}
            fechamento que atrasa, follow-up inconsistente, relatório montado manualmente, dado
            incorreto chegando à diretoria, dependência de uma pessoa específica para cada processo
            existir.
          </p>
        </div>
      </div>
    </section>
  );
}
