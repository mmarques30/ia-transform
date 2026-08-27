import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";

const LEFT_ITEMS = [
  "Tudo passa pelo fundador",
  "Operação vive em planilha e WhatsApp",
  "Decisão trava por falta de dado",
  "Crescer significa contratar mais",
  "Retrabalho entra como custo fixo",
];

const RIGHT_ITEMS = [
  "Sistema resolve o que é rotina",
  "Dados centralizados e integrados",
  "Decisão acontece no sistema, não no WhatsApp",
  "IA elimina o retrabalho na raiz",
  "Time executa, você escala",
];

export function Comparison() {
  return (
    <section
      className="relative py-[80px] lg:py-[110px]"
      style={{ background: "linear-gradient(180deg, #0c0f07 0%, #111408 50%, #0c0f07 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(200,224,64,0.04), transparent 60%)",
        }}
      />

      <div className="relative container-page">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <h2
              className="font-extrabold text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.08] tracking-[-0.02em]"
              style={{ textWrap: "balance" }}
            >
              <span
                style={{ color: "var(--color-primary)" }}
              >
                As empresas que mais escalam hoje
              </span>{" "}
              <span className="text-foreground">
                são as que automatizam a operação antes de contratar mais gente.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[640px] mx-auto">
              Existe uma diferença fundamental entre empresas que crescem com eficiência e as que
              crescem multiplicando problema. É uma questão de sistema, não de equipe.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[900px] mx-auto">
            <ComparisonCard
              title="Como a maioria opera:"
              items={LEFT_ITEMS}
              result="Crescimento que cria gargalo, não velocidade."
              variant="negative"
            />
            <ComparisonCard
              title="Como opera com a IAplicada:"
              items={RIGHT_ITEMS}
              result="Mais receita com o time que você já tem."
              variant="positive"
            />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 lg:mt-16 text-center">
            <OriginButton onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}>
              quero meu diagnóstico
            </OriginButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  items,
  result,
  variant,
}: {
  title: string;
  items: string[];
  result: string;
  variant: "negative" | "positive";
}) {
  const isPositive = variant === "positive";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: isPositive ? "rgba(200,224,64,0.08)" : "rgba(255,255,255,0.04)",
        border: isPositive
          ? "1px solid rgba(200,224,64,0.3)"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
      }}
    >
      <div className="px-7 pt-8 pb-6 lg:px-8 lg:pt-9 lg:pb-7">
        <h3
          className="text-[18px] lg:text-[20px] font-extrabold tracking-[-0.01em] leading-[1.2] text-center"
          style={{ color: isPositive ? "var(--color-primary)" : "rgba(255,255,255,0.7)" }}
        >
          {title}
        </h3>

        <div className="mt-6 flex flex-col">
          {items.map((item, i) => (
            <div key={i}>
              <div className="py-3.5 text-center">
                <span
                  className="text-[14px] lg:text-[15px] leading-[1.5]"
                  style={{
                    color: isPositive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                    fontWeight: isPositive ? 500 : 400,
                  }}
                >
                  {item}
                </span>
              </div>
              {i < items.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: isPositive
                      ? "rgba(200,224,64,0.15)"
                      : "rgba(255,255,255,0.08)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="px-7 py-5 lg:px-8 lg:py-6 text-center"
        style={{
          background: isPositive
            ? "rgba(200,224,64,0.12)"
            : "rgba(255,255,255,0.03)",
          borderTop: isPositive
            ? "1px solid rgba(200,224,64,0.2)"
            : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-[13px] tracking-[0.08em] uppercase font-bold" style={{ color: isPositive ? "var(--color-primary)" : "rgba(255,255,255,0.4)" }}>
          Resultado:
        </p>
        <p
          className="mt-1.5 text-[14px] lg:text-[15px] leading-[1.5] font-semibold"
          style={{ color: isPositive ? "var(--color-primary)" : "rgba(255,255,255,0.6)" }}
        >
          {result}
        </p>
      </div>
    </div>
  );
}
