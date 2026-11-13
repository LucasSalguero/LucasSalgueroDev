import { z } from "zod";

/**
 * Esquemas del contenido. Todo lo que vive en `src/content` se valida contra
 * estos esquemas al cargar `src/lib`: un dato inválido rompe el build.
 * Los tipos se infieren de acá; no se declaran a mano en otro lugar.
 */

const text = z.string().trim().min(1, "No puede estar vacío");
const url = z.url({ protocol: /^https$/, error: "Tiene que ser una URL https" });

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug va en kebab-case: minúsculas, números y guiones");

export const projectKindSchema = z.enum(["produccion", "tesis", "personal", "academico"]);

/** Bloque "título + descripción" de las grillas de funcionalidades y decisiones. */
export const infoItemSchema = z.strictObject({
  title: text,
  description: text,
});

export const projectImageSchema = z.strictObject({
  /** Ruta desde `public/`, por ejemplo `/images/projects/mi-kiosco/venta.webp`. */
  src: z
    .string()
    .regex(
      /^\/images\/projects\/[a-z0-9-]+\/[\w.-]+\.(webp|png)$/,
      "La ruta va en /images/projects/<slug>/<archivo>.webp o .png",
    ),
  alt: text,
  caption: text.optional(),
});

/** Viñeta de la tarjeta de la home. `label` va en negrita antes del texto. */
export const highlightSchema = z.strictObject({
  label: text.optional(),
  text,
});

export const offlineFlowSchema = z.strictObject({
  title: text,
  intro: text,
  steps: z.array(text).min(2),
});

export const ticketSchema = z.strictObject({
  /** Nombre accesible del ticket. */
  label: text,
  store: text,
  sale: text,
  date: text,
  items: z.array(z.strictObject({ description: text, amount: text })).min(1),
  total: text,
  meta: z.array(text),
  state: text,
  note: text,
});

export const projectSchema = z.strictObject({
  slug: slugSchema,
  title: text,
  /** Una línea: encabezado de la página de detalle y descripción para buscadores. */
  tagline: text,
  kind: projectKindSchema,
  year: z.number().int().min(2000).max(2100),
  /** Exactamente un proyecto destacado (se valida en `createProjectListSchema`). */
  featured: z.boolean(),
  order: z.number().int().nonnegative(),
  stack: z.array(text),
  /** Párrafo de la tarjeta. */
  summary: text,
  problem: text.optional(),
  solution: text.optional(),
  features: z.array(infoItemSchema),
  decisions: z.array(infoItemSchema),
  /** "Mi parte" en proyectos de equipo. */
  role: text.optional(),
  team: text.optional(),
  nextSteps: z.array(text),
  links: z.strictObject({
    repo: url.optional(),
    repoLabel: text.optional(),
    demo: url.optional(),
  }),
  images: z.array(projectImageSchema),

  // --- Extensiones al modelo base (ver docs/adr/0002) ---
  /** Título largo para la home. Si falta se usa `title`. */
  heading: text.optional(),
  /** Reemplaza al eyebrow "tipo · año" en la home. */
  eyebrow: text.optional(),
  /** Viñetas de la tarjeta (o celdas de "Qué hace" en el destacado). */
  highlights: z.array(highlightSchema),
  /** Nota al pie del caso de estudio. */
  note: text.optional(),
  offlineFlow: offlineFlowSchema.optional(),
  ticket: ticketSchema.optional(),
});

interface ProjectListOptions {
  /** Devuelve true si la ruta (relativa a `public/`) existe. */
  imageExists: (src: string) => boolean;
}

/**
 * Reglas que involucran a toda la lista: slugs y `order` únicos, exactamente
 * un destacado, e imágenes que existen en `public/` dentro de la carpeta del proyecto.
 */
export function createProjectListSchema({ imageExists }: ProjectListOptions) {
  return z
    .array(projectSchema)
    .min(1)
    .superRefine((projects, ctx) => {
      const seenSlugs = new Set<string>();
      const seenOrders = new Set<number>();

      projects.forEach((project, index) => {
        if (seenSlugs.has(project.slug)) {
          ctx.addIssue({
            code: "custom",
            path: [index, "slug"],
            message: `Slug repetido: "${project.slug}"`,
          });
        }
        seenSlugs.add(project.slug);

        if (seenOrders.has(project.order)) {
          ctx.addIssue({
            code: "custom",
            path: [index, "order"],
            message: `Orden repetido: ${project.order}`,
          });
        }
        seenOrders.add(project.order);

        project.images.forEach((image, imageIndex) => {
          const path = [index, "images", imageIndex, "src"];

          if (!image.src.startsWith(`/images/projects/${project.slug}/`)) {
            ctx.addIssue({
              code: "custom",
              path,
              message: `La imagen tiene que estar en /images/projects/${project.slug}/`,
            });
          } else if (!imageExists(image.src)) {
            ctx.addIssue({
              code: "custom",
              path,
              message: `No existe el archivo public${image.src}`,
            });
          }
        });
      });

      const featured = projects.filter((project) => project.featured);
      if (featured.length !== 1) {
        ctx.addIssue({
          code: "custom",
          path: [],
          message: `Tiene que haber exactamente un proyecto destacado y hay ${featured.length}`,
        });
      }
    });
}

export const profileSchema = z.strictObject({
  name: text,
  role: text,
  location: text,
  /** URL pública del sitio, sin barra final. */
  siteUrl: url.refine((value) => !value.endsWith("/"), "Sin barra final"),
  /** Descripción para buscadores y redes. */
  description: text,
  email: z.email(),
  links: z.strictObject({ github: url, linkedin: url }),
  /** Ruta del CV dentro de `public/`. */
  cvPath: z.string().regex(/^\/cv\/[\w.-]+\.pdf$/),
  hero: z.strictObject({
    status: text,
    /** El título se parte en dos: la segunda mitad va en color de acento. */
    headline: text,
    headlineAccent: text,
    lead: text,
    facts: z.array(z.strictObject({ value: text, label: text })).min(1),
  }),
  projects: z.strictObject({ eyebrow: text, title: text }),
  about: z.strictObject({
    eyebrow: text,
    title: text,
    paragraphs: z.array(text).min(1),
  }),
  contact: z.strictObject({ eyebrow: text, title: text }),
  footer: text,
});

export const educationSchema = z.strictObject({
  eyebrow: text,
  title: text,
  items: z
    .array(
      z.strictObject({
        period: text,
        title: text.optional(),
        description: text,
      }),
    )
    .min(1),
});

export const skillsSchema = z.strictObject({
  eyebrow: text,
  title: text,
  groups: z.array(z.strictObject({ label: text, items: z.array(text).min(1) })).min(1),
});

export type ProjectKind = z.infer<typeof projectKindSchema>;
export type InfoItem = z.infer<typeof infoItemSchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
export type Highlight = z.infer<typeof highlightSchema>;
export type OfflineFlow = z.infer<typeof offlineFlowSchema>;
export type Ticket = z.infer<typeof ticketSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skills = z.infer<typeof skillsSchema>;
