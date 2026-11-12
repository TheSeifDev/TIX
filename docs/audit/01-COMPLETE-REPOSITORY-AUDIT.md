# Phase 01 — complete repository audit

## Findings

- The site is globally initialized from one `DOMContentLoaded` listener in `js/main.js` plus layout injection in `js/layout.js`.
- Several scroll modules attach listeners and observers without an explicit teardown API; this is acceptable for a full-document legacy page but is a migration risk for client route transitions.
- The contact form previously simulated success without server delivery. It now calls `POST /api/contact` and reports provider/configuration failures honestly.
- The CSS contains a missing fallback asset reference: `css/home.css:2082` → `hero-girl-bg.jpg`.
- Static asset references include mixed-case filenames (`JPG`, `PNG`); Linux case sensitivity must remain covered by link tests.

## Migration strategy

The first migration preserves legacy markup and behavior in a typed App Router shell. This establishes URL and visual parity before splitting the document into React components. The next audit pass should use browser coverage and route-by-route screenshots before deleting or consolidating legacy modules.
