import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";
import { Star, Clock, Users } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[120px] pb-[80px] lg:pt-[160px] lg:pb-[120px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
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
        {/* Trust strip — segmentos atendidos */}
        <Reveal>
          <TrustStrip />
        </Reveal>

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:pt-2">
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

            {/* Stats row */}
            <Reveal delay={0.18}>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-[520px]">
                <Stat
                  Icon={Clock}
                  value="30 dias"
                  label="prazo médio de entrega"
                />
                <Stat
                  Icon={Users}
                  value="40+ PMEs"
                  label="com sistema rodando"
                />
                <Stat
                  Icon={Star}
                  value="−30h/sem"
                  label="sócios fora da rotina"
                />
              </div>
            </Reveal>

            {/* Avatar + assinatura da fundadora */}
            <Reveal delay={0.24}>
              <div className="mt-10 flex items-center gap-4">
                <AvatarStack />
                <div className="leading-tight">
                  <p className="text-[14px] text-foreground font-semibold">
                    Centenas de empresários impactados.
                  </p>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">
                    Conduzido por{" "}
                    <span className="font-semibold text-foreground">Mari Marques</span> · fundadora
                    IAplicada
                  </p>
                </div>
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
    </section>
  );
}

/**
 * Faixa sutil acima do hero com segmentos atendidos — funciona como
 * social proof estilo "as marcas / mercados que confiam".
 */
function TrustStrip() {
  const items = [
    "Varejo",
    "Indústria",
    "SaaS B2B",
    "Serviços",
    "E-commerce",
    "Saúde",
    "Educação",
  ];
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
      <span
        className="text-[10.5px] uppercase tracking-[0.18em] font-semibold shrink-0"
        style={{ color: "oklch(0.55 0.015 115)" }}
      >
        PMEs que aplicam
      </span>
      <span
        aria-hidden
        className="hidden sm:block h-[14px] w-px"
        style={{ backgroundColor: "oklch(0.78 0.04 115)" }}
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {items.map((it, i) => (
          <span key={it} className="inline-flex items-center gap-3">
            <span
              className="text-[12px] font-semibold tracking-tight"
              style={{ color: "oklch(0.35 0.02 122)" }}
            >
              {it}
            </span>
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="hidden sm:inline-block h-1 w-1 rounded-full"
                style={{ backgroundColor: "oklch(0.7 0.03 115)" }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stat({
  Icon,
  value,
  label,
}: {
  Icon: typeof Clock;
  value: string;
  label: string;
}) {
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
      <Icon
        className="h-4 w-4"
        strokeWidth={2.2}
        style={{ color: "var(--color-primary)" }}
      />
      <div
        className="mt-2 font-bold leading-none text-[16px] sm:text-[18px] tracking-tight"
        style={{ color: "oklch(0.18 0.02 122)" }}
      >
        {value}
      </div>
      <p
        className="mt-1 text-[10.5px] leading-tight"
        style={{ color: "oklch(0.45 0.015 115)" }}
      >
        {label}
      </p>
    </div>
  );
}

/**
 * 4 stacked circular initials — generated locally so we never depend on
 * external image hosts that can 404 or be blocked.
 */
function AvatarStack() {
  const avatars = [
    { initials: "MR", bg: "oklch(0.62 0.17 125)" },
    { initials: "JC", bg: "oklch(0.55 0.16 125)" },
    { initials: "AP", bg: "oklch(0.48 0.14 122)" },
    { initials: "LS", bg: "oklch(0.42 0.12 122)" },
  ];
  return (
    <div className="flex -space-x-2.5">
      {avatars.map((a, i) => (
        <span
          key={i}
          aria-hidden
          className="h-9 w-9 rounded-full ring-2 ring-background flex items-center justify-center text-white font-semibold text-[11px] tracking-tight"
          style={{ backgroundColor: a.bg }}
        >
          {a.initials}
        </span>
      ))}
    </div>
  );
}
