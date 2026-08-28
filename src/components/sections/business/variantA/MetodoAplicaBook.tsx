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
        <div className="max-w-[820px] mx-auto text-center">
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
              className="mt-5 font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Sua operação roda. Seu time entrega.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Você acompanha tudo sem estar no meio de tudo.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16.5px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              O Método <strong className="text-foreground font-bold">APLICA</strong> identifica onde
              sua operação trava, constrói o sistema que resolve e implementa dentro do seu negócio
              em até <strong className="text-foreground font-bold">90 dias</strong>.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 max-w-[720px] mx-auto">
            <PainelClientesShowcase />
          </div>
        </Reveal>

        <Reveal delay={0.18}>
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

