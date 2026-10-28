import { Archivo, Barlow_Condensed } from "next/font/google";

// La marca de KicksControl tal y como sale en la cabecera de la tienda
const archivo = Archivo({ subsets: ["latin"], weight: "800", display: "swap" });
// La marca de DocuMind tal y como sale en la cabecera de la app
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: "700", display: "swap" });

/** El nombre del proyecto en su ficha; KicksControl y DocuMind usan su propio logotipo. */
export function ProjectName({ id, name }: { id: string; name: string }) {
  if (id === "documind") return <DocuMindMark name={name} />;
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

/** Placa amarilla con la D y la muesca del talón, seguida del nombre en Barlow Condensed. */
function DocuMindMark({ name }: { name: string }) {
  return (
    <span className="block [container-type:inline-size]">
      <span
        className={`${barlow.className} inline-flex items-center gap-[0.28em] font-bold uppercase leading-none tracking-[0.04em]`}
        style={{ fontSize: "min(1em, 12cqw)" }}
        aria-label={name}
      >
        <svg viewBox="0 0 30 30" className="h-[0.9em] w-auto shrink-0" aria-hidden>
          <defs>
            <mask id="documind-notch">
              <rect width="30" height="30" fill="white" />
              <circle cx="30" cy="15" r="3.2" fill="black" />
            </mask>
          </defs>
          <rect width="30" height="30" rx="5" fill="#FFD400" mask="url(#documind-notch)" />
          <text x="14.2" y="22.6" textAnchor="middle" fontSize="21" fontWeight="700" fill="#0B0D10" className={barlow.className}>
            D
          </text>
        </svg>
        <span aria-hidden>DOCUMIND</span>
      </span>
    </span>
  );
}
