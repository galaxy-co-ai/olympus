# Olympus — Project INDEX

> 2026 Milan Cortina Winter Olympics tracking hub. Data-first, scannable, real-time.

## Quick Start

```bash
pnpm dev      # http://localhost:3011
pnpm build    # Production build
pnpm lint     # ESLint
```

## Stack

Next.js 16 (App Router) · TypeScript strict · Tailwind v4 · Framer Motion · Zustand · Zod · cmdk + Fuse.js

## Architecture — Workspace Shell

4-zone CSS Grid. Shell never unmounts; content swaps in CenterStage.

```
┌──────────────────────────────────────────────────┐
│                  TopBar (56px)                    │
├────────────┬──────────────────────┬──────────────┤
│  Sidebar   │    CenterStage      │  RightDrawer  │
│  (240/64px)│    (flexible)       │   (360/0px)   │
└────────────┴──────────────────────┴──────────────┘
```

## Key Directories

```
app/                        # Routes (/, /sports, /schedule, /medals, /countries, /venues, /theme)
components/
  shell/                    # WorkspaceShell, TopBar, Sidebar, CenterStage, RightDrawer, Mobile*
  home/                     # Dashboard: FeaturedHighlight, EventFeed (+ legacy LivePanel, MedalsPanel, SchedulePanel)
  hero/                     # HeroSection (legacy cinematic hero — no longer used on home)
  sports/                   # Sport cards, detail views
  schedule/                 # Timeline, day selector, filters
  data/                     # Charts, medal tracker
  search/                   # CommandPalette, SearchResults
  ui/                       # Primitives (Button, Select, Skeleton, Toast)
  theme/                    # ThemeProvider, CountryProvider
lib/
  stores/shell-store.ts     # Zustand — sidebar, drawer (Schedule/Medals tabs), search
  data/                     # Static Olympic data (sports.ts, medals.ts, schedule.ts)
  types/olympics.ts         # Zod schemas + TS types
  themes/                   # 15 country theme definitions
  hooks/                    # useCommandK, useShellShortcuts, useFavorites, useSearch
  search/                   # Fuse.js search index
```

## Home Dashboard (CenterStage)

- **FeaturedHighlight** — Large card for top event (live > upcoming medal > upcoming)
- **EventFeed** — Compact card grid of remaining today's events, grouped by status

## Right Drawer (2 tabs)

- **Schedule** — Today's events grouped by time period
- **Medals** — Medal standings leaderboard

## Design System

- 3-tier theming: Olympus base → semantic tokens → country accents
- 800+ CSS custom properties in `globals.css`
- 15 country themes (light/dark) via `data-country` on `:root`
- All colors through semantic tokens — zero hardcoded hex in components
- Rauno Freiberg quality bar enforced (see `OLYMPUS_CONSTITUTION.md`)

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Dashboard — FeaturedHighlight + EventFeed |
| `/sports` | Sport card grid (16 sports) |
| `/sports/[sport]` | Sport detail page |
| `/schedule` | Day-by-day schedule with filters |
| `/medals` | Medal tracker leaderboard |
| `/countries` | Country profiles |
| `/venues` | Venue explorer |
| `/theme` | Design system showcase |
