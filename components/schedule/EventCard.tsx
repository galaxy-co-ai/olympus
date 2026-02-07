'use client';

/**
 * Event Card
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "Each event: sport icon, event name, time (user's local timezone), venue, status"
 * - "Favorite toggle: small heart/star, persists in localStorage"
 *
 * Individual event row with status badge, time, venue, and favorite toggle.
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Heart, Check, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatEventTime, getTimeUntilEvent } from '@/lib/utils/timezone';
import type { ScheduleEvent } from '@/lib/types/olympics';

interface EventCardProps {
  event: ScheduleEvent;
  sportName: string;
  sportIcon: string;
  showSportLabel?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (eventId: string) => void;
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(
  iconName: string
): React.ComponentType<{ className?: string; size?: number }> | null {
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  return icons[pascalName] || LucideIcons.Circle;
}

/**
 * Status badge component
 */
function StatusBadge({ event }: { event: ScheduleEvent }) {
  if (event.status === 'live') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span
          className="font-semibold uppercase tracking-wide"
          style={{
            fontSize: '11px',
            color: 'var(--color-live)',
          }}
        >
          LIVE
        </span>
      </div>
    );
  }

  if (event.status === 'completed') {
    return (
      <div className="flex items-center gap-1">
        <Check size={12} style={{ color: 'var(--color-text-muted)' }} />
        <span
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          {event.result || 'Completed'}
        </span>
      </div>
    );
  }

  // Upcoming
  const relativeTime = getTimeUntilEvent(event.time, event.date);
  return (
    <span
      className="tabular-nums"
      style={{
        fontSize: 'var(--text-small)',
        color: 'var(--country-accent-primary)',
      }}
    >
      {relativeTime}
    </span>
  );
}

export function EventCard({
  event,
  sportName,
  sportIcon,
  showSportLabel = true,
  isFavorite,
  onToggleFavorite,
}: EventCardProps) {
  const Icon = getIconComponent(sportIcon);
  const localTime = formatEventTime(event.time, event.date);
  const isLive = event.status === 'live';
  const isCompleted = event.status === 'completed';

  // Handle favorite toggle without navigation
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(event.id);
  };

  return (
    <Link
      href={event.sport === 'ceremony' ? '/' : `/sports/${event.sport}`}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl p-3 sm:gap-4 sm:p-4',
        'transition-all duration-150',
        '@media(hover:hover):hover:bg-[var(--color-surface-hover)]',
        'active:scale-[0.99]',
        'focus-visible:outline-none focus-visible:ring-2',
        // Live card special styling
        isLive && 'border-l-2 border-red-500 bg-red-500/[0.03]',
        // Completed cards slightly muted
        isCompleted && 'opacity-75'
      )}
      style={{
        backgroundColor: isLive ? undefined : 'var(--color-bg-secondary)',
        // @ts-expect-error CSS custom property
        '--tw-ring-color': 'var(--country-accent-primary)',
      }}
      aria-label={`${event.event}, ${sportName}, ${event.status === 'live' ? 'Live now' : event.status === 'completed' ? 'Completed' : `Starts ${localTime}`}`}
    >
      {/* Sport icon */}
      {Icon && (
        <span
          className="shrink-0"
          style={{ color: 'var(--country-accent-primary)' }}
        >
          <Icon size={24} />
        </span>
      )}

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Event name */}
        <div className="flex items-center gap-2">
          <span
            className="truncate font-medium"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-primary)',
            }}
          >
            {event.event}
          </span>

          {/* Medal event badge */}
          {event.isMedalEvent && (
            <span style={{ color: 'var(--color-gold)' }}>
              <Medal size={14} />
            </span>
          )}
        </div>

        {/* Sport name + status */}
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {showSportLabel && (
            <span
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              {sportName}
            </span>
          )}
          {showSportLabel && <span style={{ color: 'var(--color-text-muted)' }}>·</span>}
          <StatusBadge event={event} />
        </div>
      </div>

      {/* Time */}
      <div className="shrink-0 text-right">
        <span
          className="tabular-nums font-medium"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-primary)',
          }}
        >
          {localTime}
        </span>
        <p
          style={{
            fontSize: '10px',
            color: 'var(--color-text-muted)',
          }}
        >
          CET
        </p>
      </div>

      {/* Venue chip - hidden on mobile */}
      <span
        className="hidden shrink-0 truncate rounded-full px-2.5 py-1 sm:block"
        style={{
          maxWidth: 120,
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        {event.venue.split(' ')[0]}
      </span>

      {/* Favorite toggle */}
      <motion.button
        onClick={handleFavoriteClick}
        className={cn(
          'shrink-0 rounded-full p-1.5',
          'transition-colors duration-150',
          '@media(hover:hover):hover:bg-[var(--color-surface-hover)]',
          'focus-visible:outline-none focus-visible:ring-2'
        )}
        style={{
          // @ts-expect-error CSS custom property
          '--tw-ring-color': 'var(--country-accent-primary)',
        }}
        whileTap={{ scale: 0.9 }}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={18}
          className={cn(
            'transition-all duration-150',
            isFavorite
              ? 'fill-red-500 text-red-500'
              : 'fill-transparent opacity-40'
          )}
          style={{
            color: isFavorite ? undefined : 'var(--color-text-muted)',
          }}
        />
      </motion.button>
    </Link>
  );
}
