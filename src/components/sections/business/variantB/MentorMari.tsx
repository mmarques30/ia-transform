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
                  "radial-gradient(100% 100% at 30% 30%, rgba(200,224,64,0.16), transparent 60%), linear-gradient(180deg, #0f1109 0%, #05060a 100%)",
              }}
            >
              {/* Foto absoluta preenchendo TODO o container — sem
                  flex items-end (que empurrava a foto pra baixo e deixava
                  vazio em cima) e sem width/height fixos. object-cover
                  object-center recorta e centraliza a face no eixo Y. */}
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: "center 30%",
                  filter: "brightness(0.92) contrast(1.06)",
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
              {/* Gradiente forte à direita — foto bleed pro fundo do painel de
                  texto (#0d0f08), sem borda dura entre as duas colunas. Em
                  baixo, fade suave pra dar peso. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 55%, rgba(13,15,8,0.5) 85%, #0d0f08 100%), linear-gradient(180deg, transparent 65%, rgba(10,12,7,0.4) 100%)",
                }}
              />
              {/* Halo lime sutil vindo do painel de texto pra "entrar" na foto
                  — cria o elo visual pedido: mesma paleta em ambos lados. */}
              <div
                aria-hidden
                className="pointer-events-none absolute z-30 hidden lg:block"
                style={{
                  right: "-8%",
                  top: "35%",
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at center, rgba(200,224,64,0.22), transparent 70%)",
                  filter: "blur(30px)",
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
