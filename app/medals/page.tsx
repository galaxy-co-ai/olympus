/**
 * Medal Tracker Page
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 5 (lines 833-874)
 *
 * Sortable country leaderboard with animated medal counts.
 */

import { getStandingsWithRanks, getTotalMedals } from '@/lib/data';
import { MedalTable } from '@/components/data';
import { Globe } from 'lucide-react';

export const metadata = {
  title: 'Medal Tracker',
  description: 'Olympic medal standings for Milan Cortina 2026',
};

export default function MedalsPage() {
  const standings = getStandingsWithRanks();
  const totals = getTotalMedals();

  return (
    <div className="container max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      {/* Page header */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-baseline justify-between">
          <h1
            className="font-semibold"
            style={{
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-snug)',
              color: 'var(--color-text-primary)',
            }}
          >
            Medal Standings
          </h1>
          <time
            dateTime={new Date().toISOString()}
            className="hidden sm:block"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
              opacity: 0.5,
            }}
          >
            Updated just now
          </time>
        </div>

        {/* Total medals summary */}
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />
            <span
              className="tabular-nums font-medium"
              style={{ fontSize: 'var(--text-data)' }}
            >
              {totals.gold}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: 'var(--color-silver)' }}
            />
            <span
              className="tabular-nums font-medium"
              style={{ fontSize: 'var(--text-data)' }}
            >
              {totals.silver}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: 'var(--color-bronze)' }}
            />
            <span
              className="tabular-nums font-medium"
              style={{ fontSize: 'var(--text-data)' }}
            >
              {totals.bronze}
            </span>
          </div>
          <span
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            {totals.total} medals awarded
          </span>
        </div>
      </div>

      {/* Medal table */}
      <div className="rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
        <MedalTable standings={standings} />
      </div>

      {/* Medal Map placeholder */}
      <div className="mt-12">
        <h2
          className="mb-4 font-semibold"
          style={{
            fontSize: 'var(--text-h3)',
            color: 'var(--color-text-primary)',
          }}
        >
          Medal Map
        </h2>
        <div
          className="flex flex-col items-center justify-center rounded-xl py-16"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <Globe
            size={48}
            style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
          />
          <p
            className="mt-4"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Interactive Medal Map — Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
