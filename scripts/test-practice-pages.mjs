import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const results = [];
const errors = [];
page.on("pageerror", (e) => errors.push(e.stack || e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
const slugs = [
  "care-provider-consultancy",
  "quality-and-compliance",
  "procurement-and-contracts",
  "training-and-development",
  "independent-assessments",
  "family-support",
];
async function test(name, fn) {
  try {
    await fn();
    results.push({ name, passed: true });
    console.log("PASS " + name);
  } catch (e) {
    results.push({ name, passed: false, error: e.message });
    errors.push(name + ": " + e.message);
    console.log("FAIL " + name + ": " + e.message);
  }
}
async function visit(slug) {
  const response = await page.goto(base + "/services/" + slug, {
    waitUntil: "networkidle",
  });
  assert.equal(response.status(), 200);
  await expect(page.locator("h1")).toHaveCount(1);
}
async function draft(interest) {
  await page.waitForURL("**/contact?**");
  await expect(page.locator("#interest")).toHaveValue(interest);
  await page.getByLabel("Care provider", { exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  return await page.locator("#message").inputValue();
}
try {
  await test("Six distinct service pages reflow from 320px to desktop and in a short zoom-equivalent viewport", async () => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const slug of slugs) {
        await visit(slug);
        const data = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          screen: innerWidth,
        }));
        assert(
          data.width <= data.screen,
          `${slug} overflows at ${width}px: ${JSON.stringify(data)}`,
        );
      }
    }
    // 1280 × 900 at 200% browser zoom exposes a 640 × 450 CSS viewport.
    // This checks reflow, not text-only zoom or screen-reader conformance.
    await page.setViewportSize({ width: 640, height: 450 });
    for (const slug of slugs) {
      await visit(slug);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${slug} overflows in the zoom-equivalent viewport`,
      );
    }
  });
  await test("Quality review tabs support arrows, Home and End, and carry the chosen area into the enquiry", async () => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await visit("quality-and-compliance");
    const first = page.getByRole("tab", { name: /Care records/ });
    await first.focus();
    await page.keyboard.press("End");
    await expect(
      page.getByRole("tab", { name: /Risk & learning/ }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#evidence-panel-risk")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("tab", { name: /Governance/ })).toBeFocused();
    await expect(page.locator("#evidence-panel-governance")).toBeVisible();
    await page.keyboard.press("Home");
    await expect(first).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#evidence-panel-safeguarding")).toBeVisible();
    await page.getByRole("link", { name: "Discuss this review" }).click();
    assert(
      (await draft("Quality & compliance")).includes("safeguarding systems"),
    );
  });
  await test("Tender journey works on mobile and transfers the current stage", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await visit("procurement-and-contracts");
    await page.getByRole("tab", { name: /Mobilise/ }).click();
    await expect(page.locator("#tender-panel-mobilise")).toBeVisible();
    await page.getByRole("tab", { name: /Review/ }).click();
    await expect(page.locator("#tender-panel-review")).toBeVisible();
    await page.getByRole("link", { name: "Talk about this stage" }).click();
    assert(
      (await draft("Procurement / tendering")).includes(
        "draft tender response",
      ),
    );
  });
  await test("All twelve training topics filter and expand by keyboard without losing the planner", async () => {
    await visit("training-and-development");
    await expect(page.locator(".course-row:visible")).toHaveCount(12);
    await page.getByRole("button", { name: "Leadership", exact: true }).click();
    await expect(page.locator(".course-row:visible")).toHaveCount(3);
    await page.getByRole("button", { name: "Safety", exact: true }).click();
    await expect(page.locator(".course-row:visible")).toHaveCount(5);
    const summary = page
      .locator(".course-row")
      .filter({ hasText: "Professional boundaries" })
      .locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open", "");
    await page
      .locator(".course-row")
      .filter({ hasText: "Professional boundaries" })
      .getByRole("link", { name: "Discuss this topic" })
      .click();
    assert((await draft("Training")).includes("Professional boundaries"));
    await visit("training-and-development");
    await page
      .getByRole("link", { name: "Combine topics into a tailored plan" })
      .click();
    await expect(page.locator("#training-planner h2")).toBeInViewport();
  });
  await test("Assessment purpose updates the outline and the editable enquiry draft", async () => {
    await visit("independent-assessments");
    await page.getByRole("button", { name: /A professional report/ }).click();
    await expect(page.locator(".report-folio h4")).toHaveText(
      "Clear reasoning. A useful report.",
    );
    await expect(page.locator(".report-folio li")).toHaveCount(4);
    await page.getByRole("link", { name: "Discuss the scope" }).click();
    assert(
      (await draft("Independent assessment")).includes("professional report"),
    );
  });
  await test("Family questions work with the keyboard and the correct audience is preselected", async () => {
    await visit("family-support");
    const summary = page
      .locator(".concern-accordion summary")
      .filter({ hasText: "funding or aftercare" });
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open", "");
    await expect(
      page.getByRole("link", { name: "999", exact: true }),
    ).toHaveAttribute("href", "tel:999");
    await expect(
      page.getByRole("link", { name: "NHS 111", exact: true }),
    ).toHaveAttribute("href", "tel:111");
    await page
      .getByRole("link", { name: "Talk to someone who understands" })
      .click();
    await expect(
      page.getByLabel("Family member / relative", { exact: true }),
    ).toBeChecked();
    await expect(page.locator("#interest")).toHaveValue("Family support");
  });
  await test("Unknown or repeated review, tender and report choices never become form content", async () => {
    for (const query of [
      "service=quality-and-compliance&area=unknown",
      "service=procurement-and-contracts&stage=write&stage=review",
      "service=independent-assessments&purpose=untrusted",
    ]) {
      await page.goto(base + "/contact?" + query, { waitUntil: "networkidle" });
      await page.getByLabel("Care provider", { exact: true }).check();
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await expect(page.locator("#message")).toHaveValue("");
    }
  });
  await test("Every service page passes automated WCAG A/AA checks on mobile and desktop", async () => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const slug of slugs) {
        await visit(slug);
        if (slug === "quality-and-compliance")
          await page.getByRole("tab", { name: /Governance/ }).click();
        if (slug === "procurement-and-contracts")
          await page.getByRole("tab", { name: /Review/ }).click();
        if (slug === "training-and-development") {
          await page
            .getByRole("button", { name: "Safety", exact: true })
            .click();
          await page
            .locator(".course-row")
            .filter({ hasText: "Mental Capacity Act" })
            .locator("summary")
            .click();
        }
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        assert.deepEqual(
          result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
          [],
          `${slug} at ${width}px`,
        );
      }
    }
  });
  await test("Service interactions leave browser storage and cookies empty", async () => {
    assert.equal((await context.cookies()).length, 0);
    assert.deepEqual(
      await page.evaluate(() => ({
        local: localStorage.length,
        session: sessionStorage.length,
      })),
      { local: 0, session: 0 },
    );
  });
} finally {
  await fs.mkdir("test-results", { recursive: true });
  await fs.writeFile(
    "test-results/practice-report.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  await browser.close();
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`All ${results.length} practice-page checks passed.`);
