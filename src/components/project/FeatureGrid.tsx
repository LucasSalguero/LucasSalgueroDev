import { InfoGrid } from "@/components/ui/InfoGrid";
import type { InfoItem } from "@/lib/schemas";

/** Grilla de funcionalidades de un proyecto. */
export function FeatureGrid({ features }: { features: readonly InfoItem[] }) {
  return <InfoGrid items={features} />;
}
