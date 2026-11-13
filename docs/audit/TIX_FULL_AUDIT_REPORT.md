# TIX Full Repository Audit & Hardening Report

Date: 2026-11-13  
Scope: repository audit, verified repairs, asset migration, route smoke QA, build and dependency checks.

## 1. Executive Summary

The project is a Next.js App Router site with native TSX pages, Tailwind utilities layered over legacy CSS, GSAP/ScrollTrigger interactions, static metadata routes, and a contact API route. The application builds successfully and the public routes render in Playwright smoke checks.

High-priority repairs completed:

- ScrollTrigger refresh was limited to About; it now refreshes after image/layout changes on every interactive page, reducing stale pin measurements during Home and Services loading.
- All 117 PNG files in `assets/images` and `public/assets/images` were replaced with verified WebP counterparts, including transparent `fashion.png` conversions.
- Public page metadata was added for About, Services, Work, and Contact, and Home metadata now includes description, Open Graph, Twitter, canonical, and language alternatives.
- The stale `hero-girl-bg.jpg` CSS fallback was replaced with the existing `HERO.webp` asset.
- A route-level Playwright smoke suite was added; the existing Services composition regression test remains in place.
- The user’s existing composition, connection-section removal, Arabic PDF, and prior test changes were preserved.

Remaining limitations:

- `npm audit` reports 7 Moderate `minimatch` findings through the TypeScript ESLint dependency chain. The suggested automatic fix is a breaking downgrade and was intentionally not applied.
- Production Core Web Vitals cannot be claimed from local development measurements; no production telemetry was available.
- Legacy static HTML contains historical/missing arrow image references now pointing to WebP names; those pages are not Next routes and are redirected by `next.config.ts`. They should be removed or repaired in a separate legacy cleanup.

## 2. Bug Register

| ID | Severity | Area | Root Cause | Fix | Verification |
|---|---|---|---|---|---|
| BUG-001 | High | GSAP/Home loading | ScrollTrigger refresh listeners were installed only for About, so image/font/layout changes could leave Home/Services pin calculations stale. | Generalized image load/error and `ResizeObserver` refresh handling to all pages. | Typecheck, build, existing composition e2e test, route smoke test. |
| BUG-002 | High | Assets | Runtime and legacy references depended on PNG files duplicated in two asset trees. | Converted 117 tracked PNGs to WebP, updated static/runtime references, removed PNG files from both asset directories. | Asset count check, production build, route smoke test. |
| BUG-003 | Medium | CSS fallback | `css/home.css` referenced missing `hero-girl-bg.jpg`. | Pointed fallback to existing `/assets/images/HERO.webp`. | Repository search and build. |
| BUG-004 | Medium | SEO metadata | Four public routes had no route-specific metadata and Home lacked social metadata. | Added typed metadata helper and unique metadata for all public English routes. | Build and Playwright metadata checks. |
| BUG-005 | Medium | International SEO | Arabic language semantics were applied only after client hydration. | Added `lang`/`dir` to the server-rendered `SitePage` wrapper while retaining existing document-level behavior. | Build and Arabic route smoke check. |
| BUG-006 | Low | Dependency security | `minimatch` vulnerability is transitive through TypeScript ESLint packages. | Documented; did not apply incompatible `npm audit fix --force`. | `npm audit --audit-level=high`. |
| BUG-007 | Low | Legacy pages | Several redirected legacy pages refer to missing arrow assets. | Updated existing PNG references to WebP; unresolved arrow names remain documented as legacy-only work. | Static search; not part of App Router route set. |

## 3. Asset Migration Report

Inventory scope was `assets/images` and `public/assets/images`, excluding dependency-owned files and historical documentation.

- PNG count before: 117.
- PNG count after: 0.
- WebP count after: 212.
- Conversion count: 2 newly converted (`fashion.png` in each asset tree); the remaining 115 already had corresponding WebP files.
- PNG bytes before: 190,494,591.
- Replacement WebP bytes: 21,744,898.
- Estimated savings for the migrated set: 168,749,693 bytes (88.6%).
- Transparency: the two new `fashion.webp` files were verified with alpha and dimensions 407×1129.
- Deleted files: the 117 PNG files in the two asset directories, only after matching WebP files existed.
- Retained PNG references: historical audit/docs and utility scripts that generate or inspect PNGs; no PNG asset remains in the runtime asset directories.
- Legacy arrow assets: the source PNG files did not exist before migration, so their references remain unresolved under WebP names and are listed as remaining legacy work.

## 4. Performance Report

### Measured locally

- `npm run build`: passed with Next.js 16.4.6; all six public pages prerendered successfully, API route remained dynamic as expected.
- WebP migration reduced the migrated asset byte footprint by 88.6% compared with the tracked PNG set.
- Route smoke test: 6/6 passed for title, canonical, main landmark, no PNG image source, and no horizontal overflow at the test viewport.

### Not measured

No production RUM or production Lighthouse data was available. Therefore LCP, INP, CLS, FCP, and TTFB are not asserted as production-passing. Local development timing is not a production Core Web Vitals result.

### Additional observations

- Native images used by animation-heavy sections should retain stable dimensions; the existing composition already supplies dimensions for the critical legacy hero images, while some gallery images remain candidates for a future CLS-focused pass.
- The application still loads legacy CSS files through the root layout. They were not globally rewritten because that would risk changing completed visual sections.
- The existing CSP includes development-oriented allowances such as `unsafe-eval`; tightening it should be done with a production verification pass.

