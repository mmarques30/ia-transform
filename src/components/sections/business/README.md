# Business LP sections

Shell shared entre as LPs Business (`/` e `/businessv2`) — visual dark
charcoal alinhado com `/contabil`, tipografia h-mix, mesmo Header/
Footer/ClientLogos/Comparison/Authority/FAQ do resto do site.

## Estrutura atual

```
business/
├── Solution.tsx    (dobra Método APLICA, shared)
├── Process.tsx     (dobra Jornada semana a semana, shared)
├── OliveWave.tsx   (visual filler shared)
├── variantA/       ← LP `/`  (ângulo: custo escondido no processo)
└── variantB/       ← LP `/businessv2`  (ângulo: operação que escala)
```

`variantC/` (LP `/businessv3` — ângulo prova social pura) foi removida
depois do teste — a LP-B assumiu a prova social via depoimentos +
mockups reais.

## Form

Todas as LPs usam `HeroForm` (business, 7 campos): firstname, email,
phone, company, cargo, faixa_de_faturamento, setor_do_mercado.

## FAQ

Compartilhado de `sections/FAQ.tsx`. Inclui 2 items business-specific
(fase 5): "O sistema fica com o nome da IAplicada ou da minha empresa?"
e "Preciso ter time de TI para manter?".
