import { Reveal } from "@/components/Reveal";
import { Search, Wrench, RefreshCcw } from "lucide-react";

const PILLARS = [
  {
    n: "01",
    icon: Search,
    title: "Diagnosticar",
    text: "Mapeamos rotinas e decisões. Saímos com um plano de 90 dias, não uma lista de ferramentas.",
  },
  {
    n: "02",
    icon: Wrench,
    title: "Implementar",
    text: "Desenhamos os fluxos, construímos os sistemas e treinamos no contexto do seu time.",
  },
  {
    n: "03",
    icon: RefreshCcw,
    title: "Sustentar",
    text: "Rituais, ajustes, expansão. A roda não para quando a implementação termina.",
  },
];

export function Approach() {
  return (
    <section
      id="abordagem"
      className="py-[90px] lg:py-[120px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Como trabalhamos
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              Três pilares que <em>sustentam</em>.
              <br />
              Um método que não te prende.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="card-soft p-7 h-full">
                <div className="flex items-center justify-between">
                  <p
                    className="num-display text-[36px] leading-none"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {p.n}
                  </p>
                  <p.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-[20px] font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-[15px] text-sage leading-[1.55]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
