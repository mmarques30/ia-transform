import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Systems (contábil) — em vez do grid de cards, uma composição moderna
 * de mockups (laptop + tablet) integrados/sobrepostos, mostrando o
 * sistema real do escritório rodando no desktop e no tablet.
 *
 * Imagens reais do sistema contábil (capturas enviadas pela cliente).
 */
const DESKTOP_IMG = "/clients/contabil-desktop.webp";
const TABLET_IMG = "/clients/contabil-tablet.webp";

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
        <div className="max-w-[680px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Sistema em ação
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              Não vendemos slides.
              <br />
              <em>Entregamos o sistema rodando na sua operação.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[520px] mx-auto">
              Painel construído com o nome da sua empresa, para o seu time, resolvendo os seus
              problemas específicos — não um software genérico que o time precisa aprender.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <DeviceShowcase />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero ver como ficaria no meu negócio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Composição laptop + tablet sobrepostos. O tablet "encosta" no laptop
 * (offset + z-index) pra dar profundidade, sem ficarem separados.
 */
function DeviceShowcase() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[980px]">
      {/* Glow lime atrás da composição */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.18) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* LAPTOP */}
      <div className="relative w-full lg:w-[82%] z-10">
        <div
          className="rounded-t-[14px] overflow-hidden border"
          style={{
            borderColor: "oklch(0.32 0.02 122)",
            backgroundColor: "oklch(0.16 0.018 122)",
            boxShadow: "0 40px 80px -30px oklch(0 0 0 / 0.7)",
          }}
        >
          {/* barra superior */}
          <div
            className="flex items-center gap-1.5 px-4 py-2.5 border-b"
            style={{ borderColor: "oklch(0.28 0.02 122)" }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.6 0.18 25)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.78 0.16 85)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.7 0.18 145)" }} />
          </div>
          <img
            src={DESKTOP_IMG}
            alt="Sistema do escritório no desktop"
            width={1800}
            height={1011}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
        </div>
        {/* base do laptop */}
        <div
          className="mx-auto h-3 rounded-b-[10px]"
          style={{
            width: "108%",
            marginLeft: "-4%",
            background: "linear-gradient(180deg, oklch(0.26 0.02 122), oklch(0.18 0.018 122))",
            boxShadow: "0 18px 30px -12px oklch(0 0 0 / 0.6)",
          }}
        />
      </div>

      {/* TABLET — sobreposto no canto inferior direito */}
      <div
        className="absolute z-20 w-[40%] sm:w-[34%] lg:w-[30%] right-0 -bottom-6 lg:-bottom-10"
      >
        <div
          className="rounded-[16px] overflow-hidden border p-1.5"
          style={{
            borderColor: "oklch(0.34 0.02 122)",
            backgroundColor: "oklch(0.14 0.018 122)",
            boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.75)",
          }}
        >
          <img
            src={TABLET_IMG}
            alt="Sistema do escritório no tablet"
            width={1800}
            height={872}
            loading="lazy"
            decoding="async"
            className="block w-full rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
}
