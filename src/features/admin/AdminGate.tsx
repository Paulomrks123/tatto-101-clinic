import { useEffect, useState, type FormEvent } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { AdminPanel } from "./AdminPanel";

const ADMIN_EMAIL = "101clinic@gmail.com";
const HASH_KEY = "101clinic-admin-pin-hash-v1";
const SESSION_KEY = "101clinic-admin-unlocked-v1";

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
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "yes");
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

  if (!ready) return <main className="min-h-screen bg-[#090b10]" />;
  if (unlocked) return <AdminPanel />;

  return <main className="flex min-h-screen items-center justify-center bg-[#090b10] px-5 py-10 text-[#f5f5f2]">
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#10141d] p-7 shadow-2xl md:p-9">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-200"><LockKeyhole size={25}/></div>
      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[.3em] text-cyan-200">101Clinic · Acesso administrativo</p>
      <h1 className="mt-3 text-center font-display text-3xl">{configured ? "Entrar no painel" : "Criar senha de acesso"}</h1>
      <p className="mt-3 text-center text-sm leading-6 text-white/50">{configured ? "Entre com seu e-mail e a senha definida neste aparelho." : "Confirme o e-mail administrativo e defina uma senha para este aparelho."}</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block"><span className="mb-2 block text-xs text-white/60">E-mail</span><input autoComplete="username" type="email" value={email} onChange={(event)=>setEmail(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#080b11] px-4 py-3 text-sm outline-none focus:border-cyan-200/50" required/></label>
        <label className="block"><span className="mb-2 block text-xs text-white/60">Senha (mínimo 8 caracteres)</span><input autoComplete={configured ? "current-password" : "new-password"} type="password" value={secret} onChange={(event)=>setSecret(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#080b11] px-4 py-3 text-sm outline-none focus:border-cyan-200/50" required minLength={8}/></label>
        {!configured && <label className="block"><span className="mb-2 block text-xs text-white/60">Confirmar senha</span><input autoComplete="new-password" type="password" value={confirm} onChange={(event)=>setConfirm(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#080b11] px-4 py-3 text-sm outline-none focus:border-cyan-200/50" required minLength={8}/></label>}
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-cyan-200 px-5 py-3 text-sm font-bold text-[#081015] hover:bg-cyan-100 disabled:opacity-50">{busy ? "Aguarde..." : configured ? "Entrar" : "Salvar senha e entrar"}</button>
      </form>
      <div className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4">
        <div className="flex gap-2 text-xs font-semibold text-amber-100"><ShieldCheck size={16}/> Proteção local limitada</div>
        <p className="mt-2 text-xs leading-5 text-white/50">O e-mail é fixo, mas a senha fica apenas neste navegador. Sem autenticação de servidor, essa trava pode ser contornada por alguém com acesso técnico ao aparelho. Não use este recurso como segurança para dados armazenados — as fichas não são salvas no site.</p>
      </div>
    </section>
  </main>;
}
