'use client';

/**
 * HeroToolbar — Bottom-docked tab bar for homepage navigation
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2
 * - Tab shape emerging from bottom edge of screen
 * - Three tabs: Live, Medals, Schedule
 * - Animated active indicator using Framer Motion layoutId
 * - Live tab gets pulsing dot when events are live
 */

import { motion } from 'framer-motion';
import { getLiveEvents } from '@/lib/data';

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

export function HeroToolbar({ activeTab, onTabChange }: HeroToolbarProps) {
  const liveEvents = getLiveEvents();
  const hasLive = liveEvents.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      {/* Tab bar — emerges from bottom edge */}
      <div
        className="relative flex items-center justify-center"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--color-glass-border)',
          borderBottom: 'none',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.1)',
          padding: '12px 8px 16px 8px',
        }}
        role="tablist"
        aria-label="Homepage content tabs"
      >
        {/* Tab buttons with proper spacing */}
        <div className="flex items-center gap-2">
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
                className="relative flex items-center justify-center gap-2 rounded-lg transition-colors duration-150"
                style={{
                  padding: '10px 20px',
                  minWidth: '100px',
                  fontSize: '14px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="hero-tab-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-bg-elevated)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Button content (above the pill) */}
                <span className="relative z-10 flex items-center gap-2">
                  {/* Live indicator dot */}
                  {isLiveTab && hasLive && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                  )}
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
