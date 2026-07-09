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
  { bold: "Mariana Marques", rest: " · Fundadora da IAplicada" },
  { bold: "+5 anos", rest: " mapeando e construindo operações" },
  { bold: "+40 sistemas", rest: " implementados dentro de empresas de verdade" },
  { bold: "Referência em automação operacional", rest: " para PMEs" },
];

export function MentorMari() {
  return (
    <section id="mentora" className="relative">
      <div className="section-veil">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-stretch">
          <Reveal className="h-full min-h-[420px] lg:min-h-[620px]">
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(70% 65% at 45% 55%, rgba(200,224,64,0.14), transparent 65%), linear-gradient(180deg, #0f1109 0%, #05060a 100%)",
              }}
            >
              {/* Halo lime blur ATRÁS da foto — cria o "spot" verde que a foto
                  parece emergir. Sem esse spot, a foto seria uma bolha isolada
                  no dark. */}
              <span
                aria-hidden
                className="pointer-events-none absolute z-0"
                style={{
                  left: "50%",
                  top: "45%",
                  width: "80%",
                  height: "70%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(ellipse at center, rgba(120,150,60,0.22), transparent 65%)",
                  filter: "blur(50px)",
                }}
              />

              {/*
               * Foto com "fake cutout" via CSS:
               *
               *   1. `maskImage` radial elíptico — o CENTRO (rosto + torso)
               *      fica 100% opaco; as bordas (topo, laterais, baixo)
               *      desvanecem gradualmente pra transparente. Isso apaga
               *      o retângulo duro da foto — nenhuma linha de borda visível.
               *
               *   2. `mixBlendMode: lighten` — o fundo olive da foto
               *      original tem tom escuro parecido com o bg da seção
               *      (#0f1109/#05060a). Com lighten, os pixels da foto SÓ
               *      aparecem onde são MAIS CLAROS que o bg — ou seja, o
               *      olive escuro do fundo original some, e apenas a Mari
               *      (rosto + roupa + cabelo, todos mais claros) fica visível.
               *
               *   3. `filter: brightness/contrast` compensam a perda de
               *      saturação do mixBlendMode.
               *
               * Efeito combinado: a Mari "emerge" do fundo dark sem contorno
               * de foto retangular. Não é tão limpo quanto um PNG cutout
               * profissional, mas resolve sem asset novo.
               */}
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{
                  objectPosition: "center 22%",
                  mixBlendMode: "lighten",
                  filter: "brightness(1.05) contrast(1.15) saturate(1.05)",
                  maskImage:
                    "radial-gradient(ellipse 55% 78% at 50% 42%, black 30%, rgba(0,0,0,0.85) 55%, transparent 92%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 55% 78% at 50% 42%, black 30%, rgba(0,0,0,0.85) 55%, transparent 92%)",
                }}
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

              {/* Bleed suave à direita — dissolve qualquer borda residual
                  da foto no bg do painel de texto (#0d0f08). Bem mais leve
                  que antes, só o suficiente pra emenda ficar imperceptível. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 70%, rgba(13,15,8,0.4) 90%, #0d0f08 100%)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative flex flex-col justify-center px-8 py-14 lg:px-16 lg:py-20"
              style={{ background: "#0d0f08" }}
            >
              {/* Marcador vertical lime no fim esquerdo do painel — cria
                  elo visual com a foto ao lado (a foto termina, este stripe
                  começa, mesma cor primária). */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
                style={{
                  width: 3,
                  height: 60,
                  background:
                    "linear-gradient(180deg, transparent, var(--color-primary), transparent)",
                  boxShadow: "0 0 12px rgba(200,224,64,0.4)",
                }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-bold"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Quem constrói o sistema
              </span>
              <h2 className="mt-4 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.02em] text-foreground">
                Quem constrói o sistema{" "}
                <span style={{ color: "var(--color-primary)" }}>dentro da sua empresa.</span>
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

              <p className="mt-7 text-[14.5px] lg:text-[15px] text-sage leading-[1.6] max-w-[520px]">
                <strong className="text-foreground font-bold">
                  Não mandamos estagiário. Não entregamos metodologia em PDF.
                </strong>{" "}
                Cada empresa passa por diagnóstico comigo — e o sistema é construído sob medida para
                o jeito que o seu negócio funciona.
              </p>

              <div className="mt-8">
                <CtaGlow size="lg">Agendar diagnóstico com a Mari →</CtaGlow>
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
