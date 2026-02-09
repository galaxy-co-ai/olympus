'use client';

/**
 * AthleteTickerCard — Individual athlete card in the marquee
 *
 * ~180x56px — avatar (initials in 36px circle) | name + sport | flag emoji
 * Uses country accent for avatar background.
 */

import { cn } from '@/lib/utils';
import type { TickerAthlete } from '@/lib/data/athletes';

interface AthleteTickerCardProps {
  athlete: TickerAthlete;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AthleteTickerCard({ athlete }: AthleteTickerCardProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2',
        'transition-interactive hover:bg-[var(--color-surface-hover)]'
      )}
      style={{ minWidth: 180 }}
    >
      {/* Avatar circle with initials */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
        style={{
          backgroundColor: 'var(--country-accent-surface)',
          color: 'var(--country-accent-primary)',
          border: '1px solid var(--country-accent-muted)',
        }}
      >
        {getInitials(athlete.name)}
      </div>

      {/* Name + sport */}
      <div className="flex min-w-0 flex-col">
        <span
          className="truncate text-xs font-medium"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {athlete.name}
        </span>
        <span
          className="truncate text-[10px]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {athlete.sport}
        </span>
      </div>

      {/* Flag */}
      <span className="shrink-0 text-base" aria-label={athlete.country}>
        {athlete.flag}
      </span>
    </div>
  );
}
