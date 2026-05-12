# The Advance Group Website Backlog

Last updated: 2026-05-12

## Launch-Critical

- Implement real contact form backend.
- Audit and approve all content in `lib/data.ts`.
- Collect approved team photos and testimonial quotes, or keep placeholders/removals intentional.
- Add `/news/[slug]` pages or make news cards non-clickable if details are not launch scope.
- Replace default favicon/public assets with TAG-branded assets.
- Run local, staging, and production smoke tests.
- Confirm Vercel vs Render and configure production domain.

## High Value

- Add sitemap, robots, canonical metadata, and social share metadata.
- Add production analytics if approved.
- Add form submission notifications and anti-spam controls.
- Add custom 404 page.
- Add launch checklist to README.

## Nice To Have

- CMS-backed news/careers.
- Admin-friendly content editing.
- Case studies/client story pages.
- More granular service landing pages for SEO.
- Automated Lighthouse CI.

## Parallelization Boundaries

- Contact backend can be implemented in parallel with content audit once destination is known.
- Visual asset replacement can happen in parallel with `/news/[slug]`.
- Domain/DNS work should wait until build, content, and form gates are green.
