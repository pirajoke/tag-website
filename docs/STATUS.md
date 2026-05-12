# The Advance Group Website Status

Last updated: 2026-05-12

## Current Phase

Visual polish plus production hardening. The MVP exists and builds, and the latest local working version now includes the revised About video block, testimonial marquee, and compact footer. It is not launch-ready until contact capture, approved content/assets, and launch QA are finished.

## Current Visual Baseline

- User-confirmed current public reference: `https://tag-website-orpin.vercel.app`
- Latest local preview reference when running: `http://127.0.0.1:3010`
- Local preview session target: `tmux` session `tag-website-preview` (not running at the latest recall)
- Latest direct Vercel deployment noted in memory: `https://tag-website-mbbmns7yj-pirajokes-projects.vercel.app` (may require Vercel SSO)
- Local codebase: `/Users/pirajoke/tag-website`
- Current client-logo marquee work is in `components/sections/ClientsMarquee.tsx` and is intended to sit immediately after the hero on the home page.
- Current visual polish touches:
  - `components/sections/AboutTeaser.tsx` for the Donovan Richards video-styled block.
  - `components/sections/Testimonials.tsx` for the two-row testimonial marquee.
  - `components/layout/Footer.tsx` for the more compact footer layout.

## Verified Today

- `git remote -v` shows `origin` at `https://github.com/pirajoke/tag-website.git`.
- `npm run lint` exits 0 with 0 warnings.
- `npm run build` passes on Next.js 16.2.4 and prerenders 18 pages.
- Local preview at `http://127.0.0.1:3010/` returns `200 OK`.
- User-confirmed public alias `https://tag-website-orpin.vercel.app` returns `200 OK`.
- `npx playwright test` passes locally against `next start`: 14 passed.
- Existing Playwright tests cover route smoke, contact form presence, navigation, chat button, and service detail page.
- Missing local team image references were removed from `lib/data.ts`; the About page currently uses initials placeholders until approved photos exist.

## Next Task

Use `https://tag-website-orpin.vercel.app` as the current visual reference, then start Milestone 2 in `docs/PLAN.md`: make contact and lead capture real.

## Assumptions

- The production target is still the main public site replacement for `theadvancegroup.com`.
- Vercel is likely the intended host because `.vercel/` exists, but `render.yaml` also exists and hosting choice needs confirmation before launch.
- Content in `lib/data.ts` is not automatically client-approved.

## Blockers

- Real team photos and approved testimonials are not present in `public/`.
- Contact form destination is not specified.
- Final hosting/domain decision needs confirmation before DNS changes.

## Audit Log

- 2026-05-09: User confirmed `https://tag-website-3s8zme175-pirajokes-projects.vercel.app` as the main working website version/reference.
- 2026-05-09: Created execution plan, status, test plan, and backlog for finishing the site.
- 2026-05-09: Completed Milestone 1 technical cleanup: lint is warning-free, build passes, local Playwright passes, and missing team image references were removed.
- 2026-05-12: Added local visual polish for About video presentation, testimonial marquee, and compact footer; lint and production build pass.
- 2026-05-12: User confirmed `https://tag-website-orpin.vercel.app` as the current public website version/reference.
