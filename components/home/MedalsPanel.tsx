'use client';

/**
 * MedalsPanel — Medal standings summary for homepage
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 5
 * - Day summary header
 * - Top 10 standings table
 * - Link to full standings page
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTopCountries, getTotalMedals } from '@/lib/data';
import { MedalTable } from '@/components/data';

const GAMES_START = new Date('2026-02-06');

function getGamesDay(): number {
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - GAMES_START.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(1, Math.min(diff + 1, 17));
}

export function MedalsPanel() {
  const topCountries = getTopCountries(10);
  const { total, gold } = getTotalMedals();
  const gamesDay = getGamesDay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h2
            className="font-semibold"
            style={{
              fontSize: 'var(--text-h3)',
              color: 'var(--color-text-primary)',
            }}
          >
            Medal Standings
          </h2>
          <p
            className="mt-1 tabular-nums"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            Day {gamesDay} · {total} medals awarded ({gold} gold)
          </p>
        </div>

        <Link
          href="/medals"
          className="group flex items-center gap-1 transition-colors"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--country-accent-primary)',
          }}
        >
          Full Standings
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Medal table */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <MedalTable standings={topCountries} limit={10} />
      </div>

      {/* Teaser for today's medals */}
      {gold > 0 && (
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <p
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            <span style={{ color: 'var(--color-gold)' }}>●</span>{' '}
            Norway leads with 2 golds after the Skiathlon and 5000m
          </p>
        </div>
      )}
    </motion.div>
  );
}
