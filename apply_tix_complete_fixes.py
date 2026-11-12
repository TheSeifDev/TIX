#!/usr/bin/env python3
"""Apply the earlier Navbar/Studio repair kit plus shared-footer and Contact layout fixes.

Run from the TIX repository root. The companion apply_tix_fixes.py is required.
All writes are backed up and guarded by source checks. No Git, push, deploy or DNS actions.
"""
from __future__ import annotations

from datetime import datetime
from pathlib import Path
import runpy
import sys

ROOT = Path.cwd()
BASE_SCRIPT = Path(__file__).with_name("apply_tix_fixes.py")

CONTACT_CONTENT = r'''/* Native single-section Contact page: one centered inquiry form. */
'use client';

export function ContactContent() {
  return (
    <main id="main-content" className="contact-single-page">
      <section className="contact-single-section" aria-labelledby="contact-form-heading">
        <div className="contact-single-section__glow" aria-hidden="true" />
        <div className="contact-single-section__inner">
          <p className="contact-single-section__eyebrow">TIX / PROJECT INQUIRY</p>
          <div className="contact-form">
            <h1 id="contact-form-heading" className="contact-form__title">LET'S GET IN TOUCH</h1>
            <p className="contact-single-section__intro">
              Tell us what you are building. We will take it from there.
            </p>
            <form noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your name</label>
                  <input className="form-input" type="text" id="name" name="name" placeholder="Your name" autoComplete="name" minLength={2} maxLength={120} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-input" type="email" id="email" name="email" placeholder="you@brand.com" autoComplete="email" maxLength={254} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="building">What are you building?</label>
                <input className="form-input" type="text" id="building" name="building" placeholder="A campaign, a launch, a brand, a digital experience…" maxLength={200} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="help">Tell us about the project</label>
                <textarea className="form-textarea" id="help" name="help" placeholder="Your goals, scope, and expected timeline…" rows={5} minLength={10} maxLength={5000} required />
              </div>
              <button type="submit" className="form-submit">Start the project <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
'''

CONTACT_CSS = r'''

/* ── CONTACT: single centered form section ───────────────────────────── */
.contact-single-page {
  min-height: 100svh;
  background: #080808;
}

.contact-single-section {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: calc(var(--nav-height, 82px) + clamp(2.5rem, 7vh, 5rem)) 1.25rem clamp(3rem, 7vh, 5rem);
  background:
    radial-gradient(ellipse 55% 48% at 50% 48%, rgba(115, 0, 18, 0.22), transparent 72%),
    linear-gradient(180deg, #090909 0%, #080808 100%);
}

.contact-single-section__glow {
  position: absolute;
  z-index: -1;
  width: min(76vw, 760px);
  aspect-ratio: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(128, 0, 20, 0.17), transparent 68%);
  filter: blur(35px);
  pointer-events: none;
}

.contact-single-section__inner {
  width: min(100%, 760px);
  margin-inline: auto;
  position: relative;
  z-index: 1;
}

.contact-single-section__eyebrow {
  margin: 0 0 1rem;
  text-align: center;
  color: var(--crimson-bright);
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.contact-single-section .contact-form {
  width: 100%;
  margin: 0 auto;
  padding: clamp(1.4rem, 4.5vw, 3rem);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: clamp(18px, 3vw, 28px);
  background: rgba(17, 17, 17, 0.88);
  color: var(--off-white) !important;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.contact-single-section .contact-form::before {
  content: none;
  display: none;
}

.contact-single-section .contact-form__title {
  margin: 0 0 0.55rem;
  color: var(--white) !important;
  font-size: clamp(1.15rem, 2.3vw, 1.55rem);
  line-height: 1.2;
  letter-spacing: 0.12em;
}

.contact-single-section__intro {
  margin: 0 auto 2rem;
  max-width: 48ch;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.65;
  text-align: center;
}

.contact-single-section .form-group {
  margin-bottom: 1.1rem;
}

.contact-single-section .form-label {
  color: rgba(255, 255, 255, 0.72);
}

.contact-single-section .form-input,
.contact-single-section .form-textarea {
  border-color: rgba(255, 255, 255, 0.13);
  background: rgba(255, 255, 255, 0.045);
}

.contact-single-section .form-input:focus,
.contact-single-section .form-textarea:focus {
  border-color: var(--crimson-bright);
  box-shadow: 0 0 0 3px rgba(168, 0, 16, 0.13);
}

.contact-single-section .form-submit {
  margin-top: 0.25rem;
  background: var(--crimson);
  color: var(--white);
}

.contact-single-section .form-submit:hover {
  background: var(--crimson-bright);
  box-shadow: 0 12px 32px rgba(122, 0, 18, 0.28);
}

.contact-single-section .form-status {
  margin-top: 1rem;
  color: var(--off-white);
  text-align: center;
}

@media (max-width: 640px) {
  .contact-single-section {
    min-height: 100svh;
    padding-top: calc(var(--nav-height, 72px) + 2rem);
    padding-bottom: 2.5rem;
  }

  .contact-single-section .contact-form {
    padding: 1.35rem 1.1rem;
  }

  .contact-single-section .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-single-section__glow {
    filter: none;
  }
}
'''


def backup_and_write(relative: str, original: str, updated: str) -> None:
    if original == updated:
        print(f"ALREADY   {relative}")
        return
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = ROOT / ".tix-fix-backups" / stamp / relative
    backup.parent.mkdir(parents=True, exist_ok=True)
    backup.write_text(original, encoding="utf-8")
    (ROOT / relative).write_text(updated, encoding="utf-8")
    print(f"UPDATED   {relative} (backup: {backup.relative_to(ROOT)})")


