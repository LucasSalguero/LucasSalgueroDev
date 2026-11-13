import Link from "next/link";

import styles from "./ProjectNav.module.css";

export interface ProjectNavLink {
  href: string;
  title: string;
}

interface ProjectNavProps {
  previous: ProjectNavLink | null;
  next: ProjectNavLink | null;
}

/** Navegación al proyecto anterior y al siguiente. */
export function ProjectNav({ previous, next }: ProjectNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className={styles.nav} aria-label="Otros proyectos">
      {previous ? (
        <Link className={styles.link} href={previous.href} rel="prev">
          <span className={styles.label}>
            <span aria-hidden="true">←</span> Proyecto anterior
          </span>
          <span className={styles.title}>{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className={`${styles.link} ${styles.next}`} href={next.href} rel="next">
          <span className={styles.label}>
            Proyecto siguiente <span aria-hidden="true">→</span>
          </span>
          <span className={styles.title}>{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
