/**
 * BRAND CONFIGURATION
 * -------------------
 * Edite este arquivo pra trocar logos reais, foto da fundadora e depoimentos
 * sem precisar mexer nos componentes. Coloque assets em public/brand/.
 */

export interface ClientLogo {
  name: string;
  /** Optional SVG/PNG path relative to /public — falls back to text if omitted. */
  src?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional photo path relative to /public. */
  photoSrc?: string;
}

/**
 * Empresas que já contrataram IAplicada (aparecem no Hero e no LogosBar).
 * SUBSTITUIR pela lista real quando disponível. Use os nomes exatamente como
 * a empresa prefere ser chamada. Adicione `src: "/brand/logos/natura.svg"`
 * se quiser renderizar com imagem ao invés do texto.
 */
export const CLIENTS: ClientLogo[] = [
  { name: "Natura" },
  { name: "Ambev" },
  { name: "Magazine Luiza" },
  { name: "Globo" },
  { name: "Hubla" },
  { name: "Mottu" },
];

/**
 * Fundadora da IAplicada.
 * SUBSTITUIR a foto colocando o arquivo em public/brand/mariana.jpg
 * (ver public/brand/README.md pra instruções). Enquanto o arquivo não existir,
 * a UI carrega um placeholder neutro do Unsplash e não quebra.
 */
export const FOUNDER = {
  name: "Mariana Marques",
  role: "Fundadora · IAplicada",
  // Foto oficial da Mari — retrato profissional com fundo olive
  // matching a marca. Adicionada em jun/2025 substituindo o
  // final_composite.webp anterior (que continua disponível).
  photoSrc: "/brand/mariana-marques.jpg",
  photoFallback: "/brand/final_composite.webp",
  /** Manifesto da fundadora — frase curta e direta pra hero da Authority.
      Reflete a passagem por operações enterprise (Mercado Livre, Suzano,
      AngloGold) onde a Mariana aprendeu o padrão que trouxe pra IAplicada. */
  manifesto: "Aprendi em ambientes onde caos não é opção.",
  bio: "Antes da IAplicada, passei por Mercado Livre, Suzano e AngloGold. Trouxe pra cá o padrão de operação que não pode parar. Hoje implementamos IA dentro da operação real de mais de 100 empresas, com vertical contábil ativa entregando atendimento, conciliação e fechamento.",
  socials: {
    linkedin: "https://www.linkedin.com/in/marianaqmarques/",
    instagram: "https://www.instagram.com/marimarquescb/",
    youtube: "https://www.youtube.com/@iaplicadaa",
  },
};

/**
 * Depoimentos de clientes reais — aparecem na seção Testimonials.
 * SUBSTITUIR por quotes reais. Adicionar foto em public/brand/testimonials/.
 * Se não quiser nenhum, esvazie o array.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "A diferença apareceu na terceira semana. Em 12, 40 atendentes operando o novo fluxo.",
    author: "Diretora de CX",
    role: "Customer Experience",
    company: "Grupo de varejo (~2.500 colaboradores)",
  },
  {
    quote: "Em 3 meses mudou a cara da nossa operação. E o time deixou de ver IA como hype.",
    author: "CEO",
    role: "Fundador",
    company: "Fintech Série A (~80 colaboradores)",
  },
  {
    quote:
      "Virou parte do nosso time de liderança estratégica. Decisão de IA no grupo passa por eles.",
    author: "CEO",
    role: "Presidente",
    company: "Grupo industrial (~5.000 colaboradores)",
  },
];

/**
 * Números consolidados que aparecem na seção Authority.
 */
export const AUTHORITY_NUMBERS = [
  { value: "+80", label: "empresas atendidas" },
  { value: "+2.000", label: "profissionais formados" },
  { value: "3 anos", label: "construindo IAplicada" },
  { value: "100%", label: "projetos com métrica" },
];
