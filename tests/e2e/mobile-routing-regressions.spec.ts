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

  test('explicit /en locale routes render once without redirect loops', async ({ page }) => {
    for (const route of ['/en', '/en/work', '/en/services']) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} should render directly`).toBe(200);
      expect(new URL(page.url()).pathname).toBe(route);
      await expect(page.locator('main')).toHaveCount(1);
    }
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

  test('mobile Work photos use static full-width vertical rows', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    for (const category of ['realestate', 'events']) {
      const strip = page.locator(`.wg-cat[data-category="${category}"] [data-strip]`);
      const cards = strip.locator('.wg-card');
      await expect(cards).toHaveCount(5);
      await strip.scrollIntoViewIfNeeded();
      const layout = await strip.evaluate((element) => ({
        direction: getComputedStyle(element).flexDirection,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        bounds: element.getBoundingClientRect().toJSON(),
        cards: [...element.querySelectorAll<HTMLElement>('.wg-card')].map((card) => {
          const rect = card.getBoundingClientRect();
          const image = card.querySelector('img');
          return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            transitionDuration: getComputedStyle(card).transitionDuration,
            imageTransitionDuration: image ? getComputedStyle(image).transitionDuration : '',
            imageTransform: image ? getComputedStyle(image).transform : '',
          };
        }),
      }));
      expect(layout.direction).toBe('column');
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
      for (let index = 0; index < layout.cards.length; index += 1) {
        const card = layout.cards[index];
        expect(card.width).toBeGreaterThan(layout.bounds.width * 0.95);
        expect(card.left).toBeGreaterThanOrEqual(layout.bounds.left - 1);
        expect(card.right).toBeLessThanOrEqual(layout.bounds.right + 1);
        expect(card.transitionDuration).toBe('0s');
        expect(card.imageTransitionDuration).toBe('0s');
        expect(card.imageTransform).toBe('none');
        if (index > 0) expect(card.top).toBeGreaterThanOrEqual(layout.cards[index - 1].bottom);
      }

      const firstCard = cards.first();
      const firstImage = firstCard.locator('.wg-card__media img');
      await firstImage.scrollIntoViewIfNeeded();
      await expect(firstImage).toBeVisible();
      await expect.poll(() => firstImage.evaluate((image) => (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
      const widthBeforeHover = await firstCard.evaluate((element) => element.getBoundingClientRect().width);
      await firstCard.hover();
      await page.mouse.move(5, 5);
      await expect.poll(() => firstCard.evaluate((element) => element.getBoundingClientRect().width)).toBe(widthBeforeHover);
      await expect.poll(() => firstImage.evaluate((image) => getComputedStyle(image).transform)).toBe('none');
    }
  });

  test('mobile Work categories stack vertically with all panels open', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    const track = page.locator('[data-category-track]');
    const categories = page.locator('.wg-cat');
    await expect(categories).toHaveCount(6);
    const expectedCategoryKeys = ['realestate', 'events', 'food', 'beauty', 'jewelry', 'workgallery'];
    const expectedCategoryNames = ['REAL ESTATE & CORPORATES', 'EVENTS & CONCERTS', 'FOOD & BEVERAGE', 'PERFUME & BEAUTY', 'JEWELRY & LUXURY', 'WORK GALLERY'];
    expect(await categories.evaluateAll((items) => items.map((item) => item.getAttribute('data-category')))).toEqual(expectedCategoryKeys);
    await expect(track.locator('.wg-cat__name')).toHaveText(expectedCategoryNames);
    await expect(track).toHaveAttribute('tabindex', '0');
    for (const category of await categories.all()) {
      await expect(category.locator('.wg-panel')).toBeVisible();
      await expect(category.locator('.wg-panel')).not.toHaveAttribute('hidden');
      await expect(category.locator('.wg-arrow--second')).not.toHaveAttribute('aria-expanded');
    }
    const geometry = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      bounds: element.getBoundingClientRect().toJSON(),
      cards: [...element.querySelectorAll<HTMLElement>('.wg-cat')].map((card) => card.getBoundingClientRect().toJSON()),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    for (let index = 0; index < geometry.cards.length; index += 1) {
      const card = geometry.cards[index];
      expect(card.left).toBeGreaterThanOrEqual(geometry.bounds.left - 1);
      expect(card.right).toBeLessThanOrEqual(geometry.bounds.right + 1);
      if (index > 0) expect(card.top).toBeGreaterThanOrEqual(geometry.cards[index - 1].bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    await track.focus();
    await page.keyboard.press('ArrowDown');
    await expect(categories.nth(0).locator('.wg-arrow--second')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(categories.nth(1).locator('.wg-arrow--second')).toBeFocused();

    await categories.first().scrollIntoViewIfNeeded();
    const beforeNext = await page.evaluate(() => window.scrollY);
    await categories.first().locator('.wg-arrow--second').click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(beforeNext);
    await expect(categories.nth(1)).toBeInViewport();

    await page.locator('#work-filter-btn').click();
    await page.locator('#work-filter-menu [data-jump="realestate"]').click();
    await expect(page.locator('#work-filter-menu')).toBeHidden();
    await expect(page.locator('.wg-cat[data-category="realestate"] .wg-panel')).toBeVisible();
    await page.locator('#work-filter-btn').click();
    await page.locator('#work-filter-menu [data-jump="workgallery"]').click();
    await expect(page.locator('#work-filter-menu')).toBeHidden();
    await expect(page.locator('.wg-cat[data-category="workgallery"] .wg-panel')).toBeVisible();
    const workGalleryImages = page.locator('.wg-cat[data-category="workgallery"] .wg-card__media img');
    await expect(workGalleryImages).toHaveCount(5);
    for (const image of await workGalleryImages.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
  });

  test('desktop Work categories stack vertically without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });
    const track = page.locator('[data-category-track]');
    const categories = page.locator('.wg-cat');
    await expect(categories).toHaveCount(6);
    const expectedCategoryKeys = ['realestate', 'events', 'food', 'beauty', 'jewelry', 'workgallery'];
    const expectedCategoryNames = ['REAL ESTATE & CORPORATES', 'EVENTS & CONCERTS', 'FOOD & BEVERAGE', 'PERFUME & BEAUTY', 'JEWELRY & LUXURY', 'WORK GALLERY'];
    expect(await categories.evaluateAll((items) => items.map((item) => item.getAttribute('data-category')))).toEqual(expectedCategoryKeys);
    await expect(track.locator('.wg-cat__name')).toHaveText(expectedCategoryNames);
    for (const category of await categories.all()) {
      await expect(category.locator('.wg-panel')).toBeVisible();
      await expect(category.locator('.wg-panel')).not.toHaveAttribute('hidden');
      await expect(category.locator('.wg-arrow--second')).not.toHaveAttribute('aria-expanded');
    }
    const geometry = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      bounds: element.getBoundingClientRect().toJSON(),
      cards: [...element.querySelectorAll<HTMLElement>('.wg-cat')].map((card) => card.getBoundingClientRect().toJSON()),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    for (let index = 0; index < geometry.cards.length; index += 1) {
      const card = geometry.cards[index];
      expect(card.left).toBeGreaterThanOrEqual(geometry.bounds.left - 1);
      expect(card.right).toBeLessThanOrEqual(geometry.bounds.right + 1);
      if (index > 0) expect(card.top).toBeGreaterThanOrEqual(geometry.cards[index - 1].bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('Arabic Work rail presents the six requested categories in RTL order', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/ar/work', { waitUntil: 'domcontentloaded' });
    const track = page.locator('[data-category-track]');
    const categories = page.locator('.wg-cat');
    await expect(track).toHaveAttribute('dir', 'rtl');
    expect(await categories.evaluateAll((items) => items.map((item) => item.getAttribute('data-category')))).toEqual([
      'realestate', 'events', 'food', 'beauty', 'jewelry', 'workgallery',
    ]);
    await expect(track.locator('.wg-cat__name')).toHaveText([
      'العقارات والشركات', 'الفعاليات والحفلات', 'الطعام والمشروبات', 'العطور والجمال', 'المجوهرات والفخامة', 'معرض الأعمال',
    ]);
    for (const category of await categories.all()) await expect(category.locator('.wg-panel')).toBeVisible();
    const geometry = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      cards: [...element.querySelectorAll<HTMLElement>('.wg-cat')].map((card) => card.getBoundingClientRect().toJSON()),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    for (let index = 1; index < geometry.cards.length; index += 1) {
      expect(geometry.cards[index].top).toBeGreaterThanOrEqual(geometry.cards[index - 1].bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('mobile Disrupt keeps the girl and copy inside the frame and reveals four service cards', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const [route, expectedTitles] of [
      ['/', ['Strategy', 'Media Production', 'Marketing', 'Digital Presence']],
      ['/ar', ['الاستراتيجية', 'الإنتاج المرئي', 'التسويق', 'الحضور الرقمي']],
    ] as const) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const section = page.locator('.disrupt');
      const sticky = section.locator('.disrupt__sticky');
      const girl = section.locator('.disrupt__girl');
      const title = section.locator('.disrupt__tagline');
      const outro = section.locator('[data-disrupt-outro]');
      await expect(girl).toBeVisible();
      await expect(title).toBeVisible();
      await expect(sticky).not.toHaveClass(/is-outro/);
      const framing = await section.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const within = (selector: string) => {
          const rect = element.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
          return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1
            && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
        };
        return { girlInside: within('.disrupt__girl'), titleInside: within('.disrupt__tagline') };
      });
      expect(framing.girlInside).toBe(true);
      expect(framing.titleInside).toBe(true);
      await outro.scrollIntoViewIfNeeded();
      await expect(sticky).toHaveClass(/is-outro/);
      await expect(outro).toHaveCSS('opacity', '1');
      expect(await outro.locator('.disrupt__tile-title').allTextContents()).toEqual(expectedTitles);
      await expect(outro.locator('.disrupt__tile-img')).toHaveCount(4);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  test('mobile services phone entrance does not use the long spring-bounce animation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['/services', '/ar/services']) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('dir', route.startsWith('/ar/') ? 'rtl' : 'ltr');
      const calls = page.locator('#creativity-calls');
      const phone = page.locator('.svc-calls__phone-wrapper');

      await calls.scrollIntoViewIfNeeded();
      await expect(calls).toHaveClass(/is-visible/);
      await expect.poll(() => phone.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
      await expect(phone).toBeVisible();
      const composition = await calls.evaluate((element) => {
        const heading = element.querySelector<HTMLElement>('.svc-calls__heading')!;
        const handset = element.querySelector<HTMLElement>('.svc-calls__phone-stage')!.getBoundingClientRect();
        return { headingSize: parseFloat(getComputedStyle(heading).fontSize), phoneWidth: handset.width, phoneHeight: handset.height };
      });
      expect(composition.headingSize).toBeGreaterThanOrEqual(18);
      expect(composition.phoneWidth).toBeGreaterThanOrEqual(84);
      expect(composition.phoneHeight).toBeGreaterThanOrEqual(300);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
});
