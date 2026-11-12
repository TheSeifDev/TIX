import { expect, test } from '@playwright/test';

const routes = ['/', '/ar', '/about', '/services', '/work', '/contact'];
const legacyRoutes = ['/index.html', '/ar/index.html', '/pages/about.html', '/pages/services.html', '/pages/work.html', '/pages/contact.html'];

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



  test('language switch remains visible on every public route', async ({ page }) => {
    await page.goto('/ar/', { waitUntil: 'networkidle' });
    await expect.poll(() => new URL(page.url()).pathname).toBe('/ar');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://tixstudio.com/ar');

    for (const route of routes) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const languageSwitch = page.locator('#main-nav .nav__language');
      await expect(languageSwitch).toBeVisible();
      const expectedPath = route === '/ar' ? '/' : '/ar';
      await expect(languageSwitch).toHaveAttribute('href', expectedPath);
      await languageSwitch.click();
      await expect.poll(() => new URL(page.url()).pathname).toBe(expectedPath);
    }
  });

  test('Studio images use root asset URLs and contain no migration placeholders', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    const perfumeImage = page.locator('.refused__left > img');
    await perfumeImage.scrollIntoViewIfNeeded();
    await expect(perfumeImage).toBeVisible();
    await expect(page.locator('.bts__grid .bts__img')).toHaveCount(5);
    await expect(page.locator('.refused__left > div, .bts__grid .bts__img > div')).toHaveCount(0);
    const invalidSources = await page.locator('.impact-hero img, .touchpoints img, .connection img, .refused img, .bts img').evaluateAll((images) =>
      images.map((image) => image.getAttribute('src') || '').filter((src) => src.startsWith('../assets/')),
    );
    expect(invalidSources).toEqual([]);
    const brokenImages = await page.locator('.impact-hero img, .touchpoints img, .connection img, .refused img, .bts img').evaluateAll((images) =>
      (images as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute('src')),
    );
    expect(brokenImages).toEqual([]);
    const imageSources = await page.locator('.impact-hero img, .touchpoints img, .connection img, .refused img, .bts img').evaluateAll((images) =>
      images.map((image) => image.getAttribute('src') || ''),
    );
    const imageStatuses = await Promise.all(imageSources.map(async (src) => ({
      src,
      status: (await page.request.get(new URL(src, page.url()).toString())).status(),
    })));
    expect(imageStatuses).toEqual(imageSources.map((src) => ({ src, status: 200 })));
  });

  test('Studio touchpoint cards respond to scroll progress', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    const section = page.locator('[data-touchpoints]');
    await expect(section.locator('[data-flight-card]')).toHaveCount(4);
    await section.evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + element.clientHeight * 0.42, behavior: 'instant' });
    });
    await expect.poll(async () => {
      const opacities = await section.locator('[data-flight-card]').evaluateAll((elements) =>
        elements.map((element) => Number.parseFloat(getComputedStyle(element).opacity)),
      );
      return opacities.some((opacity) => opacity > 0.85);
    }).toBe(true);
    const stageBox = await section.locator('.touchpoints__stage').boundingBox();
    expect((stageBox?.y ?? 0) + (stageBox?.height ?? 0)).toBeGreaterThan(0);
    const cards = await section.locator('[data-flight-card]').evaluateAll((elements) => elements.map((element) => ({
      opacity: Number.parseFloat(getComputedStyle(element).opacity),
      transform: getComputedStyle(element).transform,
    })));
    expect(cards.some((card) => card.opacity > 0.85)).toBeTruthy();
  });

  test('Studio touchpoints preserve the portrait reference composition', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/about', { waitUntil: 'networkidle' });
      const section = page.locator('[data-touchpoints]');
      const stage = section.locator('.touchpoints__stage');
      const heading = section.locator('.touchpoints__copy h2');
      const subtitle = section.locator('.touchpoints__copy > p:last-child');
      await expect(heading).toHaveText('Built acrossevery touchpoint.');
      await expect(subtitle).toHaveText('One studio. Multiple creative systems. Unified brand experiences.');
      await expect(section.locator('[data-flight-card]')).toHaveCount(4);
      await expect(section.locator('.touchpoints__logo')).toBeVisible();
      await expect(section.locator('.touchpoints__chevron')).toHaveCount(2);
      await expect(section.locator('.touchpoints__chevron').first()).toBeVisible();
      await expect(section.locator('.touchpoints__chevron').last()).toBeVisible();

      const stageBox = await stage.boundingBox();
      expect(stageBox).not.toBeNull();
      if (viewport.width <= 700) {
        expect(Math.abs((stageBox!.width / stageBox!.height) - (590 / 745))).toBeLessThan(0.025);
      } else {
        expect(stageBox!.width).toBeGreaterThanOrEqual(viewport.width - 2);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect((await section.boundingBox())?.height ?? Infinity).toBeLessThan(viewport.width < 700 ? 560 : 850);

      await stage.scrollIntoViewIfNeeded();
      const headingBox = await heading.boundingBox();
      const navBox = await page.locator('#main-nav').boundingBox();
      expect(headingBox && navBox && headingBox.y).toBeGreaterThanOrEqual((navBox?.y ?? 0) + (navBox?.height ?? 0));
    }
  });

  test('Studio touchpoint motion reverses without duplicate triggers', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/about', { waitUntil: 'networkidle' });
    const section = page.locator('[data-touchpoints]');
    const card = section.locator('[data-flight-card]').first();
    await section.evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    });
    await page.waitForTimeout(250);
    const start = await card.evaluate((element) => getComputedStyle(element).transform);
    await section.evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + element.clientHeight - innerHeight, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const end = await card.evaluate((element) => getComputedStyle(element).transform);
    expect(end).not.toBe(start);
    await section.evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    });
    await page.waitForTimeout(700);
    const reversed = await card.evaluate((element) => getComputedStyle(element).transform);
    expect(reversed).not.toBe(end);
  });

  test('mobile navigation opens and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });
    const burger = page.locator('.nav__burger');
    const menu = page.locator('#mobile-menu');
    await burger.click();
    await expect(menu).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#main-content')).toHaveAttribute('inert', '');
    await expect(menu.locator('.mobile-menu__links a').first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(menu.locator('.mobile-menu__cta a')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menu.locator('.mobile-menu__links a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#main-content')).not.toHaveAttribute('inert', '');
    await expect(burger).toBeFocused();

    await burger.click();
    await expect(menu).toBeVisible();
    await menu.locator('.mobile-menu__links a[href="/about"]').click();
    await expect.poll(() => new URL(page.url()).pathname).toBe('/about');
    await expect(menu).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  for (const route of legacyRoutes) {
    test(`${route} redirects to the clean route`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      const expectedPath = route === '/index.html'
        ? '/'
        : route === '/ar/index.html'
          ? '/ar'
          : route.replace('/pages', '').replace('.html', '');
      await expect.poll(() => new URL(page.url()).pathname).toBe(expectedPath);
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


  test('shared footer is present on every public route', async ({ page }) => {
    for (const route of ['/', '/ar', '/about', '/services', '/work', '/contact']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page.locator('.tix-section .cta-card')).toHaveCount(1);
      await expect(page.locator('.tix-footer')).toHaveCount(1);
      await expect(page.locator('.tix-footer')).toBeVisible();
    }
  });

  test('Contact is one centered form section and retains the shared footer', async ({ page }) => {
    const formCard = page.locator('.contact-single-section .contact-form');
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];
    await page.goto('/contact', { waitUntil: 'networkidle' });
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await expect(page.locator('#main-content > section')).toHaveCount(1);
      await expect(page.locator('.contact-hero, .contact-footer-section')).toHaveCount(0);
      await expect(formCard).toBeVisible();
      const rect = await formCard.boundingBox();
      expect(rect).not.toBeNull();
      expect(Math.abs((rect!.x + rect!.width / 2) - viewport.width / 2)).toBeLessThan(8);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(formCard.locator('input[name="name"]')).toBeVisible();
      await expect(formCard.locator('input[name="email"]')).toBeVisible();
      await expect(formCard.locator('input[name="building"]')).toBeVisible();
      await expect(formCard.locator('textarea[name="help"]')).toBeVisible();
    }
    await expect(page.locator('.tix-footer')).toHaveCount(1);
    await expect(page.locator('.tix-footer')).toBeVisible();
    const footerFollowsMain = await page.evaluate(() => {
      const main = document.querySelector('#main-content');
      const footer = document.querySelector('.tix-footer');
      return Boolean(main && footer && (main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING));
    });
    expect(footerFollowsMain).toBe(true);
  });

  test('Contact form submits to the contact API', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject({
        name: 'Test Sender',
        email: 'sender@example.com',
        building: 'A new campaign',
        help: 'We are planning a launch this quarter.',
      });
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await page.locator('input[name="name"]').fill('Test Sender');
    await page.locator('input[name="email"]').fill('sender@example.com');
    await page.locator('input[name="building"]').fill('A new campaign');
    await page.locator('textarea[name="help"]').fill('We are planning a launch this quarter.');
    await page.locator('.form-submit').click();
    await expect(page.locator('.form-status')).toHaveText('Message sent. We will be in touch soon.');
  });

  test('Studio touchpoint cards remain visible with reduced motion', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/about', { waitUntil: 'networkidle' });
    const cards = page.locator('[data-touchpoints] [data-flight-card]');
    await expect(cards).toHaveCount(4);
    const opacities = await cards.evaluateAll((items) =>
      items.map((item) => Number.parseFloat(getComputedStyle(item).opacity)),
    );
    expect(opacities.every((opacity) => opacity > 0.9)).toBeTruthy();
    await expect(page.locator('[data-touchpoints] .touchpoints__copy h2')).toBeVisible();
  });

  test('Studio Touchpoints do not remain as an empty black scroll section', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/about', { waitUntil: 'networkidle' });
      const section = page.locator('[data-touchpoints]');
      const stage = section.locator('.touchpoints__stage');
      await expect(stage).toBeVisible();
      await expect(section.locator('[data-flight-card]')).toHaveCount(4);
      await section.evaluate((element) => {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + element.clientHeight - window.innerHeight, behavior: 'instant' });
      });
      await expect(stage).toHaveClass(/is-entered/);
      await expect.poll(async () => {
        const cards = await section.locator('[data-flight-card]').evaluateAll((items) =>
          items.map((item) => {
            const rect = item.getBoundingClientRect();
            return {
              opacity: Number.parseFloat(getComputedStyle(item).opacity),
              loaded: (item as HTMLImageElement).complete && (item as HTMLImageElement).naturalWidth > 0,
              onScreen: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
            };
          }),
        );
        return cards.every((card) => card.opacity > 0.9 && card.loaded && card.onScreen);
      }).toBe(true);
      const stageBox = await stage.boundingBox();
      expect((stageBox?.y ?? 0) + (stageBox?.height ?? 0)).toBeGreaterThan(0);
      await expect(section.locator('.touchpoints__copy h2')).toBeVisible();
    }
  });

});
