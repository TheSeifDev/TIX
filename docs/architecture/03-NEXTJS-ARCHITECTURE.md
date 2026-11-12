# Next.js architecture

The application uses the App Router under `src/app/`. Server Components load the existing HTML body from `legacy-pages/` and render it into a parity shell. `js/layout.js` and `js/main.js` are loaded as client scripts to preserve existing interactions while route-by-route React extraction proceeds.

The contact endpoint is a server route at `src/app/api/contact/route.ts`. Static assets are copied to `public/`. Security headers are configured in `next.config.ts`.
