import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/lpx/CountUp";
import { CtaButton } from "@/components/lpx/CtaButton";
import { useLpCopy, useLpLocale, type LpCopy } from "@/lib/lpLocale";

/**
 * "Quem constrói": mesma estrutura da dobra Sobre/Time do site
 * institucional (/site). Faixa clara com ondas, a fundadora em destaque
 * (foto redonda, selo, números e passagens) e o time em retratos com nome
 * e cargo; a bio aparece no hover (no celular fica sempre visível).
 */

interface Member {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

interface TeamCopy {
  eyebrow: string;
  titleA: string;
  titleEm: string;
  lead: string;
  stats: Array<{ value: number; prefix?: string; label: string }>;
  xpLabel: string;
  teamLabel: string;
  teamTitle: string;
  team: Member[];
  more: string;
  photoAlt: string;
  cta: string;
}

const PHOTOS = {
  ana: "/brand/ana-cecilia.png",
  matheus: "/brand/matheus.png",
  olivia: "/brand/maria-olivia.webp",
  eduarda: "/brand/maria-eduarda.png",
};

const PT: TeamCopy = {
  eyebrow: "Quem lidera",
  titleA: "Aprendi em ambientes onde",
  titleEm: "caos não é opção.",
  lead: "Antes da IAplicada, foram 11 anos como executiva em Mercado Livre, Suzano e AngloGold, liderando transformação digital na América Latina. Trouxe para cá o padrão de operação que não pode parar, adaptado para o tamanho e o processo de quem está crescendo. Criei o Método APLICA e lidero cada projeto.",
  stats: [
    { value: 11, label: "anos como executiva" },
    { value: 50, prefix: "+", label: "empresas atendidas" },
    { value: 90, label: "dias até o sistema completo" },
  ],
  xpLabel: "Passagens",
  teamLabel: "Seu novo time",
  teamTitle: "Quem já construiu operações e entrega sistema rodando de verdade.",
  team: [
    {
      name: "Ana Cecilia",
      role: "Account Executive",
      photo: PHOTOS.ana,
      bio: "10 anos em comercial B2B e B2C. Passou por Inter&Co, allu e Localiza&Co.",
    },
    {
      name: "Matheus Farah",
      role: "Tech Lead",
      photo: PHOTOS.matheus,
      bio: "Lidera a engenharia: arquitetura, integrações via API, automações com n8n e IA com Claude.",
    },
    {
      name: "Maria Olívia",
      role: "Developer",
      photo: PHOTOS.olivia,
      bio: "Desenvolve as telas e integrações que colocam cada sistema em produção.",
    },
    {
      name: "Maria Eduarda",
      role: "Sales & Marketing Support",
      photo: PHOTOS.eduarda,
      bio: "Mantém a operação comercial e de marketing rodando nos bastidores.",
    },
  ],
  more: "Entre outros especialistas em dados, automação e produto que entram em cada projeto.",
  photoAlt: "Mariana Marques, fundadora e CEO da IAplicada",
  cta: "Quero meu diagnóstico",
};

const COPY: LpCopy<TeamCopy> = {
  "pt-br": PT,
  en: {
    eyebrow: "Who leads",
    titleA: "I learned in environments where",
    titleEm: "chaos is not an option.",
    lead: "Before IAplicada, I spent 11 years as an executive at Mercado Libre, Suzano and AngloGold, leading digital transformation across Latin America. I brought that standard of operations that can't stop, adapted to the size and processes of companies that are growing. I created the APLICA Method and I lead every project.",
    stats: [
      { value: 11, label: "years as an executive" },
      { value: 50, prefix: "+", label: "companies served" },
      { value: 90, label: "days to the full system" },
    ],
    xpLabel: "Former roles",
    teamLabel: "Your new team",
    teamTitle: "People who have built operations and ship systems that actually run.",
    team: [
      {
        name: "Ana Cecilia",
        role: "Account Executive",
        photo: PHOTOS.ana,
        bio: "10 years in B2B and B2C sales. Worked at Inter&Co, allu and Localiza&Co.",
      },
      {
        name: "Matheus Farah",
        role: "Tech Lead",
        photo: PHOTOS.matheus,
        bio: "Leads engineering: architecture, API integrations, n8n automations and AI with Claude.",
      },
      {
        name: "Maria Olívia",
        role: "Developer",
        photo: PHOTOS.olivia,
        bio: "Builds the screens and integrations that put each system into production.",
      },
      {
        name: "Maria Eduarda",
        role: "Sales & Marketing Support",
        photo: PHOTOS.eduarda,
        bio: "Keeps sales and marketing operations running behind the scenes.",
      },
    ],
    more: "Plus other specialists in data, automation and product who join each project.",
    photoAlt: "Mariana Marques, founder and CEO of IAplicada",
    cta: "Request my diagnostic",
  },
};

const XP = ["Mercado Livre", "Suzano", "AngloGold"];
const XP_EN = ["Mercado Libre", "Suzano", "AngloGold"];

/** Foto do membro; se o arquivo não carregar, mostra as iniciais. */
function MemberPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");
    return <span className="lpx-member-initials">{initials}</span>;
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

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

export function Team() {
  const c = useLpCopy(COPY);
  const en = useLpLocale() === "en";
  const xp = en ? XP_EN : XP;

  return (
    <section id="time" className="lpx-light">
      <Wave />
      <div className="lpx-light-body">
        <div className="lpx-wrap">
          <div className="lpx-about-grid">
            <Reveal className="lpx-about-photo-wrap">
              <div className="lpx-about-photo">
                <img
                  src="/brand/mariana-marques.jpg"
                  alt={c.photoAlt}
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
                <span className="lpx-eyebrow-line">{c.eyebrow}</span>
                <h2 className="lpx-h2 lpx-h2--ink mt-5">
                  {c.titleA} <em>{c.titleEm}</em>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="lpx-about-lead">{c.lead}</p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="lpx-about-stats">
                  {c.stats.map((s) => (
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
                  <span className="lpx-mono">{c.xpLabel}</span>
                  {xp.map((x) => (
                    <span key={x} className="lpx-about-chip">
                      {x}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lpx-team">
            <Reveal className="max-w-[640px]">
              <span className="lpx-eyebrow-line">{c.teamLabel}</span>
              <h3 className="lpx-team-title">{c.teamTitle}</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="lpx-team-grid">
                {c.team.map((m) => (
                  <article key={m.name} className="lpx-member">
                    <div className="lpx-member-photo">
                      <MemberPhoto src={m.photo} name={m.name} />
                    </div>
                    <div className="lpx-member-info">
                      <b>{m.name}</b>
                      <small>{m.role}</small>
                      <p>{m.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="lpx-team-foot">
                <p className="lpx-team-more">
                  <span className="lpx-team-more-dots" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  {c.more}
                </p>
                <CtaButton>{c.cta}</CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <Wave flip />
    </section>
  );
}
