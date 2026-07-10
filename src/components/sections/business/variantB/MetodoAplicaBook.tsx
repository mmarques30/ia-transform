import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * MetodoAplicaBook (LP-B) — reescrito: no lugar do book 3D
 * (que ficava desconectado da proposta) agora é uma TRILHA vertical
 * dos 6 passos do Método APLICA integrada ao lado direito da seção.
 *
 * O nome do arquivo/componente ficou por compatibilidade — poderíamos
 * renomear pra MetodoAplicaTrail, mas ia rippolar em todo o route + PR
 * histórico. O comentário aqui documenta o que ele é hoje.
 *
 * Etapas do método (A → P → L → I → C → A):
 *   A · Analisar    — mapear onde a operação trava
 *   P · Planejar    — desenhar o sistema que elimina o gargalo
 *   L · Listar      — inventariar processos, gente, ferramentas
 *   I · Implementar — construir o sistema dentro do negócio
 *   C · Conectar    — integrar com o que já existe (sem trocar tudo)
 *   A · Automatizar — piloto automático das rotinas repetitivas
 *
 * Trilha visual: 6 nós circulares com letra em Instrument Serif italic
 * lime, ligados por uma linha vertical dashed (traço de sistema/circuito),
 * cada nó com número + label + descrição curta ao lado. Reveal escalonado
 * pra dar entrada progressiva.
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
      className="section-veil py-[80px] lg:py-[120px] relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 25% 40%, rgba(200,224,64,0.08), transparent 60%), radial-gradient(60% 55% at 85% 60%, rgba(200,224,64,0.06), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center max-w-[1100px] mx-auto">
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
                className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] text-foreground"
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
              <p className="mt-5 text-[15px] lg:text-[16.5px] text-sage leading-[1.6] max-w-[480px]">
                O Método <strong className="text-foreground font-bold">APLICA</strong> mapeia onde
                sua operação trava, constrói o sistema que elimina o gargalo e implementa dentro do
                seu negócio.{" "}
                <strong className="text-foreground font-bold">
                  Não numa planilha de recomendação.
                </strong>
              </p>
              <div className="mt-8">
                <CtaGlow size="md">Conhecer o Método APLICA →</CtaGlow>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <MetodoAplicaTrail />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MetodoAplicaTrail() {
  return (
    <ol className="relative flex flex-col gap-5 lg:gap-6" aria-label="Passos do Método APLICA">
      {/* Linha vertical conectando os nós — dashed lime com fade nas extremidades. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-6 bottom-6"
        style={{
          left: 24,
          width: 2,
          backgroundImage:
            "linear-gradient(180deg, transparent 0%, rgba(200,224,64,0.55) 15%, rgba(200,224,64,0.55) 85%, transparent 100%)",
          backgroundSize: "2px 8px",
          backgroundRepeat: "repeat-y",
          maskImage: "linear-gradient(180deg, black 8px, transparent 8px)",
          WebkitMaskImage: "linear-gradient(180deg, black 8px, transparent 8px)",
          maskSize: "100% 12px",
          WebkitMaskSize: "100% 12px",
          maskRepeat: "repeat-y",
          WebkitMaskRepeat: "repeat-y",
        }}
      />

      {APLICA_STEPS.map((s, i) => (
        <li key={i} className="relative flex items-start gap-4 lg:gap-5">
          <TrailNode letter={s.letter} index={i} />
          <div className="pt-1 min-w-0">
            <p
              className="text-[9.5px] uppercase tracking-[0.22em] font-bold"
              style={{
                color: "rgba(200,224,64,0.55)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              STEP {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              className="mt-1 text-[19px] lg:text-[22px] leading-[1.15] font-extrabold text-foreground"
              style={{ letterSpacing: "-0.01em" }}
            >
              {s.label}
            </h3>
            <p className="mt-1 text-[13.5px] lg:text-[14px] text-sage leading-[1.5]">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TrailNode({ letter, index }: { letter: string; index: number }) {
  const isFirst = index === 0;
  return (
    <div className="relative shrink-0">
      {/* Halo lime blur atrás do nó — mais forte no primeiro pra sinalizar
          "começa aqui". */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(200,224,64,0.35), transparent 70%)",
          filter: `blur(${isFirst ? 18 : 12}px)`,
          transform: "scale(1.4)",
        }}
      />
      <span
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: 50,
          height: 50,
          background: "radial-gradient(circle at 30% 30%, #14180d, #0a0c07 70%)",
          border: "2px solid var(--color-primary)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 14px -4px rgba(200,224,64,0.35)",
        }}
      >
        <span
          className="text-[26px] leading-none italic"
          style={{
            fontFamily: '"Instrument Serif", serif',
            color: "var(--color-primary)",
            fontWeight: 500,
          }}
        >
          {letter}
        </span>
      </span>
    </div>
  );
}
