'use client';

/**
 * Timezone Indicator
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "Timezone indicator always visible: 'Times shown in CST (UTC-6)'"
 *
 * Shows the user's detected timezone for schedule times.
 */

import { useState, useEffect } from 'react';
import { getUserTimezone } from '@/lib/utils/timezone';

export function TimezoneIndicator() {
  const [timezone, setTimezone] = useState<string | null>(null);

  // Hydrate timezone on client
  useEffect(() => {
    const tz = getUserTimezone();
    setTimezone(tz.display);
  }, []);

  if (!timezone) {
    // SSR/hydration placeholder
    return (
      <p
        className="tabular-nums"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
          opacity: 0.6,
        }}
      >
        Times shown in local timezone
      </p>
    );
  }

  return (
    <p
      className="tabular-nums"
      style={{
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-muted)',
        opacity: 0.6,
      }}
    >
      Times shown in {timezone}
    </p>
  );
}
