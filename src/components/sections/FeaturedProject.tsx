import { DecisionGrid } from "@/components/project/DecisionGrid";
import { FeatureGrid } from "@/components/project/FeatureGrid";
import { OfflineFlow } from "@/components/project/OfflineFlow";
import { ArrowLink, ArrowLinkRow } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Ticket } from "@/components/ui/Ticket";
import type { Project } from "@/lib/schemas";

import styles from "./FeaturedProject.module.css";

interface FeaturedProjectProps {
  project: Project;
  /** Ruta de la página de detalle. */
  href: string;
  eyebrow: string;
}

/** Caso de estudio destacado de la home, con el ticket de venta al costado. */
export function FeaturedProject({ project, href, eyebrow }: FeaturedProjectProps) {
  const headingId = `${project.slug}-titulo`;
  const highlights = project.highlights.map((highlight) => ({
    title: highlight.label ?? highlight.text,
    description: highlight.text,
  }));

  return (
    <Section id={project.slug} labelledBy={headingId}>
      <SectionHeading
        id={headingId}
        eyebrow={eyebrow}
        title={project.heading ?? project.title}
        description={project.summary}
        align="center"
      />

      <div className={project.ticket ? styles.case : undefined}>
        <div className={styles.body}>
          <ChipList items={project.stack} label="Tecnologías" />

          {highlights.length > 0 ? (
            <div>
              <h3 className={styles.blockTitle}>Qué hace</h3>
              <FeatureGrid features={highlights} />
            </div>
          ) : null}

          {project.offlineFlow ? <OfflineFlow flow={project.offlineFlow} /> : null}

          {project.decisions.length > 0 ? (
            <div>
              <h3 className={styles.blockTitle}>Decisiones técnicas</h3>
              <DecisionGrid decisions={project.decisions} />
            </div>
          ) : null}

          {project.note ? <p className={styles.note}>{project.note}</p> : null}

          <div className={styles.actions}>
            <ButtonLink href={href} variant="primary">
              Ver caso completo
            </ButtonLink>
            <ArrowLinkRow>
              {project.links.demo ? (
                <ArrowLink href={project.links.demo} external>
                  Ver demo
                </ArrowLink>
              ) : null}
              {project.links.repo ? (
                <ArrowLink href={project.links.repo} external>
                  Ver repositorio
                </ArrowLink>
              ) : null}
            </ArrowLinkRow>
          </div>
        </div>

        {project.ticket ? <Ticket ticket={project.ticket} /> : null}
      </div>
    </Section>
  );
}
