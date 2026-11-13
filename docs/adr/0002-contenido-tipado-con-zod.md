# ADR 0002: contenido tipado y validado con Zod

- **Estado:** aceptado
- **Fecha:** noviembre de 2026

## Contexto

Los textos del sitio tienen que estar separados de los componentes, para que agregar un
proyecto no implique tocar JSX. Las opciones eran:

1. Un CMS: demasiado para cinco proyectos, y suma un servicio externo.
2. Archivos Markdown/MDX: buenos para texto largo, pero los proyectos son datos estructurados
   (stack, funcionalidades, links), y habría que sumar dependencias para procesarlos.
3. Archivos JSON: sin comentarios y sin ayuda del editor.
4. Archivos TypeScript validados con un esquema.

## Decisión

El contenido vive en `src/content/` como **objetos TypeScript**, y `src/lib/schemas.ts` define
los **esquemas Zod** de los que se infieren los tipos.

- `src/lib` valida el contenido al importarse. Si hay un error, lanza una excepción con el campo
  y el motivo, y el build se corta.
- Los esquemas son estrictos (`z.strictObject`): un campo mal escrito es un error.
- Las reglas que miran toda la lista están en `createProjectListSchema`: slugs y `order`
  únicos, exactamente un proyecto destacado, e imágenes que existen en `public/` dentro de la
  carpeta de su proyecto.
- La función que verifica si una imagen existe se pasa como parámetro, para poder probar las
  reglas sin tocar el disco.
- TypeScript avisa en el editor y Zod verifica lo que los tipos no pueden: unicidad, formato de
  URLs y archivos que existen.

### Extensiones al modelo base

El modelo de `Project` suma algunos campos al planteado originalmente. Todos existen para
reproducir la home original sin dejar texto dentro de los componentes:

| Campo             | Por qué                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `heading`         | La home usa un título largo ("PandoCBA: e-commerce de drops de ropa") y el detalle uno corto |
| `eyebrow`         | Algunas tarjetas tienen un eyebrow propio ("Trabajo final · cliente real · 2026")            |
| `highlights`      | Las viñetas de la tarjeta no son lo mismo que las funcionalidades del detalle                |
| `note`            | Nota al pie del caso de estudio de Mi Kiosco                                                 |
| `offlineFlow`     | Flujo offline numerado de Mi Kiosco                                                          |
| `ticket`          | Ticket de venta de ejemplo de Mi Kiosco                                                      |
| `links.repoLabel` | PandoCBA aclara que el repositorio es el del backend                                         |

También se valida que `order` no se repita, para que el orden sea determinístico.

El perfil, la formación y las habilidades tienen sus propios esquemas (`profileSchema`,
`educationSchema` y `skillsSchema`) y se leen con `src/lib/profile.ts`.

### Formato dentro de los textos

Para no guardar HTML en el contenido, el componente `RichText` reconoce dos marcas:
`` `código` `` y `**negrita**`. Es suficiente para el contenido actual y evita sumar un parser
de Markdown.

## Consecuencias

**A favor**

- Agregar un proyecto es crear un archivo y sumarlo al índice. Los componentes no cambian.
- Los errores de contenido aparecen en el build y en la CI, no en producción.
- Un solo lugar define la forma de los datos: los tipos no se pueden desincronizar del esquema.
- Zod es la única dependencia de runtime que se suma, y solo corre durante el build.

**En contra**

- Editar contenido requiere saber editar un archivo TypeScript.
- Un texto muy largo es menos cómodo que en Markdown. Si un proyecto necesita un artículo
  completo, conviene revisar esta decisión y evaluar MDX.
