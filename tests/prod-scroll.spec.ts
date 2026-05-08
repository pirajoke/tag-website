import { expect, test } from "@playwright/test";

const BASE = "https://tag-website-orpin.vercel.app";

test("homepage hero scroll reaches clients without console errors", async ({ page }) => {
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

  for (let y = 0; y <= 1800; y += 120) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(25);
  }

  await expect(
    page.getByRole("heading", { name: "Our Clients", exact: true }),
  ).toBeVisible({ timeout: 10000 });
  expect(errors).toEqual([]);
});
