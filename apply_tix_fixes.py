#!/usr/bin/env python3
"""Apply the reviewed TIX navbar and Studio fixes to the repository root.

The script is deliberately conservative: it checks expected source anchors,
refuses ambiguous edits, makes timestamped backups, and is safe to re-run.
"""
from __future__ import annotations

from datetime import datetime
from pathlib import Path
import re
import sys

ROOT = Path.cwd()

NAVBAR = r'''\
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/work', label: 'Work', key: 'work' },
  { href: '/services', label: 'Services', key: 'services' },
  { href: '/about', label: 'Studio', key: 'about' },
];

export function Navbar({ arabic = false }: { arabic?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const localized = arabic
    ? [
        { href: '/work', label: 'الأعمال', key: 'work' },
        { href: '/services', label: 'الخدمات', key: 'services' },
        { href: '/about', label: 'الاستوديو', key: 'about' },
      ]
    : links;

  const isArabic = arabic || pathname === '/ar' || pathname.startsWith('/ar/');
  const languageHref = isArabic ? '/' : '/ar/';
  const languageLabel = isArabic ? 'EN' : 'AR';
  const languageAccessibleName = isArabic ? 'Switch to English' : 'التبديل إلى العربية';

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Close the mobile menu after route navigation and return focus only when it was open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (wasOpenRef.current && !open) buttonRef.current?.focus({ preventScroll: true });
    wasOpenRef.current = open;
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {arabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      <nav
        className="nav"
        id="main-nav"
        aria-label={arabic ? 'التنقل الرئيسي' : 'Main navigation'}
        dir={arabic ? 'rtl' : undefined}
      >
        <div className="container">
          <div className="nav__inner">
            <Link href={arabic ? '/ar/' : '/'} className="nav__logo" aria-label="TIX Home">
              <Image
                src="/assets/images/tix.webp"
                alt="TIX Logo"
                className="nav__logo-img"
                width={60}
                height={60}
                priority
              />
            </Link>

            <ul className="nav__links">
              {localized.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? 'active' : undefined}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav__actions">
              <Link
                className="nav__language"
                href={languageHref}
                lang={isArabic ? 'en' : 'ar'}
                hrefLang={isArabic ? 'en' : 'ar'}
                aria-label={languageAccessibleName}
                title={languageAccessibleName}
              >
                {languageLabel}
              </Link>
              <Link href="/contact" className="nav__cta">
                <span>{arabic ? 'تواصل معنا' : 'Contact'}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <button
              ref={buttonRef}
              className={`nav__burger${open ? ' open' : ''}`}
              type="button"
              aria-label={arabic ? 'فتح قائمة التنقل' : 'Toggle menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu${open ? ' open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={arabic ? 'التنقل' : 'Navigation'}
        hidden={!open}
        dir={arabic ? 'rtl' : undefined}
      >
        <nav className="mobile-menu__links">
          {localized.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={languageHref}
            lang={isArabic ? 'en' : 'ar'}
            hrefLang={isArabic ? 'en' : 'ar'}
            onClick={() => setOpen(false)}
          >
            {isArabic ? 'English' : 'العربية'}
          </Link>
        </nav>
        <div className="mobile-menu__cta">
          <Link href="/contact" onClick={() => setOpen(false)}>
            {arabic ? 'لنبدأ مشروعك' : "Let's Build It ->"}
          </Link>
        </div>
        <div className="mobile-menu__meta">TIX - Alexandria / Est. 2025</div>
      </div>
    </>
  );
}
'''.lstrip('\\\n')

TOUCHPOINTS_GSAP = r'''    if (page === 'about') {
      const section = document.querySelector<HTMLElement>('[data-touchpoints]');
      const stage = section?.querySelector<HTMLElement>('.touchpoints__stage');
      const cards = section ? gsap.utils.toArray<HTMLElement>('[data-flight-card]', section) : [];
      const wipes = section ? gsap.utils.toArray<HTMLElement>('.touchpoints__wipe', section) : [];

      if (stage) {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top 98%',
          once: true,
          onEnter: () => stage.classList.add('is-entered'),
        });
      }

      if (section && stage && cards.length === 4) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const rotations = [-8, 8, -6, 7];
        const entryRotations = [-30, 29, -26, 28];
        const wipeScales = [1.08, 1.05, 1.02];
        const wipeStarts = [0.82, 0.87, 0.92];
        const shadow = 'drop-shadow(0 24px 24px rgba(0, 0, 0, 0.25))';

        if (reducedMotion) {
          stage.classList.add('is-entered');
          gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1, filter: shadow });
          gsap.set(wipes, { autoAlpha: 0, y: 0 });
        } else {
          const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
          const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);

          const renderProgress = (progress: number) => {
            const travelX = window.innerWidth * 1.05;
            const travelY = window.innerHeight * 0.2;

            cards.forEach((card, index) => {
              const start = 0.02 + index * 0.19;
              const enter = easeOut(clamp01((progress - start) / 0.15));
              const side = index % 2 === 0 ? -1 : 1;
              const vertical = index < 2 ? -travelY : travelY;
              const rotation = entryRotations[index] * (1 - enter) + rotations[index] * enter;
              const x = side * travelX * (1 - enter);
              const y = vertical * (1 - enter);
              const scale = 0.58 + 0.42 * enter;
              const blur = (1 - enter) * 14;

              gsap.set(card, {
                x,
                y,
                rotation,
                scale,
                autoAlpha: enter,
                filter: `blur(${blur.toFixed(2)}px) ${shadow}`,
                transformOrigin: 'center center',
                force3D: true,
              });
            });

            wipes.forEach((wipe, index) => {
              const wipeProgress = clamp01((progress - wipeStarts[index]) / (1 - wipeStarts[index]));
              const y = window.innerHeight * 0.72 * (1 - wipeProgress);
              gsap.set(wipe, {
                autoAlpha: wipeProgress > 0 ? 1 : 0,
                y,
                scale: wipeScales[index],
                force3D: true,
              });
            });
          };

          renderProgress(0);
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => renderProgress(self.progress),
            onRefresh: (self) => renderProgress(self.progress),
          });
        }
      }
    }

'''

