# The Advance Group Mobile Version Plan

Last updated: 2026-05-12

## Goal

Create a deliberate mobile version of the TAG site without flattening the desktop design. Mobile work should be tracked separately, with each section checked at 390px, 430px, 768px, and desktop after every major pass.

## Current Mobile Track

Status: Started.

Started scope:
- Home page bottom flow: reduce the ivory gap before the footer so the footer reads as a full brown end-state when scrolling down.
- About teaser: tighten mobile spacing and scale the video/stat card down cleanly.
- Testimonials: constrain marquee card width to fit narrow screens.
- Footer: add mobile-first layout, full-width CTA buttons, safer column flow, and accessible scroll-to-top label.

## Phase 1: Home Mobile Foundation

Definition of done:
- Header, hero, clients, services, About, testimonials, news, and footer fit without horizontal scroll at 390px.
- Main CTAs are tappable with stable height and no text overflow.
- Footer fills the bottom of the home page visually and does not leave a large ivory gap above it.

Validation:
- `npm run lint`
- `npm run build`
- Playwright screenshots at 390x844 and 430x932 for `/`.

## Phase 2: Navigation And Core Pages

Tasks:
- Audit mobile menu spacing, tap targets, and close behavior.
- Review `/about`, `/services`, `/projects`, `/clients`, `/news`, `/careers`, and `/contact` at phone widths.
- Make page hero typography and section spacing consistent across mobile pages.

## Phase 3: Forms, Maps, And Interactive Sections

Tasks:
- Make the contact form efficient on mobile keyboards.
- Verify map controls and external map link on mobile.
- Check marquee/reduced-motion behavior for mobile performance.
- Confirm chat widget placement does not block CTAs or footer controls.

## Phase 4: Launch QA

Tasks:
- Run route smoke tests against local and Vercel deployments.
- Capture before/after mobile screenshots.
- Fix content approval issues separately from layout issues.
