"use client";

import { useEffect, useRef, useState } from "react";

export type Token = { t: string; c?: string };

/**
 * Bloque de código que se "escribe" línea a línea al entrar en pantalla.
 * El servidor pinta todas las líneas; sin JS o con movimiento reducido se ve entero.
 */
export function TypedCode({ lines, filename, speed = 90 }: { lines: Token[][]; filename: string; speed?: number }) {
  const ref = useRef<HTMLPreElement>(null);
  const [count, setCount] = useState(lines.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    setCount(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timer = window.setInterval(() => {
        setCount((n) => {
          if (n + 1 >= lines.length) window.clearInterval(timer);
          return Math.min(lines.length, n + 1);
        });
      }, speed);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [lines.length, speed]);

  return (
    <figure className="glass overflow-hidden rounded-2xl shadow-[0_0_120px_-40px_rgba(139,124,255,0.6)]">
      <figcaption className="flex h-11 items-center gap-2 border-b border-line px-5 font-mono text-[0.8125rem] text-muted">
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3">{filename}</span>
      </figcaption>
      <pre ref={ref} className="whitespace-pre-wrap break-words px-5 py-5 font-mono text-[0.8125rem] leading-[1.8] text-ink">
        <code>
          {lines.map((line, i) => (
            <span key={i} className={`block pl-7 -indent-7 ${i < count ? "" : "invisible"}`}>
              <span aria-hidden className="inline-block w-7 indent-0 text-muted/60 select-none">{i + 1}</span>
              {line.map((tok, j) => (
                <span key={j} className={tok.c}>{tok.t}</span>
              ))}
              {i === count - 1 && count < lines.length && <span className="caret text-cyan">▍</span>}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
