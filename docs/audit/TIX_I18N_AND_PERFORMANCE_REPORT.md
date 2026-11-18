# TIX Internationalization and Performance Report

Date: 2026-11-13

## Executive summary

The repository now has one coherent `next-intl` architecture for English and Arabic public routes. Locale-aware navigation preserves the logical page, Arabic documents render with `lang="ar"` and `dir="rtl"`, message parity is enforced, and the production browser smoke suite verifies localized route rendering, language switching, overflow, and known English-prose leakage.

The Home animation lifecycle was also hardened by removing the broad `ResizeObserver` refresh path that could feed back through GSAP pin spacers. Image/font readiness now schedules one bounded ScrollTrigger refresh and cleans up listeners, timers, and animation contexts. The local production performance test recorded no Long Tasks during its repeated Home navigation/scroll scenario.

Current verdict: **READY WITH LIMITATIONS**. The local production build and browser checks are healthy, but production Real User Monitoring is not available in this repository and seven moderate development dependency audit findings remain.

## Translation coverage

| Area | Status | Evidence |
|---|---|---|
| Locale routing | Complete | `src/i18n/routing.ts`, `src/proxy.ts`, `[locale]` route tree |
| English and Arabic message parity | Complete | `npm run i18n:validate`: 265 keys |
| Home | Complete for rendered native route | `HomeContent.tsx` uses `HomePage` and `HomeLists` messages |
| About | Complete for rendered native route | `AboutContent.tsx` uses `AboutPage` messages |
| Services | Complete for rendered native route | `ServicesContent.tsx` uses `ServicesPage` messages |
| Work | Core headings, descriptions, categories, and labels localized | `WorkContent.tsx` uses `WorkPage` message groups; decorative ticker strings remain intentionally `aria-hidden` |
| Contact and footer | Complete | `ContactContent.tsx`, `ContactFooter.tsx`, `ContextualFooter.tsx` |
| RTL document state | Verified | Production Playwright route matrix checks `html[lang]` and `html[dir]` |
| Language switch | Verified | English/Arabic route-preserving Playwright checks |

The static localized-content smoke audit currently reports zero findings for its configured prose patterns. The browser regression test additionally rejects known English prose such as the old Home description, the old real-estate description, and the old legal footer text on `/ar/*` routes.

## Bug register

| ID | Severity | Area | Root cause | Fix | Verification |
|---|---|---|---|---|---|
| I18N-001 | High | Routing | Locale pages and navigation were only partially localized | Added `next-intl` routing, request config, proxy, localized route tree, and navigation helpers | Typecheck, build, route matrix |
| I18N-002 | High | Arabic content | User-facing copy remained hardcoded in native components | Moved Home, About, Services, Work core copy, Contact, and footer copy into paired message namespaces | 265-key parity and Arabic leakage test |
| I18N-003 | Medium | Document direction | Root document did not derive language direction from the active locale | Root layout now renders `lang` and `dir` from `getLocale()` | Playwright EN/AR matrix |
| PERF-001 | High | Home/GSAP | Broad resize observation could repeatedly refresh ScrollTrigger after pin-spacer layout changes | Replaced it with bounded image/font readiness scheduling and cleanup | Production Home test: `longTasks=[]` |
| A11Y-001 | Medium | Mobile navigation | Previous focus behavior and selectors did not match the current native menu structure | Added cancellable rAF focus scheduling and retained background inert behavior | Mobile navigation Playwright test |
| QA-001 | Medium | Regression tests | Several assertions described pre-localization/pre-contact DOM and copy | Updated assertions to verify current behavior rather than stale markup | Targeted Playwright checks |
| SEC-001 | Medium | Dependencies | `minimatch` advisory flows through the TypeScript ESLint dependency chain | Not auto-upgraded because the available fix requires a major/incompatible parser change | `npm audit --json` |

## Performance report

Measurements are local laboratory measurements against the optimized local production build, not production RUM.

