import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * MetodoAplicaBook (LP-B) — book 3D "Método APLICA" em destaque.
 *
 * Equivalente ao book de metodologia do Marcus no Acelerador. Aqui é
 * capa dark com detalhe lime, círculo IAplicada no lugar do brasão,
 * assinatura Mari no rodapé.
 *
 * Etapas do método APLICA (uma letra por bullet):
 *   A · Analisar   — mapear onde a operação trava
 *   P · Planejar   — desenhar o sistema que elimina o gargalo
 *   L · Listar     — inventariar processos, gente, ferramentas
 *   I · Implementar — construir o sistema dentro do negócio
 *   C · Conectar   — integrar com o que já existe (sem trocar tudo)
 *   A · Automatizar — piloto automático das rotinas repetitivas
 */

interface AplicaStep {
  letter: string;
  label: string;
  detail: string;
}

const APLICA_STEPS: AplicaStep[] = [
  { letter: "A", label: "Analisar", detail: "onde sua operação trava hoje" },
  { letter: "P", label: "Planejar", detail: "o sistema que elimina o gargalo" },
  { letter: "L", label: "Listar", detail: "processos, gente e ferramentas" },
  { letter: "I", label: "Implementar", detail: "dentro do seu negócio, não em slide" },
  { letter: "C", label: "Conectar", detail: "com o que já roda, sem trocar tudo" },
  { letter: "A", label: "Automatizar", detail: "as rotinas que consomem seu time" },
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
                Como a gente faz
              </span>
              <h2
                className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[44px] leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Um diagnóstico. Um sistema.{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  90 dias.
                </em>
              </h2>
              <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[460px]">
                O Método <strong className="text-foreground font-bold">APLICA</strong> mapeia onde
                sua operação trava, constrói o sistema que elimina o gargalo e implementa dentro do
                seu negócio —{" "}
                <strong className="text-foreground font-bold">
                  não numa planilha de recomendação
                </strong>
                .
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {APLICA_STEPS.map((s) => (
                  <li
                    key={s.label}
                    className="grid items-baseline gap-3 text-[13.5px] lg:text-[14.5px] text-foreground leading-[1.4]"
                    style={{ gridTemplateColumns: "28px 1fr" }}
                  >
                    <span
                      aria-hidden
                      className="font-extrabold text-[16px] lg:text-[18px] leading-none"
                      style={{
                        color: "var(--color-primary)",
                        fontFamily: '"Instrument Serif", serif',
                        fontStyle: "italic",
                      }}
                    >
                      {s.letter}
                    </span>
                    <span>
                      <strong className="font-bold text-foreground">{s.label}</strong>{" "}
                      <span className="text-sage">— {s.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaGlow size="md">Conhecer o Método APLICA →</CtaGlow>
              </div>
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
