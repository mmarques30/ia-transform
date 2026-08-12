import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { useDiagnosticoModal } from "@/components/sections/business/variantB/DiagnosticoModal";

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
            "radial-gradient(60% 60% at 50% 50%, rgba(200,224,64,0.06), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="max-w-[720px] mx-auto text-center">
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
              Nossa garantia
            </span>
          </Reveal>

          <Reveal delay={0.05}>
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
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.65] max-w-[560px] mx-auto">
              O diagnóstico é bancado pela{" "}
              <strong className="text-foreground font-bold">IAplicada</strong>. Se você não fechar,
              ainda leva o mapa de processos, o ranking de gargalos e o playbook do trimestre.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="mt-10 lg:mt-14 rounded-[20px] px-8 py-8 lg:px-10 lg:py-10 text-left"
              style={{
                background: "linear-gradient(160deg, rgba(200,224,64,0.08) 0%, rgba(200,224,64,0.02) 100%)",
                border: "1.5px solid rgba(200,224,64,0.3)",
                boxShadow: "0 0 40px -15px rgba(200,224,64,0.15)",
              }}
            >
              <h3
                className="text-[20px] lg:text-[24px] font-extrabold leading-[1.15] tracking-[-0.015em]"
                style={{ color: "var(--color-primary)" }}
              >
                E se você avançar para a implementação:
              </h3>
              <p className="mt-4 text-[15px] lg:text-[16px] text-sage leading-[1.65]">
                Se você seguir o processo que acordamos — fizer os testes dentro do prazo,
                implementar do jeito que combinamos — e o sistema não funcionar,{" "}
                <strong className="text-foreground font-bold">devolvemos o investimento</strong>.
                Sem letra miúda.
              </p>
              <p
                className="mt-4 text-[13px] lg:text-[13.5px] leading-[1.55]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                O condicionante existe porque o resultado depende dos dois lados. Quem cumpre o
                processo não pede devolução. Nunca aconteceu.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <GuaranteeCta />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuaranteeCta() {
  const modal = useDiagnosticoModal();
  return (
    <div className="mt-10 text-center">
      <OriginButton onClick={modal?.openModal}>
        quero meu diagnóstico
      </OriginButton>
    </div>
  );
}
