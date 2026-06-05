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

const sectionIds = links.map((l) => l.href.slice(1));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
            {links.map((l) => {
              const id = l.href.slice(1);
              const isActive = active === id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative text-xs font-medium transition-colors ${
                      isActive
                        ? "text-slate-100"
                        : "text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-blue-400 rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
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
              {links.map((l) => {
                const id = l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`text-sm transition-colors block py-1 ${
                        active === id
                          ? "text-blue-400"
                          : "text-slate-400 hover:text-blue-400"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
