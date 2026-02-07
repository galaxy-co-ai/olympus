'use client';

/**
 * SchedulePanel — Today's schedule summary for homepage
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - Chronological list of remaining events
 * - Grouped by time period (Morning/Afternoon/Evening)
 * - Link to full schedule page
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, Medal, Circle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getTodaysEvents } from '@/lib/data/schedule';
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
 * Get time period label
 */
function getTimePeriod(time: string): string {
  const hour = parseInt(time.split(':')[0], 10);
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

/**
 * Group events by time period
 */
function groupByPeriod(
  events: ScheduleEvent[]
): { period: string; events: ScheduleEvent[] }[] {
  const groups: Record<string, ScheduleEvent[]> = {};

  events.forEach((event) => {
    const period = getTimePeriod(event.time);
    if (!groups[period]) {
      groups[period] = [];
    }
    groups[period].push(event);
  });

  const order = ['Morning', 'Afternoon', 'Evening'];
  return order
    .filter((period) => groups[period]?.length > 0)
    .map((period) => ({ period, events: groups[period] }));
}

/**
 * Event row component
 */
function EventRow({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;
  const isLive = event.status === 'live';
  const isCompleted = event.status === 'completed';

  return (
    <Link
      href={event.sport === 'ceremony' ? '/' : `/sports/${event.sport}`}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5',
        'transition-colors duration-150',
        '@media(hover:hover):hover:bg-[var(--color-surface-hover)]',
        isCompleted && 'opacity-60'
      )}
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      {/* Time */}
      <span
        className="w-12 shrink-0 tabular-nums"
        style={{
          fontSize: 'var(--text-small)',
          color: isLive ? 'var(--color-live)' : 'var(--color-text-muted)',
          fontWeight: isLive ? 500 : 400,
        }}
      >
        {event.time}
      </span>

      {/* Icon */}
      {Icon && (
        <span
          style={{
            color: isLive
              ? 'var(--color-live)'
              : 'var(--country-accent-primary)',
          }}
        >
          <Icon size={18} />
        </span>
      )}

      {/* Event name */}
      <span
        className="flex-1 truncate"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-primary)',
        }}
      >
        {event.event}
      </span>

      {/* Badges */}
      <div className="flex shrink-0 items-center gap-2">
        {event.isMedalEvent && !isCompleted && (
          <Medal size={14} style={{ color: 'var(--color-gold)' }} />
        )}

        {isLive && (
          <span className="flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </span>
        )}

        <ChevronRight
          size={14}
          className="opacity-0 transition-opacity group-hover:opacity-60"
          style={{ color: 'var(--color-text-muted)' }}
        />
      </div>
    </Link>
  );
}

/**
 * Time period section
 */
function PeriodSection({
  period,
  events,
}: {
  period: string;
  events: ScheduleEvent[];
}) {
  return (
    <div>
      <h3
        className="mb-2 uppercase tracking-[0.08em]"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
        }}
      >
        {period}
      </h3>
      <div
        className="rounded-xl"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export function SchedulePanel() {
  const todaysEvents = getTodaysEvents();
  const groupedEvents = groupByPeriod(todaysEvents);

  // Count events
  const totalEvents = todaysEvents.length;
  const remainingEvents = todaysEvents.filter(
    (e) => e.status !== 'completed'
  ).length;
  const medalEvents = todaysEvents.filter((e) => e.isMedalEvent).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h2
            className="font-semibold"
            style={{
              fontSize: 'var(--text-h3)',
              color: 'var(--color-text-primary)',
            }}
          >
            Today&apos;s Schedule
          </h2>
          <p
            className="mt-1 flex items-center gap-2 tabular-nums"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            <Clock size={12} />
            {remainingEvents} of {totalEvents} events remaining ·{' '}
            <span className="flex items-center gap-1">
              <Medal size={12} style={{ color: 'var(--color-gold)' }} />
              {medalEvents} medal events
            </span>
          </p>
        </div>

        <Link
          href="/schedule"
          className="group flex items-center gap-1 transition-colors"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--country-accent-primary)',
          }}
        >
          Full Schedule
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Event groups */}
      <div className="space-y-6">
        {groupedEvents.map(({ period, events }) => (
          <PeriodSection key={period} period={period} events={events} />
        ))}
      </div>

      {/* Empty state */}
      {todaysEvents.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-12 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <Clock size={32} className="mb-3 opacity-50" />
          <p style={{ fontSize: 'var(--text-body)' }}>No events scheduled today</p>
          <Link
            href="/schedule"
            className="mt-4 inline-flex items-center gap-1"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--country-accent-primary)',
            }}
          >
            View upcoming events
            <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
