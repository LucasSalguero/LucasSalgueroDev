import { ButtonLink } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Profile } from "@/lib/schemas";

import styles from "./Contact.module.css";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section className={styles.contact} id="contacto" aria-labelledby="contacto-titulo">
      <Eyebrow>{profile.contact.eyebrow}</Eyebrow>
      <h2 id="contacto-titulo" className={styles.title}>
        {profile.contact.title}
      </h2>
      <CopyEmailButton email={profile.email} />
      <div className={styles.actions}>
        <ButtonLink href={profile.links.linkedin} external>
          LinkedIn
        </ButtonLink>
        <ButtonLink href={profile.links.github} external>
          GitHub
        </ButtonLink>
        <ButtonLink href={profile.cvPath} external>
          CV en PDF
        </ButtonLink>
      </div>
    </section>
  );
}
