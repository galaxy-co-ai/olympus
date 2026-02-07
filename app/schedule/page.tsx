'use client';

/**
 * Schedule Page
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6 (lines 876-897)
 * - Day selector: horizontal scrollable strip of dates (Feb 6–22)
 * - View modes: By Time, By Sport, By Venue
 * - Filter by: sport, venue, medal events only, favorited events
 * - All times in user's local timezone
 * - Live events pinned to top
 *
 * Day 2 of the Games — schedule is packed.
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  DaySelector,
  EventList,
  FilterBar,
  TimezoneIndicator,
  ViewModeToggle,
  type ViewMode,
} from '@/components/schedule';
import {
  SCHEDULE,
  getEventCountByDate,
  getUniqueVenues,
  SPORTS,
} from '@/lib/data';
import { useFavorites } from '@/lib/hooks';

// Build sport lookup map
const SPORT_MAP: Record<string, { name: string; icon: string }> = {};
SPORTS.forEach((sport) => {
  SPORT_MAP[sport.id] = { name: sport.name, icon: sport.icon };
});

// Add ceremony for Opening Ceremony
SPORT_MAP['ceremony'] = { name: 'Ceremony', icon: 'sparkles' };

// Get sport list for filter dropdown
const SPORT_LIST = SPORTS.map((s) => ({ id: s.id, name: s.name })).sort((a, b) =>
  a.name.localeCompare(b.name)
);

// Get venue list for filter dropdown
const VENUE_LIST = getUniqueVenues();

// Event count by date for day selector
const EVENT_COUNT_BY_DATE = getEventCountByDate();

// Dates with live events (for pulsing indicator)
const LIVE_EVENT_DATES = new Set(
  SCHEDULE.filter((e) => e.status === 'live').map((e) => e.date)
);

export default function SchedulePage() {
  // State
  const [selectedDate, setSelectedDate] = useState('2026-02-07'); // Today
  const [viewMode, setViewMode] = useState<ViewMode>('time');
  const [sportFilter, setSportFilter] = useState<string | null>(null);
  const [venueFilter, setVenueFilter] = useState<string | null>(null);
  const [medalEventsOnly, setMedalEventsOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Sticky bar state
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detect when sticky bar becomes stuck
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' } // 64px = nav height
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Favorites
  const { favorites, toggleFavorite, count: favoriteCount } = useFavorites();

  // Filtered events
  const filteredEvents = useMemo(() => {
    let events = SCHEDULE.filter((e) => e.date === selectedDate);

    if (sportFilter) {
      events = events.filter((e) => e.sport === sportFilter);
    }

    if (venueFilter) {
      events = events.filter((e) => e.venue === venueFilter);
    }

    if (medalEventsOnly) {
      events = events.filter((e) => e.isMedalEvent);
    }

    if (favoritesOnly) {
      events = events.filter((e) => favorites.has(e.id));
    }

    // Sort by time
    return events.sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDate, sportFilter, venueFilter, medalEventsOnly, favoritesOnly, favorites]);

  return (
    <div className="container max-w-5xl px-4 py-8 sm:px-6 md:py-12">
      {/* Page header */}
      <div className="mb-6 flex items-baseline justify-between">
        <h1
          className="font-bold"
          style={{
            fontSize: 'var(--text-h1)',
            lineHeight: 'var(--leading-snug)',
            color: 'var(--color-text-primary)',
          }}
        >
          Schedule
        </h1>
        <TimezoneIndicator />
      </div>

      {/* Sentinel for sticky detection */}
      <div ref={sentinelRef} className="h-0" />

      {/* Sticky control bar */}
      <div
        className={cn(
          'sticky top-16 z-30 -mx-4 px-4 pb-4 pt-2 sm:-mx-6 sm:px-6 transition-all duration-150',
          isStuck && 'glass border-b border-[var(--color-border)]'
        )}
        style={{ backgroundColor: isStuck ? undefined : 'var(--color-bg-primary)' }}
      >
        {/* Day selector */}
        <DaySelector
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          eventCountByDate={EVENT_COUNT_BY_DATE}
          liveEventDates={LIVE_EVENT_DATES}
        />

        {/* Controls row */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
          <FilterBar
            sportFilter={sportFilter}
            onSportFilterChange={setSportFilter}
            venueFilter={venueFilter}
            onVenueFilterChange={setVenueFilter}
            medalEventsOnly={medalEventsOnly}
            onMedalEventsOnlyChange={setMedalEventsOnly}
            favoritesOnly={favoritesOnly}
            onFavoritesOnlyChange={setFavoritesOnly}
            favoriteCount={favoriteCount}
            sports={SPORT_LIST}
            venues={VENUE_LIST}
          />
        </div>
      </div>

      {/* Event list */}
      <div className="mt-6">
        <EventList
          events={filteredEvents}
          viewMode={viewMode}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          sportMap={SPORT_MAP}
        />
      </div>

      {/* Day summary footer */}
      <div
        className="mt-8 text-center"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
        }}
      >
        {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} ·{' '}
        {filteredEvents.filter((e) => e.isMedalEvent).length} medal event
        {filteredEvents.filter((e) => e.isMedalEvent).length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
