"use client";

import { useRef } from "react";

/**
 * Inclina su contenido en 3D siguiendo el puntero. Parte de una inclinación base
 * y vuelve a ella al salir. Con movimiento reducido se queda quieto en la base.
 */
export function Tilt({
  children,
  className = "",
  baseX = 6,
  baseY = -12,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  baseX?: number;
  baseY?: number;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const base = `perspective(1400px) rotateX(${baseX}deg) rotateY(${baseY}deg)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${baseX - y * max}deg) rotateY(${baseY + x * max}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = base;
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className={className}>
      <div
        ref={ref}
        style={{ transform: base, transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {children}
      </div>
    </div>
  );
}
