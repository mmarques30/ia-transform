import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { PainelClientesShowcase } from "@/components/sections/business/variantB/painel/PainelClientesShowcase";

export function MetodoAplicaBook() {
  return (
    <section
      id="metodo-aplica"
      className="py-[80px] lg:py-[120px] relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0f07 0%, #111408 50%, #0c0f07 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 40%, rgba(200,224,64,0.05), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
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
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[46px] leading-[1.05] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Um diagnóstico. Um sistema.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                30 dias para o primeiro resultado.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16.5px] text-sage leading-[1.6] max-w-[640px] mx-auto">
              O Método <strong className="text-foreground font-bold">APLICA</strong> identifica onde
              sua operação trava, constrói o sistema que resolve e implementa dentro do seu negócio.
              Sem ERP engessado. Sem consultoria que some depois da apresentação.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 lg:mt-16 max-w-[960px] mx-auto">
            <ComparisonTable />
          </div>
        </Reveal>

        <div className="mt-16 lg:mt-20 max-w-[820px] mx-auto text-center">
          <Reveal delay={0.3}>
            <h3
              className="font-extrabold text-[24px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-[-0.02em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Sua operação roda. Seu time entrega.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Você acompanha tudo sem estar no meio de tudo.
              </span>
            </h3>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="mt-10 max-w-[720px] mx-auto">
            <PainelClientesShowcase />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <OriginButton onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}>
              quero meu sistema
            </OriginButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {/* Header row */}
      <div className="metodo-table-row metodo-table-header">
        <div className="metodo-table-cell metodo-table-label" />
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5L13 13M13 5L5 13" stroke="rgba(255,100,100,0.7)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="metodo-table-eyebrow" style={{ color: "rgba(255,100,100,0.6)" }}>ERP</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5L13 13M13 5L5 13" stroke="rgba(255,100,100,0.7)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="metodo-table-eyebrow" style={{ color: "rgba(255,100,100,0.6)" }}>Consultoria</span>
        </div>
        <div className="metodo-table-cell metodo-table-pos">
          <span className="metodo-table-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9.5L7.5 13L14 5.5" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="metodo-table-eyebrow" style={{ color: "var(--color-primary)" }}>IAplicada</span>
        </div>
      </div>

      {/* Row: Proposta */}
      <div className="metodo-table-row">
        <div className="metodo-table-cell metodo-table-label">
          <span className="metodo-table-label-text">Proposta</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-value-neg">Feito pra padronizar</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-value-neg">Entrega diagnóstico</span>
        </div>
        <div className="metodo-table-cell metodo-table-pos">
          <span className="metodo-table-value-pos">Software com IA que roda</span>
        </div>
      </div>

      {/* Row: Realidade */}
      <div className="metodo-table-row">
        <div className="metodo-table-cell metodo-table-label">
          <span className="metodo-table-label-text">Realidade</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-value-neg">Foi projetado para operações padrão. A sua não é.</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-value-neg">Você ainda precisa implementar. O slide não roda sozinho.</span>
        </div>
        <div className="metodo-table-cell metodo-table-pos">
          <span className="metodo-table-value-pos">Na sua operação, do jeito que ela funciona. Construído, implementado e funcionando.</span>
        </div>
      </div>

      {/* Row: Resultado */}
      <div className="metodo-table-row metodo-table-footer">
        <div className="metodo-table-cell metodo-table-label">
          <span className="metodo-table-label-text">Resultado</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-verdict-neg">Você se adapta ao software</span>
        </div>
        <div className="metodo-table-cell metodo-table-neg">
          <span className="metodo-table-verdict-neg">Slide bonito, execução zero</span>
        </div>
        <div className="metodo-table-cell metodo-table-pos">
          <span className="metodo-table-verdict-pos">Sistema rodando em 30 dias</span>
        </div>
      </div>
    </div>
  );
}
