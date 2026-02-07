'use client';

/**
 * StickyStatBlock — Pinned stat/quote that sticks while content scrolls
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - Uses position: sticky (NO scroll-jacking, NO JS scroll manipulation)
 * - min-h-[200vh] gives sticky room to breathe
 * - Stat number uses AnimatedCounter
 * - Mobile: min-h-[150vh] (users scroll faster)
 */

import { AnimatedCounter } from './AnimatedCounter';

type StickyStatBlockProps = {
  stat: string;
  label: string;
  sublabel?: string;
  accentColor?: string;
};

export function StickyStatBlock({
  stat,
  label,
  sublabel,
  accentColor,
}: StickyStatBlockProps) {
  // Parse stat for AnimatedCounter (handles "70", "1st", etc.)
  const numericMatch = stat.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? stat.slice(numericMatch[1].length) : '';

  return (
    <div className="relative min-h-[150vh] sm:min-h-[200vh]">
      <div className="sticky top-1/3 flex flex-col items-center justify-center py-24">
        {numericValue !== null ? (
          <AnimatedCounter
            value={numericValue}
            suffix={suffix}
            duration={1.8}
            className="text-[clamp(64px,15vw,160px)] font-bold tracking-tight leading-none"
            style={{ color: accentColor || 'var(--olympus-glacier)' }}
          />
        ) : (
          <span
            className="text-[clamp(64px,15vw,160px)] font-bold tracking-tight leading-none tabular-nums"
            style={{ color: accentColor || 'var(--olympus-glacier)' }}
          >
            {stat}
          </span>
        )}
        <span
          className="mt-4 text-lg sm:text-xl tracking-wide uppercase"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            className="mt-2 text-sm text-center max-w-md px-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
