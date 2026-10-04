# Local verification: 4 October 2026, revision 6

## Revision 6 typography, performance and launch preparation

- Replaced Bricolage display type with locally hosted IBM Plex Sans throughout. Headings and navigation now use a restrained weight/spacing hierarchy; decorative dots were removed. The approved green/lavender/sage palette remains.
- Production build and TypeScript checking passed. All **36 browser check groups** passed: 12 core-site, 9 interactions, 9 practice-page and 6 design groups. No recorded application/browser errors in those runs.
- Added a resource/adaptation regression check: mobile requests one responsive poster and one font, plays the smaller film, enables desktop scroll motion after a viewport change and returns to a static, paused state for reduced motion.
- Verified that the contact page does not raise a CSP inspector issue. Zod now uses its interpreted mode instead of attempting a dynamic-code capability probe. The strict production script policy is retained.
- Removed the duplicate raw poster download; added smaller desktop/mobile film encodings; deferred decorative film loading until the first text/poster paint; loaded GSAP only for eligible desktop motion. Metadata is delivered in the initial head for every client.
- The receiving address is configured as Enquiry@cqc-compliance.co.uk. The new `ENQUIRIES_ENABLED` switch is **false**. No emails, including test messages, were sent. Successful-delivery browser tests use intercepted responses.
- `npm run check:launch` correctly reports that the recipient is valid and the remaining live settings/sending authorisation are not ready. This command makes no network requests and sends no mail.
- Hosting/domain/email instructions are in `HOSTING-AND-EMAIL.md`. The exact website domain and GoDaddy hosting product remain unconfirmed. No hosting account, DNS record or external application was changed.
- Measured Lighthouse results and their scope are recorded in `LIGHTHOUSE-V6.md`. They do not establish a universal 100 score, live Core Web Vitals or full accessibility conformance.

All browser/platform/legal limitations below still apply. Nothing was published.

## Revision 5 palette verification

- Restored the earlier forest and botanical greens, replacing orange accents and apricot panels. Lavender-grey, lilac and sage replace the white/chalk section breaks and blue working surfaces. Updated the favicon and social-sharing artwork to match.
- Production Webpack build and its TypeScript check passed. A sandboxed first attempt failed to parse the TypeScript CLI output; the same build completed with the workspace's network permission enabled, with no compiler/configuration workaround.
- Reran all 30 core-site, interaction and practice-page check groups successfully. These include automated axe colour-contrast/WCAG checks at desktop and mobile widths and in selected interactive states, responsive reflow down to 320px on service pages, keyboard navigation, reduced motion, enquiry flow and browser-storage checks. No application/browser errors were recorded in these completed runs.
- Manually reviewed desktop hero, intro, services, interactive workbench and closing section, plus mobile training and contact screenshots. The separate five-group design suite below passed in revision 4 and was not rerun for this palette-only change.
- Local preview and the Windows package were updated. Nothing was published. All limitations below still apply.

## Revision 4 verification record

## Completed

- TypeScript check and production Webpack build on Next.js 16.3.8.
- 12 core-site browser check groups: 13 routes, metadata, responsive layouts, desktop and mobile navigation, focus containment, enquiry validation and Back navigation, simulated delivery success/failure, API rejection, unconfigured production fail-closed behaviour, no persistent browser storage or cookies, security headers, fresh CSP nonces, automated accessibility and 404 behaviour.
- 9 interaction check groups: film pause/play and offscreen pause, continuously scrubbed/reversible care journey, consultancy and training enquiry handoffs, selection bounds, mobile layout, reduced motion, data saving, untrusted query rejection, no-JavaScript content and automated accessibility in interactive states.
- 9 practice-page check groups: all six distinct service pages at 320, 390, 768, 1024 and 1440 CSS pixels; a short 640 × 450 reflow viewport; keyboard tabs including Home/End; tender-stage selection; all 12 training topics and filters; native disclosures; assessment outline; family audience selection; allowlisted enquiry drafts; automated axe WCAG A/AA checks at mobile and desktop widths; no browser storage or cookies.
- 5 design check groups: keyboard and pointer illustration previews, genuine service navigation, native-scroll folio motion, reduced-motion reset, text-led action typography/focus, direct links without JavaScript, and no third-party font/media/tracking requests.
- No recorded browser runtime or console errors in the completed production interaction, practice-page and design runs.
- Manual Chromium screenshot review of desktop and mobile compositions, interactive tools, the narrowest call-to-action layout and the generated social-sharing image.
- The unchanged launcher was verified in revision 3 from a fresh copy: dependency installation, initial production build, loopback-only preview, occupied-port fallback, clean shutdown, cached second launch and automatic rebuilding after a source change.

Revision 4 corrected contrast on the apricot family section and selected training-topic hover. Colour transitions on selection controls were removed so intermediate animation frames retain contrast. Focus outlines on the film and dark sections use a light token. Earlier narrow-screen and headline wrapping fixes remain in place.

## Preview error investigation

The initial fresh development visit did not reproduce the user's unspecified error message. It did reveal Next.js's smooth-scroll opt-in warning, now fixed on the root HTML element. Live recompilation later produced an intermittent Next.js “Unexpected end of JSON input” error. Normal Windows previewing now uses a prepared production build rather than live development recompilation. The final production browser checks recorded no application errors. The development command remains available for editing.

The browser test previously changed image loading attributes before hydration; it now scrolls images into view without modifying React-owned attributes.

## Limits of these checks

Chromium was exercised in Linux. The Windows batch file and platform-specific commands were reviewed, but native Windows execution, Safari, VoiceOver, NVDA and disabled-user testing were not available here. Automated WCAG checks and responsive viewport tests do not establish complete WCAG conformance. The 640 × 450 viewport checks browser-zoom-equivalent reflow, not text-only zoom.

Delivery success is simulated in browser tests. No real enquiry was emailed. The business email, mail provider and production limiter still need configuration. Legal entity details, professional credentials, privacy arrangements and any eventual publication require the business's factual and legal review. Nothing was deployed or published.
