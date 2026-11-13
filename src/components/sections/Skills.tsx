import { SectionHeading } from "@/components/ui/Section";
import type { Skills as SkillsData } from "@/lib/schemas";

import styles from "./Skills.module.css";

export function Skills({ skills }: { skills: SkillsData }) {
  return (
    <div>
      <SectionHeading id="habilidades-titulo" eyebrow={skills.eyebrow} title={skills.title} />
      <dl className={styles.skills}>
        {skills.groups.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
