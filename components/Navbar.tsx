"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Educación", href: "#education" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4 pt-4">
      <div className="pointer-events-auto w-full max-w-5xl">
        <nav
          className={`flex items-center justify-between px-5 h-12 transition-all duration-500 ${
            scrolled
              ? "bg-slate-950/80 backdrop-blur-xl border border-slate-800/70 rounded-2xl shadow-2xl shadow-black/60"
              : "bg-transparent border border-transparent rounded-2xl"
          }`}
        >
          <a
            href="#hero"
            className="font-bold text-sm tracking-tight text-slate-100 hover:text-blue-400 transition-colors"
          >
            <span className="text-blue-400">JD</span>Gil
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs font-medium text-slate-400 hover:text-slate-100 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-blue-400 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden mt-2 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-2xl px-5 py-4">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors block py-1"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
