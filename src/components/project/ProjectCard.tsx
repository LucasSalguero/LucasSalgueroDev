import Link from "next/link";

import { ArrowLink, ArrowLinkRow } from "@/components/ui/ArrowLink";
import { ChipList } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Project } from "@/lib/schemas";

import styles from "./ProjectCard.module.css";

const listFormat = new Intl.ListFormat("es", { style: "long", type: "conjunction" });

interface ProjectCardProps {
  project: Project;
  /** Ruta de la página de detalle. */
  href: string;
  eyebrow: string;
}

/**
 * Tarjeta de la grilla de la home. Toda la tarjeta lleva al detalle: el link
 * del título se estira sobre la tarjeta y los links externos quedan por encima.
 */
export function ProjectCard({ project, href, eyebrow }: ProjectCardProps) {
  const { links } = project;
  const hasLinks = Boolean(links.demo ?? links.repo);

  return (
    <article className={styles.card}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3>
        <Link className={styles.titleLink} href={href}>
          {project.heading ?? project.title}
        </Link>
      </h3>
      <p className={styles.summary}>{project.summary}</p>
      <ChipList items={project.stack} label="Tecnologías" />

      {project.highlights.length > 0 ? (
        <ul className={styles.highlights}>
          {project.highlights.map((highlight) => (
            <li key={highlight.text}>
              {highlight.label ? <b>{highlight.label} </b> : null}
              {highlight.text}
            </li>
          ))}
        </ul>
      ) : null}

      {project.role ? (
        <p className={styles.role}>
          <b>Mi parte:</b> {lowerFirst(project.role)}
        </p>
      ) : project.nextSteps.length > 0 ? (
        <p className={styles.role}>
          <b>Próximo:</b> {listFormat.format(project.nextSteps)}.
        </p>
      ) : null}

      {hasLinks ? (
        <div className={styles.links}>
          <ArrowLinkRow>
            {links.demo ? (
              <ArrowLink href={links.demo} external>
                Demo
              </ArrowLink>
            ) : null}
            {links.repo ? (
              <ArrowLink href={links.repo} external>
                {links.repoLabel ?? "Repositorio"}
              </ArrowLink>
            ) : null}
          </ArrowLinkRow>
        </div>
      ) : null}

      <span className={styles.more} aria-hidden="true">
        Ver proyecto →
      </span>
    </article>
  );
}

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
