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
import { ChevronRight } from 'lucide-react';
import { SPORTS, getTopCountries, getTotalMedals } from '@/lib/data';
import { SportCardGrid } from '@/components/sports';
import { MedalTable } from '@/components/data';
import { HeroSection } from '@/components/hero';

export default function Home() {
  const topCountries = getTopCountries(10);
  const totals = getTotalMedals();

  return (
    <div>
      {/* ================================================================
          SECTION 1: CINEMATIC HERO
          Full-viewport immersive experience
          ================================================================ */}
      <HeroSection />

      {/* ================================================================
          CONTENT SECTIONS
          Revealed as hero dissolves on scroll
          Sits above hero in z-index with opaque background
          ================================================================ */}
      <div
        className="relative z-20"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
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
    </div>
  );
}
