import type { Project } from "@/lib/schemas";

export const billeteraVirtual: Project = {
  slug: "billetera-virtual",
  title: "Billetera Virtual",
  tagline: "Aplicación web de cuentas virtuales, transferencias y moneda digital.",
  kind: "academico",
  year: 2025,
  featured: false,
  order: 4,
  stack: ["C#", "ASP.NET Web API", "Blazor", "Entity Framework", "SQL Server"],
  summary: "Aplicación web de cuentas virtuales, transferencias y moneda digital.",
  features: [],
  decisions: [
    {
      title: "API documentada",
      description: "API REST documentada con Swagger.",
    },
    {
      title: "Acceso a datos",
      description: "Repository y Unit of Work sobre Entity Framework.",
    },
    {
      title: "Arquitectura",
      description: "Arquitectura limpia y principios SOLID.",
    },
  ],
  nextSteps: [],
  links: {},
  images: [],

  highlights: [
    { text: "API REST documentada con Swagger." },
    { text: "Repository y Unit of Work sobre Entity Framework." },
    { text: "Arquitectura limpia y principios SOLID." },
  ],
};