def read_required(relative: str) -> str:
    path = ROOT / relative
    if not path.is_file():
        raise RuntimeError(f"Required file not found: {relative}. Run from TIX repository root.")
    return path.read_text(encoding="utf-8")


def patch_site_page_footer() -> None:
    relative = "src/components/layout/SitePage.tsx"
    original = read_required(relative)
    if "<ContextualFooter page={contact ? 'home' : page ?? 'home'} arabic={arabic} />" in original:
        print(f"ALREADY   {relative}")
        return
    expected = "return <><Navbar arabic={arabic} />{children}{!contact && <ContextualFooter page={page} arabic={arabic} />}</>;"
    if original.count(expected) != 1:
        raise RuntimeError("SitePage footer guard differs from the reviewed source; refusing an unsafe rewrite.")
    updated = original.replace(
        expected,
        "return <><Navbar arabic={arabic} />{children}<ContextualFooter page={contact ? 'home' : page ?? 'home'} arabic={arabic} /></>;",
        1,
    )
    backup_and_write(relative, original, updated)


def patch_contact_content() -> None:
    relative = "src/components/native-pages/ContactContent.tsx"
    original = read_required(relative)
    if "contact-single-section" in original and "contact-footer-section" not in original and "contact-hero" not in original:
        print(f"ALREADY   {relative}")
        return
    required = ['name="name"', 'name="email"', 'name="building"', 'name="help"']
    if not all(field in original for field in required):
        raise RuntimeError("Contact field contract differs from the existing API; refusing to replace it.")
    backup_and_write(relative, original, CONTACT_CONTENT)


def patch_contact_css() -> None:
    relative = "public/css/contact.css"
    original = read_required(relative)
    if "CONTACT: single centered form section" in original:
        print(f"ALREADY   {relative}")
        return
    backup_and_write(relative, original, original.rstrip() + CONTACT_CSS)


def patch_footer_tests() -> None:
    relative = "tests/e2e/native-parity.spec.ts"
    original = read_required(relative)
    marker = "test('Contact is one centered form section and retains the shared footer'"
    if marker in original:
        print(f"ALREADY   {relative} (footer/contact regressions)")
        return
    additions = r'''

  test('shared footer is present on every public route', async ({ page }) => {
    for (const route of ['/', '/ar', '/about', '/services', '/work', '/contact']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page.locator('.tix-section .cta-card')).toHaveCount(1);
      await expect(page.locator('.tix-footer')).toHaveCount(1);
      await expect(page.locator('.tix-footer')).toBeVisible();
    }
  });

  test('Contact is one centered form section and retains the shared footer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await expect(page.locator('#main-content > section')).toHaveCount(1);
    await expect(page.locator('.contact-hero, .contact-footer-section')).toHaveCount(0);
    const formCard = page.locator('.contact-single-section .contact-form');
    await expect(formCard).toBeVisible();
    const rect = await formCard.boundingBox();
    expect(rect).not.toBeNull();
    expect(Math.abs((rect!.x + rect!.width / 2) - 720)).toBeLessThan(45);
    await expect(formCard.locator('input[name="name"]')).toBeVisible();
    await expect(formCard.locator('input[name="email"]')).toBeVisible();
    await expect(formCard.locator('input[name="building"]')).toBeVisible();
    await expect(formCard.locator('textarea[name="help"]')).toBeVisible();
    await expect(page.locator('.tix-footer')).toHaveCount(1);
  });

  test('Studio Touchpoints do not remain as an empty black scroll section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/about', { waitUntil: 'networkidle' });
    const section = page.locator('[data-touchpoints]');
    const stage = section.locator('.touchpoints__stage');
    await expect(stage).toBeVisible();
    await expect(section.locator('[data-flight-card]')).toHaveCount(4);
    await section.evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + element.clientHeight * 0.7);
    });
    await page.waitForTimeout(500);
    await expect(stage).toHaveClass(/is-entered/);
    const cardOpacities = await section.locator('[data-flight-card]').evaluateAll((items) =>
      items.map((item) => Number.parseFloat(getComputedStyle(item).opacity)),
    );
    expect(cardOpacities.every((opacity) => opacity > 0.9)).toBeTruthy();
  });
'''
    trimmed = original.rstrip()
    if not trimmed.endswith("});"):
        raise RuntimeError("Could not identify the final Playwright suite boundary safely.")
    updated = trimmed[:-3] + additions + "\n});\n"
    backup_and_write(relative, original, updated)


def main() -> int:
    if not BASE_SCRIPT.is_file():
        print("ERROR: Companion apply_tix_fixes.py is missing from the same folder.", file=sys.stderr)
        return 2
    if not (ROOT / "package.json").is_file() or not (ROOT / "src/app").is_dir():
        print("ERROR: Run this script from the TIX Next.js repository root.", file=sys.stderr)
        return 2

    base = runpy.run_path(str(BASE_SCRIPT))
    base_result = base["main"]()
    if base_result != 0:
        print("Base Navbar/Studio patch did not complete; stopping before further changes.", file=sys.stderr)
        return base_result

    print("\n--- Ensure shared footer on every route ---")
    patch_site_page_footer()
    print("\n--- Replace Contact with one centered form section ---")
    patch_contact_content()
    print("\n--- Apply centered Contact form styles ---")
    patch_contact_css()
    print("\n--- Add footer/contact/Studio regression tests ---")
    patch_footer_tests()

    print("\nComplete fix set applied. Run:")
    print("npm run typecheck && npm run lint && npm test && npx playwright test && npm run build")
    print("The shared Footer is rendered after the single Contact main section.")
    print("No Git operations, push, deployment, or DNS changes were performed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
