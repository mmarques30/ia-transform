import { useState } from "react";

/**
 * Faixa de logos dos clientes — marquee horizontal contínuo (estilo
 * "trusted by"). Suporta logo real via `logo` (path em /public) com
 * fallback automático pra wordmark textual se a imagem não carregar.
 *
 * Tratamento visual uniforme: filter brightness(0) invert(1) deixa
 * QUALQUER logo branca, independente da cor original. Resolve o
 * problema de logos com fundo branco/preto quebrando o ritmo da faixa.
 *
 * Para adicionar/substituir logos, ponha o arquivo em
 * /public/clients/logos/ com o nome esperado abaixo.
 */
interface Client {
  name: string;
  /** Path relativo a /public. Se omitido ou imagem falhar, mostra wordmark de texto. */
  logo?: string;
}

const CLIENTS: Client[] = [
  {
    name: "Mercado Livre",
    logo: "/clients/mercado-livre-logo.png",
  },
  { name: "iFood", logo: "/clients/IFood_logo.svg.png" },
  { name: "Cimed", logo: "/clients/cimed-logo.svg" },
  { name: "PSA Consultores", logo: "/clients/psa-logo-quem-somos.png" },
  // LCR removida do carrossel — arquivo JPEG (lcr_contadores_logo.jpeg)
  // não tem alpha channel, então o filter brightness(0) invert(1) deixa
  // ela aparecendo como retângulo branco invisível. Pra trazer de volta,
  // precisa de PNG/SVG com fundo transparente.
  // { name: "LCR Contadores", logo: "/clients/lcr_contadores_logo.jpeg" },
  { name: "Borges & Zembruski", logo: "/clients/borges-zembruski-logo.png" },
  { name: "Recon", logo: "/clients/recon-logo-proposal.png" },
  { name: "Focus FinTax", logo: "/clients/focus-fintax-logo.png" },
  // Turystar — arquivo (1.png) é RGB sem canal alpha (fundo branco
  // sólido). Com o filter brightness(0) invert(1), apareceria como
  // retângulo branco invisível (mesmo bug do antigo LCR jpeg).
  // Pra ativar: subir versão PNG/SVG com fundo TRANSPARENTE.
  { name: "Turystar" },
  { name: "Uiara Intimates" },
];

export function ClientLogos() {
  // Renderiza 2x pra animação contínua sem gap
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section className="section-veil py-[56px] lg:py-[72px] overflow-hidden">
      <div className="container-page">
        <p className="text-center text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
          Empresas que já operam com a IAplicada
        </p>
      </div>

      <div className="relative mt-9 overflow-hidden">
        {/* Fades laterais */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(90deg, var(--color-background) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(270deg, var(--color-background) 0%, transparent 100%)",
          }}
        />

        <div className="ticker-track items-center" aria-hidden>
          {loop.map((client, i) => (
            <ClientItem key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Item individual — renderiza <img> com tratamento white-uniform se
 * tiver logo, ou wordmark textual se não tiver / falhar.
 */
function ClientItem({ client }: { client: Client }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = client.logo && !imageFailed;

  return (
    <span className="inline-flex items-center gap-8 whitespace-nowrap">
      {showImage ? (
        <img
          src={client.logo}
          alt={client.name}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="h-7 lg:h-8 w-auto block"
          style={{
            // Tratamento uniforme: qualquer logo vira branca/cremes
            filter: "brightness(0) invert(1)",
            opacity: 0.6,
            transition: "opacity 0.25s ease",
            maxWidth: 160,
            objectFit: "contain",
          }}
        />
      ) : (
        <span
          className="text-[20px] lg:text-[24px] font-bold tracking-tight"
          style={{ color: "oklch(0.96 0.012 110 / 0.55)" }}
        >
          {client.name}
        </span>
      )}
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
        style={{ backgroundColor: "var(--color-primary)", opacity: 0.5 }}
      />
    </span>
  );
}
