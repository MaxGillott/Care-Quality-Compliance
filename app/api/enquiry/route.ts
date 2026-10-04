import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { checkRateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
const reply = (status: number, error?: string) =>
  NextResponse.json(error ? { error } : { ok: true }, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(status === 429 ? { "Retry-After": "600" } : {}),
    },
  });
export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : `${requestUrl.protocol}//${request.headers.get("host") || requestUrl.host}`;
  if (request.headers.get("origin") !== allowedOrigin)
    return reply(403, "Request origin not allowed.");
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply(415, "JSON required.");
  if (Number(request.headers.get("content-length")) > 16384)
    return reply(413, "Enquiry too large.");
  const rate = await checkRateLimit(request);
  if (rate === "limited") return reply(429, "Please wait before trying again.");
  if (rate === "unavailable")
    return reply(503, "Enquiries are temporarily unavailable.");
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "Invalid request.");
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) {
        await reader.cancel();
        return reply(413, "Enquiry too large.");
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(400, "Invalid request.");
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return reply(422, "Please check the enquiry fields.");
  if (process.env.ENQUIRIES_ENABLED !== "true")
    return reply(503, "Enquiries are temporarily unavailable.");
  const key = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !recipient || !from)
    return reply(503, "Enquiries are temporarily unavailable.");
  const d = parsed.data;
  const consultation =
    typeof body === "object" &&
    body !== null &&
    "consultation" in body &&
    body.consultation === true;
  const text = [
    `New ${consultation ? "consultation request" : "enquiry"} from the Care Quality Compliance website.`,
    `I am a: ${d.audience}`,
    `Interested in: ${d.interest}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "Not provided"}`,
    `Organisation: ${d.organisation || "Not provided"}`,
    "",
    d.message,
    "",
    "The sender acknowledged the privacy notice.",
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: d.email,
        subject: `Website enquiry: ${d.interest}`,
        text,
      }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!response.ok) return reply(502, "Delivery temporarily unavailable.");
    return reply(200);
  } catch {
    return reply(502, "Delivery temporarily unavailable.");
  }
}
