import type { Project } from "@/lib/schemas";

export const trabajosAcademicos: Project = {
  slug: "trabajos-academicos",
  title: "Trabajos académicos",
  tagline: "Análisis, UX y calidad: tres trabajos de la carrera.",
  kind: "academico",
  // TODO: confirmar el año de cada trabajo.
  year: 2026,
  featured: false,
  order: 5,
  stack: [],
  summary:
    "Trabajos de análisis funcional, diseño de interfaz y calidad de software hechos durante la carrera.",
  features: [
    {
      title: "Comparador de descuentos de comida rápida",
      description:
        "Unificación de varias propuestas en un único MVP con módulos de Administración y Cliente, justificando qué funciones quedaron fuera.",
    },
    {
      title: "Evaluación heurística de tcl.com/ar/es",
      description: "Trabajo para Diseño de Interfaz de Usuario.",
    },
    {
      title: "ISO/IEC 27001 aplicada a una tienda online",
      description: "Trabajo para Ingeniería de Software.",
    },
  ],
  decisions: [],
  nextSteps: [],
  links: {},
  images: [],

  heading: "Análisis, UX y calidad",
  eyebrow: "Trabajos académicos",
  highlights: [
    {
      label: "Comparador de descuentos de comida rápida:",
      text: "unificación de varias propuestas en un único MVP con módulos de Administración y Cliente, justificando qué funciones quedaron fuera.",
    },
    {
      label: "Evaluación heurística de tcl.com/ar/es",
      text: "para Diseño de Interfaz de Usuario.",
    },
    {
      label: "ISO/IEC 27001 aplicada a una tienda online",
      text: "para Ingeniería de Software.",
    },
  ],
};
