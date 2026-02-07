'use client';

/**
 * Sport Card Component
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 4 (lines 601-830)
 *
 * A miniature design system — each card is a self-contained world.
 * Four layers:
 * 1. Background gradient (category-based)
 * 2. Sport icon (Lucide, country-tinted)
 * 3. Information stack (name, status, venue, progress)
 * 4. Interactive surface (entire card is a Link)
 */

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils';
import type { LiveSport } from '@/lib/types/olympics';

interface SportCardProps {
  sport: LiveSport;
  featured?: boolean;
}

/**
 * Get gradient classes based on sport category
 */
function getCategoryGradient(category: LiveSport['category']): string {
  switch (category) {
    case 'dynamic':
      // Cool blue diagonal sweep suggesting velocity
      return 'from-sky-100/80 via-blue-50/60 to-white/40 dark:from-sky-950/80 dark:via-blue-950/60 dark:to-slate-900/40';
    case 'precision':
      // Clean, still gradient
      return 'from-slate-50/80 to-gray-100/60 dark:from-slate-900/80 dark:to-gray-900/60';
    case 'endurance':
      // Warmer textured gradient
      return 'from-amber-50/40 via-stone-50/60 to-white/80 dark:from-amber-950/40 dark:via-stone-900/60 dark:to-slate-900/80';
    case 'style':
      // Bold angled gradient
      return 'from-violet-50/60 via-indigo-50/40 to-white/60 dark:from-violet-950/60 dark:via-indigo-950/40 dark:to-slate-900/60';
    case 'team':
      // Dual-tone split
      return 'from-red-50/40 to-blue-50/40 dark:from-red-950/40 dark:to-blue-950/40';
    default:
      return 'from-gray-50 to-white dark:from-gray-900 dark:to-gray-950';
  }
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(
  iconName: string
): React.ComponentType<{ className?: string; size?: number }> | null {
  // Convert kebab-case to PascalCase
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
function StatusBadge({ sport }: { sport: LiveSport }) {
  if (sport.status === 'live' && sport.currentEvent) {
    return (
      <div className="flex items-center gap-2">
        {/* Pulsing red dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span
          className="font-semibold uppercase tracking-wide"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-live)',
          }}
        >
          LIVE
        </span>
        <span
          className="truncate"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {sport.currentEvent}
        </span>
      </div>
    );
  }

  if (sport.status === 'upcoming' && sport.nextEventTime) {
    const relativeTime = formatRelativeTime(sport.nextEventTime);
    return (
      <div className="flex items-center gap-1.5">
        <span
          className="tabular-nums"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--country-accent-primary)',
          }}
        >
          {relativeTime}
        </span>
        {sport.nextEvent && (
          <span
            className="truncate"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            · {sport.nextEvent}
          </span>
        )}
      </div>
    );
  }

  if (sport.status === 'completed') {
    const totalMedals =
      sport.medals.gold + sport.medals.silver + sport.medals.bronze;
    if (totalMedals > 0) {
      return (
        <div className="flex items-center gap-1.5">
          {sport.medals.gold > 0 && (
            <span className="flex items-center gap-0.5">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: 'var(--color-gold)' }}
              />
              <span className="tabular-nums" style={{ fontSize: 'var(--text-small)' }}>
                {sport.medals.gold}
              </span>
            </span>
          )}
          {sport.medals.silver > 0 && (
            <span className="flex items-center gap-0.5">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: 'var(--color-silver)' }}
              />
              <span className="tabular-nums" style={{ fontSize: 'var(--text-small)' }}>
                {sport.medals.silver}
              </span>
            </span>
          )}
          {sport.medals.bronze > 0 && (
            <span className="flex items-center gap-0.5">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: 'var(--color-bronze)' }}
              />
              <span className="tabular-nums" style={{ fontSize: 'var(--text-small)' }}>
                {sport.medals.bronze}
              </span>
            </span>
          )}
        </div>
      );
    }
  }

  return (
    <span
      style={{
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-muted)',
      }}
    >
      Events upcoming
    </span>
  );
}

export function SportCard({ sport, featured = false }: SportCardProps) {
  const Icon = getIconComponent(sport.icon);
  const progress =
    sport.totalEvents > 0
      ? (sport.completedEvents / sport.totalEvents) * 100
      : 0;

  const isLive = sport.status === 'live';

  return (
    <Link
      href={`/sports/${sport.id}`}
      className={cn(
        // Base styles
        'group relative flex flex-col overflow-hidden rounded-xl',
        // Card shadow
        'shadow-sm',
        // Transitions (compositor-friendly)
        'transition-all duration-150 ease-out',
        // Hover state (desktop only)
        '@media(hover:hover):hover:scale-[1.02] @media(hover:hover):hover:shadow-lg',
        // Press state
        'active:scale-[0.97] active:shadow-sm',
        // Focus state
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        // Live card gets special shadow
        isLive && 'shadow-red-500/10',
        // Featured size
        featured ? 'min-h-[280px]' : 'min-h-[180px]'
      )}
      style={{
        // Focus ring color
        // @ts-expect-error CSS custom property
        '--tw-ring-color': 'var(--country-accent-primary)',
      }}
      aria-label={`${sport.name} — ${sport.status === 'live' ? `Live: ${sport.currentEvent}` : sport.status === 'upcoming' ? `Next: ${sport.nextEvent}` : 'Completed'}`}
    >
      {/* Layer 1: Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          getCategoryGradient(sport.category)
        )}
      />

      {/* Country accent overlay */}
      <div
        className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundColor: 'var(--country-accent-surface)' }}
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-1 flex-col p-4">
        {/* Layer 2: Sport Icon */}
        <div
          className={cn(
            'mb-3 transition-transform duration-150',
            '@media(hover:hover):group-hover:-translate-y-0.5'
          )}
        >
          {Icon && (
            <span style={{ color: 'var(--country-accent-primary)' }}>
              <Icon
                size={featured ? 48 : 40}
                className="transition-all duration-150"
              />
            </span>
          )}
        </div>

        {/* Layer 3: Information Stack */}
        <div className="flex flex-1 flex-col">
          {/* Sport name */}
          <h3
            className={cn(
              'font-semibold leading-tight',
              sport.category === 'precision' && 'font-medium',
              (sport.category === 'endurance' || sport.category === 'style') &&
                'font-normal'
            )}
            style={{
              fontSize: featured ? 'var(--text-h3)' : 'var(--text-body)',
              color: 'var(--color-text-primary)',
            }}
          >
            {sport.name}
          </h3>

          {/* Status badge */}
          <div className="mt-2">
            <StatusBadge sport={sport} />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Venue tag */}
          <div
            className="mt-3"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            {sport.territory}
          </div>
        </div>
      </div>

      {/* Layer 4: Medal progress bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: 'var(--color-border)' }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: 'var(--country-accent-primary)',
          }}
        />
      </div>

      {/* Live card pulse overlay */}
      {isLive && (
        <div
          className="pointer-events-none absolute inset-0 animate-pulse rounded-xl opacity-5"
          style={{ boxShadow: '0 0 0 2px var(--color-live)' }}
        />
      )}
    </Link>
  );
}
