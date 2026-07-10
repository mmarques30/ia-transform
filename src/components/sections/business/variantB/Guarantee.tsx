import { Reveal } from "@/components/Reveal";
import { FileCheck, Sparkles, Target } from "lucide-react";

/**
 * Guarantee (LP-B) — dobra de redução de risco.
 *
 * Reescrita depois de feedback: "carimbo de cartório? é uma
 * assinatura digital, não faz o menor sentido. Não sei se isso é só
 * para venda. 90 dias, nem todos os projetos são em 90 dias."
 *
 * Removidos:
 *  - Carta cartório rotacionada com assinatura M. Marques fake
 *  - Carimbo circular "100% GARANTIDO"
 *  - Promessa "devolvemos 100% do investimento em 90 dias" —
 *    inaplicável universalmente (fatores externos podem atrasar,
 *    escopo varia por projeto)
 *
 * A nova promessa é a que a IAplicada REALMENTE cumpre:
 *   1. O diagnóstico é bancado pela IAplicada — não custa nada
 *      pra você
 *   2. Independente de fecharmos contrato, você fica com o material
 *      (mapa de processos + ranking gargalos + playbook trimestre)
 *   3. Se topar seguir, o escopo do contrato tem marcos semanais e
 *      critérios de aceite objetivos
 *
 * Visual: 3 cards mostrando o que o cliente leva do diagnóstico,
 * como um "kit real" de entregáveis. Sem selo, sem carimbo, sem
 * documento fake — honesto e informativo.
 */

interface GaranteeItem {
  icon: React.ReactNode;
  label: string;
  detail: string;
}

const KIT_ITEMS: GaranteeItem[] = [
  {
    icon: <Target className="h-5 w-5" strokeWidth={2} />,
    label: "Mapa de processos",
    detail: "Os 5 processos que mais consomem tempo do seu time hoje, documentados.",
  },
  {
    icon: <Sparkles className="h-5 w-5" strokeWidth={2} />,
    label: "Ranking de gargalos",
    detail: "Onde a operação trava, ordenado por custo (horas/mês) e impacto no faturamento.",
  },
  {
    icon: <FileCheck className="h-5 w-5" strokeWidth={2} />,
    label: "Playbook do trimestre",
    detail: "Priorização de automações com hipótese de ROI. Você usa mesmo sem a gente.",
  },
];

export function Guarantee() {
  return (
    <section
      id="garantia"
      className="relative section-veil py-[80px] lg:py-[110px] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(80% 80% at 70% 50%, rgba(200,224,64,0.08), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1080px] mx-auto">
          <Reveal>
            <div>
              <span
                className="inline-block px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold"
                style={{
                  border: "1px solid rgba(200,224,64,0.4)",
                  background: "rgba(200,224,64,0.06)",
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Nossa garantia
              </span>
              <h2
                className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Diagnóstico sem custo. Material{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  fica com você.
                </em>
              </h2>
              <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                O diagnóstico é bancado pela{" "}
                <strong className="text-foreground font-bold">IAplicada</strong>. Se ao fim você não
                fechar contrato de implementação, ainda leva o mapa de processos, o ranking de
                gargalos e o playbook do próximo trimestre.
              </p>
              <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                Se topar seguir, o contrato tem{" "}
                <strong className="text-foreground font-bold">
                  escopo, marcos semanais e critérios de aceite
                </strong>{" "}
                objetivos. Sem letras miúdas, sem carimbo de vendedor.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-3.5">
              {KIT_ITEMS.map((item, i) => (
                <GaranteeKitCard key={i} item={item} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GaranteeKitCard({ item }: { item: GaranteeItem }) {
  return (
    <div
      className="relative p-5 lg:p-6 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(20,24,13,0.8), rgba(15,17,9,0.85))",
        border: "1px solid rgba(200,224,64,0.2)",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-start gap-4">
        <span
          className="shrink-0 h-11 w-11 rounded-xl flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(200,224,64,0.18), rgba(200,224,64,0.05))",
            border: "1px solid rgba(200,224,64,0.3)",
            color: "var(--color-primary)",
          }}
        >
          {item.icon}
        </span>
        <div className="min-w-0">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-bold"
            style={{
              color: "var(--color-primary)",
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            }}
          >
            Você leva
          </p>
          <h3 className="mt-1 text-[16px] lg:text-[17.5px] font-extrabold text-foreground tracking-[-0.01em]">
            {item.label}
          </h3>
          <p className="mt-1.5 text-[13px] lg:text-[13.5px] text-sage leading-[1.5]">
            {item.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
