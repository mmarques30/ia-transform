import { Reveal } from "@/components/Reveal";

/**
 * MetodoAplicaBook (LP-B) — book 3D "Método APLICA" em destaque.
 *
 * Equivalente ao book de metodologia do Marcus no Acelerador. Aqui é
 * capa dark com detalhe lime, círculo IAplicada no lugar do brasão,
 * assinatura Mari no rodapé.
 *
 * Se o book físico existir de fato, substituímos por <img> real.
 */

const BULLETS = [
  "Auditoria dos 5 processos que mais custam",
  'Ranking dos "ladrões de hora" do seu time',
  "ROI projetado por automação (com hipótese, não chute)",
  "Playbook do próximo trimestre entregue impresso",
];

export function MetodoAplicaBook() {
  return (
    <section
      id="metodo-aplica"
      className="section-veil py-[80px] lg:py-[110px] relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(80% 80% at 30% 50%, rgba(200,224,64,0.08), transparent 60%)",
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
                Ativo 1 · Diagnóstico documentado
              </span>
              <h2
                className="mt-5 font-extrabold text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Método{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  APLICA
                </em>
                : o mapa da sua operação em papel.
              </h2>
              <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[460px]">
                O framework que aplicamos em{" "}
                <strong className="text-foreground font-bold">+40 empresas</strong> — dos 5
                processos mais caros até o painel do próximo trimestre.{" "}
                <strong className="text-foreground font-bold">
                  Você fica com o material mesmo se a gente não implementar
                </strong>
                . Método completo, sem fumaça, sem PDFzinho de template.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {BULLETS.map((b) => (
                  <li
                    key={b}
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
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center justify-center" style={{ perspective: 1200 }}>
              <Book3D />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Book3D() {
  return (
    <div
      className="relative"
      style={{
        width: 290,
        height: 380,
        transform: "rotateY(-24deg) rotateX(4deg)",
        transformStyle: "preserve-3d",
        filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.6))",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden flex flex-col justify-between p-8"
        style={{
          borderRadius: "4px 14px 14px 4px",
          background: "linear-gradient(140deg, #0a0c07 0%, #14180d 50%, #1a2013 100%)",
          border: "1px solid var(--color-primary)",
          boxShadow: "inset 0 0 60px rgba(200,224,64,0.06)",
        }}
      >
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: 16,
            background: "linear-gradient(90deg, rgba(0,0,0,0.7), transparent)",
          }}
        />

        <div>
          <p
            className="text-[10px] tracking-[0.28em] uppercase font-bold"
            style={{
              color: "var(--color-primary)",
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            }}
          >
            METODOLOGIA · IAPLICADA
          </p>
          <div
            className="mt-4 h-10 w-10 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, #d5e95a, #7a8f30)",
              boxShadow: "0 0 30px rgba(200,224,64,0.5)",
            }}
          />
        </div>

        <div>
          <p
            className="italic font-medium leading-[0.95] text-[38px] text-foreground"
            style={{
              fontFamily: '"Instrument Serif", serif',
              letterSpacing: "-0.01em",
            }}
          >
            Método
            <br />
            APLICA
          </p>
          <p className="mt-3 text-[9.5px] tracking-[0.24em] uppercase font-bold text-sage">
            2026 · edição empresarial
          </p>
        </div>

        <div
          className="italic pt-3"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 16,
            color: "var(--color-primary)",
            borderTop: "1px solid rgba(200,224,64,0.3)",
          }}
        >
          Mariana Marques
          <span
            className="block not-italic mt-1 tracking-[0.22em] uppercase font-bold text-sage"
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              fontSize: 8,
            }}
          >
            Fundadora · IAplicada
          </span>
        </div>
      </div>
    </div>
  );
}
