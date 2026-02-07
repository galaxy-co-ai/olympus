# Olympus — Claude Code Instructions

> Milan Cortina 2026 Winter Olympics Web Experience

## Constitution Reference

The full specification lives in `OLYMPUS_CONSTITUTION.md` (~1,560 lines). Reference section numbers when implementing:

| Section | Lines | Contents |
|---------|-------|----------|
| I. Design Philosophy | 13-91 | Rauno's enforced rules, inspiration roster |
| 1. Hero | 99-118 | Landing experience spec |
| 2. Navigation | 123-271 | Four-layer nav system |
| 3. Country Vibe | 274-598 | **Complete** — theme architecture, Olympus palette |
| 4. Sport Cards | 601-830 | **Complete** — card anatomy, grid, transitions |
| 5. Data Viz | 833-874 | Medal tracker, charts |
| 6. Schedule | 876-897 | Timeline, day selector |
| III. Technical | 1088-1168 | Stack, file structure, code standards |
| VII. Data & AI | 1260-1558 | Firecrawl, Perplexity, Claude integration |

## Stack

- **Next.js 16** with App Router (Turbopack)
- **TypeScript** strict mode
- **Tailwind CSS v4** with CSS custom properties
- **Framer Motion** for layout animations
- **Zustand** for state
- **Zod** for validation
- **cmdk** for command palette
- **next-themes** for dark/light mode

## Critical Patterns

### Theme Switching (Rauno's Rule)
Theme changes NEVER trigger transitions. We use:
- `data-theme` attribute (not class)
- `disableTransitionOnChange` on ThemeProvider
- CSS `* { transition-property: none; }` by default

### Country Accents
Country selection applies `data-country="xxx"` to `:root`. CSS handles all color changes — no React re-renders.

### Typography
- All numbers use `font-variant-numeric: tabular-nums`
- No font weights below 400
- `-webkit-font-smoothing: antialiased` globally
- Fluid type scale with `clamp()`

### Accessibility
- Focus rings via `box-shadow` (not outline)
- `@media (hover: hover)` for hover states
- Touch targets >= 44px
- `prefers-reduced-motion` respected

## File Structure

```
app/                    # Routes
components/
  ui/                   # Primitives (Button, Card, etc.)
  nav/                  # Navigation components
  theme/                # ThemeProvider, CountryProvider
  sports/               # Sport cards, detail views
  data/                 # Charts, medal tracker
lib/
  data/                 # Static Olympic data
  types/                # Zod schemas + TypeScript types
  utils/                # cn(), formatters
  hooks/                # Custom hooks
```

## Gotchas

1. **Tailwind v4** uses `@theme inline` block, not `theme.extend` in config
2. **next-themes** must use `attribute="data-theme"` to match our CSS
3. **Inter** loads via next/font — use `--font-inter` CSS variable
4. **Country codes** are ISO 3166-1 alpha-3 lowercase (usa, nor, jpn, etc.)

## Commands

```bash
pnpm dev      # Start dev server (Turbopack)
pnpm build    # Production build
pnpm lint     # ESLint
pnpm typecheck # TypeScript check (add to scripts)
```

## Current State

**Foundation Complete:**
- [x] Project scaffolded with Next.js 16
- [x] Complete CSS token system (800+ lines)
- [x] Dark/light theme provider
- [x] Country accent system (15 countries)
- [x] Typography scale with fluid clamp()
- [x] Glass effect utility
- [x] Skeleton animation
- [x] Route placeholders
- [x] Zod schemas for data types

**Next Up:**
- [ ] Navigation (Section 2)
- [ ] Hero (Section 1)
- [ ] Sport cards (Section 4)
