import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Play, Volume2, VolumeX, Gem } from "lucide-react";
import { SplitText } from "@/components/site/SplitText";
import { waLink } from "@/components/site/data";
import hawa from "@/assets/tattoo-hawa-panturrilha.jpg.asset.json";
import floral from "@/assets/tattoo-floral-ombro.jpg.asset.json";
import antes from "@/assets/tattoo-cobertura-antes.jpg.asset.json";
import depois from "@/assets/tattoo-cobertura-depois.jpg.asset.json";
import tatuando from "@/assets/tatuando-cliente.jpg.asset.json";
import tatuador from "@/assets/tatuador-101clinic.jpg.asset.json";
import videoAsset from "@/assets/bastidores-101clinic.mp4.asset.json";
import videoPoster from "@/assets/bastidores-101clinic-poster.jpg.asset.json";
import joiasArgolasLisas from "@/assets/joias-argolas-lisas.jpg.asset.json";
import joiasMicrodermal from "@/assets/joias-microdermal.jpg.asset.json";
import joiasArgolasZirconia from "@/assets/joias-argolas-zirconia.jpg.asset.json";
import joiasLabretes from "@/assets/joias-labretes.jpg.asset.json";
import joiasUmbigoDourado from "@/assets/joias-umbigo-dourado.jpg.asset.json";
import joiasMamiloCristais from "@/assets/joias-mamilo-cristais.jpg.asset.json";
import joiasMamiloColorido from "@/assets/joias-mamilo-colorido.jpg.asset.json";
import joiasUmbigoPrata from "@/assets/joias-umbigo-prata.jpg.asset.json";
import piercingVideo from "@/assets/piercing-ear-curation.mp4.asset.json";
import piercingVideoPoster from "@/assets/piercing-ear-curation-poster.jpg.asset.json";
import piercingCoracaoOlhoGrego from "@/assets/piercing-orelha-coracao-olho-grego.jpg.asset.json";
import piercingUmbigoCristais from "@/assets/piercing-umbigo-cristais.jpg.asset.json";
import piercingOrelhaComposicao from "@/assets/piercing-orelha-composicao-dourada.jpg.asset.json";
import piercingTragusBorboleta from "@/assets/piercing-tragus-borboleta.jpg.asset.json";
import piercingOrelhaFlor from "@/assets/piercing-orelha-flor-dourada.jpg.asset.json";
import piercingOrelhaRamo from "@/assets/piercing-orelha-ramo-e-coracao.jpg.asset.json";

