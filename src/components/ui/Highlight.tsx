import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Words set on a soft, sun-washed gradient block that wipes in from the left.
 * Uses a background on the inline text (box-decoration-break: clone) so it follows the
 * words correctly when they wrap onto several lines.
 */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("highlight", className)}>{children}</span>;
}
