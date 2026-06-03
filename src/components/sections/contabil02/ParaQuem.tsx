import { Reveal } from "@/components/Reveal";
import { Check, X } from "lucide-react";

/**
 * Seção 4 do brief — PARA QUEM É.
 * Qualifica o lead na própria LP (reduz CPL ruim) e direciona o porte
 * menor pra Mentoria 1:1 sem perder o contato.
 */
const FITS = [
  "Tem de 10 a 100 colaboradores entre fiscal, folha, contábil e administrativo",
  "Fatura mais de R$ 1 milhão por ano",
  "Quer crescer a carteira sem contratar na mesma proporção",
  "Lançamento, conciliação e fechamento ainda travam o time todo mês",
];

const NOT_FITS = [
  {
    text: "Escritório de até 9 pessoas.",
    addendum: "Pra esse porte, a Mentoria 1:1 faz mais sentido.",
  },
];

export function ParaQuem() {
  return (
    <section
      id="para-quem"
      className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              ICP
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] text-foreground">
              É <em>pra você</em> se:
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 max-w-[1080px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
          {/* COLUNA POSITIVA — fits */}
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl border p-6 lg:p-8 h-full"
              style={{
                borderColor: "oklch(0.75 0.20 122 / 0.4)",
                backgroundColor: "oklch(0.18 0.025 122 / 0.4)",
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                Encaixa
              </p>
              <ul className="mt-5 space-y-4">
                {FITS.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full shrink-0"
                      style={{
                        backgroundColor: "oklch(0.75 0.20 122 / 0.16)",
                        border: "1px solid oklch(0.75 0.20 122 / 0.45)",
                      }}
                    >
                      <Check
                        className="h-3.5 w-3.5"
                        strokeWidth={3}
                        style={{ color: "var(--color-primary)" }}
                      />
                    </span>
                    <p className="text-[15px] lg:text-[16px] text-foreground leading-[1.55]">
                      {line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* COLUNA NEGATIVA — not fits, direciona pra Mentoria */}
          <Reveal delay={0.15}>
            <div
              className="rounded-2xl border border-border p-6 lg:p-8 h-full"
              style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.25)" }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                Não é pra você se
              </p>
              <ul className="mt-5 space-y-5">
                {NOT_FITS.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full shrink-0"
                      style={{
                        backgroundColor: "oklch(0.25 0.02 122 / 0.6)",
                        border: "1px solid oklch(0.5 0.02 122 / 0.45)",
                      }}
                    >
                      <X
                        className="h-3.5 w-3.5"
                        strokeWidth={3}
                        style={{ color: "oklch(0.7 0.02 122)" }}
                      />
                    </span>
                    <div>
                      <p className="text-[15px] lg:text-[16px] text-foreground leading-[1.55] font-medium">
                        {item.text}
                      </p>
                      <p className="mt-1.5 text-[13.5px] text-sage leading-[1.55]">
                        {item.addendum}
                      </p>
                    </div>
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
