import Image from "next/image";

import { Section, SectionHeading } from "@/components/ui/Section";
import type { Skills as SkillsData } from "@/lib/schemas";

import styles from "./Skills.module.css";

export function Skills({ skills }: { skills: SkillsData }) {
  return (
    <Section id="habilidades" labelledBy="habilidades-titulo">
      <SectionHeading
        id="habilidades-titulo"
        eyebrow={skills.eyebrow}
        title={skills.title}
        align="center"
      />
      <dl className={styles.skills}>
        {skills.groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <dt>{group.label}</dt>
            <dd>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item.name} className={styles.item}>
                    {item.logo ? (
                      <Image
                        className={item.monochrome ? styles.monochrome : undefined}
                        src={item.logo}
                        alt=""
                        width={18}
                        height={18}
                      />
                    ) : null}
                    {item.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
