# Care Quality Compliance

A responsive, multi-page health and social care consultancy website built with Next.js App Router, React, TypeScript and Tailwind CSS 4. Designed using the installed UX/UI Pro Max skill, with a bespoke editorial design system and six individually composed service pages, locally hosted film and fonts, scroll-scrubbed animation and an accessible guided enquiry form.

## Windows local preview

Extract the ZIP and double-click `start.bat`. Node.js 22+ and internet access for the first dependency installation are required. The launcher prepares a production build locally, then serves it on `127.0.0.1` and opens the browser. It rebuilds when source files, dependencies, fonts or relevant configuration change. No files are uploaded. This avoids development-only recompilation errors during normal browsing. The preparation stamp contains only a hash, not configuration values. `node scripts/start-local.mjs --dev` remains available for editing with live reload.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Node.js 22 or newer is recommended.

```sh
npm run typecheck
npm run build
npm start
```

The build uses Webpack because the execution environment restricts the subprocess port binding used by Turbopack production builds. Development uses Next's default bundler. A working production build has been verified.

## Project structure and shadcn

- `app/`: route pages, metadata, global styles and enquiry API.
- `app/globals.css`: base layout and Tailwind import.
- `app/editorial.css`: the original editorial layout foundations.
- `app/atelier.css`: display typography and layout refinements.
- `app/controls.css`: current text-led action, navigation and colour applications.
- `components/practice-index.tsx`: keyboard/pointer-driven illustrated service index.
- `components/practice-index.module.css`: scoped service-index layouts and drawing transitions.
- `components/practice-canvas.tsx`: optional native-scroll composition motion on service pages.
- `app/service-pages.css`: individually composed service-page layouts, loaded with the service routes.
- `components/service-pages.tsx`: distinct compositions for each of the six practice areas.
- `components/service-explorers.tsx`: evidence tabs, tender-stage tabs, training filters and assessment outline.
- `lib/practice-tools.ts`: fixed, illustrative tool content and allowlisted enquiry prompts.
- `components/care-journey.tsx`: GSAP scroll-led service improvement story.
- `components/service-workbench.tsx`: consultancy finder and training outline builder.
- `components/ui/`: reusable UI primitives, including `hero-section.tsx`, `button.tsx`, `reveal.tsx` and the alternate `demo.tsx` hero.
- `components/`: shared navigation, service grid, enquiry form, calls to action and footer.
- `lib/services.ts`: the complete service catalogue and page content.
- `lib/enquiry-schema.ts`: shared client/server validation.
- `components.json`: shadcn CLI configuration and root aliases.
- `design-system/care-quality-compliance/`: skill recommendations and project-specific decisions.

React, TypeScript, Tailwind and the shadcn structure are already configured; no migration is needed. The default component path is **`/components/ui`**, with `@/components/ui` resolving to it. Keeping this directory consistent makes CLI-generated components, imports and future component integrations predictable. The button uses Radix Slot and class-variance-authority with fully custom branding. To add a future primitive, run `npx shadcn@latest add <component>` and adapt its visual styling. Review any offered overwrite of existing files.

The supplied hero patterns were adapted to this consultancy's content and visual requirements. The primary hero is used on the homepage; navigation and its mobile state are shared across pages in `SiteHeader`. The alternate dark hero is available but intentionally not mounted. Hero components need no props or providers. Local state is used for navigation, interactive service tools and the form; no global state management is required.

## Pages

Home, About, Services, Care Provider Consultancy, Quality & Compliance, Procurement & Contracts, Training & Development, Independent Assessments, Family Support, Contact, Privacy & Cookies, Accessibility and Terms. Includes a useful 404, Open Graph image, sitemap and robots route.

## Connect enquiries

See [HOSTING-AND-EMAIL.md](HOSTING-AND-EMAIL.md) for the GoDaddy domain connection, managed hosting, email setup and the read-only launch configuration check. The receiving address is recorded as Enquiry@cqc-compliance.co.uk; delivery is explicitly disabled and no test email has been sent.

Copy `.env.example` to `.env.local` and fill in the real settings. Do not commit secrets.

