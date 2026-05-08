# Acctual — Style Reference

> Architectural blueprint on white marble. Precision, clarity, and transparent flow of information.

**Theme:** light

Acctual is a clean, sharp accounting software interface, defined by abundant whitespace, crisp typography, and an almost entirely achromatic palette punctuated by a single vibrant teal accent. It feels like an impeccably organized digital ledger, where the strict logical layout and high contrast ensure every piece of financial data is immediately comprehensible. The signature element is the interplay of system sans-serif for secondary text with the bespoke Open Runde, creating a dual texture of approachability and structured precision.

## Colors

| Name         | Value     | Role                                                                                                                             |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Canvas White | `#ffffff` | Page backgrounds, card surfaces, primary text contrast.                                                                          |
| Ink Black    | `#000000` | Primary text, critical headings, strong brand emphasis. Its absolute blackness provides uncompromising legibility against white. |
| Graphite     | `#0f0f0f` | Prominent headings and body text, a slightly softer variant of Ink Black.                                                        |
| Deep Slate   | `#1e1e1`  | Secondary body text and descriptions, offering a subtle visual break from pure black without sacrificing contrast.               |
| Ash Gray     | `#8d8d8d` | Subtle text, metadata, disabled states. Provides gentle visual hierarchy.                                                        |
| Button Black | `#0d111b` | Primary action buttons, providing a solid, grounded feel against the white background.                                           |
| Sky Teal     | `#0098f2` | Interactive elements, links, checkmarks, highlights — the sole vibrant accent for key user actions and positive indications.     |
| Hot Pink     | `#f200ca` | Decorative elements or specific brand highlights within icons, a secondary accent for visual interest.                           |
| Vivid Violet | `#6d56fc` | Decorative elements or specific brand highlights within icons, alongside Hot Pink.                                               |
| Subtle Cream | `#f7fafc` | Alternative background for sections, creating subtle depth on the mostly white page.                                             |

## Typography

### sans-serif — Smallest text elements, UI labels, and highly functional information. It has a utilitarian feel which contrasts with the custom font for core content.

- **Substitute:** system-ui, 'Segoe UI', Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif
- **Weights:** 400
- **Sizes:** 12px
- **Line height:** 1.20

### Open Runde — Primary display font for headings, body text, and key content. Its distinctive features and precise letter-spacing contribute to the crisp, modern feel. The feature settings indicate careful typographic attention.

- **Substitute:** Inter
- **Weights:** 400, 500, 600
- **Sizes:** 14px, 16px, 20px, 32px, 40px, 64px
- **Line height:** 1.13, 1.20, 1.21, 1.25, 1.40, 1.43, 1.50, 1.71, 1.75
- **Letter spacing:** -0.037em at 64px, -0.030em at 40px, -0.020em at 32px, -0.012em at 20px, normal at smaller sizes
- **OpenType features:** `"blwf" on, "cv03" on, "cv04" on, "cv09" on, "cv11" on`

### Caveat — Handwritten script used for subtle accents like testimonials or decorative elements, providing a human touch to an otherwise structured interface.

- **Substitute:** Sacramento
- **Weights:** 600
- **Sizes:** 16px, 24px
- **Line height:** 1.33, 1.50

### Inter — Used for specific body text elements, likely in contexts where Open Runde might be too decorative or less performant. It fills a very specific role, avoiding the system sans-serif.

- **Substitute:** Inter
- **Weights:** 500
- **Sizes:** 14px
- **Line height:** 1.43

### Type Scale

| Role       | Size | Line Height | Letter Spacing |
| ---------- | ---- | ----------- | -------------- |
| caption    | 12px | 1.2         | —              |
| body-sm    | 14px | 1.43        | —              |
| body       | 16px | 1.5         | —              |
| subheading | 20px | 1.25        | -0.24px        |
| heading    | 32px | 1.21        | -0.64px        |
| heading-lg | 40px | 1.2         | -1.2px         |
| display    | 64px | 1.13        | -2.368px       |

## Spacing & Layout

**Base unit:** 4px

**Density:** comfortable

- **Page max-width:** 1200px
- **Section gap:** 40-80px
- **Card padding:** 24px
- **Element gap:** 4-24px

### Border Radius

- **cards:** 20px
- **badges:** 1250px
- **images:** 32px
- **buttons:** 100px

## Components

### Primary Action Button

**Role:** Call to action, e.g. 'Create an invoice'

