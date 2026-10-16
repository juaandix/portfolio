"use client";

import { useEffect, useRef } from "react";

/**
 * Haces de luz que fluyen en curvas, en violeta y cian, con mezcla aditiva.
 * Se tuercen un poco hacia el ratón. Con movimiento reducido se dibujan una vez, quietos.
 */
export function LightFibers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;
    const mouse = { x: 0.6, y: 0.5, tx: 0.6, ty: 0.5 };

    const FIBERS = 70;
    const seeds = Array.from({ length: FIBERS }, (_, i) => ({
      off: (i / FIBERS - 0.5) * 2,
      speed: 0.15 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.78 ? "violet" : "cyan",
      width: 0.6 + Math.random() * 1.4,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const time = t / 1000;

      for (const s of seeds) {
        // Todas nacen en un punto abajo a la izquierda y se abren en abanico hacia la derecha.
        const sx = -w * 0.05;
        const sy = h * 0.92;
        const spread = s.off * h * 0.55;
        const wave = Math.sin(time * s.speed + s.phase) * h * 0.06;
        const c1x = w * 0.35;
        const c1y = h * 0.75 + spread * 0.3 + wave;
        const c2x = w * (0.55 + (mouse.x - 0.5) * 0.2);
        const c2y = h * (0.35 + (mouse.y - 0.5) * 0.25) + spread * 0.8 - wave;
        const ex = w * 1.05;
        const ey = h * 0.3 + spread + wave * 1.5;

        const g = ctx.createLinearGradient(sx, sy, ex, ey);
        const color = s.hue === "violet" ? "139,124,255" : "94,230,214";
        g.addColorStop(0, `rgba(${color},0)`);
        g.addColorStop(0.35, `rgba(${color},0.55)`);
        g.addColorStop(1, `rgba(${color},0.05)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      if (!reduced && visible) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(draw);
    });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    io.observe(canvas);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
