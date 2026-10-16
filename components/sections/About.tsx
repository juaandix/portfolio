import { Reveal } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden px-5 py-32 md:px-10 md:py-44">
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-violet/10 blur-[160px]" />

      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.2em] text-violet">Sobre mí</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="display mt-8 max-w-[22ch] text-[clamp(2rem,1rem+3.6vw,4.5rem)] leading-[1.08]">
            <span className="text-sheen">Cinco años midiendo turnos en tienda. </span>
            <span className="text-muted">Ahora construyo el software que los mide.</span>
          </p>
        </Reveal>

        <div className="mt-20 grid gap-10 text-[1.0625rem] text-muted md:grid-cols-2 md:gap-16 lg:ml-[33%] lg:max-w-[880px]">
          <Reveal delay={60}>
            <p>
              Desde 2019 soy Shift Leader en Foot Locker, en Leganés: coordino equipos de ocho a doce personas en
              turnos de alta demanda, sigo las ventas de cada hora y decido qué reponer antes de que se agote una
              talla. Ahí aprendí lo que hoy busco en el software:{" "}
              <span className="text-ink">que cada número sirva para decidir algo</span>. Por eso KicksControl mide
              sell-through, días de cobertura y merma.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p>
              Me formé en Desarrollo de Aplicaciones Web en CESUR, con una nota final de 7,94 y el proyecto final
              ProdSync con mención Distinción, y ahora curso Ingeniería Informática en la UNED. En Softcode trabajé
              con Java 17, Spring Boot y React integrando una aplicación interna con un sistema legacy en
              producción. <span className="text-ink">Busco un equipo donde seguir aprendiendo y aportar.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
