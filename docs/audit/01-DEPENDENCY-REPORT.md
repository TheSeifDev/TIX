# Dependency report

Before migration there was no `package.json` or lockfile. The project now uses a reproducible npm dependency graph for Next.js, React, TypeScript, Zod, GSAP, Vitest, and Playwright. `npm install` completed successfully.

`npm audit --audit-level=high` completed with no high or critical findings, but reported 7 moderate transitive `minimatch` findings through the TypeScript ESLint parser chain. `npm audit fix --force` was not used because npm reported a breaking parser downgrade; this remains an explicit Phase 08 follow-up.
