/**
 * TimelineSpine — Vertical spine line with time-stamped dots
 *
 * Renders a 2px vertical line with colored dots at each time slot.
 * Red = live, accent = upcoming, muted = completed.
 * Hidden on mobile (sm:block).
 */

'use client';

import { cn } from '@/lib/utils';

interface SpineDot {
  time: string;
  status: 'live' | 'upcoming' | 'completed';
  isExpanded?: boolean;
}

interface TimelineSpineProps {
  dots: SpineDot[];
}

export function TimelineSpine({ dots }: TimelineSpineProps) {
  return (
    <div className="relative hidden sm:flex flex-col items-center w-12 shrink-0">
      {/* Vertical line */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2"
        style={{
          width: '2px',
          backgroundColor: 'var(--color-border)',
        }}
      />

      {/* Time dots */}
      {dots.map((dot, i) => (
        <div
          key={`${dot.time}-${i}`}
          className="relative flex flex-col items-center"
          style={{ flex: '1 1 0%', minHeight: 72 }}
        >
          {/* Time label */}
          <span
            className="tabular-nums whitespace-nowrap mb-1"
            style={{
              fontSize: '10px',
              color:
                dot.status === 'live'
                  ? 'var(--color-live)'
                  : 'var(--color-text-muted)',
              fontWeight: dot.status === 'live' ? 600 : 400,
            }}
          >
            {dot.time}
          </span>

          {/* Dot */}
          <div className="relative z-10">
            <div
              className={cn(
                'rounded-full',
                dot.status === 'live' && 'ring-2 ring-red-500/30'
              )}
              style={{
                width: dot.status === 'live' ? 8 : 6,
                height: dot.status === 'live' ? 8 : 6,
                backgroundColor:
                  dot.status === 'live'
                    ? 'var(--color-live)'
                    : dot.status === 'upcoming'
                      ? 'var(--country-accent-primary)'
                      : 'var(--color-text-muted)',
              }}
            />
            {/* Ping for live */}
            {dot.status === 'live' && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: 'var(--color-live)',
                  opacity: 0.4,
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
