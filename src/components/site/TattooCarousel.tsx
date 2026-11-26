import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SplitText } from "@/components/site/SplitText";
import sketch from "@/assets/sketch.jpg";
import fineline from "@/assets/fineline.jpg";

const TATTOOS = [
  { image: { url: sketch }, alt: "Desenho de tatuagem — imagem ilustrativa" },
  { image: { url: fineline }, alt: "Tatuagem de traço fino — imagem ilustrativa" },
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
    <section id="trabalhos" aria-label="Referências ilustrativas de tatuagens" className="relative overflow-hidden py-28 md:py-36">
      <div data-parallax="-0.06" className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-cobalt/20 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-neon">
              <span className="h-px w-10 bg-neon" /> 02 — Inspiração
            </p>
            <SplitText className="mt-6 max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl" parts={["Cada traço conta", { em: "uma história." }]} />
            <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground">
              Imagens ilustrativas de tatuagem, sem atribuição de autoria à 101Clinic.
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
          aria-label="Duas imagens ilustrativas de tatuagens"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrev(); }
            if (event.key === "ArrowRight") { event.preventDefault(); scrollNext(); }
          }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex touch-pan-y">
              {TATTOOS.map(({ image, alt }, index) => (
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
                        width={810}
                        height={1440}
                        loading="lazy"
                        draggable={false}
                        className="aspect-[9/16] w-full select-none object-cover"
                      />
                    </div>
                    <figcaption className="flex items-center justify-between px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>Imagem ilustrativa</span>
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
