"use client";

import { useMemo, useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import type { Program } from "@/content/programs";
import type { ServiceSlug } from "@/content/services";
import { ui } from "@/content/site";
import type { Status } from "@/content/types";
import { ProgramCard } from "./ProgramCard";

type Option<T extends string> = { value: T; label: string };

type ProgramExplorerProps = {
  programs: Program[];
  labels: { legend: string; topic: string; status: string };

  topicOptions: Option<ServiceSlug>[];
  statusOptions: Option<Status>[];
};

/** Filterable program grid (audience × topic × status). Results update live and are announced. */
export function ProgramExplorer({
  programs,
  labels,

  topicOptions,
  statusOptions,
}: ProgramExplorerProps) {
  const [topic, setTopic] = useState<ServiceSlug | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const results = useMemo(
    () =>
      programs.filter(
        (program) => (!topic || program.topic === topic) && (!status || program.status === status),
      ),
    [programs, topic, status],
  );

  const filtered = topic || status;

  function clear() {
    setTopic(null);
    setStatus(null);
  }

  return (
    <div>
      <section
        aria-label={labels.legend}
        className="divide-y divide-line rounded-card-lg border border-line bg-white px-5 shadow-soft sm:px-7 [&>*]:py-5"
      >
        <FilterChips
          label={labels.topic}
          options={topicOptions}
          value={topic}
          onChange={setTopic}
        />
        {statusOptions.length > 0 && (
          <FilterChips
            label={labels.status}
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        )}
      </section>

      <div className="mb-6 mt-10 flex min-h-11 items-center justify-between gap-4">
        <p role="status" className="label-caps text-muted">
          {ui.filterResultsLabel(results.length)}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={clear}
            className="min-h-11 px-1 font-medium text-accent-ink underline-offset-4 hover:underline"
          >
            {ui.filterClear}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((program) => (
            <li key={program.slug} className="flex">
              <ProgramCard program={program} linkLabel={ui.viewDetails} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-card-lg border border-dashed border-sand-deep p-10 text-center text-muted">
          {ui.filterEmpty}
        </p>
      )}
    </div>
  );
}
