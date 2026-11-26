import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, Clock, Phone, Star, Menu, X, MessageCircle, Instagram, Sparkles, ShieldCheck, PenTool, HeartHandshake } from "lucide-react";
import hero from "@/assets/hero-tattoo.jpg";
import fineline from "@/assets/fineline.jpg";
import sketch from "@/assets/sketch.jpg";
import fachada from "@/assets/gaivota_fachada.jpg.asset.json";
import lounge from "@/assets/gaivota_lounge.jpg.asset.json";
import { BIZ, waLink, WA_DEFAULT } from "@/components/site/data";
import { useScrollFx } from "@/components/site/useScrollFx";
import { SplitText } from "@/components/site/SplitText";
import { TattooCarousel } from "@/components/site/TattooCarousel";
import { StudioVideo } from "@/components/site/StudioVideo";

const TITLE = "Gaivota Tattoo Estúdio | Tatuagem e Piercing em Icaraí, Niterói";
const DESC =
  "Estúdio de tatuagem e piercing em Icaraí, Niterói. Desenhos autorais, lounge acolhedor e nota 5,0 no Google. Agende pelo WhatsApp.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Gaivota Tattoo Estúdio Icaraí",
  telephone: BIZ.phoneE164,
  url: BIZ.site,
  address: { "@type": "PostalAddress", streetAddress: "Av. Roberto Silveira, 368", addressLocality: "Niterói", addressRegion: "RJ", postalCode: "24230-161", addressCountry: "BR" },
  geo: { "@type": "GeoCoordinates", latitude: -22.905657, longitude: -43.104448 },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "18:00" }],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: BIZ.reviews },
  sameAs: [BIZ.facebook, BIZ.instagram],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

const NAV = [
  ["Estúdio", "#estudio"],
  ["Serviços", "#servicos"],
  ["Processo", "#processo"],
  ["Dúvidas", "#faq"],
  ["Contato", "#contato"],
] as const;

function Seagull({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" aria-hidden="true">
      <path
        pathLength={1}
        className={animate ? "needle-line" : ""}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 120 C 60 70, 120 50, 175 95 C 185 103, 192 110, 200 112 C 208 110, 215 103, 225 95 C 280 50, 340 70, 390 120 M 175 95 C 150 80, 120 82, 95 92 M 225 95 C 250 80, 280 82, 305 92 M 200 112 C 196 124, 200 136, 206 140 M 200 112 l 10 -6"
      />
    </svg>
  );
}

function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon">
      <span className="h-px w-10 bg-neon" /> {n} — {children}
    </p>
  );
}



