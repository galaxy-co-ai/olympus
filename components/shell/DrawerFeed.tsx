'use client';

/**
 * DrawerFeed — Feed tab content in RightDrawer
 *
 * Adapted from LivePanel for drawer layout
 * Shows live events, upcoming, and completed
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, Medal, Circle } from 'lucide-react';
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

function getSportInfo(sportId: string) {
  return SPORTS.find((s) => s.id === sportId);
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-2 uppercase tracking-[0.08em]"
      style={{
        fontSize: '11px',
        color: 'var(--color-text-muted)',
      }}
    >
      {children}
    </h3>
  );
}

function LiveEventRow({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;

  return (
    <Link
      href={`/sports/${event.sport}`}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg',
        'border-l-2 border-red-500',
        'transition-colors duration-150',
        'hover:bg-[var(--color-surface-hover)]'
      )}
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <Icon size={18} style={{ color: 'var(--color-live)' }} />
      <div className="flex-1 min-w-0">
        <p
          className="truncate font-medium"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-primary)',
          }}
        >
          {event.event}
        </p>
        <p
          className="truncate"
          style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}
        >
          {sport?.name}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </div>
    </Link>
  );
}

function EventRow({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;

  return (
    <Link
      href={`/sports/${event.sport}`}
      className={cn(
        'flex items-center gap-3 py-2 px-1',
        'transition-colors duration-150',
        'hover:bg-[var(--color-surface-hover)]',
        'rounded'
      )}
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <span
        className="w-10 shrink-0 tabular-nums"
        style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
        }}
      >
        {event.time}
      </span>
      <Icon size={16} style={{ color: 'var(--country-accent-primary)' }} />
      <span
        className="flex-1 truncate"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-primary)',
        }}
      >
        {event.event}
      </span>
      {event.isMedalEvent && (
        <Medal size={12} style={{ color: 'var(--color-gold)' }} />
      )}
    </Link>
  );
}

export function DrawerFeed() {
  const todaysEvents = getTodaysEvents();
  const liveEvents = todaysEvents.filter((e) => e.status === 'live');
  const upcomingEvents = todaysEvents.filter((e) => e.status === 'upcoming').slice(0, 5);

  return (
    <div
      className="space-y-6"
      role="tabpanel"
      id="panel-feed"
      aria-labelledby="tab-feed"
    >
      {/* Live events */}
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
          <div className="space-y-2">
            {liveEvents.map((event) => (
              <LiveEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section>
          <SectionHeader>Coming Up</SectionHeader>
          <div>
            {upcomingEvents.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
          <Link
            href="/schedule"
            className="mt-3 inline-flex items-center gap-1 transition-colors"
            style={{
              fontSize: '12px',
              color: 'var(--country-accent-primary)',
            }}
          >
            View all
            <ChevronRight size={12} />
          </Link>
        </section>
      )}

      {/* Empty state */}
      {liveEvents.length === 0 && upcomingEvents.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-8 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <p style={{ fontSize: 'var(--text-small)' }}>No events right now</p>
          <Link
            href="/schedule"
            className="mt-2 inline-flex items-center gap-1"
            style={{
              fontSize: '12px',
              color: 'var(--country-accent-primary)',
            }}
          >
            View schedule
            <ChevronRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}
