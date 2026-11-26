import { useState } from "react";
import { Copy, ExternalLink, LogOut, MessageCircle, ShieldCheck } from "lucide-react";

const SESSION_KEY = "101clinic-admin-unlocked-v1";
const base = typeof window !== "undefined" ? window.location.origin : "";

export function AdminPanel() {
  const [copied, setCopied] = useState("");
  const links = [
    { id: "tatuagem", title: "Ficha de tatuagem", detail: "Anamnese, detalhes do procedimento e consentimento." },
    { id: "piercing", title: "Ficha de piercing", detail: "Alergias, cicatrização, joia e consentimento." },
  ];
  async function copy(id: string) {
    const url = `${window.location.origin}/ficha/${id}`;
    try { await navigator.clipboard.writeText(url); setCopied(id); }
    catch { window.prompt("Copie o link da ficha:", url); }
  }
  function share(id: string) {
    const url = `${window.location.origin}/ficha/${id}`;
    const message = `Olá! Para seu atendimento na 101Clinic, preencha a ficha abaixo, assine e salve em PDF. Depois, envie o PDF de volta pelo WhatsApp. ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  function logout() { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); }
  return <main className="min-h-screen bg-[#090b10] px-5 py-10 text-[#f5f5f2] md:px-8">
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-7">
        <div><p className="font-mono text-[10px] uppercase tracking-[.3em] text-cyan-200">101Clinic · Área restrita</p><h1 className="mt-2 font-display text-4xl">Painel administrativo</h1><p className="mt-2 text-sm text-white/50">Compartilhe a ficha correta com cada cliente.</p></div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 hover:bg-white/5"><LogOut size={16}/> Sair</button>
      </header>
      <section className="mt-8 rounded-2xl border border-cyan-200/20 bg-cyan-200/[.06] p-5">
        <div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-cyan-200"/><div><h2 className="font-semibold">Fluxo sem banco de dados</h2><p className="mt-1 text-sm leading-6 text-white/60">O cliente preenche a ficha no próprio aparelho, assina, usa “Salvar como PDF” e envia o arquivo pelo WhatsApp. As respostas não são armazenadas pelo site.</p></div></div>
      </section>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {links.map((item) => <article key={item.id} className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Formulário do cliente</p><h2 className="mt-3 font-display text-3xl">{item.title}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-white/50">{item.detail}</p>
          <div className="mt-6 flex flex-wrap gap-3"><button onClick={()=>share(item.id)} className="inline-flex items-center gap-2 rounded-xl bg-cyan-200 px-4 py-3 text-sm font-bold text-[#081015]"><MessageCircle size={16}/> Enviar pelo WhatsApp</button><button onClick={()=>copy(item.id)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"><Copy size={16}/>{copied===item.id ? "Link copiado" : "Copiar link"}</button><a href={`/ficha/${item.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70"><ExternalLink size={15}/> Testar ficha</a></div>
        </article>)}
      </div>
      <p className="mt-8 text-xs leading-5 text-white/35">A senha desta tela é uma trava local deste navegador, não autenticação de servidor. Não compartilhe o endereço /admin. Sem backend, qualquer pessoa que conheça os links públicos pode abrir os modelos; não há identificação individual, controle de status ou armazenamento central.</p>
    </div>
  </main>;
}
