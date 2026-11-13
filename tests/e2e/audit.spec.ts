import { expect, test } from '@playwright/test';

const publicRoutes = [
  ['/', 'en', 'ltr'], ['/ar', 'ar', 'rtl'],
  ['/about', 'en', 'ltr'], ['/ar/about', 'ar', 'rtl'],
  ['/services', 'en', 'ltr'], ['/ar/services', 'ar', 'rtl'],
  ['/work', 'en', 'ltr'], ['/ar/work', 'ar', 'rtl'],
  ['/contact', 'en', 'ltr'], ['/ar/contact', 'ar', 'rtl'],
] as const;

const legalRoutes = [
  ['/terms-and-conditions', 'en', 'ltr', 'Terms & Conditions', 11],
  ['/ar/terms-and-conditions', 'ar', 'rtl', 'الشروط والأحكام', 11],
  ['/privacy-policy', 'en', 'ltr', 'Privacy Policy', 12],
  ['/ar/privacy-policy', 'ar', 'rtl', 'سياسة الخصوصية', 12],
] as const;

test.describe('production hardening smoke checks', () => {
  for (const [route, locale, direction] of publicRoutes) {
    test(`${route} exposes localized metadata and stays within the viewport`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('img[src$=".png"], img[src*=".png?"]')).toHaveCount(0);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', direction);
      await expect(page.locator('#main-nav')).toContainText(locale === 'ar' ? 'الخدمات' : 'Services');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth));
    });
  }

  for (const [english, arabic] of [['/', '/ar'], ['/about', '/ar/about'], ['/services', '/ar/services'], ['/work', '/ar/work'], ['/contact', '/ar/contact']] as const) {
    test(`language switch preserves ${english}`, async ({ page }) => {
      await page.goto(english, { waitUntil: 'networkidle' });
      await page.locator('#main-nav a[hreflang="ar"]').click();
      await expect(page).toHaveURL(new RegExp(`${arabic.replace('/', '\\/')}$`));
      await page.locator('#main-nav a[hreflang="en"]').click();
      await expect(page).toHaveURL(new RegExp(`${english === '/' ? '' : english.replace('/', '\\/')}$`));
    });
  }

  for (const [route, locale, direction, heading, sectionCount] of legalRoutes) {
    test(`${route} renders localized legal content`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', direction);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('main h1')).toHaveText(heading);
      await expect(page.locator('main article > section')).toHaveCount(sectionCount);
      await expect(page.locator('footer a[href="#"]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth));
    });
  }

  for (const [english, arabic] of [['/terms-and-conditions', '/ar/terms-and-conditions'], ['/privacy-policy', '/ar/privacy-policy']] as const) {
    test(`legal page language switching preserves ${english}`, async ({ page }) => {
      await page.goto(english, { waitUntil: 'networkidle' });
      await page.locator('#main-nav a[hreflang="ar"]').click();
      await expect(page).toHaveURL(new RegExp(`${arabic.replaceAll('/', '\\/')}$`));
      await page.waitForLoadState('networkidle');
      await page.locator('#main-nav a[hreflang="en"]').click();
      await expect(page).toHaveURL(new RegExp(`${english.replaceAll('/', '\\/')}$`));
      await page.waitForLoadState('networkidle');
    });
  }

  for (const route of ['/', '/work', '/contact', '/ar', '/ar/work', '/ar/contact']) {
    test(`${route} exposes working legal footer destinations`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const legalFooter = page.locator('.tix-footer, [data-contact-footer]');
      await expect(legalFooter.locator('a').filter({ hasText: /Support|الدعم/ }).first()).toHaveAttribute('href', /contact/);
      await expect(legalFooter.locator('a').filter({ hasText: /Terms|الشروط/ }).first()).toHaveAttribute('href', /terms-and-conditions/);
      await expect(legalFooter.locator('a').filter({ hasText: /Privacy|الخصوصية/ }).first()).toHaveAttribute('href', /privacy-policy/);
      await expect(legalFooter.locator('a[href="#"]')).toHaveCount(0);
    });
  }

  test('Arabic pages do not expose known English prose', async ({ page }) => {
    const leakagePhrases = [
      'We position your brand',
      'REAL ESTATE & CORPORATES',
      '© Copyright 2026, All Rights Reserved FOR TIX',
      'Terms & Conditions',
      'Information collected through the website',
      'Introduction and acceptance',
    ];

    for (const route of ['/ar', '/ar/about', '/ar/services', '/ar/work', '/ar/contact']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const bodyText = await page.locator('body').innerText();
      for (const phrase of leakagePhrases) {
        expect(bodyText, `${route} leaked: ${phrase}`).not.toContain(phrase);
      }
    }
  });
});
