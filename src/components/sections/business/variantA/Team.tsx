import { useRef, useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";

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
  const [current, setCurrent] = useState(0);
  const total = TEAM.length;
  const isTransitioning = useRef(false);

  const getCardWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 340;
    const card = el.querySelector<HTMLElement>(".team-card");
    if (!card) return 340;
    return card.offsetWidth + 20;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = getCardWidth();
    el.scrollLeft = cardWidth * total;
  }, [total, getCardWidth]);

  const scrollToPosition = useCallback(
    (index: number, smooth: boolean) => {
      const el = trackRef.current;
      if (!el) return;
      const cardWidth = getCardWidth();
      const targetScroll = cardWidth * (total + index);
      el.scrollTo({ left: targetScroll, behavior: smooth ? "smooth" : "instant" });
    },
    [total, getCardWidth],
  );

  const goNext = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    const next = (current + 1) % total;
    setCurrent(next);
    scrollToPosition(next, true);
    setTimeout(() => { isTransitioning.current = false; }, 400);
  }, [current, total, scrollToPosition]);

  const goPrev = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    const prev = (current - 1 + total) % total;
    setCurrent(prev);
    scrollToPosition(prev, true);
    setTimeout(() => { isTransitioning.current = false; }, 400);
  }, [current, total, scrollToPosition]);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      setCurrent(index);
      scrollToPosition(index, true);
      setTimeout(() => { isTransitioning.current = false; }, 400);
    },
    [scrollToPosition],
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScrollEnd = () => {
      if (isTransitioning.current) return;
      const cardWidth = getCardWidth();
      const scrollLeft = el.scrollLeft;
      const minBound = cardWidth * 0.5;
      const maxBound = cardWidth * (total * 2 + 0.5);

      if (scrollLeft < minBound) {
        el.scrollTo({ left: scrollLeft + cardWidth * total, behavior: "instant" });
      } else if (scrollLeft > maxBound) {
        el.scrollTo({ left: scrollLeft - cardWidth * total, behavior: "instant" });
      }

      const offset = scrollLeft - cardWidth * total;
      const idx = Math.round(offset / cardWidth);
      const wrapped = ((idx % total) + total) % total;
      setCurrent(wrapped);
    };

    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScrollEnd, 120);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [total, getCardWidth]);

  const tripled = [...TEAM, ...TEAM, ...TEAM];

  return (
    <section
      id="time"
      className="relative py-[80px] lg:py-[110px]"
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
            <h2
              className="font-extrabold text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Seu novo{" "}
              <span
                style={{ color: "var(--color-primary)" }}
              >
                Time.
              </span>
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
              {tripled.map((member, i) => (
                <TeamCard key={`${member.name}-${i}`} member={member} />
              ))}
            </div>

            <button
              className="team-arrow team-arrow-prev"
              onClick={goPrev}
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="team-arrow team-arrow-next"
              onClick={goNext}
              aria-label="Próximo"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="team-dots">
              {TEAM.map((_, i) => (
                <button
                  key={i}
                  className={`team-dot${i === current ? " team-dot-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para ${TEAM[i].name}`}
                />
              ))}
            </div>
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
          style={member.photoPosition ? { objectPosition: member.photoPosition } : undefined}
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
