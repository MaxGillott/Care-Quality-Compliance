# Lighthouse measurements: revision 6

Measured 4 October 2026 using Lighthouse 13.5.0 and local Chromium against a production Next.js build at `http://localhost:3000`. Mobile used Lighthouse's default simulated throttling; desktop used its desktop preset. Browser regression suites were stopped before these measurements. The video, interactions and security policy remained enabled.

| Page / profile | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home mobile, run 1 | 96 | 100 | 100 | 66 |
| Home mobile, run 2 | 95 | 100 | 100 | 66 |
| Home mobile, run 3 | 95 | 100 | 100 | 66 |
| Home desktop | 100 | 100 | 100 | 66 |
| Care provider consultancy, mobile | 96 | 100 | 100 | 63 |
| Contact, mobile | 98 | 100 | 100 | 63 |

The three final mobile-homepage performance results were 96, 95 and 95: **median 95**. The desktop homepage run scored 100 for performance, accessibility and best practices. The current implementation has **not** achieved 100 across every Lighthouse category/device. No universal 100 score is claimed.

## Interpreting SEO

The only failing SEO audit in these recorded runs is `is-crawlable`. This unconfigured private preview deliberately serves `noindex` and disallows crawling. The score differs by page because the applicable audit weights differ. The real canonical domain has not been confirmed or configured. Do not remove preview protections solely to improve the number. Configure the confirmed production domain at launch, then rerun on the real HTTPS host.

## Changes supported by the audits

- Initial mobile-homepage performance was 80. The previous unused display font, a duplicate raw poster download and the full-size mobile film were removed. An intermediate mobile run reached 98; the table above records the later repeated measurements rather than presenting that single result as guaranteed.
- The mobile film is 435,908 bytes versus the earlier 2,160,011-byte source. The desktop version is 946,195 bytes. The same scene and duration are retained.
- Decorative film loading follows the first heading/poster paint. Only one responsive poster and one local font are requested on the initial mobile view. Desktop motion libraries load only when eligible viewport and motion preferences permit them.
- The initial audited mobile load transferred about 2,741 KiB; the optimised mobile load is about 705 KiB. This describes that initial page load, not every lazy-loaded asset on the entire website.
- Metadata is present in the initial head, resolving an intermittent missing-description result.
- Contact originally reported a CSP inspector issue caused by the validator probing dynamic code generation. Interpreted validation removed the issue without weakening CSP. The follow-up contact run scored 100 for best practices.

## Limits and next verification

These are local lab measurements, not production hosting results or field Core Web Vitals. Scores vary with CPU, network, Chrome/Lighthouse versions and server response times. The final host, HTTPS, DNS, domain configuration and real user traffic still need verification. The latest mobile LCP needs further attention on the actual host before claiming consistently good field results.

Accessibility 100 is an automated audit score, not WCAG certification. The separate browser suites passed 36 check groups, including keyboard/mobile interactions, CSP, reduced motion and responsive media. No live email was sent.

After deployment, audit Home, About, Services, all six service pages and Contact on mobile and desktop. Use repeated runs and report median results rather than selecting a best run. Check real-user Core Web Vitals when enough traffic exists.

Raw HTML and JSON reports are included in the separately supplied `Care-Quality-Compliance-Lighthouse-v6.zip`.
