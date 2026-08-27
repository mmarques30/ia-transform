import { lazy, Suspense } from "react";

const IAPLogo3D = lazy(
  () => import("@/components/sections/business/lead/IAPLogo3D").then((m) => ({ default: m.IAPLogo3D }))
);

const BULLETS: string[] = [
  "Mariana Marques · Fundadora da IAplicada",
  "+5 anos automatizando operações",
  "+50 sistemas implementados",
  "Referência em IA aplicada para crescimento sem contratação",
];

export function MentorMari() {
  return (
    <section id="mentora" className="relative">
      <div className="section-veil">
        <div className="founder-section">
          <div className="founder-logo3d-col">
            <Suspense fallback={null}>
              <IAPLogo3D width="100%" height="100%" scale={1.6} />
            </Suspense>
          </div>

          <div className="founder-text-col">
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-bold"
              style={{
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Quem lidera a IAplicada
            </span>
            <h2 className="mt-4 font-extrabold text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.08] tracking-[-0.02em] text-foreground">
              Quem mapeia, constrói e implementa
              <br />
              <span style={{ color: "var(--color-primary)" }}>dentro da sua empresa.</span>
            </h2>

            <ul className="mt-6 flex flex-col gap-2.5">
              {BULLETS.map((b) => (
                <MentorItem key={b}>{b}</MentorItem>
              ))}
            </ul>

            <p className="mt-6 text-[14px] lg:text-[14.5px] text-sage leading-[1.55] max-w-[560px]">
              <strong className="text-foreground font-semibold">
                Não entregamos recomendação. Entregamos sistema rodando.
              </strong>{" "}
              Cada projeto começa com um diagnóstico com a IAplicada e o sistema é construído para o
              jeito que o seu negócio funciona.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

function MentorItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="grid items-baseline gap-3 text-[14px] lg:text-[14.5px] leading-[1.4] text-foreground"
      style={{ gridTemplateColumns: "16px 1fr" }}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full mt-2"
        style={{ border: "1.5px solid var(--color-primary)" }}
      />
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>
    </li>
  );
}
