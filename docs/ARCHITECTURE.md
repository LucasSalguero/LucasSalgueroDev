# Arquitectura

El portafolio es un sitio estático: en el build se valida el contenido y se genera un archivo
HTML por ruta. No hay servidor, base de datos ni CMS.

## Capas

```text
┌──────────────────────────────────────────────────────────────┐
│ app/         Rutas. Piden datos a lib/ y componen la página. │
└───────────────┬──────────────────────────────────────────────┘
                │ props
┌───────────────▼──────────────────────────────────────────────┐
│ components/  Presentación. Reciben datos por props.          │
└───────────────┬──────────────────────────────────────────────┘
                │ solo tipos
┌───────────────▼──────────────────────────────────────────────┐
│ lib/         Esquemas Zod, tipos y funciones de lectura.     │
└───────────────┬──────────────────────────────────────────────┘
                │ importa y valida
┌───────────────▼──────────────────────────────────────────────┐
│ content/     Datos: perfil, formación, habilidades, proyectos│
└──────────────────────────────────────────────────────────────┘
```

Las dependencias van en una sola dirección: `app → components → lib → content`.

| Capa          | Responsabilidad                                               | No puede                            |
| ------------- | ------------------------------------------------------------- | ----------------------------------- |
| `content/`    | Guardar los textos como objetos tipados                       | Tener lógica ni JSX                 |
| `lib/`        | Validar el contenido y exponer funciones para consultarlo     | Importar componentes                |
| `components/` | Mostrar los datos que recibe                                  | Importar de `content/` ni de `app/` |
| `app/`        | Definir rutas y metadata, y pasar los datos a los componentes | Importar de `content/` directamente |

La regla se cumple sola: `eslint.config.mjs` usa `no-restricted-imports` para que `npm run lint`
(y la CI) fallen si un componente o una página importa de `content/`.

### Dentro de `components/`

- `ui/`: piezas chicas sin conocimiento del dominio (`Button`, `Chip`, `Eyebrow`, `Section`,
  `InfoGrid`, `Ticket`, `CopyEmailButton`, `ArrowLink`, `RichText`).
- `project/`: piezas que muestran un proyecto (`ProjectCard`, `ProjectHeader`, `ProjectDetail`,
  `Gallery`, `FeatureGrid`, `DecisionGrid`, `OfflineFlow`, `ProjectNav`).
- `sections/`: secciones de la home (`Hero`, `FeaturedProject`, `ProjectGrid`, `Education`,
  `Skills`, `About`, `Contact`).
- `layout/`: `Header` y `Footer`.

## Flujo de datos

```text
src/content/projects/*.ts
        │
        ▼
src/content/projects/index.ts      lista de proyectos
        │
        ▼
src/lib/projects.ts                parseProjects(): valida con Zod y ordena.
        │                          Si algo está mal, lanza un error y el build se corta.
        ├─ getFeaturedProject()  ──▶ app/page.tsx ─────────────▶ <FeaturedProject />
        ├─ getOtherProjects()    ──▶ app/page.tsx ─────────────▶ <ProjectGrid />
        ├─ getAllProjects()      ──▶ generateStaticParams() y sitemap.ts
        ├─ getProjectBySlug()    ──▶ app/proyectos/[slug]/page.tsx ▶ <ProjectHeader />, <ProjectDetail />
        └─ getAdjacentProjects() ──▶ app/proyectos/[slug]/page.tsx ▶ <ProjectNav />
```

El perfil, la formación y las habilidades siguen el mismo camino por `src/lib/profile.ts`.

### Qué valida el build

La validación corre al importar `src/lib`, así que se ejecuta en `npm run build`, en
`npm run dev` y en los tests. El build falla si:

- falta un campo obligatorio o hay un campo que el esquema no conoce;
- hay slugs repetidos o que no están en kebab-case;
- hay cero o más de un proyecto con `featured: true`;
- una imagen no tiene `alt`;
- una imagen no existe en `public/` o está fuera de la carpeta de su proyecto;
- un link no es una URL `https`.

## Rutas

| Ruta                 | Archivo                             | Cómo se genera                               |
| -------------------- | ----------------------------------- | -------------------------------------------- |
| `/`                  | `src/app/page.tsx`                  | Estática                                     |
| `/proyectos/[slug]/` | `src/app/proyectos/[slug]/page.tsx` | Una por proyecto, con `generateStaticParams` |
| `/404`               | `src/app/not-found.tsx`             | Estática                                     |
| `/sitemap.xml`       | `src/app/sitemap.ts`                | Estática, a partir de la lista de proyectos  |
| `/robots.txt`        | `src/app/robots.ts`                 | Estática                                     |

Cada página de proyecto arma su `metadata` (título, descripción, canonical y Open Graph) con
`generateMetadata`, a partir de los mismos datos que muestra.

## Por qué export estático

- **El contenido cambia con un commit**, no en tiempo de ejecución. No hace falta un servidor.
- **Es rápido y barato**: son archivos servidos desde una CDN.
- **No hay nada que mantener ni que atacar**: sin base de datos, sin API y sin secretos.
- **Se puede mover de hosting**: `out/` funciona en Vercel, GitHub Pages o cualquier servidor.

Lo que se pierde está anotado en el [ADR 0001](adr/0001-nextjs-export-estatico.md): no hay
optimización de imágenes en el servidor ni rutas dinámicas.

## Estilos

- `src/styles/tokens.css` define colores, fuentes y medidas como CSS custom properties, con las
  variantes de modo claro y oscuro.
- `src/styles/globals.css` tiene el reset y los estilos base de los elementos.
- Cada componente tiene su CSS Module y solo consume tokens.

El tema sigue al sistema operativo con `prefers-color-scheme`. El atributo `data-theme` en
`<html>` permite forzar uno, y deja preparado el lugar para un selector de tema.

## Qué corre en el navegador

Casi nada: todos los componentes son Server Components y se renderizan en el build. El único
Client Component es `CopyEmailButton`, que necesita el portapapeles.

## Calidad

| Control      | Herramienta         | Qué cubre                                             |
| ------------ | ------------------- | ----------------------------------------------------- |
| Formato      | Prettier            | Todo el repo                                          |
| Estático     | ESLint + TypeScript | Reglas de Next.js, tipos y dirección de dependencias  |
| Tests        | Vitest              | Esquemas, contenido real y funciones de `src/lib`     |
| Build        | `next build`        | Validación del contenido y generación de las páginas  |
| CI           | GitHub Actions      | Todo lo anterior en cada push y pull request a `main` |
| Dependencias | Dependabot          | npm y GitHub Actions, una vez por semana              |
