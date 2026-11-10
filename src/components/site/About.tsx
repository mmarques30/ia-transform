import { useState } from "react";
import {
  Briefcase,
  Check,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Plus,
  Target,
  Youtube,
} from "lucide-react";
import { jsonLd } from "@/lib/structuredData";
import { CountUp, CtaButton, Eyebrow, Rise, Wave, scrollToId, spotlight } from "./primitives";
import { NAV } from "./Header";

/* ───────────────────────── Sobre + Time (dobra clara) ───────────────────────── */

const TEAM = [
  {
    name: "Ana Cecilia",
    role: "Account Executive",
    photo: "/brand/ana-cecilia.png",
    bio: "10 anos em comercial B2B e B2C. Passou por Inter&Co, allu e Localiza&Co.",
  },
  {
    name: "Matheus Farah",
    role: "Tech Lead",
    photo: "/brand/matheus.png",
    bio: "Lidera a engenharia: arquitetura, integrações via API, automações com n8n e IA com Claude.",
  },
  {
    name: "Maria Olívia",
    role: "Developer",
    photo: "/brand/maria-olivia.jpg",
    bio: "Desenvolve as telas e integrações que colocam cada sistema em produção.",
  },
  {
    name: "Maria Eduarda",
    role: "Sales & Marketing Support",
    photo: "/brand/maria-eduarda.png",
    bio: "Mantém a operação comercial e de marketing rodando nos bastidores.",
  },
];

/** Foto do membro; se o arquivo ainda não existir, mostra as iniciais. */
function MemberPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");
    return <span className="st-member-initials">{initials}</span>;
  }
  return <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />;
}

export function AboutSection() {
  return (
    <section className="st-light st-about" id="sobre">
      <Wave />
      <div className="st-light-body">
        <div className="st-container">
          <div className="st-about-grid">
            <Rise className="st-about-photo-wrap">
              <div className="st-about-photo">
                <img
                  src="/brand/mariana-marques.jpg"
                  alt="Mariana Marques, fundadora e CEO da IAplicada"
                  width={1086}
                  height={1448}
                  loading="lazy"
                />
              </div>
              <div className="st-about-badge">
                <img src="/brand/logo-mark.svg" alt="" width={28} height={28} />
                <span>
                  <b>Mariana Marques</b>
                  <small>Founder & CEO</small>
                </span>
              </div>
            </Rise>

            <div className="st-about-copy">
              <Rise>
                <Eyebrow>Quem lidera</Eyebrow>
                <h2 className="st-h2 st-h2--dark">
                  Aprendi em ambientes onde <em>caos não é opção.</em>
                </h2>
              </Rise>
              <Rise delay={100}>
                <p className="st-lead st-lead--dark">
                  Antes da IAplicada, foram 11 anos como executiva em Mercado Livre, Suzano e
                  AngloGold, liderando transformação digital na América Latina. Trouxe para cá o
                  padrão de operação que não pode parar, adaptado para o tamanho e o processo de
                  quem está crescendo. Criei o Método APLICA e lidero cada projeto.
                </p>
              </Rise>
              <Rise delay={160}>
                <div className="st-about-stats">
                  <div>
                    <b>
                      <CountUp to={11} />
                    </b>
                    <span>anos como executiva</span>
                  </div>
                  <div>
                    <b>
                      <CountUp to={50} prefix="+" />
                    </b>
                    <span>empresas atendidas</span>
                  </div>
                  <div>
                    <b>
                      <CountUp to={90} />
                    </b>
                    <span>dias até o sistema completo</span>
                  </div>
                </div>
              </Rise>
              <Rise delay={220}>
                <div className="st-about-xp">
                  <span className="st-mono">Passagens</span>
                  <span>Mercado Livre</span>
                  <span>Suzano</span>
                  <span>AngloGold</span>
                </div>
              </Rise>
            </div>
          </div>

          <div className="st-team">
            <Rise className="st-team-head">
              <span className="st-mono">Seu novo time</span>
              <h3>Quem já construiu operações e entrega sistema rodando de verdade.</h3>
            </Rise>
            <div className="st-team-grid">
              {TEAM.map((m, i) => (
                <Rise key={m.name} delay={i * 80}>
                  <article className="st-member">
                    <div className="st-member-photo">
                      <MemberPhoto src={m.photo} name={m.name} />
                    </div>
                    <div className="st-member-info">
                      <b>{m.name}</b>
                      <small>{m.role}</small>
                      <p>{m.bio}</p>
                    </div>
                  </article>
                </Rise>
              ))}
            </div>
            <Rise className="st-team-more">
              <span className="st-team-more-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span>
                Entre outros especialistas em dados, automação e produto que entram em cada projeto.
              </span>
            </Rise>
          </div>
        </div>
      </div>
      <Wave flip />
    </section>
  );
}

