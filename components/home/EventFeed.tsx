'use client';

/**
 * EventFeed — Compact event card grid for dashboard CenterStage
 *
 * Shows remaining events (excluding featured) grouped by status:
 * Live Now → Coming Up → Completed
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Circle, Medal, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTodaysEvents } from '@/lib/data/schedule';
import { SPORTS } from '@/lib/data/sports';
import type { ScheduleEvent } from '@/lib/types/olympics';

function getIconComponent(iconName: string) {
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  return icons[pascalName] || Circle;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-3 uppercase tracking-[0.08em]"
      style={{
        fontSize: '11px',
        color: 'var(--color-text-muted)',
      }}
    >
      {children}
    </h3>
  );
}

function EventCard({ event }: { event: ScheduleEvent }) {
  const sport = SPORTS.find((s) => s.id === event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;
  const isLive = event.status === 'live';
  const isCompleted = event.status === 'completed';

  return (
    <Link
      href={`/sports/${event.sport}`}
      className={cn(
        'group flex flex-col gap-2 rounded-lg p-3',
        'transition-all duration-150',
        '@media(hover:hover):hover:-translate-y-px',
        '@media(hover:hover):hover:shadow-sm',
        isLive && 'border-l-2 border-red-500',
        isCompleted && 'opacity-50'
      )}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      {/* Top: icon + time/status */}
      <div className="flex items-center justify-between">
        <Icon
          size={18}
          style={{
            color: isLive
              ? 'var(--color-live)'
              : 'var(--country-accent-primary)',
          }}
        />
        <div className="flex items-center gap-1.5">
          {isLive && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
          )}
          {isCompleted ? (
            <Check size={13} style={{ color: 'var(--color-text-muted)' }} />
          ) : (
            <span
              className="tabular-nums"
              style={{
                fontSize: '11px',
                color: isLive
                  ? 'var(--color-live)'
                  : 'var(--color-text-muted)',
              }}
            >
              {event.time}
            </span>
          )}
        </div>
      </div>

      {/* Event name */}
      <p
        className="line-clamp-2 font-medium leading-snug"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-primary)',
        }}
      >
        {event.event}
      </p>

      {/* Sport name + medal badge */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
          }}
        >
          {sport?.name}
        </span>
        {event.isMedalEvent && (
          <Medal size={12} style={{ color: 'var(--color-gold)' }} />
        )}
      </div>
    </Link>
  );
}

/**
 * Pick the featured event (same logic as FeaturedHighlight)
 * so we can exclude it from the feed.
 */
function getFeaturedEventId(): string | null {
  const events = getTodaysEvents();
  if (events.length === 0) return null;

  const live = events.find((e) => e.status === 'live');
  if (live) return live.id;

  const upcomingMedal = events.find(
    (e) => e.status === 'upcoming' && e.isMedalEvent
  );
  if (upcomingMedal) return upcomingMedal.id;

  const upcoming = events.find((e) => e.status === 'upcoming');
  if (upcoming) return upcoming.id;

  return events[0]?.id ?? null;
}

export function EventFeed() {
  const allEvents = getTodaysEvents();
  const featuredId = getFeaturedEventId();
  const events = allEvents.filter((e) => e.id !== featuredId);

  const liveEvents = events.filter((e) => e.status === 'live');
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const completedEvents = events.filter((e) => e.status === 'completed');

  if (events.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <p style={{ fontSize: 'var(--text-small)' }}>
          No other events today
        </p>
        <Link
          href="/schedule"
          className="mt-2 inline-flex items-center gap-1 transition-colors"
          style={{
            fontSize: '12px',
            color: 'var(--country-accent-primary)',
          }}
        >
          View schedule
          <ChevronRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Now */}
      {liveEvents.length > 0 && (
        <section>
          <SectionHeader>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
              </span>
              Live Now
            </span>
          </SectionHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {liveEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Coming Up */}
      {upcomingEvents.length > 0 && (
        <section>
          <SectionHeader>Coming Up</SectionHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completedEvents.length > 0 && (
        <section>
          <SectionHeader>Completed</SectionHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {completedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Full schedule link */}
      <div className="pt-2">
        <Link
          href="/schedule"
          className="inline-flex items-center gap-1 transition-colors"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--country-accent-primary)',
          }}
        >
          View Full Schedule
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
