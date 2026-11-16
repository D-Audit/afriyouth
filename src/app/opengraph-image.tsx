import { ImageResponse } from "next/og";
import { MARK_PATHS, MARK_SIZE } from "@/components/brand/Wordmark";
import { homePage } from "@/content/home";
import { site } from "@/content/site";
import { tokens } from "@/lib/tokens";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing card used by every page: white logo and headline on brand blue. */
export default function OpengraphImage() {
  const { heading } = homePage.hero;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: tokens.duke,
        backgroundImage: `linear-gradient(125deg, ${tokens.pink} 0%, ${tokens.accent} 45%, ${tokens.duke} 100%)`,
        color: "#fff",
        fontFamily: "sans-serif",
        fontWeight: 700,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <svg viewBox={`0 0 ${MARK_SIZE.width} ${MARK_SIZE.height}`} width="65" height="100">
          <path d={[MARK_PATHS.body, MARK_PATHS.head, ...MARK_PATHS.rays].join(" ")} fill="#fff" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 34, lineHeight: 1.1 }}>
          <span>{site.wordmark.first}</span>
          <span>{`${site.wordmark.accent} ${site.wordmark.rest}`}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05 }}>
        <span>{heading.title}</span>
        <span>{heading.emphasis}</span>
      </div>
      <div style={{ display: "flex", fontSize: 30, fontWeight: 400, opacity: 0.9 }}>
        {site.tagline}
      </div>
    </div>,
    size,
  );
}
