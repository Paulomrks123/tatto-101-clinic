import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import clip from "@/assets/gaivota-estudio-video.mp4.asset.json";
import poster from "@/assets/gaivota-estudio-video-poster.jpg.asset.json";

const clock = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

export function StudioVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // A metadados pode chegar antes dos ouvintes serem ligados; sincroniza o estado.
    if (v.readyState >= 1) {
      const d = v.duration;
      if (Number.isFinite(d) && d > 0) setDuration(d);
      setTime(v.currentTime);
    }
    if (!v.paused) setPlaying(true);
  }, []);

  const seek = (value: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
    v.currentTime = Math.min(Math.max(value, 0), v.duration);
    setTime(v.currentTime);
  };

  return (
    <figure className="anim-fade-up relative left-1/2 mt-5 w-screen max-w-none -translate-x-1/2 md:left-auto md:mt-9 md:w-full md:translate-x-0" style={{ animationDelay: "1.9s" }}>
      <div className="surface-premium w-full rounded-none p-0 md:rounded-3xl md:p-2">
        <div className="relative aspect-[700/1244] w-full overflow-hidden rounded-none bg-ink md:rounded-2xl">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={clip.url}
            poster={poster.url}
            preload="auto"
            autoPlay
            playsInline
            loop
            muted
            aria-label="Vídeo do interior do Gaivota Tattoo Estúdio, em Icaraí, Niterói"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => {
              const d = e.currentTarget.duration;
              if (Number.isFinite(d) && d > 0) setDuration(d);
            }}
            onDurationChange={(e) => {
              const d = e.currentTarget.duration;
              if (Number.isFinite(d) && d > 0) setDuration(d);
            }}
          />

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pausar o vídeo do estúdio" : "Assistir ao vídeo do estúdio"}
            className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${
              playing ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-cream/90 text-ink shadow-glow backdrop-blur">
              <Play size={24} className="ml-1" fill="currentColor" />
            </span>
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-2.5 pt-8">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pausar o vídeo" : "Reproduzir o vídeo"}
              className="shrink-0 text-cream/85 transition-colors hover:text-neon"
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(time, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!duration}
              aria-label="Avançar no vídeo"
              className="h-1 w-full cursor-pointer text-neon accent-current disabled:cursor-default"
            />
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-cream/70">
              {clock(time)}/{clock(duration || 28)}
            </span>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Ativar o som do vídeo" : "Silenciar o vídeo"}
              className="shrink-0 text-cream/85 transition-colors hover:text-neon"
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          </div>
        </div>
        <figcaption className="flex items-center justify-between gap-3 px-3 py-2.5 text-[11px] text-muted-foreground">
          <span>Vídeo real do estúdio</span>
          <span className="font-mono uppercase tracking-[0.2em]">28s</span>
        </figcaption>
      </div>
    </figure>
  );
}
