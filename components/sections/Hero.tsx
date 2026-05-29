import { ArrowDown, Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Multi-layer glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[380px] h-[380px] bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-[50%] w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl w-full text-center">
        {/* Role badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 text-xs font-mono tracking-widest uppercase">
            Software Developer
          </span>
        </div>

        <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
          Juan David{" "}
          <span className="gradient-text-animated">Gil Diaz</span>
        </h1>

        <p className="animate-fade-up-delay-2 text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          Desarrollador Full-Stack especializado en{" "}
          <span className="text-slate-200">Java · Spring Boot · Next.js</span>.
          Construyo aplicaciones robustas con foco en rendimiento y experiencia
          de usuario.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            Ver proyectos
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto text-center"
          >
            Contacto
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto text-center"
          >
            Descargar CV
          </a>
        </div>

        {/* Social links */}
        <div className="animate-fade-up-delay-4 flex items-center justify-center gap-1">
          <a
            href="https://github.com/juaandix"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-100 hover:bg-slate-800 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/juaandix"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-100 hover:bg-slate-800 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:juandavid.gilcv@gmail.com"
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-100 hover:bg-slate-800 transition-all"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 hover:text-blue-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
