# OLYMPUS — Project Constitution

## Milan Cortina 2026 Winter Olympics Web Experience

**Codename:** Olympus
**Purpose:** A well-engineered hub for tracking the 2026 Winter Olympics. Data-first, scannable, real-time. Think Linear/Arc workspace — not a magazine, blog, or editorial experience. Every screen exists to help users follow the Games.

**Games:** February 6–22, 2026 | Milan & Cortina d'Ampezzo, Italy
**Sports:** 16 disciplines, 116 medal events, 15 venues, 93 countries, ~2,900 athletes

---

## I. DESIGN PHILOSOPHY

### Core Principles

1. **Calm power.** The interface should feel serene on the surface with immense depth underneath. Data is everywhere but never overwhelming. Think: a still lake over a deep ocean.

2. **Invisible craft.** The best interactions feel like they aren't designed at all. Transitions, hover states, and data updates should feel inevitable — like gravity. Reference: Rauno Freiberg's "Invisible Details of Interaction Design."

3. **Subtle drill-down.** Information architecture follows a progressive disclosure pattern. Surface-level views are beautiful and minimal. Each click or interaction reveals richer data without jarring transitions. The user should feel like they're "zooming into" the Olympics, not navigating between disconnected pages.

4. **Data as art.** Statistics, medal counts, schedules, and athlete records are not spreadsheets — they are visual stories. Every number earns its place through purposeful presentation.

5. **Cultural fluidity.** The site adapts its personality based on the user's chosen country, shifting color, typography weight, layout density, and visual tone to reflect national design identity — without ever breaking the underlying grid or UX patterns.

### Inspiration Roster

| Designer | Domain | What to Study |
|---|---|---|
| **Rauno Freiberg** | Micro-interactions, invisible details | Hover states, spring physics, "feels alive" quality. His Web Interface Guidelines are our baseline quality bar. |
| **Emil Kowalski** | Animation & motion | Spring-based transitions, gesture-driven UI, physical-feeling animations. His Animations on the Web course defines our motion language. |
| **Paco Coursey** | Minimalism, command interfaces | Dark mode done right, cmdk command palette, restraint as a design tool. Theme switching without transition flash. |
| **Josh Comeau** | Interactive explanations | Playful hover states, tactile data presentation, making complex information feel physical and explorable. |
| **Bruno Simon** | 3D & WebGL | Pushing what a "website" means. Reference for hero experience and immersive moments — use sparingly, with purpose. |
| **Mariana Castilho** | UI experiments | Component animation patterns, staggered reveals, experimental card layouts. |
| **Shu Ding** | Typography & layout | Variable fonts, bleeding-edge Next.js patterns, type as interface element. |

### Quality Bar — Rauno's Web Interface Guidelines (Enforced)

These are not suggestions. They are rules. Every component must pass these checks:

**Interactivity**
- Clicking input labels focuses the input
- Inputs wrapped in `<form>` to submit via Enter
- Inputs use correct `type`, disable `spellcheck`/`autocomplete` when appropriate
- Buttons disabled after submission to prevent duplicate requests
- Interactive elements disable `user-select` on inner content
- Decorative elements (glows, gradients) disable `pointer-events`
- No dead zones between interactive elements in lists — use padding, not margin

**Typography**
- `-webkit-font-smoothing: antialiased` on all text
- `text-rendering: optimizeLegibility` applied globally
- Fonts subsetted for performance
- Font weight never changes on hover/selected state (prevents layout shift)
- No font weights below 400
- `font-variant-numeric: tabular-nums` on all numbers, timers, medal counts, stats
- Fluid type with `clamp()` — e.g., `clamp(48px, 5vw, 72px)` for headings

**Motion**
- Theme switching never triggers transitions on unrelated elements
- Interaction animations ≤ 200ms to feel immediate
- Animation scale proportional to trigger: buttons press to ~0.96–0.97, not 0.8
- Frequent/low-novelty actions (right-click, list add/remove) have minimal or no animation
- Looping animations pause when off-screen (IntersectionObserver)
- `scroll-behavior: smooth` for anchor navigation

**Touch**
- Hover states only on `@media (hover: hover)`
- Input font size ≥ 16px (prevents iOS zoom)
- No auto-focus on touch devices
- `-webkit-tap-highlight-color: transparent` replaced with custom feedback
- `muted playsinline` on all `<video>` elements

**Performance**
- Large `blur()` values avoided on `filter`/`backdrop-filter`
- GPU rendering (`translateZ(0)`) used sparingly and deliberately
- `will-change` toggled only during active animation, never left on
- Off-screen video paused/unmounted
- DOM manipulation via refs for real-time values (scroll position, mouse tracking)

**Accessibility**
- No tooltips on disabled buttons
- `box-shadow` for focus rings (not `outline`)
- Arrow key navigation on sequential focusable lists
- `aria-label` on all icon-only buttons
- `<img>` for all images (screen readers, copy support)
- Gradient text unsets gradient on `::selection`

---

## II. ANATOMY OF THE APP

Each section below is a standalone design challenge. They are ordered by visual hierarchy on the page but can be developed independently.

---

### 1. HOME DASHBOARD

**The Challenge:** Show the user what's happening right now in 3 seconds.

**Specification:**
- Compact hero banner — "Milano Cortina 2026" branding + "Day X of the Games" indicator
- Below hero: 3 dashboard panels — Live Events, Today's Schedule, Medal Snapshot
- Panels pull from Drawer content (LivePanel, SchedulePanel, MedalsPanel) for consistency
- No full-viewport immersive landing. No parallax. No scroll storytelling.
- Data-dense, scannable, functional — like a well-designed sports app, not a magazine cover

**Rules:**
- Home must load and render in < 1.5 seconds on 4G
- Motion must respect `prefers-reduced-motion`
- Mobile: single-column stack of dashboard panels

---

### 2. NAVIGATION / WAYFINDING

> **NOTE:** The Workspace Shell (TopBar, Sidebar, CenterStage, RightDrawer) replaces the original floating glass bar navigation spec below. The shell is already built. The rules and accessibility patterns from this section still apply. The Layer 1-4 specs are kept for reference but the implementation has diverged to the workspace shell pattern.

**The navigation system originally specified four layers:**

#### Layer 1: The Floating Glass Bar (Desktop)

The primary navigation is a **floating pill-shaped navbar** — not full-width, but inset from the viewport edges with generous border-radius, hovering above the content like a glass instrument panel over an Alpine landscape.

**Visual Design:**
- Pill shape: `border-radius: 100vw` with ~16px inset from viewport edges
- Glass material: `backdrop-filter: blur(16px)` with semi-transparent background tinted by the active country theme
- Subtle 1px border: `rgba(255,255,255,0.08)` in dark mode, `rgba(0,0,0,0.06)` in light mode
- Soft outer shadow: `box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)`
- Centered on the viewport, max-width ~960px on large screens

