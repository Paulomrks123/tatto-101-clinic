import { useRef, useState, type PointerEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, MessageCircle, ShieldCheck } from "lucide-react";
import { waLink } from "@/components/site/data";
import { Ampersand } from "@/components/site/SplitText";

export const Route = createFileRoute("/ficha/$token")({
  head: () => ({ meta: [{ title: "Ficha de atendimento | 101Clinic" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: ClientForm,
});

type Answers = Record<string, string>;
function ClientForm() {
  const { token } = Route.useParams();
  const normalizedToken = token.toLowerCase();
  const validToken = normalizedToken === "piercing" || normalizedToken === "tatuagem";
  const kind = normalizedToken === "piercing" ? "piercing" : "tatuagem";
  const title = kind === "piercing" ? "Ficha de piercing" : "Ficha de tatuagem";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [answers, setAnswers] = useState<Answers>(() => {
    const params = typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);
    return {
      nome: params.get("cliente") || "",
      procedimento: params.get("procedimento") || "",
      ...(kind === "tatuagem"
        ? { tema: params.get("descricao") || "", tamanho: params.get("tamanho") || "", cor: params.get("complemento") || "" }
        : { joia: [params.get("descricao"), params.get("tamanho"), params.get("complemento")].filter(Boolean).join(" · ") }),
    };
  });
  const [signed, setSigned] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (key: string, value: string) => setAnswers((old) => ({ ...old, [key]: value }));
  const fields = [
    ["nome", "Nome completo *", "text", true], ["nascimento", "Data de nascimento *", "date", true],
    ["telefone", "Telefone / WhatsApp com DDD *", "tel", true],
    ["responsavel", "Nome do responsável legal (se aplicável)", "text", false],
    ["procedimento", kind === "piercing" ? "Local exato do piercing *" : "Região do corpo *", "text", true],
    ...(kind === "tatuagem" ? [["tema", "Tema ou descrição da tatuagem", "text", false], ["tamanho", "Tamanho aproximado", "text", false], ["cor", "Cores / estilo", "text", false]] : [["joia", "Joia, tamanho e material pretendido", "text", false]]),
  ] as const;
  const health = [
    "Já teve convulsões ou episódios de desmaio?",
    "Possui doença infectocontagiosa ou hepatite?",
    "Possui vitiligo ou lúpus?",
    "Tem hipotensão (pressão baixa), anemia ou problema cardíaco?",
    "Possui problema de pele, alteração na cicatrização ou tendência a queloide?",
    "Está em tratamento médico ou faz acompanhamento de saúde atualmente?",
    "Fez cirurgia recentemente?",
    "Possui alergias (medicamentos, metais, pigmentos, cosméticos, látex, adesivos ou antissépticos)?",
    "Está grávida ou amamentando?",
    "Usa ou usou recentemente Roacutan (isotretinoína)?",
    "Tem ou já teve diagnóstico de câncer?",
    "Possui diabetes? Se sim, está controlada?",
    "Teve reação anterior a tatuagem, piercing, pigmentos ou joias?",
    "Está com ferida, irritação ou infecção na região do procedimento?",
    "Alimentou-se nas últimas 24 horas e está se sentindo bem para realizar o procedimento?",
    ...(kind === "piercing" ? ["Tem alergia conhecida a algum material de joia, especialmente níquel?"] : ["Possui alguma condição de saúde adicional que considera importante informar?"]),
  ];
  function pointerDown(e: PointerEvent<HTMLCanvasElement>) {
    const canvas=canvasRef.current; if(!canvas)return; drawing.current=true; canvas.setPointerCapture(e.pointerId);
    const ctx=canvas.getContext("2d"); if(!ctx)return; const r=canvas.getBoundingClientRect(); ctx.beginPath(); ctx.moveTo((e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height);
  }
  function pointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if(!drawing.current)return; const canvas=canvasRef.current; const ctx=canvas?.getContext("2d"); if(!canvas||!ctx)return; const r=canvas.getBoundingClientRect(); ctx.lineWidth=3; ctx.lineCap="round"; ctx.strokeStyle="#0f172a"; ctx.lineTo((e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height); ctx.stroke(); setSigned(true);
  }
  function clearSignature(){const c=canvasRef.current;const ctx=c?.getContext("2d");if(c&&ctx)ctx.clearRect(0,0,c.width,c.height);setSigned(false);}
  function printForm(){setSaved(true);window.setTimeout(()=>window.print(),100);}
  const fieldClass="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-600";
  if (!validToken) return <main className="flex min-h-screen items-center justify-center bg-[#f3f5f7] px-5 text-slate-900"><section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-semibold">Ficha não encontrada</h1><p className="mt-3 text-sm text-slate-600">O tipo de ficha informado é inválido. Solicite um novo link à 101Clinic.</p><Link to="/" className="mt-6 inline-block text-sm text-cyan-800 underline">Voltar ao site</Link></section></main>;

  return <main className="min-h-screen bg-[#f3f5f7] px-4 py-8 text-slate-900 md:px-6">
    <article className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-sm md:p-9 print:max-w-none print:p-0 print:shadow-none">
      <header className="border-b border-slate-200 pb-6"><p className="font-mono text-xs uppercase tracking-[.25em] text-cyan-800">101Clinic Tattoo <Ampersand /> Body Piercing</p><h1 className="mt-3 text-3xl font-semibold">{title}</h1><p className="mt-2 text-sm text-slate-500">A equipe preparou alguns detalhes do procedimento. Confira e altere se necessário. Os campos marcados com * são obrigatórios.</p></header>
      <form onSubmit={(e)=>{e.preventDefault();printForm();}} className="space-y-8">
        <section><h2 className="text-lg font-semibold">1. Identificação e procedimento</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{fields.map(([key,label,type,required])=><label key={key} className="block text-sm font-medium">{label}<input className={fieldClass} type={type} required={required} value={answers[key]||""} onChange={e=>set(key,e.target.value)}/></label>)}</div></section>
        <section><h2 className="text-lg font-semibold">2. Saúde e segurança</h2><p className="mt-1 text-xs text-slate-500">Responda conforme seu conhecimento. Se preferir, converse diretamente com o profissional.</p><div className="mt-4 space-y-4">{health.map((q,i)=><div key={q} className="rounded-xl border border-slate-200 p-4"><p className="text-sm font-medium">{q}</p><div className="mt-3 flex flex-wrap gap-4 text-sm">{["Não","Sim","Não sei / Prefiro conversar"].map(v=><label key={v} className="flex items-center gap-2"><input type="radio" name={`h${i}`} required value={v} checked={answers[`h${i}`]===v} onChange={()=>set(`h${i}`,v)}/>{v}</label>)}</div><textarea className={fieldClass} rows={2} placeholder="Detalhes (opcional)" value={answers[`d${i}`]||""} onChange={e=>set(`d${i}`,e.target.value)}/></div>)}</div><label className="mt-4 block text-sm font-medium">Observações que deseja informar<textarea className={fieldClass} rows={3} value={answers.obs||""} onChange={e=>set("obs",e.target.value)}/></label></section>
        <section><h2 className="text-lg font-semibold">3. Orientações e consentimento</h2><div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">Declaro que compreendo que a tatuagem é permanente e que qualquer procedimento de tatuagem ou piercing deve seguir as normas de biossegurança. Recebi explicações sobre o procedimento, materiais utilizados, higiene, riscos relevantes, cicatrização e cuidados antes e depois. Tive oportunidade de fazer perguntas e esclarecer minhas dúvidas. Declaro que as respostas desta ficha são verdadeiras e completas até onde sei e comprometo-me a seguir as orientações de cuidados fornecidas pela 101Clinic. Autorizo a realização do procedimento descrito, após avaliação e confirmação presencial pelo profissional. As respostas são um autorrelato e não substituem avaliação de saúde.</div><label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" required checked={accepted} onChange={e=>setAccepted(e.target.checked)} className="mt-1"/><span>Li e compreendi as informações acima e confirmo meu consentimento. *</span></label></section>
        <section><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">4. Assinatura</h2><button type="button" onClick={clearSignature} className="text-xs text-cyan-800 underline print:hidden">Limpar assinatura</button></div><p className="mt-1 text-xs text-slate-500">Assine com o dedo ou mouse no quadro abaixo.</p><p className="mt-2 rounded-lg bg-cyan-50 p-3 text-xs leading-5 text-cyan-950">Depois de salvar a ficha em PDF, se a clínica tiver solicitado a conferência de identidade, envie também uma foto legível do CPF ou RG pelo WhatsApp. Evite compartilhar documentos pessoais se isso não for necessário.</p><canvas ref={canvasRef} width={900} height={220} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>drawing.current=false} onPointerCancel={()=>drawing.current=false} className="mt-3 h-40 w-full touch-none rounded-xl border border-dashed border-slate-300 bg-white"/><p className="mt-2 text-xs text-slate-500">Assinatura desenhada: {signed?"registrada neste formulário":"pendente"}</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-sm">Data do preenchimento<input className={fieldClass} type="date" value={answers.dataFicha||new Date().toISOString().slice(0,10)} onChange={e=>set("dataFicha",e.target.value)}/></label><label className="text-sm">Profissional responsável<input className={fieldClass} value={answers.profissional||""} onChange={e=>set("profissional",e.target.value)} placeholder="Nome do profissional"/></label></div><p className="mt-3 text-sm">Data: {new Date().toLocaleDateString("pt-BR")} · Horário: {new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</p><p className="mt-3 text-sm">Assinatura do responsável legal (quando aplicável): ____________________________________</p></section>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><ShieldCheck className="mb-2" size={18}/> Este formulário não envia nem armazena suas respostas no site. Primeiro escolha “Salvar como PDF” na impressão do aparelho. Depois, use o botão “Enviar ficha via WhatsApp” para abrir a conversa com a 101Clinic e anexe manualmente o PDF e, se solicitado, a foto do documento. A assinatura desenhada é uma confirmação visual e pode não atender, sozinha, a todos os requisitos legais.</div>
        <div className="flex flex-col gap-3 sm:flex-row print:hidden"><button type="submit" disabled={!signed||!accepted} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-40"><Download size={17}/> Salvar ficha em PDF</button><a href={waLink(`Olá, 101Clinic! Preenchi e assinei minha ficha de ${kind}. Estou anexando o PDF. ${"Se solicitado pela clínica, também enviarei a foto do meu documento de identificação."}`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold"><MessageCircle size={17}/> Enviar ficha via WhatsApp</a></div>
        {saved&&<p className="text-sm text-emerald-700 print:hidden"><CheckCircle2 className="mr-2 inline" size={16}/> Na tela de impressão, selecione “Salvar como PDF”. Depois anexe o arquivo na conversa do WhatsApp.</p>}
      </form>
      <footer className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-400 print:mt-5">101Clinic · Documento preenchido pelo cliente · Guarde o PDF em local protegido.</footer>
      <div className="mt-6 print:hidden"><Link to="/" className="text-sm text-cyan-800 underline">Voltar ao site</Link></div>
    </article>
  </main>;
}
