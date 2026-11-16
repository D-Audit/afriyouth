import Image from "next/image";
import { ui } from "@/content/site";
import type { ImageSlot } from "@/content/types";
import { cn } from "@/lib/cn";
import { Parallax } from "./Parallax";
import { Pattern } from "./Pattern";

type MediaProps = {
  image: ImageSlot;
  /** Responsive sizes hint for next/image, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  eager?: boolean;
  objectPosition?: string;
  /** Where the placeholder caption sits; use "top" when something overlaps the bottom. */
  captionPosition?: "top" | "bottom";
  /** Photo drifts slightly slower than the page while scrolling. On by default.
   *  Every photo also zooms in gently as it reaches the middle of the screen. */
  parallax?: boolean;
  /** Disable the scroll zoom when the image should keep a stable frame. */
  zoom?: boolean;
  className?: string;
};

/**
 * Image slot. Renders the real photo when `image.src` is set, otherwise a warm,
 * clearly labelled placeholder of the same size (so swapping causes no layout shift).
 * The parent decides the shape via className (e.g. "aspect-[4/3] rounded-card-lg").
 */
export function Media({
  image,
  sizes,
  eager,
  objectPosition,
  captionPosition = "bottom",
  parallax = true,
  zoom = true,
  className,
}: MediaProps) {
  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden bg-sand", className)}>
        <Parallax strength={parallax ? 8 : 0} zoom={zoom}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            loading={eager ? "eager" : undefined}
            style={objectPosition ? { objectPosition } : undefined}
            className="object-cover [scale:var(--zoom,1)]"
          />
        </Parallax>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${ui.photoPrefix}: ${image.placeholder}`}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-accent-tint via-sand to-sand-deep",
        className,
      )}
    >
      <Pattern className="text-accent/20" />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -top-1/3 aspect-square w-3/4 rounded-full bg-accent/15 blur-3xl"
      />
      <p
        className={cn(
          "label-caps absolute inset-x-4 text-pretty text-muted sm:inset-x-5",
          captionPosition === "top" ? "top-4 sm:top-5" : "bottom-4 sm:bottom-5",
        )}
      >
        [{ui.photoPrefix}: {image.placeholder}]
      </p>
    </div>
  );
}
