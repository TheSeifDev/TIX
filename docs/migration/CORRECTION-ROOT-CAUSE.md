# Migration correction root-cause report

## Evidence collected

At checkpoint `ad31e02`, every route rendered `LegacyPage`, which used `dangerouslySetInnerHTML` to insert the body from the archived HTML files. The same component then loaded `/js/layout.js` and `/js/main.js` with Next `afterInteractive` scripts.

In a real Chromium run against the local app, the scripts existed in the DOM, but `#main-nav` had zero matches while the homepage hero had one match. There were no browser console errors. The reason is lifecycle ordering: both legacy files register their initialization inside `document.addEventListener('DOMContentLoaded', ...)`, but Next loads them after the document event has already fired. Their initialization callbacks therefore never execute. This explains the missing navbar and all missing legacy interaction initialization.

## Homepage visual regression

The page was not a native React tree; it depended on the legacy injector for the shared layout and on post-load global script initialization for reveal/parallax/pinboard behavior. Static CSS and body markup could render, but layout, active navigation, footer, and animation state were not controlled by React. The current correction generates native JSX content from the archived source and renders the navbar/footer as React components, with React lifecycle effects for interactions and GSAP-scoped reveal animations.

## Correction

- Public routes no longer import `LegacyPage`.
- `Navbar`, `ContextualFooter`, `SitePage`, and `LanguageAttributes` own the shared layout.
- Each route imports its own generated native page component.
- No runtime legacy HTML fetch, iframe, `dangerouslySetInnerHTML`, `layout.js`, or `main.js` is used by the public route tree.
- The archived source remains under `legacy-pages/` for comparison and verification.
