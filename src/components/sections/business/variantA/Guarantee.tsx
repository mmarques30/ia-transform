import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

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
    detail: "Onde a operação trava, ordenado por custo e impacto na receita.",
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
      className="relative py-[80px] lg:py-[110px] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0f07 0%, #111408 50%, #0c0f07 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 80% at 70% 50%, rgba(200,224,64,0.06), transparent 60%)",
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

        <Reveal delay={0.25}>
          <div
            className="mt-14 lg:mt-20 max-w-[720px] mx-auto rounded-[20px] px-8 py-8 lg:px-10 lg:py-10"
            style={{
              background: "rgba(200,224,64,0.04)",
              border: "1px solid rgba(200,224,64,0.15)",
            }}
          >
            <h3
              className="text-[18px] lg:text-[22px] font-extrabold leading-[1.2] tracking-[-0.01em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              E se você avançar para a implementação:
            </h3>
            <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
              Se você seguir o processo que acordamos — fizer os testes dentro do prazo, implementar
              do jeito que combinamos — e o sistema não funcionar,{" "}
              <strong className="text-foreground font-bold">devolvemos o investimento</strong>. Sem
              letra miúda.
            </p>
            <p className="mt-4 text-[13.5px] lg:text-[14px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.5)" }}>
              O condicionante existe porque o resultado depende dos dois lados. Quem cumpre o
              processo não pede devolução. Nunca aconteceu.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 text-center">
            <CtaGlow size="lg">Garantir minha vaga →</CtaGlow>
          </div>
        </Reveal>
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
