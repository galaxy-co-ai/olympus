'use client';

/**
 * FeaturedHighlight — Large featured event card for dashboard CenterStage
 *
 * Selection priority:
 * 1. First live event → LIVE badge with pulsing dot
 * 2. No live → next upcoming medal event
 * 3. No upcoming medals → next upcoming event
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Circle, Medal, MapPin } from 'lucide-react';
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

function pickFeaturedEvent(): ScheduleEvent | null {
  const events = getTodaysEvents();
  if (events.length === 0) return null;

  // 1. First live event
  const live = events.find((e) => e.status === 'live');
  if (live) return live;

  // 2. Next upcoming medal event
  const upcomingMedal = events.find(
    (e) => e.status === 'upcoming' && e.isMedalEvent
  );
  if (upcomingMedal) return upcomingMedal;

  // 3. Next upcoming event
  const upcoming = events.find((e) => e.status === 'upcoming');
  if (upcoming) return upcoming;

  return events[0];
}

export function FeaturedHighlight() {
  const event = pickFeaturedEvent();
  if (!event) return null;

  const sport = SPORTS.find((s) => s.id === event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;
  const isLive = event.status === 'live';

  return (
    <Link
      href={`/sports/${event.sport}`}
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl p-6 sm:p-8',
        'transition-all duration-150',
        '@media(hover:hover):hover:-translate-y-px',
        '@media(hover:hover):hover:shadow-lg',
        isLive && 'border-l-[3px] border-red-500'
      )}
      style={{
        background: isLive
          ? 'radial-gradient(ellipse at top left, rgba(239, 68, 68, 0.06) 0%, var(--color-bg-secondary) 60%)'
          : 'linear-gradient(135deg, color-mix(in srgb, var(--country-accent-primary) 6%, var(--color-bg-secondary)) 0%, var(--color-bg-secondary) 100%)',
        boxShadow: isLive
          ? 'inset 0 0 0 1px rgba(239, 68, 68, 0.1)'
          : 'inset 0 0 0 1px var(--color-border)',
      }}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between">
        <span style={{ color: 'var(--country-accent-primary)' }}>
          <Icon size={36} />
        </span>

        {isLive ? (
          <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-live) 12%, transparent)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span
              className="font-semibold uppercase tracking-wide"
              style={{ fontSize: '11px', color: 'var(--color-live)' }}
            >
              LIVE
            </span>
          </span>
        ) : (
          <span
            className="rounded-full px-2.5 py-1 tabular-nums"
            style={{
              fontSize: 'var(--text-small)',
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {event.time}
          </span>
        )}
      </div>

      {/* Event details */}
      <div className="space-y-1">
        <p
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--country-accent-primary)',
            fontWeight: 500,
          }}
        >
          {sport?.name}
        </p>
        <h2
          className="font-semibold leading-tight"
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            color: 'var(--color-text-primary)',
          }}
        >
          {event.event}
        </h2>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          <MapPin size={13} />
          {event.venue}
          {sport?.territory && (
            <>
              <span style={{ color: 'var(--color-text-muted)' }}>&middot;</span>
              {sport.territory}
            </>
          )}
        </span>
        {event.isMedalEvent && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              fontSize: '11px',
              backgroundColor: 'color-mix(in srgb, var(--color-gold) 15%, transparent)',
              color: 'var(--color-gold)',
            }}
          >
            <Medal size={11} />
            Medal Event
          </span>
        )}
      </div>
    </Link>
  );
}
