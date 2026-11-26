import { ArrowUpRight, Award } from "lucide-react";
import { waLink } from "@/components/site/data";
import tatuador from "@/assets/tatuador-101clinic.jpg.asset.json";

export function AlexandreBio() {
  return (
    <section id="alexandre" aria-label="Sobre Alexandre Coelho" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-12 md:px-10">
        <figure className="reveal-blur md:col-span-5">
          <div className="surface-premium overflow-hidden rounded-3xl p-2">
            <img src={tatuador.url} alt="Imagem provisória do profissional da 101Clinic, substituível pelo retrato de Alexandre Coelho" width={900} height={1100} loading="lazy" className="aspect-[4/5] w-full rounded-[1.3rem] object-cover" />
          </div>
          <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Foto provisória · substitua pela foto oficial</figcaption>
        </figure>
        <div className="md:col-span-7 md:pl-8">
          <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon"><span className="h-px w-10 bg-neon" /> 02 — Nossa história</p>
          <h2 className="reveal mt-6 font-display text-5xl leading-[.95] md:text-7xl">Alexandre <span className="italic text-neon">Coelho.</span></h2>
          <div className="reveal mt-5 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-sm text-neon"><Award size={17}/> 25 anos de profissão</div>
          <p className="reveal mt-7 text-lg leading-8 text-muted-foreground">Com 25 anos de experiência no universo da arte corporal, Alexandre Coelho construiu sua trajetória com dedicação, técnica e compromisso com cada trabalho. À frente da 101Clinic Tattoo & Body Piercing, valoriza a expressão individual, o atendimento personalizado e a atenção aos detalhes.</p>
          <p className="reveal mt-4 text-lg leading-8 text-muted-foreground">Para Alexandre, cada projeto começa com uma boa conversa e respeito à história de quem escolhe transformar uma ideia em arte na pele.</p>
          <a href={waLink("Olá, Alexandre! Gostaria de conversar sobre um projeto na 101Clinic.")} target="_blank" rel="noopener" className="reveal btn-metal mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold">Conheça a 101Clinic <ArrowUpRight size={16}/></a>
        </div>
      </div>
    </section>
  );
}
