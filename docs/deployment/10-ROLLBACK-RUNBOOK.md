# Rollback runbook

Before production release, preserve the last known-good deployment and use Vercel's deployment promotion/rollback controls. Until then, restore the previous Git commit on `main` only through an approved, non-force-push change.
