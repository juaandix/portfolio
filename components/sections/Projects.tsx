"use client";

import { useState, useCallback, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/ui/Reveal";

interface Screenshot {
  src: string;
  alt: string;
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  highlight?: boolean;
  screenshots?: Screenshot[];
}

const PRODSYNC_SCREENSHOTS: Screenshot[] = [
  { src: "/screenshots/01-login.png", alt: "Login" },
  { src: "/screenshots/02-dashboard.png", alt: "Dashboard" },
  { src: "/screenshots/03-projects.png", alt: "Proyectos" },
  { src: "/screenshots/04-clients.png", alt: "Clientes" },
  { src: "/screenshots/05-time-entries.png", alt: "Registro de horas" },
  { src: "/screenshots/06-users.png", alt: "Usuarios" },
  { src: "/screenshots/07-reports.png", alt: "Reportes" },
  { src: "/screenshots/08-calendar.png", alt: "Calendario" },
  { src: "/screenshots/09-budgets.png", alt: "Presupuestos" },
];

const projects: Project[] = [
  {
    name: "KicksControl",
    description:
      "E-commerce y backoffice inteligente para una tienda de zapatillas. Backend con Java 21 + Spring Boot 3, frontend en Next.js 15, PostgreSQL, Docker Compose, autenticación JWT y gestión completa de inventario con alertas de stock.",
    tags: ["Java 21", "Spring Boot", "Next.js 15", "PostgreSQL", "Docker", "JWT"],
    github: "https://github.com/juaandix/kickscontrol",
    highlight: true,
  },
  {
    name: "MobileHoursApp",
    description:
      "App móvil para registro y control de horas de trabajo. Desarrollada con tecnologías móviles para simplificar el seguimiento de jornadas laborales.",
    tags: ["Mobile", "React Native", "API REST"],
    github: "https://github.com/juaandix/MobileHoursApp",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <Reveal><SectionLabel number="02">Proyectos</SectionLabel></Reveal>

        <div className="mt-12 space-y-5">
          <Reveal delay={80}><ProdSyncCard /></Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={80 + i * 100}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProdSyncCard() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = PRODSYNC_SCREENSHOTS.length;

  const prev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrent((c) => (c - 1 + total) % total);
    },
    [total]
  );

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrent((c) => (c + 1) % total);
    },
    [total]
  );

  const prevLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightbox((l) => (l !== null ? (l - 1 + total) % total : null));
    },
    [total]
  );

  const nextLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightbox((l) => (l !== null ? (l + 1) % total : null));
    },
    [total]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prevLightbox, nextLightbox]);

  return (
    <>
      <div
        className="group relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900 to-slate-900/60 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row">
          {/* Carousel */}
          <div className="relative lg:w-[58%] shrink-0 bg-slate-950/60 overflow-hidden">
            <div
              className="relative aspect-video cursor-zoom-in"
              onClick={() => setLightbox(current)}
            >
              <Image
                src={PRODSYNC_SCREENSHOTS[current].src}
                alt={PRODSYNC_SCREENSHOTS[current].alt}
                fill
                className="object-cover object-top transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={82}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />

              {/* Screen label */}
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {PRODSYNC_SCREENSHOTS[current].alt}
              </span>

              {/* Zoom hint */}
              <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                ampliar
              </span>
            </div>

            {/* Nav buttons */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-950/70 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-950/70 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 right-3 flex gap-1">
              {PRODSYNC_SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === current
                      ? "bg-blue-400 scale-125"
                      : "bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir a ${PRODSYNC_SCREENSHOTS[i].alt}`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="relative flex flex-col p-6 lg:p-8 flex-1">
            <div className="flex items-start justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                TFG · Con Distinción
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-100 mt-3 mb-3 group-hover:text-white transition-colors">
              ProdSync
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed mb-5 group-hover:text-slate-400 transition-colors">
              Aplicación B2B de gestión de proyectos para empresas de software.
              Incluye gestión de sprints, tareas, equipos, clientes,
              presupuestos, registro de horas, calendario y reportes. Desarrollada
              con Spring Boot + React como Trabajo de Fin de Grado de DAW.
            </p>

            {/* Thumbnail strip */}
            <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-none">
              {PRODSYNC_SCREENSHOTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative shrink-0 w-14 h-9 rounded overflow-hidden border transition-all ${
                    i === current
                      ? "border-blue-400 ring-1 ring-blue-400/50"
                      : "border-slate-700/50 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                    quality={50}
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {["Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <a
                href="https://github.com/juaandix/ProdSync"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                <GithubIcon size={14} />
                Código
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={prevLightbox}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative w-full max-w-5xl mx-8 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PRODSYNC_SCREENSHOTS[lightbox].src}
              alt={PRODSYNC_SCREENSHOTS[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
            />
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={nextLightbox}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {PRODSYNC_SCREENSHOTS[lightbox].alt}
            </span>
            <span className="text-xs font-mono text-slate-600">
              {lightbox + 1} / {total}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 p-6 ${
        project.highlight
          ? "bg-gradient-to-br from-slate-900 to-slate-900/60 border-blue-500/30 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/10"
          : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40"
      }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      {project.highlight && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      )}

      {project.highlight && (
        <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
          Destacado
        </span>
      )}

      <h3 className="text-base font-semibold text-slate-100 mb-3 pr-16 group-hover:text-white transition-colors">
        {project.name}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5 group-hover:text-slate-400 transition-colors">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors"
          >
            <GithubIcon size={14} />
            Código
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={14} />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

function SectionLabel({
  children,
  number,
}: {
  children: React.ReactNode;
  number: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-mono text-blue-500/50 tabular-nums select-none">
        {number}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
        {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent" />
    </div>
  );
}
