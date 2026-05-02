---
name: IITB Sustainability Grid
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414844'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#002842'
  on-tertiary: '#ffffff'
  tertiary-container: '#003f63'
  on-tertiary-container: '#59adef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#94ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 32px
  gutter: 24px
  card-padding: 24px
  section-gap: 48px
---

## Brand & Style

This design system is built on the principles of **Ecological Dataism**—the intersection of rigorous academic research and environmental stewardship. The brand personality is authoritative and institutional yet remains accessible and motivating for the student body. 

The chosen style is **Modern Corporate with Tactile Accents**. It utilizes a clean, grid-based structure to handle complex data, but incorporates soft "glass" layers and vibrant progress indicators to prevent the UI from feeling sterile. The emotional response should be one of "Informed Optimism": providing students with the hard data they need to understand environmental impact while using gamified elements to encourage positive behavioral change.

- **Minimalist Layout:** Heavy use of whitespace to ensure data density doesn't lead to cognitive overload.
- **Data-Forward:** Charts and metrics are the primary visual drivers.
- **Engaging Gamification:** Use of high-quality badges and progress visualization to drive student participation.

## Colors

The color palette is anchored in **Deep Forest Greens** to represent sustainability and the lush environment of the IIT Bombay campus. 

- **Primary (#1B4332):** A deep, scholarly green used for primary navigation and high-level headers. It provides the "Institutional" weight.
- **Secondary (#2D6A4F):** A more vibrant forest green used for success states, progress bars, and active buttons.
- **Accent Blue (#0077B6):** A crisp water-inspired blue used specifically for data visualization and interactive "data-drilling" elements. This differentiates general navigation from information exploration.
- **Neutral (#F8F9FA):** A "Crisp White" background that maintains a laboratory-clean feel, allowing the green and blue data points to pop.

## Typography

The typography strategy focuses on clarity and modern academic aesthetics. 

**Plus Jakarta Sans** is used for all headlines. Its slightly wider stance and modern curves feel optimistic and contemporary, perfect for a forward-thinking student dashboard.

**Inter** is the workhorse for all body text and data labels. It is chosen for its exceptional readability in data-dense environments and its neutral, utilitarian character which balances the more expressive headline font. Labels utilize increased letter spacing and uppercase styling to provide clear structural markers for data categories.

## Layout & Spacing

This design system employs a **12-column Fixed Grid** layout for desktop, transitioning to a fluid single-column for mobile. 

The rhythm is based on an **8px linear scale**. 
- **Dashboard Modules:** Cards should span 3, 4, 6, or 12 columns depending on data complexity.
- **Margins:** A generous 32px outer margin ensures the content feels prestigious and uncrowded.
- **Gutters:** 24px gutters provide clear separation between distinct data modules, preventing visual bleeding of charts.

## Elevation & Depth

To maintain a "Professional yet Engaging" feel, we use **Tonal Layering** combined with **Soft Ambient Shadows**. 

The background is a flat neutral. Primary data cards use a white surface with a very subtle 1px border (#E9ECEF) and a soft, diffused shadow (0px 4px 20px rgba(27, 67, 50, 0.05)). This slight green-tinted shadow connects the elements to the primary brand color. 

Interactive elements (like clickable badges or chart nodes) utilize a slightly higher elevation on hover to provide tactile feedback. Modal overlays use a **Backdrop Blur (8px)** to maintain the dashboard's context while focusing the student's attention on specific tasks.

## Shapes

The shape language is **Rounded (Level 2)**. 

Standard UI elements like buttons and input fields use a **0.5rem (8px)** corner radius. Data cards and primary dashboard containers use **1rem (16px)** to feel modern and welcoming. 

For gamified elements—such as "Eco-Badges"—the system allows for fully **Pill-shaped (3rem)** or circular geometries to distinguish them from standard functional data modules. This circularity suggests a "Cycle of Sustainability" and breaks the rigidity of the grid.

## Components

### Data Visualization
Charts should use a custom "Sustainability Palette": Secondary Green for positive trends, Accent Blue for neutral/water data, and a soft Coral for areas needing attention. Grid lines within charts must be minimal and use low-contrast greys.

### Progress Bars
Progress bars are designed with a "Track and Fill" style. The track is a light version of the primary color (10% opacity), and the fill is a solid Secondary Green gradient. For gamified goals, include a "Marker" icon at the target end.

### Gamified Badges
Badges are contained in circular pods. They utilize a subtle inner glow and a 2px stroke of the Primary Green. When locked, they appear in grayscale with 40% opacity; when unlocked, they utilize full brand colors and a small "sparkle" icon.

### Cards
Cards are the primary container for all content. Every card must have a `label-lg` header to define its data category. Actionable cards (e.g., "Join a Green Drive") should include a primary-colored "chevron-right" icon to signal interactivity.

### Buttons & Chips
- **Primary Buttons:** Solid Forest Green with white text; rounded-lg.
- **Filter Chips:** Light grey backgrounds that turn to Accent Blue on selection to signify active data filtering.