import { Reveal } from "@/components/Reveal";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/config/brand";

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-[90px] lg:py-[120px] bg-background" aria-label="Depoimentos">
      <div className="container-page">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Quem já passou por isso
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              O que <em>líderes</em> dizem depois.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author + i} delay={i * 0.06}>
              <figure
                className="card-soft p-7 lg:p-8 h-full flex flex-col"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <Quote
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                  strokeWidth={1.75}
                />
                <blockquote className="mt-5 text-foreground text-[17px] leading-[1.5]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  {t.photoSrc ? (
                    <img
                      src={t.photoSrc}
                      alt={t.author}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="h-10 w-10 rounded-full flex items-center justify-center text-[14px] font-semibold"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-muted-foreground)",
                      }}
                    >
                      {t.author
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                  <div>
                    <p className="text-[14px] font-semibold text-foreground">{t.author}</p>
                    <p className="text-[12px] text-muted-foreground leading-tight">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