## 5. Home Page & GSAP Report

The verified lifecycle issue was a page-scoped image/layout refresh effect that returned unless `page === 'about'`. Home and Services ScrollTrigger pins can depend on image dimensions and responsive layout changes, so a refresh could be missed after navigation or loading.

The effect now:

- observes `#main-content` on every page;
- schedules one animation-frame refresh at a time;
- refreshes on pending image load and error events;
- refreshes on container resize;
- removes listeners, cancels pending frames, and disconnects the observer on cleanup.

The main GSAP hook already uses `useGSAP` with `revertOnUpdate`, which scopes and reverts its triggers when the page changes. The existing Home composition regression test verifies the woman/title stacking, logo size/center, card dimensions, asymmetric corners, divider treatment, and overflow across the requested viewport family.

The exact intermittent production reproduction could not be measured with production network/CPU telemetry in this workspace; local browser smoke and build verification passed after the lifecycle correction.

## 6. SEO Report

Public routes audited: `/`, `/ar`, `/about`, `/services`, `/work`, `/contact`, `/robots.txt`, and `/sitemap.xml`.

- Home: unique title/description, canonical `/`, Open Graph/Twitter image, and `en`/`ar` alternates.
- Arabic Home: existing Arabic title/description and canonical `/ar`; server-rendered `lang="ar"` and `dir="rtl"` wrapper added.
- About, Services, Work, Contact: unique title, description, canonical URL, Open Graph metadata, and Twitter summary card.
- Sitemap: includes the six intended public page routes and uses `https://tixstudio.com`.
- Robots: sitemap declaration retained; stale PNG exclusion was removed after the migration.
- Structured data: existing static organization/website data was retained; no unverifiable address, phone, rating, award, or social profile was added.
- Accessibility smoke: route pages retain a main landmark; images are not served from PNG paths after migration. A full WCAG audit remains recommended.

Remaining SEO limitations include the legacy static HTML tree and the need for production validation of canonical host configuration.

## 7. Security Report

- Contact API validates payloads with Zod, rejects oversized bodies, uses a honeypot, and does not expose provider credentials.
- `npm audit --audit-level=high` completed with 7 Moderate `minimatch` advisories in the TypeScript ESLint dependency chain; no High/Critical finding was reported by this command.
- The automatic fix requires a breaking parser downgrade, so it was not applied without compatibility testing.
- Existing security headers and CSP configuration were preserved. CSP still contains `unsafe-inline`/`unsafe-eval` allowances and should be tightened only after production compatibility testing.
- No new secrets, services, or external dependencies were introduced.

## 8. Test Results

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test -- --run` | PASS — 2 tests |
| `npx playwright test tests/e2e/audit.spec.ts --reporter=line` | PASS — 6 tests |
| Existing `tests/e2e/native-parity.spec.ts` | Previously verified; a later full run did not return reporter output in the available dev-server session and is listed for rerun in a clean CI process. |
| `npm run build` | PASS |
| `npm audit --audit-level=high` | Completed with 7 Moderate findings; no High/Critical finding reported. |
| Browser console/network | Route smoke completed without assertion failures; production telemetry unavailable. |

## 9. Changed Files

- `src/components/PageInteractions.tsx` — generalized layout/image-triggered ScrollTrigger refresh lifecycle.
- `src/components/layout/SitePage.tsx` — server-rendered language and direction semantics.
- `src/lib/seo.ts` — typed shared metadata helper.
- `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/services/page.tsx`, `src/app/work/page.tsx`, `src/app/contact/page.tsx` — unique route metadata.
- `css/home.css` — repaired missing hero fallback asset reference.
- `index.html`, `js/layout.js`, `public/js/layout.js`, manifests, robots files, and `legacy-pages/*.html` — migrated existing PNG references to WebP paths.
- `tests/e2e/audit.spec.ts` — added route metadata/overflow/asset smoke coverage.
- `assets/images/fashion.webp`, `public/assets/images/fashion.webp` — converted transparent PNG replacements.
- 117 PNG files under the two asset directories — deleted after replacement verification.

Pre-existing user changes such as `HomeContent.tsx`, `native-parity.spec.ts`, `next-env.d.ts`, the deleted `ar/index.html`, and the untracked Arabic PDF were preserved.

## 10. Remaining Work

### Blocking

- None for local build and route smoke validation.

### Recommended

- Re-run the full Playwright suite in a clean CI process and capture browser console/network logs for every route.
- Resolve or remove the missing arrow references in redirected legacy work HTML.
- Upgrade the TypeScript ESLint dependency chain when a compatible non-breaking minimatch fix is available.
- Measure production CWV using real-user or production Lighthouse data.

### Optional

- Migrate remaining legacy CSS incrementally after visual snapshots are established.
- Tighten CSP after verifying production scripts and font loading.
- Add visual snapshot baselines for all six requested viewport sizes.

## 11. Final Verdict

**READY WITH LIMITATIONS**

The production build, TypeScript, lint, unit tests, route smoke checks, asset migration, metadata coverage, and verified GSAP lifecycle repair are complete. The verdict is not `PRODUCTION READY` because production Core Web Vitals were not measured, the full Playwright run needs a clean-session rerun, legacy redirected pages still contain unresolved historical arrow references, and the dependency audit reports 7 Moderate transitive advisories.
