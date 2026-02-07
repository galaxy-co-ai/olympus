'use client';

/**
 * Sport Card Grid
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 4 (lines 646-670)
 *
 * Weighted editorial grid layout:
 * - Desktop (≥1024px): 4 columns, featured card 2x2
 * - Tablet (768-1024px): 3 columns, featured 2x1
 * - Mobile (480-768px): 2 columns, no featured
 * - Small (<480px): 1 column
 *
 * Features staggered entrance animation.
 */

import { motion } from 'framer-motion';
import { SportCard } from './SportCard';
import type { LiveSport } from '@/lib/types/olympics';

interface SportCardGridProps {
  sports: LiveSport[];
  featured?: boolean;
}

/**
 * Select the featured sport:
 * 1. First sport with status === 'live'
 * 2. Sport with earliest nextEventTime
 * 3. First sport alphabetically
 */
function selectFeaturedSport(sports: LiveSport[]): LiveSport | null {
  // First, check for live sports
  const liveSport = sports.find((s) => s.status === 'live');
  if (liveSport) return liveSport;

  // Then, find sport with earliest upcoming event
  const upcomingSports = sports
    .filter((s) => s.status === 'upcoming' && s.nextEventTime)
    .sort((a, b) => {
      if (!a.nextEventTime || !b.nextEventTime) return 0;
      return (
        new Date(a.nextEventTime).getTime() -
        new Date(b.nextEventTime).getTime()
      );
    });

  if (upcomingSports.length > 0) return upcomingSports[0];

  // Fallback to first sport
  return sports[0] || null;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms between each card
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

export function SportCardGrid({
  sports,
  featured = true,
}: SportCardGridProps) {
  const featuredSport = featured ? selectFeaturedSport(sports) : null;
  const otherSports = featuredSport
    ? sports.filter((s) => s.id !== featuredSport.id)
    : sports;

  return (
    <motion.div
      className="grid gap-4 sm:gap-3 md:gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Featured card (desktop only) */}
      {featuredSport && (
        <motion.div
          className="hidden lg:block lg:col-span-2 lg:row-span-2"
          variants={itemVariants}
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
          }}
        >
          <SportCard sport={featuredSport} featured />
        </motion.div>
      )}

      {/* Featured card shown as normal on mobile */}
      {featuredSport && (
        <motion.div className="lg:hidden" variants={itemVariants}>
          <SportCard sport={featuredSport} />
        </motion.div>
      )}

      {/* Regular cards */}
      {otherSports.map((sport) => (
        <motion.div key={sport.id} variants={itemVariants}>
          <SportCard sport={sport} />
        </motion.div>
      ))}
    </motion.div>
  );
}
