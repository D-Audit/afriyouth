import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ui } from "@/content/site";
import type { LinkItem } from "@/content/types";

/** Breadcrumb trail. The last item is the current page and is not a link. */
export function Breadcrumbs({ items }: { items: LinkItem[] }) {
  const trail = [{ label: ui.homeCrumb, href: "/" }, ...items];
  return (
    <nav aria-label={ui.breadcrumbLabel} className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
