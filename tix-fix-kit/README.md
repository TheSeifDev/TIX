# TIX — Navbar, Studio, Footer & Contact Repair Kit

This package is designed for the current `main` tree inspected on 2026-11-12.

## What it fixes

### Shared layout / Footer
- Keeps the shared CTA + Footer mounted on all routes, including `/contact`.
- The Contact page keeps exactly one section inside `<main>`; the shared site Footer remains below the main content.
- Corrects the malformed Footer Contact URL from `//contact` to `/contact`.

### Navbar
- Keeps AR/EN visible on all public routes.
- Replaces pill-like nav-link hover backgrounds with a minimal active underline.
- Aligns the mobile menu state class with the CSS (`open`).

### Studio / About
- Removes legacy placeholder blocks that overlap real images.
- Changes Studio image references to root-relative `/assets/images/...` paths.
- Restores the original `TouchpointFlight` scroll choreography with GSAP + ScrollTrigger, scoped to React lifecycle cleanup.
- Adds a browser regression asserting the Touchpoints cards actually become visible during scroll rather than leaving a long empty black stage.

### Contact
- Replaces the multi-section Contact page with one centered form section.
- Preserves the existing API field contract: `name`, `email`, `building`, and `help`.
- Keeps the existing `/api/contact` submission handler and validation flow.
- Renders the common Footer after the single Contact main section.

## Apply

1. Copy both Python scripts into the root of the TIX Next.js repository, next to `package.json`.
2. Ensure your Git working tree is clean, or commit/stash any personal edits first.
3. Run only the complete script:

   ```bash
   python apply_tix_complete_fixes.py
   ```

The complete script invokes the earlier Navbar/Studio patch first, then applies the global Footer and Contact layout changes. It creates timestamped backups under `.tix-fix-backups/` before every write. It does not run Git commands, push, deploy, or change DNS.

## Verify

```bash
npm run typecheck
npm run lint
npm test
npx playwright test
npm run build
```

New Playwright checks cover:
- Footer presence on Studio and Contact.
- Exactly one `section` inside Contact's `main`.
- Centered form geometry and all expected fields.
- Studio Touchpoints card visibility after scroll progress.

## Important execution status

The GitHub connector allowed repository reads but rejected write operations with HTTP 403. Therefore this package is a local application patch, not a committed GitHub change. It has been syntax-checked as Python, but the project TypeScript/build/Playwright suite still needs to be run in the actual TIX checkout.

The linked Figma file also remained inaccessible to the connected account, so this patch restores the Studio motion behavior from the repository's archived source rather than claiming a Figma pixel-match.
