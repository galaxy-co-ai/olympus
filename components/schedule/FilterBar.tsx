'use client';

/**
 * Filter Bar
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "Filter by: sport, venue, medal events only, favorited events"
 *
 * Horizontal row of filter controls.
 */

import { Medal, Heart, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select } from '@/components/ui';

interface FilterBarProps {
  sportFilter: string | null;
  onSportFilterChange: (sport: string | null) => void;
  venueFilter: string | null;
  onVenueFilterChange: (venue: string | null) => void;
  medalEventsOnly: boolean;
  onMedalEventsOnlyChange: (value: boolean) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
  favoriteCount: number;
  sports: Array<{ id: string; name: string }>;
  venues: string[];
}

export function FilterBar({
  sportFilter,
  onSportFilterChange,
  venueFilter,
  onVenueFilterChange,
  medalEventsOnly,
  onMedalEventsOnlyChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  favoriteCount,
  sports,
  venues,
}: FilterBarProps) {
  const hasActiveFilters =
    sportFilter !== null ||
    venueFilter !== null ||
    medalEventsOnly ||
    favoritesOnly;

  const clearAllFilters = () => {
    onSportFilterChange(null);
    onVenueFilterChange(null);
    onMedalEventsOnlyChange(false);
    onFavoritesOnlyChange(false);
  };

  // Build options for selects
  const sportOptions = [
    { value: '', label: 'All Sports' },
    ...sports.map((sport) => ({ value: sport.id, label: sport.name })),
  ];

  const venueOptions = [
    { value: '', label: 'All Venues' },
    ...venues.map((venue) => ({ value: venue, label: venue })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Sport filter */}
      <Select
        value={sportFilter}
        onChange={onSportFilterChange}
        options={sportOptions}
        placeholder="All Sports"
        aria-label="Filter by sport"
      />

      {/* Venue filter */}
      <div className="hidden sm:block">
        <Select
          value={venueFilter}
          onChange={onVenueFilterChange}
          options={venueOptions}
          placeholder="All Venues"
          aria-label="Filter by venue"
        />
      </div>

      {/* Medal events toggle */}
      <button
        onClick={() => onMedalEventsOnlyChange(!medalEventsOnly)}
        className={cn(
          'flex items-center gap-1.5 rounded-full border px-3 py-1.5',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2',
          medalEventsOnly
            ? 'border-[var(--color-gold)]'
            : 'border-transparent'
        )}
        style={{
          fontSize: 'var(--text-small)',
          color: medalEventsOnly
            ? 'var(--color-gold)'
            : 'var(--color-text-secondary)',
          backgroundColor: medalEventsOnly
            ? 'rgba(212, 160, 23, 0.1)'
            : 'var(--color-bg-secondary)',
          // @ts-expect-error CSS custom property
          '--tw-ring-color': 'var(--color-gold)',
        }}
        aria-pressed={medalEventsOnly}
        aria-label={medalEventsOnly ? 'Show all events' : 'Show medal events only'}
      >
        <Medal size={14} />
        <span className="hidden sm:inline">Medal Events</span>
      </button>

      {/* Favorites toggle */}
      <button
        onClick={() => onFavoritesOnlyChange(!favoritesOnly)}
        className={cn(
          'flex items-center gap-1.5 rounded-full border px-3 py-1.5',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2',
          favoritesOnly ? 'border-red-500' : 'border-transparent'
        )}
        style={{
          fontSize: 'var(--text-small)',
          color: favoritesOnly ? '#EF4444' : 'var(--color-text-secondary)',
          backgroundColor: favoritesOnly
            ? 'rgba(239, 68, 68, 0.1)'
            : 'var(--color-bg-secondary)',
          // @ts-expect-error CSS custom property
          '--tw-ring-color': '#EF4444',
        }}
        aria-pressed={favoritesOnly}
        aria-label={favoritesOnly ? 'Show all events' : 'Show favorites only'}
      >
        <Heart size={14} className={favoritesOnly ? 'fill-red-500' : ''} />
        <span className="hidden sm:inline">Favorites</span>
        {favoriteCount > 0 && (
          <span
            className="rounded-full px-1.5 py-0.5 tabular-nums"
            style={{
              fontSize: '10px',
              fontWeight: 500,
              backgroundColor: favoritesOnly
                ? 'rgba(239, 68, 68, 0.2)'
                : 'var(--color-bg-primary)',
            }}
          >
            {favoriteCount}
          </span>
        )}
      </button>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-1',
            'transition-opacity duration-150',
            '@media(hover:hover):hover:opacity-100',
            'opacity-70'
          )}
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
          aria-label="Clear all filters"
        >
          <X size={12} />
          Clear
        </button>
      )}
    </div>
  );
}
