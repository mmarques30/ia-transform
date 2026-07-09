import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * MentorMari (LP-B) — seção "SEU MENTOR" no formato Acelerador.
 *
 * Grid 2-col: foto full-bleed à esquerda (chiaroscuro), credenciais
 * bulletadas à direita + CTA glow no rodapé da coluna direita.
 *
 * Usa FOUNDER.photoSrc do config/brand.ts (com fallback pra
 * final_composite.webp em caso de erro no load).
 */

interface Cred {
  bold: string;
  rest: string;
}

const CREDENCIAIS: Cred[] = [
  { bold: "Passagem enterprise", rest: " · Mercado Livre, Suzano e AngloGold antes da IAplicada" },
  { bold: "+100 empresas", rest: " com sistema IAplicada rodando" },
  { bold: "750+ colaboradores", rest: " usando os sistemas construídos por ela" },
  { bold: "150+ processos", rest: " automatizados em operações reais" },
  { bold: "De arquitetura a turismo:", rest: " IA na operação real, não em slide" },
  { bold: "MBA + engenharia de produção", rest: " · não é entusiasta, é operadora" },
];

export function MentorMari() {
  return (
    <section id="mentora" className="relative">
      <div className="section-veil">
        <div className="grid lg:grid-cols-2 min-h-[560px] lg:min-h-[720px]">
          <Reveal>
            <div
              className="relative flex items-end justify-center overflow-hidden"
              style={{
                minHeight: 420,
                background:
                  "radial-gradient(100% 100% at 30% 30%, rgba(200,224,64,0.16), transparent 60%), linear-gradient(180deg, #0f1109 0%, #05060a 100%)",
              }}
            >
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                width={640}
                height={880}
                loading="lazy"
                decoding="async"
                className="relative z-10 object-cover object-top w-full h-full"
                style={{ filter: "brightness(0.94) contrast(1.05)" }}
                onError={(e) => {
                  const img = e.currentTarget;
                  if (
                    FOUNDER.photoFallback &&
                    img.src.includes(FOUNDER.photoSrc.split("/").pop()!)
                  ) {
                    img.src = FOUNDER.photoFallback;
                  }
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,12,7,0.5) 100%), linear-gradient(90deg, transparent 60%, rgba(10,12,7,0.35) 100%)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="flex flex-col justify-center px-8 py-14 lg:px-16 lg:py-20"
              style={{ background: "#0d0f08" }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-bold"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Sua mentora · quem entrega
              </span>
              <h2 className="mt-4 font-extrabold text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.05] tracking-[-0.02em] text-foreground">
                Mariana <span style={{ color: "var(--color-primary)" }}>Marques</span>
              </h2>

              <ul className="mt-7 flex flex-col gap-3.5">
                {CREDENCIAIS.map((c) => (
                  <MentorItem key={c.bold}>
                    <strong style={{ color: "var(--color-primary)", fontWeight: 800 }}>
                      {c.bold}
                    </strong>
                    {c.rest}
                  </MentorItem>
                ))}
              </ul>

              <div className="mt-9">
                <CtaGlow size="lg">Quero o diagnóstico com a Mari</CtaGlow>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MentorItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="grid items-baseline gap-3 text-[14.5px] lg:text-[15px] leading-[1.5] text-foreground"
      style={{ gridTemplateColumns: "20px 1fr" }}
    >
      <span
        aria-hidden
        className="inline-block h-2.5 w-2.5 rounded-full mt-2"
        style={{ border: "1.5px solid var(--color-primary)" }}
      />
      <span>{children}</span>
    </li>
  );
}
