import { InfoGrid } from "@/components/ui/InfoGrid";
import type { InfoItem } from "@/lib/schemas";

/** Grilla de decisiones técnicas de un proyecto. */
export function DecisionGrid({ decisions }: { decisions: readonly InfoItem[] }) {
  return <InfoGrid items={decisions} />;
}
