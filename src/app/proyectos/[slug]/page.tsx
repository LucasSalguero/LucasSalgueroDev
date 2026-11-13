import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/project/ProjectDetail";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectNav, type ProjectNavLink } from "@/components/project/ProjectNav";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
  getProjectKindLabel,
  getProjectPath,
} from "@/lib/projects";
import type { Project } from "@/lib/schemas";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Export estático: solo existen las páginas de los proyectos del contenido.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const path = getProjectPath(project.slug);

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url: path,
      images: project.images.map((image) => ({ url: image.src, alt: image.alt })),
    },
  };
}

function toNavLink(project: Project | null): ProjectNavLink | null {
  return project ? { href: getProjectPath(project.slug), title: project.title } : null;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <article>
      <ProjectHeader
        project={project}
        eyebrow={getProjectKindLabel(project)}
        backHref="/#proyectos"
      />
      <ProjectDetail project={project} />
      <ProjectNav previous={toNavLink(previous)} next={toNavLink(next)} />
    </article>
  );
}
