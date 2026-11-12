# Contact Footer Reconstruction

## Asset

- Source: `assets/images/contact_boy.png`
- Derivatives: `assets/images/contact_boy.webp` and `public/assets/images/contact_boy.webp`
- Conversion: Sharp WebP, quality 92, alpha quality 100
- Source and derivative dimensions: 832 × 833
- Transparency: verified with Sharp metadata (`channels: 4`, `hasAlpha: true`)

## React integration

`ContactFooter.tsx` is rendered only inside the native `/contact` page. `SitePage` skips the generic contextual image footer for Contact, preventing duplicate footer content while leaving every other route unchanged.

The composition uses Tailwind utilities and real React elements for the CTA, split headline, red panel, transparent character, contact data, social links, and legal row. The supplied legacy project values are retained: `tix@gmail.com`, Alexandria/Elraml Station, Agami/Elbetash, and the existing social URLs.

## Validation

The Contact footer was inspected at 1440 × 900 and 390 × 844. The WebP loads with `image/webp` and no horizontal overflow was observed. Contact form behavior remains on the existing API path.
