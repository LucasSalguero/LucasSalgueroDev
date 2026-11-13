import { Section } from "@/components/ui/Section";
import type { Education as EducationData, Skills as SkillsData } from "@/lib/schemas";

import { Education } from "./Education";
import styles from "./EducationAndSkills.module.css";
import { Skills } from "./Skills";

interface EducationAndSkillsProps {
  education: EducationData;
  skills: SkillsData;
}

/** Formación y habilidades comparten sección, en dos columnas. */
export function EducationAndSkills({ education, skills }: EducationAndSkillsProps) {
  return (
    <Section id="formacion" labelledBy="formacion-titulo">
      <div className={styles.two}>
        <Education education={education} />
        <Skills skills={skills} />
      </div>
    </Section>
  );
}
