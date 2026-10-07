type Props = {
  /** Text shown in the editor title bar. */
  title?: string;
  className?: string;
};

const k = "text-violet-400"; // keyword
const p = "text-sky-300"; // property
const s = "text-emerald-300"; // string
const d = "text-slate-500"; // punctuation

const LINES = [
  <>
    <span className={k}>const</span> <span className="text-blue-300">juanDavid</span>{" "}
    <span className={d}>=</span> <span className={d}>{"{"}</span>
  </>,
  <>
    {"  "}
    <span className={p}>perfil</span>
    <span className={d}>:</span> <span className={s}>&quot;Full-Stack&quot;</span>
    <span className={d}>,</span>
  </>,
  <>
    {"  "}
    <span className={p}>stack</span>
    <span className={d}>: [</span>
    <span className={s}>&quot;Java&quot;</span>
    <span className={d}>, </span>
    <span className={s}>&quot;Spring Boot&quot;</span>
    <span className={d}>, </span>
    <span className={s}>&quot;Next.js&quot;</span>
    <span className={d}>],</span>
  </>,
  <>
    {"  "}
    <span className={p}>foco</span>
    <span className={d}>: [</span>
    <span className={s}>&quot;rendimiento&quot;</span>
    <span className={d}>, </span>
    <span className={s}>&quot;UX&quot;</span>
    <span className={d}>],</span>
  </>,
  <>
    <span className={d}>{"};"}</span>
  </>,
];

export default function CodeCard({ title = "juan-david.ts", className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-blue-950/40 overflow-hidden text-left ${className}`}
    >
      {/* Editor title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-900/90">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[0.7em] font-mono text-slate-500">{title}</span>
      </div>

      <pre className="px-4 py-3 font-mono leading-relaxed whitespace-pre overflow-x-auto">
        {LINES.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-6 shrink-0 select-none text-slate-600">{i + 1}</span>
            <code>{line}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
