import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Regla de arquitectura: app → components → lib → content.
    // Los componentes reciben datos por props y nunca leen el contenido.
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/content", "@/content/*", "@/content/**"],
              message: "Los componentes reciben el contenido por props (ver docs/ARCHITECTURE.md).",
            },
            {
              group: ["@/app", "@/app/*", "@/app/**"],
              message: "Los componentes no dependen de las páginas.",
            },
          ],
        },
      ],
    },
  },
  {
    // Las páginas obtienen los datos con las funciones de lib/, no de content/.
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/content", "@/content/*", "@/content/**"],
              message:
                "Las páginas leen el contenido a través de src/lib (ver docs/ARCHITECTURE.md).",
            },
          ],
        },
      ],
    },
  },
];

export default config;
