'use client';

/**
 * AthleteTicker — Horizontal CSS marquee container
 *
 * Duplicated array for seamless infinite scroll.
 * CSS @keyframes marquee with translateX(-50%).
 * Edge masks for fade effect.
 * Pauses on hover. Respects prefers-reduced-motion.
 */

import { TICKER_ATHLETES } from '@/lib/data/athletes';
import { AthleteTickerCard } from './AthleteTickerCard';

export function AthleteTicker() {
  // Duplicate the array for seamless infinite loop
  const doubled = [...TICKER_ATHLETES, ...TICKER_ATHLETES];

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        height: 72,
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        maskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
      role="marquee"
      aria-label="Featured athletes"
    >
      <div className="animate-marquee group flex h-full items-center gap-1 hover:[animation-play-state:paused]">
        {doubled.map((athlete, i) => (
          <AthleteTickerCard
            key={`${athlete.id}-${i}`}
            athlete={athlete}
          />
        ))}
      </div>
    </div>
  );
}
