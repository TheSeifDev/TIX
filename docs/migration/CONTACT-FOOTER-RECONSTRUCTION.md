# Contact Page Reconstruction

## Asset

- Source: `assets/images/contact_boy.png`
- Derivatives: `assets/images/contact_boy.webp` and `public/assets/images/contact_boy.webp`
- Conversion: Sharp WebP, quality 92, alpha quality 100
- Source and derivative dimensions: 832 × 833
- Transparency: verified with Sharp metadata (`channels: 4`, `hasAlpha: true`)

## React integration

The native `/contact` route now renders one continuous composition in this order:

1. `ContactHero.tsx` — compact patterned introduction with the TIX mark, two-by-two discipline labels, and right-aligned supporting copy.
2. `ContactContent.tsx` — the existing validated form and API submission behavior, with the `Start The Project →` submit CTA restored to the bottom of the form panel.
3. `ContactFooter.tsx` — split headline, centered transparent character, red contact-information panel, social links, and legal row.

`SitePage` skips the generic contextual image footer for Contact, preventing duplicate footer content while leaving every other route unchanged.

The composition uses Tailwind utilities and real React elements for the hero, form, split headline, red panel, transparent character, contact data, social links, and legal row. The supplied legacy project values are retained: `tix@gmail.com`, Alexandria/Elraml Station, Agami/Elbetash, and the existing social URLs.

## Reference viewport treatment

The supplied Figma capture is a compact portrait frame (approximately 376 × 856 CSS pixels in the editor capture). The portrait breakpoint is implemented as a fixed-composition responsive band: 232px hero, 240px form panel, and 384px character/contact section. This preserves the measured vertical relationships without stretching the portrait frame across desktop. Wide viewports use the same hierarchy with full-width, readable scaling and the existing desktop footer composition.

The footer composition uses one relative/isolate coordinate system. At the 862 × 880 footer reference capture, the red panel begins at approximately 36% of the composition height, the character’s visible silhouette is centered on the same axis, and the contact/social grid shares the panel’s horizontal bounds with inner padding. The WebP’s visible alpha bounds are 445 × 698 inside its 832 × 833 source; the CSS wrapper is sized and positioned against that visible silhouette so both feet meet the panel naturally.

## Validation

The complete Contact page was inspected at 1440 × 900 and 390 × 844. The WebP loads with `image/webp`, the hero is not obscured by the fixed navigation, and no horizontal overflow was observed. Contact form behavior remains on the existing API path. The current browser regression suite passes all 26 tests.
