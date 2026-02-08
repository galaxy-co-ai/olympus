# Olympus — CLAUDE.md

## Quick Start

```bash
pnpm dev      # Dev server (http://localhost:3011)
pnpm build    # Production build
pnpm lint     # ESLint
```

## Project Overview

| Key | Value |
|-----|-------|
| **Type** | Web app — Olympics tracking hub |
| **Stack** | Next.js 16 (App Router), TypeScript strict, Tailwind v4, Framer Motion, Zustand |
| **Search** | cmdk + Fuse.js (local), Perplexity API (AI search) |
| **AI** | Anthropic Claude (insight buttons + companion chat) |
| **Data** | Firecrawl scraping → JSON cache → Zod validated static fallback |
| **Hosting** | Vercel |
| **Port** | 3011 |

## What This Is

A well-engineered hub for following the 2026 Milan Cortina Winter Olympics. Data-first, scannable, real-time. Think Linear/Arc workspace, not a magazine or blog.

**It is NOT:** An editorial site, a news feed, or a scroll storytelling experience. Every screen exists to help users track what's happening in the Games.

## Architecture — Workspace Shell

4-zone CSS Grid. Shell never unmounts; content swaps in CenterStage.

```
┌─────────────────────────────────────────────────┐
│                    TopBar (56px)                │
├────────────┬─────────────────────┬──────────────┤
│  Sidebar   │    CenterStage      │  RightDrawer │
│  (240/64px)│    (flexible)       │   (360/0px)  │
└────────────┴─────────────────────┴──────────────┘
```

### Key Shell Files

```
components/shell/
  WorkspaceShell.tsx      # CSS Grid container + responsive
  TopBar.tsx              # Breadcrumb + search + controls
  Sidebar.tsx             # Collapsible nav, layoutId active pill
  CenterStage.tsx         # Content viewport with route transitions
  RightDrawer.tsx         # 2-tab drawer (Schedule/Medals)
  Mobile*.tsx             # Mobile overlay, bottom sheet
lib/stores/shell-store.ts # Zustand (sidebar, drawer, search state)
```

### Keyboard Shortcuts

- `⌘K` / `Ctrl+K`: Command palette
- `⌘B` / `Ctrl+B`: Toggle sidebar
- `⌘\` / `Ctrl+\`: Toggle drawer

## Routes

| Route | Purpose | Priority |
|-------|---------|----------|
| `/` | Dashboard home — live events, today's schedule, medal snapshot | **High** |
| `/sports` | Sport card grid — 16 sports, live/next/complete status | **High** |
| `/schedule` | Day-by-day schedule with filters | **High** |
| `/medals` | Medal tracker leaderboard + data viz | **High** |
| `/countries` | Country profiles | Medium |
| `/venues` | Venue explorer | Medium |
| `/theme` | Design system showcase (portfolio piece) | Low |

**Removed:** `/stories` route — editorial storytelling is cut from scope.

## Build Order (Hub-First)

1. ~~Foundation~~ ✅ (CSS tokens, themes, typography, Zod schemas)
2. ~~Shell~~ ✅ (WorkspaceShell, TopBar, Sidebar, CenterStage, Drawer)
3. **Home dashboard** — compact hero + live panels (not cinematic landing)
4. **Sport cards** — grid with live/next/complete status, card-to-detail transitions
5. **Schedule** — day selector, event list, filtering, timezone
6. **Medal tracker** — leaderboard, animated counters, country drill-down
7. **Data viz** — charts, medal map, athlete profiles
8. **Search** — wire command palette to Perplexity
9. **AI layer** — Claude insight buttons + companion chat
10. **Polish** — loading states, remaining country themes, easter eggs, responsive pass

## Design System

Full specification in `OLYMPUS_CONSTITUTION.md`. Key points:

- **Rauno's rules enforced** — quality bar checklist in Section I
- **3-tier theming:** Olympus base palette → semantic tokens → country accents
- **800+ lines of CSS custom properties** in `globals.css`
- **15 country themes** with light/dark variants, applied via `data-country` on `:root`
- **All colors through semantic tokens** — zero hardcoded hex in components

### Critical Patterns

- Theme switching is INSTANT — no transitions (Rauno's rule)
- `data-theme` attribute (not class) via next-themes
- Country accents via `data-country` on `:root` — CSS-only, no React re-renders
- `tabular-nums` on ALL numbers
- Focus rings via `box-shadow`, not outline
- Hover states behind `@media (hover: hover)`
- Touch targets >= 44px
- `prefers-reduced-motion` respected everywhere

## File Structure

```
app/                    # Routes
components/
  shell/                # Workspace shell (7 zone components)
  hero/                 # Landing/dashboard components
  sports/               # Sport cards, detail views
  schedule/             # Timeline, day selector, filters
  data/                 # Charts, medal tracker
  search/               # CommandPalette, SearchResults
  home/                 # Dashboard panels (Live, Schedule, Medals)
  ui/                   # Primitives (Button, Select, Skeleton, Toast)
  theme/                # ThemeProvider, CountryProvider
  nav/                  # Legacy nav utilities
  footer/               # Footer + Olympic rings
  easter-egg/           # Konami code
lib/
  stores/               # Zustand (shell-store)
  data/                 # Static Olympic data (sports, medals, schedule)
  types/                # Zod schemas + TypeScript types
  themes/               # Country theme definitions
  hooks/                # useCommandK, useShellShortcuts, useFavorites, useSearch
  search/               # Search index (Fuse.js)
  utils/                # cn(), timezone
```

## Environment

Required `.env.local`:
```bash
FIRECRAWL_API_KEY=
PERPLEXITY_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Gotchas

1. **Tailwind v4** uses `@theme inline` block, not `theme.extend` in config
2. **next-themes** uses `attribute="data-theme"` to match our CSS
3. **Inter** loads via next/font — use `--font-inter` CSS variable
4. **Country codes** are ISO 3166-1 alpha-3 lowercase (usa, nor, jpn)
5. **Shell never unmounts** — routes swap in CenterStage only
6. **Port 3011** — custom dev port, not 3000
7. **No story/editorial components** — scroll storytelling is cut from scope
8. **Home = dashboard**, not cinematic hero. Compact, data-dense, functional.
9. **useRolodex curves are inverted** — `scrollYProgress` with `['start end', 'end start']` maps edges→0/1, center→0.5. Output arrays: edges get max values (1.0), center gets min values (0.88/0.15). Counterintuitive but correct.
10. **CenterStage steals scroll** — Inner containers need explicit `height` (not just `max-h`) + `overflow-y-auto` to scroll independently from CenterStage's own overflow.

## Constitution Reference

`OLYMPUS_CONSTITUTION.md` has the detailed specs. Key sections:

| Section | What |
|---------|------|
| I. Design Philosophy | Rauno's enforced quality bar rules |
| 3. Country Vibe | Complete 3-tier theme architecture |
| 4. Sport Cards | Card anatomy, grid, transitions, interactions |
| 5. Data Viz | Medal tracker, charts, athlete profiles |
| 6. Schedule | Timeline, day selector, filtering |
| III. Technical | Stack, code standards, file structure |
| VII. Data & AI | Firecrawl, Perplexity, Claude integration |
