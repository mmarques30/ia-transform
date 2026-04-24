import { Reveal } from "@/components/Reveal";
import { Check, X } from "lucide-react";

const FOR = [
  "CEO / fundador(a) de empresa 50–2.000 pessoas",
  "C-level que precisa organizar iniciativas de IA existentes",
  "Head ou Diretor(a) com mandato de levar IA pra área",
  "CDO / CIO / CTO que precisa de braço executor",
];

const NOT_FOR = [
  "Empresa sem operação consolidada (< R$ 5M/ano)",
  "Projeto de TI core (ERP, infra, core banking)",
  "Quem busca capacitação individual (aí é Academy)",
  "Quem espera terceirizar decisão executiva",
];

export function ForWhom() {
  return (
    <section className="py-[90px] lg:py-[120px] bg-background">
      <div className="container-page">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Entra · não entra
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              <em>Não é pra todo mundo</em>.
              <br />E isso é bom pra você.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.55] max-w-[620px]">
              6 novas empresas por trimestre. Qualificamos antes de vender.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="card-soft p-7 h-full">
              <div
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
                Faz sentido se você é
              </div>
              <ul className="mt-5 space-y-3">
                {FOR.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[15px] text-sage leading-[1.5]"
                  >
                    <span
                      className="mt-[9px] h-1 w-1 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="rounded-xl border border-border p-7 h-full"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                <X className="h-4 w-4" strokeWidth={2.5} />
                Não é pra você se
              </div>
              <ul className="mt-5 space-y-3">
                {NOT_FOR.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[15px] text-sage leading-[1.5]"
                  >
                    <span className="mt-[9px] h-1 w-1 rounded-full bg-border shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
