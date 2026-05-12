# The Advance Group Website Completion Plan

Last updated: 2026-05-12

## Goal

Ship the Next.js rebuild of The Advance Group website as a production-ready replacement for the current Wix site.

## Current State

- MVP pages exist: Home, About, Services, service detail pages, Clients, Careers, News, Contact.
- Build passes with `npm run build`.
- Lint passes with 0 warnings.
- Home visual polish now includes the revised About video block, two-row testimonial marquee, and compact footer.
- Local Playwright smoke suite passes against `next start`.
- Vercel/project wiring appears present: `.vercel/`, `render.yaml`, and `origin` remote exist.
- Main remaining risk is not page count. It is production readiness: real assets, truthful/approved content, working form, performance/accessibility, and launch plumbing.

## Milestone 1: Stabilize The Current Build

Status: Completed on 2026-05-09.

Definition of done:
- `npm run lint` has 0 warnings.
- `npm run build` passes.
- No references to missing local image files remain.

Tasks:
- Replace remaining raw `<img>` usages in `components/sections/Testimonials.tsx` and `components/ui/logo-carousel.tsx` with `next/image`, or document why they must stay raw.
- Fix missing dependency warnings in `components/ui/map.tsx`.
- Decide how team images should behave until real approved photos exist: either add approved files under `public/images/team/` or remove broken image references from `lib/data.ts`.
- Smoke-check all routes after the fixes.

Validation:
- `npm run lint`
- `npm run build`
- `PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test`

## Milestone 2: Make Contact And Lead Capture Real

Status: Next.

Definition of done:
- Contact form sends a real message to an approved destination.
- Failure, loading, success, and validation states are visible and accessible.
- Spam/abuse risk is reduced.

Tasks:
- Choose target: email provider, webhook, CRM, or simple server-side API route.
- Add `app/api/contact/route.ts` or approved integration equivalent.
- Add required environment variables and document them.
- Replace fake `setSubmitted(true)` behavior in `app/contact/page.tsx`.
- Add basic server-side validation and rate-limit/captcha decision.
- Add Playwright coverage for success and failure paths where feasible.

Validation:
- Manual form submission to real destination in staging.
- `npm run build`
- Contact form e2e/smoke test.

## Milestone 3: Content, Legal, And Client Approval

Definition of done:
- Every claim, testimonial, team bio, client list item, and news item is either sourced, approved, or removed.
- Client has reviewed the full site content.

Tasks:
- Audit `lib/data.ts` for invented or risky claims.
- Verify address, phone, email, social links, team titles, services, and client names.
- Replace placeholder-looking testimonials with approved quotes, or remove testimonial section before launch.
- Confirm whether public officials/client names can be shown.
- Review Careers page: real openings only, or convert to evergreen hiring/internship copy.
- Add final approved copy lock date to `docs/STATUS.md`.

Validation:
- Human client/content review.
- Link click-through check for all external URLs.

## Milestone 4: Finish Missing Product Surface

Definition of done:
- Website feels complete, not MVP-shaped.

Tasks:
- Add individual news detail pages at `/news/[slug]`.
- Add empty/404 behavior for invalid service/news slugs.
- Add sitemap, robots, canonical metadata, and social share images.
- Decide whether the chat widget is real enough for launch. Connect it to contact/backend or remove it.
- Replace default public assets and favicon with TAG-branded assets.

Validation:
- `npm run build` route output includes expected static pages.
- Manual navigation test across desktop and mobile.

## Milestone 5: Performance, Accessibility, And Responsive QA

Definition of done:
- Site is usable and polished on mobile, tablet, and desktop.
- Lighthouse has no launch-blocking issues.

Tasks:
- Run Lighthouse for Home, Services, About, Contact, and News.
- Fix LCP/image issues, color contrast issues, focus states, and heading structure.
- Verify header, hero scroll interaction, cinematic footer, map, and carousels on mobile.
- Check reduced-motion behavior for heavy animation sections.
- Optimize or self-host launch-critical imagery where appropriate.

Validation:
- Lighthouse desktop and mobile reports.
- Playwright screenshots or manual visual QA at 390px, 768px, 1440px.
- `PLAYWRIGHT_BASE_URL=<staging-url> npx playwright test`

## Milestone 6: Deploy, Domain, And Launch

Definition of done:
- Production domain serves the new site with rollback path.

Tasks:
- Confirm production host: Vercel is preferred unless Render is intentionally used.
- Configure production env vars for contact backend.
- Configure domain/DNS for `theadvancegroup.com` and `www.theadvancegroup.com`.
- Add redirects from old Wix URLs if known.
- Add analytics only if approved.
- Prepare rollback plan to old Wix or previous deploy.

Validation:
- Production `npm run build` equivalent passes in CI/host.
- `npx playwright test` against production URL.
- Manual form submission on production.
- DNS, HTTPS, canonical URL, and redirect checks.

## Execution Order

1. Milestone 1, because it removes known technical warnings and broken asset risk.
2. Milestone 2, because a business site without working lead capture is not launch-ready.
3. Milestone 3, because unapproved political/client content is a real reputational risk.
4. Milestone 4, because it completes the visible product surface.
5. Milestone 5, because performance/accessibility work is clearer once content and assets are stable.
6. Milestone 6, because launch should happen only after technical and content gates are green.
