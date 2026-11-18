import { expect, test } from '@playwright/test';

test('Home remains usable after repeated navigation and scrolling', async ({ page }) => {
  await page.addInitScript(() => {
    (window as Window & { __longTasks?: number[] }).__longTasks = [];
    if ('PerformanceObserver' in window) {
      new PerformanceObserver((list) => {
        const target = window as Window & { __longTasks?: number[] };
        target.__longTasks?.push(...list.getEntries().map((entry) => entry.duration));
      }).observe({ type: 'longtask', buffered: true });
    }
  });

  for (let cycle = 0; cycle < 2; cycle += 1) {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.locator('[data-disrupt-pin]').scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 1800);
    await page.waitForTimeout(250);
    await page.mouse.wheel(0, -1800);
    await page.goto('/about', { waitUntil: 'networkidle' });
    await page.goto('/', { waitUntil: 'networkidle' });
  }

  await expect(page.locator('[data-disrupt-pin]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth));
  expect(await page.locator('.pin-spacer').count()).toBeLessThanOrEqual(2);
  const longTasks = await page.evaluate(() => (window as Window & { __longTasks?: number[] }).__longTasks ?? []);
  console.log(`longTasks=${JSON.stringify(longTasks)}`);
});
