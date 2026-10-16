"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Proyectos", href: "#projects" },
  { label: "Sobre mí", href: "#about" },
  { label: "Trayectoria", href: "#trayectoria" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-500 border-b ${
        scrolled || open ? "bg-bg/70 backdrop-blur-xl border-line" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[var(--nav)] max-w-[1400px] items-center justify-between px-5 md:px-10" aria-label="Principal">
        <a href="#hero" className="flex items-center gap-2.5 text-[1.1875rem] font-semibold tracking-tight text-white">
          <span aria-hidden className="size-2 rounded-full bg-violet shadow-[0_0_12px_2px_rgba(139,124,255,0.8)]" />
          Juan David Gil
        </a>

        <ul className="hidden md:flex items-center gap-9 text-[0.9375rem] text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex h-10 items-center rounded-full glass px-5 text-[0.9375rem] transition-colors hover:bg-white/10"
        >
          Contacto
        </a>

        <button
          className="md:hidden -mr-2 p-2"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden px-5 pb-6">
          <ul className="flex flex-col">
            {[...links, { label: "Contacto", href: "#contact" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block py-3 text-2xl font-light" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
