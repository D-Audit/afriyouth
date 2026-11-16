import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import type { Partner } from "@/content/partners";

/** Scrolling strip of partner logos. Renders nothing until at least one partner is listed. */
export function PartnersStrip({
  partners,
  label,
  intro,
}: {
  partners: Partner[];
  label: string;
  intro: string;
}) {
  if (partners.length === 0) return null;
  const items = partners.map((partner, index) => (
    <div
      key={index}
      className="flex h-20 w-44 items-center justify-center rounded-card border border-dashed border-sand-deep bg-white/60 px-4"
    >
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={140}
          height={48}
          className="max-h-12 w-auto object-contain"
        />
      ) : (
        <span className="label-caps text-muted">{partner.name}</span>
      )}
    </div>
  ));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="label-caps text-muted">{label}</h2>
        <p className="text-sm text-muted">{intro}</p>
      </div>
      <Marquee items={items} />
    </div>
  );
}
