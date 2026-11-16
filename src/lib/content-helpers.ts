import { audienceLabels } from "@/content/opportunities";
import type { AudienceKey } from "@/content/types";

/** Human-readable label for an audience key, as defined in opportunities.ts. */
export function audienceLabel(key: AudienceKey): string {
  return audienceLabels[key] ?? key;
}
