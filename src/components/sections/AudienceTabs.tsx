import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import type { LinkItem } from "@/content/types";

/** Not used on the home page at the moment; kept for when audience content is supplied. */
type AudienceContent = {
  tabsLabel: string;
  items: {
    key: string;
    tab: string;
    heading: string;
    reasons: { title: string; description: string }[];
    cta: LinkItem;
  }[];
};

/** Tabbed "find your way in" section: three reasons and one CTA per audience. */
export function AudienceTabs({ content }: { content: AudienceContent }) {
  return (
    <Tabs
      label={content.tabsLabel}
      tabs={content.items.map((item) => ({
        id: item.key,
        label: item.tab,
        panel: (
          <div className="grid gap-8 rounded-card-lg bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col justify-between gap-8 lg:col-span-4">
              <h3 className="font-display text-h2">{item.heading}</h3>
              <Button href={item.cta.href} icon="arrow" className="self-start">
                {item.cta.label}
              </Button>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
              {item.reasons.map((reason, index) => (
                <li key={reason.title} className="rounded-card bg-canvas p-5">
                  <span aria-hidden="true" className="label-caps text-accent-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-6 text-lg font-medium">{reason.title}</h4>
                  <p className="mt-2 text-muted">{reason.description}</p>
                </li>
              ))}
            </ol>
          </div>
        ),
      }))}
    />
  );
}