/* ───────────────────────── Para quem ───────────────────────── */

const AUDIENCE = [
  {
    icon: Briefcase,
    title: "Empresários, fundadores e sócios",
    text: "Que precisam de um sistema que faça a empresa rodar sem depender deles em cada decisão.",
    items: [
      "Sair da operação sem perder velocidade ou controle",
      "Tocar a empresa de onde quiser",
      "Crescer a receita sem crescer a folha",
    ],
  },
  {
    icon: Target,
    title: "Diretores de operações e gestores de área",
    text: "Comercial, financeiro, logística, CS e contábil que precisam eliminar processo manual e retrabalho.",
    items: [
      "Acabar com digitação dupla e conferência",
      "Ter o dado certo na hora da decisão",
      "Entregar mais com o mesmo time",
    ],
  },
];

export function AudienceSection() {
  return (
    <section className="st-section st-audience">
      <div className="st-container">
        <Rise className="st-center-head">
          <Eyebrow center>Para quem é</Eyebrow>
          <h2 className="st-h2">
            Para quem já construiu uma empresa e precisa <em>escalar sem multiplicar o time.</em>
          </h2>
        </Rise>
        <div className="st-audience-grid">
          {AUDIENCE.map((a, i) => (
            <Rise key={a.title} delay={i * 120}>
              <article className="st-audience-card" onMouseMove={spotlight}>
                <span className="st-audience-icon">
                  <a.icon size={20} />
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <ul>
                  {a.items.map((it) => (
                    <li key={it}>
                      <Check size={14} strokeWidth={3} /> {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA final ───────────────────────── */

const DETAILS = [
  ["Formato", "Software com IA sob medida"],
  ["MVP", "Funcionando em até 30 dias"],
  ["Sistema completo", "Em até 90 dias"],
  ["Diagnóstico", "Gratuito · 45 min por vídeo"],
  ["Investimento", "Por escopo, após o diagnóstico"],
];

export function FinalCtaSection() {
  return (
    <section className="st-section st-final" id="contato">
      <div className="st-container">
        <Rise>
          <div className="st-final-card" onMouseMove={spotlight}>
            <div className="st-final-orb" aria-hidden />
            <div className="st-final-copy">
              <Eyebrow>Próximo passo</Eyebrow>
              <h2 className="st-h2">
                Sua próxima decisão pode definir <em>os próximos anos</em> da sua operação.
              </h2>
              <p className="st-lead">
                Comece pelo diagnóstico gratuito. Mesmo que você não feche, leva o mapa de
                processos, o ranking de gargalos e o playbook do trimestre.
              </p>
              <div className="st-final-ctas">
                <CtaButton size="lg">Solicitar diagnóstico gratuito</CtaButton>
                <CtaButton variant="ghost" size="lg" href="https://wa.me/5511950566101">
                  Falar no WhatsApp
                </CtaButton>
              </div>
            </div>
            <dl className="st-final-details">
              <div className="st-final-details-head">
                <img src="/brand/logo-mark.svg" alt="" width={22} height={22} />
                <span>IAplicada Business</span>
                <span className="st-status">
                  <span className="st-status-dot" /> Vagas no ciclo
                </span>
              </div>
              {DETAILS.map(([k, v]) => (
                <div key={k} className="st-final-row">
                  <dt className="st-mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

const FAQ = [
  {
    q: "O que a IAplicada faz, exatamente?",
    a: "Construímos software com inteligência artificial sob medida para automatizar a operação do negócio. Não é licença de ferramenta pronta e não é consultoria que entrega apresentação. Mapeamos os processos, identificamos onde a empresa perde tempo e dinheiro e entregamos um sistema que já funciona dentro da operação. A IA embutida aprende com cada uso: o que o time corrige vira padrão e volta sugerido.",
  },
  {
    q: "Como implementar IA na minha empresa?",
    a: "Começa por um diagnóstico gratuito: mapeamos os processos, identificamos onde a empresa perde tempo e dinheiro e montamos o ranking de gargalos. Depois construímos o sistema pelo Método APLICA: MVP funcional em até 30 dias e o sistema completo em até 90 dias, integrado ao que a empresa já usa (planilha, CRM, ERP, WhatsApp, e-mail).",
  },
  {
    q: "Em quanto tempo fica pronto e quanto custa?",
    a: "Em até 30 dias o MVP funcional. Projetos maiores são divididos por módulos, priorizando o que gera resultado primeiro. O investimento é calculado por escopo: depois do diagnóstico você recebe uma proposta com os módulos, a ordem de entrega e o valor. A condição comercial é preservada durante o período de avaliação.",
  },
  {
    q: "Qual a diferença entre a IAplicada e um ERP ou consultoria tradicional?",
    a: "ERP força a empresa a se adaptar ao software. A IAplicada constrói o software para se adaptar à empresa. Consultoria entrega diagnóstico e vai embora. A IAplicada entrega sistema rodando, não slide.",
  },
  {
    q: "Para que tipo de empresa a IAplicada atende?",
    a: "Empresas que já faturam, têm operação rodando e precisam escalar sem multiplicar o time. O critério não é setor, é o problema: processo manual que consome hora de gente cara, dado espalhado em planilha e WhatsApp, decisão que trava porque depende de uma pessoa só.",
  },
  {
    q: "Vale mais a pena contratar mais gente ou automatizar com IA?",
    a: "Um time de 10 pessoas que gasta 2 horas por dia em trabalho manual perde 400 horas por mês, o equivalente a 2 pessoas em tempo integral. Contratar aumenta esse custo fixo; automatizar devolve essas horas. Na PSA Consultores, a eficiência operacional subiu pelo menos 50% em seis meses, com R$ 191 mil de ROI documentado em cinco meses.",
  },
  {
    q: "O diagnóstico é realmente gratuito? E se eu já tiver sistemas?",
    a: "Sim. Sem custo e sem compromisso de contratação. Mesmo que você não feche, leva o mapa de processos, o ranking de gargalos e o playbook do trimestre. Se já usa outros sistemas, o que construímos se integra ao que você já tem. Não jogamos fora o que funciona: automatizamos o que trava.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="st-section st-faq" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <div className="st-container st-faq-grid">
        <Rise className="st-faq-side">
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <h2 className="st-h2">
            Tudo o que você precisa saber <em>antes de começar.</em>
          </h2>
          <p className="st-lead">Não achou sua dúvida? Fale direto com o time.</p>
          <CtaButton variant="ghost" href="https://wa.me/5511950566101">
            Falar com a IAplicada
          </CtaButton>
        </Rise>
        <div className="st-faq-list">
          {FAQ.map((f, i) => (
            <Rise key={f.q} delay={i * 50}>
              <div className={`st-faq-item ${open === i ? "is-open" : ""}`}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="st-mono">0{i + 1}</span>
                  <span className="st-faq-q">{f.q}</span>
                  <span className="st-faq-icon">
                    <Plus size={16} />
                  </span>
                </button>
                <div className="st-faq-a">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

export function SiteFooter() {
  return (
    <footer className="st-footer">
      <div className="st-container">
        <div className="st-footer-top">
          <div className="st-footer-brand">
            <img src="/brand/iaplicada-logo-dark.webp" alt="IAplicada" width={140} height={33} />
            <p>
              Software com IA sob medida que automatiza a operação da sua empresa em até 90 dias.
            </p>
            <span className="st-mono st-footer-tag">#menoshypemaisentrega</span>
          </div>
          <div className="st-footer-col">
            <span className="st-mono">Navegação</span>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(n.id);
                }}
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="st-footer-col">
            <span className="st-mono">Contato</span>
            <a href="mailto:mariana@iaplicada.com">
              <Mail size={14} /> mariana@iaplicada.com
            </a>
            <a href="tel:+5511950566101">
              <Phone size={14} /> (11) 95056-6101
            </a>
            <div className="st-footer-social">
              <a
                href="https://www.linkedin.com/in/marianaqmarques/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/marimarquescb/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/@iaplicadaa"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>
          <div className="st-footer-col st-footer-cta">
            <span className="st-mono">Comece agora</span>
            <p>Diagnóstico gratuito, 45 minutos, sem compromisso.</p>
            <CtaButton size="sm">Solicitar diagnóstico</CtaButton>
          </div>
        </div>
        <div className="st-footer-bottom">
          <span>© {new Date().getFullYear()} IAplicada. Todos os direitos reservados.</span>
          <span>Feito com IA aplicada, não com hype.</span>
        </div>
      </div>
      <div className="st-footer-word" aria-hidden>
        IAPLICADA
      </div>
    </footer>
  );
}
