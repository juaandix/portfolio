export interface Screenshot {
  src: string;
  alt: string;
}

export interface FeatureHighlight {
  id: string;
  label: string;
  screenshotIndex: number;
  heading: string;
  description: string;
  points: string[];
}

/** Color del halo de luz detrás de las capturas. */
export type Tint = "violet" | "blue" | "orange" | "emerald";

export interface Project {
  id: string;
  name: string;
  /** Qué es, en una línea: va en la franja visible de la carpeta. */
  badge: string;
  summary: string;
  tint: Tint;
  /** Claves de TECH_FILTERS que usa el proyecto. */
  stack: string[];
  /** "phone" muestra capturas verticales de móvil. */
  device: "desktop" | "phone";
  repo: string;
  demo?: string;
  screenshots: Screenshot[];
  features: FeatureHighlight[];
  tags: string[];
}

/** Tecnologías por las que se puede filtrar, en el orden en que salen. */
export const TECH_FILTERS = [
  "Java",
  "Spring Boot",
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Python",
  "IA / RAG",
  "Angular",
  "Node.js",
  "JavaScript",
  "PWA",
  "JWT / OAuth",
  "Playwright",
];

export const PROJECTS: Project[] = [
  {
    id: "documind",
    name: "DocuMind",
    badge: "SaaS con IA y microservicios",
    summary:
      "Plataforma SaaS de análisis de documentos con IA. Los usuarios suben documentos, los interrogan mediante chat con RAG (LangChain + MongoDB vectorSearch) y colaboran en tiempo real dentro de un workspace multi-tenant. Microservicio de notificaciones en Node.js, panel admin en Angular 17 y procesamiento async con Celery.",
    tint: "violet",
    stack: ["Python", "IA / RAG", "Angular", "Node.js", "Docker", "JWT / OAuth"],
    device: "desktop",
    repo: "https://github.com/juaandix/documind",
    screenshots: [
      { src: "/documind/02_dashboard.png", alt: "Dashboard" },
      { src: "/documind/04_documents.png", alt: "Documentos" },
      { src: "/documind/05_documents_filtered.png", alt: "Filtros" },
      { src: "/documind/07c_room_engineering.png", alt: "Chat RAG" },
      { src: "/documind/09_members.png", alt: "Workspace" },
      { src: "/documind/admin_02_dashboard.png", alt: "Admin Panel" },
    ],
    features: [
      {
        id: "dashboard",
        label: "Dashboard",
        screenshotIndex: 0,
        heading: "Multi-tenant workspace",
        description:
          "Cada empresa tiene su propio workspace aislado. El registro crea usuario + workspace en una sola transacción. JWT con roles por workspace (OWNER / ADMIN / MEMBER) y rol de plataforma PLATFORM_ADMIN.",
        points: [
          "Aislamiento por workspace_id en todos los queries",
          "JWT access (60 min) + refresh (30 días)",
          "Roles: OWNER · ADMIN · MEMBER · PLATFORM_ADMIN",
        ],
      },
      {
        id: "documents",
        label: "Documentos",
        screenshotIndex: 1,
        heading: "Pipeline RAG con Celery",
        description:
          "Subida con drag & drop y barra de progreso real. El procesamiento es completamente async: Celery extrae texto, chunkea (~500 tokens, overlap 50), genera embeddings y los indexa en MongoDB Atlas vectorSearch.",
        points: [
          "Chunking 500 tokens con overlap de 50",
          "Embeddings OpenAI text-embedding-3-small (1536 dims)",
          "Polling UPLOADING → PROCESSING → READY / ERROR",
        ],
      },
      {
        id: "rag",
        label: "Chat RAG",
        screenshotIndex: 3,
        heading: "Respuestas en streaming con fuentes",
        description:
          "El pipeline busca los K chunks más similares por coseno filtrados por workspace y documentos de la sala, los inyecta como contexto en el LLM y emite la respuesta token a token por WebSocket. Cada mensaje cita los fragmentos fuente con su score.",
        points: [
          "vectorSearch MongoDB Atlas + filtro por workspace",
          "Streaming token a token por WebSocket",
          "Fuentes citadas con score de similitud",
        ],
      },
      {
        id: "workspace",
        label: "Workspace",
        screenshotIndex: 4,
        heading: "Colaboración y notificaciones",
        description:
          "Invitación de miembros por token de un solo uso (7 días). Notificaciones en tiempo real: FastAPI publica en Redis pub/sub → Node.js consume → broadcast por WebSocket. Emails HTML de invitación con Nodemailer.",
        points: [
          "Invitación por token de un solo uso (7 días)",
          "Redis pub/sub como bus de eventos entre servicios",
          "Centro de notificaciones con badge de no leídas",
        ],
      },
      {
        id: "admin",
        label: "Admin Panel",
        screenshotIndex: 5,
        heading: "Panel Angular con NgRx",
        description:
          "Panel independiente en Angular 17 con Standalone Components y NgRx. Métricas globales de la plataforma, gráfico de actividad de 7 días, listado de usuarios con última conexión y logs de auditoría filtrable por estado HTTP.",
        points: [
          "NgRx store / effects / selectors para estado global",
          "Chart.js: bar chart + doughnut de distribución",
          "Logs de auditoría con filtro por HTTP status",
        ],
      },
    ],
    tags: [
      "FastAPI",
      "Python",
      "LangChain",
      "MongoDB Atlas",
      "Vue.js 3",
      "Angular 17",
      "Node.js",
      "Celery",
      "Redis",
      "WebSocket",
      "Docker",
      "JWT",
    ],
  },
  {
    id: "prodsync",
    name: "ProdSync",
    badge: "Proyecto final con distinción",
    summary:
      "Aplicación B2B de gestión de proyectos para equipos de software. CRUD completo de clientes, proyectos, tareas e imputaciones de tiempo con control de acceso por rol (RBAC), presupuestos y reportes exportables. TFG de DAW con Spring Boot + Next.js.",
    tint: "blue",
    stack: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "JWT / OAuth", "Playwright"],
    device: "desktop",
    repo: "https://github.com/juaandix/ProdSync",
    screenshots: [
      { src: "/screenshots/01-login.png", alt: "Login" },
      { src: "/screenshots/02-dashboard.png", alt: "Dashboard" },
      { src: "/screenshots/03-projects.png", alt: "Proyectos" },
      { src: "/screenshots/04-clients.png", alt: "Clientes" },
      { src: "/screenshots/05-time-entries.png", alt: "Registro de horas" },
      { src: "/screenshots/06-users.png", alt: "Usuarios" },
      { src: "/screenshots/07-reports.png", alt: "Reportes" },
      { src: "/screenshots/08-calendar.png", alt: "Calendario" },
      { src: "/screenshots/09-budgets.png", alt: "Presupuestos" },
    ],
    features: [
      {
        id: "auth",
        label: "Autenticación",
        screenshotIndex: 0,
        heading: "JWT + RBAC",
        description:
          "Token firmado (HS256, 1 h de validez) almacenado en cookie HttpOnly. Un middleware de Next.js protege todas las rutas privadas sin llamadas extra al servidor. Tres roles con permisos granulares.",
        points: [
          "Cookie HttpOnly: inaccesible desde JS",
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
          "Informes de tiempo filtrables por proyecto, usuario, tipo y período. Exportación directa a CSV desde la interfaz, sin librerías externas: generado en el cliente con Blob y URL.createObjectURL.",
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
    ],
    tags: [
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
    ],
  },
  {
    id: "kickscontrol",
    name: "KicksControl",
    badge: "E-commerce y backoffice retail",
    summary:
      "E-commerce y backoffice de gestión de sneakers con lógica de operaciones retail real. Checkout transaccional con defensa en 3 capas contra overselling, KPIs de turno (Sell-Through, Días de Cobertura, Merma) y variantes de producto por talla y color.",
    tint: "orange",
    stack: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "JWT / OAuth", "Playwright"],
    device: "desktop",
    repo: "https://github.com/juaandix/kickscontrol",
    screenshots: [
      { src: "/kickscontrol/01-hero-desktop.png", alt: "Tienda" },
      { src: "/kickscontrol/02-catalog-grid.png", alt: "Catálogo" },
      { src: "/kickscontrol/04-product-detail-selected.png", alt: "Producto" },
      { src: "/kickscontrol/08-cart-drawer.png", alt: "Carrito" },
      { src: "/kickscontrol/10-checkout-payment.png", alt: "Checkout" },
      { src: "/kickscontrol/06-backoffice-dashboard-full.png", alt: "KPI Dashboard" },
      { src: "/kickscontrol/07-backoffice-inventory.png", alt: "Inventario" },
    ],
    features: [
      {
        id: "store",
        label: "Tienda",
        screenshotIndex: 0,
        heading: "E-commerce completo",
        description:
          "Catálogo de sneakers con carrito persistente en servidor, checkout transaccional y pasarela de pago simulada con descarga de recibo en PDF. Sin localStorage: el estado del carrito se sincroniza entre pestañas y dispositivos.",
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
          "Hasta 7 filtros combinables (marca, talla, color, género, in-stock…) construidos dinámicamente con la Criteria API. Los filtros se almacenan en la URL: el catálogo es bookmarkeable y compartible con estado activo.",
        points: [
          "7 filtros combinables sin 127 métodos de repo",
          "Subqueries EXISTS por talla para evitar duplicados",
          "URL state: bookmarkeable y compartible",
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
          "@Version: Hibernate rechaza el segundo UPDATE",
          "SELECT FOR UPDATE: bloqueo a nivel de fila",
          "CHECK stock_quantity >= 0: última línea de defensa",
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
    ],
    tags: [
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
    ],
  },
  {
    id: "dietapp",
    name: "DietApp",
    badge: "PWA de nutrición que uso a diario",
    summary:
      "App de nutrición que uso a diario: menú intercambiable, registro de comidas y ajuste automático de cantidades para cuadrar kcal y proteína. Instalable en Android e iOS, funciona sin conexión y se sincroniza con Google Health (Fitbit) sin servidor propio. JavaScript vanilla, sin build ni dependencias.",
    tint: "emerald",
    stack: ["JavaScript", "PWA", "JWT / OAuth"],
    device: "phone",
    repo: "https://github.com/juaandix/menu-jd",
    screenshots: [
      { src: "/dietapp/01-hoy.png", alt: "Hoy" },
      { src: "/dietapp/02-franjas.png", alt: "Franjas del día" },
      { src: "/dietapp/03-editor.png", alt: "Editor de platos" },
      { src: "/dietapp/04-sustitutos.png", alt: "Sustitutos" },
      { src: "/dietapp/05-semana.png", alt: "Semana" },
      { src: "/dietapp/06-menu.png", alt: "Menú" },
    ],
    features: [
      {
        id: "today",
        label: "Registro",
        screenshotIndex: 0,
        heading: "Objetivo que se ajusta a tu día",
        description:
          "El marcador muestra las kcal restantes y la proteína pendiente. El objetivo depende del tipo de día (trabajo, gimnasio, descanso) y se corrige con los pasos reales: (pasos − referencia) × 0,0004 × kg, redondeado y limitado a ±400 kcal.",
        points: [
          "Objetivo por tipo de día + ajuste por pasos",
          "Varios perfiles, cada uno con su propio registro",
          "Copia de seguridad JSON con migración de versiones",
        ],
      },
      {
        id: "fit",
        label: "Ajuste automático",
        screenshotIndex: 2,
        heading: "Cantidades calculadas, no adivinadas",
        description:
          "Al cambiar un ingrediente, el resto del plato se reajusta para seguir cumpliendo sus macros. Es un problema de mínimos cuadrados con límites, resuelto por descenso de coordenadas sobre los gramos y redondeado a cantidades que se pueden pesar en una cocina.",
        points: [
          "Tolerancias ponderadas: ±15 kcal y ±3 g de proteína",
          "Unidades enteras, gramos de 5 en 5 y topes por grupo",
          "Ingredientes fijados a mano que el ajuste respeta",
        ],
      },
      {
        id: "subs",
        label: "Sustitutos",
        screenshotIndex: 3,
        heading: "Recomendador de sustitutos",
        description:
          "Para cada ingrediente propone los 5 alimentos del catálogo que mejor lo reemplazan: mismo grupo nutricional, macros parecidos y una cantidad realista. Excluye lo que has marcado que te falta en casa.",
        points: [
          "Catálogo de 145 alimentos con macros por 100 g",
          "Parser de ingredientes en texto libre → catálogo",
          "Conversión cocido ↔ crudo para la lista de la compra",
        ],
      },
      {
        id: "week",
        label: "Semana",
        screenshotIndex: 4,
        heading: "Semana, compra y costes",
        description:
          "Medias de kcal y proteína frente al objetivo, balance semanal y gráfica en SVG sin librerías. La lista de la compra suma los ingredientes de lo planificado y calcula el coste con los precios que introduces.",
        points: [
          "Gráficas SVG generadas a mano",
          "Tendencia de peso por regresión lineal (28 días)",
          "Planificación de días futuros con Deshacer",
        ],
      },
      {
        id: "sync",
        label: "Offline + Google",
        screenshotIndex: 1,
        heading: "Offline-first e integración con Google Health",
        description:
          "Service worker con caché versionada, de red primero, para no mezclar versiones tras un despliegue en GitHub Pages. OAuth 2.0 en el navegador para leer pasos y peso y enviar las comidas a Google Health, y para proponer el tipo de día a partir de Google Calendar.",
        points: [
          "Instalable en iOS y Android, funciona sin conexión",
          "Envío idempotente: solo reenvía los días que cambian",
          "Google Health API v4 + Calendar API, sin backend",
        ],
      },
    ],
    tags: [
      "JavaScript",
      "PWA",
      "Service Worker",
      "OAuth 2.0",
      "Google Health API",
      "Google Calendar API",
      "SVG",
      "Offline-first",
    ],
  },
];

