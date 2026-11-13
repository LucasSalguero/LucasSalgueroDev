import { ButtonLink } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import type { Profile } from "@/lib/schemas";

import styles from "./Hero.module.css";

interface HeroProps {
  profile: Profile;
  /** Ancla del proyecto destacado. */
  featuredHref: string;
}

export function Hero({ profile, featuredHref }: HeroProps) {
  const { hero, links } = profile;

  return (
    <section className={styles.hero} id="inicio" aria-labelledby="inicio-titulo">
      <p className={styles.status}>{hero.status}</p>
      <h1 id="inicio-titulo" className={styles.name}>
        {profile.name}
      </h1>
      <p className={styles.headline}>
        {hero.headline} <span>{hero.headlineAccent}</span>
      </p>
      <p className={styles.location}>
        <Icon name="pin" size={16} />
        {profile.location}
      </p>
      <p className={styles.lead}>
        <RichText text={hero.lead} />
      </p>
      <div className={styles.actions}>
        <ButtonLink href={featuredHref} variant="primary">
          Ver proyecto en producción
        </ButtonLink>
        <ButtonLink href={profile.cvPath} icon="file" external>
          Descargar CV (PDF)
        </ButtonLink>
        <ButtonLink href={links.linkedin} icon="linkedin" external>
          LinkedIn
        </ButtonLink>
        <ButtonLink href={links.github} icon="github" external>
          GitHub
        </ButtonLink>
        <CopyEmailButton email={profile.email} />
      </div>
    </section>
  );
}
