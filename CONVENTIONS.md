# Convenciones

Reglas cortas para que el repo se mantenga consistente. Ante la duda, elegir la opción más simple.

## Dónde va cada cosa

| Qué                                            | Dónde                            |
| ---------------------------------------------- | -------------------------------- |
| Textos, links y datos de proyectos             | `src/content/`                   |
| Esquemas Zod, tipos y funciones de lectura     | `src/lib/`                       |
| Rutas, metadata y composición de páginas       | `src/app/`                       |
| Secciones de la home                           | `src/components/sections/`       |
| Piezas de la tarjeta y del detalle de proyecto | `src/components/project/`        |
| Componentes chicos y reutilizables             | `src/components/ui/`             |
| Header y Footer                                | `src/components/layout/`         |
| Colores, fuentes y medidas                     | `src/styles/tokens.css`          |
| Capturas de proyectos                          | `public/images/projects/<slug>/` |

### Dependencias entre capas

```text
app → components → lib → content
```

- Las **páginas** (`app/`) obtienen los datos con las funciones de `lib/` y los pasan por props.
- Los **componentes** nunca importan de `content/`. De `lib/` solo importan tipos.
- `lib/` es el único lugar que lee `content/`, y siempre lo valida antes de devolverlo.

ESLint verifica estas reglas con `no-restricted-imports`.

### Texto en componentes

Los componentes solo pueden tener **etiquetas de interfaz**: "Repositorio", "Volver a proyectos",
"Copiar email", títulos fijos de sección. Todo lo que describe a la persona o a un proyecto va
en `src/content/`.

## Nombres

| Elemento                        | Formato      | Ejemplo                    |
| ------------------------------- | ------------ | -------------------------- |
| Componentes y su archivo        | `PascalCase` | `ProjectCard.tsx`          |
| Estilos de un componente        | `PascalCase` | `ProjectCard.module.css`   |
| Archivos que no son componentes | `kebab-case` | `mi-kiosco.ts`             |
| Funciones y variables           | `camelCase`  | `getProjectBySlug`         |
| Tipos                           | `PascalCase` | `Project`, sin prefijo `I` |
| Slugs y carpetas de imágenes    | `kebab-case` | `mis-alquileres`           |
| Clases en CSS Modules           | `camelCase`  | `.titleLink`               |

Los archivos de rutas siguen los nombres que pide Next.js: `page.tsx`, `layout.tsx`, `not-found.tsx`.

## TypeScript

- `strict` y `noUncheckedIndexedAccess` activados. No usar `any`.
- Los tipos del contenido se infieren de los esquemas de `src/lib/schemas.ts`. No se declaran
  a mano.
- Imports con el alias `@/` (`@/components/ui/Button`).

## Componentes

- Componentes de función, uno por archivo, con export nombrado.
- Server Components por defecto. `"use client"` solo si el componente necesita estado o eventos
  (hoy, únicamente `CopyEmailButton`).
- Un componente sin datos no renderiza nada: no hay placeholders ni "próximamente".

## Estilos

- Un CSS Module por componente. Sin Tailwind ni librerías de UI.
- Colores y fuentes siempre con las variables de `tokens.css`; no se escriben valores sueltos.
- Los controles interactivos miden al menos 44 px de alto (`var(--tap-target)`).
- Los dos temas tienen que cumplir contraste AA.

## Accesibilidad

- HTML semántico antes que `div` con roles.
- Todo se tiene que poder usar con teclado y el foco tiene que verse.
- Las imágenes llevan `alt` obligatorio; el esquema lo exige.
- Las animaciones respetan `prefers-reduced-motion`.

## Tests

- Vitest, con los tests al lado del código: `projects.ts` → `projects.test.ts`.
- Se prueba la validación del contenido y las funciones de `src/lib`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/es/) en español, con el área entre
paréntesis:

```text
tipo(área): descripción en minúscula y en infinitivo
```

| Tipo       | Para qué                                              |
| ---------- | ----------------------------------------------------- |
| `feat`     | Funcionalidad o sección nueva                         |
| `fix`      | Corrección de un error                                |
| `content`  | Cambios de texto, proyectos o capturas                |
| `docs`     | Documentación                                         |
| `style`    | Formato, sin cambios de comportamiento                |
| `refactor` | Reorganización sin cambios de comportamiento          |
| `test`     | Tests                                                 |
| `chore`    | Configuración, dependencias y tareas de mantenimiento |
| `ci`       | Workflows de GitHub Actions                           |

Ejemplos:

```text
feat(proyectos): agregar galería de capturas
content(mi-kiosco): sumar capturas del punto de venta
fix(home): corregir contraste del estado en modo claro
```

Un commit es un cambio coherente. Antes de hacer push:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Ramas y pull requests

- `main` siempre está en verde y es lo que se publica.
- El trabajo se hace en ramas `tipo/descripcion-corta` (`feat/portafolio-v1`) y entra por pull
  request, usando la plantilla de `.github/pull_request_template.md`.

## Privacidad

- El teléfono no aparece en ningún archivo del repo, tampoco dentro del PDF del CV.
- El email vive únicamente en `src/content/profile.ts`.
