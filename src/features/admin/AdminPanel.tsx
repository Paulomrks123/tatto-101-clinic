import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, ClipboardList, Clock3, Download, FileCheck2, FilePlus2, FileSpreadsheet, FileText, LockKeyhole, LogOut, Menu, Printer, Search, Settings2, ShieldCheck, Trash2, Users, X } from "lucide-react";
import { ADMIN_SECTIONS, type FormStatus } from "./types";

type LocalForm = {
  id: string; clientName: string; phone: string; procedure: string; ageGroup: "adulto" | "menor";
  birthDate: string; responsibleName: string; responsiblePhone: string; allergies: string;
  healthConditions: string; medications: string; observations: string; consent: boolean;
  status: FormStatus; createdAt: string;
};
const STORAGE_KEY = "101clinic-admin-forms-v1";
const statusLabel: Record<FormStatus, string> = { pendente: "Pendente", enviado: "Link enviado", recebido: "Recebido", expirado: "Expirado" };
const emptyForm = { clientName: "", phone: "", procedure: "Tatuagem", ageGroup: "adulto" as const, birthDate: "", responsibleName: "", responsiblePhone: "", allergies: "", healthConditions: "", medications: "", observations: "", consent: false };

function StatusPill({ status }: { status: FormStatus }) {
  const styles: Record<FormStatus, string> = {
    pendente: "bg-amber-400/10 text-amber-300 border-amber-300/20",
    enviado: "bg-sky-400/10 text-sky-300 border-sky-300/20",
    recebido: "bg-emerald-400/10 text-emerald-300 border-emerald-300/20",
    expirado: "bg-zinc-400/10 text-zinc-300 border-zinc-300/20",
  };
  return <span className={`rounded-full border px-3 py-1 text-xs ${styles[status]}`}>{statusLabel[status]}</span>;
}

