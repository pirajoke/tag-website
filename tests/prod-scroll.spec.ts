import { expect, test } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "https://tag-website-orpin.vercel.app";

test("homepage hero scroll reaches clients marquee without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  const response = await page.goto(BASE, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  expect(response?.status()).toBe(200);
  await expect(page.locator("header").first()).toBeVisible();

  for (let i = 0; i < 18; i += 1) {
    await page.mouse.wheel(0, 140);
    await page.waitForTimeout(40);
  }

  await expect(page.getByText("Trusted By Leaders")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText("NY Communities for Change").first()).toBeVisible();
  expect(errors).toEqual([]);
});
