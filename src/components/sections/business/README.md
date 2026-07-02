# Business LP sections

Shell shared entre as LPs Business (`/`, `/businessv2`, `/businessv3`) —
visual dark charcoal alinhado com `/contabil`, tipografia h-mix,
mesmo Header/Footer/ClientLogos/Comparison/Authority/FAQ do resto do
site.

## Estrutura final (pós refactor 5 fases)

```
business/
├── Solution.tsx    (dobra 5 — Método MAPA, shared nas 3 LPs)
├── Process.tsx     (dobra 8 — Jornada semana a semana, shared)
├── OliveWave.tsx   (visual filler shared)
├── variantA/       ← LP `/`  (ângulo: custo escondido no processo)
├── variantB/       ← LP `/businessv2`  (ângulo: operação que escala)
└── variantC/       ← LP `/businessv3`  (ângulo: prova social pura)
```

Cada `variant*/` tem 5 sections variant-specific:

- `Hero.tsx` (dobra 3 + ticker dobra 2 embutido no MarqueeStrip)
- `Problem.tsx` (dobra 4 — 4 cards)
- `Systems.tsx` (dobra 6 — sistema em ação)
- `Impact.tsx` (dobra 9 — ROI/prova)
- `CTAFinal.tsx` (dobra 13)

## Form

Todas as 3 LPs usam `HeroForm` (business, 7 campos): firstname, email,
phone, company, cargo, faixa_de_faturamento, setor_do_mercado.

## FAQ

Compartilhado de `sections/FAQ.tsx`. Inclui 2 items business-specific
(fase 5): "O sistema fica com o nome da IAplicada ou da minha empresa?"
e "Preciso ter time de TI para manter?".
