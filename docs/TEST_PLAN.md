# The Advance Group Website Test Plan

Last updated: 2026-05-12

## Local Gates

- `npm run lint`
  - Required result before launch: 0 errors, 0 warnings.
- `npm run build`
  - Required result before launch: successful production build.
- `PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test`
  - Required result before launch: all smoke tests pass against local build/dev server.
- Manual visual check for the home page About video block, testimonial marquee, and footer at desktop and mobile widths.

## Staging Gates

- `PLAYWRIGHT_BASE_URL=<staging-url> npx playwright test`
- Manual route pass:
  - `/`
  - `/about`
  - `/services`
  - `/services/lobbying`
  - `/clients`
  - `/careers`
  - `/news`
  - `/contact`
- Manual interaction pass:
  - Header nav desktop and mobile.
  - Hero scroll interaction.
  - Services tabs/cards.
  - Client filters.
  - News filters and, once added, news detail links.
  - Contact form success and failure.
  - Chat widget behavior or confirmed removal.
  - Map controls and external Google Maps link.

## Production Gates

- Production URL loads with HTTPS.
- `www` and apex domain resolve to the same canonical site.
- Contact form delivers to the approved destination.
- Social links and phone/email links work.
- Sitemap and robots are reachable.
- Lighthouse checked for Home, About, Services, News, and Contact on mobile and desktop.

## Accessibility Checks

- Keyboard navigation reaches all interactive controls.
- Focus state is visible.
- Form fields have labels and validation messages.
- Image alt text is meaningful or decorative images are hidden appropriately.
- Color contrast passes for navy/forest/gold/ivory combinations.
- Motion-heavy sections do not block reduced-motion users.

## Content Checks

- Team names/titles/bios approved.
- Testimonials approved or removed.
- Client names approved for display.
- Address, phone, email, and social links verified.
- Careers content is real or intentionally evergreen.
- News articles are real, dated, and have detail pages if kept as clickable content.
