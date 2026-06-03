# Logos dos clientes — ClientLogos marquee

Esta pasta recebe os logos das empresas que aparecem na faixa horizontal
"Empresas que já operam com a IAplicada" nas LPs `/`, `/contabil` e
`/contabil02`.

## Tratamento visual

O componente aplica `filter: brightness(0) invert(1)` em TODAS as
imagens — qualquer logo (colorida, preta, branca) vira branca uniforme.
Não precisa pré-processar pra remover fundo branco ou preto.

**Requisito**: logo precisa ter fundo TRANSPARENTE (PNG ou SVG).
Se vier com fundo sólido, vai aparecer um retângulo branco no lugar.

## Arquivos esperados

Substitua quando os assets oficiais chegarem. Enquanto o arquivo
não existir, o componente cai automaticamente pra wordmark de texto.

| Cliente | Path esperado | Formato |
|---|---|---|
| Mercado Livre | `mercado-livre.png` | PNG transparente |
| iFood | `ifood.svg` | SVG ou PNG transparente |
| Cimed | `cimed.svg` | SVG ou PNG transparente |
| PSA Consultores | `psa.png` | PNG transparente |
| LCR Contadores | `lcr.jpg` | JPG (sem transparência funciona pq filter zera) |
| Borges & Zembruski | `borges-zembruski.png` | PNG transparente |
| Recon | `recon.png` | PNG transparente |

Os 3 ausentes (Focus FinTax / Turystar / Uiara Intimates) caem pro
wordmark de texto quando renderizados.
