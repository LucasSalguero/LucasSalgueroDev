import { Section, SectionHeading } from "@/components/ui/Section";
import type { Education as EducationData } from "@/lib/schemas";

import styles from "./Education.module.css";

export function Education({ education }: { education: EducationData }) {
  return (
    <Section id="formacion" labelledBy="formacion-titulo">
      <SectionHeading
        id="formacion-titulo"
        eyebrow={education.eyebrow}
        title={education.title}
        align="center"
      />
      <ul className={styles.list}>
        {education.items.map((item) => (
          <li key={item.title} className={styles.card}>
            <span className={styles.monogram} aria-hidden="true">
              {item.monogram}
            </span>
            <div className={styles.body}>
              <h3>{item.title}</h3>
              <p className={styles.institution}>{item.institution}</p>
              <p className={styles.when}>{item.period}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
