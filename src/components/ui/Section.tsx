import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";
import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  children: ReactNode;
  /** Id del encabezado que nombra la sección. */
  labelledBy?: string;
}

export function Section({ id, children, labelledBy }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
