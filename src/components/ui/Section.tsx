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
  /** Las secciones de la home van centradas; las del detalle, a la izquierda. */
  align?: "start" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "start",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? `${styles.head} ${styles.center}` : styles.head}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
