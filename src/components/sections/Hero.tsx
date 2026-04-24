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

/** 4 stacked circular avatars + a lime badge on the right. */
function AvatarStack() {
  const avatars = [
    "https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=96&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=80",
  ];
  return (
    <div className="flex -space-x-2.5">
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden
          className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
        />
      ))}
    </div>
  );
}
