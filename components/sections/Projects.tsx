"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/ui/Reveal";

interface Screenshot {
  src: string;
  alt: string;
}

interface FeatureHighlight {
  id: string;
  label: string;
  screenshotIndex: number;
  heading: string;
  description: string;
  points: string[];
}

const KICKSCONTROL_SCREENSHOTS: Screenshot[] = [
  { src: "/kickscontrol/01-hero-desktop.png", alt: "Tienda" },
  { src: "/kickscontrol/02-catalog-grid.png", alt: "Catálogo" },
  { src: "/kickscontrol/04-product-detail-selected.png", alt: "Producto" },
  { src: "/kickscontrol/08-cart-drawer.png", alt: "Carrito" },
  { src: "/kickscontrol/10-checkout-payment.png", alt: "Checkout" },
  { src: "/kickscontrol/06-backoffice-dashboard-full.png", alt: "KPI Dashboard" },
  { src: "/kickscontrol/07-backoffice-inventory.png", alt: "Inventario" },
];

const KICKS_FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    id: "store",
    label: "Tienda",
    screenshotIndex: 0,
    heading: "E-commerce completo",
    description:
      "Catálogo de sneakers con carrito persistente en servidor, checkout transaccional y pasarela de pago simulada con descarga de recibo en PDF. Sin localStorage — el estado del carrito se sincroniza entre pestañas y dispositivos.",
    points: [
      "Carrito como estado de servidor (TanStack Query)",
      "Sincronización entre pestañas y dispositivos",
      "Pasarela simulada + descarga de recibo PDF",
    ],
  },
  {
    id: "catalog",
    label: "Catálogo",
    screenshotIndex: 1,
    heading: "Filtros dinámicos con JPA Specifications",
    description:
      "Hasta 7 filtros combinables (marca, talla, color, género, in-stock…) construidos dinámicamente con la Criteria API. Los filtros se almacenan en la URL — el catálogo es bookmarkeable y compartible con estado activo.",
    points: [
      "7 filtros combinables sin 127 métodos de repo",
      "Subqueries EXISTS por talla para evitar duplicados",
      "URL state — bookmarkeable y compartible",
    ],
  },
  {
    id: "product",
    label: "Producto",
    screenshotIndex: 2,
    heading: "Variantes reales por talla y color",
    description:
      "Cada sneaker tiene variantes independientes con su propio SKU, stock y modificador de precio. El selector muestra el estado de stock en tiempo real por variante y el checkout descuenta la variante exacta.",
    points: [
      "SKU único por talla + color",
      "Stock en tiempo real por variante",
      "Modificador de precio por variante",
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    screenshotIndex: 4,
    heading: "Defensa en 3 capas contra overselling",
    description:
      "Optimistic Lock (@Version), Pessimistic Lock (SELECT FOR UPDATE) y CHECK constraint de BD actúan dentro de un único método @Transactional. Ningún bug de aplicación puede generar stock negativo.",
    points: [
      "@Version — Hibernate rechaza el segundo UPDATE",
      "SELECT FOR UPDATE — bloqueo a nivel de fila",
      "CHECK stock_quantity >= 0 — última línea de defensa",
    ],
  },
  {
    id: "dashboard",
    label: "KPI Dashboard",
    screenshotIndex: 5,
    heading: "KPIs de operaciones retail reales",
    description:
      "Las métricas no son genéricas: son las que se usan en turno real. Sell-Through Rate, Días de Cobertura y Tasa de Merma con rango de fechas configurable y granularidad día / semana / mes.",
    points: [
      "Sell-Through Rate: vendidas / (vendidas + stock)",
      "Días de Cobertura: stock / ventas diarias medias",
      "Tasa de Merma: ajustes negativos / total movimientos",
    ],
  },
  {
    id: "inventory",
    label: "Inventario",
    screenshotIndex: 6,
    heading: "Gestión de inventario por variante",
    description:
      "Tabla expandible por modelo con modal de ajuste de stock en delta (+/-). Cada movimiento registra el motivo (RECEPCIÓN / AJUSTE / MERMA / DEVOLUCIÓN) para alimentar la Tasa de Merma del dashboard.",
    points: [
      "Ajuste de stock con delta y motivo tipado",
      "Alertas de stock bajo por variante",
      "Historial de movimientos para auditoría",
    ],
  },
];

