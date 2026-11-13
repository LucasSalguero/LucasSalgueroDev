import type { Skills } from "@/lib/schemas";

export const skills: Skills = {
  eyebrow: "Habilidades",
  title: "Con qué trabajo",
  groups: [
    { label: "Lenguajes", items: ["TypeScript", "JavaScript", "C#", "SQL"] },
    {
      label: "Backend",
      items: [
        "Node.js",
        "Express",
        ".NET",
        "ASP.NET Web API",
        "Next.js Server Actions",
        "APIs REST",
        "JWT",
      ],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Blazor", "PWA", "Service Workers", "IndexedDB"],
    },
    { label: "Datos", items: ["PostgreSQL", "SQL Server", "Prisma", "Entity Framework"] },
    {
      label: "Herramientas",
      items: ["Git", "GitHub Actions", "Swagger", "Figma", "Trello", "Vercel", "Render"],
    },
    {
      label: "Prácticas",
      items: [
        "Arquitectura en capas y vertical slices",
        "SOLID",
        "testing automatizado",
        "seguridad web",
        "Scrum",
      ],
    },
  ],
};
