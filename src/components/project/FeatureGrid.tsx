import { InfoGrid } from "@/components/ui/InfoGrid";
import type { InfoItem } from "@/lib/schemas";

interface FeatureGridProps {
  features: readonly InfoItem[];
  headingLevel?: "h3" | "h4";
}

/** Grilla de funcionalidades de un proyecto. */
export function FeatureGrid({ features, headingLevel }: FeatureGridProps) {
  return <InfoGrid items={features} headingLevel={headingLevel} />;
}
