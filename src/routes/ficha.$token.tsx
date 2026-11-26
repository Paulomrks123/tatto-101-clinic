import { useRef, useState, type PointerEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, MessageCircle, PenLine, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/ficha/$token")({
  head: () => ({ meta: [{ title: "Ficha de atendimento | 101Clinic" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: ClientForm,
});

type Answers = Record<string, string>;
function ClientForm() {
  const { token } = Route.useParams();
  const kind = token.toLowerCase() === "piercing" ? "piercing" : "tatuagem";
  const title = kind === "piercing" ? "Ficha de piercing" : "Ficha de tatuagem";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [signed, setSigned] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (key: string, value: string) => setAnswers((old) => ({ ...old, [key]: value }));
  const fields = [
    ["nome", "Nome completo *", "text", true], ["nascimento", "Data de nascimento *", "date", true],
    ["telefone", "Telefone / WhatsApp com DDD *", "tel", true], ["procedimento", kind === "piercing" ? "Local exato do piercing *" : "Região do corpo *", "text", true],
    ...(kind === "tatuagem" ? [["tema", "Tema ou descrição da tatuagem", "text", false], ["tamanho", "Tamanho aproximado", "text", false], ["cor", "Cores (preto/cinza, colorida ou indefinida)", "text", false]] : [["joia", "Joia e material pretendido (se definido)", "text", false]]),
  ] as const;
  const health = kind === "piercing"
    ? ["Possui alergia a metais, antissépticos, látex ou adesivos?", "Tem histórico de queloide, cicatrização difícil ou reação a joias?", "Há irritação, ferida ou infecção na região escolhida?", "Possui alguma condição de saúde relevante?", "Usa medicamentos atualmente?"]
    : ["Possui alergias conhecidas (pigmentos, cosméticos, látex, adesivos ou antissépticos)?", "Tem irritação, ferida ou alteração de pele na região?", "Possui alguma condição de saúde relevante?", "Usa medicamentos atualmente?", "Já teve reação a pigmentos ou produtos aplicados na pele?"];
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
  return <main className="min-h-screen bg-[#f3f5f7] px-4 py-8 text-slate-900 md:px-6">
    <article className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-sm md:p-9 print:max-w-none print:p-0 print:shadow-none">
      <header className="border-b border-slate-200 pb-6"><p className="font-mono text-xs uppercase tracking-[.25em] text-cyan-800">101Clinic Tattoo & Body Piercing</p><h1 className="mt-3 text-3xl font-semibold">{title}</h1><p className="mt-2 text-sm text-slate-500">Preencha com atenção. Os campos marcados com * são obrigatórios.</p></header>
      <form onSubmit={(e)=>{e.preventDefault();printForm();}} className="space-y-8">
        <section><h2 className="text-lg font-semibold">1. Identificação e procedimento</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{fields.map(([key,label,type,required])=><label key={key} className="block text-sm font-medium">{label}<input className={fieldClass} type={type} required={required} value={answers[key]||""} onChange={e=>set(key,e.target.value)}/></label>)}</div></section>
        <section><h2 className="text-lg font-semibold">2. Saúde e segurança</h2><p className="mt-1 text-xs text-slate-500">Responda conforme seu conhecimento. Se preferir, converse diretamente com o profissional.</p><div className="mt-4 space-y-4">{health.map((q,i)=><div key={q} className="rounded-xl border border-slate-200 p-4"><p className="text-sm font-medium">{q}</p><div className="mt-3 flex flex-wrap gap-4 text-sm">{["Não","Sim","Não sei / Prefiro conversar"].map(v=><label key={v} className="flex items-center gap-2"><input type="radio" name={`h${i}`} required value={v} checked={answers[`h${i}`]===v} onChange={()=>set(`h${i}`,v)}/>{v}</label>)}</div><textarea className={fieldClass} rows={2} placeholder="Detalhes (opcional)" value={answers[`d${i}`]||""} onChange={e=>set(`d${i}`,e.target.value)}/></div>)}</div><label className="mt-4 block text-sm font-medium">Observações que deseja informar<textarea className={fieldClass} rows={3} value={answers.obs||""} onChange={e=>set("obs",e.target.value)}/></label></section>
        <section><h2 className="text-lg font-semibold">3. Orientações e consentimento</h2><div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{kind==="piercing"?"Declaro que recebi explicações sobre o procedimento, materiais/joia, higiene, riscos, cicatrização e cuidados posteriores.":"Declaro que recebi explicações sobre o procedimento, materiais, higiene, riscos, cuidados antes e depois da tatuagem."} Tive oportunidade de fazer perguntas e esclarecer minhas dúvidas. As informações que forneci são verdadeiras e completas até onde sei. Autorizo a realização do procedimento descrito, após avaliação e confirmação presencial pelo profissional.</div><label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" required checked={accepted} onChange={e=>setAccepted(e.target.checked)} className="mt-1"/><span>Li e compreendi as informações acima e confirmo meu consentimento. *</span></label></section>
        <section><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">4. Assinatura</h2><button type="button" onClick={clearSignature} className="text-xs text-cyan-800 underline print:hidden">Limpar assinatura</button></div><p className="mt-1 text-xs text-slate-500">Assine com o dedo ou mouse no quadro abaixo.</p><canvas ref={canvasRef} width={900} height={220} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>drawing.current=false} onPointerCancel={()=>drawing.current=false} className="mt-3 h-40 w-full touch-none rounded-xl border border-dashed border-slate-300 bg-white"/><p className="mt-2 text-xs text-slate-500">Assinatura desenhada: {signed?"registrada neste formulário":"pendente"}</p><p className="mt-3 text-sm">Data: {new Date().toLocaleDateString("pt-BR")}</p></section>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><ShieldCheck className="mb-2" size={18}/> Este formulário não envia nem armazena suas respostas no site. Ao concluir, escolha “Salvar como PDF” na impressão do aparelho e envie o arquivo à 101Clinic pelo WhatsApp. A assinatura desenhada é uma confirmação visual e pode não atender, sozinha, a todos os requisitos legais.</div>
        <div className="flex flex-col gap-3 sm:flex-row print:hidden"><button type="submit" disabled={!signed||!accepted} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-40"><Download size={17}/> Salvar ficha em PDF</button><a href="https://wa.me/?text=Olá%2C%20preenchi%20minha%20ficha%20da%20101Clinic.%20Vou%20anexar%20o%20PDF%20nesta%20conversa." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold"><MessageCircle size={17}/> Abrir WhatsApp para enviar</a></div>
        {saved&&<p className="text-sm text-emerald-700 print:hidden"><CheckCircle2 className="mr-2 inline" size={16}/> Na tela de impressão, selecione “Salvar como PDF”. Depois anexe o arquivo na conversa do WhatsApp.</p>}
      </form>
      <footer className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-400 print:mt-5">101Clinic · Documento preenchido pelo cliente · Guarde o PDF em local protegido.</footer>
      <div className="mt-6 print:hidden"><Link to="/" className="text-sm text-cyan-800 underline">Voltar ao site</Link></div>
    </article>
  </main>;
}
