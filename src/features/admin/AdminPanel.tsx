import { useState } from "react";
import { ArrowLeft, Copy, ExternalLink, LogOut, MessageCircle, ShieldCheck } from "lucide-react";

const SESSION_KEY = "101clinic-admin-unlocked-v1";
type Kind = "tatuagem" | "piercing";

export function AdminPanel() {
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState("");
  const [kind, setKind] = useState<Kind | null>(null);
  const [details, setDetails] = useState({ cliente: "", procedimento: "", descricao: "", tamanho: "", complemento: "" });

  function set(key: keyof typeof details, value: string) {
    setDetails((old) => ({ ...old, [key]: value }));
  }

  function buildUrl() {
    if (!kind) return "";
    const params = new URLSearchParams();
    // Somente dados do procedimento. Nunca incluir anamnese, saúde ou documentos pessoais.
    for (const [key, value] of Object.entries(details)) {
      if (value.trim()) params.set(key, value.trim());
    }
    const query = params.toString();
    return `${window.location.origin}/ficha/${kind}${query ? `?${query}` : ""}`;
  }

  function validPhone() {
    let number = phone.replace(/\D/g, "");
    if (number.length === 10 || number.length === 11) number = `55${number}`;
    if (number.length < 12 || number.length > 15) {
      window.alert("Digite um número válido com DDD. Exemplo: 64999999999.");
      return "";
    }
    return number;
  }

  function share() {
    const number = validPhone();
    if (!number || !kind) return;
    const url = buildUrl();
    const label = kind === "tatuagem" ? "ficha de tatuagem" : "ficha de piercing";
    const message = `Olá${details.cliente.trim() ? `, ${details.cliente.trim()}` : ""}! A 101Clinic preparou sua ${label}. Confira os detalhes, complete seus dados, responda à anamnese e assine: ${url}`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  async function copy() {
    const url = buildUrl();
    try { await navigator.clipboard.writeText(url); setCopied(true); }
    catch { window.prompt("Copie o link da ficha:", url); }
  }

  function logout() { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); }

  const isTattoo = kind === "tatuagem";
  return <main className="min-h-screen bg-[#090b10] px-5 py-10 text-[#f5f5f2] md:px-8">
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-7">
        <div><p className="font-mono text-[10px] uppercase tracking-[.3em] text-cyan-200">101Clinic · Área restrita</p><h1 className="mt-2 font-display text-4xl">Painel administrativo</h1><p className="mt-2 text-sm text-white/50">Prepare a ficha antes de enviar ao cliente.</p></div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 hover:bg-white/5"><LogOut size={16}/> Sair</button>
      </header>
      <section className="mt-8 rounded-2xl border border-cyan-200/20 bg-cyan-200/[.06] p-5">
        <div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-cyan-200"/><div><h2 className="font-semibold">Como funciona</h2><p className="mt-1 text-sm leading-6 text-white/60">Você informa os detalhes do procedimento; o cliente recebe a ficha pré-preenchida, confere ou altera os dados, completa a anamnese, assina e salva em PDF para devolver pelo WhatsApp. Não há banco de dados.</p></div></div>
      </section>

      {!kind ? <section className="mt-8">
        <h2 className="text-xl font-semibold">Escolha o tipo de atendimento</h2>
        <p className="mt-2 text-sm text-white/50">Selecione uma opção para abrir a ficha de preparação.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <button onClick={() => setKind("tatuagem")} className="rounded-2xl border border-white/10 bg-white/[.03] p-7 text-left transition hover:border-cyan-200/50 hover:bg-cyan-200/[.06]"><span className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Atendimento 01</span><span className="mt-3 block font-display text-3xl">Tatuagem</span><span className="mt-2 block text-sm leading-6 text-white/50">Região do corpo, tema, tamanho e cores.</span><span className="mt-6 inline-flex rounded-xl bg-cyan-200 px-4 py-3 text-sm font-bold text-[#081015]">Preparar ficha</span></button>
          <button onClick={() => setKind("piercing")} className="rounded-2xl border border-white/10 bg-white/[.03] p-7 text-left transition hover:border-cyan-200/50 hover:bg-cyan-200/[.06]"><span className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Atendimento 02</span><span className="mt-3 block font-display text-3xl">Piercing</span><span className="mt-2 block text-sm leading-6 text-white/50">Local, tipo de joia e material.</span><span className="mt-6 inline-flex rounded-xl bg-cyan-200 px-4 py-3 text-sm font-bold text-[#081015]">Preparar ficha</span></button>
        </div>
      </section> : <section className="mt-8 rounded-2xl border border-white/10 bg-white/[.03] p-5 md:p-7">
        <button onClick={() => { setKind(null); setCopied(false); }} className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-200"><ArrowLeft size={16}/> Voltar às opções</button>
        <p className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Preparação do atendimento</p>
        <h2 className="mt-2 font-display text-3xl">Ficha de {kind}</h2>
        <p className="mt-2 text-sm text-white/50">Preencha os dados que o cliente talvez não saiba informar. Ele poderá conferir e alterar tudo.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">Nome do cliente (opcional)<input value={details.cliente} onChange={e=>set("cliente",e.target.value)} placeholder="Nome para personalizar a mensagem" className="mt-2 w-full rounded-xl border border-white/15 bg-[#090b10] px-4 py-3 text-sm outline-none focus:border-cyan-200/60"/></label>
          <label className="block text-sm font-medium">{isTattoo ? "Onde será a tatuagem?" : "Onde será o piercing?"}<input value={details.procedimento} onChange={e=>set("procedimento",e.target.value)} placeholder={isTattoo ? "Ex.: antebraço direito" : "Ex.: orelha, tragus, nariz"} className="mt-2 w-full rounded-xl border border-white/15 bg-[#090b10] px-4 py-3 text-sm outline-none focus:border-cyan-200/60"/></label>
          <label className="block text-sm font-medium">{isTattoo ? "Tema / descrição da tatuagem" : "Tipo de piercing / joia"}<input value={details.descricao} onChange={e=>set("descricao",e.target.value)} placeholder={isTattoo ? "Ex.: flores, lettering, realismo" : "Ex.: nostril, argola, labret"} className="mt-2 w-full rounded-xl border border-white/15 bg-[#090b10] px-4 py-3 text-sm outline-none focus:border-cyan-200/60"/></label>
          <label className="block text-sm font-medium">{isTattoo ? "Tamanho aproximado" : "Espessura / tamanho da joia"}<input value={details.tamanho} onChange={e=>set("tamanho",e.target.value)} placeholder={isTattoo ? "Ex.: 10 cm" : "Ex.: 1,2 mm / 8 mm"} className="mt-2 w-full rounded-xl border border-white/15 bg-[#090b10] px-4 py-3 text-sm outline-none focus:border-cyan-200/60"/></label>
          <label className="block text-sm font-medium sm:col-span-2">{isTattoo ? "Cores / estilo" : "Material da joia"}<input value={details.complemento} onChange={e=>set("complemento",e.target.value)} placeholder={isTattoo ? "Ex.: preto e cinza, colorida, fine line" : "Ex.: titânio grau implante, ouro"} className="mt-2 w-full rounded-xl border border-white/15 bg-[#090b10] px-4 py-3 text-sm outline-none focus:border-cyan-200/60"/></label>
        </div>
        <div className="mt-7 border-t border-white/10 pt-6">
          <label htmlFor="client-whatsapp" className="block text-sm font-semibold">WhatsApp do cliente</label>
          <p className="mt-1 text-xs leading-5 text-white/50">Digite o DDD e o número. Exemplo: 64999999999. O código +55 será acrescentado automaticamente.</p>
          <input id="client-whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(64) 99999-9999" className="mt-3 w-full max-w-md rounded-xl border border-white/15 bg-[#090b10] px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-cyan-200/60"/>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={share} className="inline-flex items-center gap-2 rounded-xl bg-cyan-200 px-5 py-3 text-sm font-bold text-[#081015]"><MessageCircle size={17}/> Enviar ficha pelo WhatsApp</button>
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"><Copy size={16}/>{copied ? "Link copiado" : "Copiar link"}</button>
            <a href={buildUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70"><ExternalLink size={15}/> Visualizar ficha</a>
          </div>
        </div>
        <p className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4 text-xs leading-5 text-amber-100/80">Privacidade: somente os detalhes do procedimento são enviados no link. Não coloque aqui dados pessoais, informações médicas, alergias, medicamentos ou respostas de saúde. Esses campos serão preenchidos diretamente pelo cliente na ficha.</p>
      </section>}
      <p className="mt-8 text-xs leading-5 text-white/35">Sem backend, os links são acessíveis a quem os receber e os dados pré-preenchidos ficam visíveis na URL. A senha do painel é uma trava local deste navegador, não autenticação segura de servidor.</p>
    </div>
  </main>;
}
