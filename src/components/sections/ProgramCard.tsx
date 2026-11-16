import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Media } from "@/components/ui/Media";
import type { Program } from "@/content/programs";
import { cn } from "@/lib/cn";

export function ProgramCard({
  program,
  linkLabel,
  headingLevel = "h3",
  className,
}: {
  program: Program;
  linkLabel: string;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-card-lg border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-300 ease-out-soft focus-within:-translate-y-1 focus-within:shadow-lift hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none",
        className,
      )}
    >
      <div className="relative">
        <Media
          image={program.image}
          sizes="(min-width: 640px) 22rem, 82vw"
          className="aspect-[16/10]"
        />
        {program.status && (
          <StatusBadge
            status={program.status}
            className="absolute left-4 top-4 shadow-soft ring-1 ring-black/5"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="label-caps truncate text-accent-ink">{program.format}</p>
        <Heading className="mt-2 font-display text-h3">{program.name}</Heading>
        <p className="mt-2 line-clamp-3 flex-1 text-muted">{program.summary}</p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-accent-ink after:absolute after:inset-0"
        >
          {linkLabel}
          <span className="sr-only">: {program.name}</span>
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
