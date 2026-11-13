import { RichText } from "./RichText";
import styles from "./InfoGrid.module.css";

export interface InfoGridItem {
  title: string;
  description: string;
}

interface InfoGridProps {
  items: readonly InfoGridItem[];
  /** Nivel del título de cada celda, según el encabezado que tenga arriba. */
  headingLevel?: "h3" | "h4";
}

export function InfoGrid({ items, headingLevel: Heading = "h4" }: InfoGridProps) {
  if (items.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.title} className={styles.cell}>
          <Heading className={styles.title}>{item.title}</Heading>
          <p className={styles.description}>
            <RichText text={item.description} />
          </p>
        </li>
      ))}
    </ul>
  );
}
