import { describe, expect, it } from "vitest";

import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { projects as contentProjects } from "@/content/projects";
import { skills } from "@/content/skills";

import {
  getAdjacentProjects,
  getAllProjects,
  getFeaturedProject,
  getOtherProjects,
  getProjectBySlug,
  getProjectEyebrow,
  getProjectKindLabel,
  getProjectPath,
  parseProjects,
} from "./projects";
import {
  educationSchema,
  profileSchema,
  projectSchema,
  skillsSchema,
  type Project,
} from "./schemas";

const allImagesExist = () => true;
const noImageExists = () => false;

function buildProject(overrides: Partial<Project> = {}): Project {
  return {
    slug: "demo",
    title: "Demo",
    tagline: "Proyecto de prueba.",
    kind: "personal",
    year: 2026,
    featured: true,
    order: 1,
    stack: ["TypeScript"],
    summary: "Resumen de prueba.",
    features: [],
    decisions: [],
    nextSteps: [],
    links: {},
    images: [],
    highlights: [],
    ...overrides,
  };
}

describe("contenido real", () => {
  it("los proyectos de src/content pasan la validación", () => {
    expect(() => parseProjects(contentProjects)).not.toThrow();
  });

  it("perfil, formación y habilidades pasan la validación", () => {
    expect(profileSchema.safeParse(profile).success).toBe(true);
    expect(educationSchema.safeParse(education).success).toBe(true);
    expect(skillsSchema.safeParse(skills).success).toBe(true);
  });

  it("el teléfono no aparece en el contenido", () => {
    const content = JSON.stringify({ profile, education, skills, contentProjects });
    expect(content).not.toMatch(/\b(?:\+?54\s?9?\s?)?351[\s-]?\d{3}[\s-]?\d{4}\b/);
    expect(content.toLowerCase()).not.toContain("tel:");
  });

  it("el email solo está en el perfil", () => {
    expect(JSON.stringify({ education, skills, contentProjects })).not.toContain("@gmail");
  });
});

describe("parseProjects", () => {
  it("ordena por `order`", () => {
    const parsed = parseProjects(
      [
        buildProject({ slug: "b", order: 2, featured: false }),
        buildProject({ slug: "a", order: 1 }),
      ],
      allImagesExist,
    );

    expect(parsed.map((project) => project.slug)).toEqual(["a", "b"]);
  });

  it("rechaza slugs repetidos", () => {
    const input = [buildProject(), buildProject({ order: 2, featured: false })];
    expect(() => parseProjects(input, allImagesExist)).toThrow(/Slug repetido/);
  });

  it("rechaza un slug que no está en kebab-case", () => {
    expect(() => parseProjects([buildProject({ slug: "Mi Proyecto" })], allImagesExist)).toThrow(
      /kebab-case/,
    );
  });

  it("rechaza la lista sin proyecto destacado", () => {
    expect(() => parseProjects([buildProject({ featured: false })], allImagesExist)).toThrow(
      /exactamente un proyecto destacado y hay 0/,
    );
  });

  it("rechaza más de un proyecto destacado", () => {
    const input = [buildProject(), buildProject({ slug: "otro", order: 2 })];
    expect(() => parseProjects(input, allImagesExist)).toThrow(
      /exactamente un proyecto destacado y hay 2/,
    );
  });

  it("rechaza una imagen sin alt", () => {
    const input = [
      buildProject({ images: [{ src: "/images/projects/demo/inicio.webp", alt: " " }] }),
    ];
    expect(() => parseProjects(input, allImagesExist)).toThrow(/alt/);
  });

  it("rechaza una imagen que no existe en public/", () => {
    const input = [
      buildProject({ images: [{ src: "/images/projects/demo/inicio.webp", alt: "Inicio" }] }),
    ];
    expect(() => parseProjects(input, noImageExists)).toThrow(/No existe el archivo/);
  });

  it("rechaza una imagen fuera de la carpeta del proyecto", () => {
    const input = [
      buildProject({ images: [{ src: "/images/projects/otro/inicio.webp", alt: "Inicio" }] }),
    ];
    expect(() => parseProjects(input, allImagesExist)).toThrow(/images\/projects\/demo/);
  });

  it("acepta imágenes válidas que existen", () => {
    const input = [
      buildProject({
        images: [{ src: "/images/projects/demo/inicio.webp", alt: "Inicio", caption: "Home" }],
      }),
    ];
    expect(parseProjects(input, allImagesExist)[0]?.images).toHaveLength(1);
  });

  it("rechaza campos desconocidos y links que no son https", () => {
    expect(projectSchema.safeParse({ ...buildProject(), telefono: "x" }).success).toBe(false);
    expect(
      projectSchema.safeParse(buildProject({ links: { repo: "http://example.com" } })).success,
    ).toBe(false);
  });
});

describe("consultas de proyectos", () => {
  const all = getAllProjects();

  it("getAllProjects devuelve la lista ordenada", () => {
    const orders = all.map((project) => project.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
    expect(all.length).toBeGreaterThan(0);
  });

  it("getProjectBySlug encuentra por slug y devuelve undefined si no existe", () => {
    expect(getProjectBySlug("mi-kiosco")?.title).toBe("Mi Kiosco");
    expect(getProjectBySlug("no-existe")).toBeUndefined();
  });

  it("getFeaturedProject devuelve Mi Kiosco y getOtherProjects el resto", () => {
    expect(getFeaturedProject().slug).toBe("mi-kiosco");
    expect(getOtherProjects().map((project) => project.slug)).not.toContain("mi-kiosco");
    expect(getOtherProjects()).toHaveLength(all.length - 1);
  });

  it("getAdjacentProjects devuelve anterior y siguiente, sin dar la vuelta", () => {
    const first = all[0]!;
    const second = all[1]!;
    const last = all.at(-1)!;

    expect(getAdjacentProjects(first.slug)).toEqual({ previous: null, next: second });
    expect(getAdjacentProjects(second.slug).previous).toEqual(first);
    expect(getAdjacentProjects(last.slug).next).toBeNull();
    expect(getAdjacentProjects("no-existe")).toEqual({ previous: null, next: null });
  });

  it("arma el eyebrow y la ruta de cada proyecto", () => {
    expect(getProjectKindLabel({ kind: "personal", year: 2026 })).toBe("Proyecto personal · 2026");
    expect(getProjectEyebrow({ kind: "tesis", year: 2026, eyebrow: "A medida" })).toBe("A medida");
    expect(getProjectEyebrow({ kind: "tesis", year: 2026 })).toBe("Trabajo final · 2026");
    expect(getProjectPath("mi-kiosco")).toBe("/proyectos/mi-kiosco/");
  });
});
