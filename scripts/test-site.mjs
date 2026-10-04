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
const failures = [];
const results = [];
page.on("pageerror", (error) => failures.push(`Browser: ${error.message}`));
const paths = [
  "/",
  "/about",
  "/services",
  "/services/care-provider-consultancy",
  "/services/quality-and-compliance",
  "/services/procurement-and-contracts",
  "/services/training-and-development",
  "/services/independent-assessments",
  "/services/family-support",
  "/contact",
  "/privacy",
  "/accessibility",
  "/terms",
];
async function test(name, fn) {
  try {
    await fn();
    results.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    results.push({ name, passed: false, error: error.message });
    console.log(`FAIL ${name}: ${error.message}`);
  }
}
try {
  await test("All 13 pages render with unique titles and one H1", async () => {
    const titles = new Set();
    for (const path of paths) {
      const response = await page.goto(base + path, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, path);
      assert.equal(await page.locator("h1").count(), 1, path);
      const title = await page.title();
      assert(title.includes("Care Quality Compliance"), title);
      assert(!titles.has(title), "Duplicate title " + title);
      titles.add(title);
      assert(
        (await page.locator('meta[name="description"]').getAttribute("content"))
          .length > 60,
      );
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0))
          .toBe(true);
      }
    }
  });
  await test("No horizontal overflow at 360, 390, 768, 1024 and 1440 pixels", async () => {
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of [
        "/",
        "/services/care-provider-consultancy",
        "/contact",
      ]) {
        await page.goto(base + path, { waitUntil: "networkidle" });
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${path} at ${width}px`,
        );
      }
    }
  });
  await test("Desktop dropdown navigation and Escape dismissal", async () => {
    await page.goto(base);
    const button = page.getByRole("button", { name: "How we can help" });
    await button.click();
    await page.locator("#services-menu").waitFor();
    assert.equal(await button.getAttribute("aria-expanded"), "true");
    await button.press("Escape");
    assert.equal(await button.getAttribute("aria-expanded"), "false");
    await button.click();
    await page
      .locator("#services-menu")
      .getByRole("link", { name: "Quality & Compliance", exact: true })
      .click();
    await page.waitForURL("**/services/quality-and-compliance");
  });
  await test("Mobile menu traps focus, closes on Escape and navigates", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base);
    const open = page.getByRole("button", { name: "Open navigation" });
    await open.click();
    await page.getByRole("dialog").waitFor();
    await page
      .getByRole("button", { name: "Close navigation" })
      .press("Shift+Tab");
    assert(
      await page
        .getByRole("dialog")
        .getByRole("link", { name: "Start a conversation" })
        .evaluate((el) => el === document.activeElement),
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert(await open.evaluate((el) => el === document.activeElement));
    await open.click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Family Support", exact: true })
      .click();
    await page.waitForURL("**/services/family-support");
    assert.equal(await page.getByRole("dialog").count(), 0);
  });
  await test("Form validates, preserves data on Back and handles failed delivery honestly", async () => {
    await page.goto(base + "/contact?service=training-and-development");
    assert.equal(await page.locator("#interest").inputValue(), "Training");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.locator(".form-alert").waitFor();
    await page.getByLabel("Care provider", { exact: true }).check();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.locator("#name").waitFor();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    assert.equal(
      await page.locator("#email").getAttribute("aria-invalid"),
      "true",
    );
    await page.locator("#name").fill("Test Care Manager");
    await page.locator("#email").fill("manager@example.com");
    await page
      .locator("#message")
      .fill(
        "We would like to discuss a tailored training programme for our care team.",
      );
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.locator("#consent").waitFor();
    await page.getByRole("button", { name: "Back", exact: true }).click();
    assert.equal(await page.locator("#name").inputValue(), "Test Care Manager");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByRole("button", { name: "Send your enquiry" }).click();
    assert(await page.locator("#consent-error").isVisible());
    await page.locator("#consent").check();
    await page.route("**/api/enquiry", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Not configured" }),
      }),
    );
    await page.getByRole("button", { name: "Send your enquiry" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "couldn’t send" })
      .waitFor();
    assert.equal(
      await page.getByText("Thank you for reaching out.").count(),
      0,
    );
    await page.unroute("**/api/enquiry");
  });
  await test("Successful delivery response clears the form and shows confirmation", async () => {
    await page.route("**/api/enquiry", async (route) => {
      const body = route.request().postDataJSON();
      assert.equal(body.interest, "Training");
      assert.equal(body.name, "Test Care Manager");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"ok":true}',
      });
    });
    await page.getByRole("button", { name: "Send your enquiry" }).click();
    await page
      .getByRole("heading", { name: "Thank you for reaching out." })
      .waitFor();
    assert.equal(await page.locator("#name").count(), 0);
    await page.unroute("**/api/enquiry");
  });
  await test("API rejects foreign origins, wrong content type and large bodies", async () => {
    assert.equal(
      (
        await context.request.post(base + "/api/enquiry", {
          headers: { Origin: "https://example.invalid" },
          data: {},
        })
      ).status(),
      403,
    );
    assert.equal(
      (
        await context.request.post(base + "/api/enquiry", {
          headers: { Origin: base, "Content-Type": "text/plain" },
          data: "bad",
        })
      ).status(),
      415,
    );
    assert.equal(
      (
        await context.request.post(base + "/api/enquiry", {
          headers: { Origin: base, "Content-Type": "application/json" },
          data: JSON.stringify({ message: "a".repeat(17000) }),
        })
      ).status(),
      413,
    );
  });
  await test(
    process.env.TEST_RATE_LIMIT_MODE === "unconfigured"
      ? "Production enquiries fail closed without delivery configuration"
      : "API validates fields and limits repeated submissions",
    async () => {
      const statuses = [];
      for (let i = 0; i < 6; i++) {
        statuses.push(
          (
            await context.request.post(base + "/api/enquiry", {
              headers: { Origin: base, "Content-Type": "application/json" },
              data: {},
            })
          ).status(),
        );
      }
      if (process.env.TEST_RATE_LIMIT_MODE === "unconfigured") {
        assert(
          statuses.every((status) => status === 503),
          "Unconfigured production enquiries must fail closed.",
        );
        return;
      }
      const limitedAt = statuses.indexOf(429);
      assert(
        limitedAt >= 0 && limitedAt <= 5,
        "Limiter must reject within six requests.",
      );
      assert(statuses.slice(0, limitedAt).every((status) => status === 422));
      assert(statuses.slice(limitedAt).every((status) => status === 429));
    },
  );
  await test("No browser cookies or persistent storage", async () => {
    await page.goto(base);
    assert.equal((await context.cookies()).length, 0);
    assert.deepEqual(
      await page.evaluate(() => ({
        local: localStorage.length,
        session: sessionStorage.length,
      })),
      { local: 0, session: 0 },
    );
  });
  await test("Security headers and unique script nonces", async () => {
    const first = await context.request.get(base);
    const second = await context.request.get(base);
    assert.equal(first.headers()["x-frame-options"], "DENY");
    assert.equal(first.headers()["x-content-type-options"], "nosniff");
    assert(
      first.headers()["content-security-policy"].includes("'strict-dynamic'"),
    );
    assert.notEqual(
      first.headers()["content-security-policy"],
      second.headers()["content-security-policy"],
    );
    assert(!first.headers()["set-cookie"]);
    const probe = await context.newPage();
    const devtools = await context.newCDPSession(probe);
    const cspIssues = [];
    devtools.on("Audits.issueAdded", ({ issue }) => {
      if (issue.code === "ContentSecurityPolicyIssue")
        cspIssues.push(issue.details);
    });
    await devtools.send("Audits.enable");
    await probe.goto(base + "/contact", { waitUntil: "networkidle" });
    assert.deepEqual(
      cspIssues,
      [],
      "The form must not attempt dynamic evaluation under CSP.",
    );
    await devtools.detach();
    await probe.close();
  });
  await test("WCAG A/AA automated checks on core layouts", async () => {
    const axeIssues = [];
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const path of [
        "/",
        "/contact",
        "/services/care-provider-consultancy",
        "/about",
      ]) {
        await page.goto(base + path, { waitUntil: "networkidle" });
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        if (result.violations.length)
          failures.push(
            `Axe ${path} at ${width}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })) })))}`,
          );
        if (result.violations.length)
          axeIssues.push(
            `${path} at ${width}: ${result.violations.map((v) => v.id).join(", ")}`,
          );
      }
    }
    assert.equal(axeIssues.length, 0, axeIssues.join("; "));
  });
  await test("Unknown pages return a useful 404", async () => {
    const response = await page.goto(base + "/missing-page");
    assert.equal(response.status(), 404);
    assert(
      await page
        .getByRole("heading", { name: "Let’s get you back on track." })
        .isVisible(),
    );
  });
} finally {
  await fs.mkdir("test-results", { recursive: true });
  await fs.writeFile(
    "test-results/site-report.json",
    JSON.stringify({ results, failures }, null, 2),
  );
  await browser.close();
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else console.log(`All ${results.length} checks passed.`);
