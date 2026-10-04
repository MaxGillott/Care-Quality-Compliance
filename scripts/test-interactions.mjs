import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];
const errors = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
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
async function stage(progress) {
  await page.locator(".care-journey").evaluate(
    (e, p) =>
      window.scrollTo({
        top:
          e.getBoundingClientRect().top +
          scrollY +
          (e.offsetHeight - innerHeight) * p,
        behavior: "instant",
      }),
    progress,
  );
}
try {
  await test("The film plays locally, pauses offscreen and preserves manual pause", async () => {
    await page.goto(base, { waitUntil: "networkidle" });
    await expect(
      page.getByRole("button", { name: "Pause film" }),
    ).toBeVisible();
    assert.equal(await page.locator("video").evaluate((e) => e.muted), true);
    await stage(0.1);
    await expect
      .poll(() => page.locator("video").evaluate((e) => e.paused))
      .toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(
      page.getByRole("button", { name: "Pause film" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Pause film" }).click();
    await stage(0.1);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.getByRole("button", { name: "Play film" })).toBeVisible();
  });
  await test("Scroll scrubs the route continuously and reverses the care stages", async () => {
    await expect(page.locator(".care-journey")).toHaveAttribute(
      "data-scrub",
      "true",
    );
    await stage(0.15);
    await expect(page.locator("#journey-stage-0")).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator(".route-draw")
          .evaluate((e) => parseFloat(getComputedStyle(e).strokeDashoffset)),
      )
      .toBeGreaterThan(0.7);
    await expect
      .poll(() =>
        page
          .locator(".route-draw")
          .evaluate((e) => parseFloat(getComputedStyle(e).strokeDashoffset)),
      )
      .toBeLessThan(0.99);
    for (const [p, i] of [
      [0.4, 1],
      [0.65, 2],
      [0.9, 3],
      [0.15, 0],
    ]) {
      await stage(p);
      await expect(page.locator(`#journey-stage-${i}`)).toBeVisible();
      assert.equal(
        await page.locator(".journey-story article:visible").count(),
        1,
      );
    }
    await page.getByRole("button", { name: "03 Plan", exact: true }).click();
    await expect(page.locator("#journey-stage-2")).toBeVisible();
    await page.locator(".journey-skip").click();
    await expect(page.locator("#find-support h2")).toBeInViewport();
  });
  await test("Consultancy choices reach an editable enquiry draft", async () => {
    await page
      .getByRole("button", { name: "I want to improve everyday quality" })
      .click();
    await expect(page.locator(".finder-result h4")).toHaveText(
      "Make good practice part of every day.",
    );
    await page.getByRole("link", { name: "Talk through this with us" }).click();
    await page.waitForURL("**/contact?**");
    await expect(page.locator("#interest")).toHaveValue("Consultancy");
    await page.getByLabel("Care provider", { exact: true }).check();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    assert(
      (await page.locator("#message").inputValue()).includes(
        "improving everyday quality",
      ),
    );
    await page
      .locator("#message")
      .fill("An editable outline for our particular service.");
  });
  await test("Training plan caps choices at four, allows removal and carries priorities to enquiry", async () => {
    await page.goto(base + "/services/training-and-development", {
      waitUntil: "networkidle",
    });
    await page.getByLabel("Who is the training for?").selectOption("Managers");
    const priorities = page.getByRole("group", { name: "Training priorities" });
    for (const name of [
      "Safeguarding",
      "Mental Capacity Act",
      "Record keeping",
      "Risk assessment",
    ])
      await priorities.getByRole("button", { name, exact: true }).click();
    await expect(
      priorities.getByRole("button", {
        name: "Effective communication",
        exact: true,
      }),
    ).toBeDisabled();
    await expect(page.locator(".selected-topics li")).toHaveCount(4);
    await page.getByRole("button", { name: "Remove Risk assessment" }).click();
    await priorities
      .getByRole("button", { name: "Effective communication", exact: true })
      .click();
    await page
      .getByRole("link", { name: "Discuss this training plan" })
      .click();
    await page.waitForURL("**/contact?**");
    await expect(page.locator("#interest")).toHaveValue("Training");
    await page.getByLabel("Care provider", { exact: true }).check();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    const message = await page.locator("#message").inputValue();
    for (const text of [
      "managers",
      "Safeguarding",
      "Mental Capacity Act",
      "Record keeping",
      "Effective communication",
    ])
      assert(message.includes(text), text);
    assert(!message.includes("Risk assessment"));
  });
  await test("Mobile tools work without a pinned scroll section or horizontal overflow", async () => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(
      await page.locator(".journey-story article:visible").count(),
      4,
    );
    assert.equal(
      await page.locator(".care-journey").getAttribute("data-scrub"),
      null,
    );
    await page.getByRole("button", { name: "02 Develop my team" }).click();
    await page
      .getByRole("group", { name: "Training priorities" })
      .getByRole("button", { name: "Safeguarding", exact: true })
      .click();
    await expect(page.locator(".selected-topics li")).toHaveCount(1);
    await page
      .getByRole("button", { name: "01 Strengthen my service" })
      .click();
    await page.getByRole("button", { name: "02 Develop my team" }).click();
    await expect(page.locator(".selected-topics li")).toHaveCount(1);
    await page
      .getByRole("button", { name: "Clear selection", exact: true })
      .click();
    await expect(page.locator(".selected-topics li")).toHaveCount(0);
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
  });
  await test("Reduced motion and data saving use a static poster without downloading film", async () => {
    const reduced = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
    });
    const p = await reduced.newPage();
    const mediaRequests = [];
    p.on("request", (r) => {
      if (r.url().endsWith(".mp4")) mediaRequests.push(r.url());
    });
    await p.goto(base, { waitUntil: "networkidle" });
    assert.equal(await p.locator("video").getAttribute("src"), null);
    assert.equal(mediaRequests.length, 0);
    assert.equal(await p.locator(".journey-story article:visible").count(), 4);
    assert.equal(
      await p.locator(".care-journey").getAttribute("data-scrub"),
      null,
    );
    await reduced.close();
    const saving = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    await saving.addInitScript(() =>
      Object.defineProperty(navigator, "connection", {
        value: { saveData: true },
        configurable: true,
      }),
    );
    const q = await saving.newPage();
    await q.goto(base, { waitUntil: "networkidle" });
    assert.equal(await q.locator("video").getAttribute("src"), null);
    await saving.close();
  });
  await test("Unknown and repeated query parameters do not become enquiry content", async () => {
    for (const query of [
      "service=training-and-development&topics=unknown&team=untrusted",
      "service=training-and-development&topics=safeguarding&topics=records",
      "service=care-provider-consultancy&focus=untrusted",
    ]) {
      const response = await page.goto(base + "/contact?" + query, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200);
      await page.getByLabel("Care provider", { exact: true }).check();
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      assert.equal(await page.locator("#message").inputValue(), "");
    }
  });
  await test("Core information and links remain available without JavaScript", async () => {
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const p = await nojs.newPage();
    await p.goto(base);
    assert.equal(await p.locator(".journey-story article:visible").count(), 4);
    await expect(
      p.getByRole("link", { name: "Let’s talk about your service" }),
    ).toBeVisible();
    assert.equal(await p.locator("video").getAttribute("src"), null);
    await nojs.close();
  });
  await test("Animated desktop and interactive mobile training states pass automated accessibility checks", async () => {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base, { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "02 Develop my team" }).click();
      await page
        .getByRole("group", { name: "Training priorities" })
        .getByRole("button", { name: "Mental Capacity Act", exact: true })
        .click();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      assert.deepEqual(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            message: n.failureSummary,
          })),
        })),
        [],
        `${width}px`,
      );
    }
  });
} finally {
  await fs.mkdir("test-results", { recursive: true });
  await fs.writeFile(
    "test-results/interaction-report.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  await browser.close();
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`All ${results.length} interaction checks passed.`);
