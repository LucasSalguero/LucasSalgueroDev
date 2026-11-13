import { RichText } from "@/components/ui/RichText";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Ticket } from "@/components/ui/Ticket";
import type { Project } from "@/lib/schemas";

import { DecisionGrid } from "./DecisionGrid";
import { FeatureGrid } from "./FeatureGrid";
import { Gallery } from "./Gallery";
import { OfflineFlow } from "./OfflineFlow";
import styles from "./ProjectDetail.module.css";

/**
 * Cuerpo de la página de detalle. Cada sección se muestra solo si el
 * proyecto tiene datos para ella.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const hasContext = Boolean(project.problem ?? project.solution);
  const hasDecisions = project.decisions.length > 0 || Boolean(project.offlineFlow);
  const hasTeam = Boolean(project.role ?? project.team);

  return (
    <>
      {project.images.length > 0 ? (
        <Section labelledBy="capturas-titulo">
          <SectionHeading id="capturas-titulo" eyebrow="Capturas" title="Cómo se ve" />
          <Gallery images={project.images} />
        </Section>
      ) : null}

      {hasContext ? (
        <Section labelledBy="contexto-titulo">
          <SectionHeading id="contexto-titulo" eyebrow="Contexto" title="Problema y solución" />
          <div className={styles.two}>
            {project.problem ? (
              <div className={styles.block}>
                <h3>El problema</h3>
                <p>{project.problem}</p>
              </div>
            ) : null}
            {project.solution ? (
              <div className={styles.block}>
                <h3>La solución</h3>
                <p>{project.solution}</p>
              </div>
            ) : null}
          </div>
        </Section>
      ) : (
        <Section labelledBy="resumen-titulo">
          <SectionHeading id="resumen-titulo" eyebrow="Resumen" title="De qué se trata" />
          <p className={styles.lead}>{project.summary}</p>
        </Section>
      )}

      {project.features.length > 0 ? (
        <Section labelledBy="funcionalidades-titulo">
          <SectionHeading id="funcionalidades-titulo" eyebrow="Funcionalidades" title="Qué hace" />
          <FeatureGrid features={project.features} headingLevel="h3" />
        </Section>
      ) : null}

      {hasDecisions ? (
        <Section labelledBy="decisiones-titulo">
          <SectionHeading
            id="decisiones-titulo"
            eyebrow="Decisiones técnicas"
            title="Cómo está hecho"
          />
          <div className={project.ticket ? styles.case : undefined}>
            <div className={styles.caseBody}>
              <DecisionGrid decisions={project.decisions} headingLevel="h3" />
              {project.offlineFlow ? <OfflineFlow flow={project.offlineFlow} /> : null}
              {project.note ? <p className={styles.note}>{project.note}</p> : null}
            </div>
            {project.ticket ? <Ticket ticket={project.ticket} /> : null}
          </div>
        </Section>
      ) : null}

      {hasTeam ? (
        <Section labelledBy="equipo-titulo">
          <SectionHeading
            id="equipo-titulo"
            eyebrow={project.team ? "Equipo" : "Rol"}
            title="Mi parte"
          />
          <div className={styles.prose}>
            {project.role ? <p>{project.role}</p> : null}
            {project.team ? <p className={styles.muted}>{project.team}</p> : null}
          </div>
        </Section>
      ) : null}

      {project.nextSteps.length > 0 ? (
        <Section labelledBy="proximos-titulo">
          <SectionHeading id="proximos-titulo" eyebrow="Próximos pasos" title="Qué sigue" />
          <ul className={styles.steps}>
            {project.nextSteps.map((step) => (
              <li key={step}>
                <RichText text={step} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
