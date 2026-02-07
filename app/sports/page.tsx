/**
 * Sports Grid Page
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 4 (lines 601-830)
 *
 * Displays all 16 Winter Olympic sports in an editorial grid layout.
 */

import { SPORTS } from '@/lib/data';
import { SportCardGrid } from '@/components/sports';

export const metadata = {
  title: 'Sports',
  description: '16 Winter Olympic sports at Milan Cortina 2026',
};

export default function SportsPage() {
  return (
    <div className="container max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      {/* Page header */}
      <div className="mb-8 md:mb-12">
        <h1
          className="font-semibold"
          style={{
            fontSize: 'var(--text-h1)',
            lineHeight: 'var(--leading-snug)',
            color: 'var(--color-text-primary)',
          }}
        >
          Sports
        </h1>
        <p
          className="mt-2"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-secondary)',
          }}
        >
          16 disciplines across 15 venues
        </p>
      </div>

      {/* Sport cards grid */}
      <SportCardGrid sports={SPORTS} />
    </div>
  );
}
