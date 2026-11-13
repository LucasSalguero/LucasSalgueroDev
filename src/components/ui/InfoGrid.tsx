import { RichText } from "./RichText";
import styles from "./InfoGrid.module.css";

export interface InfoGridItem {
  title: string;
  description: string;
}

/** Grilla de celdas "título + descripción" separadas por líneas finas. */
export function InfoGrid({ items }: { items: readonly InfoGridItem[] }) {
  if (items.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.title} className={styles.cell}>
          <h4 className={styles.title}>{item.title}</h4>
          <p className={styles.description}>
            <RichText text={item.description} />
          </p>
        </li>
      ))}
    </ul>
  );
}
