import { Section, SectionHeading } from "@/components/ui/Section";
import type { Profile } from "@/lib/schemas";

import styles from "./About.module.css";

export function About({ about }: { about: Profile["about"] }) {
  return (
    <Section id="sobre-mi" labelledBy="sobre-mi-titulo">
      <SectionHeading id="sobre-mi-titulo" eyebrow={about.eyebrow} title={about.title} />
      <div className={styles.about}>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
