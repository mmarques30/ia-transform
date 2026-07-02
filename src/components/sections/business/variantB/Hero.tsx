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
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16 items-center">
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

              <h1 className="h-mix mt-6 lg:mt-7 text-[32px] sm:text-[44px] lg:text-[58px] leading-[1.05] text-foreground">
                Seu negócio cresceu. A operação <em>não acompanhou.</em>
              </h1>

              <Reveal delay={0.1}>
                <p className="mt-5 lg:mt-7 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[540px]">
                  Cada cliente novo é mais trabalho manual, não mais margem.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p
                  className="mt-6 lg:mt-7 text-[14px]"
                  style={{ color: "var(--color-muted-foreground)", opacity: 0.7 }}
                >
                  +40 empresas já operam com a IAplicada.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div id="diagnostico-form" className="mt-6 lg:mt-0 lg:sticky lg:top-24 scroll-mt-24">
                <HeroForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
