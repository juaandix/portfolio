const LINKS = [
  { label: "GitHub", href: "https://github.com/juaandix" },
  { label: "LinkedIn", href: "https://linkedin.com/in/juaandix" },
  { label: "CV (PDF)", href: "/cv.pdf" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-black/60 px-5 pt-14 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 text-[0.9375rem] text-muted">
        <p>© 2026 Juan David Gil Díaz · Leganés, Madrid</p>
        <ul className="flex gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* El nombre a todo lo ancho, apagado */}
      <p
        aria-hidden
        className="display mx-auto mt-10 max-w-[1400px] select-none whitespace-nowrap text-center text-[13.5vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
      >
        Juan David Gil
      </p>
    </footer>
  );
}
