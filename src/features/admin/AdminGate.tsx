import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Fingerprint, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
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
  const [configured, setConfigured] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [secret, setSecret] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setConfigured(Boolean(localStorage.getItem(HASH_KEY)));
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
    setBusy(true);
    try {
      const savedHash = localStorage.getItem(HASH_KEY);
      if (!savedHash) {
        if (secret !== confirm) {
          setError("As senhas não coincidem.");
          return;
        }
        localStorage.setItem(HASH_KEY, await hashSecret(secret));
        setConfigured(true);
      } else if ((await hashSecret(secret)) !== savedHash) {
        setError("Senha incorreta. Tente novamente.");
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "yes");
      setUnlocked(true);
      setSecret("");
      setConfirm("");
    } catch {
      setError("Não foi possível configurar o acesso neste navegador.");
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return <main className="min-h-screen bg-[#080808]" />;
  if (unlocked) return <AdminPanel />;

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#080808] text-white">
      <div className="absolute inset-0 -z-20 bg-cover bg-[center_38%]" style={{ backgroundImage: `url("${BACKDROP}")` }} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.94)_0%,rgba(0,0,0,.72)_42%,rgba(0,0,0,.55)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.86)_0%,transparent_55%,rgba(0,0,0,.42)_100%)]" />
      <div className="absolute left-0 top-0 -z-10 h-1 w-full bg-[#e50914]" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-12">
        <section className="max-w-2xl self-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black tracking-[-.12em] text-[#e50914] sm:text-4xl">101</span>
            <span className="h-8 w-px bg-white/30" />
            <span className="text-xs font-semibold uppercase tracking-[.32em] text-white/80">Tattoo & Body Piercing</span>
          </div>
          <div className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.24em] text-white/75 backdrop-blur">
            <Sparkles size={13} className="text-[#e50914]" /> Área exclusiva
          </div>
          <h1 className="mt-6 max-w-xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">
            A arte tem<br /><span className="text-[#e50914]">seu espaço.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/70 sm:text-base">
            Acesso profissional 101Clinic. Gerencie os atendimentos e prepare as fichas de tatuagem e piercing em um só lugar.
          </p>
          <div className="mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.22em] text-white/50">
            <span className="h-px w-10 bg-[#e50914]" /> Precisão · Arte · Cuidado
          </div>
        </section>

        <section className="w-full max-w-md justify-self-center rounded-2xl border border-white/15 bg-[#101010]/85 p-7 shadow-[0_24px_100px_rgba(0,0,0,.65)] backdrop-blur-xl sm:p-9 lg:justify-self-end">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#e50914]">101Clinic / Admin</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{configured ? "Bem-vindo de volta." : "Primeiro acesso."}</h2>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#e50914]/30 bg-[#e50914]/10 text-[#ff3540]">
              {configured ? <Fingerprint size={23} /> : <LockKeyhole size={23} />}
            </div>
          </div>
          <p className="mb-7 text-sm leading-6 text-white/55">
            {configured ? "Entre com suas credenciais para acessar o ambiente administrativo." : "Confirme o e-mail administrativo e crie sua senha neste aparelho."}
          </p>

          <form onSubmit={submit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">E-mail administrativo</span>
              <input autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/50" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">Senha</span>
              <input autoComplete={configured ? "current-password" : "new-password"} type="password" value={secret} onChange={(event) => setSecret(event.target.value)} placeholder="Mínimo de 8 caracteres" className="w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/50" required minLength={8} />
            </label>
            {!configured && <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">Confirmar senha</span>
              <input autoComplete="new-password" type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} placeholder="Digite a senha novamente" className="w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/50" required minLength={8} />
            </label>}
            {error && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">{error}</p>}
            <button disabled={busy} className="group flex w-full items-center justify-between rounded-lg bg-[#e50914] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#f6121d] disabled:cursor-wait disabled:opacity-60">
              <span>{busy ? "Aguarde..." : configured ? "Entrar no painel" : "Salvar senha e entrar"}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-7 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/55"><ShieldCheck size={14} className="text-[#e50914]" /> Informação de segurança</div>
            <p className="mt-2 text-[11px] leading-5 text-white/40">A senha fica armazenada somente neste navegador. Esta barreira visual não substitui autenticação segura no servidor; não utilize este mecanismo como proteção de dados sensíveis.</p>
          </div>
        </section>
        <p className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[.2em] text-white/35 lg:left-12">© 101Clinic Tattoo & Body Piercing</p>
      </div>
    </main>
  );
}