const PRODSYNC_SCREENSHOTS: Screenshot[] = [
  { src: "/screenshots/01-login.png", alt: "Login" },
  { src: "/screenshots/02-dashboard.png", alt: "Dashboard" },
  { src: "/screenshots/03-projects.png", alt: "Proyectos" },
  { src: "/screenshots/04-clients.png", alt: "Clientes" },
  { src: "/screenshots/05-time-entries.png", alt: "Registro de horas" },
  { src: "/screenshots/06-users.png", alt: "Usuarios" },
  { src: "/screenshots/07-reports.png", alt: "Reportes" },
  { src: "/screenshots/08-calendar.png", alt: "Calendario" },
  { src: "/screenshots/09-budgets.png", alt: "Presupuestos" },
];

const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    id: "auth",
    label: "Autenticación",
    screenshotIndex: 0,
    heading: "JWT + RBAC",
    description:
      "Token firmado (HS256, 1 h de validez) almacenado en cookie HttpOnly. Un middleware de Next.js protege todas las rutas privadas sin llamadas extra al servidor. Tres roles con permisos granulares.",
    points: [
      "Cookie HttpOnly — inaccesible desde JS",
      "Middleware Next.js sin round-trip al backend",
      "Roles: ADMIN · OPERATOR · USER",
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    screenshotIndex: 1,
    heading: "Dashboard adaptado por rol",
    description:
      "El ADMIN ve KPIs globales del equipo: proyectos activos, horas totales y rentabilidad. El USER solo accede a sus propias métricas y tareas pendientes. Sin lógica de permisos en el cliente.",
    points: [
      "Métricas de equipo para ADMIN",
      "Vista personal para USER",
      "Skeleton loaders en toda la app",
    ],
  },
  {
    id: "projects",
    label: "Proyectos",
    screenshotIndex: 2,
    heading: "Gestión de proyectos",
    description:
      "CRUD completo con fechas, estado y cliente asociado. El estado pasa automáticamente a COMPLETADO en el backend cuando todas las tareas vinculadas se cierran, sin intervención manual.",
    points: [
      "Estado automático al completar tareas",
      "Vinculación cliente → proyecto → tarea",
      "Historial de actividad por proyecto",
    ],
  },
  {
    id: "time",
    label: "Horas",
    screenshotIndex: 4,
    heading: "Registro de imputaciones",
    description:
      "Imputación de tiempo por tarea, usuario y tipo de actividad. La validación con Zod acepta múltiples formatos de hora sin fricción para el usuario. TanStack Query gestiona la invalidación de caché.",
    points: [
      "Formatos: 1.5 · 1h30m · 1:30",
      "Por tipo: desarrollo, reunión, etc.",
      "Invalidación de caché con TanStack Query",
    ],
  },
  {
    id: "reports",
    label: "Reportes",
    screenshotIndex: 6,
    heading: "Informes exportables",
    description:
      "Informes de tiempo filtrables por proyecto, usuario, tipo y período. Exportación directa a CSV desde la interfaz, sin librerías externas — generado en el cliente con Blob y URL.createObjectURL.",
    points: [
      "Filtros combinados en tiempo real",
      "Exportación CSV nativa sin librerías",
      "Agrupación por período y tipo",
    ],
  },
  {
    id: "budgets",
    label: "Presupuestos",
    screenshotIndex: 8,
    heading: "Control de rentabilidad",
    description:
      "Presupuestos con líneas por categoría. Calcula automáticamente la rentabilidad real comparando horas registradas con horas presupuestadas, detectando desviaciones por proyecto.",
    points: [
      "Horas presupuestadas vs. registradas",
      "Desviación calculada automáticamente",
      "Desglose por categoría de gasto",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <Reveal><SectionLabel number="02">Proyectos</SectionLabel></Reveal>

        <div className="mt-12 space-y-5">
          <Reveal delay={80}><ProdSyncCard /></Reveal>
          <Reveal delay={120}><KicksControlCard /></Reveal>
        </div>
      </div>
    </section>
  );
}