- Build: `npm run build` passed on Next.js 16.4.6/Turbopack.
- Home repeated navigation/scroll scenario: no observed Long Tasks (`longTasks=[]`).
- No production LCP, INP, CLS, FCP, or TTFB telemetry is configured; those values are therefore not claimed.
- Images retain stable dimensions in the audited native pages and the browser checks found no PNG image requests in rendered routes.
- The Home interaction lifecycle uses scoped GSAP cleanup, a single readiness refresh schedule, and no persistent `ResizeObserver` feedback loop.

## Home and GSAP report

The verified risk was repeated global refresh work attached to layout changes. The repair is in `src/components/PageInteractions.tsx`: image load/error listeners, font readiness, one timer, and one animation frame schedule the refresh; all are cancelled in cleanup. Existing GSAP animations remain in place and `prefers-reduced-motion` behavior is preserved.

The local production browser scenario covered fresh Home loading, repeated scroll cycles, navigation to About/Services and back, and viewport interaction. It completed without freezing, overflow, or long-task observations.

## SEO and accessibility

- Localized route metadata is provided through the `[locale]` layout/pages and message namespaces.
- `src/app/sitemap.ts` emits English, Arabic, and `x-default` alternates for the five public logical pages.
- `robots.ts` remains in place and no localhost URL was introduced into the sitemap.
- The document language and direction are validated for all ten localized routes.
- Mobile navigation has an accessible button, dialog semantics, focus management, Escape handling, and inert background behavior.

Remaining limitation: production canonical host and social metadata should be verified against the final deployment domain and real social preview fetchers after deployment; no deployment was performed here.

## Asset migration

The repository already contained the prior PNG-to-WebP migration, including the tracked PNG removals and WebP replacements. No PNG was reintroduced by this continuation. The exact before/after inventory and storage totals are preserved in `TIX_FULL_AUDIT_REPORT.md`; this report does not duplicate estimates.

## Validation results

- `npm run i18n:validate` — PASS, 265 keys.
- `npm run i18n:audit` — PASS, zero configured static findings.
- `npm run typecheck` — PASS.
- `npm run lint` — PASS.
- `npm test -- --run` — PASS, 2 tests.
- `npm run build` — PASS.
- Targeted production Playwright audit/performance suite — PASS, 17/17, including `longTasks=[]`.
- Final targeted native navigation checks — PASS, 2/2 after selector corrections.
- Full Playwright suite — PASS, 44/44 against the local production server after the final assertion corrections.
- `npm audit --json` — FAIL exit status with 7 moderate findings, 0 high, 0 critical; all are in the TypeScript ESLint/minimatch development dependency chain.

## Changed files in this continuation

- `messages/en.json`, `messages/ar.json`: completed paired message keys for remaining rendered copy and Work category content.
- `src/components/contact/ContactFooter.tsx`: localized alt text, copyright, legal labels, and links.
- `src/components/native-pages/WorkContent.tsx`: localized category headings and editorial descriptions.
- `src/components/layout/Navbar.tsx`: stable language-switch class, mobile burger regression hook, and cancellable focus scheduling.
- `tests/e2e/audit.spec.ts`: Arabic English-prose leakage regression.
- `tests/e2e/native-parity.spec.ts`: aligned stale assertions with the current localized/native composition.
- `docs/audit/TIX_I18N_AND_PERFORMANCE_REPORT.md`: this report.

All other modified/deleted files shown by Git were pre-existing work from the preceding audit/migration and were preserved.

## Remaining work

Blocking:

- None identified in the local production route and targeted browser checks.

Recommended:

- Upgrade the TypeScript ESLint chain in a controlled dependency change after compatibility review.
- Add production RUM for LCP, INP, CLS, FCP, and TTFB.

Optional:

- Extend the browser leakage test from known-prose guards to a reviewed allowlist of all brand/category labels.
- Capture and archive responsive screenshots for all six requested viewport sizes in CI.

## Final verdict

**READY WITH LIMITATIONS** — the bilingual route architecture, rendered localization, RTL behavior, GSAP lifecycle hardening, and local production smoke checks are implemented and evidenced. Release confidence is limited by absent production telemetry and unresolved moderate development-only audit findings.
