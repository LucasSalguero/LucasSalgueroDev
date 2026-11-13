import type { Project } from "@/lib/schemas";

export const misAlquileres: Project = {
  slug: "mis-alquileres",
  title: "MisAlquileres",
  tagline: "Gestión de alquileres: propiedades, inquilinos, contratos y pagos en un solo panel.",
  kind: "personal",
  year: 2026,
  featured: false,
  order: 3,
  stack: ["Next.js 15", "Express", "TypeScript", "Prisma", "Zod", "JWT"],
  summary:
    "Panel para que un dueño o administrador controle propiedades, inquilinos, contratos y pagos.",
  features: [],
  decisions: [
    {
      title: "Backend en capas",
      description: "Backend en capas: Controller → Service → Repository.",
    },
    {
      title: "Autenticación y validación",
      description: "JWT con autorización por roles, validación con Zod y transacciones con Prisma.",
    },
    {
      title: "Despliegue",
      description: "Frontend en Vercel; API y PostgreSQL en Render.",
    },
  ],
  nextSteps: ["cookies HttpOnly", "paginación", "tests automatizados", "Docker"],
  links: {
    repo: "https://github.com/LucasSalguero/MisAlquileres",
    demo: "https://mis-alquileres-ten.vercel.app/",
  },
  images: [],

  heading: "MisAlquileres: gestión de alquileres",
  highlights: [
    { text: "Backend en capas: Controller → Service → Repository." },
    { text: "JWT con autorización por roles, validación con Zod y transacciones con Prisma." },
    { text: "Frontend en Vercel; API y PostgreSQL en Render." },
  ],
};
