import { Reveal } from "@/components/Reveal";
import { ArrowUp, Clock, ShieldCheck, Lock } from "lucide-react";

export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="py-[90px] lg:py-[120px] relative overflow-hidden"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.62 0.17 125 / 0.35) 0%, transparent 65%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold"
              style={{
                borderColor: "oklch(0.4 0.03 122)",
                backgroundColor: "oklch(0.25 0.02 122 / 0.5)",
                color: "oklch(0.82 0.18 118)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "oklch(0.82 0.18 118)" }}
              />
              Último passo
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="h-mix mt-8 text-[40px] sm:text-[52px] lg:text-[64px] text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              30 minutos <em style={{ color: "oklch(0.82 0.18 118)" }}>separam</em>
              <br />
              IA do discurso e IA no fluxo.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-7 text-[17px] leading-[1.6] max-w-[580px] mx-auto"
              style={{ color: "oklch(0.78 0.02 110)" }}
            >
              Sem pitch. Sem deck. Você fala do seu contexto, a gente devolve se Business é pra você
              — ou indica o caminho.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href="#top"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-white text-accent font-semibold px-7 py-4 text-[15px] hover:bg-primary-glow transition-colors"
              style={{ color: "oklch(0.18 0.02 122)" }}
            >
              <ArrowUp className="h-4 w-4" />
              Voltar e agendar diagnóstico
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <ul
              className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px]"
              style={{ color: "oklch(0.68 0.02 110)" }}
            >
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" strokeWidth={1.75} />
                30 min · agenda em 1 dia útil
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
                NDA pré-assinado
              </li>
              <li className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4" strokeWidth={1.75} />6 vagas · trimestre
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
