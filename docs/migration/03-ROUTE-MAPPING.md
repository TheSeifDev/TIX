# Route mapping

| Public URL | App Router source | Legacy source |
|---|---|---|
| `/` | `src/app/page.tsx` | `index.html` |
| `/ar` | `src/app/ar/page.tsx` | `ar/index.html` |
| `/about` | `src/app/about/page.tsx` | `legacy-pages/about.html` |
| `/services` | `src/app/services/page.tsx` | `legacy-pages/services.html` |
| `/work` | `src/app/work/page.tsx` | `legacy-pages/work.html` |
| `/contact` | `src/app/contact/page.tsx` | `legacy-pages/contact.html` |

Legacy compatibility redirects remain for `/index.html`, `/ar/index.html`, and all four `/pages/*.html` URLs. They permanently redirect to the clean routes above.
