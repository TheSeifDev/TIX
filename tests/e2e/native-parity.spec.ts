import { expect, test } from '@playwright/test';

const routes = ['/', '/ar/', '/pages/about.html', '/pages/services.html', '/pages/work.html', '/pages/contact.html'];

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

  test('portfolio lightbox opens and supports keyboard close', async ({ page }) => {
    await page.goto('/pages/work.html', { waitUntil: 'networkidle' });
    await page.locator('.wg-card').first().click();
    await expect(page.locator('.tix-portfolio-lightbox')).toBeVisible();
    await expect(page.locator('.tix-portfolio-lightbox__image')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.tix-portfolio-lightbox')).toBeHidden();
  });
});