const TATTOOS = [
  { image: hawa, alt: "Tatuagem realista de um cão na panturrilha, com o nome Hawa abaixo", tag: "Retrato realista" },
  { image: floral, alt: "Tatuagem floral em preto e cinza no ombro de uma cliente", tag: "Floral" },
  { image: antes, alt: "Tatuagem antiga desbotada na coxa — foto de antes", tag: "Antes" },
  { image: depois, alt: "Cobertura colorida com rosa e borboletas na coxa — foto de depois", tag: "Depois" },
  { image: tatuando, alt: "Tatuador aplicando uma tatuagem no braço de um cliente no estúdio", tag: "No estúdio" },
  { image: tatuador, alt: "Tatuador da 101Clinic com máquina de tatuagem sem fio e luvas", tag: "Bastidores" },
  { image: { url: "/IMG-20261126-WA0007.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261126-WA0007", tag: "Portfólio" },
  { image: { url: "/IMG-20261126-WA0006.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261126-WA0006", tag: "Portfólio" },
  { image: { url: "/IMG-20261126-WA0005.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261126-WA0005", tag: "Portfólio" },
  { image: { url: "/IMG-20261126-WA0003.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261126-WA0003", tag: "Portfólio" },
  { image: { url: "/IMG-20261126-WA0004.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261126-WA0004", tag: "Portfólio" },
  { image: { url: "/IMG-20261126-WA0002.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261126-WA0002", tag: "Portfólio" },
  { image: { url: "/IMG-20261125-WA0072.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261125-WA0072", tag: "Portfólio" },
  { image: { url: "/IMG-20261125-WA0068.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261125-WA0068", tag: "Portfólio" },
  { image: { url: "/IMG-20261125-WA0066.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261125-WA0066", tag: "Portfólio" },
  { image: { url: "/IMG-20261125-WA0067.jpg" }, alt: "Trabalho de tatuagem da 101Clinic — IMG-20261125-WA0067", tag: "Portfólio" },
];

export function TattooCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedSnap(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = window.setInterval(() => {
      if (!document.hidden) emblaApi.scrollNext();
    }, 3500);
    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="trabalhos" aria-label="Trabalhos e bastidores da 101Clinic" className="relative overflow-hidden py-28 md:py-36">
      <div data-parallax="-0.06" className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-cobalt/20 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon">
              <span className="h-px w-10 bg-neon" /> 02 — Inspiração
            </p>
            <SplitText className="mt-6 max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl" parts={["Cada traço conta", { em: "uma história." }]} />
            <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground">
              Fotos reais do estúdio e do trabalho da 101Clinic, em Itumbiara.
            </p>
          </div>
          <div className="reveal flex gap-3">
            <button type="button" onClick={scrollPrev} aria-label="Ver imagem anterior" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={scrollNext} aria-label="Ver próxima imagem" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="reveal-blur mt-14 outline-none"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Seis fotos de tatuagens e do estúdio"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrev(); }
            if (event.key === "ArrowRight") { event.preventDefault(); scrollNext(); }
          }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex touch-pan-y">
              {TATTOOS.map(({ image, alt, tag }, index) => (
                <div
                  key={image.url}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${TATTOOS.length}`}
                  className="min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]"
                >
                  <figure className="surface-premium overflow-hidden rounded-3xl p-2">
                    <div className="overflow-hidden rounded-[1.3rem] bg-ink">
                      <img
                        src={image.url}
                        alt={alt}
                        width={900}
                        height={1200}
                        loading="lazy"
                        draggable={false}
                        className="aspect-[3/4] w-full select-none object-cover"
                      />
                    </div>
                    <figcaption className="flex items-center justify-between px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>{tag}</span>
                      <span>{String(index + 1).padStart(2, "0")} / {String(TATTOOS.length).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" aria-label="Escolher imagem">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir para a posição ${index + 1}`}
              aria-current={index === selectedSnap ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${index === selectedSnap ? "w-8 bg-neon" : "w-2 bg-foreground/25 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const VIDEO_ITEMS = [
  { title: "Trabalhos da 101Clinic", video: "/VID-20261126-WA0030.mp4", description: "Vídeo enviado pela 101Clinic" },
  { title: "Arte em movimento", video: "/VID-20261126-WA0013.mp4", description: "Vídeo enviado pela 101Clinic" },
  { title: "Novos trabalhos", video: "/VID-20261126-WA0049.mp4", description: "Vídeo enviado pela 101Clinic" },
  { title: "Detalhes do estúdio", video: "/VID-20261126-WA0048.mp4", description: "Vídeo enviado pela 101Clinic" },
  { title: "Composição na orelha", video: piercingVideo.url, poster: piercingVideoPoster.url, description: "Joias prateadas na orelha, gravadas no estúdio" },
  { title: "Bastidores da 101Clinic", video: videoAsset.url, poster: videoPoster.url, description: "Tatuagem realista de um cão na perna, com a foto de referência ao lado" },
];

export function StudioVideo() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: false });
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);

  const move = (direction: "prev" | "next") => {
    if (direction === "prev") emblaApi?.scrollPrev();
    else emblaApi?.scrollNext();
  };

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setActive(emblaApi.selectedScrollSnap());
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => { emblaApi.off("select", update).off("reInit", update); };
  }, [emblaApi]);

  return (
    <section id="video" aria-label="Carrossel de vídeos de tatuagem e da 101Clinic" className="relative overflow-hidden py-24 md:py-32">
      <div data-parallax="-0.05" className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon"><span className="h-px w-10 bg-neon" /> 03 — Vídeos</p>
            <SplitText className="mt-6 font-display text-5xl leading-[.95] md:text-7xl" parts={["Tatuagem", { em: "em movimento." }]} />
            <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground">Uma seleção de vídeos do estúdio, dos processos e da arte na pele. Os espaços extras já estão preparados para receber seus próximos vídeos.</p>
          </div>
          <div className="reveal flex gap-3">
            <button type="button" onClick={() => move("prev")} aria-label="Vídeo anterior" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"><ArrowLeft size={20}/></button>
            <button type="button" onClick={() => move("next")} aria-label="Próximo vídeo" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"><ArrowRight size={20}/></button>
          </div>
        </div>
        <div ref={emblaRef} className="reveal-blur mt-12 overflow-hidden">
          <div className="-ml-4 flex touch-pan-y">
            {VIDEO_ITEMS.map((item, index) => (
              <article key={item.title} className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_62%] lg:flex-[0_0_40%]">
                <div className="surface-premium overflow-hidden rounded-3xl p-2">
                  <div className="relative overflow-hidden rounded-[1.3rem] bg-ink">
                    <video src={item.video} poster={item.poster} controls muted={muted} loop playsInline preload="metadata" className="aspect-[9/16] max-h-[680px] w-full object-cover" />
                    {!item.video && <div className="pointer-events-none absolute inset-x-0 bottom-16 text-center"><span className="rounded-full border border-white/20 bg-black/65 px-4 py-2 text-xs text-white backdrop-blur">Adicionar vídeo {String(index + 1).padStart(2, "0")}</span></div>}
                    {index === 0 && <button type="button" onClick={() => setMuted(value => !value)} aria-label={muted ? "Ativar som dos vídeos" : "Silenciar os vídeos"} aria-pressed={muted} className="glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full">{muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button>}
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-4">
                    <div><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-1 text-xs text-muted-foreground">{item.description}</p></div>
                    <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(VIDEO_ITEMS.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-7 flex justify-center gap-2" aria-label="Selecionar vídeo">
          {VIDEO_ITEMS.map((item, index) => <button key={item.title} type="button" onClick={() => emblaApi?.scrollTo(index)} aria-label={`Ir para vídeo ${index + 1}`} aria-current={active === index ? "true" : undefined} className={`h-2 rounded-full transition-all ${active === index ? "w-8 bg-neon" : "w-2 bg-foreground/25"}`} />)}
        </div>
        <a href={waLink("Olá! Vi os vídeos da 101Clinic e gostaria de agendar.")} target="_blank" rel="noopener" className="reveal btn-metal mx-auto mt-8 flex w-fit items-center gap-2 px-6 py-3 text-sm"><Play size={16}/> Agendar pelo WhatsApp</a>
      </div>
    </section>
  );
}


/** Carrossel independente com fotos reais do portfólio de piercings. */
export function PiercingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const items = [
    { src: piercingCoracaoOlhoGrego.url, alt: "Orelha com piercing daith em coração cravejado, argolas de zircônia na hélix e brinco de olho grego no lóbulo" },
    { src: piercingUmbigoCristais.url, alt: "Piercing de umbigo prateado com duas esferas cravejadas de zircônia" },
    { src: piercingOrelhaComposicao.url, alt: "Composição de piercings dourados na orelha: tragus, daith em coração, conch, cluster de pedras e brinco de flor cravejado" },
    { src: piercingTragusBorboleta.url, alt: "Piercing de tragus em formato de borboleta com cristais e brinco quadrado cravejado no lóbulo" },
    { src: piercingOrelhaFlor.url, alt: "Piercing de hélix em formato de flor cravejada, com argolas no lóbulo e argola microcravada no tragus" },
    { src: piercingOrelhaRamo.url, alt: "Composição de piercings dourados: ramo de folhas cravejado na cartilagem, três pontos de luz na hélix e daith em coração" },
  ];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedSnap(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = window.setInterval(() => {
      if (!document.hidden) emblaApi.scrollNext();
    }, 4200);
    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="piercings" aria-label="Carrossel de fotos reais de piercings da 101Clinic" className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div data-parallax="-0.05" className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon"><span className="h-px w-10 bg-neon" /> 04 — Piercings</p>
            <SplitText className="mt-6 font-display text-5xl leading-[.95] md:text-7xl" parts={["Detalhes que", { em: "fazem diferença." }]} />
            <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground">Conheça alguns trabalhos reais de body piercing realizados na 101Clinic, em Itumbiara.</p>
          </div>
          <div className="reveal flex gap-3">
            <button type="button" onClick={scrollPrev} aria-label="Ver piercing anterior" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"><ArrowLeft size={20}/></button>
            <button type="button" onClick={scrollNext} aria-label="Ver próximo piercing" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"><ArrowRight size={20}/></button>
          </div>
        </div>
        <div
          className="reveal-blur mt-12 outline-none"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Seis fotos de trabalhos de piercing"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrev(); }
            if (event.key === "ArrowRight") { event.preventDefault(); scrollNext(); }
          }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex touch-pan-y">
              {items.map((item, index) => (
                <div key={item.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${items.length}`} className="min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]">
                  <figure className="surface-premium overflow-hidden rounded-3xl p-2">
                    <div className="overflow-hidden rounded-[1.3rem] bg-ink">
                      <img src={item.src} alt={item.alt} width={900} height={1200} loading="lazy" draggable={false} className="aspect-[3/4] w-full select-none object-cover transition duration-700 hover:scale-[1.03]" />
                    </div>
                    <figcaption className="flex items-center justify-between px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>Body piercing · 101Clinic</span>
                      <span>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-center gap-2" aria-label="Escolher foto de piercing">
          {scrollSnaps.map((_, index) => (
            <button key={index} type="button" onClick={() => scrollTo(index)} aria-label={`Ir para a posição ${index + 1}`} aria-current={index === selectedSnap ? "true" : undefined} className={`h-2 rounded-full transition-all duration-300 ${index === selectedSnap ? "w-8 bg-neon" : "w-2 bg-foreground/25 hover:bg-foreground/50"}`} />
          ))}
        </div>
        <a href={waLink("Olá! Vi o portfólio de piercings da 101Clinic e gostaria de saber mais.")} target="_blank" rel="noopener" className="reveal btn-metal mx-auto mt-8 flex w-fit items-center gap-2 px-6 py-3 text-sm"><Gem size={16}/> Consultar piercing pelo WhatsApp</a>
      </div>
    </section>
  );
}


/** Carrossel da coleção de joias para piercing. */
export function JewelryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const items = [
    { src: joiasArgolasLisas.url, alt: "Argolas de piercing lisas nas cores dourada, prateada e preta", label: "Argolas lisas" },
    { src: joiasMicrodermal.url, alt: "Topos de microdermal prateados com pedrarias coloridas", label: "Microdermal" },
    { src: joiasArgolasZirconia.url, alt: "Duas argolas cravejadas com zircônias, uma prateada e outra dourada", label: "Argolas cravejadas" },
    { src: joiasLabretes.url, alt: "Labretes prateados com zircônias e topos em formatos variados", label: "Labretes" },
    { src: joiasUmbigoDourado.url, alt: "Piercings de umbigo dourados com zircônias transparentes", label: "Umbigo dourado" },
    { src: joiasMamiloCristais.url, alt: "Piercings de mamilo prateados com pedrarias transparentes, roxas e verdes", label: "Mamilo com cristais" },
    { src: joiasMamiloColorido.url, alt: "Piercings de mamilo prateados e dourados com cristais e esmaltes coloridos", label: "Mamilo colorido" },
    { src: joiasUmbigoPrata.url, alt: "Piercings de umbigo prateados com pedras incolores e azuis", label: "Umbigo prateado" },
  ];
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const to = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedSnap(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => { emblaApi.off("select", update).off("reInit", update); };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = window.setInterval(() => {
      if (!document.hidden) emblaApi.scrollNext();
    }, 4300);
    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="colecao-joias" aria-label="Conheça algumas joias da nossa coleção" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon"><span className="h-px w-10 bg-neon" /> 05 — Coleção</p>
            <SplitText className="mt-6 font-display text-4xl leading-[.98] md:text-6xl" parts={[ "Conheça algumas joias", { em: " da nossa coleção." } ]} />
            <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground">Inspire-se nos detalhes e encontre a joia que combina com seu estilo.</p>
          </div>
          <div className="reveal flex gap-3">
            <button type="button" onClick={prev} aria-label="Ver joia anterior" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"><ArrowLeft size={20}/></button>
            <button type="button" onClick={next} aria-label="Ver próxima joia" className="flex h-12 w-12 items-center justify-center rounded-xl border !border-zinc-700 !bg-zinc-800 !text-white shadow-sm transition-colors hover:!bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"><ArrowRight size={20}/></button>
          </div>
        </div>
        <div className="reveal-blur mt-12 outline-none" role="region" aria-roledescription="carrossel" aria-label="Oito imagens de joias para piercing" tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); prev(); }
            if (event.key === "ArrowRight") { event.preventDefault(); next(); }
          }}>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex touch-pan-y">
              {items.map((item, index) => (
                <div key={item.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${items.length}`} className="min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]">
                  <figure className="surface-premium overflow-hidden rounded-3xl p-2">
                    <div className="overflow-hidden rounded-[1.3rem] bg-ink">
                      <img src={item.src} alt={item.alt} width={900} height={1200} loading="lazy" draggable={false} className="aspect-[3/4] w-full select-none object-cover transition duration-700 hover:scale-[1.03]" />
                    </div>
                    <figcaption className="flex items-center justify-between px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>{item.label}</span><span>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-center gap-2" aria-label="Escolher joia">
          {scrollSnaps.map((_, index) => <button key={index} type="button" onClick={() => to(index)} aria-label={`Ir para a joia ${index + 1}`} aria-current={index === selectedSnap ? "true" : undefined} className={`h-2 rounded-full transition-all duration-300 ${index === selectedSnap ? "w-8 bg-neon" : "w-2 bg-foreground/25 hover:bg-foreground/50"}`} />)}
        </div>
        <a href={waLink("Olá! Gostaria de conhecer as joias disponíveis para piercing na 101Clinic.")} target="_blank" rel="noopener" className="reveal btn-metal mx-auto mt-8 flex w-fit items-center gap-2 px-6 py-3 text-sm"><Gem size={16}/> Consultar joias pelo WhatsApp</a>
      </div>
    </section>
  );
}
