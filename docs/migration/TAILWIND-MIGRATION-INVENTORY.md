# Tailwind Migration Inventory

## Baseline

Tailwind v4 is now installed through `@tailwindcss/postcss`, with the entry point in `src/app/globals.css` and TIX tokens in its `@theme` block.

| Stylesheet | Lines | Authored selector estimate | Current state |
|---|---:|---:|---|
| `public/css/tokens.css` | 383 | 17 | Legacy token/reveal compatibility; foundational rules are being replaced by Tailwind. |
| `public/css/components.css` | 1,496 | 174 | Shared legacy components; not yet migrated. |
| `public/css/home.css` | 2,932 | 380 | Home page legacy styling; not yet migrated. |
| `public/css/about.css` | 1,618 | 218 | Studio legacy styling remains for non-Touchpoints sections; Touchpoints now has Tailwind utility ownership in TSX. |
| `public/css/services.css` | 859 | 106 | Services legacy styling; not yet migrated. |
| `public/css/work.css` | 1,018 | 138 | Work legacy styling; not yet migrated. |
| `public/css/contact.css` | 652 | 86 | Contact legacy styling; not yet migrated. |

## Migrated in this increment

- Tailwind v4/PostCSS foundation and TIX design tokens.
- Touchpoints full-width desktop layout and responsive portrait mobile layout.
- Touchpoints heading, subtitle, logo, four card geometry, top chevron, bottom chevrons, and responsive sizing are authored with Tailwind utilities in `AboutContent.tsx`.
- Touchpoints motion remains GSAP-owned; Tailwind does not animate GSAP-controlled transforms, opacity, or filters.

## Explicit remaining exceptions

The seven legacy public stylesheets are still linked by `src/app/layout.tsx` because Home, Services, Work, Contact, Navbar, Footer, and the remaining Studio sections have not yet been converted to utility classes. They are preserved intentionally to avoid a cross-route visual regression during the staged migration. They must not be removed until each selector is replaced and the corresponding route screenshots and Playwright checks pass.
