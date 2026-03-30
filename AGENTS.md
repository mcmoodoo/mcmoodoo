# AGENTS.md

Repository: mcmoodoo (Astro + React + Tailwind + DaisyUI)

This file records implementation notes, task tracking, and decisions to accelerate future contributions.

## Quickstart
- Node: v24.x recommended (CI uses Node 22 for stability)
- Install: npm install
- Dev: npm run dev
- Build: npm run build (outputs to dist/)

## Current status (Mar 30, 2026)
- Build succeeds locally (17 pages).
- CI: GitHub Actions workflow added to build on push/PR.
- RSS: Links now honor `template.base` for subpath deployments.
- Web App Manifest: Icon paths corrected to existing files.
- Favicon cleanup: Removed references to missing 16px/32px icons.
- Clarity Worker: Model upgraded to `gpt-4o-mini` (from `gpt-4-0613`).

## Task tracking
- T-002: Setup, install dependencies, validate dev/build — DONE
  - Installed deps, built successfully; noted 23 npm advisories (1 critical).
- T-003: Identify and prioritize improvements — IN PROGRESS
  - Completed quick wins above; backlog below for next picks.
- T-004: Select and implement first improvement — TODO (await choice)
- T-005: Add tests/CI improvements and docs — TODO

## Improvement backlog (prioritized)
1) Standardize package manager
   - Decide on npm; add `"packageManager": "npm@<version>"` in package.json; remove `bun.lock` to avoid confusion.
2) CI/QA hardening
   - Add `astro check` and link checking (e.g., lychee) to CI.
3) Security maintenance
   - Run `npm audit fix` and selectively bump vulnerable deps; re-verify build.
4) Per-post social images
   - Extend content schema for optional image; wire into `Head.astro` for OG/Twitter.
5) Lint/format consistency
   - Add ESLint + Prettier + `npm run format` + pre-commit hook.
6) Deployment/docs cleanup
   - Confirm if `render.yaml` (Rust clarity service) is still relevant; document clarity Worker deployment with Wrangler; update README with quickstart, deployment notes, and clarity details.

## Conventions and notes
- Paths and base
  - RSS and pages derive slugs via `template.base`; subpath deploys (e.g., GitHub Pages) should work.
- Content
  - Blog posts in `src/content/BlogPosts`; sorting by date desc.
- Theming
  - DaisyUI themes + dark/light controller; Head script sets theme early to avoid flashes.
- Analytics
  - Vercel Analytics included in Layout.

## Open questions
- Is `render.yaml` still used? If not, remove/replace.
- Deployment targets besides Vercel (e.g., GitHub Pages)?
- Preference on package manager standardization (npm vs bun).

## Next steps proposal (pick 1–2)
- A) Standardize on npm and remove `bun.lock`.
- B) CI/QA: add `astro check` + link checker.
- Then C) Per-post OG images.
