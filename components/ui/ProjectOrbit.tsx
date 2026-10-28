"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, type Tint } from "@/lib/projects";

const GLOW: Record<Tint, string> = {
  violet: "139,124,255",
  blue: "96,165,250",
  orange: "251,146,60",
  emerald: "52,211,153",
};

// La portada de cada proyecto, intercalados (A B C D A B C D): un anillo lleno sin dos seguidas del mismo.
const ROUNDS = 2;
const FRAMES = Array.from({ length: ROUNDS }, () => PROJECTS.map((p) => ({ project: p, shots: [p.screenshots[0]] }))).flat();
const N = FRAMES.length;
const STEP = 360 / N;
// Radio para que los fotogramas queden pegados: (ancho + hueco) / (2·tan(π/n)).
const K = 1 / (2 * Math.tan(Math.PI / N));

const AUTO_SPEED = 0.05; // grados por fotograma
const DRAG_DEG_PER_PX = 0.16;

/** Lleva a la sección del proyecto. */
function goToProject(id: string) {
  document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#project-${id}`);
}

/**
 * Cilindro de capturas que gira solo, se arrastra con el ratón o el dedo (con inercia
 * y encaje en el fotograma más cercano) y lleva al proyecto al pulsar un fotograma.
 */
export function ProjectOrbit({ className = "" }: { className?: string }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const s = useRef({
    angle: 0,
    velocity: 0,
    target: null as number | null,
    dragging: false,
    lastX: 0,
    moved: 0,
    reduced: false,
  });
  const [front, setFront] = useState(0);

  const frontOf = (angle: number) => (((Math.round(-angle / STEP) % N) + N) % N);
  const snap = (angle: number) => Math.round(angle / STEP) * STEP;

  useEffect(() => {
    const st = s.current;
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastFront = -1;

    const tick = () => {
      if (!st.dragging) {
        if (st.target !== null) {
          st.angle += (st.target - st.angle) * 0.12;
          if (Math.abs(st.target - st.angle) < 0.05) {
            st.angle = st.target;
            st.target = null;
          }
        } else if (Math.abs(st.velocity) > 0.05) {
          st.angle += st.velocity;
          st.velocity *= 0.92;
          if (Math.abs(st.velocity) <= 0.05) st.target = snap(st.angle);
        } else if (!st.reduced) {
          st.angle -= AUTO_SPEED;
        }
      }
      if (ringRef.current) ringRef.current.style.transform = `rotateX(-8deg) rotateY(${st.angle}deg)`;
      const f = frontOf(st.angle);
      if (f !== lastFront) {
        lastFront = f;
        setFront(f);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (!st.dragging) return;
      const dx = e.clientX - st.lastX;
      st.lastX = e.clientX;
      st.moved += Math.abs(dx);
      st.angle += dx * DRAG_DEG_PER_PX;
      st.velocity = dx * DRAG_DEG_PER_PX;
    };
    const onUp = () => {
      if (!st.dragging) return;
      st.dragging = false;
      if (Math.abs(st.velocity) <= 0.05) st.target = snap(st.angle);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const rotateBy = useCallback((dir: 1 | -1) => {
    // Los proyectos van intercalados: el fotograma de al lado ya es el proyecto siguiente (o anterior).
    const st = s.current;
    st.velocity = 0;
    st.target = snap(st.target ?? st.angle) - dir * STEP;
  }, []);

  const current = FRAMES[front];
  const rgb = GLOW[current.project.tint];

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div
        className="orbit-stage relative min-h-0 flex-1 cursor-grab touch-pan-y select-none active:cursor-grabbing [--card-w:210px]! sm:[--card-w:260px]! xl:[--card-w:300px]!"
        style={{ ["--orbit-r" as string]: `calc((var(--card-w) + 12px) * ${K.toFixed(4)})` }}
        onPointerDown={(e) => {
          const st = s.current;
          st.dragging = true;
          st.lastX = e.clientX;
          st.moved = 0;
          st.velocity = 0;
          st.target = null;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") rotateBy(-1);
          if (e.key === "ArrowRight") rotateBy(1);
        }}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos: arrastra para girar y pulsa una captura para ir al proyecto"
      >
        <div ref={ringRef} className="orbit" style={{ animation: "none" }}>
          {FRAMES.map(({ project, shots }, i) => {
            const glow = GLOW[project.tint];
            const phone = project.device === "phone";
            const isFront = i === front;
            return (
              <a
                key={`${project.id}-${i}`}
                href={`#project-${project.id}`}
                draggable={false}
                onClick={(e) => {
                  e.preventDefault();
                  // Si se ha arrastrado, no es un clic.
                  if (s.current.moved > 6) return;
                  goToProject(project.id);
                }}
                className="orbit-card group"
                style={{
                  transform: `rotateY(${i * STEP}deg) translateZ(var(--orbit-r))`,
                  top: "calc(var(--card-w) * -0.36)",
                }}
                aria-label={`Ir al proyecto ${project.name}`}
                tabIndex={-1}
              >
                <span
                  className={`block overflow-hidden rounded-xl ring-1 transition-[transform,box-shadow] duration-500 group-hover:scale-[1.04] ${
                    isFront ? "ring-white/30" : "ring-white/10"
                  }`}
                  style={{
                    boxShadow: isFront
                      ? `0 30px 80px -20px rgba(${glow},0.85), 0 0 0 1px rgba(${glow},0.4)`
                      : `0 30px 70px -30px rgba(${glow},0.5)`,
                  }}
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-[#08090c]">
                    {phone ? (
                      <span className="absolute inset-0 flex items-start justify-center gap-2 pt-2">
                        {shots.map((sh) => (
                          <span key={sh.src} className="relative h-[130%] aspect-[390/844] overflow-hidden rounded-md">
                            <Image src={sh.src} alt="" fill sizes="120px" draggable={false} className="object-cover object-top" />
                          </span>
                        ))}
                      </span>
                    ) : (
                      <Image
                        src={shots[0].src}
                        alt=""
                        fill
                        draggable={false}
                        sizes="(max-width: 1280px) 260px, 300px"
                        className="object-cover object-top"
                      />
                    )}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-2/5"
                      style={{ background: "linear-gradient(to top, rgba(5,5,7,0.92), transparent)" }}
                    />
                    <span className="absolute inset-x-3 bottom-2.5 flex items-center justify-between gap-2">
                      <span className="text-[0.9375rem] font-medium tracking-tight text-white">{project.name}</span>
                      <span className="size-2 rounded-full" style={{ background: `rgb(${glow})`, boxShadow: `0 0 10px 2px rgba(${glow},0.8)` }} />
                    </span>
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Mandos: flechas y el proyecto que queda al frente */}
      <div className="relative z-10 mx-auto mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => rotateBy(-1)}
          className="grid size-10 place-items-center rounded-full glass transition-colors hover:bg-white/10"
          aria-label="Proyecto anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => goToProject(current.project.id)}
          className="group inline-flex h-10 min-w-[220px] items-center justify-between gap-3 rounded-full glass pl-4 pr-1.5 text-[0.9375rem] transition-colors hover:bg-white/10"
          aria-live="polite"
        >
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 10px 2px rgba(${rgb},0.8)` }} />
            {current.project.name}
          </span>
          <span className="inline-flex h-7 items-center gap-1 rounded-full bg-white px-3 text-[0.8125rem] font-medium text-black">
            Ver
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => rotateBy(1)}
          className="grid size-10 place-items-center rounded-full glass transition-colors hover:bg-white/10"
          aria-label="Proyecto siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
