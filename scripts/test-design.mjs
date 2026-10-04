import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
const page = await context.newPage();
const errors = [];
const results = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
async function test(name, fn) {
  try {
    await fn();
    results.push({ name, passed: true });
    console.log("PASS " + name);
  } catch (e) {
    errors.push(name + ": " + e.message);
    results.push({ name, passed: false, error: e.message });
    console.log("FAIL " + name + ": " + e.message);
  }
}
try {
  await test("Practice index responds to pointer and keyboard focus and opens the real service page", async () => {
    await page.goto(base + "/services", { waitUntil: "networkidle" });
    const links = page.locator("a[data-active]");
    await expect(links).toHaveCount(6);
    await links.nth(3).hover();
    await expect(page.locator("[data-practice]")).toHaveAttribute(
      "data-practice",
      "3",
    );
    await links.nth(4).focus();
    await expect(page.locator("[data-practice]")).toHaveAttribute(
      "data-practice",
      "4",
    );
    await page.keyboard.press("Enter");
    await page.waitForURL("**/services/independent-assessments");
    await expect(page.locator("h1")).toContainText("A fresh perspective.");
  });
  await test("The folio follows native scrolling and reduced motion makes it static", async () => {
    await page.goto(base, { waitUntil: "networkidle" });
    const folio = page.locator("[data-practice]");
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    const before = await folio.evaluate((e) => getComputedStyle(e).transform);
    await page.locator("#services").scrollIntoViewIfNeeded();
    await expect
      .poll(() => folio.evaluate((e) => getComputedStyle(e).transform))
      .not.toBe(before);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(() => folio.evaluate((e) => getComputedStyle(e).transform))
      .toBe("none");
    await expect
      .poll(() =>
        folio
          .locator(".art-accent")
          .first()
          .evaluate((e) => getComputedStyle(e).animationName),
      )
      .toBe("none");
    await page.emulateMedia({ reducedMotion: "no-preference" });
  });
  await test("Text-led actions use the reading typeface, retain focus and never fade on hover", async () => {
    await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(
      await page.locator(".lucide-arrow-up-right,.button-mark").count(),
      0,
    );
    const cta = page.locator(".hero-action");
    await cta.hover();
    assert.equal(await cta.evaluate((e) => getComputedStyle(e).opacity), "1");
    const fonts = await cta.evaluate((e) => [
      getComputedStyle(e).fontFamily,
      getComputedStyle(document.body).fontFamily,
    ]);
    assert.equal(fonts[0], fonts[1]);
    await page.keyboard.press("Tab");
    await cta.focus();
    assert.equal(
      await cta.evaluate((e) => getComputedStyle(e).outlineStyle),
      "solid",
    );
    assert(
      await cta.evaluate(
        (e) => parseFloat(getComputedStyle(e).outlineWidth) >= 3,
      ),
    );
  });
  await test("The complete service index remains usable on small screens and without JavaScript", async () => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(base + "/services", { waitUntil: "networkidle" });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await expect(page.locator("a[data-active]")).toHaveCount(6);
    await page.locator("a[data-active]").last().click();
    await page.waitForURL("**/services/family-support");
    const plain = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const fallback = await plain.newPage();
    await fallback.goto(base + "/services", { waitUntil: "networkidle" });
    await expect(fallback.locator("a[data-active]")).toHaveCount(6);
    await fallback.locator("a[data-active]").first().click();
    await fallback.waitForURL("**/services/care-provider-consultancy");
    await plain.close();
  });
  await test("The revised pages make no third-party font, media or tracking requests", async () => {
    const clean = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const p = await clean.newPage();
    const external = [];
    p.on("request", (req) => {
      const u = new URL(req.url());
      if (u.protocol.startsWith("http") && u.origin !== new URL(base).origin)
        external.push(req.url());
    });
    await p.goto(base, { waitUntil: "networkidle" });
    await p.locator("#services").scrollIntoViewIfNeeded();
    await p.locator("a[data-active]").nth(3).click();
    await p.waitForLoadState("networkidle");
    assert.deepEqual(external, []);
    await clean.close();
  });
  await test("Mobile loads one responsive poster, one font and the smaller film; motion adapts after resizing", async () => {
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "no-preference",
    });
    const p = await mobile.newPage();
    const requests = [];
    p.on("request", (request) => requests.push(new URL(request.url())));
    await p.goto(base, { waitUntil: "networkidle" });
    await expect(
      p.getByRole("button", { name: "Pause film", exact: true }),
    ).toBeVisible();
    const films = requests.filter((u) => u.pathname.endsWith(".mp4"));
    assert(films.length > 0);
    assert(films.every((u) => u.pathname === "/video/quiet-moment-mobile.mp4"));
    assert.equal(
      requests.filter((u) => u.pathname === "/images/quiet-moment-poster.jpg")
        .length,
      0,
    );
    assert.equal(
      requests.filter(
        (u) =>
          u.pathname === "/_next/image" &&
          u.searchParams.get("url") === "/images/quiet-moment-poster.jpg",
      ).length,
      1,
    );
    assert.equal(
      new Set(
        requests
          .filter((u) => u.pathname.endsWith(".woff2"))
          .map((u) => u.pathname),
      ).size,
      1,
    );
    assert.equal(
      await p.locator(".care-journey").getAttribute("data-scrub"),
      null,
    );
    await p.setViewportSize({ width: 1440, height: 1000 });
    await expect(p.locator(".care-journey")).toHaveAttribute(
      "data-scrub",
      "true",
    );
    await p.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(() => p.locator(".care-journey").getAttribute("data-scrub"))
      .toBe(null);
    await expect
      .poll(() => p.locator("video").evaluate((el) => el.paused))
      .toBe(true);
    await mobile.close();
  });
} finally {
  await fs.mkdir("test-results", { recursive: true });
  await fs.writeFile(
    "test-results/design-report.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  await browser.close();
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`All ${results.length} design checks passed.`);
