import type { Profile } from "@/lib/schemas";

export const profile: Profile = {
  name: "Lucas Salguero",
  role: "Desarrollador Full Stack Junior",
  location: "Córdoba, Argentina",
  // TODO: reemplazar por el dominio definitivo cuando el sitio esté publicado en Vercel.
  siteUrl: "https://lucas-salguero-dev.vercel.app",
  description:
    "Portafolio de Lucas Salguero, desarrollador Full Stack Junior en Córdoba, Argentina.",
  email: "lucassalguero01@gmail.com",
  links: {
    github: "https://github.com/LucasSalguero",
    linkedin: "https://www.linkedin.com/in/lucas-salguero-4b656521a/",
  },
  cvPath: "/cv/CV_Lucas_Salguero.pdf",
  hero: {
    status: "Disponible para mi primer empleo IT · Córdoba, AR",
    headline: "Desarrollador Full Stack",
    headlineAccent: "orientado al backend.",
    lead: "Desarrollo con **Next.js, Node.js, .NET y TypeScript**. Hice y mantengo un sistema de ventas que se usa todos los días en un comercio real, y estoy terminando la Tecnicatura en Desarrollo de Software en el ITSC.",
    facts: [
      { value: "1", label: "sistema en producción real" },
      { value: "4", label: "proyectos full stack" },
      { value: "2026", label: "egreso ITSC (dic.)" },
    ],
  },
  projects: {
    eyebrow: "Otros proyectos",
    title: "En equipo, personales y académicos",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Me gusta resolver problemas de negocios reales",
    paragraphs: [
      "Empecé Ingeniería en Sistemas en la UTN y después elegí la Tecnicatura en el ITSC para programar desde el primer año. Lo que más disfruto es el backend: modelar los datos, pensar qué pasa cuando algo falla y dejar el sistema listo para que otro lo entienda.",
      "Mi Kiosco empezó como una versión de escritorio en C# y la reescribí como app web cuando vi que el negocio necesitaba usarla desde el celular y sin depender del wifi. Busco mi primer trabajo en un equipo donde pueda aprender de gente con más experiencia y aportar desde el primer día.",
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Buscan un desarrollador junior?",
  },
  footer: "Lucas Salguero · Córdoba, Argentina · 2026",
};
