import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "juandavid.gilcv@gmail.com",
    href: "mailto:juandavid.gilcv@gmail.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+34 644 737 281",
    href: "tel:+34644737281",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Leganés, Madrid",
    href: undefined,
  },
];

const socials = [
  {
    Icon: GithubIcon,
    label: "GitHub",
    value: "github.com/juaandix",
    href: "https://github.com/juaandix",
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/juaandix",
    href: "https://linkedin.com/in/juaandix",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel number="05">Contacto</SectionLabel>

        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Left col */}
          <div>
            <p className="text-slate-400 leading-relaxed mb-8 text-base">
              Estoy abierto a nuevas oportunidades. Si tienes un proyecto
              interesante o quieres hablar sobre una posición, no dudes en
              escribirme.
            </p>

            <div className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/40 transition-colors">
                      <Icon size={15} className="text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-slate-600 uppercase tracking-wide font-mono">{item.label}</p>
                      <p className="text-sm text-slate-300 truncate group-hover:text-slate-100 transition-colors">{item.value}</p>
                    </div>
                    {item.href && (
                      <ArrowRight size={13} className="text-slate-700 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    )}
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block p-3 rounded-xl hover:bg-slate-900/60 transition-colors -mx-3"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label} className="p-3 -mx-3">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right col */}
          <div>
            <p className="text-[11px] text-slate-600 uppercase tracking-widest font-mono mb-5">
              Redes sociales
            </p>
            <div className="space-y-3">
              {socials.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group p-3 rounded-xl hover:bg-slate-900/60 transition-colors -mx-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/40 flex items-center justify-center shrink-0 transition-colors">
                      <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
                        <Icon size={15} />
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] text-slate-600 uppercase tracking-wide font-mono">{s.label}</p>
                      <p className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">{s.value}</p>
                    </div>
                    <ArrowRight size={13} className="text-slate-700 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-700">
          <span className="text-blue-500/50">JD</span>Gil
        </span>
        <p className="text-xs text-slate-700">
          © 2026 Juan David Gil Diaz · Next.js &amp; Tailwind CSS
        </p>
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
