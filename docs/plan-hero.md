# Plan: Landing Page — Navigation, Hero & Features Bento Grid

> Status: **Approved** — Implementation ready

---

## References

- **`.docs/design.md`** — Acctual style guide (clean, light, achromatic + Sky Teal accent, Open Runde typography, pill-shaped buttons, generous whitespace, max-width 1200px)
- **`shadcn-ui` skill → `references/typography.md`** — `Typography.Title` & `Typography.Text` component pattern with `cva` variant system
- **`21st.dev`** — Inspiration for Hero (102 components) and Bento Grid (11 components): browse `https://21st.dev/s/hero-section` and `https://21st.dev/s/bento-grid`
- **`Use Skills`** - shadcn-ui, tailwind-design-system v4, frontend-design, next-bext-practices
- **`Components`** - Navigation: npx shadcn@latest add https://21st.dev/r/sshahaider/header-2, Bento Grid: npx shadcn@latest add https://21st.dev/r/sshahaider/grid-feature-cards,

---

## Files to Create

| File                                                           | Purpose                                            |
| -------------------------------------------------------------- | -------------------------------------------------- |
| `src/components/ui/typography/typography.tsx`                  | Typography component (Title + Text sub-components) |
| `src/components/ui/typography/index.ts`                        | Barrel export                                      |
| `src/components/layouts/navigation.tsx`                        | Top navigation bar                                 |
| `src/features/landing/components/hero-section.tsx`             | Hero section                                       |
| `src/features/landing/components/features-section.tsx`         | Bento grid feature cards                           |
| `src/features/landing/components/__tests__/home-page.test.tsx` | Integration test                                   |

## Files to Modify

| File                  | Change                                        |
| --------------------- | --------------------------------------------- |
| `src/app/layout.tsx`  | Update metadata, include `<Navigation />`     |
| `src/app/page.tsx`    | Replace placeholder with sections             |
| `src/config/paths.ts` | Add `movies.getHref()` and `search.getHref()` |

---

## Component Architecture

```
RootLayout (Server)
├── Navigation (Client)
│   ├── Logo → /
│   ├── My Movies → /movies
│   ├── Search → /search
│   └── Get Started → /movies
│
└── HomePage (Server)
    ├── HeroSection
    │   ├── Typography.Title "1/extrabold" — "FilmGueh"
    │   ├── Typography.Text "lg/normal" — Tagline
    │   ├── Typography.Text "md/normal" — Value prop
    │   └── Button variant="default" size="lg" → /movies
    │
    └── FeaturesSection (Bento Grid)
        ├── Database Lengkap — TMDB + OMDb search
        ├── Koleksi Pribadi — Save & categorize
        ├── Statistik Menarik — Dashboard (spans 2 cols)
        └── Lainnya — Rating, notes, filter, sort
```

---

## Design Alignment (from `design.md`)

Should match the design specs in `design.md` for typography, colors, spacing, and layout. Use Tailwind utility classes and `cva` variants to ensure consistency. The Hero section should have a clean, light look with ample whitespace, and the Bento grid should be visually balanced with clear icons and concise text.

---

## TDD Tasks (test-first)

1. **Typography component** — renders correct HTML tag (h1-h6, p/span), applies variant classes
2. **paths.ts routes** — `movies.getHref()` returns `/movies`, `/movies?category=watched`; `search.getHref("inception")` returns `/search?q=inception`
3. **Navigation &Footer** — renders logo, links, CTA; links have correct hrefs
4. **HeroSection** — renders "FilmGueh", "Get Started" → `/movies`, tagline, subtitle
5. **FeaturesSection** — renders all 4 feature cards with icon, title, description
6. **HomePage integration** — `renderApp(<HomePage />)` finds all key text
7. **layout metadata** — static export, no test needed

---

## Verification

```bash
npm test
npm run lint
npm run check-types
npm run build
```
