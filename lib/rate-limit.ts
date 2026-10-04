import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
const local = new Map<string, { count: number; reset: number }>();
const WINDOW = 600;
const LIMIT = 5;
export async function checkRateLimit(
  request: NextRequest,
): Promise<"allowed" | "limited" | "unavailable"> {
  const configuredHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
  const ip = configuredHeader
    ? request.headers.get(configuredHeader)?.split(",")[0]?.trim().slice(0, 80)
    : undefined;
  const secret = process.env.RATE_LIMIT_SECRET;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (
    process.env.NODE_ENV === "production" &&
    (!redisUrl || !token || !secret || !configuredHeader || !ip)
  )
    return "unavailable";
  const key =
    "cqc:enquiry:" +
    createHmac("sha256", secret || "local-development-only")
      .update(ip || "development")
      .digest("hex");
  if (redisUrl && token) {
    try {
      if (!redisUrl.startsWith("https://")) return "unavailable";
      const script =
        "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return n";
      const response = await fetch(redisUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["EVAL", script, "1", key, String(WINDOW)]),
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      });
      if (!response.ok) return "unavailable";
      const result = await response.json();
      if (typeof result.result !== "number") return "unavailable";
      return result.result > LIMIT ? "limited" : "allowed";
    } catch {
      return "unavailable";
    }
  }
  const now = Date.now();
  for (const [k, v] of local) {
    if (v.reset <= now) local.delete(k);
  }
  const existing = local.get(key);
  if (!existing) {
    local.set(key, { count: 1, reset: now + WINDOW * 1000 });
    return "allowed";
  }
  existing.count++;
  return existing.count > LIMIT ? "limited" : "allowed";
}
