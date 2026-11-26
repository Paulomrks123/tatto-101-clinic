import { useMemo, useState } from "react";
import { Activity, ArrowUpRight, ClipboardList, Clock3, FileCheck2, FilePlus2, LockKeyhole, LogOut, Menu, Search, Settings2, ShieldCheck, Users, X } from "lucide-react";
import { ADMIN_SECTIONS, type FormStatus } from "./types";
import { DEMO_FORMS } from "./demo-data";

const statusLabel: Record<FormStatus, string> = { pendente: "Pendente", enviado: "Link enviado", recebido: "Recebido", expirado: "Expirado" };

function StatusPill({ status }: { status: FormStatus }) {
  const styles: Record<FormStatus, string> = {
    pendente: "bg-amber-400/10 text-amber-300 border-amber-300/20",
    enviado: "bg-sky-400/10 text-sky-300 border-sky-300/20",
    recebido: "bg-emerald-400/10 text-emerald-300 border-emerald-300/20",
    expirado: "bg-zinc-400/10 text-zinc-300 border-zinc-300/20",
  };
  return <span className={`rounded-full border px-3 py-1 text-xs ${styles[status]}`}>{statusLabel[status]}</span>;
}

export function AdminPanel() {
  const [section, setSection] = useState("overview");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const filtered = useMemo(() => DEMO_FORMS.filter((form) => `${form.clientName} ${form.procedure} ${form.id}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const active = ADMIN_SECTIONS.find((item) => item.id === section);

  return <main className="min-h-screen bg-[#090b10] text-[#f5f5f2]">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#0d1017] p-6 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between"><a href="/" className="font-display text-2xl">101<span className="text-cyan-300">CLINIC</span></a><button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X /></button></div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[.25em] text-white/40">Painel administrativo</p>
      <nav className="mt-12 space-y-2" aria-label="Administração">
        {ADMIN_SECTIONS.map((item) => <button key={item.id} onClick={() => { setSection(item.id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${section === item.id ? "bg-cyan-300/10 text-cyan-200" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
          {item.id === "overview" ? <Activity size={18}/> : item.id === "forms" ? <ClipboardList size={18}/> : item.id === "minors" ? <Users size={18}/> : <Settings2 size={18}/>}<span>{item.label}</span>
        </button>)}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[.03] p-4"><div className="flex items-center gap-2 text-sm text-cyan-200"><ShieldCheck size={17}/> Privacidade primeiro</div><p className="mt-2 text-xs leading-5 text-white/45">Área preparada para autenticação e políticas de acesso no servidor.</p></div>
      <a href="/" className="mt-5 flex items-center gap-2 text-sm text-white/50 hover:text-white"><LogOut size={16}/> Voltar ao site</a>
    </aside>
    {mobileOpen && <button aria-label="Fechar menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden"/>}
    <section className="min-h-screen lg:pl-72">
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-[#090b10]/90 px-5 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu/></button><div><p className="text-sm text-white/40">101Clinic / Administração</p><h1 className="font-display text-xl md:text-2xl">{active?.label}</h1></div></div>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[11px] font-medium text-amber-200">Modo demonstração</span>
      </header>
      <div className="mx-auto max-w-7xl p-5 md:p-10">
        {showNotice && <div className="mb-8 flex flex-col justify-between gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-4 sm:flex-row sm:items-center"><div className="flex gap-3"><LockKeyhole className="mt-1 shrink-0 text-amber-200"/><p className="text-sm leading-6 text-white/70"><strong className="text-amber-100">Ambiente sem banco conectado.</strong> Os itens abaixo são exemplos fictícios. Login, gravação e envio de fichas só serão ativados após configurar autenticação e banco com regras de segurança.</p></div><button onClick={() => setShowNotice(false)} className="text-xs text-white/50 hover:text-white">Fechar</button></div>}
        {section === "overview" && <>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Central de atendimento</p><h2 className="mt-2 font-display text-4xl md:text-5xl">Visão geral</h2><p className="mt-2 text-sm text-white/45">Acompanhe o fluxo de fichas e autorizações.</p></div><button onClick={() => setSection("forms")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-200 px-5 py-3 text-sm font-bold text-[#081015] hover:bg-cyan-100"><FilePlus2 size={17}/> Nova ficha <ArrowUpRight size={16}/></button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{label:"Fichas recebidas",value:"01",icon:FileCheck2},{label:"Links enviados",value:"01",icon:ArrowUpRight},{label:"Aguardando resposta",value:"01",icon:Clock3},{label:"Autorizações de menores",value:"01",icon:Users}].map((card)=><article key={card.label} className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><div className="flex items-center justify-between text-white/45"><span className="text-xs">{card.label}</span><card.icon size={18}/></div><p className="mt-5 font-display text-4xl">{card.value}</p><p className="mt-1 text-[11px] text-white/30">Dados ilustrativos</p></article>)}</div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.025] p-5 md:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h3 className="font-display text-2xl">Atividade recente</h3><p className="mt-1 text-xs text-white/40">Registros fictícios para demonstração da interface</p></div><button onClick={()=>setSection("forms")} className="text-sm text-cyan-200 hover:text-white">Ver todas <ArrowUpRight className="inline" size={15}/></button></div><div className="mt-6 space-y-3">{DEMO_FORMS.map((form)=><div key={form.id} className="flex flex-col justify-between gap-3 rounded-xl border border-white/5 bg-black/20 p-4 sm:flex-row sm:items-center"><div><p className="text-sm font-medium">{form.clientName}</p><p className="mt-1 text-xs text-white/40">{form.procedure} · {form.createdAt}</p></div><StatusPill status={form.status}/></div>)}</div></div>
        </>}
        {section === "forms" && <><div className="mb-7"><h2 className="font-display text-4xl">Fichas e anamneses</h2><p className="mt-2 text-sm text-white/45">Criação de links individuais, acompanhamento e conferência.</p></div><div className="mb-5 flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-4"><Search size={17} className="text-white/35"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar ficha demonstrativa..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30"/></div><button disabled className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/35" title="Disponível após conectar o banco"><FilePlus2 size={16}/> Criar ficha</button></div><div className="overflow-hidden rounded-2xl border border-white/10"><div className="hidden grid-cols-4 gap-4 bg-white/[.04] px-5 py-3 text-[10px] uppercase tracking-wider text-white/40 md:grid"><span>Cliente</span><span>Procedimento</span><span>Status</span><span>Validade</span></div>{filtered.map((form)=><div key={form.id} className="grid gap-3 border-t border-white/10 px-5 py-4 md:grid-cols-4 md:items-center"><div><p className="text-sm">{form.clientName}</p><p className="mt-1 text-[10px] text-white/35">{form.id}</p></div><span className="text-sm text-white/60">{form.procedure}{form.ageGroup === "menor" ? " · menor" : ""}</span><span><StatusPill status={form.status}/></span><span className="text-xs text-white/45">Até {form.expiresAt}</span></div>)}</div>{filtered.length===0&&<p className="p-8 text-center text-sm text-white/40">Nenhuma ficha demonstrativa encontrada.</p>}</>}
        {section === "minors" && <div className="max-w-3xl"><h2 className="font-display text-4xl">Menores e responsáveis</h2><p className="mt-2 text-sm text-white/45">Fluxo de cadastro e conferência de autorização.</p><div className="mt-7 space-y-4">{["Identificação do menor e data de nascimento","Dados do responsável legal e vínculo","Documento e confirmação de identidade","Consentimento específico e assinatura do responsável","Revisão presencial e registro de conferência"].map((item,i)=><div key={item} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-200/10 text-sm text-cyan-200">{i+1}</span><p className="self-center text-sm text-white/75">{item}</p></div>)}</div><p className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4 text-xs leading-5 text-amber-100/70">O fluxo é apenas estrutural. A permissão legal para cada procedimento, documentação exigida e regras aplicáveis devem ser validadas antes de aceitar qualquer autorização.</p></div>}
        {section === "settings" && <div className="max-w-3xl"><h2 className="font-display text-4xl">Configurações</h2><p className="mt-2 text-sm text-white/45">Pontos preparados para parametrização futura.</p><div className="mt-7 space-y-3">{[["Validade dos links","Prazo configurável e expiração no servidor"],["Modelos de anamnese","Tatuagem e body piercing"],["Consentimento LGPD","Finalidade, retenção, acesso e direitos do titular"],["Assinatura","Captura em tela sensível ao toque e trilha de auditoria"],["Acesso administrativo","Autenticação, perfis e registro de atividade"]].map(([title,desc])=><div key={title} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-white/40">{desc}</p></div>)}</div></div>}
        <footer className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-[10px] text-white/30 sm:flex-row sm:justify-between"><span>101Clinic · Painel administrativo</span><span>Estrutura local de interface · sem persistência de dados</span></footer>
      </div>
    </section>
  </main>;
}
