import { Linkedin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/lpx/CtaButton";
import { SectionHead } from "@/components/lpx/SectionHead";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  photoPosition?: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Mariana Marques",
    role: "Founder & CEO",
    photo: "/brand/mariana-marques.jpg",
    photoPosition: "center 40%",
    bio: "11 anos como executiva em Mercado Livre, Suzano e AngloGold, liderando transformação digital na América Latina. Fundou a IAplicada para entregar o que viu funcionar em empresas grandes e agora adaptando para o tamanho e o processo de quem está crescendo. Criou a metodologia APLICA e lidera cada projeto, trazendo sua visão sistêmica e expertise em IA pra transformar novas operações.",
  },
  {
    name: "Ana Cecilia",
    role: "Account Executive",
    photo: "/brand/ana-cecilia.png",
    bio: "10 anos em comercial B2B e B2C nas maiores instituições financeiras do país. Passou por Inter&Co, allu e Localiza&Co, conduzindo todo o ciclo de vendas: prospecção, negociação e pós-venda. Na IAplicada, cuida do relacionamento com clientes e do processo comercial do primeiro contato ao fechamento.",
  },
  {
    name: "Matheus Farah",
    role: "Software Developer",
    photo: "/brand/matheus.png",
    bio: "Especialista em construir sistemas que rodam sozinhos. Trabalha com desenvolvimento backend, automação de fluxos com n8n, integrações via API e IA com Claude e Anthropic. Na IAplicada, transforma o processo mapeado em sistema em produção: Lovable no front, Supabase no banco, automações que eliminam o trabalho repetitivo.",
  },
  {
    name: "Maria Eduarda",
    role: "Sales & Marketing Support",
    photo: "/brand/maria-eduarda.png",
    bio: "Responsável por manter a operação comercial e de marketing da IAplicada funcionando nos bastidores: gestão de conteúdo, suporte ao processo de vendas e organização das frentes que conectam o time ao cliente. É quem garante que nada caia entre as cadeiras.",
  },
];

const COPY_PT_BR = {
  eyebrow: "Quem constrói",
  titleA: "Seu novo",
  titleB: "time.",
  sub: "Você será acompanhado por quem já construiu operações, liderou transformações e entrega sistema rodando de verdade.",
  team: TEAM,
  founderTag: "Fundadora",
  cta: "Quero meu diagnóstico",
};

/** Bios na mesma ordem do TEAM (nome, cargo e foto não mudam). */
function withBios(bios: string[]): TeamMember[] {
  return TEAM.map((member, i) => ({ ...member, bio: bios[i] }));
}

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  // "do país" lido por quem está nos EUA ficaria ambíguo.
  "pt-us": {
    ...COPY_PT_BR,
    team: withBios(
      TEAM.map((m) =>
        m.bio.replace(
          "nas maiores instituições financeiras do país",
          "nas maiores instituições financeiras do Brasil",
        ),
      ),
    ),
  },
  en: {
    eyebrow: "Who builds it",
    titleA: "Your new",
    titleB: "team.",
    sub: "You'll work alongside people who have built operations, led transformations and deliver systems that actually run.",
    team: withBios([
      "11 years as an executive at Mercado Libre, Suzano and AngloGold, leading digital transformation across Latin America. She founded IAplicada to deliver what she saw work at large companies, now adapted to the size and processes of companies that are growing. She created the APLICA methodology and leads every project, bringing her systems thinking and AI expertise to transform new operations.",
      "10 years in B2B and B2C sales at some of Brazil's largest financial institutions. She worked at Inter&Co, allu and Localiza&Co, running the full sales cycle: prospecting, negotiation and post-sale. At IAplicada, she manages client relationships and the sales process from first contact to close.",
      "Specialist in building systems that run on their own. He works with backend development, workflow automation with n8n, API integrations and AI with Claude and Anthropic. At IAplicada, he turns the mapped process into a system in production: Lovable on the front end, Supabase for the database, automations that eliminate repetitive work.",
      "Keeps IAplicada's sales and marketing operations running behind the scenes: content management, sales process support and organizing the fronts that connect the team to the client. She's the one who makes sure nothing falls through the cracks.",
    ]),
    founderTag: "Founder",
    cta: "Request my diagnostic",
  },
};

const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/marianamarquescabral/";

/**
 * Time: a fundadora em destaque (card largo, foto + bio) e o restante do
 * time em cards de vidro com foto, cargo e bio.
 */
export function Team() {
  const c = useLpCopy(COPY);
  const [founder, ...rest] = c.team;

  return (
    <section id="time" className="lpx-section relative">
      <div className="lpx-grid" aria-hidden />
      <div className="lpx-wrap relative">
        <SectionHead
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleA} <em>{c.titleB}</em>
            </>
          }
          sub={c.sub}
        />

        <Reveal delay={0.1}>
          <article className="lpx-card lpx-spot lpx-founder-card mt-12 lg:mt-16">
            <div className="lpx-founder-card-photo">
              <img
                src={founder.photo}
                alt={founder.name}
                loading="lazy"
                decoding="async"
                style={
                  founder.photoPosition ? { objectPosition: founder.photoPosition } : undefined
                }
              />
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-12">
              <span className="lpx-eyebrow self-start">{c.founderTag}</span>
              <h3 className="mt-5 text-[30px] lg:text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--lpx-text)]">
                {founder.name}
              </h3>
              <p className="mt-1 text-[15px] font-medium text-[var(--lpx-lime-hi)]">
                {founder.role}
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.7] text-[var(--lpx-muted)] max-w-[62ch]">
                {founder.bio}
              </p>
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="lpx-btn-ghost lpx-btn-ghost--sm mt-7 self-start"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.8} />
                LinkedIn
              </a>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lpx-team-row mt-4 lg:mt-5">
            {rest.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 lg:mt-14 flex justify-center">
            <CtaButton>{c.cta}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="lpx-card lpx-card--hover lpx-spot lpx-team-card h-full">
      <div className="lpx-team-card-photo">
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          decoding="async"
          style={member.photoPosition ? { objectPosition: member.photoPosition } : undefined}
        />
      </div>
      <div className="p-6 lg:p-7">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--lpx-text)]">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[13.5px] font-medium text-[var(--lpx-lime-hi)]">{member.role}</p>
        <p className="mt-4 text-[14px] leading-[1.65] text-[var(--lpx-muted)]">{member.bio}</p>
      </div>
    </article>
  );
}
