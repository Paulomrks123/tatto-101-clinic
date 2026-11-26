import { createFileRoute, Link } from "@tanstack/react-router";
import { LockKeyhole, ShieldCheck } from "lucide-react";
export const Route = createFileRoute("/ficha/$token")({
  head: () => ({ meta: [{ title: "Ficha de atendimento | 101Clinic" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: PublicFormPlaceholder,
});
function PublicFormPlaceholder() {
  return <main className="flex min-h-screen items-center justify-center bg-[#090b10] px-5 py-12 text-[#f5f5f2]"><section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[.03] p-7 text-center md:p-10"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-200"><LockKeyhole/></div><p className="mt-6 font-mono text-[10px] uppercase tracking-[.3em] text-cyan-200">101Clinic · Atendimento</p><h1 className="mt-3 font-display text-4xl">Ficha de anamnese</h1><p className="mt-4 text-sm leading-6 text-white/55">O formulário individual será habilitado quando a autenticação, validação do link e armazenamento seguro estiverem conectados.</p><div className="mt-7 flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-left"><ShieldCheck className="mt-0.5 shrink-0 text-cyan-200"/><p className="text-xs leading-5 text-white/50">Não envie informações de saúde, documentos ou dados pessoais por este endereço enquanto o formulário não estiver ativo.</p></div><Link to="/" className="mt-8 inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm hover:bg-white/5">Voltar ao site</Link></section></main>;
}
