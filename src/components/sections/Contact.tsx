import { ButtonLink } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Profile } from "@/lib/schemas";

import styles from "./Contact.module.css";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section className={styles.contact} id="contacto" aria-labelledby="contacto-titulo">
      <div className={styles.card}>
        <Eyebrow>{profile.contact.eyebrow}</Eyebrow>
        <h2 id="contacto-titulo" className={styles.title}>
          {profile.contact.title}
        </h2>
        <CopyEmailButton email={profile.email} variant="address" />
        <p className={styles.alternative}>
          Tocá el email para copiarlo, o{" "}
          <a href={`mailto:${profile.email}`}>abrilo en tu app de correo</a>.
        </p>
        <div className={styles.actions}>
          <ButtonLink href={profile.links.linkedin} icon="linkedin" external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={profile.links.github} icon="github" external>
            GitHub
          </ButtonLink>
          <ButtonLink href={profile.cvPath} icon="file" external>
            Descargar CV (PDF)
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
