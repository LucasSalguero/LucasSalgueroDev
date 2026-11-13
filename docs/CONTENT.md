# Guía de contenido

Todo lo que se lee en el sitio está en `src/content/`. Para cambiarlo no hace falta tocar
componentes.

| Archivo                         | Qué contiene                                              |
| ------------------------------- | --------------------------------------------------------- |
| `src/content/profile.ts`        | Nombre, rol, textos del inicio, "Sobre mí", links y email |
| `src/content/education.ts`      | Estudios e idiomas                                        |
| `src/content/skills.ts`         | Habilidades agrupadas                                     |
| `src/content/projects/*.ts`     | Un archivo por proyecto                                   |
| `src/content/projects/index.ts` | Lista de proyectos que se publican                        |

Si un dato está mal, `npm run dev` y `npm run build` muestran un error que dice qué campo
corregir.

## Agregar un proyecto

### 1. Crear el archivo

Crear `src/content/projects/<slug>.ts`. El slug va en kebab-case y es la URL del proyecto:
`gestor-de-turnos` → `/proyectos/gestor-de-turnos/`.

```ts
import type { Project } from "@/lib/schemas";

export const gestorDeTurnos: Project = {
  slug: "gestor-de-turnos",
  title: "Gestor de turnos",
  tagline: "Una línea que explica qué es.",
  kind: "personal", // "produccion" | "tesis" | "personal" | "academico"
  year: 2027,
  featured: false,
  order: 6,
  stack: ["Next.js", "PostgreSQL"],
  summary: "Párrafo corto que se muestra en la tarjeta de la home.",
  features: [],
  decisions: [],
  nextSteps: [],
  links: {},
  images: [],
  highlights: [],
};
```

### 2. Sumarlo al índice

En `src/content/projects/index.ts`:

```ts
import { gestorDeTurnos } from "./gestor-de-turnos";

export const projects: Project[] = [
  miKiosco,
  // ...
  gestorDeTurnos,
];
```

### 3. Crear la carpeta de capturas

```bash
mkdir -p public/images/projects/gestor-de-turnos
touch public/images/projects/gestor-de-turnos/.gitkeep
```

### 4. Verificar

```bash
npm run dev      # ver la tarjeta en la home y la página /proyectos/gestor-de-turnos/
npm test
npm run build
```

## Campos de un proyecto

### Obligatorios

| Campo        | Tipo       | Dónde se ve                                                        |
| ------------ | ---------- | ------------------------------------------------------------------ |
| `slug`       | `string`   | URL y carpeta de imágenes. Kebab-case y único                      |
| `title`      | `string`   | Título de la página de detalle y de la pestaña                     |
| `tagline`    | `string`   | Debajo del título en el detalle; descripción para buscadores       |
| `kind`       | enum       | Eyebrow: "En producción", "Trabajo final", "Proyecto personal"...  |
| `year`       | `number`   | Eyebrow, junto al tipo                                             |
| `featured`   | `boolean`  | Solo un proyecto puede tener `true`: es el destacado de la home    |
| `order`      | `number`   | Orden en la home y en la navegación anterior/siguiente. Único      |
| `stack`      | `string[]` | Chips de tecnologías. Puede ir vacío                               |
| `summary`    | `string`   | Párrafo de la tarjeta                                              |
| `features`   | lista      | Grilla "Qué hace" del detalle: `{ title, description }`            |
| `decisions`  | lista      | Grilla "Cómo está hecho" del detalle: `{ title, description }`     |
| `nextSteps`  | `string[]` | "Qué sigue" en el detalle; en la tarjeta se unen como "Próximo: …" |
| `links`      | objeto     | `repo`, `repoLabel` y `demo`. Todos opcionales; URLs `https`       |
| `images`     | lista      | Galería de capturas. Vacío = no se muestra                         |
| `highlights` | lista      | Viñetas de la tarjeta: `{ label?, text }`                          |

### Opcionales

