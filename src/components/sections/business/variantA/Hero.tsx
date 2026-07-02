import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";

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

      <div className="relative pt-[48px] lg:pt-[72px]">
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
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16 items-center">
            <div>
              <Reveal>
                <span className="label-chip">
                  <span className="dot" />
                  IAplicada · Business
                </span>
              </Reveal>

              <h1 className="h-mix mt-6 lg:mt-7 text-[32px] sm:text-[44px] lg:text-[58px] leading-[1.05] text-foreground">
                Contratar mais gente não vai resolver. O problema está{" "}
                <em>no processo.</em>
              </h1>

              <Reveal delay={0.1}>
                <p className="mt-5 lg:mt-7 text-[16px] lg:text-[19px] text-foreground font-semibold leading-[1.5]">
                  O custo mais alto da sua operação não aparece no DRE.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="hidden lg:block mt-3 lg:mt-4 text-[14.5px] lg:text-[16px] text-sage leading-[1.6] max-w-[540px]">
                  Está escondido em horas gastas em planilha, em retrabalho que ninguém contabiliza,
                  em follow-up que não aconteceu. A IAplicada encontra esses processos, calcula o
                  custo e constrói os sistemas que os eliminam.
                </p>
              </Reveal>

              {/* ClientsProof — visível apenas no desktop dentro da coluna esquerda. */}
              <Reveal delay={0.18}>
                <div className="hidden lg:block">
                  <ClientsProof />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div id="diagnostico-form" className="mt-6 lg:mt-0 lg:sticky lg:top-24 scroll-mt-24">
                <HeroForm />
              </div>
            </Reveal>

            {/* ClientsProof — versão mobile vem DEPOIS do form, fora da
                primeira dobra. No desktop, esta versão fica oculta porque
                já aparece na coluna esquerda. */}
            <Reveal delay={0.18}>
              <div className="lg:hidden">
                <ClientsProof />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Marquee (dobra 2) — LP-A: stats de custo escondido no processo */
const MARQUEE_ITEMS = [
  "R$9k/mês invisível no DRE",
  "87h liberadas por projeto",
  "Payback em 4,6 meses",
  "Sem trocar de sistema",
  "Time autônomo na entrega",
  "Empresas de serviço de R$1M a R$10M",
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
  const SIZE = 40;
  return (
    <div className="mt-8 flex items-center gap-4">
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
              marginLeft: i === 0 ? 0 : -12,
              border: "2px solid var(--color-background)",
              boxShadow: "0 2px 6px -2px oklch(0 0 0 / 0.5)",
              zIndex: PROOF_THUMBS.length - i,
            }}
          />
        ))}
      </div>
      <p className="text-[14px] text-foreground font-semibold leading-tight">
        +700 profissionais usando a IAplicada dentro das empresas.
      </p>
    </div>
  );
}
