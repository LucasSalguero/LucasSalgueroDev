import { ButtonLink } from "@/components/ui/Button";
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
      <h1 id="inicio-titulo" className={styles.title}>
        {hero.headline} <span>{hero.headlineAccent}</span>
      </h1>
      <p className={styles.lead}>
        <RichText text={hero.lead} />
      </p>
      <div className={styles.actions}>
        <ButtonLink href={featuredHref} variant="primary">
          Ver proyecto en producción
        </ButtonLink>
        <ButtonLink href={profile.cvPath} external>
          Descargar CV (PDF)
        </ButtonLink>
        <ButtonLink href={links.github} external>
          GitHub
        </ButtonLink>
        <ButtonLink href={links.linkedin} external>
          LinkedIn
        </ButtonLink>
      </div>
      <dl className={styles.facts} aria-label="Datos destacados">
        {hero.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
