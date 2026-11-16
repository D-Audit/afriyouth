"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import type { Resource, ResourceType } from "@/content/impact";
import { ui } from "@/content/site";

type ResourceExplorerProps = {
  resources: Resource[];
  types: { value: ResourceType; label: string }[];
  filterLabel: string;
};

/** Resource list with a single "type" filter. */
export function ResourceExplorer({ resources, types, filterLabel }: ResourceExplorerProps) {
  const [type, setType] = useState<ResourceType | null>(null);
  const results = type ? resources.filter((resource) => resource.type === type) : resources;
  const typeLabel = (value: ResourceType) =>
    types.find((option) => option.value === value)?.label ?? value;

  return (
    <div>
      <FilterChips label={filterLabel} options={types} value={type} onChange={setType} />
      <p role="status" className="label-caps mb-4 mt-8 text-muted">
        {ui.filterResultsLabel(results.length)}
      </p>
      <ul className="divide-y divide-line border-y border-line">
        {results.map((resource) => (
          <li
            key={resource.id}
            className="group relative grid gap-3 py-6 sm:grid-cols-12 sm:items-center sm:gap-6"
          >
            <div className="flex items-center gap-3 sm:col-span-3">
              <FileText aria-hidden="true" strokeWidth={1.5} className="size-5 text-accent-ink" />
              <span className="label-caps text-muted">
                {typeLabel(resource.type)} · {resource.year}
              </span>
            </div>
            <div className="sm:col-span-6">
              <h3 className="text-lg font-medium">{resource.title}</h3>
              <p className="text-muted">{resource.summary}</p>
            </div>
            <Link
              href={resource.href}
              className="inline-flex min-h-11 items-center gap-2 font-medium text-accent-ink after:absolute after:inset-0 sm:col-span-3 sm:justify-end"
            >
              {resource.linkLabel}
              <span className="sr-only">: {resource.title}</span>
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
