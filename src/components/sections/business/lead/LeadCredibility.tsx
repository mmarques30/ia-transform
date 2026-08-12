import { FOUNDER } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";

interface LeadCredibilityProps {
  onOpenModal: () => void;
}

const BULLETS: string[] = [
  "Mariana Marques · Fundadora da IAplicada",
  "11 anos como executiva no Mercado Livre, Suzano e Anglo Gold",
  "Especialista em transformação de processos LATAM",
  "Referência em IA aplicada para crescimento sem contratação",
];

export function LeadCredibility({ onOpenModal }: LeadCredibilityProps) {
  return (
    <section className="relative">
      <div className="section-veil">
        <div className="founder-section">
          <div className="founder-photo-col">
            <img
              src={FOUNDER.photoSrc}
              alt={FOUNDER.name}
              loading="lazy"
              decoding="async"
              className="founder-photo"
              onError={(e) => {
                const img = e.currentTarget;
                if (FOUNDER.photoFallback && img.src.includes(FOUNDER.photoSrc.split("/").pop()!)) {
                  img.src = FOUNDER.photoFallback;
                }
              }}
            />
          </div>

          <div className="founder-text-col">
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-bold"
              style={{
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Quem criou
            </span>
            <h2 className="mt-4 font-extrabold text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.08] tracking-[-0.02em] text-foreground">
              11 anos vendo escala
              <br />
              de dentro.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Agora aplicando
                <br />
                em empresas reais.
              </span>
            </h2>

            <ul className="mt-6 flex flex-col gap-2.5">
              {BULLETS.map((b) => (
                <CredibilityItem key={b}>{b}</CredibilityItem>
              ))}
            </ul>

            <p className="mt-6 text-[14px] lg:text-[14.5px] text-sage leading-[1.55] max-w-[560px]">
              <strong className="text-foreground font-semibold">
                Criou a IAplicada para trazer esse mesmo padrão para empresas de médio porte:
              </strong>{" "}
              software + IA + automações + integrações, implementados sem complicação, não só ensinados.
            </p>

            <div className="mt-7">
              <OriginButton onClick={onOpenModal}>
                Quero o kit gratuito &rarr;
              </OriginButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="grid items-baseline gap-3 text-[14px] lg:text-[14.5px] leading-[1.4] text-foreground"
      style={{ gridTemplateColumns: "16px 1fr" }}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full mt-2"
        style={{ border: "1.5px solid var(--color-primary)" }}
      />
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>
    </li>
  );
}
