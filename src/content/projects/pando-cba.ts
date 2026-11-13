import type { Project } from "@/lib/schemas";

export const pandoCba: Project = {
  slug: "pando-cba",
  title: "PandoCBA",
  tagline: "E-commerce de drops de ropa con stock limitado por talle y color.",
  kind: "tesis",
  year: 2026,
  featured: false,
  order: 2,
  stack: ["Node.js", "Express 5", "Prisma", "PostgreSQL", "Next.js", "MercadoPago"],
  summary:
    "Tienda para una marca de Córdoba que lanza colecciones con stock limitado por talle y color. Hecho en equipo para la Práctica Profesionalizante, con planificación en Trello.",
  features: [
    {
      title: "Compra online",
      description: "Carrito, checkout y pagos online con MercadoPago.",
    },
    {
      title: "Reserva de stock",
      description: "Reserva de stock FIFO para que dos compras no se lleven la última unidad.",
    },
    {
      title: "Jobs programados",
      description: "Jobs programados con GitHub Actions para vencer órdenes y conciliar pagos.",
    },
  ],
  decisions: [],
  role: "Autenticación y rutas de usuario, validaciones y seguridad de endpoints, carrito persistido en cookie, panel de administración, notificaciones por email, rol vendedor con venta en local, y estadísticas y ranking para el administrador (con sus tests).",
  team: "Trabajo final hecho en equipo para la Práctica Profesionalizante, para una marca real de Córdoba y con planificación en Trello.",
  nextSteps: [],
  links: {
    repo: "https://github.com/JesusMosconi/PandoCbaV2",
    repoLabel: "Repositorio (backend)",
  },
  images: [],

  heading: "PandoCBA: e-commerce de drops de ropa",
  eyebrow: "Trabajo final · cliente real · 2026",
  highlights: [
    { text: "Carrito, checkout y pagos online con MercadoPago." },
    { text: "Reserva de stock FIFO para que dos compras no se lleven la última unidad." },
    { text: "Jobs programados con GitHub Actions para vencer órdenes y conciliar pagos." },
  ],
};
