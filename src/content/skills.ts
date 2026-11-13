import type { Skills } from "@/lib/schemas";

export const skills: Skills = {
  eyebrow: "Habilidades",
  title: "Con qué trabajo",
  groups: [
    {
      label: "Lenguajes",
      items: [
        { name: "TypeScript", logo: "/images/tech/typescript.svg" },
        { name: "JavaScript", logo: "/images/tech/javascript.svg" },
        { name: "C#", logo: "/images/tech/csharp.svg" },
        { name: "SQL" },
      ],
    },
    {
      label: "Backend",
      items: [
        { name: "Node.js", logo: "/images/tech/nodejs.svg" },
        { name: "Express", logo: "/images/tech/express.svg", monochrome: true },
        { name: ".NET", logo: "/images/tech/dotnet.svg" },
        { name: "ASP.NET Web API" },
        { name: "Next.js Server Actions" },
        { name: "APIs REST" },
        { name: "JWT", logo: "/images/tech/jwt.svg" },
      ],
    },
    {
      label: "Frontend",
      items: [
        { name: "React", logo: "/images/tech/react.svg" },
        { name: "Next.js", logo: "/images/tech/nextjs.svg", monochrome: true },
        { name: "Tailwind CSS", logo: "/images/tech/tailwindcss.svg" },
        { name: "Blazor", logo: "/images/tech/blazor.svg" },
        { name: "PWA" },
        { name: "Service Workers" },
        { name: "IndexedDB" },
      ],
    },
    {
      label: "Datos",
      items: [
        { name: "PostgreSQL", logo: "/images/tech/postgresql.svg" },
        { name: "SQL Server", logo: "/images/tech/sqlserver.svg" },
        { name: "Prisma", logo: "/images/tech/prisma.svg", monochrome: true },
        { name: "Entity Framework", logo: "/images/tech/entity-framework.svg" },
      ],
    },
    {
      label: "Herramientas",
      items: [
        { name: "Git", logo: "/images/tech/git.svg" },
        { name: "GitHub Actions", logo: "/images/tech/github-actions.svg" },
        { name: "Swagger", logo: "/images/tech/swagger.svg" },
        { name: "Figma", logo: "/images/tech/figma.svg" },
        { name: "Trello", logo: "/images/tech/trello.svg" },
        { name: "Vercel", logo: "/images/tech/vercel.svg", monochrome: true },
        { name: "Render" },
      ],
    },
    {
      label: "Prácticas",
      items: [
        { name: "Arquitectura en capas y vertical slices" },
        { name: "SOLID" },
        { name: "Testing automatizado" },
        { name: "Seguridad web" },
        { name: "Scrum" },
      ],
    },
    {
      label: "Idiomas",
      items: [
        { name: "Español nativo" },
        { name: "Inglés intermedio (leo documentación técnica)" },
      ],
    },
  ],
};
