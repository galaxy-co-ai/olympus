'use client';

/**
 * DrawerSchedule — Schedule tab content in RightDrawer
 *
 * Adapted from SchedulePanel for drawer layout
 * Shows today's schedule grouped by time period
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, Medal, Circle, Clock } from 'lucide-react';
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

function getTimePeriod(time: string): string {
  const hour = parseInt(time.split(':')[0], 10);
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

function groupByPeriod(events: ScheduleEvent[]) {
  const groups: Record<string, ScheduleEvent[]> = {};
  events.forEach((event) => {
    const period = getTimePeriod(event.time);
    if (!groups[period]) groups[period] = [];
    groups[period].push(event);
  });
  const order = ['Morning', 'Afternoon', 'Evening'];
  return order
    .filter((p) => groups[p]?.length > 0)
    .map((p) => ({ period: p, events: groups[p] }));
}

function EventRow({ event }: { event: ScheduleEvent }) {
  const sport = getSportInfo(event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;
  const isLive = event.status === 'live';
  const isCompleted = event.status === 'completed';

  return (
    <Link
      href={event.sport === 'ceremony' ? '/' : `/sports/${event.sport}`}
      className={cn(
        'flex items-center gap-2.5 py-2 px-2 -mx-2 rounded',
        'transition-colors duration-150',
        'hover:bg-[var(--color-surface-hover)]',
        isCompleted && 'opacity-50'
      )}
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <span
        className="w-10 shrink-0 tabular-nums"
        style={{
          fontSize: '11px',
          color: isLive ? 'var(--color-live)' : 'var(--color-text-muted)',
          fontWeight: isLive ? 500 : 400,
        }}
      >
        {event.time}
      </span>
      <Icon
        size={14}
        style={{
          color: isLive ? 'var(--color-live)' : 'var(--country-accent-primary)',
        }}
      />
      <span
        className="flex-1 truncate"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-primary)',
        }}
      >
        {event.event}
      </span>
      {event.isMedalEvent && !isCompleted && (
        <Medal size={12} style={{ color: 'var(--color-gold)' }} />
      )}
      {isLive && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
      )}
    </Link>
  );
}

export function DrawerSchedule() {
  const todaysEvents = getTodaysEvents();
  const groupedEvents = groupByPeriod(todaysEvents);
  const remainingCount = todaysEvents.filter((e) => e.status !== 'completed').length;
  const medalCount = todaysEvents.filter((e) => e.isMedalEvent).length;

  return (
    <div
      className="space-y-5"
      role="tabpanel"
      id="panel-schedule"
      aria-labelledby="tab-schedule"
    >
      {/* Summary */}
      <div
        className="flex items-center gap-2 tabular-nums"
        style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
        }}
      >
        <Clock size={12} />
        <span>{remainingCount} remaining</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Medal size={10} style={{ color: 'var(--color-gold)' }} />
          {medalCount} medals
        </span>
      </div>

      {/* Grouped events */}
      {groupedEvents.map(({ period, events }) => (
        <section key={period}>
          <h3
            className="mb-2 uppercase tracking-[0.08em]"
            style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}
          >
            {period}
          </h3>
          <div>
            {events.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}

      {/* Link to full schedule */}
      <Link
        href="/schedule"
        className="inline-flex items-center gap-1 transition-colors"
        style={{
          fontSize: '12px',
          color: 'var(--country-accent-primary)',
        }}
      >
        Full schedule
        <ChevronRight size={12} />
      </Link>

      {/* Empty state */}
      {todaysEvents.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-8 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <Clock size={24} className="mb-2 opacity-50" />
          <p style={{ fontSize: 'var(--text-small)' }}>No events today</p>
        </div>
      )}
    </div>
  );
}
