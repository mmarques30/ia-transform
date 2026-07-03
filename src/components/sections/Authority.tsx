import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";
import { LogoMark } from "@/components/Logo";

/**
 * Sobre a IAplicada — versão single-spread densa.
 *
 * Reformulada após review: cortei as 3 bandas que ampliavam demais a
 * seção. Agora é UM spread compacto, estratégico, com tudo conectado:
 * foto Mari à esquerda + bloco editorial à direita contendo logo,
 * manifesto, passagens enterprise, stats agregados e métricas dos cases
 * tudo inline. Sem espaço vazio, sem expansão desnecessária.
 *
 * Compartilhada por /, /contabil e /contabil02.
 */

const ENTERPRISE = ["Mercado Livre", "Suzano", "AngloGold Ashanti"];

export function Authority() {
  return (
    <section
      id="time"
      className="section-veil py-[64px] lg:py-[130px] relative overflow-hidden"
    >
      <div className="container-page relative max-w-[1180px]">
        {/* MOBILE — bloco central único, sem divisores agressivos, tudo
            integrado (foto + nome + quote + bio + stats). */}
        <div className="lg:hidden text-center max-w-[420px] mx-auto">
          <Reveal>
            <div
              className="relative aspect-[4/5] w-full max-w-[240px] mx-auto rounded-2xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.55 0.06 122 / 0.5)",
                boxShadow:
                  "0 30px 60px -25px oklch(0 0 0 / 0.7), 0 0 60px -25px oklch(0.75 0.20 122 / 0.35)",
              }}
            >
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                width={420}
                height={525}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes(FOUNDER.photoSrc.split("/").pop()!)) {
                    img.src = FOUNDER.photoFallback;
                  }
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-5 text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
              <span className="text-foreground">{FOUNDER.name}</span> · Fundadora · IAplicada
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-6 text-[24px] leading-[1.15] tracking-[-0.015em] text-foreground"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              <span
                aria-hidden
                className="opacity-50 mr-1 align-top text-[28px]"
                style={{ color: "var(--color-primary)" }}
              >
                &ldquo;
              </span>
              <em>{FOUNDER.manifesto}</em>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-[14px] text-sage leading-[1.55]">
              Antes da IAplicada, passei por Mercado Livre, Suzano e AngloGold. Hoje implementamos
              IA na operação de +100 empresas.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-6">
              <MobileStat value="11" label="Sistemas" />
              <span
                aria-hidden
                className="h-8 w-px opacity-30"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <MobileStat value="110+" label="Usuários" />
              <span
                aria-hidden
                className="h-8 w-px opacity-30"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <MobileStat value="150+" label="Processos" />
            </div>
          </Reveal>
        </div>

        {/* DESKTOP — layout editorial de 2 colunas, denso, com eyebrow,
            logo IAplicada, bio completa e chips enterprise. */}
        <div className="hidden lg:grid grid-cols-[5fr_7fr] gap-16 items-start">
          <Reveal>
            <div className="relative">
              <div
                className="relative aspect-[3/4] w-full max-w-[420px] rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.55 0.06 122 / 0.5)",
                  boxShadow:
                    "0 36px 80px -30px oklch(0 0 0 / 0.7), 0 0 80px -30px oklch(0.75 0.20 122 / 0.35)",
                }}
              >
                <img
                  src={FOUNDER.photoSrc}
                  alt={FOUNDER.name}
                  width={420}
                  height={560}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes(FOUNDER.photoSrc.split("/").pop()!)) {
                      img.src = FOUNDER.photoFallback;
                    }
                  }}
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-[1px] w-8"
                  style={{
                    background: "linear-gradient(90deg, var(--color-primary), transparent)",
                  }}
                />
                <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  <span className="text-foreground">{FOUNDER.name}</span> · Fundadora · IAplicada
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="pt-2">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-border">
                <p
                  className="text-[11px] uppercase tracking-[0.22em] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Quem entrega · Sobre a IAplicada
                </p>
                <span className="inline-flex items-center gap-2 opacity-80">
                  <LogoMark size={20} />
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-foreground">
                    IAplicada
                  </span>
                </span>
              </div>

              <p
                className="mt-9 text-[40px] lg:text-[52px] leading-[1.02] tracking-[-0.025em] text-foreground"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                <span
                  aria-hidden
                  className="opacity-50 mr-1.5 align-top text-[52px] lg:text-[66px]"
                  style={{ color: "var(--color-primary)" }}
                >
                  &ldquo;
                </span>
                <em>{FOUNDER.manifesto}</em>
              </p>

              <p className="mt-6 text-[16.5px] text-sage leading-[1.6]">{FOUNDER.bio}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1">
                {ENTERPRISE.map((name, i) => (
                  <span key={name} className="inline-flex items-center gap-3">
                    <span
                      className="text-[13px] font-bold tracking-tight text-foreground"
                      style={{ letterSpacing: "0.01em" }}
                    >
                      {name}
                    </span>
                    {i < ENTERPRISE.length - 1 && (
                      <span
                        aria-hidden
                        className="opacity-30 text-[12px]"
                        style={{ color: "var(--color-primary)" }}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <div className="mt-9 pt-6 border-t border-border">
                <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  Operação rodando
                </p>
                <div className="mt-4 grid grid-cols-3 gap-6">
                  <InlineStat value="11" label="Sistemas" />
                  <InlineStat value="110+" label="Usuários" />
                  <InlineStat value="150+" label="Processos" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MobileStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <p
        className="num-display text-[28px] leading-none"
        style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[9.5px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function InlineStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-start">
      <p
        className="num-display text-[28px] sm:text-[34px] lg:text-[42px] leading-none"
        style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      <p className="mt-2 text-[10px] lg:text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
