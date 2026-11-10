import { LockKeyhole } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LeadCta } from "./LeadCta";

interface LeadCtaFinalProps {
  onOpenModal: () => void;
}

/** Fechamento: card com anéis e a marca, preço zero e o botão. */
export function LeadCtaFinal({ onOpenModal }: LeadCtaFinalProps) {
  return (
    <section className="lpx-section--tight relative">
      <div className="lpx-wrap">
        <Reveal>
          <div className="lpx-final">
            <div className="lpx-final-art" aria-hidden>
              <div className="lpx-portal-ring" />
              <div className="lpx-portal-ring" />
              <div className="lpx-portal-ring" />
              <img src="/brand/logo-petals.png" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="lpx-grid" aria-hidden />

            <div className="relative max-w-[640px]">
              <span className="lpx-eyebrow-line">Acesso imediato</span>
              <h2 className="lpx-h2 lpx-h2--xl mt-5">
                O kit que levei meses testando. <em>Para você em minutos.</em>
              </h2>
              <div className="lpx-price mt-7">
                <span className="lpx-price-old">Investimento</span>
                <b>R$ 0</b>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <LeadCta onClick={onOpenModal}>Quero o kit completo</LeadCta>
                <span className="inline-flex items-center gap-2 text-[13px] text-[var(--lpx-muted)]">
                  <LockKeyhole
                    className="h-3.5 w-3.5 text-[var(--lpx-lime)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Gratuito. Acesso imediato.
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