NAV_CSS = r'''/* ── TIX NAV LINKS: clean editorial treatment, no outlined pills ── */
.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(1.15rem, 2.1vw, 2rem);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__links a {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.05rem 0.7rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 220ms ease;
}

.nav__links a:hover,
.nav__links a.active {
  color: var(--white);
  background: transparent;
  backdrop-filter: none;
}

.nav__links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: auto;
  bottom: 0.28rem;
  width: 1.15rem;
  height: 1px;
  border-radius: 999px;
  background: var(--crimson-bright);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav__links a:hover::after,
.nav__links a.active::after {
  transform: scaleX(1);
}

.nav__links a:focus-visible,
.nav__language:focus-visible,
.nav__cta:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.72);
  outline-offset: 5px;
}

.nav[dir='rtl'] .nav__links a::after,
html[dir='rtl'] .nav__links a::after {
  left: auto;
  right: 0;
  transform-origin: right center;
}

@media (prefers-reduced-motion: reduce) {
  .nav__links a,
  .nav__links a::after {
    transition: none;
  }
}
'''


def read_required(relative: str) -> str:
    path = ROOT / relative
    if not path.is_file():
        raise RuntimeError(f"Required file not found: {relative}. Run this script from the TIX repository root.")
    return path.read_text(encoding='utf-8')


def write_backup(relative: str, original: str) -> None:
    path = ROOT / relative
    backup_dir = ROOT / '.tix-fix-backups' / datetime.now().strftime('%Y%m%d-%H%M%S')
    backup_path = backup_dir / relative
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    backup_path.write_text(original, encoding='utf-8')


def safe_write(relative: str, original: str, updated: str) -> bool:
    if updated == original:
        print(f"UNCHANGED {relative}")
        return False
    write_backup(relative, original)
    (ROOT / relative).write_text(updated, encoding='utf-8')
    print(f"UPDATED   {relative}")
    return True


def patch_navbar() -> bool:
    relative = 'src/components/layout/Navbar.tsx'
    original = read_required(relative)
    if 'pathname.startsWith(\'/ar\')' in original and "className={`mobile-menu${open ? ' open' : ''}`}" in original:
        print(f"ALREADY   {relative}")
        return False
    return safe_write(relative, original, NAVBAR)


def patch_nav_css() -> bool:
    relative = 'public/css/components.css'
    original = read_required(relative)
    if 'TIX NAV LINKS: clean editorial treatment' in original:
        print(f"ALREADY   {relative}")
        return False
    pattern = re.compile(
        r'\.nav__links\s*\{.*?\.nav__links a\.active::after\s*\{\s*transform:\s*scaleX\(1\);\s*\}',
        re.S,
    )
    replacement = NAV_CSS
    updated, count = pattern.subn(replacement, original, count=1)
    if count != 1:
        raise RuntimeError('Could not safely locate the original nav link CSS block; no CSS file changed.')
    return safe_write(relative, original, updated)


