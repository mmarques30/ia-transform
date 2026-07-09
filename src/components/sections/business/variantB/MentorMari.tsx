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
          <Reveal className="h-full min-h-[380px] lg:min-h-[560px]">
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(80% 80% at 40% 45%, rgba(200,224,64,0.14), transparent 65%), linear-gradient(180deg, #0f1109 0%, #05060a 100%)",
              }}
            >
              {/*
               * Foto original (sem mask/blend) preenchendo toda a coluna.
               *
               * Feedback anterior sobre o cutout: "ficou péssimo, num nível
               * assim muito alto". Revertido — sem mixBlendMode, sem
               * maskImage, sem boost de brightness/contrast/saturate.
               *
               * objectPosition ajustada pra 55% — mostra a face + torso
               * bem mais próximos do topo do container, sem faixa vazia
               * de escuro acima da cabeça. Antes era 22% (mostrava demais
               * do fundo do enquadramento original da foto).
               *
               * Integração com a página vem SÓ dos overlays (bottom fade
               * + right bleed) — não mais de blend mode na imagem em si.
               */}
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: "center 55%",
                  filter: "brightness(0.95) contrast(1.05)",
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

              {/* Overlays de integração — 3 gradientes empilhados:
                    - top-fade: escurece o topo (onde a foto tem menos
                      informação útil) pra emenda com o QualifierStrip/
                      seção anterior
                    - bottom-fade: escurece a base (roupa/mesa) sem cortar
                      o rosto — dá peso e integra com Guarantee abaixo
                    - right-bleed: dissolve a borda direita no bg do painel
                      de texto (#0d0f08), sem borda dura visível */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,12,7,0.5) 0%, transparent 22%, transparent 70%, rgba(10,12,7,0.6) 100%), linear-gradient(90deg, transparent 65%, rgba(13,15,8,0.55) 88%, #0d0f08 100%)",
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
