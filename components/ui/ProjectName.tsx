import { Archivo } from "next/font/google";

// La marca de KicksControl tal y como sale en la cabecera de la tienda
const archivo = Archivo({ subsets: ["latin"], weight: "800", display: "swap" });

/** El nombre del proyecto en su ficha; KicksControl usa su propio logotipo. */
export function ProjectName({ id, name }: { id: string; name: string }) {
  if (id !== "kickscontrol") return <>{name}</>;
  // El bloque toma el ancho de la columna; la marca se encoge para caber, nunca por encima del título
  return (
    <span className="block [container-type:inline-size]">
    <span
      className={`${archivo.className} inline-flex items-center gap-[0.3em] font-extrabold tracking-[-0.04em]`}
      style={{ fontSize: "min(1em, 10.6cqw)" }}
      aria-label={name}
    >
      <svg viewBox="0 0 14 16" className="h-[0.72em] w-auto" fill="currentColor" aria-hidden>
        <rect x="0" width="2" height="16" />
        <rect x="3.5" width="1" height="16" />
        <rect x="6" width="3" height="16" />
        <rect x="10.5" width="1" height="16" />
        <rect x="13" width="1" height="16" />
      </svg>
      <span aria-hidden>KICKSCONTROL</span>
    </span>
    </span>
  );
}
