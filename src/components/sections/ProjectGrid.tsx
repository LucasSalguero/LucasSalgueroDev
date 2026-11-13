import { ProjectCard } from "@/components/project/ProjectCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Project } from "@/lib/schemas";

import styles from "./ProjectGrid.module.css";

export interface ProjectGridItem {
  project: Project;
  href: string;
  eyebrow: string;
}

interface ProjectGridProps {
  eyebrow: string;
  title: string;
  items: readonly ProjectGridItem[];
}

export function ProjectGrid({ eyebrow, title, items }: ProjectGridProps) {
  return (
    <Section id="proyectos" labelledBy="proyectos-titulo">
      <SectionHeading id="proyectos-titulo" eyebrow={eyebrow} title={title} align="center" />
      <div className={styles.grid}>
        {items.map((item) => (
          <ProjectCard key={item.project.slug} {...item} />
        ))}
      </div>
    </Section>
  );
}
