import { Reveal } from "@/components/Reveal";

const MOCKUPS = [
  { src: "/systems-v2/problema-01-whatsapp.html", label: "PROBLEMA 01 · Tudo passa por você" },
  { src: "/systems-v2/problema-02-planilha.html", label: "PROBLEMA 02 · A operação numa planilha" },
  { src: "/systems-v2/problema-03-email.html", label: "PROBLEMA 03 · O dia termina, o caos não" },
];

export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[72px] lg:py-[110px]">
        <div className="relative z-10 container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1060px] mx-auto">
            {MOCKUPS.map((m, i) => (
              <Reveal key={m.src} delay={0.05 + i * 0.1}>
                <div className="flex justify-center">
                  <iframe
                    src={m.src}
                    title={m.label}
                    loading="lazy"
                    className="rounded-[10px] border-0 pointer-events-none"
                    style={{
                      width: 320,
                      height: 430,
                      maxWidth: "100%",
                      boxShadow:
                        "0 28px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <div className="mt-10 lg:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {MOCKUPS.map((m, i) => (
                <span key={m.label}>
                  <em
                    className="text-[13px] lg:text-[14px] tracking-[0.02em]"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: '"Instrument Serif", serif',
                      fontWeight: 400,
                    }}
                  >
                    {m.label}
                  </em>
                  {i < MOCKUPS.length - 1 && (
                    <span
                      className="hidden sm:inline mx-3"
                      style={{ color: "rgba(255,255,255,0.15)" }}
                    >
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 lg:mt-16 max-w-[720px] mx-auto text-center">
              <p className="text-[18px] lg:text-[22px] leading-[1.35] text-foreground">
                Esse não é um problema de{" "}
                <strong className="font-extrabold text-foreground">time.</strong> É um problema de{" "}
                <strong style={{ color: "var(--color-primary)" }} className="font-extrabold">
                  sistema.
                </strong>
              </p>
              <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6]">
                ERP não resolve: foi feito pra padronizar, não pra pensar. Consultoria não resolve:
                entrega slide e vai embora. O que você precisa é de software com IA construído dentro
                da sua operação — que automatiza, que aprende e que fica.
              </p>
              <p
                className="mt-4 text-[16px] lg:text-[18px] font-bold leading-[1.4]"
                style={{ color: "var(--color-primary)" }}
              >
                É isso que a IAplicada constrói.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