function ProdSyncCard() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = PRODSYNC_SCREENSHOTS.length;

  const currentFeature = FEATURE_HIGHLIGHTS[activeFeature];
  const screenshotIndex = currentFeature.screenshotIndex;

  const prevLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightbox((l) => (l !== null ? (l - 1 + total) % total : null));
    },
    [total]
  );

  const nextLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightbox((l) => (l !== null ? (l + 1) % total : null));
    },
    [total]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prevLightbox, nextLightbox]);

  return (
    <>
      <div
        className="group relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900 to-slate-900/60 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800/50">
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
              TFG · Con Distinción
            </span>
            <h3 className="text-xl font-semibold text-slate-100 mt-2 mb-2 group-hover:text-white transition-colors">
              ProdSync
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl group-hover:text-slate-400 transition-colors">
              Aplicación B2B de gestión de proyectos para equipos de software. CRUD completo de
              clientes, proyectos, tareas e imputaciones de tiempo con control de acceso por rol
              (RBAC), presupuestos y reportes exportables. TFG de DAW con Spring Boot + Next.js.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 pt-1">
            <a
              href="https://github.com/juaandix/ProdSync"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              <GithubIcon size={14} />
              Código
            </a>
          </div>
        </div>

        {/* Feature tabs */}
        <div className="relative px-6 pt-4 pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {FEATURE_HIGHLIGHTS.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(i)}
                className={`shrink-0 text-[11px] font-mono px-3 py-1 rounded-lg border transition-all duration-200 ${
                  i === activeFeature
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature content */}
        <div className="flex flex-col lg:flex-row">
          {/* Screenshot */}
          <div className="relative lg:w-[58%] shrink-0 bg-slate-950/60 overflow-hidden">
            <div
              className="relative aspect-video cursor-zoom-in"
              onClick={() => setLightbox(screenshotIndex)}
            >
              <Image
                key={screenshotIndex}
                src={PRODSYNC_SCREENSHOTS[screenshotIndex].src}
                alt={PRODSYNC_SCREENSHOTS[screenshotIndex].alt}
                fill
                className="object-cover object-top transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={82}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {PRODSYNC_SCREENSHOTS[screenshotIndex].alt}
              </span>
              <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                ampliar
              </span>
            </div>
          </div>

          {/* Feature description */}
          <div className="relative flex flex-col p-6 lg:p-7 flex-1 justify-center min-h-[180px]">
            <h4 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">
              {currentFeature.heading}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-4 group-hover:text-slate-400 transition-colors">
              {currentFeature.description}
            </p>
            <ul className="space-y-2">
              {currentFeature.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  <span className="w-1 h-1 rounded-full bg-blue-400/60 shrink-0 mt-1.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags footer */}
        <div className="relative px-6 pb-5 pt-4 border-t border-slate-800/50">
          <div className="flex flex-wrap gap-1.5">
            {[
              "Spring Boot 3",
              "Next.js 15",
              "React 19",
              "TypeScript",
              "PostgreSQL",
              "Docker",
              "JWT",
              "TanStack Query",
              "Zod",
              "Playwright",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={prevLightbox}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative w-full max-w-5xl mx-8 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PRODSYNC_SCREENSHOTS[lightbox].src}
              alt={PRODSYNC_SCREENSHOTS[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
            />
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={nextLightbox}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {PRODSYNC_SCREENSHOTS[lightbox].alt}
            </span>
            <span className="text-xs font-mono text-slate-600">
              {lightbox + 1} / {total}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function KicksControlCard() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = KICKSCONTROL_SCREENSHOTS.length;

  const currentFeature = KICKS_FEATURE_HIGHLIGHTS[activeFeature];
  const screenshotIndex = currentFeature.screenshotIndex;

  const prevLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightbox((l) => (l !== null ? (l - 1 + total) % total : null));
    },
    [total]
  );

  const nextLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightbox((l) => (l !== null ? (l + 1) % total : null));
    },
    [total]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prevLightbox, nextLightbox]);

  return (
    <>
      <div
        className="group relative rounded-2xl border border-orange-500/20 bg-gradient-to-br from-slate-900 to-slate-900/60 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800/50">
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
              Full-Stack · Java + Next.js
            </span>
            <h3 className="text-xl font-semibold text-slate-100 mt-2 mb-2 group-hover:text-white transition-colors">
              KicksControl
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl group-hover:text-slate-400 transition-colors">
              E-commerce y backoffice de gestión de sneakers con lógica de operaciones retail real.
              Checkout transaccional con defensa en 3 capas contra overselling, KPIs de turno
              (Sell-Through, Días de Cobertura, Merma) y variantes de producto por talla y color.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 pt-1">
            <a
              href="https://github.com/juaandix/kickscontrol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-400 transition-colors"
            >
              <GithubIcon size={14} />
              Código
            </a>
          </div>
        </div>

        {/* Feature tabs */}
        <div className="relative px-6 pt-4 pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {KICKS_FEATURE_HIGHLIGHTS.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(i)}
                className={`shrink-0 text-[11px] font-mono px-3 py-1 rounded-lg border transition-all duration-200 ${
                  i === activeFeature
                    ? "bg-orange-500/15 border-orange-500/40 text-orange-300"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature content */}
        <div className="flex flex-col lg:flex-row">
          {/* Screenshot */}
          <div className="relative lg:w-[58%] shrink-0 bg-slate-950/60 overflow-hidden">
            <div
              className="relative aspect-video cursor-zoom-in"
              onClick={() => setLightbox(screenshotIndex)}
            >
              <Image
                key={screenshotIndex}
                src={KICKSCONTROL_SCREENSHOTS[screenshotIndex].src}
                alt={KICKSCONTROL_SCREENSHOTS[screenshotIndex].alt}
                fill
                className="object-cover object-top transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={82}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {KICKSCONTROL_SCREENSHOTS[screenshotIndex].alt}
              </span>
              <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                ampliar
              </span>
            </div>
          </div>

          {/* Feature description */}
          <div className="relative flex flex-col p-6 lg:p-7 flex-1 justify-center min-h-[180px]">
            <h4 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">
              {currentFeature.heading}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-4 group-hover:text-slate-400 transition-colors">
              {currentFeature.description}
            </p>
            <ul className="space-y-2">
              {currentFeature.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  <span className="w-1 h-1 rounded-full bg-orange-400/60 shrink-0 mt-1.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags footer */}
        <div className="relative px-6 pb-5 pt-4 border-t border-slate-800/50">
          <div className="flex flex-wrap gap-1.5">
            {[
              "Java 17",
              "Spring Boot 3.5",
              "Next.js 16",
              "React 19",
              "TypeScript",
              "PostgreSQL 16",
              "Docker",
              "JWT",
              "TanStack Query v5",
              "Recharts",
              "Playwright",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={prevLightbox}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative w-full max-w-5xl mx-8 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={KICKSCONTROL_SCREENSHOTS[lightbox].src}
              alt={KICKSCONTROL_SCREENSHOTS[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
            />
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            onClick={nextLightbox}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {KICKSCONTROL_SCREENSHOTS[lightbox].alt}
            </span>
            <span className="text-xs font-mono text-slate-600">
              {lightbox + 1} / {total}
            </span>
          </div>
        </div>
      )}
    </>
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
