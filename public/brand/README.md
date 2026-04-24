# Brand assets — como substituir

Os componentes da LP consomem assets desta pasta. Pra trocar pelo material oficial, **basta substituir o arquivo mantendo o mesmo nome**.

## 1. Logo — `public/brand/logo.svg`

Usado em Header, Footer, Authority, Problem e badge rotativo. Se você tiver o SVG oficial exportado do Figma/Illustrator, só sobrescreva este arquivo com o mesmo nome.

- Aceita SVG ou PNG. Se usar PNG, mude pra `public/brand/logo.png` e edite `src/components/Logo.tsx` + `src/components/sections/Authority.tsx` + `src/components/sections/Problem.tsx` trocando `/brand/logo.svg` por `/brand/logo.png`.

## 2. Foto da Mariana — `public/brand/mariana.jpg`

Usado na seção Authority (Sobre a IAplicada).

**Como substituir:**
1. Salve a foto oficial dela com o nome exato `mariana.jpg` (ou `.jpeg` / `.png`)
2. Coloque em `public/brand/mariana.jpg`
3. Commit + push — a página vai carregar a foto automaticamente

Enquanto o arquivo não existir, cai num placeholder neutro do Unsplash (editável em `src/config/brand.ts` → `FOUNDER.photoFallback`).

**Dicas pra foto:**
- Proporção recomendada: **3:4 vertical** ou **4:5** (ex: 1200×1500 ou 1500×2000)
- Enquadramento: dos ombros pra cima, levemente acima do centro
- Qualidade: mínima 1200px no maior lado

## 3. Logos de clientes — `public/brand/logos/`

(Opcional) Se quiser renderizar logos como imagem ao invés de texto:

1. Salve cada logo como SVG em `public/brand/logos/<nome>.svg`
2. Edite `src/config/brand.ts` → `CLIENTS` adicionando `src: "/brand/logos/natura.svg"` em cada item

## 4. Fotos dos depoimentos — `public/brand/testimonials/`

(Opcional) Pra cada testemunho com foto:

1. Salve em `public/brand/testimonials/<nome>.jpg`
2. Edite `src/config/brand.ts` → `TESTIMONIALS` adicionando `photoSrc: "/brand/testimonials/joao.jpg"`

## Estrutura sugerida

```
public/brand/
├── README.md          (este arquivo)
├── logo.svg           (oficial)
├── mariana.jpg        (foto da fundadora)
├── logos/
│   ├── natura.svg
│   └── ambev.svg
└── testimonials/
    └── cliente.jpg
```
