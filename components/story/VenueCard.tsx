/**
 * VenueCard — Location highlight cards for key venues
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - Compact informational card
 * - Left accent border using olympus-glacier
 * - Hover: subtle background shift (desktop only)
 * - NOT a link — informational only
 */

import { cn } from '@/lib/utils';

type VenueCardProps = {
  name: string;
  event: string;
  location: string;
  capacity?: string;
  funFact?: string;
  className?: string;
};

export function VenueCard({
  name,
  event,
  location,
  capacity,
  funFact,
  className,
}: VenueCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-5 border-l-2 transition-colors duration-150',
        '@media (hover: hover) { &:hover { background-color: var(--color-surface-hover); } }',
        className
      )}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderLeftWidth: '3px',
        borderLeftColor: 'var(--olympus-glacier)',
      }}
    >
      <h4
        className="text-lg font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {name}
      </h4>
      <p
        className="mt-1 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {event}
      </p>
      <p
        className="mt-2 text-xs"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {location}
        {capacity && ` · ${capacity}`}
      </p>
      {funFact && (
        <p
          className="mt-3 text-xs italic"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {funFact}
        </p>
      )}
    </div>
  );
}