1. Add the actual canonical HTTPS domain as `NEXT_PUBLIC_SITE_URL`.
2. Set `CONTACT_EMAIL` to the business's receiving address. Keep `ENQUIRIES_ENABLED=false` until delivery is authorised.
3. Set `RESEND_API_KEY` and `ENQUIRY_FROM` using a verified sending domain in Resend. Restrict the API key to sending from that domain.
4. Configure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and a random `RATE_LIMIT_SECRET` (at least 32 random bytes).
5. Set `TRUSTED_CLIENT_IP_HEADER` only to an address header that the hosting platform/reverse proxy **overwrites**. Do not trust a header passed through from arbitrary clients. Confirm the platform's documented behaviour.
6. Configure the hosting edge to enforce a global enquiry request limit and request-body limit. The application provides five attempts per client identifier per ten minutes; a WAF adds protection against distributed abuse before it reaches the app.
7. Only when the owner authorises delivery, set `ENQUIRIES_ENABLED=true` and redeploy. Send a test only after separate agreement and mailbox access is ready.

**Email is not live until configured.** Missing email or production rate-limit settings fail closed with an honest error. The UI never shows a success confirmation on a failed delivery. “Book a consultation” starts a consultation request; it does not claim a calendar reservation.

No enquiry database, local storage, session storage, analytics, marketing cookies or authentication cookies are used. Unsaved form values live in memory only. No attachments are accepted. The API limits body size, checks same-origin JSON requests, validates all fields server-side, includes a honeypot and sends plain-text email. It does not log enquiry contents. Enquiry emails necessarily exist at the delivery provider and in the receiving mailbox. Configure their retention and access policies appropriately.

Redis contains **only** a keyed hash of the connection address and an expiring counter. It never receives the enquiry or raw IP address. The ten-minute retention is disclosed in the privacy page. A local, shared counter is used only in development. Production requires the shared limiter and a trusted address header and rejects requests if these are unavailable. Configure access logs so that message bodies, secrets and form fields are never recorded.

## Security

- Per-request nonce-based CSP with `strict-dynamic`; no `unsafe-inline` or `unsafe-eval` for production scripts. Styles allow inline values for React and CSS variables.
- SSR is intentional so every document receives a fresh nonce. Do not cache nonce-bearing HTML at an intermediary unless it safely handles nonce regeneration.
- HSTS (for HTTPS deployment), frame denial, MIME sniffing prevention, referrer restrictions and browser permission restrictions.
- Same-origin API enforcement, strict schema, input bounds, payload limit, provider timeout, no-store responses and rate limiting.
- No website database or accounts exist, so row-level security and session-cookie hijacking controls are not applicable. If accounts are added later, introduce server-side authorisation, database RLS where relevant and secure HttpOnly/SameSite cookies.
- Use TLS, least-privilege email/provider credentials, MFA for the business mailbox, provider patching and a deployment-specific security review.

The code cannot guarantee immunity from all attacks. Infrastructure, secrets, domains and third-party accounts remain deployment responsibilities.

## SEO

Pages have unique titles/descriptions, server-rendered content, clear heading structures, meaningful internal links, accessible local imagery, canonical URLs once configured, Open Graph/Twitter metadata, service/organisation JSON-LD, sitemap and robots routes. No fake ratings, credentials, address or review markup is added.

The unconfigured preview is deliberately `noindex` and disallowed by `robots.txt`. Set the real `NEXT_PUBLIC_SITE_URL` **before building for launch** to enable indexing and generate canonical URLs and sitemap entries. Confirm the generated sitemap uses the exact real domain. Submit it in Search Console, set up and verify the real Google Business Profile, validate structured data and monitor Core Web Vitals. Ranking, traffic and commercial results cannot be guaranteed. Continuing SEO requires real local business facts, research, useful content and maintenance.

Set `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` to the verified business's Google review URL. The current section is an honest empty state. It will link to genuine reviews once configured; no rating, review or customer logo has been fabricated. To display review text later, obtain an authorised source and include attribution, date and any required platform disclosures.

## Accessibility and legal launch requirements

The interface targets WCAG 2.2 AA: keyboard menus, mobile focus containment, skip link, visible focus, native form controls, inline errors and error summaries, semantic landmarks, alternative text, meaningful labels and reduced motion. Automated checks are provided, but manual screen-reader and disabled-user testing are still required before claiming conformance.

