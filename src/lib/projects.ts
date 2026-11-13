import { existsSync } from "node:fs";
import { join } from "node:path";

import { z } from "zod";

import { projects as rawProjects } from "@/content/projects";

import { createProjectListSchema, type Project, type ProjectKind } from "./schemas";

/** ¿Existe el archivo dentro de `public/`? Se evalúa durante el build. */
function imageExistsInPublic(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src));
}

/** Valida una lista de proyectos y la devuelve ordenada por `order`. */
export function parseProjects(
  input: unknown,
  imageExists: (src: string) => boolean = imageExistsInPublic,
): Project[] {
  const result = createProjectListSchema({ imageExists }).safeParse(input);

  if (!result.success) {
    throw new Error(
      `Contenido inválido en src/content/projects:\n${z.prettifyError(result.error)}`,
    );
  }

  return [...result.data].sort((a, b) => a.order - b.order);
}

// Se valida una sola vez, al importar el módulo: un dato inválido corta el build.
const projects = parseProjects(rawProjects);

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProject(): Project {
  const featured = projects.find((project) => project.featured);
  // parseProjects garantiza que existe exactamente uno.
  if (!featured) throw new Error("No hay un proyecto destacado");
  return featured;
}

/** Proyectos de la grilla de la home: todos menos el destacado. */
export function getOtherProjects(): Project[] {
  return projects.filter((project) => !project.featured);
}

export interface AdjacentProjects {
  previous: Project | null;
  next: Project | null;
}

/** Proyecto anterior y siguiente según `order`. No da la vuelta en los extremos. */
export function getAdjacentProjects(slug: string): AdjacentProjects {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

const KIND_LABELS: Record<ProjectKind, string> = {
  produccion: "En producción",
  tesis: "Trabajo final",
  personal: "Proyecto personal",
  academico: "Proyecto académico",
};

/** Eyebrow "tipo · año" de la página de detalle. */
export function getProjectKindLabel(project: Pick<Project, "kind" | "year">): string {
  return `${KIND_LABELS[project.kind]} · ${project.year}`;
}

/** Eyebrow de la home: el propio del proyecto o, si no tiene, "tipo · año". */
export function getProjectEyebrow(project: Pick<Project, "kind" | "year" | "eyebrow">): string {
  return project.eyebrow ?? getProjectKindLabel(project);
}

export function getProjectPath(slug: string): string {
  return `/proyectos/${slug}/`;
}
