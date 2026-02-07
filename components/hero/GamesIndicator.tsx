'use client';

/**
 * Games Indicator
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - "Day X of 17" counter
 * - Gold medals awarded count
 * - Pulsing green dot if events are live
 * - Links to /schedule
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTotalMedals, SCHEDULE } from '@/lib/data';

const GAMES_START = new Date('2026-02-06');
const GAMES_END = new Date('2026-02-22');

/**
 * Calculate current games day (1-17)
 */
function getGamesDay(): number {
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - GAMES_START.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(1, Math.min(diff + 1, 17));
}

/**
 * Check if any events are live right now
 */
function hasLiveEvents(): boolean {
  return SCHEDULE.some((event) => event.status === 'live');
}

export function GamesIndicator() {
  const gamesDay = getGamesDay();
  const { gold } = getTotalMedals();
  const isLive = hasLiveEvents();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.3, ease: 'easeOut' }}
      className="mt-8"
    >
      <Link
        href="/schedule"
        className="group inline-flex items-center gap-3 rounded-full px-4 py-2 transition-shadow duration-150 hover:shadow-md"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
        }}
        aria-label={`View today's schedule — Day ${gamesDay} of the Games`}
      >
        {/* Live indicator */}
        {isLive && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
        )}

        {/* Day counter */}
        <span
          className="tabular-nums"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          Day <span style={{ color: 'var(--color-text-primary)' }}>{gamesDay}</span> of
          17
        </span>

        {/* Separator */}
        <span
          style={{
            color: 'var(--color-text-muted)',
            opacity: 0.4,
          }}
        >
          ·
        </span>

        {/* Gold medals */}
        <span
          className="tabular-nums"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          <span style={{ color: 'var(--color-gold)' }}>{gold}</span> Gold Medals
        </span>
      </Link>
    </motion.div>
  );
}
