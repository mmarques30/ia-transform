import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { PainelClientesShowcase } from "@/components/sections/business/variantB/painel/PainelClientesShowcase";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const COPY_PT_BR = {
  eyebrow: "Como a gente faz",
  titleA: "Sua operação roda. Seu time entrega.",
  titleB: "Você acompanha tudo sem estar no meio de tudo.",
  /** Texto em volta de APLICA e de "90 dias" (que vão em negrito). */
  subA: "O Método ",
  subB: " identifica onde sua operação trava, constrói o sistema que resolve e implementa dentro do seu negócio em até ",
  days: "90 dias",
  subC: ".",
  cta: "quero meu sistema",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    eyebrow: "How we do it",
    titleA: "Your operations run. Your team delivers.",
    titleB: "You keep track of everything without being in the middle of everything.",
    subA: "The ",
    subB: " Method pinpoints where your operations get stuck, builds the system that fixes it, and implements it inside your business in up to ",
    days: "90 days",
    subC: ".",
    cta: "learn more",
  },
};

export function MetodoAplicaBook() {
  const c = useLpCopy(COPY);
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
              {c.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-5 font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              {c.titleA}{" "}
              <span style={{ color: "var(--color-primary)" }}>
                {c.titleB}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16.5px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              {c.subA}
              <strong className="text-foreground font-bold">APLICA</strong>
              {c.subB}
              <strong className="text-foreground font-bold">{c.days}</strong>
              {c.subC}
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
              {c.cta}
            </OriginButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

