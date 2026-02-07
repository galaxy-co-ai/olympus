'use client';

/**
 * Event List
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - View modes: "By Time" (chronological), "By Sport" (grouped), "By Venue" (location-based)
 * - "Live Now" events pinned to top with pulsing indicator
 * - "Smooth animated transitions when switching days or filters"
 *
 * Main content area rendering EventCards based on view mode.
 */

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle } from 'lucide-react';
import { EventCard } from './EventCard';
import { getTimeBlock } from '@/lib/utils/timezone';
import type { ScheduleEvent } from '@/lib/types/olympics';
import type { ViewMode } from './ViewModeToggle';

interface EventListProps {
  events: ScheduleEvent[];
  viewMode: ViewMode;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  sportMap: Record<string, { name: string; icon: string }>;
}

interface GroupedEvents {
  key: string;
  label: string;
  sublabel?: string;
  events: ScheduleEvent[];
}

// Animation variants
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

/**
 * Group events based on view mode
 */
function groupEvents(
  events: ScheduleEvent[],
  viewMode: ViewMode,
  sportMap: Record<string, { name: string; icon: string }>
): GroupedEvents[] {
  if (viewMode === 'time') {
    // Group by time block: Morning, Afternoon, Evening
    const groups: Record<string, ScheduleEvent[]> = {
      morning: [],
      afternoon: [],
      evening: [],
    };

    events.forEach((event) => {
      const block = getTimeBlock(event.time);
      groups[block].push(event);
    });

    return [
      { key: 'morning', label: 'Morning', events: groups.morning },
      { key: 'afternoon', label: 'Afternoon', events: groups.afternoon },
      { key: 'evening', label: 'Evening', events: groups.evening },
    ].filter((g) => g.events.length > 0);
  }

  if (viewMode === 'sport') {
    // Group by sport
    const groups: Record<string, ScheduleEvent[]> = {};

    events.forEach((event) => {
      if (!groups[event.sport]) {
        groups[event.sport] = [];
      }
      groups[event.sport].push(event);
    });

    return Object.entries(groups)
      .map(([sport, sportEvents]) => ({
        key: sport,
        label: sportMap[sport]?.name || sport,
        events: sportEvents.sort((a, b) => a.time.localeCompare(b.time)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  // viewMode === 'venue'
  const groups: Record<string, ScheduleEvent[]> = {};

  events.forEach((event) => {
    if (!groups[event.venue]) {
      groups[event.venue] = [];
    }
    groups[event.venue].push(event);
  });

  return Object.entries(groups)
    .map(([venue, venueEvents]) => ({
      key: venue,
      label: venue,
      events: venueEvents.sort((a, b) => a.time.localeCompare(b.time)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function EventList({
  events,
  viewMode,
  favorites,
  onToggleFavorite,
  sportMap,
}: EventListProps) {
  // Separate live events for pinned section (only in time view)
  const { liveEvents, otherEvents } = useMemo(() => {
    const live = events.filter((e) => e.status === 'live');
    const other = events.filter((e) => e.status !== 'live');
    return { liveEvents: live, otherEvents: other };
  }, [events]);

  // Group non-live events
  const groupedEvents = useMemo(
    () => groupEvents(otherEvents, viewMode, sportMap),
    [otherEvents, viewMode, sportMap]
  );

  // Empty state
  if (events.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-xl py-16"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <Circle
          size={48}
          style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
        />
        <p
          className="mt-4 text-center"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          No events match your filters
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${viewMode}-${events.map((e) => e.id).join(',').slice(0, 50)}`}
        variants={listVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        {/* Live Now pinned section (time view only) */}
        {viewMode === 'time' && liveEvents.length > 0 && (
          <motion.section variants={itemVariants}>
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <h3
                className="font-semibold uppercase tracking-wider"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-live)',
                }}
              >
                Live Now
              </h3>
            </div>
            <div className="space-y-2">
              {liveEvents.map((event) => (
                <motion.div key={event.id} variants={itemVariants} layout>
                  <EventCard
                    event={event}
                    sportName={sportMap[event.sport]?.name || event.sport}
                    sportIcon={sportMap[event.sport]?.icon || 'circle'}
                    showSportLabel={true}
                    isFavorite={favorites.has(event.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Grouped events */}
        {groupedEvents.map((group) => (
          <motion.section key={group.key} variants={itemVariants}>
            <h3
              className="mb-3 font-semibold uppercase tracking-wider"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              {group.label}
              {group.sublabel && (
                <span className="ml-1 font-normal normal-case">
                  ({group.sublabel})
                </span>
              )}
            </h3>
            <div className="space-y-2">
              {group.events.map((event) => (
                <motion.div key={event.id} variants={itemVariants} layout>
                  <EventCard
                    event={event}
                    sportName={sportMap[event.sport]?.name || event.sport}
                    sportIcon={sportMap[event.sport]?.icon || 'circle'}
                    showSportLabel={viewMode !== 'sport'}
                    isFavorite={favorites.has(event.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Live events in non-time views */}
        {viewMode !== 'time' && liveEvents.length > 0 && (
          <>
            {liveEvents.map((event) => {
              // Find which group this event belongs to
              const groupKey =
                viewMode === 'sport' ? event.sport : event.venue;
              const existsInGroups = groupedEvents.some(
                (g) => g.key === groupKey
              );

              // If the group exists, the event is already rendered via groupedEvents
              // If not, we need to render it separately (shouldn't happen normally)
              if (!existsInGroups) {
                return (
                  <motion.div key={event.id} variants={itemVariants} layout>
                    <EventCard
                      event={event}
                      sportName={sportMap[event.sport]?.name || event.sport}
                      sportIcon={sportMap[event.sport]?.icon || 'circle'}
                      showSportLabel={viewMode !== 'sport'}
                      isFavorite={favorites.has(event.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </motion.div>
                );
              }
              return null;
            })}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
