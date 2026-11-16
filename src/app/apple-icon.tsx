import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/brand/Wordmark";
import { tokens } from "@/lib/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the brand figure (the "Favicon & Mark" version, without rays) on brand blue. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: tokens.accent,
      }}
    >
      <svg viewBox="0 48 180 232" width="104" height="134">
        <path d={MARK_PATHS.body} fill="#fff" />
        <path d={MARK_PATHS.head} fill="#fff" />
      </svg>
    </div>,
    size,
  );
}
