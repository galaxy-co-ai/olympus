/**
 * Sport Card Skeleton
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 4 (lines 779-792)
 *
 * CSS-only shimmer matching exact card dimensions.
 * Uses the skeleton animation defined in globals.css.
 */

import { cn } from '@/lib/utils';

interface SportCardSkeletonProps {
  featured?: boolean;
}

export function SportCardSkeleton({ featured = false }: SportCardSkeletonProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl',
        'bg-[var(--color-bg-secondary)]',
        featured ? 'min-h-[280px]' : 'min-h-[180px]'
      )}
    >
      <div className="flex flex-1 flex-col p-4">
        {/* Icon placeholder */}
        <div
          className={cn(
            'mb-3 rounded-lg skeleton-shimmer',
            featured ? 'h-12 w-12' : 'h-10 w-10'
          )}
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Title placeholder */}
        <div
          className="h-6 w-3/4 rounded skeleton-shimmer"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Status placeholder */}
        <div
          className="mt-2 h-4 w-1/2 rounded skeleton-shimmer"
          style={{
            backgroundColor: 'var(--color-border)',
            animationDelay: '100ms',
          }}
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Venue placeholder */}
        <div
          className="mt-3 h-3 w-1/3 rounded skeleton-shimmer"
          style={{
            backgroundColor: 'var(--color-border)',
            animationDelay: '200ms',
          }}
        />
      </div>

      {/* Progress bar placeholder */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
    </div>
  );
}
