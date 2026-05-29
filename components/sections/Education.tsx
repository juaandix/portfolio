interface Degree {
  title: string;
  institution: string;
  period: string;
  detail?: string;
}

const degrees: Degree[] = [
  {
    title: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
    institution: "CESUR",
    period: "Sep 2024 — May 2026",
    detail: 'TFG: ProdSync — Mención "Con Distinción"',
  },
  {
    title: "Ingeniería de Sistemas Informáticos",
    institution: "Universidad Politécnica de Madrid (UPM)",
    period: "Sep 2017 — Jun 2021",
    detail: "100 ECTS completados",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionLabel number="04">Educación</SectionLabel>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {degrees.map((d) => (
            <div
              key={d.institution}
              className="group bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <p className="text-xs font-mono text-slate-600 mb-3">{d.period}</p>
              <h3 className="font-semibold text-slate-100 mb-1.5 leading-snug group-hover:text-white transition-colors">
                {d.title}
              </h3>
              <p className="text-blue-400 text-sm font-medium mb-4">{d.institution}</p>
              {d.detail && (
                <p className="text-xs text-slate-500 bg-slate-800/60 border border-slate-700/40 rounded-lg px-3 py-1.5 inline-block">
                  {d.detail}
                </p>
              )}
            </div>
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
