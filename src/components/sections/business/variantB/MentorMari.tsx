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
  { bold: "+5 anos", rest: " mapeando operações e liderando implementações" },
  { bold: "+40 sistemas", rest: " implementados pelo time IAplicada" },
  { bold: "Referência em automação operacional", rest: " para PMEs" },
];

export function MentorMari() {
  return (
    <section id="mentora" className="relative">
      <div className="section-veil">
        <div className="grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] items-stretch">
          {/* Coluna da imagem — 42% da largura. Feedback anterior era
              que a foto dominava (rosto muito grande em primeiro plano).
              Reequilibrada: menor coluna + object-position "center 30%"
              pra mostrar mais busto/ombros + degradê forte na borda
              direita pra integrar com o painel de texto. Altura máxima
              desktop 640px (era 720+ antes). Mobile mantém 380px. */}
          <Reveal className="h-full min-h-[380px] lg:min-h-[560px] lg:max-h-[640px]">
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(80% 80% at 40% 45%, rgba(200,224,64,0.14), transparent 65%), linear-gradient(180deg, #0f1109 0%, #05060a 100%)",
              }}
            >
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  // "center 30%" mostra rosto + busto + ombros (menos
                  // close no rosto). Antes era 55%, que centralizava só
                  // no rosto.
                  objectPosition: "center 30%",
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

              {/* Overlays de integração — 4 gradientes empilhados:
                    - top-fade: escurece topo pra emendar com seção anterior
                    - bottom-fade: escurece a base sem cortar o rosto
                    - right-bleed FORTE (era transparent 65% agora 40%):
                      dissolve a borda direita direto no #0d0f08 do painel
                      de texto, com transição bem mais suave e mais larga.
                    - haze radial no centro pra sutil dramaticidade */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,12,7,0.55) 0%, transparent 20%, transparent 72%, rgba(10,12,7,0.65) 100%), linear-gradient(90deg, transparent 40%, rgba(13,15,8,0.35) 70%, rgba(13,15,8,0.75) 88%, #0d0f08 100%)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative flex flex-col justify-center px-8 py-14 lg:pl-20 lg:pr-16 lg:py-20"
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
                Quem lidera a IAplicada
              </span>
              <h2 className="mt-4 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.02em] text-foreground">
                Diagnóstico é comigo.
                <br />
                Implementação é do <span style={{ color: "var(--color-primary)" }}>time.</span>
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
                Cada empresa passa por diagnóstico comigo. Depois, o time IAplicada constrói o
                sistema sob medida para o jeito que o seu negócio funciona.
              </p>

              <div className="mt-8">
                <CtaGlow size="lg">Agendar diagnóstico com a IAplicada →</CtaGlow>
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
