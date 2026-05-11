import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";
import { User } from "lucide-react";

/**
 * Avatares de clientes da seção "Centenas de empresários impactados".
 *
 * URLs atuais são stock photos do serviço randomuser.me (uso livre,
 * licença CC). Pra trocar pelos rostos reais dos clientes:
 *   1) jogue os arquivos em `public/clients/`
 *   2) troque `src` aqui (ex.: `src: "/clients/joana.jpg"`)
 *
 * Quando `src` falha ou é null, mostra ícone de silhueta no círculo
 * brand-colored como fallback.
 */
const CLIENT_AVATARS: { src: string | null; bg: string; alt: string }[] = [
  {
    src: "https://randomuser.me/api/portraits/women/68.jpg",
    bg: "oklch(0.62 0.17 125)",
    alt: "Cliente IAplicada",
  },
  {
    src: "https://randomuser.me/api/portraits/men/32.jpg",
    bg: "oklch(0.55 0.16 125)",
    alt: "Cliente IAplicada",
  },
  {
    src: "https://randomuser.me/api/portraits/women/44.jpg",
    bg: "oklch(0.48 0.14 122)",
    alt: "Cliente IAplicada",
  },
  {
    src: "https://randomuser.me/api/portraits/men/76.jpg",
    bg: "oklch(0.42 0.12 122)",
    alt: "Cliente IAplicada",
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative pb-[80px] lg:pb-[120px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Faixa preta marquee — fica logo abaixo do header fixo, dá respiro
          entre o nav e a headline e ancora um tom premium ao topo da LP. */}
      <div className="h-[72px]" aria-hidden />
      <MarqueeStrip />

      {/* Wrapper relativo pra texture/glow respeitarem o conteúdo abaixo
          da marquee, sem sobrepor a faixa preta. */}
      <div className="relative pt-[48px] lg:pt-[72px]">
        {/* Grid texture sutil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 40% 30%, black 20%, transparent 80%)",
          }}
        />

        {/* Glow oliva atrás do form pra dar profundidade */}
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "8%",
            right: "-5%",
            width: "55%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.18 122 / 0.18) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container-page relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:pt-6">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                IAplicada · Business
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="h-mix mt-7 text-[42px] sm:text-[54px] lg:text-[64px] text-foreground">
                Sua empresa <em>organizada</em>
                <br />
                em até 30 dias em
                <br />
                um único lugar.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 text-[18px] lg:text-[20px] text-foreground font-semibold leading-[1.4]">
                Sem DEV. Sem soluções engessadas.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-4 text-[16px] text-sage leading-[1.6] max-w-[520px]">
                Sem enrolação. Um sistema totalmente adaptado e exclusivo para a sua operação — com
                IA aplicada pra substituir planilhas e tarefas manuais por fluxos automáticos.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-[520px]">
                <Stat value="30 dias" label="prazo médio de entrega" />
                <Stat value="100%" label="sistema sob medida" />
                <Stat value="−30h/sem" label="trabalho manual eliminado" />
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex items-center gap-4">
                <AvatarStack />
                <p className="text-[14px] text-foreground font-semibold leading-tight">
                  Centenas de empresários impactados.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div id="diagnostico-form" className="lg:sticky lg:top-24 scroll-mt-24">
              <HeroForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
    </section>
  );
}

/**
 * Faixa preta com ticker rodando. Combina prova rápida + ritmo + visual
 * premium que dá respiro entre o nav e a headline. Itens duplicados pra
 * o loop CSS (.ticker-track translateX(-50%)) ficar contínuo.
 */
const MARQUEE_ITEMS = [
  "Atendemos PMEs até hoje",
  "30 dias prazo médio",
  "Sem DEV",
  "Diagnóstico em 30 min",
  "12 meses de acompanhamento",
  "100% sob medida",
];

function MarqueeStrip() {
  const seq = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const FADE = "oklch(0.13 0.012 122)";
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: FADE,
        borderTop: "1px solid oklch(0.22 0.02 122)",
        borderBottom: "1px solid oklch(0.22 0.02 122)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{
          background: `linear-gradient(90deg, ${FADE} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{
          background: `linear-gradient(270deg, ${FADE} 0%, transparent 100%)`,
        }}
      />

      <div className="ticker-track py-3.5">
        {seq.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span
              className="text-[11.5px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap"
              style={{ color: "oklch(0.95 0.012 110)" }}
            >
              {item}
            </span>
            <span
              aria-hidden
              className="inline-block"
              style={{
                color: "var(--color-primary)",
                fontSize: 9,
                lineHeight: 1,
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-xl p-3.5"
      style={{
        backgroundColor: "oklch(1 0 0 / 0.65)",
        border: "1px solid oklch(0.85 0.03 115)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        className="font-bold leading-none text-[18px] sm:text-[20px] tracking-tight"
        style={{ color: "oklch(0.18 0.02 122)" }}
      >
        {value}
      </div>
      <p
        className="mt-1.5 text-[10.5px] leading-tight"
        style={{ color: "oklch(0.45 0.015 115)" }}
      >
        {label}
      </p>
    </div>
  );
}

function AvatarStack() {
  return (
    <div className="flex -space-x-2.5">
      {CLIENT_AVATARS.map((a, i) => (
        <span
          key={i}
          className="h-9 w-9 rounded-full ring-2 ring-background flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: a.bg }}
        >
          {a.src ? (
            <img src={a.src} alt={a.alt} className="h-full w-full object-cover" />
          ) : (
            <User
              aria-hidden
              className="h-4 w-4"
              strokeWidth={2}
              style={{ color: "oklch(1 0 0 / 0.8)" }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
