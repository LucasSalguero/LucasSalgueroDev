import { InfoGrid } from "@/components/ui/InfoGrid";
import type { InfoItem } from "@/lib/schemas";

interface DecisionGridProps {
  decisions: readonly InfoItem[];
  headingLevel?: "h3" | "h4";
}

/** Grilla de decisiones técnicas de un proyecto. */
export function DecisionGrid({ decisions, headingLevel }: DecisionGridProps) {
  return <InfoGrid items={decisions} headingLevel={headingLevel} />;
}