Privacy, cookies, terms and accessibility pages are written for this implementation. **They require business/legal review before publication**. Obtain and add the actual legal entity/trading details, service/contact address, company registration and VAT details where applicable, privacy contact, professional registrations/qualifications and complaints process. Confirm the lawful basis, email retention schedule, processor agreements, international transfer safeguards, accessibility support route and any professional-service obligations. These facts were not supplied and have not been invented. Do not enable live enquiries until those arrangements are confirmed. A website implementation alone cannot establish compliance with every legal requirement.

Replace illustrative stock photography with approved original team/service photographs when available. Existing photos are never presented as actual staff or clients. A licensed, locally hosted SHVETS production film from Pexels illustrates human connection in the homepage hero. It is muted, has a pause/play control, pauses offscreen and when the tab is hidden, and defaults to its poster for reduced-motion or data-saving preferences. The responsive film is approximately 436 KB on mobile and 946 KB on desktop and is never fetched from a third-party video host. The poster is fetched once through Next.js image optimisation. The people shown are illustrative, not represented as staff or clients.

## Interaction design

Desktop scroll animation code is loaded on demand only when the viewport and motion preferences permit it. On smaller screens and with reduced motion, the complete static content remains available without that library download.

The home care journey uses native scrolling, a sticky panel and a scrubbed GSAP path on larger screens. Keyboard-operable stage links and a skip link remain available. Smaller viewports, reduced motion and no JavaScript receive a regular four-stage layout. The consultancy finder offers three real starting points; the training planner accepts up to four priorities and a team type. Enquiry links carry only predefined service selections, never personal details. The receiving page validates those selections against an allowlist before generating an editable draft. Quality reviews, tender stages and assessment purposes follow the same pattern. Course filters expose all twelve supplied training topics. Evidence panels and tender stages use keyboard-operable ARIA tabs; the family questions use native disclosure elements. No interaction state is stored in cookies or browser storage.

Current reference research is in `design-system/care-quality-compliance/RESEARCH-V4.md`; the original film study is retained in `REFERENCE-STUDY.md`.

## Verification

With the site running:

```sh
npm run test:site
npm run test:interactions
npm run test:practice
npm run test:design
```

When testing an unconfigured production preview, set `TEST_RATE_LIMIT_MODE=unconfigured` for `test:site`; this explicitly checks that enquiries fail closed with HTTP 503. The default mode tests development validation and request limiting.

Set `CHROMIUM_PATH` if Chromium is not at `/usr/bin/chromium`; set `TEST_BASE_URL` to test a different local port. Tests cover all pages, five viewport widths, navigation and mobile focus behaviour, form validation and Back, mocked success/failure delivery, request rejection and rate limiting, storage/cookies, security headers and nonce freshness, automated axe WCAG checks and 404 behaviour. Results are written to `test-results/site-report.json`. The practice-page suite checks all six service pages from 320 to 1440 pixels, keyboard tabs, topic filters, expandable content, validated enquiry handoffs and automated WCAG checks in interactive states. Its report is `test-results/practice-report.json`. The interaction suite additionally checks video controls, continuous/reversible scrubbing, mobile and no-JavaScript fallbacks, reduced motion/data saving, training selection bounds, enquiry handoff, and accessibility in interactive states; its report is `test-results/interaction-report.json`. Mocked email tests do **not** send a real message.

## Asset provenance

Local image sources are recorded in `public/images/ATTRIBUTION.md`. Font licence files are included beside the local IBM Plex Sans font files. No Google Fonts or photo CDN requests are made by visitors.

The design suite checks the new practice index, keyboard/pointer selection, reduced motion, direct mobile/no-JavaScript navigation, action focus/typography and the absence of third-party media, font or tracking requests. Its report is `test-results/design-report.json`.

It also checks responsive film selection, the single poster/font downloads and motion changes after resizing. The core-site suite checks browser CSP inspector issues on the contact form. Lighthouse measurements and limitations are documented in `design-system/care-quality-compliance/LIGHTHOUSE-V6.md`.

The browser report records the latest completed checks. These checks are not a substitute for live delivery testing, legal review or a full accessibility audit.
