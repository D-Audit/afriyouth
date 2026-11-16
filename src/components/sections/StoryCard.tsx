import { Badge } from "@/components/ui/Badge";
import { Media } from "@/components/ui/Media";
import type { Story } from "@/content/impact";
import { cn } from "@/lib/cn";

export function StoryCard({
  story,
  layout = "stacked",
  className,
}: {
  story: Story;
  layout?: "stacked" | "wide";
  className?: string;
}) {
  const wide = layout === "wide";
  return (
    <article
      className={cn(
        "overflow-hidden rounded-card-lg bg-sand text-ink",
        wide && "grid md:grid-cols-2",
        className,
      )}
    >
      <Media
        image={story.image}
        sizes={wide ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
        className={cn("aspect-[4/3]", wide && "md:aspect-auto md:min-h-80")}
      />
      <div className="flex flex-col p-6 sm:p-8">
        <Badge tone="accent" className="self-start">
          {story.label}
        </Badge>
        <h3 className="mt-4 font-display text-h3">{story.title}</h3>
        <p className="mt-3 text-muted">{story.excerpt}</p>
        <p className="label-caps mt-6 text-muted">{story.attribution}</p>
      </div>
    </article>
  );
}
