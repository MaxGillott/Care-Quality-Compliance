import nextEnv from "@next/env";
import { z } from "zod";

nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const env = process.env;
const checks = [];
const check = (name, passes) => checks.push({ name, passes: Boolean(passes) });
let canonical;
try {
  canonical = new URL(env.NEXT_PUBLIC_SITE_URL || "");
} catch {}
check(
  "Canonical HTTPS domain configured",
  canonical?.protocol === "https:" &&
    !canonical.username &&
    !canonical.password &&
    canonical.pathname === "/" &&
    !canonical.search &&
    !canonical.hash,
);
check(
  "Receiving email is valid",
  z.email().safeParse(env.CONTACT_EMAIL).success,
);
const sender = env.ENQUIRY_FROM?.match(/<([^<>]+)>$/)?.[1] || env.ENQUIRY_FROM;
check("Sending address is valid", z.email().safeParse(sender).success);
check("Email delivery API key configured", Boolean(env.RESEND_API_KEY?.trim()));
check(
  "HTTPS rate-limit endpoint configured",
  env.UPSTASH_REDIS_REST_URL?.startsWith("https://"),
);
check(
  "Rate-limit token configured",
  Boolean(env.UPSTASH_REDIS_REST_TOKEN?.trim()),
);
check(
  "Rate-limit secret has at least 32 characters",
  (env.RATE_LIMIT_SECRET?.length || 0) >= 32,
);
check(
  "Trusted proxy IP header configured",
  Boolean(env.TRUSTED_CLIENT_IP_HEADER?.trim()),
);
check("Enquiry delivery explicitly enabled", env.ENQUIRIES_ENABLED === "true");

console.log(
  "Local configuration check. No network requests or emails are sent.",
);
for (const result of checks)
  console.log(`${result.passes ? "OK" : "NOT READY"}  ${result.name}`);
console.log(
  "DNS verification, proxy trust, mailbox access and legal readiness must be checked separately.",
);
if (checks.some((result) => !result.passes)) process.exitCode = 1;
