'use client';

/**
 * Day Selector
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "Day selector: horizontal scrollable strip of dates (Feb 6–22), today highlighted"
 *
 * Horizontal scrollable date strip with sliding pill animation.
 * Feb 6-22, 2026 = 17 days of competition.
 */

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DaySelectorProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  eventCountByDate: Record<string, number>;
  liveEventDates?: Set<string>;
}

// Feb 6-22, 2026 = 17 days of competition
const GAME_DATES = Array.from({ length: 17 }, (_, i) => {
  const date = new Date(2026, 1, 6 + i); // Feb 6 + i
  return {
    date: date.toISOString().split('T')[0],
    dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
    dayOfMonth: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    isFirst: i === 0,
  };
});

const TODAY = '2026-02-07'; // Simulated "today" for the Games

export function DaySelector({
  selectedDate,
  onDateSelect,
  eventCountByDate,
  liveEventDates = new Set(),
}: DaySelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Scroll selected date into view on mount and selection change
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedDate]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowRight' && index < GAME_DATES.length - 1) {
        e.preventDefault();
        onDateSelect(GAME_DATES[index + 1].date);
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        onDateSelect(GAME_DATES[index - 1].date);
      }
    },
    [onDateSelect]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex gap-1 overflow-x-auto pb-2',
        // Hide scrollbar
        'scrollbar-hide',
        // Fade edges
        '[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]'
      )}
      role="tablist"
      aria-label="Select day"
    >
      {GAME_DATES.map((day, index) => {
        const isSelected = selectedDate === day.date;
        const isToday = day.date === TODAY;
        const eventCount = eventCountByDate[day.date] || 0;
        const hasLiveEvents = liveEventDates.has(day.date);
        const hasEvents = eventCount > 0;

        return (
          <button
            key={day.date}
            ref={isSelected ? selectedRef : undefined}
            onClick={() => onDateSelect(day.date)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'relative flex shrink-0 flex-col items-center rounded-xl px-3 py-2',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2',
              !hasEvents && 'opacity-50'
            )}
            style={{
              minWidth: 56,
              // @ts-expect-error CSS custom property
              '--tw-ring-color': 'var(--country-accent-primary)',
            }}
            role="tab"
            aria-selected={isSelected}
            aria-label={`${day.dayOfWeek}, ${day.month} ${day.dayOfMonth}, 2026 — ${eventCount} events`}
            tabIndex={isSelected ? 0 : -1}
          >
            {/* Selected pill background */}
            {isSelected && (
              <motion.div
                layoutId="day-selector-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundColor: 'var(--country-accent-primary)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Today label */}
            {isToday && !isSelected && (
              <span
                className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5"
                style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  color: 'var(--country-accent-primary)',
                  backgroundColor: 'var(--country-accent-surface)',
                }}
              >
                Today
              </span>
            )}

            {/* Day of week */}
            <span
              className={cn(
                'relative z-10 font-medium uppercase',
                isSelected ? 'text-white' : ''
              )}
              style={{
                fontSize: '10px',
                color: isSelected ? undefined : 'var(--color-text-muted)',
              }}
            >
              {day.dayOfWeek}
            </span>

            {/* Day number */}
            <span
              className={cn(
                'relative z-10 font-semibold tabular-nums',
                isSelected ? 'text-white' : ''
              )}
              style={{
                fontSize: 'var(--text-body)',
                color: isSelected ? undefined : 'var(--color-text-primary)',
              }}
            >
              {day.isFirst ? `${day.month} ${day.dayOfMonth}` : day.dayOfMonth}
            </span>

            {/* Event indicator dot — only show when NOT selected */}
            {hasEvents && !isSelected && (
              <span className="relative z-10 mt-1 flex h-1.5 w-1.5">
                {hasLiveEvents ? (
                  <>
                    {/* Pulsing live dot */}
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ backgroundColor: 'var(--color-live)' }}
                    />
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-live)' }}
                    />
                  </>
                ) : (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-text-muted)',
                      opacity: 0.5,
                    }}
                  />
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
