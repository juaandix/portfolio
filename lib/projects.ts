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
      "Aplicación B2B de gestión de proyectos para equipos de software: clientes, proyectos, tareas, horas y presupuestos con control de acceso por rol (RBAC). Interfaz oscura de cristal diseñada a medida, con dashboard tipo bento, tarjetas con datos reales y avatares generados. TFG de DAW con Spring Boot + Next.js.",
    tint: "blue",
    stack: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "JWT / OAuth", "Playwright"],
    device: "desktop",
    repo: "https://github.com/juaandix/ProdSync",
    screenshots: [
      { src: "/screenshots/01-login.png", alt: "Login" },
      { src: "/screenshots/02-dashboard.png", alt: "Dashboard" },
      { src: "/screenshots/03-projects.png", alt: "Proyectos" },
      { src: "/screenshots/04-clients.png", alt: "Clientes" },
      { src: "/screenshots/05-time-entries.png", alt: "Diario de horas" },
      { src: "/screenshots/06-users.png", alt: "Usuarios" },
      { src: "/screenshots/07-reports.png", alt: "Informes" },
      { src: "/screenshots/08-calendar.png", alt: "Calendario" },
      { src: "/screenshots/09-budgets.png", alt: "Presupuestos" },
      { src: "/screenshots/10-client-detail.png", alt: "Ficha de cliente" },
      { src: "/screenshots/11-project-detail.png", alt: "Ficha de proyecto" },
      { src: "/screenshots/12-user-detail.png", alt: "Ficha de usuario" },
    ],
    features: [
      {
        id: "auth",
        label: "Autenticación",
        screenshotIndex: 0,
        heading: "JWT + RBAC",
        description:
          "Login con JWT firmado (HS256, 24 h) enviado como Bearer en cada petición. Un middleware de Next.js protege las rutas privadas y por rol sin llamar al backend, y Spring Security lo vuelve a comprobar con @PreAuthorize. La pantalla de acceso incluye un recorrido por la app y una cuenta demo para quien la evalúa.",
        points: [
          "Middleware Next.js sin round-trip al backend",
          "@PreAuthorize en cada endpoint",
          "Roles: ADMIN · OPERATOR · USER",
          "Sesión de 1 día o hasta cerrar el navegador",
        ],
      },
      {
        id: "dashboard",
        label: "Dashboard",
        screenshotIndex: 1,
        heading: "Dashboard tipo bento por rol",
        description:
          "Anillos del día, horas destacadas con reparto por tipo de trabajo, estado de tareas y progreso real de cada proyecto. Todas las cifras salen de las horas registradas; la variación mensual compara el mismo tramo del mes anterior.",
        points: [
          "Vista de equipo (ADMIN/OPERATOR) y personal (USER)",
          "Un único acento para la cifra principal",
          "Animaciones que respetan reduced-motion",
        ],
      },
      {
        id: "projects",
        label: "Proyectos",
        screenshotIndex: 2,
        heading: "Proyectos en tarjetas con datos reales",
        description:
          "Cada tarjeta muestra cliente con su logo, plazo restante, tareas, horas y el equipo que ha imputado. El estado pasa solo a COMPLETADO en el backend cuando se cierran todas las tareas.",
        points: [
          "Plazo con aviso de vencido",
          "Avance real por tareas completadas",
          "Vista tarjetas o lista con acciones en bloque",
        ],
      },
      {
        id: "clients",
        label: "Clientes",
        screenshotIndex: 9,
        heading: "Logos de cliente y panel de equipo",
        description:
          "Los clientes pueden tener logo propio, guardado en una tabla aparte y validado por la firma del archivo (un SVG renombrado se rechaza). La ficha resume horas, proyectos y quién trabaja para ese cliente.",
        points: [
          "PNG/JPG/WebP hasta 1 MB, servido con nosniff",
          "Caché versionada con logoVersion",
          "Monograma de color si no hay logo",
        ],
      },
      {
        id: "time",
        label: "Horas",
        screenshotIndex: 4,
        heading: "Diario de imputaciones",
        description:
          "Las horas se ven como un diario agrupado por días, con avatar, cliente, proyecto y tipo de trabajo. La validación con Zod acepta varios formatos de hora y TanStack Query invalida la caché al guardar.",
        points: [
          "Formatos: 1.5 · 1h30m · 1:30",
          "Colores por tipo validados para daltonismo",
          "Tabla clásica disponible como vista Lista",
        ],
      },
      {
        id: "reports",
        label: "Informes",
        screenshotIndex: 6,
        heading: "Informes exportables",
        description:
          "Informes de tiempo filtrables por proyecto, usuario, tipo y período. La exportación a CSV se genera en el cliente con Blob y URL.createObjectURL, sin librerías externas.",
        points: [
          "Filtros combinados en tiempo real",
          "Exportación CSV nativa sin librerías",
          "Agrupación por mes y tipo de trabajo",
        ],
      },
      {
        id: "budgets",
        label: "Presupuestos",
        screenshotIndex: 8,
        heading: "Presupuestos y rentabilidad",
        description:
          "Presupuestos con líneas, estados (borrador, enviado, aceptado, rechazado) y validez. Vinculados a un proyecto, comparan las horas registradas con las presupuestadas y avisan de la desviación.",
        points: [
          "Horas presupuestadas vs. registradas",
          "Desviación calculada automáticamente",
          "Aviso de caducidad de la oferta",
        ],
      },
    ],
    tags: [
      "Spring Boot 3",
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
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
    badge: "E-commerce, TPV y backoffice",
    summary:
      "Tienda de zapatillas y ropa con tres caras sobre un único stock por talla y color: tienda online, tienda física con caja (TPV) y backoffice de operaciones. El checkout y la caja comparten la defensa en 3 capas contra overselling, cada ajuste de stock queda trazado con su autor y el dashboard mide los KPIs de turno de una tienda real: sell-through, días de cobertura y merma.",
    tint: "orange",
    stack: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "JWT / OAuth", "Playwright"],
    device: "desktop",
    repo: "https://github.com/juaandix/kickscontrol",
    screenshots: [
      { src: "/kickscontrol/01-web-portada.png", alt: "Tienda online" },
      { src: "/kickscontrol/05-web-producto-talla.png", alt: "Producto" },
      { src: "/kickscontrol/07-web-checkout-pago.png", alt: "Checkout" },
      { src: "/kickscontrol/15-tienda-catalogo.png", alt: "Tienda física" },
      { src: "/kickscontrol/18-tienda-caja-ticket.png", alt: "Caja" },
      { src: "/kickscontrol/09-backoffice-dashboard.png", alt: "KPI Dashboard" },
      { src: "/kickscontrol/11-backoffice-inventario-matriz.png", alt: "Inventario" },
      { src: "/kickscontrol/10-backoffice-ajuste-stock.png", alt: "Ajuste de stock" },
    ],
    features: [
      {
        id: "store",
        label: "Tienda online",
        screenshotIndex: 0,
        heading: "Una tienda con identidad de almacén",
        description:
          "Base blanca al nivel de Kith o SVD con personalidad propia: una franja de stock en directo sobre la cabecera, la etiqueta de la caja de zapatos en cada producto y una página con diseño propio por categoría. El catálogo combina hasta 7 filtros con JPA Specifications y los guarda en la URL.",
        points: [
          "Stock en directo: referencias y unidades reales",
          "7 filtros combinables, compartibles por URL",
          "Carrito como estado de servidor (TanStack Query)",
        ],
      },
      {
        id: "product",
        label: "Producto",
        screenshotIndex: 1,
        heading: "Variantes reales por talla y color",
        description:
          "Cada modelo tiene variantes independientes con su SKU, su stock y su suplemento de precio. La ficha enseña el stock de cada talla y, al elegir una, imprime la etiqueta de esa caja con el código de barras generado a partir de la referencia.",
        points: [
          "SKU único por talla + color",
          "Matriz talla × color con unidades reales",
          "Etiqueta de caja con código de barras",
        ],
      },
      {
        id: "checkout",
        label: "Checkout",
        screenshotIndex: 2,
        heading: "Defensa en 3 capas contra overselling",
        description:
          "Optimistic Lock (@Version), Pessimistic Lock (SELECT FOR UPDATE) y CHECK constraint de BD actúan dentro de un único método @Transactional. Ese descuento de stock es el mismo que usa la caja de la tienda física, así que la web y el mostrador nunca venden dos veces la última unidad.",
        points: [
          "@Version: Hibernate rechaza el segundo UPDATE",
          "SELECT FOR UPDATE: bloqueo a nivel de fila",
          "Mismo método para el checkout online y la caja",
        ],
      },
      {
        id: "physical-store",
        label: "Tienda física",
        screenshotIndex: 3,
        heading: "Modo tienda para los dispositivos del local",
        description:
          "La tienda física abre en /tienda: una portada con Catálogo, Caja e Inventario. El catálogo es público y enseña las tallas que quedan en el almacén; la caja y el inventario piden el acceso del personal y, al entrar, vuelven a la pantalla pedida.",
        points: [
          "Un único stock compartido con la web",
          "Caja e inventario solo para el personal",
          "Ventas etiquetadas por canal: online o tienda",
        ],
      },
      {
        id: "till",
        label: "Caja",
        screenshotIndex: 4,
        heading: "TPV: escanear, cobrar y entregar",
        description:
          "El lector de códigos teclea el SKU y la caja lo añade al ticket; si se escribe un modelo, busca y muestra sus tallas. El ticket no deja vender más unidades de las que hay, el cobro en efectivo calcula el cambio y la venta nace entregada, a nombre del dependiente.",
        points: [
          "Escaneo de SKU o búsqueda por modelo",
          "Tarjeta o efectivo con cálculo del cambio",
          "El servidor valida stock e importe entregado",
        ],
      },
      {
        id: "dashboard",
        label: "KPI Dashboard",
        screenshotIndex: 5,
        heading: "KPIs de operaciones retail reales",
        description:
          "Las métricas son las que se usan en un turno real, con rango de fechas y granularidad día / semana / mes. Cuentan las ventas de la web y de la caja, y cada número sale de la API: la merma se calcula sobre el registro real de ajustes.",
        points: [
          "Sell-Through Rate: vendidas / (vendidas + stock)",
          "Días de Cobertura: stock / ventas diarias medias",
          "Merma: uds perdidas / (vendidas + perdidas)",
        ],
      },
      {
        id: "inventory",
        label: "Inventario",
        screenshotIndex: 7,
        heading: "Stock trazable por variante",
        description:
          "El inventario se ve como una estantería: una matriz talla × color por modelo donde cada caja se pulsa para ajustarla. Cada ajuste guarda autor, motivo y stock resultante en la misma transacción, y el servidor valida el motivo: una merma no puede sumar unidades.",
        points: [
          "Registro de movimientos con autor y stock final",
          "Lista de reposición: de la talla más vacía a la menos",
          "Reglas de motivo validadas en el servidor",
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
      "Tailwind CSS 4",
      "Docker",
      "JWT",
      "TanStack Query v5",
      "Recharts",
      "Vitest",
      "Playwright",
    ],
  },
  {
    id: "dietapp",
    name: "DietApp",
    badge: "PWA de nutrición conectada a Google",
    summary:
      "App de nutrición que uso a diario: menú intercambiable, registro de comidas y ajuste automático de cantidades para cuadrar kcal y proteína. Se conecta con Google sin servidor propio: trae pasos y peso del Fitbit desde Google Health, le envía las comidas del día y lee Google Calendar para saber si ese día trabajo. Instalable en Android e iOS, funciona sin conexión. JavaScript vanilla, sin build ni dependencias.",
    tint: "emerald",
    stack: ["JavaScript", "PWA", "JWT / OAuth", "Playwright"],
    device: "phone",
    repo: "https://github.com/juaandix/menu-jd",
    demo: "https://juaandix.github.io/menu-jd/",
    screenshots: [
      { src: "/dietapp/01-hoy.png", alt: "Hoy" },
      { src: "/dietapp/02-google.png", alt: "Conexión con Google" },
      { src: "/dietapp/03-franjas.png", alt: "Franjas del día" },
      { src: "/dietapp/04-anadir.png", alt: "Añadir comida" },
      { src: "/dietapp/05-plato.png", alt: "Menú" },
      { src: "/dietapp/06-sustitutos.png", alt: "Sustitutos" },
      { src: "/dietapp/07-semana.png", alt: "Semana" },
      { src: "/dietapp/08-fitbit.png", alt: "Pasos y peso de Fitbit" },
    ],
    features: [
      {
        id: "health",
        label: "Google Health",
        screenshotIndex: 7,
        heading: "Fitbit ↔ Google Health, en los dos sentidos",
        description:
          "Lee los pasos y el peso del Fitbit con la Google Health API v4 (la Fitbit Web API se apaga en octubre de 2026) y le devuelve las comidas registradas con sus kcal y macros. Al abrir la app o recuperar conexión se sincronizan solos los últimos días si el token sigue vivo.",
        points: [
          "Pasos por dailyRollUp y peso por día local",
          "Comidas como nutrition-log con su franja y hora",
          "Envío idempotente: firma por día, borra y recrea si cambia",
        ],
      },
      {
        id: "calendar",
        label: "Google Calendar",
        screenshotIndex: 0,
        heading: "El calendario decide el objetivo del día",
        description:
          "Busca una palabra clave («turno») en los eventos del día y propone el tipo de día: trabajo o libre. El objetivo de kcal sale de ese tipo de día y se corrige con los pasos reales que trae Fitbit, así que el marcador se ajusta sin tocar nada.",
        points: [
          "OAuth 2.0 en el navegador con Google Identity Services",
          "Un token corto por permiso, sin mezclar scopes (evita el 403)",
          "Script de Google cargado solo al usarlo: el resto va offline",
        ],
      },
      {
        id: "today",
        label: "Registro",
        screenshotIndex: 2,
        heading: "Registrar en pocos toques",
        description:
          "Comidas por franja con su objetivo, productos rápidos de un toque, «lo de siempre», copiar de otro día y deshacer. El objetivo depende del tipo de día y de los pasos: (pasos − referencia) × 0,0004 × kg, limitado a ±400 kcal.",
        points: [
          "Buscador de platos e ingredientes del catálogo",
          "Escáner de códigos (Open Food Facts) y OCR en el móvil",
          "Varios perfiles, cada uno con su plan y su registro",
        ],
      },
      {
        id: "fit",
        label: "Ajuste automático",
        screenshotIndex: 4,
        heading: "Cantidades calculadas, no adivinadas",
        description:
          "Al cambiar un ingrediente, el resto del plato se reajusta para seguir cumpliendo sus macros: mínimos cuadrados con límites, resuelto por descenso de coordenadas. Para cada ingrediente propone los 5 mejores sustitutos del catálogo por grupo y macros.",
        points: [
          "Tolerancias ponderadas: ±15 kcal y ±3 g de proteína",
          "Gramos de 5 en 5, unidades enteras y topes por grupo",
          "Catálogo de 145 alimentos con parser de texto libre",
        ],
      },
      {
        id: "week",
        label: "Semana",
        screenshotIndex: 6,
        heading: "Semana, peso y offline-first",
        description:
          "Medias de kcal, proteína y pasos frente al objetivo, balance y gráficas en SVG sin librerías. El service worker, de red primero y saltándose la caché HTTP de GitHub Pages, hace que la app funcione sin conexión sin mezclar versiones tras un despliegue.",
        points: [
          "Tendencia de peso por regresión lineal",
          "Lista de la compra con costes y conversión cocido ↔ crudo",
          "64 tests sin framework, con la API de Google simulada",
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
      "Google Identity Services",
      "Open Food Facts",
      "tesseract.js",
      "Offline-first",
    ],
  },
];

