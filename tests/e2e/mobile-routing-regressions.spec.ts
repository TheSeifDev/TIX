import { expect, test } from '@playwright/test';

const englishRoutes = ['/', '/about', '/services', '/work', '/contact'];

test.describe('mobile and locale regressions', () => {
  test('default-locale English routes render without redirect loops', async ({ page }) => {
    for (const route of englishRoutes) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} should render directly`).toBe(200);
      expect(new URL(page.url()).pathname).toBe(route);
      await expect(page.locator('main')).toHaveCount(1);
    }
  });

  test('English routes remain stable when the default-locale cookie is present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.context().addCookies([{ name: 'NEXT_LOCALE', value: 'en', url: new URL(page.url()).origin }]);

    const response = await page.goto('/work', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe('/work');
    await expect(page.locator('.work-gallery')).toBeVisible();
  });

  test('mobile menu keeps a clear three-line hamburger without a background or border', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const burger = page.locator('.nav__burger');
    const menu = page.locator('#mobile-menu');
    const iconPath = burger.locator('svg path');
    await expect(burger).toBeVisible();
    await expect(iconPath).toHaveAttribute('d', /M4 6\.5h16M4 12h16M4 17\.5h16/);
    const buttonStyle = await burger.evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, borderWidth: style.borderTopWidth, boxShadow: style.boxShadow };
    });
    expect(buttonStyle.background).toBe('rgba(0, 0, 0, 0)');
    expect(buttonStyle.borderWidth).toBe('0px');
    expect(buttonStyle.boxShadow).toBe('none');

    await burger.click();
    await expect(menu).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(iconPath).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
  });

  test('mobile category image strips do not collapse after the pointer leaves', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    for (const category of ['jewelry', 'realestate']) {
      const strip = page.locator(`.wg-cat[data-category="${category}"] [data-strip]`);
      const firstCard = strip.locator('.wg-card').first();
      await strip.scrollIntoViewIfNeeded();
      await firstCard.hover();
      await page.mouse.move(5, 5);
      await expect.poll(() => firstCard.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(100);
      await expect(firstCard.locator('.wg-card__media img')).toBeVisible();
    }
  });

  test('mobile Work accordions toggle independently instead of closing together', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    const fashion = page.locator('.wg-cat[data-category="fashion"]');
    const jewelry = page.locator('.wg-cat[data-category="jewelry"]');
    const fashionToggle = fashion.locator('.wg-arrow--second');
    const jewelryToggle = jewelry.locator('.wg-arrow--second');
    const fashionPanel = fashion.locator('.wg-panel');
    const jewelryPanel = jewelry.locator('.wg-panel');

    await expect(fashionToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(jewelryToggle).toHaveAttribute('aria-expanded', 'true');
    await fashionToggle.click();
    await expect(fashionToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(fashionPanel).toBeHidden();
    await expect(jewelryPanel).toBeVisible();

    await jewelryToggle.click();
    await expect(jewelryToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(jewelryPanel).toBeHidden();
    await expect(fashionPanel).toBeHidden();

    await fashionToggle.click();
    await expect(fashionToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(fashionPanel).toBeVisible();
    await expect(jewelryPanel).toBeHidden();

    await fashionToggle.click();
    await page.locator('#work-filter-btn').click();
    await page.locator('#work-filter-menu [data-jump="jewelry"]').click();
    await expect(jewelryToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(jewelryPanel).toBeVisible();
  });

  test('mobile services phone entrance does not use the long spring-bounce animation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    const calls = page.locator('#creativity-calls');
    const phone = page.locator('.svc-calls__phone-wrapper');

    await calls.scrollIntoViewIfNeeded();
    await expect(calls).toHaveClass(/is-visible/);
    await expect.poll(() => phone.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    await expect(phone).toBeVisible();
  });
});
