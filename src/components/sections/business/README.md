# Business LP sections

Shell shared entre as LPs Business (`/`, `/businessv2`, `/businessv3`).

Duplicata das sections de `/contabil` (visual dark charcoal, mesma
hierarquia tipográfica e componentes shadcn) com uma diferença
crítica: o Hero importa **`HeroForm`** (form business com 7 campos:
firstname, email, phone, company, cargo, faixa_de_faturamento,
setor_do_mercado) em vez do `HeroFormContabil`.

## Como usar

Fases 2, 3 e 4 do refactor vão:

1. Trocar o import das rotas `/`, `/businessv2` e `/businessv3` pra
   consumir daqui em vez das sections cream (academy-theme) atuais.
2. Adaptar a **copy** dobra-por-dobra pra LP-A / LP-B / LP-C
   conforme spec do briefing.

Enquanto as fases 2+ não rodam, essa pasta é código dormente — não
está referenciada por nenhuma rota, não afeta produção.

## Estrutura

Dobras 2, 3, 4, 6, 7, 9, 13 são **específicas por variante** — vão
ganhar subpastas `variantA/`, `variantB/`, `variantC/` nas fases
2/3/4.

Dobras 5, 8, 10, 11, 12 são **compartilhadas** — Method, Process,
Authority, Comparison, FAQ ficam iguais nas 3 LPs (Comparison e FAQ
com pequenos ajustes de wording por Fase 5).
