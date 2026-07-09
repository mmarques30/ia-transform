import { Reveal } from "@/components/Reveal";

/**
 * SelectedClients (LP-B) — grid 4-col de fundadores/logos clientes.
 * Substitui os "alunos famosos" do Acelerador (que era Boca Rosa,
 * Janguiê etc — celebridades) por fundadores de empresas reconhecidas
 * no nicho da IAplicada.
 *
 * Cada célula tem placeholder de rosto (silhueta) até termos foto real
 * dos fundadores. Se não tiver, cai o logo da empresa no lugar do rosto.
 */

const CLIENTS = [
  { name: "Ricardo Salvatti", detail: "PSA Consultores" },
  { name: "Camila Brito", detail: "CB Move" },
  { name: "André Zembruski", detail: "Borges & Zembruski" },
  { name: "Focus Fintax", detail: "Compensação Tributária" },
  { name: "Turystar", detail: "Operadora de Turismo" },
  { name: "Quadra Arquitetura", detail: "Escritório Corporativo" },
  { name: "Cimed", detail: "Farmacêutica" },
  { name: "+29 empresas", detail: "Ver todos" },
];

export function SelectedClients() {
  return (
    <section id="clientes-selecionados" className="section-veil py-[80px] lg:py-[110px]">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span
              className="inline-block px-5 py-2 rounded-full font-extrabold text-[15px] tracking-[-0.01em]"
              style={{
                background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                color: "#0a0c07",
              }}
            >
              Construído dentro de empresas como a sua
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-4 font-extrabold text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.15] tracking-[-0.02em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                +40 sistemas
              </em>{" "}
              implementados.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-4 text-[15px] lg:text-[16px] font-bold leading-[1.4] max-w-[620px] mx-auto"
              style={{ color: "var(--color-primary)" }}
            >
              +R$ 2M em horas de operação recuperadas.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 max-w-[900px] mx-auto">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.name} delay={0.15 + i * 0.04}>
              <ClientCell name={c.name} detail={c.detail} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientCell({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-full rounded-xl overflow-hidden relative"
        style={{
          aspectRatio: "4 / 5",
          background: "radial-gradient(circle at 40% 30%, #2a2f22, #0d0f08 80%)",
          border: "1px solid #262a1c",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 30% at 50% 30%, rgba(230,220,200,0.4), transparent 70%), radial-gradient(60% 55% at 50% 75%, rgba(30,45,70,0.7), transparent 70%)",
          }}
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-[13.5px] text-foreground">{name}</p>
        <p className="text-[11.5px] text-sage mt-0.5">{detail}</p>
      </div>
    </div>
  );
}