def patch_about() -> bool:
    relative = 'src/components/native-pages/AboutContent.tsx'
    original = read_required(relative)
    updated = original.replace('src="../assets/images/', 'src="/assets/images/')

    # Remove the temporary fallback overlay placed after the approved perfume image.
    refused_pattern = re.compile(
        r'(<div className="refused__left">\s*<img\b[^>]+/>)\s*<div\s*\n\s*style=\{\{.*?</div>\s*</div>',
        re.S,
    )
    updated, refused_count = refused_pattern.subn(r'\1\n          </div>', updated, count=1)
    if refused_count not in (0, 1):
        raise RuntimeError('Unexpected number of Studio perfume fallback blocks.')

    # Remove the five legacy gradient/REPLACE overlays that were left on top of real BTS images.
    bts_pattern = re.compile(
        r'(<div className="bts__img[^\"]*">\s*<img\b[^>]+/>)\s*<div\s*\n\s*style=\{\{.*?</div>\s*</div>',
        re.S,
    )
    updated, bts_count = bts_pattern.subn(r'\1\n          </div>', updated)
    if bts_count not in (0, 5):
        raise RuntimeError(f'Expected 5 BTS fallback overlays, found {bts_count}; refusing a partial Studio cleanup.')

    # Remove the intentionally hidden, empty third-column placeholder.
    updated, hidden_count = re.subn(
        r'\s*<div className="refused__img-right"\s*style=\{\{"display": "none"\}\}>\s*</div>',
        '',
        updated,
        count=1,
    )

    if refused_count == 0 and bts_count == 0 and hidden_count == 0 and updated == original:
        print(f"ALREADY   {relative}")
        return False

    if 'REPLACE' in updated:
        raise RuntimeError('Studio component still contains REPLACE placeholders after cleanup; no Studio file changed.')
    if '../assets/images/' in updated:
        raise RuntimeError('Studio component still contains relative ../assets image paths; refusing partial migration.')
    return safe_write(relative, original, updated)


def patch_interactions() -> bool:
    relative = 'src/components/PageInteractions.tsx'
    original = read_required(relative)
    marker = "    const disrupt = document.querySelector<HTMLElement>('[data-disrupt-pin]');"
    if 'if (page === \'about\')' in original and 'renderProgress(self.progress)' in original:
        print(f"ALREADY   {relative}")
        return False
    if original.count(marker) != 1:
        raise RuntimeError('Could not uniquely locate the PageInteractions insertion point.')
    updated = original.replace(marker, TOUCHPOINTS_GSAP + marker, 1)
    return safe_write(relative, original, updated)


def patch_footer() -> bool:
    relative = 'src/components/layout/ContextualFooter.tsx'
    original = read_required(relative)
    updated = original.replace('href="//contact"', 'href="/contact"')
    if updated == original:
        if 'href="/contact"' in original:
            print(f"ALREADY   {relative}")
            return False
        raise RuntimeError('Could not find the malformed protocol-relative footer contact link.')
    return safe_write(relative, original, updated)


def patch_tests() -> bool:
    relative = 'tests/e2e/native-parity.spec.ts'
    original = read_required(relative)
    additions = r'''

  test('language switch remains visible on every public route', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const languageSwitch = page.locator('#main-nav .nav__language');
      await expect(languageSwitch).toBeVisible();
      await expect(languageSwitch).toHaveAttribute('href', route === '/ar' ? '/' : '/ar/');
    }
  });

  test('Studio images use root asset URLs and contain no migration placeholders', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    await expect(page.locator('.refused__left > img')).toBeVisible();
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
  });

  test('Studio touchpoint cards respond to scroll progress', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    const section = page.locator('[data-touchpoints]');
    await expect(section.locator('[data-flight-card]')).toHaveCount(4);
    await section.evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + element.clientHeight * 0.42);
    });
    await page.waitForTimeout(350);
    const cards = await section.locator('[data-flight-card]').evaluateAll((elements) => elements.map((element) => ({
      opacity: Number.parseFloat(getComputedStyle(element).opacity),
      transform: getComputedStyle(element).transform,
    })));
    expect(cards.some((card) => card.opacity > 0.85)).toBeTruthy();
  });
'''
    if 'language switch remains visible on every public route' in original:
        print(f"ALREADY   {relative}")
        return False
    insertion = "  test('mobile navigation opens and closes with Escape', async ({ page }) => {"
    if original.count(insertion) != 1:
        raise RuntimeError('Could not uniquely locate E2E test insertion point.')
    updated = original.replace(insertion, additions + '\n' + insertion, 1)
    return safe_write(relative, original, updated)


def main() -> int:
    if not (ROOT / 'package.json').is_file() or not (ROOT / 'src/app').is_dir():
        print('ERROR: Run this script from the TIX Next.js repository root.', file=sys.stderr)
        return 2

    changed = []
    for label, fn in [
        ('navbar', patch_navbar),
        ('navigation styles', patch_nav_css),
        ('Studio content/assets', patch_about),
        ('Studio GSAP motion', patch_interactions),
        ('footer contact route', patch_footer),
        ('Playwright regressions', patch_tests),
    ]:
        print(f'\n--- {label} ---')
        try:
            if fn():
                changed.append(label)
        except Exception as exc:
            print(f'ERROR: {exc}', file=sys.stderr)
            print('Stopped safely. Review backups in .tix-fix-backups before retrying.', file=sys.stderr)
            return 1

    print('\n=== Result ===')
    if changed:
        print('Updated: ' + ', '.join(changed))
    else:
        print('No changes were needed; the fixes appear to be already applied.')
    print('\nNext: npm run typecheck && npm run lint && npm test && npx playwright test && npm run build')
    print('No Git operations, pushes, deployments, or DNS changes were performed by this script.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