function downloadFile(name: string, content: string, type: string) {
  const blob = new Blob([content], { type: `${type};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = name; link.click();
  URL.revokeObjectURL(url);
}
function csvCell(value: unknown) { return `"${String(value ?? "").replace(/"/g, '""')}"`; }

export function AdminPanel() {
  const [section, setSection] = useState("overview");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const [forms, setForms] = useState<LocalForm[]>([]);
  const [ready, setReady] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setForms(JSON.parse(raw) as LocalForm[]);
    } catch { setError("Não foi possível ler os dados salvos neste navegador."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(forms)); }
      catch { setError("Armazenamento local cheio ou indisponível. Exporte seus dados e libere espaço."); }
    }
  }, [forms, ready]);

  const filtered = useMemo(() => forms.filter((form) => `${form.clientName} ${form.procedure} ${form.id} ${form.phone}`.toLowerCase().includes(query.toLowerCase())), [forms, query]);
  const active = ADMIN_SECTIONS.find((item) => item.id === section);
  const received = forms.filter((form) => form.status === "recebido").length;
  const pending = forms.filter((form) => form.status === "pendente" || form.status === "enviado").length;
  const minors = forms.filter((form) => form.ageGroup === "menor").length;

  function openNew() { setEditingId(null); setDraft(emptyForm); setError(""); setShowEditor(true); }
  function editForm(form: LocalForm) {
    setEditingId(form.id);
    setDraft({ clientName: form.clientName, phone: form.phone, procedure: form.procedure, ageGroup: form.ageGroup, birthDate: form.birthDate, responsibleName: form.responsibleName, responsiblePhone: form.responsiblePhone, allergies: form.allergies, healthConditions: form.healthConditions, medications: form.medications, observations: form.observations, consent: form.consent });
    setError(""); setShowEditor(true);
  }
  function saveForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.clientName.trim() || !draft.phone.trim() || !draft.consent) { setError("Informe nome, telefone e confirme o consentimento."); return; }
    if (draft.ageGroup === "menor" && (!draft.responsibleName.trim() || !draft.responsiblePhone.trim())) { setError("Para cadastro de menor, informe os dados do responsável."); return; }
    const now = new Date().toISOString();
    if (editingId) {
      setForms((current) => current.map((item) => item.id === editingId ? { ...item, ...draft } : item));
    } else {
      setForms((current) => [{ ...draft, id: `101-${Date.now().toString(36).toUpperCase()}`, status: "recebido", createdAt: now }, ...current]);
    }
    setShowEditor(false); setError("");
  }
  function exportJson() { downloadFile(`101clinic-backup-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify({ exportedAt: new Date().toISOString(), forms }, null, 2), "application/json"); }
  function exportCsv() {
    const headers = ["ID","Cliente","Telefone","Procedimento","Faixa etária","Nascimento","Responsável","Telefone responsável","Alergias","Condições de saúde","Medicamentos","Observações","Consentimento","Status","Criado em"];
    const rows = forms.map((f) => [f.id,f.clientName,f.phone,f.procedure,f.ageGroup,f.birthDate,f.responsibleName,f.responsiblePhone,f.allergies,f.healthConditions,f.medications,f.observations,f.consent ? "Sim" : "Não",statusLabel[f.status],f.createdAt]);
    downloadFile(`101clinic-relatorio-${new Date().toISOString().slice(0,10)}.csv`, "\uFEFF" + [headers,...rows].map((row) => row.map(csvCell).join(";")).join("\n"), "text/csv");
  }
  function printReport() { window.print(); }
  function removeForm(id: string) {
    if (window.confirm("Excluir esta ficha deste navegador? Esta ação não pode ser desfeita.")) setForms((current) => current.filter((item) => item.id !== id));
  }

  const fieldClass = "w-full rounded-xl border border-white/10 bg-[#080b11] px-4 py-3 text-sm text-white outline-none focus:border-cyan-200/50";
  const labelClass = "mb-2 block text-xs text-white/55";

  return <main className="min-h-screen bg-[#090b10] text-[#f5f5f2]">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#0d1017] p-6 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between"><a href="/" className="font-display text-2xl">101<span className="text-cyan-300">CLINIC</span></a><button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X /></button></div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[.25em] text-white/40">Painel administrativo</p>
      <nav className="mt-12 space-y-2" aria-label="Administração">
        {ADMIN_SECTIONS.map((item) => <button key={item.id} onClick={() => { setSection(item.id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${section === item.id ? "bg-cyan-300/10 text-cyan-200" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
          {item.id === "overview" ? <Activity size={18}/> : item.id === "forms" ? <ClipboardList size={18}/> : item.id === "minors" ? <Users size={18}/> : <Settings2 size={18}/>}<span>{item.label}</span>
        </button>)}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[.03] p-4"><div className="flex items-center gap-2 text-sm text-cyan-200"><ShieldCheck size={17}/> Privacidade primeiro</div><p className="mt-2 text-xs leading-5 text-white/45">Dados salvos somente neste navegador. Exporte backups regularmente.</p></div>
      <a href="/" className="mt-5 flex items-center gap-2 text-sm text-white/50 hover:text-white"><LogOut size={16}/> Voltar ao site</a>
    </aside>
    {mobileOpen && <button aria-label="Fechar menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden"/>}
    <section className="min-h-screen lg:pl-72">
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-[#090b10]/90 px-5 backdrop-blur-xl md:px-10 print:hidden">
        <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu/></button><div><p className="text-sm text-white/40">101Clinic / Administração</p><h1 className="font-display text-xl md:text-2xl">{active?.label}</h1></div></div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] font-medium text-cyan-200">Armazenamento local</span>
      </header>
      <div className="mx-auto max-w-7xl p-5 md:p-10">
        {showNotice && <div className="mb-8 flex flex-col justify-between gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-4 sm:flex-row sm:items-center print:hidden"><div className="flex gap-3"><LockKeyhole className="mt-1 shrink-0 text-amber-200"/><p className="text-sm leading-6 text-white/70"><strong className="text-amber-100">Atenção: modo sem servidor.</strong> Os registros ficam neste navegador e dispositivo. Não há login, sincronização ou recuperação automática. Não utilize para guardar dados reais de saúde ou documentos até implantar segurança adequada.</p></div><button onClick={() => setShowNotice(false)} className="text-xs text-white/50 hover:text-white">Fechar</button></div>}
        {section === "overview" && <>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Central de atendimento</p><h2 className="mt-2 font-display text-4xl md:text-5xl">Visão geral</h2><p className="mt-2 text-sm text-white/45">Indicadores calculados a partir das fichas deste navegador.</p></div><button onClick={openNew} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-200 px-5 py-3 text-sm font-bold text-[#081015] hover:bg-cyan-100 print:hidden"><FilePlus2 size={17}/> Nova ficha</button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{label:"Total de fichas",value:forms.length,icon:ClipboardList},{label:"Fichas recebidas",value:received,icon:FileCheck2},{label:"Aguardando",value:pending,icon:Clock3},{label:"Menores cadastrados",value:minors,icon:Users}].map((card)=><article key={card.label} className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><div className="flex items-center justify-between text-white/45"><span className="text-xs">{card.label}</span><card.icon size={18}/></div><p className="mt-5 font-display text-4xl">{String(card.value).padStart(2,"0")}</p><p className="mt-1 text-[11px] text-white/30">Dados locais</p></article>)}</div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.025] p-5 md:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h3 className="font-display text-2xl">Atividade recente</h3><p className="mt-1 text-xs text-white/40">Últimos registros cadastrados neste dispositivo</p></div><button onClick={()=>setSection("forms")} className="text-sm text-cyan-200 hover:text-white print:hidden">Ver todas <ArrowUpRight className="inline" size={15}/></button></div>
          {forms.length ? <div className="mt-6 space-y-3">{forms.slice(0,5).map((form)=><div key={form.id} className="flex flex-col justify-between gap-3 rounded-xl border border-white/5 bg-black/20 p-4 sm:flex-row sm:items-center"><div><p className="text-sm font-medium">{form.clientName}</p><p className="mt-1 text-xs text-white/40">{form.procedure} · {new Date(form.createdAt).toLocaleString("pt-BR")}</p></div><StatusPill status={form.status}/></div>)}</div> : <p className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-white/40">Nenhuma ficha cadastrada. Clique em “Nova ficha” para começar.</p>}</div>
        </>}
        {section === "forms" && <>
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h2 className="font-display text-4xl">Fichas e anamneses</h2><p className="mt-2 text-sm text-white/45">Cadastre, consulte, edite e exporte os registros locais.</p></div><button onClick={openNew} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-200 px-4 py-3 text-sm font-bold text-[#081015] print:hidden"><FilePlus2 size={16}/> Criar ficha</button></div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row print:hidden"><div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-4"><Search size={17} className="text-white/35"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar por cliente, telefone ou ID..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30"/></div><button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5"><FileSpreadsheet size={16}/> CSV</button><button onClick={printReport} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5"><Printer size={16}/> Relatório / PDF</button></div>
          <div className="overflow-hidden rounded-2xl border border-white/10"><div className="hidden grid-cols-4 gap-4 bg-white/[.04] px-5 py-3 text-[10px] uppercase tracking-wider text-white/40 md:grid"><span>Cliente</span><span>Procedimento</span><span>Status</span><span>Cadastro</span></div>
          {filtered.map((form)=><div key={form.id} className="grid gap-3 border-t border-white/10 px-5 py-4 md:grid-cols-4 md:items-center"><div><p className="text-sm">{form.clientName}</p><p className="mt-1 text-[10px] text-white/35">{form.id} · {form.phone}</p></div><span className="text-sm text-white/60">{form.procedure}{form.ageGroup === "menor" ? " · menor" : ""}</span><span><StatusPill status={form.status}/></span><div className="flex items-center justify-between gap-2"><span className="text-xs text-white/45">{new Date(form.createdAt).toLocaleDateString("pt-BR")}</span><div className="flex gap-2 print:hidden"><button onClick={()=>editForm(form)} className="rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5">Abrir</button><button onClick={()=>removeForm(form.id)} aria-label="Excluir ficha" className="rounded-lg border border-red-400/20 p-2 text-red-300 hover:bg-red-400/10"><Trash2 size={14}/></button></div></div></div>)}
          {!filtered.length && <p className="p-8 text-center text-sm text-white/40">{forms.length ? "Nenhuma ficha corresponde à busca." : "Nenhuma ficha cadastrada ainda."}</p>}</div>
        </>}
        {section === "minors" && <div className="max-w-3xl"><h2 className="font-display text-4xl">Menores e responsáveis</h2><p className="mt-2 text-sm text-white/45">Registros marcados como menor de idade e seus responsáveis.</p><div className="mt-7 space-y-4">{forms.filter((f)=>f.ageGroup==="menor").map((form)=><article key={form.id} className="rounded-xl border border-white/10 bg-white/[.03] p-5"><p className="font-medium">{form.clientName}</p><p className="mt-1 text-xs text-white/45">Responsável: {form.responsibleName || "Não informado"} · {form.responsiblePhone}</p><p className="mt-3 text-xs text-white/50">{form.procedure} · {form.id}</p></article>)}{!minors&&<p className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-white/40">Nenhum cadastro de menor encontrado.</p>}</div><p className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4 text-xs leading-5 text-amber-100/70">A existência de um cadastro não comprova autorização legal. Verifique legislação aplicável e políticas do estabelecimento antes de realizar qualquer procedimento.</p></div>}
        {section === "settings" && <div className="max-w-3xl"><h2 className="font-display text-4xl">Backup e relatórios</h2><p className="mt-2 text-sm text-white/45">Exporte uma cópia dos registros ou imprima um relatório.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><button onClick={exportJson} className="rounded-2xl border border-white/10 bg-white/[.03] p-5 text-left hover:bg-white/[.06]"><Download className="mb-4 text-cyan-200"/><p className="font-medium">Baixar backup JSON</p><p className="mt-2 text-xs leading-5 text-white/45">Cópia completa para guardar e importar futuramente.</p></button><button onClick={exportCsv} className="rounded-2xl border border-white/10 bg-white/[.03] p-5 text-left hover:bg-white/[.06]"><FileSpreadsheet className="mb-4 text-cyan-200"/><p className="font-medium">Baixar planilha CSV</p><p className="mt-2 text-xs leading-5 text-white/45">Abra no Excel, LibreOffice ou Google Sheets.</p></button><button onClick={printReport} className="rounded-2xl border border-white/10 bg-white/[.03] p-5 text-left hover:bg-white/[.06]"><Printer className="mb-4 text-cyan-200"/><p className="font-medium">Gerar relatório / PDF</p><p className="mt-2 text-xs leading-5 text-white/45">Abre a impressão do navegador; escolha “Salvar como PDF”.</p></button><button onClick={()=>setSection("forms")} className="rounded-2xl border border-white/10 bg-white/[.03] p-5 text-left hover:bg-white/[.06]"><FileText className="mb-4 text-cyan-200"/><p className="font-medium">Consultar fichas</p><p className="mt-2 text-xs leading-5 text-white/45">Veja, pesquise e edite todos os cadastros deste dispositivo.</p></button></div><p className="mt-6 text-xs leading-5 text-white/40">Total de registros locais: {forms.length}. O backup não é automático: faça download regularmente e guarde-o em local protegido.</p></div>}
        {error && !showEditor && <p role="alert" className="mt-5 text-sm text-red-300">{error}</p>}
        <footer className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-[10px] text-white/30 sm:flex-row sm:justify-between"><span>101Clinic · Painel administrativo</span><span>Armazenamento local do navegador · sem sincronização</span></footer>
      </div>
    </section>
    {showEditor && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"><form onSubmit={saveForm} className="my-6 w-full max-w-3xl rounded-3xl border border-white/10 bg-[#10141d] p-6 md:p-8"><div className="mb-7 flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-200">Cadastro local</p><h2 className="mt-2 font-display text-3xl">{editingId ? "Editar ficha" : "Nova ficha de atendimento"}</h2></div><button type="button" onClick={()=>setShowEditor(false)} className="rounded-lg p-2 text-white/50 hover:bg-white/5" aria-label="Fechar"><X/></button></div>
      <div className="grid gap-4 sm:grid-cols-2"><label><span className={labelClass}>Nome completo *</span><input className={fieldClass} value={draft.clientName} onChange={(e)=>setDraft({...draft,clientName:e.target.value})} required/></label><label><span className={labelClass}>Telefone / WhatsApp *</span><input className={fieldClass} value={draft.phone} onChange={(e)=>setDraft({...draft,phone:e.target.value})} required/></label><label><span className={labelClass}>Procedimento</span><select className={fieldClass} value={draft.procedure} onChange={(e)=>setDraft({...draft,procedure:e.target.value})}><option>Tatuagem</option><option>Body piercing</option><option>Retoque</option><option>Outro</option></select></label><label><span className={labelClass}>Faixa etária</span><select className={fieldClass} value={draft.ageGroup} onChange={(e)=>setDraft({...draft,ageGroup:e.target.value as "adulto"|"menor"})}><option value="adulto">Maior de idade</option><option value="menor">Menor de idade</option></select></label><label><span className={labelClass}>Data de nascimento</span><input type="date" className={fieldClass} value={draft.birthDate} onChange={(e)=>setDraft({...draft,birthDate:e.target.value})}/></label>
      {draft.ageGroup==="menor" && <><label><span className={labelClass}>Nome do responsável *</span><input className={fieldClass} value={draft.responsibleName} onChange={(e)=>setDraft({...draft,responsibleName:e.target.value})} required/></label><label><span className={labelClass}>Telefone do responsável *</span><input className={fieldClass} value={draft.responsiblePhone} onChange={(e)=>setDraft({...draft,responsiblePhone:e.target.value})} required/></label></>}
      <label className="sm:col-span-2"><span className={labelClass}>Alergias conhecidas</span><textarea className={fieldClass} rows={2} value={draft.allergies} onChange={(e)=>setDraft({...draft,allergies:e.target.value})}/></label><label className="sm:col-span-2"><span className={labelClass}>Condições de saúde relevantes</span><textarea className={fieldClass} rows={2} value={draft.healthConditions} onChange={(e)=>setDraft({...draft,healthConditions:e.target.value})}/></label><label className="sm:col-span-2"><span className={labelClass}>Medicamentos em uso</span><textarea className={fieldClass} rows={2} value={draft.medications} onChange={(e)=>setDraft({...draft,medications:e.target.value})}/></label><label className="sm:col-span-2"><span className={labelClass}>Observações</span><textarea className={fieldClass} rows={3} value={draft.observations} onChange={(e)=>setDraft({...draft,observations:e.target.value})}/></label></div>
      <label className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4"><input type="checkbox" checked={draft.consent} onChange={(e)=>setDraft({...draft,consent:e.target.checked})} className="mt-1 accent-cyan-200"/><span className="text-xs leading-5 text-white/65">Confirmo que este cadastro é demonstrativo e que fui informado sobre o armazenamento local neste dispositivo. *</span></label>
      {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={()=>setShowEditor(false)} className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70">Cancelar</button><button type="submit" className="rounded-xl bg-cyan-200 px-6 py-3 text-sm font-bold text-[#081015] hover:bg-cyan-100">Salvar ficha neste dispositivo</button></div>
    </form></div>}
  </main>;
}
