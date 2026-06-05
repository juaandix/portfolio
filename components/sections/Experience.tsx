import { Reveal } from "@/components/ui/Reveal";

interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

const jobs: Job[] = [
  {
    role: "Desarrollador Web en Prácticas",
    company: "Softcode",
    location: "Madrid",
    period: "Nov 2025 — Mar 2026",
    bullets: [
      "Desarrollo Full-Stack en entorno real con Java 21 y Spring Boot 3, construyendo APIs REST consumidas por el frontend.",
      "Implementación de componentes con TypeScript y Next.js, integrados en una arquitectura con PostgreSQL y Docker.",
      "Participación activa en sprints ágiles, revisiones de código y despliegues en entornos de staging.",
    ],
  },
  {
    role: "Shift Leader",
    company: "Foot Locker",
    location: "Leganés",
    period: "Nov 2019 — Actualidad",
    bullets: [
      "Gestión de equipo de 8-10 personas: planificación de turnos, formación de nuevos empleados y resolución de incidencias.",
      "Seguimiento de KPIs de tienda: ventas, conversión, NPS y control de inventario en tiempo real.",
      "Experiencia directa en operaciones retail que inspiró el desarrollo de KicksControl.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionLabel number="03">Experiencia</SectionLabel></Reveal>

        <div className="mt-12 space-y-0 relative">
          {/* Vertical line */}
          <div className="absolute left-[185px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-800 via-slate-800 to-transparent hidden md:block" />

          {jobs.map((job, idx) => (
            <Reveal
              key={`${job.company}-${job.period}`}
              delay={idx * 120}
              className={`grid md:grid-cols-[185px_1fr] gap-4 md:gap-8 ${
                idx !== 0 ? "mt-12" : ""
              }`}
            >
              {/* Left: period */}
              <div className="pt-1 md:text-right">
                <p className="text-xs font-mono text-slate-500 leading-relaxed">{job.period}</p>
                <p className="text-xs text-slate-700 mt-1">{job.location}</p>
              </div>

              {/* Right: content */}
              <div className="relative md:pl-8">
                {/* Timeline dot */}
                <span className="hidden md:flex absolute -left-[13px] top-1.5 w-6 h-6 rounded-full border-2 border-blue-500 bg-slate-950 items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                </span>

                <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700/60 transition-colors">
                  <h3 className="font-semibold text-slate-100">{job.role}</h3>
                  <p className="text-blue-400 text-sm mt-0.5 mb-4 font-medium">{job.company}</p>
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-slate-400 flex gap-2.5 leading-relaxed">
                        <span className="text-blue-500/60 mt-0.5 shrink-0 text-xs">▹</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
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
