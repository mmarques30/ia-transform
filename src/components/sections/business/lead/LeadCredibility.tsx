import { FounderAbout, LightBand } from "@/components/lpx/FounderBand";
import { LeadCta } from "./LeadCta";

interface LeadCredibilityProps {
  onOpenModal: () => void;
}

/** Quem criou o kit: mesma faixa clara da LP e do site, com a fundadora. */
export function LeadCredibility({ onOpenModal }: LeadCredibilityProps) {
  return (
    <LightBand>
      <FounderAbout
        eyebrow="Quem criou"
        titleA="11 anos vendo escala de dentro."
        titleEm="Agora aplicando em empresas reais."
        lead={
          <>
            Executiva no Mercado Livre, Suzano e AngloGold, especialista em transformação de
            processos na América Latina. Criou a IAplicada para trazer esse padrão para empresas de
            médio porte: software, IA, automações e integrações implementados sem complicação, não
            só ensinados.
          </>
        }
        stats={[
          { value: 11, label: "anos como executiva" },
          { value: 50, prefix: "+", label: "empresas atendidas" },
          { value: 90, label: "dias até o sistema completo" },
        ]}
        xpLabel="Passagens"
        xp={["Mercado Livre", "Suzano", "AngloGold"]}
        photoAlt="Mariana Marques, fundadora da IAplicada"
      >
        <div className="mt-9">
          <LeadCta onClick={onOpenModal}>Quero o kit gratuito</LeadCta>
        </div>
      </FounderAbout>
    </LightBand>
  );
}
