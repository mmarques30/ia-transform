import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[120px] pb-[80px] lg:pt-[160px] lg:pb-[120px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Soft grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 40% 30%, black 20%, transparent 80%)",
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

            <Reveal delay={0.22}>
              <div className="mt-10 flex items-center gap-4">
                <AvatarStack />
                <p className="text-[14px] text-foreground font-medium leading-tight">
                  Centenas de empresários
                  <br />
                  impactados.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <HeroForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
