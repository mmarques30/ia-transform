import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { FounderAbout, LightBand } from "@/components/lpx/FounderBand";
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

export function Team() {
  const c = useLpCopy(COPY);
  const en = useLpLocale() === "en";
  const xp = en ? XP_EN : XP;

  return (
    <LightBand id="time">
      <FounderAbout
        eyebrow={c.eyebrow}
        titleA={c.titleA}
        titleEm={c.titleEm}
        lead={c.lead}
        stats={c.stats}
        xpLabel={c.xpLabel}
        xp={xp}
        photoAlt={c.photoAlt}
      />

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
    </LightBand>
  );
}
