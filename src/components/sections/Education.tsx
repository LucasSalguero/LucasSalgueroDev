import { SectionHeading } from "@/components/ui/Section";
import type { Education as EducationData } from "@/lib/schemas";

import styles from "./Education.module.css";

export function Education({ education }: { education: EducationData }) {
  return (
    <div>
      <SectionHeading id="formacion-titulo" eyebrow={education.eyebrow} title={education.title} />
      <ul className={styles.timeline}>
        {education.items.map((item) => (
          <li key={item.period}>
            <span className={styles.when}>{item.period}</span>
            {item.title ? <h3>{item.title}</h3> : null}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