| Campo         | Para qué                                             |
| ------------- | ---------------------------------------------------- |
| `problem`     | Bloque "El problema" del detalle                     |
| `solution`    | Bloque "La solución" del detalle                     |
| `role`        | "Mi parte": qué hice yo. También se ve en la tarjeta |
| `team`        | Contexto del equipo, debajo de "Mi parte"            |
| `heading`     | Título largo para la home. Si falta, se usa `title`  |
| `eyebrow`     | Reemplaza al eyebrow "tipo · año" en la home         |
| `note`        | Nota al pie del caso de estudio                      |
| `offlineFlow` | Flujo numerado: `{ title, intro, steps }`            |
| `ticket`      | Ticket de ejemplo que acompaña al caso de estudio    |

Las secciones sin datos no se muestran. Un proyecto con `features: []` no tiene la sección
"Qué hace".

### Formato dentro de los textos

Los textos son texto plano, con dos marcas permitidas en descripciones, pasos y próximos pasos:

- `` `código` `` para nombres de archivos, funciones o comandos.
- `**negrita**` para resaltar (hoy se usa en la bajada del inicio).

Los `nextSteps` se escriben empezando en minúscula y sin punto final, porque la tarjeta los une
en una oración: `["paginación", "tests"]` → "Próximo: paginación y tests."

## Agregar capturas

### 1. Preparar las imágenes

| Requisito  | Valor                                                            |
| ---------- | ---------------------------------------------------------------- |
| Formato    | **WebP** (preferido) o PNG                                       |
| Ancho      | **1600 px** recomendado                                          |
| Proporción | 16:10 se ve sin bordes; otras proporciones se muestran completas |
| Peso       | Menos de 300 KB por imagen, si se puede                          |
| Nombre     | kebab-case, sin espacios ni tildes: `punto-de-venta.webp`        |

Para convertir y achicar una captura sin instalar nada se puede usar <https://squoosh.app>:
elegir WebP, redimensionar a 1600 px de ancho y descargar.

Antes de subir una captura, revisar que no muestre datos reales de clientes, precios del
comercio ni información personal.

### 2. Copiarlas a la carpeta del proyecto

```text
public/images/projects/mi-kiosco/punto-de-venta.webp
public/images/projects/mi-kiosco/caja-diaria.webp
```

### 3. Listarlas en el proyecto

En `src/content/projects/mi-kiosco.ts`:

```ts
images: [
  {
    src: "/images/projects/mi-kiosco/punto-de-venta.webp",
    alt: "Pantalla de venta con la grilla de productos y el total del día",
    caption: "Venta rápida desde el celular",
  },
  {
    src: "/images/projects/mi-kiosco/caja-diaria.webp",
    alt: "Arqueo de caja con el efectivo esperado y el contado",
  },
],
```

- `src` empieza con `/images/projects/<slug>/` y apunta a un archivo que existe.
- `alt` es **obligatorio**: describe lo que se ve, para quien no puede ver la imagen.
- `caption` es opcional y se muestra debajo de la captura.

La primera imagen de la lista se muestra primero. Con una sola imagen, ocupa todo el ancho.

### 4. Verificar

```bash
npm run build
```

Si la ruta está mal escrita, falta el `alt` o la imagen está en la carpeta de otro proyecto,
el build falla y explica por qué.

## Cambiar el proyecto destacado

Poner `featured: true` en el nuevo proyecto y `featured: false` en el anterior. Tiene que
quedar exactamente uno. El destacado puede usar `offlineFlow`, `ticket` y `note`, y sus
`highlights` se muestran como la grilla "Qué hace" de la home (`label` es el título de cada
celda).

## Cambiar datos personales

- **Textos del inicio, "Sobre mí" y contacto:** `src/content/profile.ts`.
- **CV:** reemplazar `public/cv/CV_Lucas_Salguero.pdf`. El PDF es público: no tiene que incluir
  el teléfono.
- **URL del sitio:** campo `siteUrl` de `profile.ts`. Se usa en el sitemap, las URLs canónicas
  y Open Graph.
