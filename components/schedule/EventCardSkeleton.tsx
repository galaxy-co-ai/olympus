/**
 * Event Card Skeleton
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "Loading: skeleton rows matching event card height"
 *
 * CSS-only shimmer animation matching EventCard dimensions.
 */

import { cn } from '@/lib/utils';

interface EventCardSkeletonProps {
  className?: string;
}

export function EventCardSkeleton({ className }: EventCardSkeletonProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl p-4',
        'animate-pulse',
        className
      )}
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      aria-hidden="true"
    >
      {/* Icon placeholder */}
      <div
        className="h-10 w-10 shrink-0 rounded-lg"
        style={{ backgroundColor: 'var(--color-border)' }}
      />

      {/* Content area */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Title */}
        <div
          className="h-4 w-3/4 rounded"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        {/* Subtitle */}
        <div
          className="h-3 w-1/2 rounded"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
      </div>

      {/* Time placeholder */}
      <div className="shrink-0 text-right">
        <div
          className="h-4 w-14 rounded"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
      </div>

      {/* Venue chip placeholder */}
      <div
        className="hidden h-6 w-20 shrink-0 rounded-full sm:block"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
    </div>
  );
}

/**
 * Multiple skeleton cards for loading state
 */
export function EventCardSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
