import { Reveal } from "@/components/ui/Reveal";
import { TypedCode, type Token } from "@/components/ui/TypedCode";

interface Item {
  name: string;
  when: string;
  note?: string;
}

// Datos del CV (octubre de 2026).
const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Experiencia",
    items: [
      {
        name: "Desarrollador Full Stack (prácticas), Softcode",
        when: "nov 2025 – mar 2026",
        note: "APIs REST con Java 17 y Spring Boot sobre PostgreSQL con JPA e Hibernate. Integración de una web interna con un sistema legacy de presupuestos en producción. Interfaces con React, TypeScript y Next.js; Git Flow, revisión de código y Docker.",
      },
      {
        name: "Shift Leader, Foot Locker Leganés",
        when: "nov 2019 – hoy",
        note: "Equipos de 8 a 12 personas en turnos de alta demanda. KPIs comerciales, incidencias en tiempo real y formación de nuevos compañeros.",
      },
    ],
  },
  {
    title: "Formación",
    items: [
      {
        name: "Grado en Ingeniería Informática, UNED",
        when: "oct 2026 – hoy",
        note: "En curso. Acceso por traslado de expediente desde la UPM, con reconocimiento de créditos en trámite.",
      },
      {
        name: "Técnico Superior en DAW, CESUR",
        when: "sep 2024 – may 2026",
        note: "Nota final 7,94. Proyecto final (ProdSync) con mención Distinción.",
      },
      {
        name: "Grado en Ing. de Sistemas de Información, UPM",
        when: "2016 – 2021",
        note: "108 créditos ECTS superados, trasladados a la UNED.",
      },
    ],
  },
  {
    title: "Idiomas y certificaciones",
    items: [
      { name: "Español", when: "nativo" },
      { name: "Inglés", when: "B2", note: "Uso diario en documentación técnica." },
      { name: "Claude Code 101", when: "Anthropic, 2026" },
      { name: "Introduction to Claude Cowork", when: "Anthropic, 2026" },
    ],
  },
];

// stack.ts, con colores de sintaxis sencillos.
const K = "text-violet";
const S = "text-cyan";
const P = "text-muted";
const arr = (key: string, items: string[]): Token[] => [
  { t: `  ${key}: `, c: K },
  { t: "[", c: P },
  ...items.flatMap((it, i) => [
    { t: `"${it}"`, c: S },
    ...(i < items.length - 1 ? [{ t: ", ", c: P }] : []),
  ]),
  { t: "],", c: P },
];
const CODE: Token[][] = [
  [{ t: "// Lo que uso a diario", c: P }],
  [{ t: "export const ", c: P }, { t: "stack", c: S }, { t: " = {", c: P }],
  arr("backend", ["Java 17", "Spring Boot 3", "Spring Security", "JPA"]),
  arr("frontend", ["TypeScript", "React 19", "Next.js", "Angular 17"]),
  arr("datos", ["PostgreSQL", "MongoDB Atlas", "Redis"]),
  arr("ia", ["Python 3.12", "FastAPI", "LangChain", "RAG"]),
  arr("devops", ["Docker", "GitHub Actions", "Git Flow", "Linux"]),
  arr("testing", ["JUnit 5", "Mockito", "Playwright"]),
  arr("equipo", ["Scrum", "Kanban"]),
  [{ t: "};", c: P }],
];

export default function Trajectory() {
  return (
    <section id="trayectoria" className="relative px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12 lg:items-start">
        <Reveal className="min-w-0 lg:sticky lg:top-[calc(var(--nav)+40px)] lg:col-span-5">
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.2em] text-violet">Trayectoria</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,1rem+4.5vw,5.5rem)]">
            <span className="text-sheen">De la tienda al código</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-[1.0625rem] text-muted">El stack con el que trabajo hoy:</p>
          <div className="mt-6">
            <TypedCode filename="stack.ts" lines={CODE} />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60} className={gi ? "mt-16" : ""}>
              <h3 className="font-mono text-[0.8125rem] uppercase tracking-[0.2em] text-muted">{g.title}</h3>
              <ul className="mt-4">
                {g.items.map((it) => (
                  <li key={it.name} className="group border-t border-line py-5 transition-colors hover:border-white/20">
                    <div className="flex items-baseline justify-between gap-6">
                      <span className="text-[1.1875rem] tracking-tight transition-colors group-hover:text-white">{it.name}</span>
                      <span className="shrink-0 font-mono text-[0.8125rem] text-violet">{it.when}</span>
                    </div>
                    {it.note && <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-muted">{it.note}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
