import { Reveal } from "@/components/Reveal";

/**
 * Guarantee (LP-B) — dobra de redução de risco.
 *
 * Coluna esquerda: eyebrow "Nossa garantia" + h2 "Diagnóstico sem
 * custo. Material fica com você." + 2 parágrafos body. Inalterada.
 *
 * Coluna direita: lista editorial numerada dos 3 entregáveis.
 * Refeita depois do feedback: os 3 cards genéricos com ícones e
 * "VOCÊ LEVA" repetido 3x foram substituídos por lista única sem
 * cards, sem ícones, com:
 *  - label "VOCÊ LEVA" só 1x no topo
 *  - números 01/02/03 mono lime numa coluna de 48px
 *  - títulos brancos 19-20px weight 700
 *  - descrições rgba(255,255,255,.5) max-width 42ch
 *  - divisores hairline 1px rgba(255,255,255,.08)
 *  - padding vertical 28px por item
 *  - hover: número acende + glow, título desliza 4px direita,
 *    divisor de baixo ganha gradient lime que expande da esquerda
 *  - entrada em cascata com stagger 120ms via delay do Reveal
 */

interface DeliverableItem {
  n: string;
  title: string;
  detail: string;
}

const KIT_ITEMS: DeliverableItem[] = [
  {
    n: "01",
    title: "Mapa de processos",
    detail: "Os 5 processos que mais consomem tempo do seu time, documentados.",
  },
  {
    n: "02",
    title: "Ranking de gargalos",
    detail: "Onde a operação trava, ordenado por custo e impacto no faturamento.",
  },
  {
    n: "03",
    title: "Playbook do trimestre",
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

          <div>
            <Reveal>
              <p
                className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Você leva
              </p>
            </Reveal>
            <ul className="guarantee-list">
              {KIT_ITEMS.map((item, i) => (
                <Reveal key={item.n} delay={0.05 + i * 0.12}>
                  <DeliverableRow item={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverableRow({ item }: { item: DeliverableItem }) {
  return (
    <li className="guarantee-item">
      <span className="guarantee-item__n">{item.n}</span>
      <div className="guarantee-item__body">
        <h3 className="guarantee-item__title">{item.title}</h3>
        <p className="guarantee-item__detail">{item.detail}</p>
      </div>
    </li>
  );
}
