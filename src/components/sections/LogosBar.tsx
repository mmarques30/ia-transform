import { Reveal } from "@/components/Reveal";
import { CLIENTS } from "@/config/brand";

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
            {CLIENTS.map((c) =>
              c.src ? (
                <img
                  key={c.name}
                  src={c.src}
                  alt={c.name}
                  className="h-6 mx-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <div
                  key={c.name}
                  className="text-center text-muted-foreground/70 hover:text-foreground transition-colors font-semibold tracking-tight text-[14px]"
                >
                  {c.name}
                </div>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
