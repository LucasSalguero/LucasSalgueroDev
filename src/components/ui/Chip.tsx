import styles from "./Chip.module.css";

interface ChipListProps {
  items: readonly string[];
  /** Nombre accesible de la lista, por ejemplo "Tecnologías". */
  label: string;
}

export function ChipList({ items, label }: ChipListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={styles.chips} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}
