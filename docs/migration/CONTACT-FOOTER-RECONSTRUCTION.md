# Contact Page Reconstruction

## Asset

- Source: `assets/images/contact_boy.png`
- Derivatives: `assets/images/contact_boy.webp` and `public/assets/images/contact_boy.webp`
- Conversion: Sharp WebP, quality 92, alpha quality 100
- Source and derivative dimensions: 832 × 833
- Transparency: verified with Sharp metadata (`channels: 4`, `hasAlpha: true`)

## React integration

The native `/contact` route now renders one continuous composition in this order:

1. `ContactHero.tsx` — patterned introduction with the “What do you want the world to feel?” message, TIX mark, and discipline labels.
2. `ContactContent.tsx` — the existing validated form and API submission behavior, with the `Start The Project →` submit CTA restored to the bottom of the form panel.
3. `ContactFooter.tsx` — split headline, centered transparent character, red contact-information panel, social links, and legal row.

`SitePage` skips the generic contextual image footer for Contact, preventing duplicate footer content while leaving every other route unchanged.

The composition uses Tailwind utilities and real React elements for the hero, form, split headline, red panel, transparent character, contact data, social links, and legal row. The supplied legacy project values are retained: `tix@gmail.com`, Alexandria/Elraml Station, Agami/Elbetash, and the existing social URLs.

## Validation

The complete Contact page was inspected at 1440 × 900 and 390 × 844. The WebP loads with `image/webp`, the hero is not obscured by the fixed navigation, and no horizontal overflow was observed. Contact form behavior remains on the existing API path. The current browser regression suite passes all 26 tests.
