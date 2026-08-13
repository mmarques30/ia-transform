import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "IAplicada · Acesso" },
      { name: "description", content: "Acesse sua conta IAplicada." },
      { name: "theme-color", content: "#0a0c07" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#0a0c07" }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, oklch(0.22 0.04 122 / 0.5), transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center gap-10">
        <Logo size={30} variant="dark" />

        <div
          className="w-full rounded-2xl p-8 sm:p-10"
          style={{
            backgroundColor: "oklch(0.18 0.02 122)",
            border: "1px solid oklch(0.3 0.02 122)",
            boxShadow:
              "0 30px 60px -20px oklch(0 0 0 / 0.6), 0 0 80px -20px oklch(0.75 0.2 122 / 0.08)",
          }}
        >
          <div className="mb-8 text-center">
            <h1
              className="text-[22px] font-semibold tracking-tight"
              style={{ color: "oklch(0.96 0.012 110)" }}
            >
              Acesse sua conta
            </h1>
            <p
              className="mt-2 text-[14px]"
              style={{ color: "oklch(0.68 0.014 115)" }}
            >
              Entre com seu e-mail e senha
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[13px] font-medium"
                style={{ color: "oklch(0.68 0.014 115)" }}
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  size={16}
                  style={{ color: "oklch(0.5 0.014 115)" }}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px] outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "oklch(0.14 0.018 122)",
                    border: "1px solid oklch(0.3 0.02 122)",
                    color: "oklch(0.96 0.012 110)",
                    "--tw-ring-color": "oklch(0.75 0.2 122 / 0.4)",
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[13px] font-medium"
                  style={{ color: "oklch(0.68 0.014 115)" }}
                >
                  Senha
                </label>
                <a
                  href="#"
                  className="text-[12px] font-medium transition-colors hover:underline"
                  style={{ color: "oklch(0.75 0.2 122)" }}
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  size={16}
                  style={{ color: "oklch(0.5 0.014 115)" }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-12 rounded-xl pl-10 pr-12 text-[14px] outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "oklch(0.14 0.018 122)",
                    border: "1px solid oklch(0.3 0.02 122)",
                    color: "oklch(0.96 0.012 110)",
                    "--tw-ring-color": "oklch(0.75 0.2 122 / 0.4)",
                  } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ color: "oklch(0.5 0.014 115)" }}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="relative text-[14px] font-semibold rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-full overflow-hidden cursor-pointer mt-2 border-0"
              style={{
                background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                color: "#0a0c07",
                boxShadow:
                  "0 0 0 4px oklch(0.75 0.2 122 / 0.1), 0 12px 32px -8px oklch(0.75 0.2 122 / 0.35), inset 0 -2px 0 oklch(0 0 0 / 0.12)",
                letterSpacing: "-0.005em",
              }}
            >
              <span className="relative z-10 transition-all duration-500">
                Acessar plataforma
              </span>
              <div
                className="absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45"
                style={{
                  backgroundColor: "#0a0c07",
                  color: "#d5e95a",
                }}
              >
                <ArrowUpRight size={16} />
              </div>
            </Button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(0.3 0.02 122)" }}
            />
            <span
              className="text-[12px] font-medium"
              style={{ color: "oklch(0.5 0.014 115)" }}
            >
              ou
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(0.3 0.02 122)" }}
            />
          </div>

          <button
            type="button"
            className="mt-5 w-full h-12 rounded-xl text-[14px] font-medium flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              border: "1px solid oklch(0.3 0.02 122)",
              color: "oklch(0.96 0.012 110)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.75 0.2 122 / 0.5)";
              e.currentTarget.style.backgroundColor = "oklch(0.75 0.2 122 / 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.3 0.02 122)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar com Google
          </button>
        </div>

        <p
          className="text-[13px] text-center"
          style={{ color: "oklch(0.5 0.014 115)" }}
        >
          Ainda não tem conta?{" "}
          <a
            href="#"
            className="font-medium transition-colors hover:underline"
            style={{ color: "oklch(0.75 0.2 122)" }}
          >
            Fale conosco
          </a>
        </p>
      </div>
    </main>
  );
}
