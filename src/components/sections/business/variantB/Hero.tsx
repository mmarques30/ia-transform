import { Reveal } from "@/components/Reveal";
import { HeroForm } from "@/components/HeroForm";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pb-[80px] lg:pb-[120px] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 0%, oklch(0.22 0.03 122 / 0.5) 0%, transparent 75%)",
      }}
    >
      <div className="relative pt-[48px] lg:pt-[72px]">
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "8%",
            right: "-5%",
            width: "55%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.28) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "20%",
            left: "-10%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse at center, oklch(0.35 0.05 125 / 0.5) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <div className="container-page relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-24 items-center">
            <div>
              <Reveal>
                <img
                  src="/brand/iaplicada-logo-dark.png"
                  alt="IAplicada"
                  height={28}
                  className="block"
                  style={{ height: 28, width: "auto" }}
                />
              </Reveal>

              <h1 className="h-mix mt-6 lg:mt-7 text-[34px] sm:text-[48px] lg:text-[62px] leading-[1.05] text-foreground">
                Seu negócio cresceu.
                <br />
                A operação <em>não acompanhou.</em>
              </h1>

              <Reveal delay={0.1}>
                <p className="mt-5 lg:mt-7 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[540px]">
                  Sem refém da planilha. Você acompanha, seu time opera.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-6 lg:mt-7 inline-flex items-center">
                  <span
                    aria-hidden
                    style={{ color: "#afc040", marginRight: 6 }}
                  >
                    ●
                  </span>
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    +40 empresas já operam com a IAplicada.
                  </span>
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div id="diagnostico-form" className="mt-6 lg:mt-0 lg:sticky lg:top-24 scroll-mt-24">
                <HeroForm formSlug="business-b" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