Text: Open Runde, weight 400, color Canvas White. Background: Button Black (#0d111b). Hover/Active: No explicit hover state, implies primary color changes or subtle elevation. Radius: 100px (fully pill-shaped). Padding: 6px vertical, 14px horizontal. Shadow: Subtle dark shadow rgb(36, 38, 40) 0px 0px 0px 1px, rgba(27, 28, 29, 0.48) 0px 1px 2px 0px.

### Navigation Link

**Role:** Top navigation items

Text: Open Runde, weight 400, color Ash Gray (#8d8d8d) for inactive, Ink Black (#000000) for active/hover. No explicit styling beyond color change, relying on surrounding elements for distinction.

### Invoice Card

**Role:** Displaying invoice previews

Background: Canvas White (#ffffff). Radius: 20px. Shadow: subtle rgba(0, 0, 0, 0.06) 0px 2.5px 2.5px 0px. Internal content uses Deep Slate and Open Runde.

### Service Feature List Item

**Role:** Highlighting key features below hero

Text: Open Runde, weight 400, color Graphite (#0f0f0f). Icon: Sky Teal (#0098f2) vector checkmark. Uses 6px elementGap between icon and text.

### Small Header Button

**Role:** Secondary action in header, e.g. 'Log in'

Text: Open Runde, weight 400, color Ash Gray (#8d8d8d). No background or border, relies on text color to differentiate from primary button.

### Sign Up Header Button

**Role:** Primary action in header

Text: Open Runde, weight 400, color Canvas White (#ffffff). Background: Button Black (#0d111b). Radius: 100px. Padding: 6px vertical, 14px horizontal.

## Do's and Don'ts

### Do

- Use '#ffffff' Canvas White as the dominant page and card background color; establish visual hierarchy through subtle shade differences like '#f7fafc' for alternating sections.
- Apply Open Runde for all main headings and body text, varying weights (400, 500, 600) and sizes according to the type scale for clear hierarchy and visual appeal.
- Employ the 100px radius for all interactive buttons and pill-shaped elements to maintain a consistent soft, approachable shape.
- Utilize Sky Teal (#0098f2) exclusively for interactive elements like links and checkmarks; avoid using it for decorative purposes to preserve its accent meaning.
- Maintain generous padding, particularly 24px and 40px for section separators and major element spacing, creating a spacious and comfortable information density.
- When emphasizing short, impactful statements or testimonials, use the Caveat font for a personalized, handwritten touch.

### Don't

- Do not introduce new chromatic colors beyond Sky Teal, Hot Pink, and Vivid Violet; the design strictly adheres to an achromatic base with minimal, deliberate color accents.
- Avoid box shadows for general elevation; leverage subtle background color changes (e.g., #f7fafc) or thin borders to suggest depth and separation.
- Do not use system sans-serif for headlines or prominent body text; reserve it for small, functional UI labels where its simplicity is an asset.
- Do not deviate from the established letter-spacing values for Open Runde; these are carefully calibrated for optimal legibility at different sizes.
- Avoid dense, information-heavy sections without adequate whitespace; the design's strength lies in its spacious and clear presentation.
- Do not use multiple font sizes or weights within a single line of text unless it's a clearly defined component. Maintain typographic consistency.

## Imagery

The site uses a mix of tightly cropped, top-down product photography featuring office supplies (paperclips, pens, keyboard snippets) on a clean white desk, serving as decorative framing for UI elements. Embedded product screenshots show the invoice interface directly, providing clear, functional examples of the software. Icons are primarily line-based, monochrome (Ink Black), with occasional small fills of the brand's accent colors (Sky Teal, Hot Pink, Vivid Violet). The imagery's role is decorative atmosphere, combined with direct product showcasing to explain functionality, rather than lifestyle or abstract concepts.

## Layout

The page model is a max-width 1200px centered container, creating generous margins on larger screens. The hero section features a centered headline over a white background, flanked by decorative product photography. Sections primarily follow a consistent vertical rhythm with ample spacing (40-80px), often presenting content as centered stacks or simple two-column layouts. A subtle alternating background color ('Subtle Cream') differentiates some sections. Navigation is a fixed top bar with a logo, standard links, and 'Log in'/'Sign up' buttons. Content density is comfortable, prioritizing readability and visual breathing room.

## Similar Brands

- **Stripe** — Clean, high-contrast, mostly achromatic UI with strong typography and minimal, deliberate accent colors defining interactive elements.
- **Linear** — Emphasis on precise typography, carefully calibrated spacing, and a focus on clarity through strict visual hierarchy rather than heavy ornamentation.
- **Mercury Bank** — Modern fintech aesthetic with an abundance of whitespace, subtle grays, and a crisp, professional feeling driven by strong legibility and structured layouts.
- **Pitch** — Combines prominent, well-crafted typography with a largely neutral palette and strategic use of a single vibrant accent color to guide the eye and denote interactivity.
