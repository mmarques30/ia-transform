import { Reveal } from "@/components/Reveal";
import { useDiagnostico } from "./DiagnosticoContext";

/**
 * DorResposta — pattern dos feature cards do nextsense.io:
 * imagem full-bleed no topo, headline curta, body. 3 cards verticais
 * com proporção 16:10 nas imagens, criando ritmo visual.
 * Substitui o layout num-display + texto numerado anterior.
 *
 * Cada card representa uma fase: contratação → margem → virada.
 * Imagens são mockups reais de produto (dashboards/painéis).
 */

const FEATURES = [
  {
    n: "01",
    image: "/clients/contabil-desktop.webp",
    headline: "Você cresce em clientes.",
    body: "Quatro contas novas no mês. A operação responde com plantão de sênior, hora extra e contratação de júnior.",
  },
  {
    n: "02",
    image: "/clients/catalogo-ferramentas-fiscais.webp",
    headline: "A folha cresce junto.",
    body: "Onboarding consome semanas. Treinamento, supervisão, retrabalho. Cada novo cliente custa mais margem.",
  },
  {
    n: "03",
    image: "/clients/recuperacao-tributaria-varejo.webp",
    headline: "A margem some.",
    body: "Mais demanda, mais custo, mesma operação manual. O escritório cresce sem virar lucro.",
  },
];

export function DorResposta() {
  const { open } = useDiagnostico();
  return (
    <section className="relative py-[100px] lg:py-[160px] overflow-hidden">
      <div className="container-page relative">
        {/* Header centralizado */}
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <p
              className="text-[11px] uppercase tracking-[0.28em] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              O cenário do escritório
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="h-mix mt-6 text-[38px] sm:text-[52px] lg:text-[72px] leading-[0.98] text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Crescer sem escalar margem
              <br />
              <em>tem um nome.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[640px] mx-auto">
              O problema não é vender mais clientes. É que a operação contábil ainda escala
              proporcional à contratação.
            </p>
          </Reveal>
        </div>

        {/* 3 cards estilo nextsense — imagem top + texto bottom */}
        <div className="mt-20 lg:mt-28 grid lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={0.08 + i * 0.08}>
              <article
                className="group relative rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: "oklch(0.16 0.02 122)",
                  border: "1px solid oklch(0.55 0.06 122 / 0.28)",
                }}
              >
                {/* Imagem hero — aspecto 16:10 */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <img
                    src={f.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Overlay gradient pra legibilidade do número */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.10 0.012 122 / 0.55) 0%, transparent 35%, transparent 65%, oklch(0.10 0.012 122 / 0.7) 100%)",
                    }}
                  />
                  <span
                    className="num-display absolute top-5 left-6 text-[20px] tracking-[0.12em]"
                    style={{ color: "oklch(0.97 0.015 110)" }}
                  >
                    {f.n}
                  </span>
                </div>

                {/* Texto */}
                <div className="p-7 lg:p-8 flex-1 flex flex-col">
                  <h3
                    className="h-mix text-[22px] lg:text-[26px] leading-[1.1] text-foreground"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {f.headline}
                  </h3>
                  <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.6]">
                    {f.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bloco "A virada" — centralizado, separado por divider hairline */}
        <Reveal delay={0.32}>
          <div className="mt-24 lg:mt-32 max-w-[820px] mx-auto text-center">
            <div
              aria-hidden
              className="mx-auto mb-12 h-px w-24"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
            <p
              className="text-[11px] uppercase tracking-[0.28em] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              A virada
            </p>
            <p
              className="mt-7 text-[22px] lg:text-[30px] leading-[1.35] text-foreground"
              style={{ letterSpacing: "-0.012em" }}
            >
              A IA <em className="text-primary">não substitui</em> contador. Assume o pedaço operacional que tomava o tempo da
              equipe pra ela voltar ao que paga melhor:{" "}
              <span className="font-semibold">consultoria, planejamento</span> e{" "}
              <span className="font-semibold">relação com cliente</span>.
            </p>
            <p className="mt-7 text-[15px] lg:text-[16.5px] text-sage leading-[1.6]">
              Em <span className="font-bold text-foreground">7 dias</span>, primeira rotina
              automatizada em produção. Em{" "}
              <span className="font-bold text-foreground">8 semanas</span>, time autônomo. Sem
              trocar de sistema, sem depender de TI.
            </p>

            <button
              type="button"
              onClick={open}
              className="mt-12 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-bold hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-primary)" }}
            >
              Quanto isso vale pra você
              <span aria-hidden>→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
