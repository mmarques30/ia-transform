import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Hero da /contabilcalculo — CTA leva pra a calculadora (em vez do
 * formulário tradicional). A copy promete uma resposta em 3 min com
 * número exato em R$, alinhando com o criativo "quantas horas perde".
 *
 * O componente da calculadora vem em PR 2; aqui o CTA aponta pra
 * #calculadora (anchor placeholder).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative pb-[80px] lg:pb-[120px] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 0%, oklch(0.22 0.03 122 / 0.5) 0%, transparent 75%)",
      }}
    >
      <div className="h-[72px]" aria-hidden />
      <MarqueeStrip />

      <div className="relative pt-[48px] lg:pt-[80px] pb-[40px] lg:pb-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "8%",
            right: "-5%",
            width: "55%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.28) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "20%",
            left: "-10%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse at center, oklch(0.35 0.05 125 / 0.5) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <div className="container-page relative">
          <div className="max-w-[860px] mx-auto text-center">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Inteligência artificial para escritório contábil
              </span>
            </Reveal>

            <h1 className="h-mix mt-6 lg:mt-7 text-[32px] sm:text-[44px] lg:text-[60px] leading-[1.05] text-foreground">
              Em 3 minutos, descubra quantas <em>horas</em> (e quantos <em>R$</em>) seu
              escritório contábil pode recuperar com IA.
            </h1>

            <Reveal delay={0.1}>
              <p className="mt-6 lg:mt-8 text-[16px] lg:text-[19px] text-sage leading-[1.55] max-w-[680px] mx-auto">
                Um diagnóstico gratuito que mostra, com a conta aberta, onde sua equipe perde
                tempo em tarefas que a IA já automatiza e quanto isso custa pra você todo mês.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex justify-center">
                <a href="#calculadora" className="cta-primary">
                  Fazer meu diagnóstico gratuito
                  <span className="arrow">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-5 text-[12px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                100% gratuito · Resultado na hora · Cerca de 3 minutos · Sem cartão de crédito
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex justify-center">
                <ClientsProof />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Marquee — stats da vertical contábil */
const MARQUEE_ITEMS = [
  "+700 profissionais",
  "+100 empresas",
  "10 a 100 colaboradores",
  "Cálculo em 3 minutos",
  "Sem cartão de crédito",
];

function MarqueeStrip() {
  const seq = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const FADE = "oklch(0.10 0.012 122)";
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: FADE,
        borderTop: "1px solid oklch(0.28 0.04 122)",
        borderBottom: "1px solid oklch(0.28 0.04 122)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: `linear-gradient(90deg, ${FADE} 0%, transparent 100%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: `linear-gradient(270deg, ${FADE} 0%, transparent 100%)` }}
      />
      <div
        className="ticker-track py-3.5 select-none"
        style={{ cursor: "default", pointerEvents: "none" }}
        aria-hidden
      >
        {seq.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span
              className="text-[11.5px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap"
              style={{ color: "oklch(0.96 0.012 110)" }}
            >
              {item}
            </span>
            <span
              className="inline-block"
              style={{ color: "var(--color-primary)", fontSize: 9, lineHeight: 1 }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

const PROOF_THUMBS = [
  { src: "/clients/people/person-1.webp", alt: "" },
  { src: "/clients/people/person-5.webp", alt: "" },
  { src: "/clients/people/person-2.webp", alt: "" },
  { src: "/clients/people/person-3.webp", alt: "" },
  { src: "/clients/people/person-4.webp", alt: "" },
];

function ClientsProof() {
  const SIZE = 36;
  return (
    <div className="flex items-center gap-4">
      <div className="flex" aria-hidden>
        {PROOF_THUMBS.map((t, i) => (
          <img
            key={t.src}
            src={t.src}
            alt={t.alt}
            width={SIZE}
            height={SIZE}
            loading="lazy"
            decoding="async"
            className="rounded-full object-cover"
            style={{
              width: SIZE,
              height: SIZE,
              marginLeft: i === 0 ? 0 : -10,
              border: "2px solid var(--color-background)",
              boxShadow: "0 2px 6px -2px oklch(0 0 0 / 0.5)",
              zIndex: PROOF_THUMBS.length - i,
            }}
          />
        ))}
      </div>
      <p className="text-[13.5px] text-foreground font-semibold leading-tight text-left">
        +700 profissionais usando a IAplicada dentro das empresas
      </p>
    </div>
  );
}
