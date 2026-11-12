import { expect, test } from '@playwright/test';

const routes = ['/', '/ar', '/about', '/services', '/work', '/contact'];
const legacyRoutes = ['/pages/about.html', '/pages/services.html', '/pages/work.html', '/pages/contact.html'];

test.describe('native route parity', () => {
  for (const route of routes) {
    test(`${route} renders native layout without legacy injector`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      await expect(page.locator('#main-nav')).toBeVisible();
      await expect(page.locator('main')).toHaveCount(1);
      expect(await page.locator('script').evaluateAll(scripts => scripts.filter(script => script.src.includes('/js/')).length)).toBe(0);
      expect(errors).toEqual([]);
    });
  }

  test('mobile navigation opens and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.locator('.nav__burger').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });

  for (const route of legacyRoutes) {
    test(`${route} redirects to the clean route`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      expect(new URL(page.url()).pathname).not.toBe(route);
      await expect(page.locator('#main-nav')).toBeVisible();
    });
  }

  test('work gallery expands width without changing height', async ({ page }) => {
    await page.goto('/pages/work.html', { waitUntil: 'networkidle' });
    const card = page.locator('[data-strip] .wg-card').first();
    const before = await card.boundingBox();
    await card.hover();
    await page.waitForTimeout(650);
    const expanded = await card.boundingBox();
    expect(expanded?.width).toBeGreaterThan((before?.width ?? 0) * 1.2);
    expect(Math.abs((expanded?.height ?? 0) - (before?.height ?? 0))).toBeLessThan(3);
    await page.mouse.move(10, 10);
    await page.waitForTimeout(650);
    const restored = await card.boundingBox();
    expect(restored?.width).toBeLessThan((expanded?.width ?? Infinity) * 0.85);
  });

  test('services reconstructs chevron and phone scroll motion', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await expect(page.locator('#svchero-stage')).toHaveClass(/is-open/);
    await page.locator('#creativity-calls').scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(page.locator('#creativity-calls')).toHaveClass(/is-visible/);
    await expect(page.locator('.svc-calls__phone-stage')).toHaveClass(/is-visible/);
  });
});
