'use client';

/**
 * HeroToolbar — Floating tabbed toolbar for the homepage
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2
 * - Glass pill container docked at bottom of hero
 * - Three tabs: Live, Medals, Schedule
 * - Animated active pill using Framer Motion layoutId
 * - Live tab gets pulsing dot when events are live
 */

import { motion } from 'framer-motion';
import { getLiveEvents, getTotalMedals } from '@/lib/data';

export type HeroTab = 'live' | 'medals' | 'schedule';

interface HeroToolbarProps {
  activeTab: HeroTab;
  onTabChange: (tab: HeroTab) => void;
}

const TABS: { id: HeroTab; label: string }[] = [
  { id: 'live', label: 'Live' },
  { id: 'medals', label: 'Medals' },
  { id: 'schedule', label: 'Schedule' },
];

const GAMES_START = new Date('2026-02-06');

function getGamesDay(): number {
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - GAMES_START.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(1, Math.min(diff + 1, 17));
}

export function HeroToolbar({ activeTab, onTabChange }: HeroToolbarProps) {
  const liveEvents = getLiveEvents();
  const hasLive = liveEvents.length > 0;
  const { total: totalMedals } = getTotalMedals();
  const gamesDay = getGamesDay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center gap-3"
    >
      {/* Day context line */}
      <p
        className="tabular-nums"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
        }}
      >
        Day {gamesDay} of 17 · {totalMedals} Medals Awarded
      </p>

      {/* Tab bar */}
      <div
        className="relative flex items-center gap-1 rounded-full p-1"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--color-glass-border)',
          boxShadow: 'var(--color-glass-shadow)',
        }}
        role="tablist"
        aria-label="Homepage content tabs"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isLiveTab = tab.id === 'live';

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-150"
              style={{
                fontSize: 'var(--text-small)',
                fontWeight: isActive ? 500 : 400,
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
              }}
            >
              {/* Live indicator dot */}
              {isLiveTab && hasLive && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
              )}

              {tab.label}

              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="hero-tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
