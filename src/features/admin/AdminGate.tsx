import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import { AdminPanel } from "./AdminPanel";

const ADMIN_EMAIL = "101clinic@gmail.com";
const HASH_KEY = "101clinic-admin-pin-hash-v1";
const SESSION_KEY = "101clinic-admin-unlocked-v1";
const BACKDROP = "https://images.unsplash.com/photo-1753260724749-25110c0ce91c?auto=format&fit=crop&fm=jpg&q=85&w=2400";

async function hashSecret(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function AdminGate() {
  const [registered, setRegistered] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [secret, setSecret] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // O aparelho só tem conta quando existe uma senha guardada nele.
  const creatingAccount = !registered;

  useEffect(() => {
    setRegistered(Boolean(localStorage.getItem(HASH_KEY)));
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setReady(true);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError("E-mail administrativo incorreto.");
      return;
    }
    if (secret.length < 8) {
      setError("Use uma senha com pelo menos 8 caracteres.");
      return;
    }
    if (creatingAccount && confirm !== secret) {
      setError("As senhas não coincidem.");
      return;
    }

    setBusy(true);
    try {
      const savedHash = localStorage.getItem(HASH_KEY);
      if (!savedHash) {
        localStorage.setItem(HASH_KEY, await hashSecret(secret));
        setRegistered(true);
      } else if ((await hashSecret(secret)) !== savedHash) {
        setError("Senha incorreta. Tente novamente.");
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "yes");
      setUnlocked(true);
      setSecret("");
      setConfirm("");
    } catch {
      setError("Não foi possível acessar neste navegador. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return <main className="min-h-screen bg-[#080808]" />;
  if (unlocked) return <AdminPanel />;

  return (
    <main
      data-admin-login="true"
      data-account-mode={creatingAccount ? "signup" : "login"}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-5 py-10 text-white"
    >
      <div className="absolute inset-0 -z-20 bg-cover bg-[center_38%]" style={{ backgroundImage: `url("${BACKDROP}")` }} />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.68),rgba(0,0,0,.18)_55%,rgba(0,0,0,.48))]" />

      <section className="w-full max-w-sm rounded-2xl border border-white/25 bg-white/[0.10] p-7 shadow-[0_20px_80px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-9">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[.32em] text-white/75">101Clinic</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            {creatingAccount ? "Criar conta administrativa" : "Área administrativa"}
          </h1>
          <p className="mt-3 rounded-lg border border-amber-200/30 bg-amber-950/40 px-3 py-2 text-left text-xs leading-5 text-amber-100">
            {creatingAccount
              ? "Este aparelho ainda não está cadastrado. Informe o e-mail administrativo e crie uma senha com pelo menos 8 caracteres. A conta fica salva somente neste aparelho e este bloqueio não oferece proteção real. Não utilize para guardar dados pessoais ou informações de saúde."
              : "Este aparelho já está cadastrado. Use a senha criada nele. A senha fica salva somente neste aparelho e este bloqueio não oferece proteção real. Não utilize para guardar dados pessoais ou informações de saúde."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-white/80">E-mail</span>
            <input
              autoComplete="username"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu e-mail"
              className="w-full rounded-xl border border-white/25 bg-black/25 px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/45 focus:border-white/65 focus:bg-black/35"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-white/80">Senha</span>
            <input
              autoComplete={creatingAccount ? "new-password" : "current-password"}
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder={creatingAccount ? "Crie uma senha" : "Digite sua senha"}
              className="w-full rounded-xl border border-white/25 bg-black/25 px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/45 focus:border-white/65 focus:bg-black/35"
              required
              minLength={8}
            />
          </label>

          {creatingAccount && (
            <label className="block">
              <span className="mb-2 block text-xs font-medium text-white/80">Confirmar senha</span>
              <input
                autoComplete="new-password"
                type="password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                placeholder="Repita a senha"
                className="w-full rounded-xl border border-white/25 bg-black/25 px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/45 focus:border-white/65 focus:bg-black/35"
                required
                minLength={8}
              />
            </label>
          )}

          {error && <p role="alert" className="rounded-lg border border-red-300/35 bg-red-950/45 px-3 py-2.5 text-sm text-red-100">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-cyan-200/55 bg-cyan-400/20 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_32px_-12px_rgba(34,211,238,.65)] backdrop-blur-xl transition hover:border-cyan-100/80 hover:bg-cyan-400/35 active:scale-[.99] disabled:cursor-wait disabled:opacity-60"
          >
            <span>{busy ? "Aguarde..." : creatingAccount ? "Criar conta" : "Entrar"}</span>
            {creatingAccount ? <UserPlus size={17} /> : <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />}
          </button>

          <p className="text-center text-xs text-white/55">
            {creatingAccount
              ? "Ao criar a conta, ela vale apenas para este aparelho."
              : "Este aparelho já tem conta cadastrada."}
          </p>
        </form>
      </section>
    </main>
  );
}
