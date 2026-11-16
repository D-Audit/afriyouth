import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { contactEmail, roles } from "@/content/contact";

const MAX_BODY_BYTES = 10_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/** Best-effort, per-instance rate limit. Use a shared store (e.g. Upstash) for strict limits. */
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: "validation_failed", fields: z.flattenError(parsed.error).fieldErrors },
      400,
    );
  }

  const { website, ...data } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL).",
      );
      return json({ ok: false, error: "not_configured" }, 503);
    }
    // Development: log metadata only (never message contents) and report success.
    console.info("[contact] Dev submission received", {
      role: data.role,
      messageLength: data.message.length,
    });
    return json({ ok: true, dev: true });
  }

  const roleLabel = roles.find((role) => role.value === data.role)?.label ?? data.role;
  const { labels } = contactEmail;
  const text = [
    `${labels.role}: ${roleLabel}`,
    `${labels.name}: ${data.name}`,
    `${labels.email}: ${data.email}`,
    `${labels.organization}: ${data.organization || "-"}`,
    "",
    data.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || contactEmail.defaultFrom,
      to: [to],
      reply_to: data.email,
      subject: contactEmail.subject(data.name.replace(/[\r\n]+/g, " "), roleLabel),
      text,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend request failed", response.status);
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}
