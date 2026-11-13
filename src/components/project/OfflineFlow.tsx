import { RichText } from "@/components/ui/RichText";
import type { OfflineFlow as OfflineFlowData } from "@/lib/schemas";

import styles from "./OfflineFlow.module.css";

/** Flujo numerado de la sincronización sin conexión. */
export function OfflineFlow({ flow }: { flow: OfflineFlowData }) {
  return (
    <div>
      <h3 className={styles.title}>{flow.title}</h3>
      <p className={styles.intro}>{flow.intro}</p>
      <ol className={styles.flow}>
        {flow.steps.map((step) => (
          <li key={step}>
            <p>
              <RichText text={step} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
