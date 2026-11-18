# Bug registry

| ID | Severity | Location | Finding | Status |
|---|---|---|---|---|
| TIX-001 | High | Contact form / `js/main.js` | Submit displayed a success state without server delivery. | Fixed in migration; provider configuration still required. |
| TIX-002 | Medium | `css/home.css:2082` | Fallback references missing `hero-girl-bg.jpg`. | Open; requires visual asset decision. |
| TIX-003 | Medium | Legacy animation modules | Scroll listeners/observers have no component teardown boundary. | Open; addressed in GSAP/client-boundary phase. |
| TIX-004 | Informational | Legacy source layout | Root `pages/` conflicts with Next App Router. | Resolved by moving source to `legacy-pages/`. |
