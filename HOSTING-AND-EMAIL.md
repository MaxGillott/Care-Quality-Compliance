# Hosting and enquiry setup

Prepared 4 October 2026. No site has been published and no email has been sent.

The recipient is **Enquiry@cqc-compliance.co.uk**. Sending is explicitly disabled with `ENQUIRIES_ENABLED=false`. This is deliberate: the owner has asked for no emails, including tests, until mailbox access is available. The address is prefilled in `.env.example`; `.env.local` is excluded from downloads and deployment uploads.

## Recommended route: GoDaddy domain, managed Next.js hosting

The domain can stay registered at GoDaddy. The website needs a host that runs Next.js, including its Node.js enquiry API and security proxy. Buying a domain does not automatically provide that hosting. Uploading this ZIP to a website-builder or ordinary static hosting directory will not run the application.

Vercel is a straightforward managed option. Its Hobby plan is restricted to personal, non-commercial use; choose a plan appropriate for this business, such as Pro, and review current charges in the client's account. Use client-owned accounts for the host, sending service and rate limiter so the client retains control.

1. **Check the GoDaddy products.** Sign in, open **My Products**, and note the exact hosting product, if one exists. GoDaddy Website Builder, Managed WordPress and a VPS are different products. If only the domain exists, no additional GoDaddy hosting purchase is needed for the Vercel route. If DNS nameservers point somewhere else, edit records at that DNS provider instead of assuming GoDaddy hosts the DNS.
2. **Use delegated access where possible.** The client can open GoDaddy's **Delegate Access** page and invite your own account with the required domain permissions. Do not put their login, mailbox password or API keys in chat, source files or a repository.
3. **Put the project source in a private GitHub repository owned by the client.** Extract the current ZIP first. Upload the files inside `Care-Quality-Compliance`, not the ZIP itself. Include `app`, `components`, `lib`, `public`, `scripts`, the package files and configuration files. Exclude `.env.local`, `.next`, `node_modules`, `.vercel`, archives and scratch/test folders. The supplied ignore files cover these. Never commit API keys.
4. **Import the repository into Vercel.** Use the Next.js preset, the repository root as the root directory, Node.js 22, `npm ci` for installation and `npm run build` for the build command. Leave the output directory at the Next.js default. Turn on appropriate deployment access protection for initial previews. Do not connect the public domain until the client is ready to publish.
5. **Add the environment settings below in the host dashboard.** Keep delivery disabled. Set the real canonical URL only in the Production environment when the exact domain is confirmed; leave it unset for private previews. Public-prefixed variables are compiled during the build, so changing them requires a fresh deployment.
6. **When publication is authorised, add the real domain in Vercel → Project → Settings → Domains.** Add both the bare domain and `www`, choose which one is canonical, and configure the other to redirect. Use the canonical version in `NEXT_PUBLIC_SITE_URL`.
7. **Open GoDaddy → My Products → Domains → the domain → DNS.** Copy the exact current A/CNAME values shown by the Vercel domain screen. Typically `@` uses an A record and `www` uses a CNAME. Do not copy IP addresses from an old tutorial. Resolve conflicting records only for those website hostnames. Do not change nameservers or the existing email MX, SPF, DKIM or DMARC records as part of pointing the website at its host. Domain connection can also be offered automatically; review the proposed record changes before accepting it.
8. **Wait for DNS validation and HTTPS.** Vercel issues the website certificate after successful validation. Check the canonical site, alternate-host redirect, images, video and enquiry error state. Confirm the sitemap uses the correct domain. The site can be live while email delivery remains disabled, but users cannot submit enquiries successfully until the separate email setup is complete.

## Environment settings

Add these through the hosting dashboard. For local development only, copy `.env.example` to `.env.local`. Do not overwrite real secrets with sample values.