**Contents (left to center to right):**
- **Left:** Olympus logomark (Olympic rings reinterpretation) — always links to home. Right-click surfaces brand assets (Rauno's guideline). Logo scales 1 to 0.85 on scroll using a mapped range, never jumps.
- **Center:** Primary nav items — **Home / Sports / Schedule / Medals / Stories**. Five items max. No dropdowns. Each item is a `<Link>` (never `<button>` — cmd+click, middle-click, right-click all work natively). Active state uses a **shared layout animation pill** (see below).
- **Right:** Country theme selector (circular flag, 24px), dark/light toggle (sun/moon crossfade), search trigger (command-K glyph), Claude companion button (logomark, 20px).

**The Active Tab Indicator — The Signature Detail:**
Instead of a static underline or color swap, the active nav item has a **background pill that morphs between items** using Framer Motion `layoutId`. When you navigate from "Sports" to "Medals," the pill slides, stretches, and settles behind the new item with spring physics: `type: "spring", stiffness: 500, damping: 30`. This feels physical — like a bead sliding on a wire. The pill color is a muted tint of the country theme accent at ~8% opacity. On hover (non-active items), a separate lighter pill appears at ~4% opacity for continuous feedback.

**Scroll Behavior — Four States:**

| State | Trigger | Appearance | Transition |
|---|---|---|---|
| **Resting** | scrollY < 20px | Fully transparent background, no border, relaxed padding (16px vertical) | — |
| **Scrolled** | scrollY > 80px | Glass material activates — blur, tinted bg, border fades in, padding tightens to 12px | 300ms ease via CSS |
| **Hidden** | Scroll down, delta > 10px | Slides up: `transform: translateY(-120%)` | 200ms cubic-bezier(0.4, 0, 0.2, 1) via CSS |
| **Revealed** | Scroll up, delta > 5px | Slides back: `transform: translateY(0)` with glass material | 200ms spring-like ease via CSS |

**Critical:** Nav hide/show uses CSS `transform` transitions — NOT Framer Motion layout animations. Emil Kowalski's lesson from Vercel: the browser is busy loading page content during navigation, so CSS compositor-thread animations won't drop frames. Scroll direction detection uses a **threshold buffer** (5-10px of consistent directional movement) to prevent jitter on elastic scroll and trackpad micro-movements. `will-change: transform` applied only during active transitions, then removed.

#### Layer 2: Mobile Bottom Tab Bar

No hamburger menu. Ever. The bottom tab bar is the **primary mobile navigation** — always visible, always reachable with one thumb.

**Tabs (5 max):**

| Icon | Label | Notes |
|---|---|---|
| Olympic rings (simplified) | Home | Landing/dashboard view |
| Grid/tiles | Sports | 16 sport cards |
| Calendar | Schedule | Day-by-day timeline |
| Trophy | Medals | Leaderboard and tracker |
| Magnifying glass | Search | Triggers command palette |

**Visual Design:**
- Fixed at viewport bottom with `padding-bottom: env(safe-area-inset-bottom)` for notched devices
- Glass material matching desktop nav: `backdrop-filter: blur(16px)`, themed tint
- Height: 52px content + safe area. Touch targets: **48px minimum** (exceeds Apple HIG 44px)
- Subtle top border: 0.5px separator, themed

**States:**
- **Active:** Filled icon + label text. Icon color: country theme accent. Label fades in with `100ms ease` + `2px translateY` upward.
- **Inactive:** Outlined/stroked icon only. No label. Muted color at 50% opacity.
- **Tap feedback:** Icon scales to 0.92 on `touchstart`, springs back on `touchend` (100ms). Purely visual haptic feel.
- **Scroll down:** Tab bar slides down and hides via `transform: translateY(100%)`, 200ms CSS. Maximum content area.
- **Scroll up:** Tab bar slides back up via `transform: translateY(0)`, 200ms. Same threshold buffer as desktop.

**Supplementary Mobile Controls:**
- Country selector + Claude companion: small floating cluster in top-right corner — two 32px circular buttons, glass material, 60% opacity until tapped.
- Dark/light toggle moves into command palette or settings sheet.

#### Layer 3: Command Palette — Perplexity-Powered Search

The power-user navigation layer and entry point for **the search Google should have built.** Full Perplexity integration spec lives in Section VII (Data and AI Architecture), but navigation-specific details:

**Triggers:**
- Desktop: Click search icon in nav, or press Cmd+K / Ctrl+K
- Mobile: Tap Search tab in bottom bar, or pull down from any page top

**Entry Animation:**
- Full-viewport overlay with `backdrop-filter: blur(20px)` and 60% dark scrim
- Search modal scales `0.96 -> 1.0` + opacity `0 -> 1` in 150ms. Never from 0 (Rauno's rule).
- Opens in <= 100ms perceived time. Auto-focus on desktop, NOT on mobile (prevents keyboard covering content).
- Exit: Escape, click outside, or swipe down (mobile). Reverse animation 120ms.

**Dual Mode Toggle:**
- Pill switcher at modal top: **"Olympics"** | **"Open"**
- Olympics (default): queries scoped to 2026 Games. Open: unrestricted Perplexity search.
- Mode persists in localStorage.

**Results Hierarchy:** Pages -> Athletes -> Countries -> Events -> Perplexity AI Answer (formatted card with source citations and follow-up suggestions).

**Keyboard:** Arrow keys navigate grouped results. Enter selects. Tab moves between groups. Full keyboard accessibility, focus trapped within modal.

#### Layer 4: Contextual Sub-Navigation

For drill-down views (specific sport, schedule day, athlete profile):

**Horizontal Scrollable Tabs:**
- Below page title, above content. Sticky at `top: [navbar-height]px`.
- Same shared layout animation pill as main nav for visual consistency.
- Mobile: swipeable with momentum, active tab auto-centered on mount.
- Gradient fade on edges when content overflows.

**Breadcrumb Context (Desktop Only):**
- Between main nav and sub-nav: `Home / Sports / Alpine Skiing / Women's Downhill`
- Each segment is a link. Current page is plain text. Smallest type scale, 50% opacity.
- Mobile: replaced by back arrow + current page title in sticky header.

#### Data-Aware Navigation

The navigation reflects the live state of the Games:

- **"Live Now" Pulse:** Small pulsing dot (6px, theme accent, `animation: pulse 2s ease infinite`) next to "Schedule" during active events. Clicking navigates directly to live events, pre-filtered.
- **Medal Counter Badge:** "Medals" tab shows total count so far. `tabular-nums`, animated with number ticker on change (300ms roll-up). Badge background: theme accent at 12% opacity.
- **Today Indicator:** Desktop "Schedule" item shows today's date below label in smallest type scale (e.g., "Feb 12") — always-visible temporal context, not a badge.
- **Active Sport Indicator:** When viewing a specific sport, "Sports" tab gains a tiny icon of that sport — contextual breadcrumb encoded in the nav itself.

#### Navigation Rules (Non-Negotiable)

**Interaction:**
- All nav items use `<a>` or `<Link>` — never `<button>` or `<div>`. Cmd+Click, middle-click, right-click all work. (Rauno: "Links are links.")
- No dead zones between nav items — interactive area extends via padding, not margin.
- All navigation transitions <= 200ms. Page crossfade <= 200ms.
- No page reloads — client-side navigation with instant URL updates via Next.js App Router.
- Active route **always** reflected in URL. Every filter, tab, and state is deep-linkable.
- `scroll-behavior: smooth` for anchor navigation with `scroll-margin-top` offset for sticky nav.

**Accessibility:**
- Full keyboard navigation: Tab between items, Enter to activate, arrow keys within sequential lists.
- Focus indicators via `box-shadow` (not `outline` — respects border-radius).
- `aria-label` on all icon-only buttons. `aria-current="page"` on active item.
- Skip-to-content link as first focusable DOM element. Focus trapped in command palette when open.

**Touch:**
- Hover states only within `@media (hover: hover)`.
- Touch targets >= 48px on all interactive nav elements.
- `-webkit-tap-highlight-color: transparent` with custom scale feedback replacement.
- No auto-focus on mobile.

**Performance:**
- Nav hide/show uses CSS transform transitions (compositor thread), not JS-driven Framer Motion.
- `will-change: transform` toggled only during active scroll transitions.
- `backdrop-filter: blur()` capped at 16px to avoid GPU strain on lower-end devices.
- Decorative elements have `pointer-events: none`.
- Nav component lives outside page transition boundary — never unmounts during navigation.

**Theming:**
- Glass tint color transitions 300ms on country theme change.
- Text color and font weight swap instantly (no transition) to prevent flash of intermediate state.
- Both modes maintain WCAG AA contrast on all nav text and icons.
- Theme switching never triggers transitions on unrelated nav elements.

---

### 3. COUNTRY VIBE SYSTEM (Cultural Theming Engine)

**The Challenge:** Create a theming architecture with three tiers — a strong Olympus base identity inspired by Milan Cortina's alpine Italian character, soft country accents that touch content contextually, and a dedicated theme showcase page that serves as both documentation and portfolio piece.

**Philosophy:** Olympus should feel like Olympus first, always. The app has its own design identity rooted in the Dolomites, Italian alpine light, and the aesthetic character of the 2026 Games. When a user selects their country, they don't repaint the app — they add a personal tint, like wearing team colors in a beautiful stadium. The stadium doesn't change. The experience does, just enough.

#### Three-Tier Theme Architecture

**Tier 1 — The Olympus Shell (Never Changes)**

The navigation bar, command palette, footer, and all chrome elements are permanently dressed in the Olympus identity. No country selection affects these surfaces. This is the constant — the architectural envelope that tells users "you are in Olympus" regardless of what country they're exploring.

Shell surfaces:
- Floating glass navbar (desktop) — background tint, text color, active pill
- Bottom tab bar (mobile) — glass material, icon colors, active states
- Command palette — overlay scrim, input styling, result cards
- Footer — background, text, link colors
- Global page background and base surface colors
- Dark/light mode toggle behavior and base palette

**Tier 2 — Country-Accented Content (Contextual Soft Theming)**

When content is directly country-related, it receives a soft accent derived from that country's flag colors. This is NOT a full redesign — it's a subtle warmth, like how a gallery might adjust lighting for different exhibitions without repainting the walls.

Accented surfaces:
- Sport cards — background gradient blends with country accent at ~15% opacity
- Sport card icons — tint with country accent via `currentColor`
- Country profile pages — hero gradient uses country palette
- Athlete cards — subtle border or badge tint matching their country
- Medal tracker rows — flag + soft country color background on hover/expand
- Medal map — country regions colored by their flag-derived palette
- Data visualization primary color — shifts to country accent in country-specific contexts
- Claude insight cards — border accent tints with relevant country

Critical distinction: The Olympus base palette remains dominant. Country accents are additive at low opacity (8-20%), never replacing the base. Think of it as a color temperature shift, not a color scheme swap.

**Tier 3 — The Olympus Theme Page (Portfolio Showcase)**

A dedicated page at `/theme` (or `/design`) that serves as both documentation and design statement. This page showcases the Olympus design system itself, explaining how every visual choice is rooted in the Milan Cortina 2026 Olympic character.

Page contents:
- The Olympus palette with color swatches and their alpine Italian inspirations
- Side-by-side comparisons: Milan Cortina source material → Olympus interpretation
- Typography specimens showing the variable font in action
- Interactive demo: select different countries and watch accents shift in real-time
- Component gallery showing sport cards, data viz, and nav in light/dark modes
- Credits and inspirations (Dolomite photography, Italian design tradition, Armani's Olympic white)
- Build notes: how the palette was derived, what tools were used

This page is the answer to "how did you build this" — the portfolio piece within the portfolio piece.

#### The Olympus Base Palette — Inspired by Milan Cortina's Alpine Italian Character

The Olympus palette is NOT a copy of Milan Cortina 2026's official brand. It is an original palette inspired by the same source material — the Dolomites in winter, Cortina d'Ampezzo's village character, Milan's architectural precision, and the Italian tradition of elegant restraint.

**Source Inspirations:**

*The Dolomites in February:*
- The pale limestone peaks — "Pale Mountains" — that glow pink and gold at sunrise (the Enrosadira phenomenon, where calcium magnesium carbonate catches dawn light)
- Glacial blues of winter shadow on snow — not electric blue, but the muted steel-blue of ice at altitude
- The crisp white of fresh powder under overcast alpine skies — not pure white, but a warm white with the faintest blue undertone
- Dark evergreen forests at the base of vertical rock faces — nearly black in shadow, deep spruce green in light

*Cortina d'Ampezzo:*
- Warm stone and wood of alpine village architecture — honey-toned, lived-in, elegant without trying
- The red-brown of shutters and iron details against white plaster
- Church spires and clock towers against dramatic mountain backdrops

*Milan:*
- Cool architectural grays of Milanese modernism — Armani's palette of restraint
- The warm gold of Duomo limestone catching afternoon sun
- Clean, confident surfaces — Italian design's gift of making precision feel effortless

*The 2026 Games Character:*
- Milan Cortina's brand personality: "vibrant, dynamic, contemporary" with the concept of Armonia (Harmony)
- The "Italian Spirit" — human gesture, movement, expressive talent
- Armani's all-white Olympic team uniforms — connection to snow, landscapes, calm elegance
- The Salomon volunteer uniforms in various shades of blue

**The Olympus Palette:**

*Core Neutrals (the architecture):*
- `--olympus-white`: `#F7F6F3` — warm alpine white, the color of Dolomite limestone in soft light. Not sterile, not yellow — the warm neutral of Italian plaster walls.
- `--olympus-snow`: `#EDECEA` — slightly deeper warm white, like packed snow in afternoon shadow. Card backgrounds, secondary surfaces.
- `--olympus-stone`: `#C4BFB6` — warm gray with a sandy undertone. Muted text, borders, dividers. The color of weathered alpine wood.
- `--olympus-slate`: `#6B6560` — medium warm gray. Secondary text, placeholder content. Cortina's stone architecture in overcast light.
- `--olympus-charcoal`: `#2C2825` — near-black with warm brown undertone. Primary text in light mode. Rich and readable without the harshness of pure black.

*Signature Colors (the personality):*
- `--olympus-glacier`: `#7BA7C2` — the muted steel-blue of glacial ice in Dolomite shadow. Primary accent in data visualization, active states, links. Not bright — sophisticated.
- `--olympus-dolomite`: `#D4A574` — warm golden tone of Dolomite limestone catching the Enrosadira sunrise. Secondary accent, highlights, warm emphasis. The color that makes Olympus feel Italian.
- `--olympus-alpine`: `#4A6741` — deep spruce green of alpine forests below the treeline. Tertiary accent, used sparingly for nature/venue contexts. Grounding and organic.
- `--olympus-peak`: `#E8C4B8` — the soft pink of Dolomite peaks at golden hour. Used at very low opacity for hover states, selection backgrounds, warm surface tints. Subtle enough to feel atmospheric rather than decorative.

*Dark Mode Variants:*
- `--olympus-night`: `#1A1816` — deep warm black, like a winter night sky in the mountains without light pollution. Primary background.
- `--olympus-shadow`: `#242120` — slightly lighter, for card surfaces and elevated elements in dark mode. The color of pine bark in moonlight.
- `--olympus-dusk`: `#3A3533` — medium dark surface. Borders and dividers in dark mode. The last light before true dark.
- `--olympus-glacier` in dark mode: brightened to `#8FBDD4` for contrast compliance
- `--olympus-dolomite` in dark mode: warmed slightly to `#DEB485` — golds glow more at night

*Semantic Tokens (derived from core palette):*
- `--color-bg-primary`: maps to `--olympus-white` (light) / `--olympus-night` (dark)
- `--color-bg-secondary`: maps to `--olympus-snow` / `--olympus-shadow`
- `--color-bg-elevated`: maps to `#FFFFFF` / `--olympus-dusk`
- `--color-text-primary`: maps to `--olympus-charcoal` / `--olympus-white`
- `--color-text-secondary`: maps to `--olympus-slate` / `--olympus-stone`
- `--color-text-muted`: maps to `--olympus-stone` / `--olympus-slate`
- `--color-accent-primary`: maps to `--olympus-glacier` (both modes, adjusted for contrast)
- `--color-accent-warm`: maps to `--olympus-dolomite` (both modes)
- `--color-border`: maps to `rgba(0,0,0,0.06)` / `rgba(255,255,255,0.08)`
- `--color-surface-hover`: maps to `--olympus-peak` at 8% opacity / `--olympus-glacier` at 6% opacity

*Universal Constants (never themed):*
- `--color-live`: `#EF4444` — red for LIVE indicators. Universal recognition, never changes.
- `--color-gold`: `#D4A017` — Olympic gold medal
- `--color-silver`: `#A8A8A8` — Olympic silver medal
- `--color-bronze`: `#CD7F32` — Olympic bronze medal
- `--color-success`: `#22C55E` — data freshness, completed events
- `--color-warning`: `#EAB308` — stale data, upcoming events

#### Country Accent System — Flag-Derived Palettes

Every participating country gets an accent palette extracted from their flag. This is algorithmic for V1, not hand-curated — scaling to 93 countries requires automation.

**Extraction Algorithm:**
1. Source: country flag SVG (already in `/public/flags/`)
2. Extract the 2-3 dominant colors from the flag using color quantization
3. Select the most saturated non-white, non-black color as `--country-accent-primary`
4. Select the second most prominent color as `--country-accent-secondary`
5. Generate a `--country-accent-muted` by desaturating the primary by 40% and adjusting lightness to 70% (light mode) or 30% (dark mode)
6. All extracted colors are validated for WCAG AA contrast against Olympus surfaces before use
7. If contrast fails, adjust lightness until compliant

**Country Accent Token Set (per country):**
```css
--country-accent-primary    /* Strongest flag color — used for icon tints, active borders */
--country-accent-secondary  /* Second flag color — used sparingly for gradients */
--country-accent-muted      /* Desaturated primary — hover backgrounds, subtle fills */
--country-accent-surface    /* Primary at 8% opacity — card background tint */
--country-accent-glow       /* Primary at 20% opacity — focus rings, icon glows */
```

**Example Extractions:**

| Country | Flag Colors | Accent Primary | Accent Secondary | Character |
|---|---|---|---|---|
| 🇺🇸 USA | Red, White, Blue | `#B22234` (Old Glory Red) | `#3C3B6E` (Old Glory Blue) | Bold, high-contrast |
| 🇳🇴 Norway | Red, White, Blue | `#BA0C2F` (Norwegian Red) | `#00205B` (Norwegian Blue) | Deep, confident |
| 🇯🇵 Japan | White, Red | `#BC002D` (Hinomaru Red) | — (monochrome flag) | Minimal, striking |
| 🇨🇭 Switzerland | Red, White | `#DA291C` (Swiss Red) | — (monochrome flag) | Clean, precise |
| 🇩🇪 Germany | Black, Red, Gold | `#DD0000` (German Red) | `#FFCC00` (German Gold) | Structured, warm |
| 🇫🇷 France | Blue, White, Red | `#002395` (French Blue) | `#ED2939` (French Red) | Elegant, tricolor |
| 🇨🇦 Canada | Red, White | `#FF0000` (Maple Red) | — (monochrome flag) | Warm, unmistakable |
| 🇸🇪 Sweden | Blue, Yellow | `#004B87` (Swedish Blue) | `#FECC02` (Swedish Yellow) | Cool-warm contrast |
| 🇰🇷 South Korea | White, Red, Blue, Black | `#CD2E3A` (Taegeuk Red) | `#0047A0` (Taegeuk Blue) | Balanced, modern |
| 🇮🇹 Italy (host) | Green, White, Red | `#009246` (Italian Green) | `#CE2B37` (Italian Red) | Tricolor warmth |
| 🇧🇷 Brazil | Green, Yellow, Blue | `#009739` (Brazilian Green) | `#FEDD00` (Brazilian Yellow) | Vibrant, tropical |
| 🇦🇹 Austria | Red, White | `#ED2939` (Austrian Red) | — (monochrome flag) | Alpine, direct |
| 🇫🇮 Finland | White, Blue | `#003580` (Finnish Blue) | — (monochrome flag) | Nordic calm |
| 🇳🇱 Netherlands | Red, White, Blue | `#AE1C28` (Dutch Red) | `#21468B` (Dutch Blue) | Maritime, vivid |
| 🇨🇳 China | Red, Yellow | `#EE1C25` (PRC Red) | `#FFFF00` (PRC Yellow) | Bold, saturated |

**Monochrome Flag Handling:**
Countries with single-accent flags (Japan, Switzerland, Canada, etc.) use only `--country-accent-primary`. The secondary token falls back to the primary at 50% saturation. This actually creates a more refined, minimal accent — fitting for countries whose flags are themselves exercises in restraint.

#### Country Selection UX

**Desktop — Nav Country Picker:**
- 24px circular flag in the floating glass bar (right cluster)
- Default: Olympic rings icon (no country selected = pure Olympus)
- Click → popover grid: 6 columns of 32px circular flags, grouped by continent
- Search input at top of popover for finding countries quickly
- Most recent/popular selections pinned at top
- "Clear" option returns to pure Olympus (no country accent)
- Selection persists in localStorage

**Mobile — Nav Country Picker:**
- 24px circular flag in top-right floating cluster
- Tap → bottom sheet with scrollable flag grid
- Search bar with keyboard at top
- Recent selections as horizontal scroll row

**Contextual Auto-Accent:**
In addition to the global country picker, country accents apply automatically in context:
- Viewing a country profile page → that country's accent applies to the page content
- Viewing an athlete → their country's accent subtly tints their profile card
- Medal tracker rows → each row carries its own country accent on hover/expand
- This is NOT a global theme switch — it's per-component contextual coloring

**Default State — Pure Olympus:**
When no country is selected (first visit, or "Clear" chosen), the app is in pure Olympus mode:
- `--country-accent-primary` falls back to `--olympus-glacier`
- `--country-accent-secondary` falls back to `--olympus-dolomite`
- Sport card gradients use their base palettes without any country tint
- The app feels complete and intentional — not "unthemed" or empty

This is important: the default state IS a theme. Olympus at rest should feel like the definitive version, not a placeholder waiting for a country selection.

#### Theme Application — CSS Custom Properties

**Implementation:**

All theming flows through CSS custom properties on `:root`. No React re-renders, no context updates for color changes — pure CSS cascade.

```css
/* Base Olympus tokens — always present */
:root {
  --olympus-white: #F7F6F3;
  --olympus-snow: #EDECEA;
  --olympus-stone: #C4BFB6;
  --olympus-slate: #6B6560;
  --olympus-charcoal: #2C2825;
  --olympus-glacier: #7BA7C2;
  --olympus-dolomite: #D4A574;
  --olympus-alpine: #4A6741;
  --olympus-peak: #E8C4B8;
  
  /* Semantic tokens — mapped from base */
  --color-bg-primary: var(--olympus-white);
  --color-text-primary: var(--olympus-charcoal);
  --color-accent-primary: var(--olympus-glacier);
  /* ... full semantic set ... */
  
  /* Country accent tokens — default to Olympus values */
  --country-accent-primary: var(--olympus-glacier);
  --country-accent-secondary: var(--olympus-dolomite);
  --country-accent-muted: #B8D4E3;
  --country-accent-surface: rgba(123, 167, 194, 0.08);
  --country-accent-glow: rgba(123, 167, 194, 0.20);
}

/* Dark mode — override semantic tokens */
:root[data-theme="dark"] {
  --color-bg-primary: var(--olympus-night);
  --color-text-primary: var(--olympus-white);
  --color-accent-primary: #8FBDD4;
  /* ... full dark overrides ... */
}

/* Country accent override — applied via JS on selection */
/* Example: USA selected */
:root[data-country="usa"] {
  --country-accent-primary: #B22234;
  --country-accent-secondary: #3C3B6E;
  --country-accent-muted: #D4919A;
  --country-accent-surface: rgba(178, 34, 52, 0.08);
  --country-accent-glow: rgba(178, 34, 52, 0.20);
}
```

**Theme Switch Behavior — Rauno's Rule:**

Theme switching (country selection, dark/light toggle) NEVER triggers transitions or animations on elements. Colors just ARE the new colors. This is Rauno's explicit guideline: "switching themes should not trigger transitions and animations on elements."

- No `transition: color 300ms` on body or root
- No crossfade between palettes
- No animation on accent color changes
- The swap is instant — one frame, new colors
- This feels more premium than any transition could. It's confident. The design just... is.

**Exception:** The dark/light mode toggle icon itself can animate (sun → moon morph), because that's an interaction animation on the trigger element, not a theme transition on content.

#### Dark/Light Mode Integration

Dark and light modes are independent of country selection. They compose:

- **Light + No Country** = Olympus daytime — warm whites, glacier blues, dolomite golds
- **Dark + No Country** = Olympus nighttime — deep warm blacks, brightened glaciers, glowing golds
- **Light + Country** = Olympus daytime with country accent tints
- **Dark + Country** = Olympus nighttime with country accent tints (brightened for contrast)

Every country accent color has both a light-mode and dark-mode variant pre-computed. The dark-mode variant is brighter and slightly more saturated to maintain visibility on dark surfaces.

#### V2 Expansion Path (Post-Launch)

V1 ships with algorithmic flag-derived accents for all 93 countries. V2 can selectively upgrade top-performing nations with deeper theming:

**V2 Country Theme Additions (per country):**
- Hand-curated accent palette (refined beyond algorithm extraction)
- Typography weight adjustment via variable font `wght` axis (Japan lighter, USA bolder)
- Letter-spacing micro-adjustment (Japan wider, Switzerland tighter)
- Sport card gradient temperature shift (warmer for warm-climate nations, cooler for Nordic)
- Custom empty-state illustrations reflecting national character
- Motion intensity tuning (Japan restrained, Brazil expressive)

**V2 Priority Countries (top medal contenders + design-interesting nations):**
Norway, USA, Germany, Canada, Switzerland, Japan, South Korea, France, Italy, Austria, Sweden, Netherlands, Finland, China, Australia

V2 is additive — it doesn't change the architecture, just enriches the data flowing through it.

#### Country Vibe Rules (Non-Negotiable)

**Architecture:**
- Shell elements (nav, footer, command palette) NEVER receive country accents — always pure Olympus
- Country accents are additive overlays at low opacity (8-20%), never replacing the Olympus base
- Default state (no country selected) must feel complete, intentional, and beautiful — not "unthemed"
- All 93 participating countries must have functional accent palettes at launch

**Theming:**
- Theme changes apply via CSS custom properties — no React re-renders for color changes
- Theme switching is INSTANT — no transitions, no animations, no crossfades (Rauno's rule)
- Both light and dark modes must work with every country accent combination
- All text on accented surfaces meets WCAG AA contrast (4.5:1 minimum)
- Country accent tokens exist in both light and dark variants, pre-computed

**Country Selection:**
- Selector always visible in nav but unobtrusive (24px circular flag)
- Selection persists in localStorage across sessions
- "Clear" option returns to pure Olympus — always one tap away
- Contextual auto-accent on country profiles/athletes is independent of global selection

**Performance:**
- Flag SVGs: inline or pre-optimized, < 2KB each, no CDN dependency
- Country palette data: single JSON file loaded once, ~15KB for all 93 countries
- Theme application is CSS-only — zero JS execution on color change
- No layout shift on theme change — only color and opacity properties shift

**Accessibility:**
- Country picker popover is keyboard navigable (arrow keys, type-to-search)
- `aria-label` on country selector: "Select country theme — currently {country}"
- Screen reader announces country change: `aria-live="polite"` region
- High-contrast mode: country accents disabled, pure Olympus with maximum contrast
- `prefers-contrast: more` media query forces high-contrast overrides

---

### 4. SPORT CARDS / CONTENT TILES

**The Challenge:** Present 16 Winter Olympic sports as explorable, tactile design objects that invite discovery. Each card must function as a beautiful standalone artifact AND as a gateway into the richest drill-down experience in the app. This is the primary content unit — the thing people screenshot, the thing that makes a portfolio reviewer pause.

**Philosophy:** Sport cards are not thumbnails. They are **miniature design systems** — each one a self-contained world that hints at the depth below. Think of each card as a movie poster: it tells you the genre, the mood, and the promise of what's inside, without spoiling the story. The card grid should feel like walking through a gallery of 16 commissioned artworks that all belong to the same exhibition.

#### Card Anatomy

Every sport card contains these layers, stacked with intentional visual hierarchy:

**Layer 1 — Visual Identity (Background)**
- Full-bleed background treatment unique to each sport's character:
  - **Dynamic sports** (Alpine Skiing, Bobsleigh, Luge, Skeleton, Speed Skating): Subtle motion gradient — angled sweep suggesting velocity, using cool blues and whites
  - **Precision sports** (Biathlon, Curling, Figure Skating, Ski Jumping): Clean, still gradients — geometric and composed, using the sport's traditional palette
  - **Endurance sports** (Cross-Country, Nordic Combined, Ski Mountaineering): Textured gradients — evoking snow grain and terrain, warmer undertones
  - **Style sports** (Freestyle Skiing, Snowboard, Short Track): Energetic gradients — bolder angles, higher contrast, slight grain texture
  - **Team sports** (Ice Hockey): Dual-tone split suggesting opposition
- Background tints shift when country theme changes — the gradient's anchor color blends with the country accent at ~15% opacity
- `background-size: 200% 200%` with slow ambient `background-position` animation (20s cycle) — the card "breathes" almost imperceptibly. Pauses off-screen via IntersectionObserver.

**Layer 2 — Sport Icon (Focal Point)**
- Custom SVG icon for each sport — consistent 2px stroke weight, geometric style, monochrome base
- Icon tints with country theme accent color via CSS `filter` or SVG `currentColor`
- Size: 48px on desktop grid, 40px on mobile
- Position: centered or offset depending on card layout variant (see Grid section below)
- On hover: icon lifts 2px (`translateY(-2px)`) and gains a subtle glow matching the theme accent — `filter: drop-shadow(0 0 8px var(--accent-color))`
- Icons must work at 24px (for use in nav, breadcrumbs, sub-nav indicators)

**Layer 3 — Information Stack**
- **Sport name:** Primary label. Variable font weight — heavier for dynamic sports, lighter for precision sports. `font-variant-numeric: tabular-nums` if any numbers present.
- **Status badge:** One of three states:
  - 🔴 **LIVE** — Pulsing red dot + "LIVE" text + current event name. Entire card gains a subtle `box-shadow` pulse at 2s interval.
  - 🟡 **NEXT** — Countdown or relative time: "in 2h 15m" or "Tomorrow, 10:00". Uses `tabular-nums`.
  - ✅ **COMPLETE** — Small medal icons (🥇🥈🥉) with count. Final results available on drill-down.
- **Venue tag:** Small chip below status: "Cortina d'Ampezzo" or "Milano" — links to venue view on click.
- **Medal progress:** Micro progress bar at card bottom — thin (2px), shows medals awarded vs. total events. Animated fill on mount, `tabular-nums` for the fraction label.

**Layer 4 — Interactive Surface (Invisible)**
- The **entire card is a single `<Link>`** — never a wrapper div with an onClick. Cmd+click, right-click, middle-click all work natively. (Rauno: "Links are links.")
- Hover/press feedback layer covers the full card surface — no dead zones.
- `cursor: pointer` on the entire card area.

#### Grid Layout

The sport card grid is NOT a masonry layout (too chaotic for this aesthetic) and NOT a uniform grid (too boring). It uses a **weighted editorial grid** inspired by magazine layouts:

**Desktop (>1024px) — The Gallery Layout:**
- CSS Grid with `grid-template-columns: repeat(4, 1fr)` base
- **Featured card:** One sport gets a 2x2 span — the sport with the most imminent/active event, or a "Live Now" sport. This card gets the richest visual treatment (larger icon, more data visible, ambient background animation more pronounced).
- **Standard cards:** 1x1 each. The remaining 15 sports fill the grid.
- **Total:** 1 featured (2x2) + 15 standard (1x1) = 4 columns, ~5 rows. The featured card position rotates based on live event priority.
- Gap: 16px (consistent with 4px grid system — 16 = 4x4)
- Max container width: 1200px, centered with auto margins

**Tablet (768–1024px):**
- `grid-template-columns: repeat(3, 1fr)`
- Featured card spans 2x1 (wide, not tall) to avoid excessive scrolling
- Gap: 12px

**Mobile (<768px):**
- `grid-template-columns: repeat(2, 1fr)`
- No featured card — all 1x1, equal weight. The live/next sport sorts to position [0,0].
- Gap: 8px
- Cards become more compact: icon shrinks to 32px, venue tag hides, progress bar remains.

**Single Column (<480px):**
- `grid-template-columns: 1fr`
- Cards become horizontal: icon left, info stack right. More like a rich list item.
- This is the ESPN Scoreboard pattern — scannable, one-thumb browsable.

#### Card Interactions — The Craft Layer

This is where Olympus earns the portfolio spot. Every interaction on the sport card must feel physical, responsive, and intentional.

**Hover State (Desktop only, `@media (hover: hover)`):**
- Scale: `transform: scale(1.02)` — subtle, proportional to card size (Rauno: scale proportional to trigger)
- Shadow: depth increases from resting `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` to `0 4px 16px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)`
- Background gradient shifts slightly (background-position moves ~5%)
- Icon lifts 2px and gains glow
- Transition: 150ms `cubic-bezier(0.4, 0, 0.2, 1)` on all properties
- ALL hover animations use `transform` and `box-shadow` only — compositor-friendly, no layout thrash

**Press State (Touch + Mouse):**
- Scale: `transform: scale(0.97)` — card "presses in" on mousedown/touchstart
- Shadow: depth decreases (card sinks)
- Transition: 80ms (faster than hover — press should feel instant)
- Release springs back to resting state with 150ms ease

**Focus State (Keyboard):**
- `box-shadow` focus ring: 2px, theme accent color, offset by 2px
- No scale change — focus != hover (Rauno's guideline)
- Arrow keys navigate between cards in grid order

#### Card-to-Detail Transition — The Signature Moment

When a user clicks a sport card, we do NOT do a standard page navigation. We do a **shared layout animation** — the card expands into the detail view, maintaining visual continuity. This is the moment that makes people say "how did they build this."

**The Animation Sequence:**
1. **Click registered** (0ms): Card press state activates (`scale(0.97)`), other cards begin fading to 50% opacity
2. **Expansion begins** (80ms): Using Framer Motion `layoutId`, the card begins expanding toward full viewport. The card's background gradient scales up. The icon, sport name, and status badge maintain their relative positions within the expanding frame.
3. **Content crossfade** (150ms): As the card reaches ~60% of its final size, the grid-level info (compact status, venue chip) crossfades out and the detail-level content (full schedule, medal table, athlete list) crossfades in. `AnimatePresence` handles the exit/enter.
4. **Settled** (300ms): The card is now the detail page. URL has updated. The other cards are gone (unmounted after the animation completes, not during).

**Technical Implementation:**
- Framer Motion `layoutId={`sport-card-${sport.id}`}` on both the grid card and the detail page header
- `AnimatePresence mode="wait"` wrapping the page content for exit animations
- Spring transition: `type: "spring", stiffness: 300, damping: 28` — slightly softer than the nav pill (this is a bigger, more dramatic motion)
- The detail page header IS the card, expanded — same gradient, same icon, same color. This creates the illusion of zooming in.
- Back navigation reverses the animation: detail collapses back to card position in the grid

**Fallback for reduced motion:**
- `prefers-reduced-motion: reduce` → instant crossfade (opacity only, 150ms), no layout animation
- The same content appears, just without the spatial transition

#### Card Entrance Animation — Staggered Reveal

When the sport cards grid first enters the viewport (on page load or scroll-into-view):

**Desktop:**
- Cards animate in with staggered delay: `staggerChildren: 0.05` (50ms between each card)
- Each card: `opacity: 0 → 1`, `y: 20px → 0`, `scale: 0.95 → 1`
- Spring transition: `type: "spring", stiffness: 400, damping: 25`
- Featured card animates first (it's the visual anchor), then the rest flow from top-left to bottom-right
- Total reveal time for all 16 cards: ~800ms (50ms × 16). Fast enough to not feel like waiting, slow enough to register as intentional.

**Mobile:**
- Same stagger but `staggerChildren: 0.04` (faster — mobile users scroll more aggressively)
- Only cards visible in the viewport animate on load — cards below fold animate when scrolled into view via IntersectionObserver with `threshold: 0.2`

**Critical rule from Rauno:** Don't scale from 0. Our minimum scale is 0.95. Don't animate from off-screen positions (no `x: -100` fly-ins). Keep the animation range small and spring-physics-driven. The goal is to feel like the cards were always there and just... materialized.

#### Sport Detail View — The Drill-Down

Once a card expands into the detail view, the user enters the sport's dedicated space. This is where the data depth lives.

**Detail Page Structure:**
1. **Hero Banner** (the expanded card) — full-width, sport gradient background, large icon, sport name in display type, "Live / Next / Complete" status prominent
2. **Contextual Sub-Navigation** (Layer 4 from Section 2) — horizontal sticky tabs: **Overview · Schedule · Results · Athletes · Venues**
3. **Content Area** — changes based on active sub-nav tab:
   - **Overview:** Sport description (2-3 sentences, beautifully typeset), key stats (total events, participating countries, defending champions), featured athlete cards
   - **Schedule:** Day-by-day event timeline for this sport. Links to Section 6 patterns.
   - **Results:** Medal results as they happen. Links to Section 5 data viz patterns.
   - **Athletes:** Card grid of athletes competing in this sport (smaller, simpler cards — photo, name, country flag, personal best)
   - **Venues:** Venue card with map, capacity, location

**Detail → Grid Return:**
- Back button or browser back: shared layout animation reverses
- The card collapses back to its grid position. Other cards fade back in.
- URL updates to `/sports` (the grid view). Scroll position is restored to where the user was.

#### The 16 Sports — Visual Identity Map

Each sport has a distinct visual personality within the shared card system:

| Sport | Gradient Style | Energy | Icon Character |
|---|---|---|---|
| Alpine Skiing | Cool blue diagonal sweep | Dynamic | Parallel ski tracks |
| Biathlon | White-to-frost with crosshair accent | Precision | Rifle + ski |
| Bobsleigh | Dark steel gradient, metallic | Dynamic | Sled silhouette |
| Cross-Country Skiing | Soft blue-white terrain texture | Endurance | Trail tracks |
| Curling | Clean ice-white with stone accent | Precision | Stone top-down |
| Figure Skating | Elegant gradient, subtle sparkle | Precision | Blade spiral |
| Freestyle Skiing | Bold angle, high contrast | Style | Inverted skier |
| Ice Hockey | Dual-tone split (red/blue) | Team | Stick + puck |
| Luge | Dark speed gradient | Dynamic | Sled profile |
| Nordic Combined | Terrain + sky blend | Endurance | Jump + trail |
| Short Track | Angled speed lines | Style | Skater lean |
| Skeleton | Dark steel, headfirst angle | Dynamic | Rider position |
| Ski Jumping | Sky gradient, vertical | Precision | Flight silhouette |
| Ski Mountaineering | Mountain texture, warm | Endurance | Climbing figure |
| Snowboard | Bold, grain texture | Style | Board profile |
| Speed Skating | Ice-blue sweep, wide angle | Dynamic | Low-profile skater |

Country theming modulates these base gradients — the sport personality remains, but the color temperature shifts to match the selected country's palette.

#### Loading & Error States

**Skeleton State:**
- Card-shaped skeleton with exact same dimensions as the final card
- Shimmer animation: subtle gradient sweep left-to-right, 1.5s cycle
- Skeleton elements match the real card anatomy: icon circle, title bar, status bar, progress line
- Shimmer uses `background-size: 200% 100%` + `background-position` animation — CSS only, no JS
- All skeleton elements use `border-radius` matching the real components

**Empty State:**
- If a sport has no scheduled events yet: card shows sport name + icon with muted "Schedule TBD" text
- Card is still interactive — links to the sport detail page with whatever info is available

**Error State:**
- If data fetch fails for a specific sport: card shows sport name + icon + "Data unavailable" in muted text
- A small retry icon (↻) appears on hover. Clicking retries the fetch for that sport only.
- Other cards remain functional — errors are isolated per-card, never grid-wide

#### Sport Card Rules (Non-Negotiable)

**Content:**
- Cards never truncate the sport name — every character visible at every breakpoint
- Status badge (Live/Next/Complete) always visible — this is the primary information the user needs
- Medal progress bar always visible — even if 0 medals awarded, the empty bar communicates "events pending"
- `font-variant-numeric: tabular-nums` on ALL numbers (countdowns, medal counts, event counts)

**Interaction:**
- Entire card is a `<Link>` — full surface clickable. Cmd+click, right-click, middle-click work.
- No dead zones — padding extends interactive area to card edges
- Hover scale proportional to trigger size (1.02 for standard cards, 1.01 for featured 2x2 card)
- Press feedback on every click — no click should feel unacknowledged
- Card-to-detail transition must be interruptible — if user clicks back during expansion, it reverses gracefully

**Performance:**
- Card animations use `transform`, `opacity`, and `box-shadow` ONLY — all compositor-friendly
- `will-change: transform` applied only during active hover/animation, removed after
- Background gradient animation pauses off-screen (IntersectionObserver)
- Staggered entrance animation triggers once — not on every scroll past
- Image/icon assets lazy-loaded with `loading="lazy"` for cards below fold
- Card grid renders with fixed dimensions (no CLS) — skeleton matches final layout exactly

**Accessibility:**
- Each card has `aria-label="{Sport Name} — {Status}"` (e.g., "Alpine Skiing — Live Now")
- Card grid navigable with arrow keys (left/right/up/down move between cards)
- Focus indicators via `box-shadow` (matches theme accent, 2px offset)
- Status badges use `aria-live="polite"` for real-time updates (Live → Complete transitions)
- `prefers-reduced-motion` disables all animations except opacity crossfades
- Color contrast: all text on gradient backgrounds meets WCAG AA (4.5:1 minimum)

**Theming:**
- Background gradients blend with country theme accent at ~15% opacity
- Icon color inherits theme accent via `currentColor`
- Status badge colors are universal (red for live, theme accent for next, muted for complete) — they don't shift with country theme to maintain instant recognition
- Dark mode: gradient backgrounds darken, shadows deepen, icon glow becomes more prominent
- Light mode: gradients lighten, shadows soften, backgrounds approach near-white with subtle tint
---

### 5. DATA VISUALIZATION & MEDAL TRACKER

**The Challenge:** Make Olympic statistics feel alive, calm, and deeply explorable without ever overwhelming.

**This is the heart of the app.** Data presentation defines our design identity.

**Specification:**

**Medal Tracker (Primary)**
- Sortable country leaderboard: Gold → Silver → Bronze → Total
- Each row: flag, country name, medal bars (horizontal stacked bar, proportional)
- Animated count-up on first view and on data change
- Click country row → expand inline to show athlete medal breakdown
- `font-variant-numeric: tabular-nums` on ALL numbers — mandatory, no exceptions
- Mini sparkline showing medal pace over the 17 days (tiny, inline, subtle)

**Medal Map (Secondary)**
- World map with countries colored by medal count intensity
- Hover country → tooltip with flag, name, medal breakdown
- Calm color scale: single hue gradient (light → saturated), not rainbow
- Click country → drill into that country's full performance view

**Sport-Specific Stats**
- Per-sport visualization: appropriate to the sport's nature
  - Speed events (skiing, skating, luge): horizontal bar charts comparing times, with time delta annotations
  - Scored events (figure skating): radar/spider charts for component scores
  - Team events (hockey, curling): bracket/tournament visualization
  - Aggregate: medal distribution by sport as a treemap or bubble chart

**Athlete Profiles**
- Clean card: photo (if available), name, country, sport, event(s), personal best, Olympic history
- Comparison mode: select 2 athletes, side-by-side stat comparison with animated bar transitions

**Design Rules for All Data:**
- Numbers animate into place — never pop. Use spring physics (Emil Kowalski style).
- Tooltips appear on hover with 100ms delay, disappear on mouse leave with 50ms delay
- Charts use the country theme's accent color as the primary data color
- Zero state: "No medals yet" with a subtle illustration, never an empty table
- All charts must be keyboard accessible (arrow keys to navigate data points)
- Responsive: charts reflow to vertical orientation on mobile, never shrink to illegibility
- Data source attribution always present but minimal (small text, bottom of section)

---

### 6. SCHEDULE & TIMELINE

**The Challenge:** Present a 17-day, multi-venue, multi-timezone schedule that feels effortless.

**Specification:**
- Day selector: horizontal scrollable strip of dates (Feb 6–22), today highlighted
- View modes: "By Time" (chronological), "By Sport" (grouped), "By Venue" (location-based)
- Each event: sport icon, event name, time (user's local timezone), venue, status (upcoming/live/completed)
- "Live Now" events pinned to top with pulsing indicator
- Filter by: sport, venue, medal events only, favorited events
- Favorite toggle: small heart/star, persists in localStorage
- Smooth animated transitions when switching days or filters — list items slide/fade, never hard-swap

**Rules:**
- All times displayed in user's local timezone (auto-detected, overridable)
- Timezone indicator always visible: "Times shown in CST (UTC-6)"
- Today's date auto-selected on load
- Loading: skeleton rows matching event card height
- Empty filter state: "No events match your filters" with clear-filters action
- Mobile: single-column list, swipe between days

---

### ~~7. SCROLL STORYTELLING SECTION~~ — REMOVED

> **CUT FROM SCOPE.** Editorial storytelling is not aligned with the hub direction. The `/stories` route and `components/story/` are deprecated. If storytelling is revisited later, it would be a separate concern.

---

### 8. SEARCH / COMMAND PALETTE

**The Challenge:** Find anything in the app in < 2 seconds.

**Specification:**
- Trigger: ⌘K (Mac) / Ctrl+K (Windows), or search icon in nav
- Full-screen overlay with centered search input, blurred background
- Instant fuzzy search across: sports, athletes, countries, venues, events, dates
- Results grouped by category with subtle section headers
- Keyboard navigation: ↑↓ to move, Enter to select, Esc to close
- Recent searches persisted
- "No results" state: helpful suggestion ("Try searching for a sport or country name")

**Reference:** cmdk by Paco Coursey — study its animation, focus management, and keyboard handling.

**Rules:**
- Opens in ≤ 100ms
- Search results appear as user types (debounced 150ms)
- Focus trapped within palette when open
- Accessible: proper `role="dialog"`, `aria-label`, focus management
- Mobile: full-screen search view with native keyboard, no overlay tricks

---

### 9. DARK / LIGHT MODE & ATMOSPHERIC THEMING

**The Challenge:** Not just a color swap — an atmospheric shift.

**Specification:**
- Light mode: crisp Alpine morning. Cool whites, soft shadows, bright data colors.
- Dark mode: floodlit night event. Deep navy/charcoal, warm accent glows, subdued data colors with higher saturation.
- Toggle: small sun/moon icon in nav, animated icon morph transition
- System preference respected on first visit (`prefers-color-scheme`)
- User override persists in localStorage

**Rules:**
- Theme switch does NOT trigger transitions on content elements (Paco Coursey / next-themes approach)
- Only `background-color`, `color`, and `border-color` transition on theme change (300ms)
- All color tokens defined as CSS custom properties — no hardcoded colors anywhere
- Both modes must maintain WCAG AA contrast
- Dark mode images: slightly reduce brightness (filter: brightness(0.9)) to prevent eye strain
- Country vibe system colors adapt to dark/light mode — each country theme defines both palettes

---

### 10. MICRO-INTERACTIONS & FEEDBACK SYSTEM

**The Challenge:** The connective tissue that makes the app feel alive.

**Specification:**

**Buttons:**
- Press: scale to 0.97, 100ms spring
- Hover: subtle background tint or underline animation
- Disabled: reduced opacity (0.5), no hover effects, no tooltip
- Loading: inline spinner replacing button text, button width locked to prevent layout shift

**Toasts / Notifications:**
- Slide in from bottom-right (desktop) or top (mobile)
- Auto-dismiss in 4 seconds with progress bar
- Stack up to 3, older ones push up
- Dismissible via swipe (mobile) or X button (desktop)

**Cursor Effects (desktop only, subtle):**
- Custom cursor on interactive cards: pointer with subtle scale pulse
- Optional: magnetic pull toward interactive elements (very subtle, 2–4px max)
- Disabled on touch devices entirely

**Loading States:**
- Skeleton screens that exactly match content dimensions
- Shimmer animation: subtle left-to-right sweep, ≤ 1.5s duration, looping
- Never show a spinner for < 300ms of loading (prevent flash)

**Transitions Between Views:**
- Shared layout animations: when a card expands to a detail view, the card elements animate to their new positions (Framer Motion `layoutId`)
- Page transitions: crossfade with 200ms duration, content slides up 8px
- No transition longer than 300ms for navigation

**Rules:**
- Every interactive element has a hover, active, focus, and disabled state defined
- No interaction without feedback — every click, tap, or key press produces a visible response
- All animation values use CSS custom properties for theme-level tuning
- `pointer-events: none` on all decorative elements (glows, gradients, overlays)

---

### 11. TYPOGRAPHY SYSTEM

**The Challenge:** Type as interface. Type as identity.

**Specification:**

**Font Stack:**
- Primary: Inter Variable (or equivalent variable sans-serif) — body text, UI elements, data
- Display: A variable display font (candidate: Space Grotesk, Instrument Serif, or a custom subset) — headings, hero text, section titles
- Mono: JetBrains Mono or Commit Mono — code snippets, technical data, timestamps

**Scale (fluid, clamp-based):**
- Hero: `clamp(48px, 8vw, 96px)`
- H1: `clamp(32px, 5vw, 56px)`
- H2: `clamp(24px, 3.5vw, 40px)`
- H3: `clamp(20px, 2.5vw, 28px)`
- Body: `clamp(15px, 1.2vw, 18px)`
- Small/Caption: `clamp(12px, 1vw, 14px)`
- Data/Stats: `clamp(14px, 1.1vw, 16px)` with `tabular-nums`

**Line Height:**
- Headings: 1.1–1.2
- Body: 1.5–1.6
- Data: 1.3

**Country Vibe Adjustments:**
- The variable font's `wght` axis shifts per theme (Japan lighter: 300–400, USA bolder: 500–700)
- Letter-spacing adjusts: Japan wider (+0.02em), Switzerland tighter (-0.01em)
- No font family swap mid-theme — only axis and spacing adjustments

**Rules:**
- All font files self-hosted, subsetted, preloaded
- `font-display: swap` for body, `font-display: optional` for display (prevents FOUT on hero)
- `-webkit-font-smoothing: antialiased` globally
- `text-rendering: optimizeLegibility` globally
- No font weight below 400 rendered
- Numbers in data contexts always use `font-variant-numeric: tabular-nums`

---

### 12. RESPONSIVE & MOBILE EXPERIENCE

**The Challenge:** Not a shrunk desktop — a native-feeling mobile experience.

**Specification:**
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Mobile-first CSS — base styles are mobile, wider screens layer on
- Bottom tab bar on mobile (not hamburger menu)
- Swipe gestures: swipe between schedule days, swipe to dismiss toasts
- Touch targets: minimum 44px × 44px
- Data tables: horizontal scroll with sticky first column on mobile
- Charts: reflow to vertical or simplified view, never just shrink

**Rules:**
- Test at 320px width minimum (iPhone SE)
- No horizontal scroll on any page at any breakpoint (except intentional carousels/tables)
- Images: responsive `srcset` with appropriate sizes
- Tap delay eliminated with `touch-action: manipulation`
- Pull-to-refresh on schedule page (native feeling)

---

### 13. FOOTER & EASTER EGGS

**The Challenge:** The sign-off that rewards exploration.

**Specification:**
- Minimal footer: "Built by Dalton @ GalaxyCo.ai" | Links: GitHub, Portfolio, Source Code
- Olympic rings rendered in pure CSS, animated on hover
- Colophon: list fonts, tech stack, inspiration credits
- Easter egg: Konami code or specific interaction reveals a hidden mini-game or animation (e.g., a tiny ski jumper that flies across the screen)
- "Powered by" section crediting data sources

**Rules:**
- Footer never sticky or fixed — only visible at page bottom
- Links are real, functional, and accessible
- Easter eggs never interfere with normal usage

---

## III. TECHNICAL CONSTITUTION

### Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | File-based routing, server components, image optimization |
| Language | TypeScript (strict mode) | Type safety, developer confidence |
| Styling | Tailwind CSS + CSS custom properties | Utility-first with theme token system |
| Animation | Framer Motion | Layout animations, spring physics, gesture support |
| Data Viz | Recharts + custom SVG | Recharts for standard charts, custom SVG for unique visualizations |
| State | Zustand | Lightweight, no boilerplate, perfect for theme/filter state |
| Validation | Zod | Runtime type validation for API data |
| Search | Fuse.js | Client-side fuzzy search for command palette |
| Command Palette | cmdk | Paco Coursey's composable command menu |
| Icons | Lucide React | Consistent, tree-shakable, customizable |
| Fonts | Self-hosted variable fonts | Performance, no external dependencies |

### Code Standards

- **TypeScript strict mode** — no `any`, no `@ts-ignore` without documented reason
- **Zod validation** on all external data (API responses, localStorage reads)
- **Components:** functional, with explicit prop types, no default exports (named exports only)
- **Files:** one component per file, colocated styles/tests
- **Naming:** PascalCase components, camelCase functions/variables, kebab-case files
- **Comments:** explain "why," not "what" — code should be self-documenting
- **CSS:** Tailwind utilities first, CSS custom properties for theme tokens, `@apply` sparingly
- **No inline styles** except for dynamic values (e.g., `style={{ '--progress': value }}`)
- **Accessibility:** every PR must pass axe-core automated checks
- **Performance:** Lighthouse ≥ 90 on all four metrics (Performance, Accessibility, Best Practices, SEO)

### File Structure

```
olympus/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout with theme provider
│   ├── page.tsx              # Home / Hero
│   ├── sports/
│   │   ├── page.tsx          # Sports grid
│   │   └── [sport]/page.tsx  # Sport detail
│   ├── schedule/page.tsx     # Schedule & timeline
│   ├── medals/page.tsx       # Medal tracker & map
│   ├── countries/
│   │   ├── page.tsx          # Country grid
│   │   └── [country]/page.tsx
│   └── venues/page.tsx       # Venue explorer
├── components/
│   ├── ui/                   # Primitive UI components (Button, Card, Input, etc.)
│   ├── nav/                  # Navigation, command palette
│   ├── hero/                 # Hero section components
│   ├── sports/               # Sport cards, detail views
│   ├── data/                 # Charts, medal tracker, stats
│   ├── schedule/             # Timeline, day selector
│   ├── home/                 # Dashboard panels (Live, Schedule, Medals)
│   └── theme/                # Country vibe system, dark/light toggle
├── lib/
│   ├── themes/               # Country theme definitions
│   ├── data/                 # Static Olympic data (sports, venues, countries)
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   └── types/                # Shared TypeScript types & Zod schemas
├── public/
│   ├── fonts/                # Self-hosted variable fonts
│   ├── flags/                # Country flag SVGs
│   └── icons/                # Sport icon SVGs
└── styles/
    ├── globals.css           # CSS custom properties, base styles
    └── themes/               # Theme-specific token overrides
```

### Data Architecture

Olympic data is primarily static/semi-static for this project:

- **Static data** (in `lib/data/`): sports list, venues, country info, event schedule, historical records
- **Mock live data** (in `lib/data/`): medal counts, results, athlete profiles — structured as if from an API but stored as JSON, easily swappable for a real API later
- **All data validated with Zod schemas** at build time and runtime
- **Type definitions** generated from Zod schemas (single source of truth)

---

## IV. DEVELOPMENT WORKFLOW

### For Claude Code (Terminal Instructions)

This project is designed to be built incrementally via Claude Code while the developer focuses on other work. Each section of the anatomy is independently buildable.

**Build Order (recommended):**

1. ~~**Foundation:**~~ ✅ CSS tokens, themes, typography, Zod schemas
2. ~~**Shell:**~~ ✅ WorkspaceShell, TopBar, Sidebar, CenterStage, Drawer
3. **Home Dashboard:** Compact hero banner + live panels (Live Events, Today's Schedule, Medal Snapshot)
4. **Sport Cards:** Grid layout, card component, live/next/complete status, hover/click interactions
5. **Schedule:** Day selector, event list, filtering, timezone
6. **Medal Tracker:** Leaderboard, animated counters, country drill-down
7. **Data Viz:** Charts, medal map, athlete profiles
8. **Search:** Wire command palette to Perplexity
9. **AI Layer:** Claude insight buttons + companion chat
10. **Polish:** Micro-interactions, loading states, remaining country themes, easter eggs, responsive pass

**Per-section checklist:**
- [ ] Component renders correctly
- [ ] Dark/light mode works
- [ ] At least one country theme visually shifts the component
- [ ] Keyboard accessible
- [ ] Mobile responsive
- [ ] Loading/empty states handled
- [ ] Animations respect `prefers-reduced-motion`
- [ ] TypeScript strict — no errors
- [ ] Lighthouse audit: ≥ 90 all categories

---

## V. CONTENT REFERENCE

### 16 Olympic Sports (Milan Cortina 2026)

| Sport | Venue | Territory |
|---|---|---|
| Alpine Skiing | Tofane Centre / Stelvio | Cortina / Bormio |
| Biathlon | Anterselva Arena | Anterselva |
| Bobsleigh | Cortina Sliding Centre | Cortina |
| Cross-Country Skiing | Tesero Stadium | Tesero |
| Curling | Cortina Curling Stadium | Cortina |
| Figure Skating | Milano Ice Skating Arena | Milano |
| Freestyle Skiing | Livigno Snow Park / Aerials Park | Livigno |
| Ice Hockey | Santagiulia Arena / Rho Arena | Milano |
| Luge | Cortina Sliding Centre | Cortina |
| Nordic Combined | Predazzo / Tesero | Predazzo / Tesero |
| Short Track Speed Skating | Milano Ice Skating Arena | Milano |
| Skeleton | Cortina Sliding Centre | Cortina |
| Ski Jumping | Predazzo Stadium | Predazzo |
| Ski Mountaineering ⭐ | Stelvio Ski Centre | Bormio |
| Snowboard | Livigno Snow Park | Livigno |
| Speed Skating | Milano Speed Skating Stadium | Milano |

⭐ = Olympic debut at Milan Cortina 2026

### Key Venues

| Venue | Events | Capacity | Fun Fact |
|---|---|---|---|
| San Siro Stadium | Opening Ceremony | 75,000 | "Temple of Football" |
| Arena di Verona | Closing Ceremony | 15,000 | Roman amphitheater built ~30 AD |
| Cortina Sliding Centre | Bobsleigh, Luge, Skeleton | — | Built on site of 1956 Olympic track |
| Livigno Snow Park | Snowboard, Freestyle | — | Big air jump > 160 feet tall |
| Milano Ice Skating Arena | Figure Skating, Short Track | 10,000 | Europe's premier skating facility |

### Mascots

- **Tina** (Olympic mascot) — named for Cortina
- **Milo** (Paralympic mascot) — named for Milano

---

---

*Constitution v1.1 — Olympus Project — GalaxyCo.ai — February 2026*
*Revised: Pivoted from editorial/magazine to data-first tracking hub.*


---

## VII. DATA & AI ARCHITECTURE

### Philosophy

Real data, always beautiful. Olympus uses live Olympic data from multiple sources with intelligent fallbacks so the app is always accurate, always fast, and never shows empty states. AI isn't a feature — it's a layer of intelligence woven throughout the entire experience.

---

### A. Data Pipeline — Three Tiers

#### Tier 1: Firecrawl (Scheduled Scraping)

**Role:** Structured data warehouse. The source of truth for medals, results, schedules, and standings.

**Targets:**
- olympics.com — medal standings, event results, schedules, athlete rosters
- nbcolympics.com — athlete profiles, event recaps, editorial context
- Venue/weather data for Cortina, Milan, Livigno, Verona clusters

**Cadence:**
- During live events: scrape every 5 minutes for active sports, 15 minutes for standings
- Off-hours: scrape every 30 minutes
- One-time scrapes: venue info, sport explainers, historical data (cached permanently)

**Caching Strategy:**
- All scraped data cached as JSON in `/lib/data/cache/`
- Each cache file includes `lastUpdated` timestamp and `source` URL
- Cache is validated with Zod schemas before serving to UI
- Stale cache (>30 min for live data) triggers re-scrape on next request

**Rate Limit Protection:**
- Queue-based scraping with configurable delays between requests
- Exponential backoff on failures (1s → 2s → 4s → 8s → max 60s)
- If Firecrawl rate limit hit, fall through to Tier 3 (static fallback)

#### Tier 2: Static Fallback (Last-Known-Good)

**Role:** Safety net. Ships with the app so it never renders empty.

**Contents:**
- Complete schedule for all 17 days (Feb 6-22, 2026)
- All 16 sports with descriptions, rules, scoring, and venue assignments
- Country roster (90+ nations) with flag assets and basic info
- Venue details with coordinates, capacities, and descriptions
- Historical medal data (2022 Beijing, 2018 PyeongChang) for comparison features
- Pre-scraped athlete profiles for top 50 medal contenders

**Update Strategy:**
- Static data is the "floor" — always available, never stale for structural data
- Medal counts and results in static data represent last-known-good snapshot
- On app build, static data is refreshed from latest cache if available

#### Data Flow

```
Request for data
    → Check in-memory cache (< 1 min old?)
        → YES: serve immediately
        → NO: Check file cache (within freshness window?)
            → YES: serve + trigger background refresh
            → NO: Firecrawl scrape
                → SUCCESS: update cache, serve
                → FAIL (rate limit/error): serve stale cache
                    → If no cache exists: serve static fallback
```

---

### B. AI Integration — Two Systems

#### System 1: Perplexity Search — "The Search Google Should Have Built"

**Role:** The app's search engine. Beautiful UI, real-time sourced answers, dual-mode.

**API:** Perplexity Pro API (sonar model)

**Dual Mode Toggle:**
- **Olympics Mode (default):** Every query prepended with system context: "You are a search engine for the 2026 Milan Cortina Winter Olympics. Prioritize current Olympic results, athletes, schedules, and events. Cite sources."
- **Open Mode:** Unrestricted search with Olympics context available but not forced. Users can ask about Milan restaurants, Cortina travel tips, Italian culture, or anything else.

**Search UI Design:**
- Triggered via Command Palette (⌘K / Ctrl+K) or dedicated search bar
- Full-screen overlay with blurred background (matches existing command palette spec)
- Mode toggle: pill-shaped switcher at top — "Olympics" | "Open"
- Results render as beautifully formatted cards with:
  - Structured answer (markdown rendered)
  - Source citations as subtle linked chips
  - Related follow-up questions as clickable suggestions
- Search history persisted in localStorage
- Recent/trending Olympic searches shown on empty state

**Query Enhancement:**
- Olympics Mode auto-appends current context: today's date, active events, recent medal updates
- Fuzzy matching for athlete/sport names (handles misspellings)
- Debounced input (200ms) to avoid excessive API calls

**Cost Management:**
- Results cached by query hash for 5 minutes (Olympics Mode) or 15 minutes (Open Mode)
- Suggested/trending queries pre-fetched and cached
- Maximum 100 queries/hour soft limit with graceful degradation message

#### System 2: Claude — The Olympic Companion

**Role:** Intelligence layer woven throughout the entire app. Two interaction modes.

**API:** Anthropic Claude API (claude-sonnet-4-20250514 for insight buttons, claude-sonnet-4-20250514 for companion chat)

**Layer 1: Claude Insight Buttons (ⓒ)**

*The contextual intelligence primitive.*

**Design:**
- Small circular button featuring Claude's logomark (∿ or stylized "C")
- Size: 20-24px, subtle but discoverable
- Appears near data points, athlete names, scores, events, venues throughout the app
- Hover: gentle scale + tooltip "Ask Claude"
- Respects country theme colors (button tint adapts)

**Interaction:**
- Click → popover card animates in (200ms spring, origin from button position)
- Card contains Claude-generated contextual insight about the adjacent content
- Card width: 280-360px, max-height: 400px with scroll
- Dismiss: click outside, Escape key, or click button again
- Only one insight card open at a time (opening another closes the previous)

**Placement Examples:**
| Location | Insight Content |
|---|---|
| Athlete name | Career highlights, fun facts, medal history, rivalry context |
| Medal count | Pace analysis vs. 2022, historical comparison, projection |
| Event on schedule | "Why this matters" — stakes, favorites, what to watch for |
| Sport card | Scoring system explainer, key rules, common controversies |
| Score/result | Context for the result, records broken, significance |
| Venue name | History, unique features, elevation/conditions, past Olympic moments |
| Country on leaderboard | Team strengths, surprise stories, historical Olympic identity |

**Prompt Architecture:**
```
System: You are an Olympic expert embedded in a 2026 Milan Cortina
Winter Olympics app. Provide concise, insightful context about the
item the user clicked. Be knowledgeable but conversational — like a
brilliant friend who knows everything about the Olympics. Keep
responses under 150 words unless the topic demands more. Include
one surprising or delightful fact when possible.

Context: {currentMedalStandings}, {todaySchedule}, {recentResults}

User clicked: {elementType} — {elementData}
```

**Caching:**
- Insight responses cached by element ID + data hash
- Cache TTL: 15 minutes for live data (medals, results), 24 hours for static data (venues, sport rules)
- Pre-generate insights for "hot" content (current leaders, today's events) on a 30-minute cycle
- Cached insights served instantly; fresh generation takes 1-3 seconds with skeleton loader

**Layer 2: Ambient Companion (Chat Panel)**

*The open-ended Olympic expert.*

**Design:**
- Floating action button (bottom-right, above footer) with Claude's logomark
- Click → slide-out panel from right (desktop) or bottom sheet (mobile)
- Panel width: 400px desktop, full-width mobile
- Translucent header with "Claude — Olympic Companion" title
- Chat interface: user messages right-aligned, Claude left-aligned
- Suggested prompts on empty state:
  - "What should I watch today?"
  - "Explain figure skating scoring"
  - "Compare Norway vs. Canada this Olympics"
  - "Tell me something surprising about the host city"
  - "Who are the athletes to watch in [sport]?"

**Conversation Design:**
- Session-persistent (survives page navigation within session)
- Claude has full context: current medal standings, today's schedule, recent results
- Conversation history maintained in session (not persisted to localStorage for privacy)
- Max conversation length: 20 turns before suggesting "Start fresh?"

**Prompt Architecture:**
```
System: You are the Olympic Companion for Olympus, a premium 2026
Milan Cortina Winter Olympics experience. You're knowledgeable,
warm, and genuinely excited about the Olympics. You can:
- Recommend what to watch based on user interests
- Explain rules and scoring for any sport
- Provide historical context and rivalries
- Analyze medal races and make projections
- Share stories about athletes, venues, and host cities
- Discuss strategy, technique, and what makes performances special

Current Olympic State:
{medalStandings}
{todaySchedule}
{recentResults}
{liveEvents}

Keep responses conversational and concise. Use formatting sparingly
— this is a chat, not an article. If asked about non-Olympic topics,
gently redirect: "I'm your Olympic companion — want to talk about
what's happening on the ice/slopes/track today?"
```

**Cost Management — Claude API:**
- Budget ceiling: configurable via environment variable `CLAUDE_MONTHLY_BUDGET`
- Default: $50/month
- Insight buttons: ~$0.001-0.003 per generation (short prompts, cached aggressively)
- Companion chat: ~$0.01-0.03 per turn (longer context)
- Estimated capacity at $50/month: ~5,000 insight generations + ~2,000 chat turns
- When budget approaches 80%, reduce pre-generation and increase cache TTLs
- At 95%, disable pre-generation entirely; insight buttons still serve cached content
- At 100%, companion chat shows "Claude is resting — check back soon" with graceful UI

---

### C. Data Freshness UX

**Primary: Subtle Timestamp**
- Near any data section that updates: small muted text — "Updated 3 min ago"
- Uses relative time (just now, 1 min ago, 5 min ago, 1 hour ago)
- Typography: smallest text size in scale, 50% opacity, positioned bottom-right of data sections
- Timestamps use `<time>` element with `datetime` attribute for accessibility

**Secondary (if needed): Visual Freshness Indicator**
- Tiny dot (6px) adjacent to timestamp
- Green: data < 5 min old
- Amber: data 5-30 min old
- Grey: data > 30 min old or from static fallback
- Smooth color transition (300ms)
- Not implemented in v1 — added only if user testing reveals confusion about data currency

---

### D. Environment Variables

```env
# Firecrawl
FIRECRAWL_API_KEY=
FIRECRAWL_RATE_LIMIT=60          # requests per minute

# Perplexity
PERPLEXITY_API_KEY=
PERPLEXITY_MODEL=sonar            # or sonar-pro for higher quality
PERPLEXITY_CACHE_TTL_OLYMPICS=300 # 5 minutes
PERPLEXITY_CACHE_TTL_OPEN=900    # 15 minutes

# Claude / Anthropic
ANTHROPIC_API_KEY=
CLAUDE_INSIGHT_MODEL=claude-sonnet-4-20250514
CLAUDE_COMPANION_MODEL=claude-sonnet-4-20250514
CLAUDE_MONTHLY_BUDGET=50          # USD
CLAUDE_INSIGHT_CACHE_TTL=900      # 15 min for live data
CLAUDE_STATIC_CACHE_TTL=86400     # 24 hours for static data

# General
DATA_REFRESH_LIVE=300             # 5 min during live events
DATA_REFRESH_IDLE=1800            # 30 min off-hours
NEXT_PUBLIC_APP_URL=
```

---

### E. API Route Structure

```
app/api/
├── data/
│   ├── medals/route.ts        — GET medal standings (cached)
│   ├── schedule/route.ts      — GET schedule by date
│   ├── results/route.ts       — GET event results
│   ├── athletes/[id]/route.ts — GET athlete profile
│   └── refresh/route.ts       — POST trigger manual refresh
├── search/
│   └── route.ts               — POST Perplexity search query
├── claude/
│   ├── insight/route.ts       — POST contextual insight generation
│   └── companion/route.ts     — POST companion chat message
└── health/
    └── route.ts               — GET data freshness status
```

---

### F. Zod Schemas (Data Validation)

All external data (scraped, API responses) is validated through Zod schemas before entering the app. Schemas live in `lib/types/` and are the single source of truth for TypeScript types.

Key schemas:
- `MedalStandingsSchema` — country, gold, silver, bronze, total, rank
- `EventResultSchema` — sport, event, athletes, scores, status, timestamp
- `ScheduleEntrySchema` — date, time, sport, event, venue, status, broadcast
- `AthleteProfileSchema` — name, country, sports, medals, bio, image
- `PerplexityResponseSchema` — answer, sources, followUpQuestions
- `ClaudeInsightSchema` — content, elementType, elementId, generatedAt
- `DataFreshnessSchema` — source, lastUpdated, status (fresh/stale/fallback)

---

*Data & AI Architecture v1.0 — Olympus Project — GalaxyCo.ai — February 2026*
