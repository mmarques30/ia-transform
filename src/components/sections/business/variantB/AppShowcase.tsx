import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * AppShowcase (LP-B) — celular + backdrop lime arredondado.
 *
 * Equivalente ao mockup do app do Marcus no Acelerador (shape laranja
 * curvo enquadrando o iPhone). Traduzido pra IAplicada: lime no lugar
 * do laranja, tela dentro do phone mostra painel real.
 */

const BULLETS = [
  <>Cada processo no lugar certo</>,
  <>Cada entrega rastreável</>,
  <>
    Sem precisar <strong className="text-foreground font-bold">perguntar pra ninguém</strong>
  </>,
  <>Painel próprio · seu domínio, seu logo</>,
];

export function AppShowcase() {
  return (
    <section id="sistema-app" className="section-veil py-[80px] lg:py-[110px]">
      <div className="container-page">
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
                O que seu time usa depois que a gente constrói
              </span>
              <h2
                className="mt-5 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Seu time executa com{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  padrão.
                </em>
                <br />
                Você vê tudo, sem precisar{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  estar em tudo.
                </em>
              </h2>
              <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[460px]">
                <strong className="text-foreground font-bold">
                  Cada processo no lugar certo. Cada entrega rastreável.
                </strong>{" "}
                Sem precisar perguntar pra ninguém.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {BULLETS.map((b, i) => (
                  <li
                    key={i}
                    className="pl-6 relative text-[14px] lg:text-[14.5px] text-foreground leading-[1.5]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 text-[14px] font-black"
                      style={{ color: "var(--color-primary)" }}
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaGlow size="md">Ver como funciona →</CtaGlow>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative flex items-center justify-center min-h-[420px] lg:min-h-[560px]">
              <div
                aria-hidden
                className="absolute"
                style={{
                  width: "88%",
                  height: "88%",
                  top: "6%",
                  left: "6%",
                  background: "linear-gradient(160deg, #d5e95a 0%, #c8e040 50%, #7a8f30 100%)",
                  borderRadius: "100px 20px 100px 20px",
                  boxShadow: "0 40px 80px -20px rgba(200,224,64,0.4)",
                }}
              />
              <PhoneMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div
      className="relative"
      style={{
        width: 240,
        aspectRatio: "9 / 19",
        background: "#0a0c07",
        border: "6px solid #05060a",
        borderRadius: 42,
        padding: 6,
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 2px rgba(200,224,64,0.2)",
        transform: "rotate(-4deg)",
      }}
    >
      <span
        aria-hidden
        className="absolute z-10"
        style={{
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 70,
          height: 20,
          borderRadius: 999,
          background: "#05060a",
        }}
      />
      <div
        className="h-full overflow-hidden flex flex-col gap-2.5"
        style={{
          background: "#fdfdf5",
          color: "#131610",
          borderRadius: 34,
          padding: "38px 14px 18px",
        }}
      >
        <div className="pb-2 flex items-center gap-2 border-b" style={{ borderColor: "#e5e7dc" }}>
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ background: "radial-gradient(circle at 30% 30%, #d5e95a, #7a8f30)" }}
          />
          <span
            className="text-[9px] tracking-[0.18em] uppercase font-extrabold"
            style={{
              color: "#131610",
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            }}
          >
            SuaEmpresa · painel
          </span>
        </div>
        <div>
          <p className="text-[14px] font-bold">Boa noite, equipe.</p>
          <p className="text-[9.5px] mt-0.5" style={{ color: "#6b7280" }}>
            Terça · 22:14 · fechamento em curso
          </p>
        </div>
        <PhoneKpi label="Volume hoje" value="R$ 482 mil" />
        <PhoneKpi label="Alertas · IA" value="7 pendências" warn />
        <div className="flex flex-col gap-1.5 mt-1">
          <PhoneRow>
            <b>Compensação</b> · #42 · +R$18.500
          </PhoneRow>
          <PhoneRow>Assinatura pendente · Judicial</PhoneRow>
          <PhoneRow>Relatório mensal · em fila</PhoneRow>
        </div>
      </div>
    </div>
  );
}

function PhoneKpi({
  label,
  value,
  warn = false,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: warn ? "#fef9c3" : "#f4f8dd",
        border: warn ? "1px solid #eab308" : "1px solid #c8e040",
      }}
    >
      <p
        className="text-[7.5px] uppercase tracking-[0.14em] font-extrabold"
        style={{
          color: warn ? "#854d0e" : "#4d7c0f",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {label}
      </p>
      <p
        className="mt-0.5 text-[20px] italic leading-none"
        style={{ fontFamily: '"Instrument Serif", serif', color: "#131610" }}
      >
        {value}
      </p>
    </div>
  );
}

function PhoneRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[9px]"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7dc",
        color: "#374151",
      }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: "#a5c73a", boxShadow: "0 0 4px rgba(200,224,64,0.6)" }}
      />
      <span>{children}</span>
    </div>
  );
}
