'use client';

/**
 * LivePanel — Tiered display of today's events by urgency
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - LIVE NOW: Full-width hero card with red accent
 * - STARTING SOON: Grid for events < 6 hours away
 * - LATER TODAY: Horizontal scroll for remaining events
 * - COMPLETED TODAY: Muted text rows with results
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, Check, Medal, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  getTodaysEvents,
  getEventsByDate,
  SCHEDULE,
} from '@/lib/data/schedule';
import { SPORTS } from '@/lib/data/sports';
import type { ScheduleEvent } from '@/lib/types/olympics';

/**
 * Get icon component by name
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
  return icons[pascalName] || Circle;
}

/**
 * Get sport info by ID
 */
function getSportInfo(sportId: string) {
  return SPORTS.find((s) => s.id === sportId);
}

/**
 * Medal dot component
 */
function MedalDot({ type }: { type: 'gold' | 'silver' | 'bronze' }) {
  const colors = {
    gold: 'var(--color-gold)',
    silver: 'var(--color-silver)',
    bronze: 'var(--color-bronze)',
  };
  return (
    <span
      className="inline-block h-2 w-2 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
      style={{ backgroundColor: colors[type] }}
    />
  );
}

/**
 * Format result with medal dots
 */
function formatResultWithMedals(result: string): React.ReactNode {
  const parts = result.split(/(🥇|🥈|🥉)/);
  return parts.map((part, i) => {
    if (part === '🥇') return <MedalDot key={i} type="gold" />;
    if (part === '🥈') return <MedalDot key={i} type="silver" />;
    if (part === '🥉') return <MedalDot key={i} type="bronze" />;
    return part;
  });
}

/**
 * Section header component
 */
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-3 uppercase tracking-[0.08em]"
      style={{
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-muted)',
      }}
    >
      {children}
    </h3>
  );
}

/**
 * Live event card — large hero format
 */
function LiveEventCard({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;

  return (
    <Link
      href={`/sports/${event.sport}`}
      className={cn(
        'group relative flex items-center gap-4 rounded-xl p-4 sm:p-5',
        'border-l-[3px] border-red-500',
        'transition-all duration-150',
        '@media(hover:hover):hover:-translate-y-px',
        '@media(hover:hover):hover:shadow-md'
      )}
      style={{
        background:
          'radial-gradient(ellipse at left, rgba(239, 68, 68, 0.08) 0%, var(--color-bg-secondary) 50%)',
        boxShadow: 'inset 0 0 0 1px rgba(239, 68, 68, 0.1)',
      }}
    >
      {/* Icon */}
      {Icon && (
        <span style={{ color: 'var(--country-accent-primary)' }}>
          <Icon size={28} />
        </span>
      )}

      {/* Content */}
      <div className="min-w-0 flex-1">
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
          {event.isMedalEvent && (
            <Medal size={14} style={{ color: 'var(--color-gold)' }} />
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <span
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            {sport?.name}
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
          <span
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            {event.venue}
          </span>
        </div>
      </div>

      {/* Live badge */}
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
        <span
          className="font-semibold uppercase tracking-wide"
          style={{ fontSize: '11px', color: 'var(--color-live)' }}
        >
          LIVE
        </span>
      </div>
    </Link>
  );
}

/**
 * Upcoming event card — compact format
 */
function UpcomingEventCard({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;

  return (
    <Link
      href={`/sports/${event.sport}`}
      className={cn(
        'group flex flex-col gap-2 rounded-xl p-4',
        'bg-[var(--color-bg-secondary)]',
        'transition-all duration-150',
        '@media(hover:hover):hover:-translate-y-px',
        '@media(hover:hover):hover:shadow-sm'
      )}
    >
      <div className="flex items-center justify-between">
        {Icon && (
          <span style={{ color: 'var(--country-accent-primary)' }}>
            <Icon size={20} />
          </span>
        )}
        <span
          className="tabular-nums"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          {event.time}
        </span>
      </div>

      <div className="min-w-0">
        <p
          className="line-clamp-2 font-medium"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-primary)',
          }}
        >
          {event.event}
        </p>
        <p
          className="mt-0.5"
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
          }}
        >
          {sport?.name}
        </p>
      </div>

      {event.isMedalEvent && (
        <span
          className="inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5"
          style={{
            fontSize: '10px',
            backgroundColor: 'color-mix(in srgb, var(--color-gold) 15%, transparent)',
            color: 'var(--color-gold)',
          }}
        >
          <Medal size={10} />
          Medal Event
        </span>
      )}
    </Link>
  );
}

