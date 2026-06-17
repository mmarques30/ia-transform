import { ReferralForm } from "./ReferralForm";

/**
 * Hero da LP /indicacaobusiness — única dobra da página.
 *
 * Layout 2-col:
 *   Esquerda: pitch da indicação (eyebrow + headline + sub + quote +
 *             card "O QUE VOCÊ GANHA" com benefícios)
 *   Direita:  form de indicação (ReferralForm).
 *
 * Não tem Problem/Solution/Process/Authority — o user pediu versão
 * mais objetiva. Tudo o que importa cabe na primeira tela.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 0%, oklch(0.22 0.03 122 / 0.5) 0%, transparent 75%)",
      }}
    >
      <div className="h-[72px]" aria-hidden />

      <div className="relative pt-[48px] lg:pt-[72px] pb-[80px] lg:pb-[120px]">
        <div className="container-page relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
            {/* COL 1: pitch da indicação */}
            <div>
              <h1
                className="h-mix text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.02] text-foreground"
                style={{ letterSpacing: "-0.02em" }}
              >
                Indique quem merece
                <br />
                conhecer a <em>IAplicada</em>
              </h1>

              <p className="mt-7 lg:mt-9 text-[16px] lg:text-[18px] text-sage leading-[1.6] max-w-[480px]">
                Conhece um empresário que se beneficiaria de IA no negócio? Conta pra gente. A
                gente cuida do resto e ainda te recompensa por isso.
              </p>

              {/* Card de recompensas */}
              <div
                className="mt-10 rounded-2xl p-6 lg:p-7"
                style={{
                  backgroundColor: "oklch(0.16 0.02 122 / 0.7)",
                  border: "1px solid oklch(0.55 0.06 122 / 0.35)",
                }}
              >
                <p className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                  O que você ganha
                </p>
                <h3 className="mt-2 text-[19px] lg:text-[21px] font-bold text-foreground tracking-tight">
                  Módulo ou automação extra no seu sistema
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <RewardTile
                    label="1 indicado"
                    sub="fechar projeto Business"
                    prize="1 automação"
                  />
                  <RewardTile
                    label="3 ou mais indicados"
                    sub="fechamentos Business"
                    prize="1 módulo completo"
                  />
                </div>

                <ul className="mt-6 space-y-2.5 text-[13px] text-sage leading-[1.55]">
                  <li className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                    Válido exclusivamente para fechamentos de projetos Business.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                    Entrega do módulo/automação em até 60 dias após o fechamento do indicado.
                  </li>
                </ul>
              </div>
            </div>

            {/* COL 2: form */}
            <div className="lg:sticky lg:top-24">
              <ReferralForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface RewardTileProps {
  label: string;
  sub: string;
  prize: string;
}

function RewardTile({ label, sub, prize }: RewardTileProps) {
  return (
    <div
      className="rounded-xl p-4 lg:p-5"
      style={{
        backgroundColor: "oklch(0.12 0.012 122 / 0.55)",
        border: "1px solid oklch(0.55 0.06 122 / 0.3)",
      }}
    >
      <p className="text-[12.5px] font-bold text-foreground leading-tight">{label}</p>
      <p className="mt-1 text-[11px] text-muted-foreground leading-tight">{sub}</p>
      <div
        className="mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          backgroundColor: "oklch(0.75 0.20 122 / 0.12)",
          border: "1px solid oklch(0.75 0.20 122 / 0.45)",
        }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.14em] font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          Ganha
        </span>
        <span
          className="text-[13px] font-bold tracking-tight"
          style={{ color: "var(--color-primary)" }}
        >
          {prize}
        </span>
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
        No seu sistema
      </p>
    </div>
  );
}
