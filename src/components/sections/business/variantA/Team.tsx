import { useRef, useState, useCallback, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Mariana Marques",
    role: "Founder & CEO",
    photo: "/brand/mariana-marques.jpg",
    bio: "11 anos como executiva em Mercado Livre, Suzano e AngloGold, liderando mais de 40 frentes de transformação digital na América Latina. Fundou a IAplicada para entregar o que viu funcionar em empresa grande — adaptado para o tamanho e o processo de quem está crescendo agora. Criou a metodologia APLICA e lidera cada projeto do diagnóstico à implementação.",
  },
  {
    name: "Ana Cecilia",
    role: "Account Executive",
    photo: "/brand/ana-cecilia.png",
    bio: "10 anos em comercial B2B e B2C nas maiores instituições financeiras do país. Passou por Inter&Co, allu e Localiza&Co, conduzindo todo o ciclo de vendas: prospecção, negociação e pós-venda. Na IAplicada, cuida do relacionamento com clientes e do processo comercial do primeiro contato ao fechamento.",
  },
  {
    name: "Yuri Souza",
    role: "PMO",
    photo: "/brand/yuri.png",
    bio: "Com mais de 5 anos liderando projetos em empresas de tecnologia e marketing digital, atuou como Gerente de Projetos Web na Nerdweb e Customer Success Manager antes de chegar à IAplicada. Garante que cada entrega saia no prazo, com metodologia ágil e visão de quem acompanha o projeto do diagnóstico ao sistema em produção.",
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

export function Team() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".team-card") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="time"
      className="relative py-[80px] lg:py-[110px] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0f07 0%, #111408 50%, #0c0f07 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(200,224,64,0.06), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="container-page text-center mb-10 lg:mb-14">
          <Reveal>
            <span
              className="inline-block px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold"
              style={{
                border: "1px solid rgba(200,224,64,0.4)",
                background: "rgba(200,224,64,0.06)",
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Seu novo time
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Quem vai construir{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                o seu sistema.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Você será acompanhado por quem já construiu operações, liderou transformações
              e entrega sistema rodando de verdade.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="team-carousel-wrapper">
            <div className="team-carousel-track" ref={trackRef}>
              {TEAM.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>

            <button
              className="team-arrow team-arrow-prev"
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              style={{ opacity: canPrev ? 1 : 0, pointerEvents: canPrev ? "auto" : "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="team-arrow team-arrow-next"
              onClick={() => scroll(1)}
              aria-label="Próximo"
              style={{ opacity: canNext ? 1 : 0, pointerEvents: canNext ? "auto" : "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 lg:mt-16 text-center">
            <OriginButton onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}>
              quero meu diagnóstico
            </OriginButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="team-card">
      <div className="team-card-photo">
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="team-card-info">
        <h3 className="team-card-name">{member.name}</h3>
        <span className="team-card-role">{member.role}</span>
        <p className="team-card-bio">{member.bio}</p>
      </div>
    </div>
  );
}
