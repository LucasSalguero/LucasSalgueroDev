import type { Education } from "@/lib/schemas";

export const education: Education = {
  eyebrow: "Formación",
  title: "Estudios",
  items: [
    {
      period: "2024 – 2026",
      title: "Técnico en Desarrollo de Software",
      description:
        "Instituto Técnico Superior Córdoba (ITSC). En etapa final; me recibo en diciembre de 2026.",
    },
    {
      period: "2022 – 2023",
      title: "Ingeniería en Sistemas de Información",
      description:
        "Universidad Tecnológica Nacional (UTN). Algoritmos, bases de datos, paradigmas de programación y matemática.",
    },
    {
      period: "Idiomas",
      description: "Español nativo. Inglés intermedio: leo documentación técnica.",
    },
  ],
};
