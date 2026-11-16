import { ui } from "@/content/site";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-ink px-5 py-3 font-medium text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {ui.skipLink}
    </a>
  );
}
