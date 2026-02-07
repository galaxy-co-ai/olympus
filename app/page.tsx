/**
 * Olympus Home Page
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 1: Hero / Landing Experience (lines 99-118)
 * - Section 4: Sport Cards (lines 601-830)
 * - Section 5: Medal Tracker (lines 833-874)
 *
 * Day 2 of the Games — content is live.
 */

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SPORTS, getTopCountries, getTotalMedals } from '@/lib/data';
import { SportCardGrid } from '@/components/sports';
import { MedalTable } from '@/components/data';

/**
 * Calculate days since games started (Feb 6, 2026)
 */
function getGameDay(): number {
  const gamesStart = new Date('2026-02-06');
  const now = new Date();
  const diffTime = now.getTime() - gamesStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

export default function Home() {
  const gameDay = getGameDay();
  const topCountries = getTopCountries(10);
  const totals = getTotalMedals();

  return (
    <div>
      {/* ================================================================
          SECTION 1: TEMPORARY HERO
          Full-viewport, minimal, placeholder for cinematic hero
          ================================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 30%,
              color-mix(in srgb, var(--olympus-glacier) 5%, transparent) 0%,
              transparent 50%),
              radial-gradient(ellipse at 50% 70%,
              color-mix(in srgb, var(--olympus-dolomite) 5%, transparent) 0%,
              transparent 50%)`,
          }}
        />

        {/* Content */}
        <div className="flex flex-col items-center px-6 text-center">
          {/* Main title */}
          <h1
            className="font-light"
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
            }}
          >
            Milano Cortina 2026
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 uppercase tracking-widest"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.2em',
            }}
          >
            XXVI Olympic Winter Games
          </p>

          {/* Day counter */}
          <p
            className="mt-8 tabular-nums"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
              opacity: 0.6,
            }}
          >
            Day {gameDay} of the Games
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown
            size={24}
            className="animate-bounce"
            style={{
              color: 'var(--color-text-muted)',
              opacity: 0.4,
            }}
          />
        </div>
      </section>

      {/* ================================================================
          SECTION 2: SPORTS GRID
          Live & Upcoming events
          ================================================================ */}
      <section className="container max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2
          className="mb-8 font-semibold"
          style={{
            fontSize: 'var(--text-h2)',
            color: 'var(--color-text-primary)',
          }}
        >
          Live & Upcoming
        </h2>

        <SportCardGrid sports={SPORTS} />
      </section>

      {/* ================================================================
          SECTION 3: MEDAL SNAPSHOT
          Top 10 countries + link to full standings
          ================================================================ */}
      <section className="container max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex items-baseline justify-between">
          <h2
            className="font-semibold"
            style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--color-text-primary)',
            }}
          >
            Medal Standings
          </h2>

          {/* Total medals count */}
          <p
            className="hidden tabular-nums sm:block"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            {totals.total} medals awarded
          </p>
        </div>

        {/* Top 10 table */}
        <div
          className="mt-8 overflow-hidden rounded-xl border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <MedalTable standings={topCountries} limit={10} />
        </div>

        {/* View all link */}
        <div className="mt-6 text-center">
          <Link
            href="/medals"
            className="group inline-flex items-center gap-1 transition-colors"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--country-accent-primary)',
            }}
          >
            View Full Standings
            <ChevronRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
