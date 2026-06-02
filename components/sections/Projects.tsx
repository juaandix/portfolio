import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

interface Project {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  highlight?: boolean;
}

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
    name: "ProdSync",
    description:
      'Aplicación B2B de gestión de proyectos para empresas de software. TFG de DAW con mención "Con Distinción". Gestión de sprints, tareas, equipos y reportes con Spring Boot + React.',
    tags: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"],
    github: "https://github.com/juaandix/ProdSync",
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
        <SectionLabel number="02">Proyectos</SectionLabel>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
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
