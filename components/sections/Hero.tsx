import { ArrowRight, Download } from "lucide-react";
import { LightFibers } from "@/components/ui/LightFibers";
import { ProjectOrbit } from "@/components/ui/ProjectOrbit";

const TECH = [
  "Java 17", "Spring Boot 3", "Spring Security", "React 19", "Next.js", "TypeScript", "PostgreSQL",
  "Docker", "Python", "FastAPI", "LangChain", "MongoDB Atlas", "Angular 17", "GitHub Actions", "Playwright",
];

/** Divide un texto en palabras que entran una a una. */
function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word-in text-sheen -mb-[0.14em] pb-[0.14em]" style={{ ["--i" as string]: start + i }}>
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Luz: fibras animadas y dos halos */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[700px] w-[900px] rounded-full bg-violet/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[700px] rounded-full bg-cyan/10 blur-[140px]" />
        <LightFibers className="absolute inset-0 h-full w-full opacity-50 md:opacity-90 [mask-image:linear-gradient(90deg,transparent_5%,rgba(0,0,0,0.35)_35%,#000_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 px-5 pt-[calc(var(--nav)+48px)] pb-16 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
        <div className="word-in" style={{ ["--i" as string]: 0 }}>
        <p className="inline-flex w-fit items-center gap-2.5 rounded-full glass px-4 py-1.5 text-[0.875rem] text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan" />
          </span>
          Disponible ahora · Leganés, Madrid
        </p>
        </div>

        <p
          className="word-in mt-8 text-[clamp(1.75rem,1.1rem+2vw,2.75rem)] font-medium leading-tight tracking-[-0.03em] text-white"
          style={{ ["--i" as string]: 1 }}
        >
          Juan David Gil
          <span className="ml-3 align-middle font-mono text-[0.8125rem] font-normal uppercase tracking-[0.2em] text-violet">
            Full Stack Developer
          </span>
        </p>

        <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.25rem,1rem+3.6vw,4.75rem)] leading-[1.06]">
          <span className="sr-only">Software full-stack con Java y React</span>
          <span aria-hidden>
            <Words text="Software full-stack" start={2} />
            <br />
            <Words text="con Java y React" start={4} />
          </span>
        </h1>

        <p
          className="word-in mt-8 max-w-[52ch] text-[1.125rem] text-[#b4b8c0] md:text-[1.25rem]"
          style={{ ["--i" as string]: 7 }}
        >
          Spring Boot en el backend, React y TypeScript en el frontend y pipelines de IA con Python. Cinco años
          dirigiendo turnos en tienda me enseñaron a construir software que se mide.
        </p>

        <div className="word-in mt-10" style={{ ["--i" as string]: 8 }}>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex h-13 items-center gap-3 rounded-full bg-white pl-6 pr-1.5 text-[1rem] font-medium text-black transition-transform active:scale-[0.97]"
          >
            Ver proyectos
            <span className="grid size-10 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:-rotate-45">
              <ArrowRight size={18} />
            </span>
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-2 rounded-full glass px-6 text-[1rem] transition-colors hover:bg-white/10"
          >
            <Download size={17} />
            Descargar CV
          </a>
        </div>
        </div>
        </div>

        {/* Tarjetas de proyectos girando */}
        <div className="h-[340px] sm:h-[440px] lg:col-span-5 lg:-mr-[5vw] lg:h-[580px] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_16%,#000_90%,transparent_100%)]">
          <div className="word-in h-full w-full" style={{ ["--i" as string]: 9 }}>
            <ProjectOrbit className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* Cinta de tecnologías */}
      <div className="relative border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <ul className="marquee flex w-max gap-12 font-mono text-[0.875rem] uppercase tracking-[0.18em] text-muted" aria-label="Tecnologías">
          {[...TECH, ...TECH].map((t, i) => (
            <li key={i} className="flex items-center gap-12" aria-hidden={i >= TECH.length}>
              {t}
              <span className="size-1 rounded-full bg-violet/70" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