/**
 * Completed event row — minimal format
 */
function CompletedEventRow({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);

  return (
    <div
      className="flex items-center justify-between py-2 opacity-60"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center gap-2">
        <Check size={14} style={{ color: 'var(--color-text-muted)' }} />
        <span
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {sport?.name}: {event.event}
        </span>
      </div>
      {event.result && (
        <span
          className="flex items-center gap-1"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          {formatResultWithMedals(event.result)}
        </span>
      )}
    </div>
  );
}

/**
 * Get events grouped by upcoming date
 */
function getUpcomingDays(): { date: string; label: string; events: ScheduleEvent[] }[] {
  const dates = ['2026-02-08', '2026-02-09', '2026-02-10'];
  const labels = ['Feb 8', 'Feb 9', 'Feb 10'];

  return dates.map((date, i) => ({
    date,
    label: labels[i],
    events: getEventsByDate(date).filter((e) => e.isMedalEvent).slice(0, 3),
  }));
}

export function LivePanel() {
  const todaysEvents = getTodaysEvents();

  // Categorize today's events
  const liveEvents = todaysEvents.filter((e) => e.status === 'live');
  const upcomingEvents = todaysEvents.filter((e) => e.status === 'upcoming');
  const completedEvents = todaysEvents.filter((e) => e.status === 'completed');

  // Split upcoming into "starting soon" (first 3) and "later today"
  const startingSoon = upcomingEvents.slice(0, 3);
  const laterToday = upcomingEvents.slice(3);

  // Future days with medal events
  const upcomingDays = getUpcomingDays();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* LIVE NOW */}
      {liveEvents.length > 0 && (
        <section>
          <SectionHeader>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live Now
            </span>
          </SectionHeader>
          <div className="space-y-3">
            {liveEvents.map((event) => (
              <LiveEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* STARTING SOON */}
      {startingSoon.length > 0 && (
        <section>
          <SectionHeader>Starting Soon</SectionHeader>
          <div className="grid gap-3 sm:grid-cols-3">
            {startingSoon.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* LATER TODAY */}
      {laterToday.length > 0 && (
        <section>
          <SectionHeader>Later Today</SectionHeader>
          <div className="-mx-4 overflow-x-auto px-4 pb-2">
            <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
              {laterToday.slice(0, 6).map((event) => (
                <div key={event.id} className="w-48 shrink-0">
                  <UpcomingEventCard event={event} />
                </div>
              ))}
              {laterToday.length > 6 && (
                <Link
                  href="/schedule"
                  className="flex w-32 shrink-0 items-center justify-center gap-1 rounded-xl border border-dashed p-4 transition-colors hover:bg-[var(--color-surface-hover)]"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-small)',
                  }}
                >
                  +{laterToday.length - 6} more
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMPLETED TODAY */}
      {completedEvents.length > 0 && (
        <section>
          <SectionHeader>Completed Today</SectionHeader>
          <div className="space-y-0">
            {completedEvents.map((event) => (
              <CompletedEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* UPCOMING DAYS */}
      {upcomingDays.some((d) => d.events.length > 0) && (
        <section>
          <SectionHeader>Coming Up</SectionHeader>
          <div className="space-y-2">
            {upcomingDays.map(
              (day) =>
                day.events.length > 0 && (
                  <div
                    key={day.date}
                    className="flex items-center gap-3 py-2"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <span
                      className="w-12 shrink-0 font-medium tabular-nums"
                      style={{
                        fontSize: 'var(--text-small)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {day.label}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--text-small)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {day.events.map((e) => getSportInfo(e.sport)?.name).join(', ')}
                    </span>
                  </div>
                )
            )}
          </div>
          <Link
            href="/schedule"
            className="mt-4 inline-flex items-center gap-1 transition-colors"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--country-accent-primary)',
            }}
          >
            View Full Schedule
            <ChevronRight size={14} />
          </Link>
        </section>
      )}
    </motion.div>
  );
}
