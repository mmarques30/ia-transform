import { Reveal } from "@/components/Reveal";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const NUMBERS = [
  { v: "+80", l: "empresas atendidas" },
  { v: "+2.000", l: "profissionais formados" },
  { v: "3 anos", l: "construindo IAplicada" },
  { v: "100%", l: "projetos com métrica" },
];

export function Authority() {
  return (
    <section
      id="time"
      className="py-[90px] lg:py-[120px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <div
              className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border relative"
              style={{
                backgroundImage: `linear-gradient(180deg, oklch(0.18 0.02 122 / 0) 40%, oklch(0.18 0.02 122 / 0.85) 100%), url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                boxShadow: "var(--shadow-elevated)",
              }}
            >
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p
                  className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                  style={{ color: "var(--color-primary-glow)" }}
                >
                  Fundadora
                </p>
                <p className="mt-1 text-white font-semibold text-lg">Mariana Marques</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Quem lidera
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-6 text-[32px] sm:text-[38px] lg:text-[44px] text-foreground">
                Produto, operação, liderança.
                <br />
                Agora, IA aplicada.
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4 text-sage text-[16px] leading-[1.6]">
              <Reveal delay={0.1}>
                <p>
                  Fundei a IAplicada em 2022 depois de cansar de ver boas empresas presas em pilotos
                  de IA. Hoje, implemento com um time curado.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-foreground">Natura · Ambev · Magazine Luiza · e +80 empresas.</p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border">
                {NUMBERS.map((n) => (
                  <div key={n.l}>
                    <div
                      className="num-display text-[28px] lg:text-[32px] leading-none"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {n.v}
                    </div>
                    <p className="mt-2 text-[12px] text-muted-foreground leading-tight">{n.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