| Setting | Value or source |
| --- | --- |
| `CONTACT_EMAIL` | `Enquiry@cqc-compliance.co.uk` |
| `ENQUIRIES_ENABLED` | **`false` for now.** Use `true` only after the owner authorises delivery. |
| `NEXT_PUBLIC_SITE_URL` | The confirmed canonical HTTPS address, without a trailing slash. The website domain has not yet been confirmed. |
| `RESEND_API_KEY` | A sending-only API key created in the client's Resend account, restricted to the verified domain where supported. Enter this directly into the host's secret settings. |
| `ENQUIRY_FROM` | An address on the domain/subdomain verified with Resend, such as `Care Quality Compliance <website@notifications.YOUR-DOMAIN>`. This is an example, not a configured sender. |
| `UPSTASH_REDIS_REST_URL` | The HTTPS REST URL from the client's Upstash database. |
| `UPSTASH_REDIS_REST_TOKEN` | The REST token from that database. Treat it as a secret. |
| `RATE_LIMIT_SECRET` | A new cryptographically random secret. Generate it locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`, then enter it directly in the host dashboard. |
| `TRUSTED_CLIENT_IP_HEADER` | For direct Vercel hosting, `x-vercel-forwarded-for`, after checking the documented proxy setup. For a VPS, use only a header your own trusted proxy overwrites. |
| `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` | Optional: the verified real Google Business Profile/reviews URL. No fabricated review text or ratings. |

Run `npm run check:launch` locally to check whether settings are present. It prints no secrets, makes no network requests and sends no emails. With the current intentionally disabled setup it exits with status 1 and lists the items still required. It cannot verify domain ownership, DNS, mailbox access or actual delivery.

## Connecting enquiries without the mailbox password

The application uses Resend's sending API. The receiving mailbox can remain with GoDaddy/Microsoft 365 or its existing provider. The website does not log into that mailbox, so it does not need its password.

1. Create/use the client's Resend account and add a sending domain. A dedicated subdomain such as `notifications` separates sending verification from the existing business mailbox setup.
2. Add **exactly** the DNS records shown by Resend for that domain. Do not replace the business's existing root-domain mail records. Follow Resend's verification instructions; do not create a second SPF record at the same hostname.
3. After Resend verifies the domain, create the restricted sending API key and add it with `ENQUIRY_FROM` in the host's environment settings. The supplied receiving address is already recorded. Replies to enquiry messages are addressed to the person who submitted the form.
4. Configure the shared rate limiter and trusted proxy header. Production delivery fails closed if those settings are missing. The limiter stores only a keyed identifier and a counter for ten minutes, not enquiry text or raw IP addresses. Apply a host-level request/body limit as well.
5. **Keep `ENQUIRIES_ENABLED=false`. Do not send a test yet.** Once the owner has mailbox access and explicitly authorises delivery, set it to `true` and redeploy. Only then send a single agreed test and confirm receipt, reply behaviour and any junk-folder handling. No automated deployment step sends a message.

There is no enquiry database. Sending services and the receiving mailbox necessarily process and may retain email, so confirm their retention, access and processor arrangements with the business.

## If hosting must also be with GoDaddy

Confirm the exact plan supports a persistent Node.js application with server-side Next.js. A GoDaddy VPS with suitable administrative access can run it, but requires server maintenance; a website-builder or WordPress plan is not a substitute. Do not assume a shared/cPanel plan supports this runtime without checking with GoDaddy.

A VPS setup needs Node.js 22, dependency installation and `npm run build`, a managed persistent process, a TLS reverse proxy, a firewall, security updates and the environment settings above. Run Next on loopback behind the proxy, for example `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3000`. The proxy must overwrite the trusted client-address header, enforce request/body limits and avoid caching nonce-bearing HTML. Keep the Node port private. A server administrator should configure this, including certificates and restart behaviour. The simpler managed-host route above avoids maintaining that server.

## Before public launch

- Confirm the exact domain and the actual legal entity, contact/complaints details and relevant professional credentials. The supplied privacy, terms and accessibility pages still need the business's factual/legal review; a code audit cannot supply missing facts.
- Review real content, keyboard/mobile use and accessibility support. Automated tests do not certify complete accessibility.
- Configure production-only indexing, canonical URLs, sitemap and redirects. Private previews intentionally use `noindex` and disallow crawling.
- Run Lighthouse on the final HTTPS host for Home, About, Services, each service page and Contact, on both mobile and desktop. Record multiple runs and the environment; do not treat a local 100 as a guarantee of identical field performance. Leave the video, security controls and normal visitor experience enabled during audits.
- Keep email disabled until the owner authorises delivery. DNS changes to the website should not interrupt the existing business email.

## Official references checked

- [GoDaddy delegated access](https://www.godaddy.com/en-uk/help/invite-a-delegate-to-access-my-godaddy-account-12376)
- [GoDaddy: edit an A record](https://www.godaddy.com/en-uk/help/edit-an-a-record-19239)
- [Vercel: connect a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel Hobby restrictions](https://vercel.com/docs/plans/hobby)
- [Vercel request/IP headers](https://vercel.com/docs/headers/request-headers)
- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)

Dashboard labels, record values and plan details can change. Use the values shown in the client's own current account.
