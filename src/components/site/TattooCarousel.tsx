import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
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

const TATTOOS = [
  { image: hawa, alt: "Tatuagem realista de um cão na panturrilha, com o nome Hawa abaixo", tag: "Retrato realista" },
  { image: floral, alt: "Tatuagem floral em preto e cinza no ombro de uma cliente", tag: "Floral" },
  { image: antes, alt: "Tatuagem antiga desbotada na coxa — foto de antes", tag: "Antes" },
  { image: depois, alt: "Cobertura colorida com rosa e borboletas na coxa — foto de depois", tag: "Depois" },
  { image: tatuando, alt: "Tatuador aplicando uma tatuagem no braço de um cliente no estúdio", tag: "No estúdio" },
  { image: tatuador, alt: "Tatuador da 101Clinic com máquina de tatuagem sem fio e luvas", tag: "Bastidores" },
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
            <button type="button" onClick={scrollPrev} aria-label="Ver imagem anterior" className="btn-chrome flex h-12 w-12 items-center justify-center">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={scrollNext} aria-label="Ver próxima imagem" className="btn-metal flex h-12 w-12 items-center justify-center">
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

export function StudioVideo() {
  const [muted, setMuted] = useState(true);

  return (
    <section id="video" aria-label="Vídeo do estúdio" className="relative overflow-hidden py-24 md:py-32">
      <div data-parallax="-0.05" className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon">
            <span className="h-px w-10 bg-neon" /> 02 — Vídeo
          </p>
          <SplitText className="mt-6 font-display text-4xl leading-[0.95] md:text-6xl" parts={["O estúdio", { em: "em movimento." }]} />
          <p className="reveal mt-6 max-w-md text-lg text-muted-foreground">
            Um passeio pela 101Clinic: o espaço, o atendimento e a tatuagem acontecendo.
          </p>
          <a
            href={waLink("Olá! Vi o vídeo do estúdio no site e quero agendar um horário.")}
            target="_blank"
            rel="noopener"
            className="reveal btn-metal mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            <Play size={16} /> Agendar pelo WhatsApp
          </a>
        </div>

        <div className="reveal-blur md:col-span-7 md:pl-6">
          <div className="surface-premium mx-auto w-full max-w-[420px] rounded-[2.2rem] p-2">
            <div className="relative overflow-hidden rounded-[1.8rem] bg-ink">
              <video
                src={videoAsset.url}
                poster={videoPoster.url}
                controls
                muted={muted}
                loop
                playsInline
                preload="metadata"
                className="aspect-[9/16] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setMuted((value) => !value)}
                aria-label={muted ? "Ativar som do vídeo" : "Silenciar o vídeo"}
                aria-pressed={muted}
                className="glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
            <p className="px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Vídeo do estúdio — 101Clinic
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
