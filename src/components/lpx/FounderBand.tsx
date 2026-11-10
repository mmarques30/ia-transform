import { Reveal } from "@/components/Reveal";
import { CountUp } from "./CountUp";

/**
 * Faixa clara com ondas e o bloco da fundadora (foto redonda com selo,
 * título, texto, números e passagens), no mesmo formato da dobra
 * Sobre/Time do site institucional. Usado na LP (Time) e na /lead.
 */

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`lpx-wave${flip ? " lpx-wave--flip" : ""}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M0,64 C180,120 360,10 620,40 C880,70 1040,118 1240,82 C1340,64 1400,40 1440,30 L1440,120 L0,120 Z" />
    </svg>
  );
}

export function LightBand({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="lpx-light">
      <Wave />
      <div className="lpx-light-body">
        <div className="lpx-wrap">{children}</div>
      </div>
      <Wave flip />
    </section>
  );
}

export interface FounderAboutProps {
  eyebrow: string;
  titleA: string;
  titleEm: string;
  lead: React.ReactNode;
  stats: Array<{ value: number; prefix?: string; label: string }>;
  xpLabel: string;
  xp: string[];
  photoAlt: string;
  /** Conteúdo extra no fim da coluna de texto (ex.: botão). */
  children?: React.ReactNode;
}

export function FounderAbout({
  eyebrow,
  titleA,
  titleEm,
  lead,
  stats,
  xpLabel,
  xp,
  photoAlt,
  children,
}: FounderAboutProps) {
  return (
    <div className="lpx-about-grid">
      <Reveal className="lpx-about-photo-wrap">
        <div className="lpx-about-photo">
          <img
            src="/brand/mariana-marques.jpg"
            alt={photoAlt}
            width={1086}
            height={1448}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="lpx-about-badge">
          <img src="/brand/logo-mark.svg" alt="" width={28} height={28} />
          <span>
            <b>Mariana Marques</b>
            <small>Founder & CEO</small>
          </span>
        </div>
      </Reveal>

      <div>
        <Reveal>
          <span className="lpx-eyebrow-line">{eyebrow}</span>
          <h2 className="lpx-h2 lpx-h2--ink mt-5">
            {titleA} <em>{titleEm}</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="lpx-about-lead">{lead}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="lpx-about-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <b>
                  {s.prefix}
                  <CountUp value={s.value} />
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="lpx-about-xp">
            <span className="lpx-mono">{xpLabel}</span>
            {xp.map((x) => (
              <span key={x} className="lpx-about-chip">
                {x}
              </span>
            ))}
          </div>
        </Reveal>
        {children && <Reveal delay={0.26}>{children}</Reveal>}
      </div>
    </div>
  );
}
