import {
  SiSpringboot,
  SiPostgresql,
  SiDocker,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiGit,
} from "react-icons/si";
import { Coffee, Globe, Users } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type SkillIcon = IconType | LucideIcon;

interface Skill {
  name: string;
  Icon: SkillIcon;
  color: string;
}

const skills: Skill[] = [
  { name: "Java",            Icon: Coffee,       color: "#e76f00" },
  { name: "Spring Boot",     Icon: SiSpringboot, color: "#6db33f" },
  { name: "PostgreSQL",      Icon: SiPostgresql, color: "#4169e1" },
  { name: "Docker",          Icon: SiDocker,     color: "#2496ed" },
  { name: "REST APIs",       Icon: Globe,        color: "#60a5fa" },
  { name: "Next.js",         Icon: SiNextdotjs,  color: "#e2e8f0" },
  { name: "React",           Icon: SiReact,      color: "#61dafb" },
  { name: "TypeScript",      Icon: SiTypescript, color: "#3178c6" },
  { name: "Git",             Icon: SiGit,        color: "#f05032" },
  { name: "Team Leadership", Icon: Users,        color: "#94a3b8" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionLabel number="01">Sobre mí</SectionLabel></Reveal>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <Reveal delay={80}>
              <p>
                Soy desarrollador Full-Stack con base en Leganés, Madrid. Me
                formé en{" "}
                <span className="text-slate-200 font-medium">
                  Desarrollo de Aplicaciones Web (DAW)
                </span>{" "}
                en CESUR, donde mi proyecto final recibió la mención{" "}
                <span className="text-blue-400 font-semibold">&quot;Con Distinción&quot;</span>.
                También cursé{" "}
                <span className="text-slate-200 font-medium">
                  Ingeniería de Sistemas en la UPM
                </span>
                .
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Mis prácticas en{" "}
                <span className="text-slate-200 font-medium">Softcode (Madrid)</span> me
                permitieron trabajar en entornos reales con Java, Spring Boot y
                Next.js, construyendo APIs y componentes de producción con Docker
                y PostgreSQL.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p>
                Fuera del código, más de 5 años como{" "}
                <span className="text-slate-200 font-medium">Shift Leader en Foot Locker</span>{" "}
                me han dado una visión real del negocio retail: gestión de KPIs,
                equipos y operaciones — contexto que aplico directamente en los
                proyectos que desarrollo.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={100}>
              <p className="text-xs text-slate-600 uppercase tracking-widest font-mono mb-4">
                Stack tecnológico
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, i) => {
                const Icon = skill.Icon;
                return (
                  <Reveal key={skill.name} delay={120 + i * 40}>
                    <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-200 group cursor-default">
                      <span
                        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ color: skill.color }}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors truncate">
                        {skill.name}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
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
