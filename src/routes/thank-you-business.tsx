import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, MessageSquare, Inbox, ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/thank-you-business")({
  head: () => ({
    meta: [
      { title: "Inscrição confirmada · IAplicada Business" },
      {
        name: "description",
        content:
          "Recebemos suas informações. Em breve você será contatado para dar continuidade ao seu diagnóstico estratégico.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Inscrição confirmada · IAplicada Business" },
    ],
  }),
  component: ThankYouBusinessPage,
});

const NEXT_STEPS = [
  {
    Icon: MessageSquare,
    title: "Nosso contato pra alinhar o diagnóstico",
    text: "Um sócio do time vai te chamar pra entender contexto e agendar a conversa.",
  },
  {
    Icon: Mail,
    title: "Um e-mail com orientações sobre o processo",
    text: "Detalhes do que vamos discutir e o que preparar pra conversa render mais.",
  },
  {
    Icon: Inbox,
    title: "Se não encontrar o e-mail",
    text: "Confira a caixa de spam ou promoções — em alguns provedores chega por lá.",
  },
];

const PILLARS = [
  {
    n: "01",
    title: "Processos fazem sentido",
    text: "Sequências claras, papéis definidos e hand-offs documentados.",
  },
  {
    n: "02",
    title: "Dados ficam visíveis",
    text: "Indicadores centralizados, em tempo real e acessíveis a quem decide.",
  },
  {
    n: "03",
    title: "Decisões deixam de depender só de você",
    text: "A operação ganha autonomia e roda sem precisar do dono no operacional.",
  },
];

function ThankYouBusinessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO — confirmação */}
      <section
        id="top"
        className="relative pt-[140px] pb-[80px] lg:pt-[180px] lg:pb-[100px] overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 80%)",
          }}
        />

        <div className="container-page relative">
          <div className="text-center max-w-[760px] mx-auto">
            <Reveal>
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "oklch(0.97 0.025 125)",
                  border: "1px solid oklch(0.85 0.05 125)",
                }}
              >
                <CheckCircle2
                  className="h-9 w-9"
                  strokeWidth={2}
                  style={{ color: "var(--color-primary)" }}
                />
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <span className="mt-7 label-chip">
                <span className="dot" />
                Inscrição confirmada
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="h-mix mt-7 text-[40px] sm:text-[52px] lg:text-[64px] text-foreground">
                Recebemos suas <em>informações</em>.
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-[18px] lg:text-[20px] text-foreground font-medium leading-[1.5] max-w-[600px] mx-auto">
                Em breve você será contatado pra dar continuidade ao seu diagnóstico.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 text-[15px] text-sage leading-[1.65] max-w-[560px] mx-auto">
                Este não é um processo automático. Cada diagnóstico é analisado com atenção antes do
                próximo passo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Próximos passos */}
      <section className="py-[80px] lg:py-[110px] bg-background">
        <div className="container-page">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center max-w-[640px] mx-auto">
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  Próximos passos
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h-mix mt-4 text-[30px] sm:text-[36px] lg:text-[42px] text-foreground">
                  O que você <em>vai receber</em>.
                </h2>
              </Reveal>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {NEXT_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="tech-card p-6 h-full flex flex-col">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: "oklch(0.97 0.025 125)",
                        border: "1px solid oklch(0.85 0.05 125)",
                      }}
                    >
                      <step.Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                        style={{ color: "var(--color-primary)" }}
                      />
                    </span>
                    <p className="mt-5 text-[16px] font-bold tracking-tight text-foreground leading-snug">
                      {step.title}
                    </p>
                    <p className="mt-2 text-[13.5px] text-sage leading-[1.55]">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilares do diagnóstico */}
      <section
        className="py-[100px] lg:py-[140px] relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 tech-bg-dots ia-anim-grid-drift opacity-50"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)",
          }}
        />

        <div className="container-page relative">
          <div className="text-center max-w-[820px] mx-auto">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Por que esse diagnóstico
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[48px] text-foreground">
                Pra entender o caos real da sua operação
                <br className="hidden sm:block" />e desenhar, juntos, uma{" "}
                <em>visão clara de sistema</em>.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-4 max-w-[1080px] mx-auto">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="tech-card overflow-hidden h-full flex flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="num-display text-[12px] tracking-wider"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {p.n}
                    </span>
                    <span
                      className="h-[1px] flex-1"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-primary), transparent)",
                      }}
                    />
                  </div>
                  <p className="mt-4 text-[18px] font-bold tracking-tight text-foreground leading-snug">
                    {p.title}
                  </p>
                  <p className="mt-2 text-[14px] text-sage leading-[1.55]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-12 text-center max-w-[680px] mx-auto space-y-3">
              <p className="text-[16px] text-foreground font-semibold">
                Se fizer sentido pros dois lados, seguimos.
              </p>
              <p className="text-[15px] text-sage leading-[1.6]">
                Se não, você sai com mais clareza do que entrou{" "}
                <span className="font-semibold text-foreground">(isso a gente garante)</span>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote da fundadora */}
      <section className="py-[80px] lg:py-[100px] bg-background">
        <div className="container-page">
          <Reveal>
            <figure className="max-w-[820px] mx-auto text-center">
              <p
                className="font-serif italic text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.25] text-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                "Estrutura vem antes da ferramenta. É isso que a gente constrói aqui."
              </p>
              <figcaption className="mt-6 text-[13px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                Mari · Fundadora IAplicada
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* CTA voltar */}
      <section
        className="py-[60px] lg:py-[90px]"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <div className="text-center">
              <Link to="/" className="cta-primary">
                Voltar pro site
                <span className="arrow">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
