"use client";

import { useActionState } from "react";
import { ArrowRight, Loader2, Mail, Phone } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { Reveal } from "@/components/ui/Reveal";

const field =
  "w-full rounded-xl bg-white/[0.04] px-4 text-[1rem] text-ink placeholder:text-muted ring-1 ring-line transition focus:bg-white/[0.07] focus:outline-none focus:ring-violet/60";

export default function Contact() {
  const [state, action, pending] = useActionState(sendContactEmail, {
    status: "idle" as const,
  });

  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 pt-32 pb-24 md:px-10 md:pt-44">
      {/* El planeta asomando por el horizonte */}
      <div aria-hidden className="planet absolute left-1/2 top-[58%] -z-10 aspect-square w-[1500px] max-w-none -translate-x-1/2 md:top-[52%]" />

      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal>
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.2em] text-violet">Contacto</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display mx-auto mt-5 max-w-[14ch] text-[clamp(2.75rem,1rem+5.5vw,6.5rem)]">
            <span className="text-sheen">¿Construimos algo juntos?</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-[0.9375rem]">
            <a href="mailto:juandavid.gilcv@gmail.com" className="inline-flex h-11 items-center gap-2 rounded-full glass px-5 transition-colors hover:bg-white/10">
              <Mail size={16} /> juandavid.gilcv@gmail.com
            </a>
            <a href="tel:+34644737281" className="inline-flex h-11 items-center gap-2 rounded-full glass px-5 transition-colors hover:bg-white/10">
              <Phone size={16} /> +34 644 737 281
            </a>
          </div>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-14 max-w-[640px]">
          <div className="glass rounded-[28px] bg-black/40 p-6 text-left backdrop-blur-xl md:p-8">
            {state.status === "success" ? (
              <div className="py-10 text-center" role="status">
                <p className="text-[1.75rem] font-light tracking-tight">Mensaje enviado</p>
                <p className="mt-2 text-muted">Gracias. Te responderé lo antes posible.</p>
              </div>
            ) : (
              <form action={action} className="flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="name">Nombre</label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Tu nombre" className={`${field} h-13`} />
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="Tu email" className={`${field} h-13`} />
                </div>
                <label className="sr-only" htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" required rows={4} placeholder="Qué buscáis y para cuándo" className={`${field} resize-none py-3.5`} />

                {state.status === "error" && (
                  <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-[0.9375rem] text-red-300" role="alert">{state.message}</p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="group mt-2 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white text-[1rem] font-medium text-black transition-transform active:scale-[0.98] disabled:opacity-70"
                >
                  {pending ? <Loader2 size={18} className="animate-spin" /> : null}
                  {pending ? "Enviando…" : "Enviar mensaje"}
                  {!pending && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
