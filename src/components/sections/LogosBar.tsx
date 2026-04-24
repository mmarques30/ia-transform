import { Reveal } from "@/components/Reveal";

const LOGOS = ["Natura", "Ambev", "Magazine Luiza", "Globo", "Hubla", "Mottu"];

export function LogosBar() {
  return (
    <section className="py-12 border-y border-border bg-background">
      <div className="container-page">
        <Reveal>
          <p className="text-center text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Parceiros de implementação e mentoria
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-7 grid grid-cols-3 sm:grid-cols-6 gap-x-6 gap-y-6 items-center">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="text-center text-muted-foreground/70 hover:text-foreground transition-colors font-semibold tracking-tight text-[14px]"
              >
                {logo}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
