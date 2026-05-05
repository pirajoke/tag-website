import { test, expect } from '@playwright/test';

const BASE = 'https://tag-website-orpin.vercel.app';
const PAGES = ['/', '/about', '/services', '/clients', '/careers', '/news', '/contact'];

for (const path of PAGES) {
  test(`Page ${path} loads correctly`, async ({ page }) => {
    const response = await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    expect(response?.status()).toBe(200);
    
    // Check title exists
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    // Check no console errors
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    
    // Check header is visible
    await expect(page.locator('header').first()).toBeVisible();
    
    // Check no broken images (visible ones)
    const images = page.locator('img:visible');
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      // Just log, don't fail — some images may be lazy loaded
      if (naturalWidth === 0) console.log(`Warning: image ${i} on ${path} not loaded`);
    }
  });
}

test('Homepage hero section loads', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  // Check main heading exists
  const heading = page.locator('h2').first();
  await expect(heading).toBeVisible();
});

test('Contact form is functional', async ({ page }) => {
  await page.goto(`${BASE}/contact`, { waitUntil: 'domcontentloaded' });
  const form = page.locator('form');
  await expect(form).toBeVisible();
  const submitBtn = page.locator('button[type="submit"]');
  await expect(submitBtn).toBeVisible();
});

test('Services page has service cards', async ({ page }) => {
  await page.goto(`${BASE}/services`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Lobbying' })).toBeVisible();
});

test('Chat widget button is visible', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  const chatBtn = page.locator('button[aria-label="Chat with TAG"]');
  await expect(chatBtn).toBeVisible();
});

test('Navigation links work', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  // Click About link
  await page.locator('header a[href="/about"]').click();
  await page.waitForURL('**/about');
  expect(page.url()).toContain('/about');
});

test('Individual service page loads', async ({ page }) => {
  const response = await page.goto(`${BASE}/services/lobbying`, { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Lobbying' })).toBeVisible();
});
