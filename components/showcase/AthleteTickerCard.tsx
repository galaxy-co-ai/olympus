'use client';

/**
 * AthleteTickerCard — Individual athlete card in the marquee
 *
 * ~180x56px — avatar photo (36px circle) | name + sport | flag emoji
 * Falls back to initials if photo fails to load.
 */

import { useState } from 'react';
import Image from 'next/image';
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
  const [imgError, setImgError] = useState(false);
  const showPhoto = athlete.imageUrl && !imgError;

  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2',
        'transition-interactive hover:bg-[var(--color-surface-hover)]'
      )}
      style={{ minWidth: 180 }}
    >
      {/* Avatar — photo with initials fallback */}
      <div
        className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full"
        style={{
          backgroundColor: 'var(--country-accent-surface)',
          border: '1px solid var(--country-accent-muted)',
        }}
      >
        {showPhoto ? (
          <Image
            src={athlete.imageUrl}
            alt={athlete.name}
            fill
            sizes="36px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-xs font-semibold"
            style={{ color: 'var(--country-accent-primary)' }}
          >
            {getInitials(athlete.name)}
          </span>
        )}
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
