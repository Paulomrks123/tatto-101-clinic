import { useEffect } from "react";

/**
 * Efeitos acionados por eventos: evita manter um requestAnimationFrame
 * rodando continuamente quando a página está parada.
 */
export function useScrollFx() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-blur, .mask-reveal, .iris-reveal, .split");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const scrollLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const mouseLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-mouse]"));
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;

    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const k = window.innerWidth < 768 ? 0.55 : 1;
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      scrollLayers.forEach((el) => {
        const speed = Number(el.dataset["parallax"]) * k;
        const depth = Number(el.dataset["mouse"] ?? 0);
        el.style.transform = `translate3d(${cx * depth}px, ${y * speed + cy * depth}px, 0)`;
      });
      mouseLayers.forEach((el) => {
        if (el.dataset["parallax"]) return;
        const depth = Number(el.dataset["mouse"]);
        el.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0)`;
      });
      if (fine && (Math.abs(mx - cx) > 0.002 || Math.abs(my - cy) > 0.002)) {
        raf = requestAnimationFrame(tick);
      }
    };
    const schedule = () => {
      if (!reduce && !raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    const tilts = fine && !reduce ? Array.from(document.querySelectorAll<HTMLElement>(".tilt")) : [];
    const tiltMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 6}deg) translateZ(0)`;
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    };
    const tiltLeave = (e: PointerEvent) => {
      (e.currentTarget as HTMLElement).style.transform = "";
    };

    if (!reduce) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      if (fine) {
        window.addEventListener("pointermove", onMove, { passive: true });
        tilts.forEach((el) => {
          el.addEventListener("pointermove", tiltMove, { passive: true });
          el.addEventListener("pointerleave", tiltLeave);
        });
      }
      schedule();
    }

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onMove);
      tilts.forEach((el) => {
        el.removeEventListener("pointermove", tiltMove);
        el.removeEventListener("pointerleave", tiltLeave);
      });
    };
  }, []);
}
