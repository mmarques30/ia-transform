import { useState, type FormEvent } from "react";
import { ArrowRight, Plus, X } from "lucide-react";
import { toast } from "sonner";

/**
 * Form de indicação Business — múltiplos indicados em uma única submissão.
 *
 * Endpoint Supabase (público, no-verify-jwt):
 *   POST https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/referral-submit
 *
 * Payload:
 *   {
 *     product: "business",
 *     referrer_name, referrer_company, referrer_whatsapp,
 *     referrals: [{ name, company, whatsapp, email }, ...]
 *   }
 *
 * Validação client-side antes do submit (referrer obrigatório, ao menos
 * 1 indicado válido, consent checkbox). Toast success/error via sonner.
 */

const REFERRAL_ENDPOINT =
  "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/referral-submit";

interface Referrer {
  name: string;
  company: string;
  whatsapp: string;
}

interface Referral {
  id: string; // local-only pra render <li key>
  name: string;
  company: string;
  whatsapp: string;
  email: string;
}

function emptyReferral(): Referral {
  return {
    id: Math.random().toString(36).slice(2),
    name: "",
    company: "",
    whatsapp: "",
    email: "",
  };
}

export function ReferralForm() {
  const [referrer, setReferrer] = useState<Referrer>({
    name: "",
    company: "",
    whatsapp: "",
  });
  const [referrals, setReferrals] = useState<Referral[]>([emptyReferral()]);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  function updateReferrer<K extends keyof Referrer>(key: K, value: string) {
    setReferrer((prev) => ({ ...prev, [key]: value }));
  }

  function updateReferral(id: string, key: keyof Omit<Referral, "id">, value: string) {
    setReferrals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
    );
  }

  function addReferral() {
    setReferrals((prev) => [...prev, emptyReferral()]);
  }

  function removeReferral(id: string) {
    setReferrals((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    // Validação client-side
    const errors: string[] = [];
    if (!referrer.name.trim()) errors.push("Seu nome");
    if (!referrer.company.trim()) errors.push("Sua empresa");
    if (!referrer.whatsapp.trim()) errors.push("Seu WhatsApp");

    const validReferrals = referrals.filter(
      (r) => r.name.trim() && r.company.trim() && r.whatsapp.trim(),
    );
    if (validReferrals.length === 0) {
      errors.push("Pelo menos 1 indicação completa (nome, empresa, WhatsApp)");
    }
    if (!consent) {
      errors.push("Confirmação de consentimento");
    }

    if (errors.length > 0) {
      toast.error(`Preencha: ${errors.join(", ")}`);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        product: "business",
        referrer_name: referrer.name.trim(),
        referrer_company: referrer.company.trim(),
        referrer_whatsapp: referrer.whatsapp.trim(),
        referrals: validReferrals.map((r) => ({
          name: r.name.trim(),
          company: r.company.trim(),
          whatsapp: r.whatsapp.trim(),
          email: r.email.trim(),
        })),
      };

      const res = await fetch(REFERRAL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Falha (HTTP ${res.status})`);
      }

      const ok = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        created?: number;
        already_exists?: number;
      };

      toast.success(
        ok.created && ok.created > 0
          ? `Indicações enviadas com sucesso! (${ok.created} nova${ok.created > 1 ? "s" : ""})`
          : "Indicações enviadas com sucesso!",
      );

      // Reset
      setReferrer({ name: "", company: "", whatsapp: "" });
      setReferrals([emptyReferral()]);
      setConsent(false);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Não conseguimos enviar agora. Tente novamente.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* CARD 1: Quem está indicando */}
      <div className="rounded-2xl p-6 lg:p-7" style={cardStyle}>
        <p className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
          Seus dados
        </p>
        <h3 className="mt-2 text-[19px] lg:text-[21px] font-bold text-foreground tracking-tight">
          Quem está indicando?
        </h3>

        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <FieldText
            label="Seu nome"
            required
            value={referrer.name}
            onChange={(v) => updateReferrer("name", v)}
            placeholder="João Silva"
            autoComplete="name"
          />
          <FieldText
            label="Sua empresa"
            required
            value={referrer.company}
            onChange={(v) => updateReferrer("company", v)}
            placeholder="Nome da empresa"
            autoComplete="organization"
          />
        </div>

        <div className="mt-4">
          <FieldText
            label="Seu WhatsApp"
            required
            value={referrer.whatsapp}
            onChange={(v) => updateReferrer("whatsapp", v)}
            placeholder="(11) 99999-0000"
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* CARD 2: Quem você indica + add more */}
      <div className="rounded-2xl p-6 lg:p-7" style={cardStyle}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
              Indicações
            </p>
            <h3 className="mt-2 text-[19px] lg:text-[21px] font-bold text-foreground tracking-tight">
              Quem você quer indicar?
            </h3>
          </div>
          <button
            type="button"
            onClick={addReferral}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition-colors shrink-0"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "oklch(0.14 0.02 122)",
            }}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Adicionar mais
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {referrals.map((r, i) => (
            <div
              key={r.id}
              className="rounded-xl p-5"
              style={{
                backgroundColor: "oklch(0.12 0.012 122 / 0.55)",
                border: "1px solid oklch(0.55 0.06 122 / 0.35)",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 text-[12px] font-semibold">
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10.5px] font-bold"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "oklch(0.14 0.02 122)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-foreground">Indicado {i + 1}</span>
                </p>
                {referrals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReferral(r.id)}
                    aria-label={`Remover indicado ${i + 1}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                )}
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <FieldText
                  label="Nome completo"
                  required
                  value={r.name}
                  onChange={(v) => updateReferral(r.id, "name", v)}
                  placeholder="Maria Costa"
                  autoComplete="off"
                />
                <FieldText
                  label="Empresa"
                  required
                  value={r.company}
                  onChange={(v) => updateReferral(r.id, "company", v)}
                  placeholder="Nome da empresa"
                  autoComplete="off"
                />
                <FieldText
                  label="WhatsApp"
                  required
                  value={r.whatsapp}
                  onChange={(v) => updateReferral(r.id, "whatsapp", v)}
                  placeholder="(11) 99999-0000"
                  type="tel"
                  autoComplete="off"
                />
                <FieldText
                  label="E-mail"
                  value={r.email}
                  onChange={(v) => updateReferral(r.id, "email", v)}
                  placeholder="maria@empresa.com"
                  type="email"
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consentimento + submit */}
      <label
        className="flex items-start gap-3 rounded-xl p-4 cursor-pointer"
        style={cardStyle}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-primary)]"
        />
        <span className="text-[13px] text-sage leading-[1.55]">
          Confirmo as declarações acima e estou ciente de que informei os indicados sobre o
          compartilhamento dos seus dados com a IAplicada.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-bold transition-[transform,opacity,box-shadow] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "oklch(0.14 0.02 122)",
          boxShadow: "0 14px 32px -10px oklch(0.75 0.2 122 / 0.5)",
        }}
      >
        {loading ? "Enviando..." : "Enviar indicações"}
        {!loading && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
      </button>
    </form>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "oklch(0.16 0.02 122 / 0.7)",
  border: "1px solid oklch(0.55 0.06 122 / 0.28)",
};

interface FieldTextProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

function FieldText({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: FieldTextProps) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.14em] font-bold text-muted-foreground">
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--color-primary)" }}>
            ·
          </span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-[14.5px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-shadow"
        style={{
          backgroundColor: "oklch(0.10 0.012 122 / 0.7)",
          border: "1px solid oklch(0.55 0.06 122 / 0.35)",
        }}
      />
    </label>
  );
}
