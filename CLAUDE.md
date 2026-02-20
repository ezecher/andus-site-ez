# Andus Labs Site

## Stack
Next.js 16 + Tailwind v4 (CSS-first, `@theme` in globals.css) + Sanity v3 + Framer Motion

## Commands
- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- Sanity Studio available at `/studio`

## Project Layout
```
src/
  app/
    (site)/          # Main site routes (wrapped with Header+Footer in layout.tsx)
      page.tsx        # Homepage
      human-os/       # Human OS page
      approach/       # Approach page
      team/           # Team page
      field-notes/    # Field Notes page
      contact/        # Contact page (HubSpot form)
    studio/           # Sanity Studio (own layout, no Header/Footer)
    api/draft-mode/   # Draft mode enable endpoint for Sanity Presentation
    actions.ts        # Server actions (disableDraftMode)
  sanity/
    schemas/          # Sanity document schemas
    lib/
      client.ts       # Sanity client config
      live.ts         # defineLive — exports sanityFetch, SanityLive
      queries.ts      # All GROQ queries
  components/
    shared/           # Header, Footer, Button, SectionWrapper, HubSpotForm, DisableDraftMode
    approach/         # MaturityModel, OfferingsGrid, PatternMatch/
    home/             # Homepage sections
    human-os/         # Human OS sections
  types/index.ts      # All TypeScript interfaces
scripts/
  seed-sanity.mjs     # Data seeding script
```

## CMS Pattern
Every page uses `sanityFetch` with a fallback:
```tsx
let p = fallback;
try {
  const { data } = await sanityFetch({ query: PAGE_QUERY });
  if (data) p = data;
} catch { /* fallback */ }
```
Singletons (homePage, humanOsPage, approachPage, siteSettings) are configured in `sanity.config.ts` with custom structure.

## Environment Variables (.env.local)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — 8o5q0qvv
- `NEXT_PUBLIC_SANITY_DATASET` — production
- `NEXT_PUBLIC_SANITY_API_VERSION` — 2026-02-17
- `SANITY_API_TOKEN` — editor token (keep secret)

## Gotchas
- Directory has spaces in path — always quote paths
- Tailwind v4 uses `@theme` directive in `globals.css`, no `tailwind.config.js`
- HubSpot forms use newer `hs-form-frame` embed (NOT `hbspt.forms.create()`)
- Sanity live preview requires draft mode cookie — enable via Presentation tool or `/api/draft-mode/enable`