function Index() {
  useScrollFx();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-0 max-w-full overflow-x-clip bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-10">
          <a href="#topo" className="glass flex items-center gap-2 rounded-full px-4 py-2 font-display text-2xl">
            <Seagull animate={false} className="w-7 text-neon" /> Gaivota
          </a>
          <nav className="glass hidden items-center gap-1 rounded-full p-1.5 text-sm md:flex" aria-label="Principal">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="rounded-full px-4 py-2 text-foreground/75 transition hover:bg-foreground/10 hover:text-foreground">{l}</a>
            ))}
          </nav>
          <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metal hidden px-6 py-3 text-sm font-bold md:inline-flex">Agendar</a>
          <button onClick={() => setOpen(!open)} className="glass rounded-full p-3 md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <nav className="glass animate-in fade-in slide-in-from-top-4 mx-4 rounded-3xl p-6 md:hidden" aria-label="Mobile">
            {NAV.map(([l, h], i) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-3 font-display text-3xl">
                {l} <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </a>
            ))}
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metal mt-5 flex justify-center px-5 py-4 font-bold">Agendar pelo WhatsApp</a>
          </nav>
        )}
      </header>

      {/* HERO — 5 planos de parallax */}
      <section id="topo" className="grain relative min-h-[100svh] overflow-hidden">
        {/* 1. atmosfera */}
        <div data-parallax="0.45" data-mouse="-12" className="absolute -inset-[10%] will-change-transform">
          <img src={hero} alt="" width={1600} height={1008} className="anim-ken-burns h-full w-full object-cover opacity-40" />
        </div>
        {/* 2. luz */}
        <div data-parallax="0.25" data-mouse="18" className="pointer-events-none absolute -inset-[20%] will-change-transform">
          <div className="aurora h-full w-full opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
        {/* 3. arcos */}
        <div data-parallax="-0.1" data-mouse="-28" className="pointer-events-none absolute right-[-20%] top-[12%] h-[620px] w-[620px] md:right-[-6%]">
          <div className="anim-spin-slow absolute inset-0">
            <div className="arc-ring inset-0" />
            <div className="arc-ring inset-[14%] opacity-70" />
            <div className="arc-ring inset-[28%] opacity-50" />
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-neon shadow-glow" />
          </div>
        </div>
        {/* 4. foto real flutuante */}
        <figure data-parallax="-0.18" data-mouse="34" className="absolute right-[6%] top-[22%] hidden w-[340px] lg:block xl:w-[400px]">
          <div className="tilt surface-premium relative rounded-3xl p-2">
            <img src={fachada.url} alt="Fachada do Gaivota Tattoo na Av. Roberto Silveira, 368" width={759} height={576} className="rounded-2xl object-cover" />
            <span className="tilt-glare" />
            <figcaption className="flex items-center justify-between px-3 py-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="anim-pulse-ring absolute inset-0 rounded-full bg-neon" /><span className="relative h-2 w-2 rounded-full bg-neon" /></span>Av. Roberto Silveira, 368</span>
              <span>Foto real · Google</span>
            </figcaption>
          </div>
        </figure>
        {/* 5. tipografia */}
        <div data-parallax="-0.05" className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-16 md:px-10 md:pb-16 md:pt-32">
          <div data-mouse="10" className="anim-glide mb-4 w-40 text-neon md:w-60"><Seagull /></div>
          <p className="anim-fade-up font-mono text-[11px] uppercase tracking-[0.35em] text-foreground/70" style={{ animationDelay: ".3s" }}>
            Tatuagem · Piercing · Icaraí, Niterói
          </p>
          <SplitText as="h1" delay={400} className="is-in mt-4 max-w-4xl font-display text-[clamp(2.4rem,9vw,8.5rem)] leading-[0.88] tracking-tight" parts={["Sua ideia vira", { em: "traço." }, "O traço vira", { em: "história." }]} />
          <p className="anim-fade-up mt-4 max-w-lg text-sm text-foreground/75 md:text-lg" style={{ animationDelay: "1.3s" }}>
            Desenhos personalizados, atendimento próximo e um lounge para você ficar à vontade, a poucas quadras da praia de Icaraí.
          </p>
          <div className="anim-fade-up mt-6 flex flex-wrap items-center gap-3 md:mt-8" style={{ animationDelay: "1.5s" }}>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metal inline-flex items-center gap-2 px-7 py-4 font-bold">
              <MessageCircle size={18} /> Conversar sobre minha tattoo
            </a>
            <a href="#servicos" className="btn-chrome inline-flex items-center gap-2 px-6 py-4 text-sm font-medium">
              Ver o que fazemos <ArrowUpRight size={16} />
            </a>
          </div>
          <a href={BIZ.maps} target="_blank" rel="noopener" className="anim-fade-up glass mt-6 inline-flex w-fit items-center gap-3 rounded-full px-5 py-3 text-sm md:mt-10" style={{ animationDelay: "1.7s" }}>
            <span className="flex text-neon">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</span>
            <span><strong>{BIZ.rating}</strong> no Google · {BIZ.reviews} avaliações</span>
          </a>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative -rotate-2 scale-105 overflow-hidden border-y border-border bg-cobalt py-4 text-cream shadow-glow" aria-hidden="true">
        <div className="anim-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl italic md:text-4xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Desenho autoral", "Fine line", "Retoques", "Piercing", "Atendimento personalizado", "Ambiente higienizado", "Icaraí · Niterói"].map((t) => (
              <span key={k + t} className="flex items-center gap-10">{t}<Sparkles size={20} className="text-neon" /></span>
            )),
          )}
        </div>
      </div>

      <div className="relative z-10 bg-background pt-10 md:pt-16">
        <StudioVideo />
      </div>

      {/* ESTÚDIO — fotos reais */}
      <section id="estudio" className="relative overflow-hidden py-28 md:py-40">
        <div data-parallax="-0.08" className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-cobalt/25 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Eyebrow n="01">O estúdio</Eyebrow>
            <SplitText className="mt-6 font-display text-5xl leading-[0.92] md:text-7xl" parts={["Arte com calma,", { em: "cuidado" }, "e mão firme."]} />
            <div className="mt-8 space-y-5 text-lg text-muted-foreground">
              <p className="reveal">O Gaivota Tattoo fica na Avenida Roberto Silveira, em Icaraí. Cada projeto começa numa conversa: entendemos o que você quer contar e transformamos isso num desenho pensado para o seu corpo.</p>
              <p className="reveal">Quem passou por aqui costuma destacar o atendimento atencioso, a qualidade do resultado e o espaço limpo e organizado.</p>
            </div>
            <dl className="reveal mt-10 grid grid-cols-3 gap-3">
              {[["Google", BIZ.rating], ["Avaliações", String(BIZ.reviews)], ["Aberto", "Seg–Sáb"]].map(([k, v]) => (
                <div key={k} className="surface-premium rounded-2xl p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-display text-3xl md:text-4xl">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative md:col-span-7 md:pl-6">
            <figure className="mask-reveal relative overflow-hidden rounded-3xl">
              <img src={lounge.url} alt="Lounge do Gaivota Tattoo com sofá chesterfield, teto em LED azul e decoração" width={1600} height={900} loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[4/3]" />
              <figcaption className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-xs">O lounge do estúdio · foto real</figcaption>
            </figure>
            <figure className="reveal-blur tilt surface-premium relative -mt-24 ml-auto w-3/5 rounded-3xl p-2 md:-mt-32 md:w-1/2">
              <img src={fachada.url} alt="Fachada do Gaivota Tattoo Studio com letreiro e vitrines com arte" width={759} height={576} loading="lazy" className="rounded-2xl" />
              <span className="tilt-glare" />
              <figcaption className="px-3 py-2 text-xs text-muted-foreground">A fachada, nº 368 · foto real</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <TattooCarousel />

      {/* SERVIÇOS */}
      <section id="servicos" className="relative overflow-hidden bg-surface py-28 md:py-40">
        <div className="pointer-events-none absolute inset-0 opacity-60"><div className="aurora h-full w-full" /></div>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow n="03">O que fazemos</Eyebrow>
              <SplitText className="mt-6 max-w-2xl font-display text-5xl leading-[0.92] md:text-7xl" parts={["Do primeiro rabisco ao", { em: "último retoque." }]} />
            </div>
            <a href={waLink("Olá! Vim pelo site e queria saber quais estilos vocês fazem.")} target="_blank" rel="noopener" className="reveal btn-chrome w-fit px-6 py-3 text-sm">Perguntar sobre estilos</a>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-12">
            {[
              { n: "Tatuagem autoral", d: "O desenho é criado do zero a partir da sua ideia, referências e local do corpo. Você aprova antes da sessão.", img: sketch, span: "md:col-span-7", msg: "Olá! Quero criar uma tatuagem personalizada. Posso enviar minha ideia?" },
              { n: "Traço fino e minimalistas", d: "Peças delicadas e precisas — boas para a primeira tatuagem ou um detalhe discreto.", img: fineline, span: "md:col-span-5 md:mt-28", msg: "Olá! Tenho interesse em uma tatuagem pequena / fine line. Como funciona?" },
            ].map((s, i) => (
              <article key={s.n} className={`reveal min-w-0 max-w-full ${s.span}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="tilt surface-premium group relative overflow-hidden rounded-3xl p-2">
                  <div className="overflow-hidden rounded-[1.3rem]">
                    <img src={s.img} alt={`${s.n} (imagem ilustrativa)`} width={800} height={1008} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-[1400ms] group-hover:scale-110 md:aspect-[5/4]" />
                  </div>
                  <span className="tilt-glare" />
                  <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest">Imagem ilustrativa</span>
                  <div className="flex items-start justify-between gap-6 p-5">
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl">{s.n}</h3>
                      <p className="mt-2 max-w-md text-muted-foreground">{s.d}</p>
                    </div>
                    <a href={waLink(s.msg)} target="_blank" rel="noopener" aria-label={`Falar sobre ${s.n}`} className="btn-metal shrink-0 p-3.5"><ArrowUpRight size={20} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              ["Retoques", "Reavivamos traços e cores de tatuagens que pedem um novo cuidado."],
              ["Piercing e estética", "Conforme a fachada do estúdio. Consulte as opções disponíveis pelo WhatsApp."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal surface-premium group flex gap-5 rounded-3xl p-7 transition duration-500 hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cobalt/30 text-neon transition group-hover:rotate-12"><Sparkles size={20} /></span>
                <div><h3 className="font-display text-3xl">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="relative overflow-hidden py-28 md:py-40">
        <div data-parallax="-0.1" className="pointer-events-none absolute -right-20 top-10 w-[700px] text-cobalt/30"><Seagull animate={false} /></div>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <Eyebrow n="04">Como funciona</Eyebrow>
          <SplitText className="mt-6 max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl" parts={["Quatro passos,", { em: "sem pressa" }, "e sem surpresa."]} />
          <ol className="relative mt-20 grid gap-6 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent md:block" />
            {[
              [PenTool, "Conversa", "Você manda sua ideia, referências e local do corpo pelo WhatsApp."],
              [HeartHandshake, "Orçamento", "Avaliamos tamanho e complexidade e passamos valor e prazo."],
              [Sparkles, "Desenho", "O traço é criado e ajustado com você até ficar do seu jeito."],
              [ShieldCheck, "Sessão", "Você é tatuado com material descartável e recebe as orientações de cuidado."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof PenTool;
              return (
                <li key={t as string} className="reveal relative" style={{ transitionDelay: `${i * 140}ms` }}>
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-neon/50 bg-ink text-neon shadow-glow"><I size={22} /></span>
                  <span className="mt-6 block font-display text-6xl italic text-foreground/15">0{i + 1}</span>
                  <h3 className="-mt-4 text-xl font-bold">{t as string}</h3>
                  <p className="mt-2 text-muted-foreground">{d as string}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="iris-reveal absolute inset-0 bg-cobalt" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,var(--neon),transparent_45%)] opacity-30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 text-cream md:grid-cols-2 md:px-10">
          <div className="reveal">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cream/80">05 — Quem já passou por aqui</p>
            <p className="mt-4 font-display text-[clamp(6rem,18vw,14rem)] leading-none">{BIZ.rating}</p>
            <p className="text-lg text-cream/85">Nota média no Google, com {BIZ.reviews} avaliações públicas.</p>
            <a href={BIZ.maps} target="_blank" rel="noopener" className="btn-chrome mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm">Ler avaliações no Google <ArrowUpRight size={16} /></a>
          </div>
          <ul className="space-y-3">
            {["Atendimento atencioso e personalizado", "Qualidade do resultado final", "Ambiente limpo, higiênico e confortável", "Equipe simpática e acolhedora"].map((t, i) => (
              <li key={t} className="reveal glass flex items-center gap-4 rounded-2xl p-5 transition duration-500 hover:translate-x-2" style={{ transitionDelay: `${i * 90}ms` }}>
                <Star size={18} className="shrink-0 text-neon" fill="currentColor" />
                <span className="text-lg">{t}</span>
              </li>
            ))}
            <li className="px-1 text-xs text-cream/70">Temas mais citados nas avaliações públicas do estúdio.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-28 md:py-40">
        <Eyebrow n="06">Dúvidas</Eyebrow>
        <SplitText className="mt-6 font-display text-5xl md:text-7xl" parts={["Antes de", { em: "marcar." }]} />
        <div className="mt-12 space-y-3">
          {[
            ["Quanto custa uma tatuagem?", "O valor depende do tamanho, do local do corpo e do nível de detalhe. Mande sua ideia pelo WhatsApp que passamos um orçamento."],
            ["Vocês criam o desenho?", "Sim. Fazemos desenhos personalizados a partir da sua ideia e referências, e você aprova antes da sessão."],
            ["Nunca fiz tatuagem. É um bom lugar para a primeira?", "Sim. Explicamos todo o processo, tiramos dúvidas e orientamos os cuidados depois da sessão."],
            ["Preciso agendar?", "Recomendamos combinar antes pelo WhatsApp para garantir o horário e preparar o desenho."],
            ["Qual o horário de funcionamento?", "De segunda a sábado, das 8h às 18h. Domingo fechado."],
          ].map(([q, a], i) => (
            <details key={q} className="reveal surface-premium group rounded-2xl px-6 py-5 open:shadow-glow" style={{ transitionDelay: `${i * 60}ms` }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                {q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neon/40 font-display text-2xl text-neon transition duration-500 group-open:rotate-[135deg]">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL + CONTATO */}
      <section id="contato" className="grain relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0"><div className="aurora h-full w-full" /></div>
        <div className="pointer-events-none absolute left-1/2 top-24 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2">
          <div className="anim-spin-slow absolute inset-0"><div className="arc-ring inset-0" /><div className="arc-ring inset-[18%]" /><div className="arc-ring inset-[34%]" /></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto w-40 text-neon"><Seagull /></div>
            <SplitText className="mt-6 font-display text-6xl leading-[0.9] md:text-8xl" parts={["Tem uma ideia?", { em: "Vamos desenhar." }]} />
            <p className="reveal mt-6 text-lg text-foreground/75">Conte o que você imagina. A gente responde com caminhos, valores e horários.</p>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metal reveal mt-10 inline-flex items-center gap-2 px-9 py-5 text-lg font-bold">
              <MessageCircle size={20} /> Chamar no WhatsApp
            </a>
          </div>

          <div className="mt-24 grid gap-6 md:grid-cols-5">
            <div className="reveal surface-premium rounded-3xl p-7 md:col-span-2">
              <ul className="space-y-6">
                <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-neon" /><a href={BIZ.maps} target="_blank" rel="noopener" className="hover:underline">{BIZ.address}</a></li>
                <li className="flex gap-4"><Clock className="mt-1 shrink-0 text-neon" /><span>{BIZ.hours}</span></li>
                <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-neon" /><span>WhatsApp e celular: <a href={`tel:${BIZ.phoneE164}`} className="hover:underline">{BIZ.phoneDisplay}</a></span></li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                <a href={BIZ.maps} target="_blank" rel="noopener" className="btn-chrome px-5 py-2.5 text-sm">Como chegar</a>
                <a href={BIZ.instagram} target="_blank" rel="noopener" className="btn-chrome inline-flex items-center gap-2 px-5 py-2.5 text-sm"><Instagram size={15} /> Instagram</a>
                <a href={BIZ.facebook} target="_blank" rel="noopener" className="btn-chrome px-5 py-2.5 text-sm">Facebook</a>
              </div>
            </div>
            <div className="mask-reveal overflow-hidden rounded-3xl md:col-span-3">
              <iframe title="Mapa do Gaivota Tattoo em Icaraí" src={BIZ.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full md:h-full md:min-h-80" />
            </div>
          </div>
        </div>
        <footer className="relative z-10 overflow-hidden border-t border-border bg-ink">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-16">
            <div className="grid gap-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <a href="#topo" aria-label="Gaivota Tattoo — voltar ao início" className="inline-flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-neon/30 bg-neon/5 text-neon">
                    <Seagull animate={false} className="w-10" />
                  </span>
                  <span>
                    <span className="block font-display text-2xl tracking-wide text-foreground">GAIVOTA <span className="text-neon">TATTOO</span></span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Estúdio · Icaraí, Niterói</span>
                  </span>
                </a>
                <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">Arte na pele, cuidado em cada detalhe. Um espaço para transformar ideias em tatuagens únicas.</p>
                <div className="mt-6 flex items-center gap-3">
                  <a href={BIZ.instagram} target="_blank" rel="noopener" aria-label="Instagram do Gaivota Tattoo" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-neon hover:text-neon"><Instagram size={17} /></a>
                  <a href={BIZ.facebook} target="_blank" rel="noopener" aria-label="Facebook do Gaivota Tattoo" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-neon hover:text-neon"><span className="font-semibold">f</span></a>
                  <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" aria-label="WhatsApp do Gaivota Tattoo" className="inline-flex h-10 items-center gap-2 rounded-full border border-neon/40 px-4 text-xs font-semibold text-neon transition-colors hover:bg-neon hover:text-ink"><MessageCircle size={15} /> Fale com a gente</a>
                </div>
              </div>
              <div className="md:col-span-3">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-neon">Navegação</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {NAV.map(([label, href]) => <li key={href}><a href={href} className="transition-colors hover:text-neon">{label}</a></li>)}
                </ul>
              </div>
              <div className="md:col-span-4">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-neon">Visite o estúdio</p>
                <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
                  <li className="flex gap-3"><MapPin size={17} className="mt-1 shrink-0 text-neon" /><a href={BIZ.maps} target="_blank" rel="noopener" className="transition-colors hover:text-foreground">{BIZ.address}<span className="block text-xs text-muted-foreground">Icaraí · Niterói · RJ</span></a></li>
                  <li className="flex gap-3"><Clock size={17} className="mt-1 shrink-0 text-neon" /><span>{BIZ.hours}</span></li>
                  <li className="flex gap-3"><Phone size={17} className="mt-1 shrink-0 text-neon" /><a href={`tel:${BIZ.phoneE164}`} className="transition-colors hover:text-foreground">{BIZ.phoneDisplay}</a></li>
                </ul>
                <a href={BIZ.maps} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon transition-colors hover:text-foreground">Como chegar <ArrowUpRight size={14} /></a>
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-[11px] leading-5 text-muted-foreground md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} Gaivota Tattoo Estúdio. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>
      </section>

      {/* FLOATING WHATSAPP */}
      <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" aria-label="Falar no WhatsApp" className="btn-metal fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center">
        <span className="anim-pulse-ring absolute inset-0 rounded-full border-2 border-neon" />
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
