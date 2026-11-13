import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Project } from "@/lib/schemas";

import styles from "./ProjectHeader.module.css";

interface ProjectHeaderProps {
  project: Project;
  /** Eyebrow "tipo · año". */
  eyebrow: string;
  /** Link de vuelta a la grilla de proyectos. */
  backHref: string;
}

export function ProjectHeader({ project, eyebrow, backHref }: ProjectHeaderProps) {
  const { links } = project;

  return (
    <header className={styles.header}>
      <Link className={styles.back} href={backHref}>
        <span aria-hidden="true">←</span> Volver a proyectos
      </Link>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className={styles.title}>{project.title}</h1>
      <p className={styles.tagline}>{project.tagline}</p>
      <ChipList items={project.stack} label="Tecnologías" />
      {links.repo || links.demo ? (
        <div className={styles.actions}>
          {links.demo ? (
            <ButtonLink href={links.demo} variant="primary" external>
              Demo
            </ButtonLink>
          ) : null}
          {links.repo ? (
            <ButtonLink href={links.repo} external>
              {links.repoLabel ?? "Repositorio"}
            </ButtonLink>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
