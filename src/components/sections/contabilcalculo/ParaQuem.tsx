import { Reveal } from "@/components/Reveal";
import { Check, X } from "lucide-react";

/**
 * Seção 6 do brief — Pra quem é.
 * Qualifica o lead com "É pra você se" + "Não é pra você se".
 * O bloco negativo previne CPL ruim e direciona perfil pequeno
 * pra Mentoria 1:1 (sem perder contato).
 */
const FITS = [
  "Tem um escritório contábil com 10 ou mais colaboradores",
  "Atende +15 clientes",
  "Sente que a equipe está no limite e contratar mais gente já não fecha a conta",
  "Quer crescer base de clientes sem dobrar a folha",
  "Já ouviu falar de IA pro setor, mas não sabe por onde começar",
];

const NOT_FITS = [
  "É contador autônomo solo (a calculadora considera time)",
  "Atende menos de 10 clientes",
  "Já tem operação 100% automatizada (parabéns, não temos o que te oferecer)",
];

export function ParaQuem() {
  return (
    <section
      id="para-quem"
      className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden"
    >
      <div className="container-page relative">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal delay={0.05}>
            <h2 className="h-mix text-[32px] sm:text-[40px] lg:text-[52px] text-foreground">
              Esse diagnóstico foi feito <em>pra você</em> se…
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 max-w-[1080px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
          {/* Coluna POSITIVA */}
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

          {/* Coluna NEGATIVA */}
          <Reveal delay={0.15}>
            <div
              className="rounded-2xl border border-border p-6 lg:p-8 h-full"
              style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.25)" }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                Não é pra você se
              </p>
              <ul className="mt-5 space-y-4">
                {NOT_FITS.map((line) => (
                  <li key={line} className="flex items-start gap-3">
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
                    <p className="text-[15px] lg:text-[16px] text-foreground leading-[1.55]">
                      {line}
                    </p>
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
