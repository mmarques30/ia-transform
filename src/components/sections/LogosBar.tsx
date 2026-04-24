import { Reveal } from "@/components/Reveal";

const LOGOS = [
  "Natura",
  "Ambev",
  "Magazine Luiza",
  "Globo",
  "Hubla",
  "Conta Simples",
  "Mottu",
  "Pipefy",
];

export function LogosBar() {
  return (
    <section className="py-20 border-y border-border bg-background">
      <div className="container-page">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Empresas que implementam IA com a IAplicada
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8 items-center">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="text-center text-sage/60 hover:text-sage transition-colors font-semibold tracking-tight text-base"
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
