"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { PROJECTS, TECH_FILTERS, type Project, type Tint } from "@/lib/projects";
import { ProjectName } from "@/components/ui/ProjectName";

// Halo de luz de cada proyecto (rgb) y color del texto de acento.
const GLOW: Record<Tint, { rgb: string; text: string }> = {
  violet: { rgb: "139,124,255", text: "text-[#b3a9ff]" },
  blue: { rgb: "96,165,250", text: "text-[#93c5fd]" },
  orange: { rgb: "251,146,60", text: "text-[#fdba74]" },
  emerald: { rgb: "52,211,153", text: "text-[#6ee7b7]" },
};

export default function Projects() {
  const [tech, setTech] = useState<string | null>(null);
  const matches = tech ? PROJECTS.filter((p) => p.stack.includes(tech)) : PROJECTS;

  return (
    <section id="projects" className="relative px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="font-mono text-[0.8125rem] uppercase tracking-[0.2em] text-violet">Proyectos</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,1rem+4.5vw,5.5rem)]">
              <span className="text-sheen">Cosas que he construido</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6">
            <p className="text-[1.0625rem] text-muted">¿Qué tecnología buscas? Marca una y te digo dónde la he usado.</p>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por tecnología">
              {TECH_FILTERS.map((t) => {
                const on = tech === t;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTech(on ? null : t)}
                    className={`h-9 rounded-full px-4 text-[0.875rem] transition-[transform,background-color,color,box-shadow] duration-300 active:scale-[0.95] ${
                      on
                        ? "bg-white text-black shadow-[0_0_30px_-4px_rgba(139,124,255,0.9)]"
                        : "glass text-muted hover:text-ink hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 min-h-[1.5em] text-[0.9375rem] text-ink" aria-live="polite">
              {tech
                ? `${tech} aparece en ${matches.length} de ${PROJECTS.length} proyectos: ${matches.map((p) => p.name).join(", ")}.`
                : ""}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-8 md:mt-24 md:space-y-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              dimmed={tech !== null && !project.stack.includes(tech)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, dimmed }: { project: Project; index: number; dimmed: boolean }) {
  const { screenshots, features } = project;
  const glow = GLOW[project.tint];
  const phone = project.device === "phone";
  const [activeFeature, setActiveFeature] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = screenshots.length;
  const feature = features[activeFeature];
  const shotIndex = feature.screenshotIndex;
  // En DietApp se ven dos móviles: la captura de la pestaña y la siguiente.
  const shown = phone ? [shotIndex, (shotIndex + 1) % total] : [shotIndex];

  const prev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox((l) => (l !== null ? (l - 1 + total) % total : null));
  }, [total]);
  const next = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox((l) => (l !== null ? (l + 1) % total : null));
  }, [total]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  return (
    <>
      <Reveal>
        <article
          id={`project-${project.id}`}
          aria-labelledby={`title-${project.id}`}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
            e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
          }}
          className={`glass spotlight overflow-hidden rounded-[28px] transition-[opacity,transform,filter] duration-500 ${
            dimmed ? "scale-[0.98] opacity-30 saturate-0" : ""
          }`}
        >
          <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:gap-12">
            {/* Captura con su halo */}
            <div className="relative min-w-0 lg:col-span-7">
              <div
                aria-hidden
                className="absolute inset-[8%] rounded-full blur-[80px]"
                style={{ background: `rgba(${glow.rgb},0.35)` }}
              />
              <Tilt baseX={0} baseY={0} max={5} className="relative">
                <button
                  type="button"
                  onClick={() => setLightbox(shotIndex)}
                  aria-label={`Ampliar captura: ${screenshots[shotIndex].alt}`}
                  className="group/shot relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10"
                  style={{ boxShadow: `0 40px 100px -40px rgba(${glow.rgb},0.6)` }}
                >
                  {phone ? (
                    <span className="absolute inset-0 flex items-center justify-center gap-5 p-5">
                      {shown.map((s) => (
                        <span key={s} className="shot-in relative h-full aspect-[390/844] overflow-hidden rounded-xl ring-1 ring-white/10">
                          <Image src={screenshots[s].src} alt={screenshots[s].alt} fill sizes="260px" className="object-cover object-top" />
                        </span>
                      ))}
                    </span>
                  ) : (
                    <Image
                      key={screenshots[shotIndex].src}
                      src={screenshots[shotIndex].src}
                      alt={screenshots[shotIndex].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      quality={82}
                      className="shot-in object-cover object-top transition-transform duration-700 group-hover/shot:scale-[1.03]"
                    />
                  )}
                </button>
              </Tilt>
            </div>

            {/* Texto */}
            <div className="flex min-w-0 flex-col lg:col-span-5">
              <div className="flex items-center justify-between gap-4 font-mono text-[0.8125rem] text-muted">
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </span>
                <span className={glow.text}>{project.badge}</span>
              </div>

              <h3 id={`title-${project.id}`} className="display mt-5 text-[clamp(2.25rem,1.5rem+2.4vw,3.5rem)]">
                <ProjectName id={project.id} name={project.name} />
              </h3>
              <p className="mt-4 text-[1rem] text-muted">{project.summary}</p>

              <div role="tablist" aria-label={`Funcionalidades de ${project.name}`} className="mt-7 flex flex-wrap gap-2">
                {features.map((f, i) => (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={i === activeFeature}
                    onClick={() => setActiveFeature(i)}
                    className={`h-8 rounded-full px-3.5 text-[0.8125rem] transition-[background-color,color] duration-300 ${
                      i === activeFeature ? "bg-white text-black" : "bg-white/[0.06] text-muted hover:text-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div role="tabpanel" key={feature.id} className="shot-in mt-6">
                <h4 className="text-[1.25rem] font-medium tracking-tight">{feature.heading}</h4>
                <p className="mt-2 text-[0.9375rem] text-muted">{feature.description}</p>
                <ul className="mt-4 space-y-1.5 text-[0.875rem] text-ink/90">
                  {feature.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden className={`mt-[0.5em] size-1.5 shrink-0 rounded-full bg-current ${glow.text}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                <p className="max-w-[40ch] font-mono text-[0.75rem] leading-relaxed text-muted">{project.tags.join(" · ")}</p>
                <div className="flex gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-10 items-center gap-1.5 rounded-full glass px-4 text-[0.875rem] transition-colors hover:bg-white/10"
                    >
                      Probar
                      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 items-center gap-1.5 rounded-full glass px-4 text-[0.875rem] transition-colors hover:bg-white/10"
                  >
                    Código
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name}: ${screenshots[lightbox].alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute right-4 top-4 rounded-full glass p-3" onClick={() => setLightbox(null)} aria-label="Cerrar">
            <X size={20} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-3" onClick={prev} aria-label="Anterior">
            <ChevronLeft size={20} />
          </button>
          <div
            className={phone ? "relative h-[82vh] aspect-[390/844]" : "relative mx-16 aspect-[16/10] w-full max-w-6xl"}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[lightbox].src}
              alt={screenshots[lightbox].alt}
              fill
              className={phone ? "rounded-2xl object-cover object-top" : "object-contain"}
              sizes={phone ? "400px" : "100vw"}
              quality={90}
            />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-3" onClick={next} aria-label="Siguiente">
            <ChevronRight size={20} />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.8125rem] text-muted">
            {screenshots[lightbox].alt} · {lightbox + 1} de {total}
          </p>
        </div>
      )}
    </>
  );
}
