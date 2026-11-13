import { Section, SectionHeading } from "@/components/ui/Section";
import type { Profile } from "@/lib/schemas";

import styles from "./About.module.css";

export function About({ about }: { about: Profile["about"] }) {
  return (
    <Section id="sobre-mi" labelledBy="sobre-mi-titulo">
      <SectionHeading
        id="sobre-mi-titulo"
        eyebrow={about.eyebrow}
        title={about.title}
        align="center"
      />
      <div className={styles.about}>
        <div className={styles.text}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className={styles.facts} aria-label="Datos destacados">
          {about.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
