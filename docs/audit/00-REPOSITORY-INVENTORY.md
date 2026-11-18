# Phase 00 — repository inventory

The repository is a static HTML/CSS/ES module site with 5 HTML documents plus the root and Arabic home documents, 7 CSS files, `js/layout.js`, `js/main.js`, SEO/deployment text files, and 197 image assets. The measured image payload is 136,951,179 bytes.

The asset source remains under `assets/images/`; runtime copies are under `public/assets/images/` for Next.js static delivery. Original HTML sources are under `index.html`, `ar/index.html`, and `legacy-pages/`.

The initial source uses custom animation modules including `Reveal`, `Parallax`, `WorkGallery`, `WorkLens`, `DisruptPin`, `TouchpointFlight`, `Lightbox`, and `PortfolioOverlay`. No GSAP dependency existed at preflight.
