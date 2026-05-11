/**
 * Microsoft Clarity loader.
 *
 * Documentação oficial: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
 *
 * Inicialização lazy (só roda no browser, depois do mount). Pra ligar:
 *   1) crie o projeto em https://clarity.microsoft.com/
 *   2) copie o Project ID
 *   3) jogue em `.env` como `VITE_CLARITY_PROJECT_ID=xxxxxxxxxx`
 *
 * Sem o env var setado, a função é no-op (não injeta script algum).
 */

type ClarityFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    clarity?: ClarityFn & { q?: unknown[][] };
  }
}

let injected = false;

export function initClarity(projectId: string): void {
  if (typeof window === "undefined") return;
  if (!projectId) return;
  if (injected || window.clarity) return;
  injected = true;

  // Snippet oficial da Microsoft (IIFE adaptada). Cria a fila `clarity`
  // antes de o script chegar e injeta a tag `<script>` antes do primeiro
  // <script> existente na página.
  const w = window as Window & { clarity?: ClarityFn & { q?: unknown[][] } };
  if (!w.clarity) {
    const queue: unknown[][] = [];
    const c: ClarityFn & { q?: unknown[][] } = function (...args: unknown[]) {
      queue.push(args);
    };
    c.q = queue;
    w.clarity = c;
  }

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.clarity.ms/tag/${projectId}`;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(tag, firstScript);
}
