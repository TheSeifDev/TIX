# WebP conversion report

Sharp converted 197 eligible PNG/JPG/JPEG assets to WebP derivatives at quality 82 with alpha quality 90. Original assets remain unchanged under `assets/images/`. Derivatives are present under both `assets/images/` and `public/assets/images/`. Application source references in `src/` and `css/` were scanned and synchronized; public CSS was refreshed from the source CSS.

The missing `hero-girl-bg.jpg` is not an eligible conversion candidate because no source file exists. It is an unused legacy CSS fallback selector and remains documented rather than being replaced with an arbitrary image.
