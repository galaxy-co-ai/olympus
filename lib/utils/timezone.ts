/**
 * Timezone Utilities for Schedule
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "All times displayed in user's local timezone (auto-detected, overridable)"
 * - "Timezone indicator always visible"
 *
 * Source times are in CET (Central European Time, UTC+1) — Milan/Cortina local time.
 */

/**
 * Convert a CET time string to a Date object in UTC
 * @param time - "HH:MM" in 24h CET
 * @param date - "YYYY-MM-DD"
 * @returns Date object in UTC
 */
export function parseCETToUTC(time: string, date: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  // Create date in CET (UTC+1)
  // CET offset is +1 hour, so subtract 1 hour to get UTC
  const utcDate = new Date(`${date}T${time}:00+01:00`);
  return utcDate;
}

/**
 * Format event time in user's local timezone
 * @param time - "HH:MM" in 24h CET
 * @param date - "YYYY-MM-DD"
 * @returns Formatted local time string (e.g., "8:30 AM" for US, "20:30" for Europe)
 */
export function formatEventTime(time: string, date: string): string {
  const utcDate = parseCETToUTC(time, date);
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(utcDate);
}

/**
 * Format event time with date if it rolls to a different local date
 * @param time - "HH:MM" in 24h CET
 * @param date - "YYYY-MM-DD"
 * @returns Formatted time, with date prefix if different from source date
 */
export function formatEventTimeWithDate(time: string, date: string): {
  time: string;
  dateLabel: string | null;
} {
  const utcDate = parseCETToUTC(time, date);
  const localDateStr = utcDate.toISOString().split('T')[0];

  const formattedTime = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(utcDate);

  // Check if local date is different from source CET date
  if (localDateStr !== date) {
    const dateLabel = new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
    }).format(utcDate);
    return { time: formattedTime, dateLabel };
  }

  return { time: formattedTime, dateLabel: null };
}

/**
 * Get the user's timezone info for display
 * @returns Object with timezone name and UTC offset
 */
export function getUserTimezone(): {
  name: string;
  offset: string;
  display: string;
} {
  const now = new Date();

  // Get timezone name
  const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Calculate UTC offset in hours
  const offsetMinutes = now.getTimezoneOffset();
  const offsetHours = Math.abs(offsetMinutes) / 60;
  const offsetSign = offsetMinutes <= 0 ? '+' : '-';
  const offsetStr = `UTC${offsetSign}${offsetHours}`;

  // Create abbreviated timezone name
  // Extract from timezone string (e.g., "America/New_York" -> "EST/EDT")
  const shortName = new Intl.DateTimeFormat(undefined, {
    timeZoneName: 'short',
  })
    .format(now)
    .split(' ')
    .pop() || timezoneName;

  return {
    name: timezoneName,
    offset: offsetStr,
    display: `${shortName} (${offsetStr})`,
  };
}

/**
 * Check if an event time is in the past
 * @param time - "HH:MM" in 24h CET
 * @param date - "YYYY-MM-DD"
 */
export function isEventPast(time: string, date: string): boolean {
  const eventDate = parseCETToUTC(time, date);
  return eventDate.getTime() < Date.now();
}

/**
 * Check if an event is happening today in user's local timezone
 * @param date - "YYYY-MM-DD" (source date in CET)
 */
export function isEventToday(date: string): boolean {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return date === todayStr;
}

/**
 * Get time until event in a human-readable format
 * @param time - "HH:MM" in 24h CET
 * @param date - "YYYY-MM-DD"
 * @returns Relative time string (e.g., "in 2h 15m", "in 3 days")
 */
export function getTimeUntilEvent(time: string, date: string): string {
  const eventDate = parseCETToUTC(time, date);
  const now = Date.now();
  const diffMs = eventDate.getTime() - now;

  if (diffMs < 0) {
    return 'Started';
  }

  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `in ${diffMins}m`;
  }

  if (diffHours < 24) {
    const remainingMins = diffMins % 60;
    if (remainingMins > 0) {
      return `in ${diffHours}h ${remainingMins}m`;
    }
    return `in ${diffHours}h`;
  }

  if (diffDays === 1) {
    return 'Tomorrow';
  }

  return `in ${diffDays} days`;
}

/**
 * Get the time block for an event (morning/afternoon/evening)
 * Based on CET time
 */
export function getTimeBlock(time: string): 'morning' | 'afternoon' | 'evening' {
  const hour = parseInt(time.split(':')[0], 10);

  if (hour < 12) {
    return 'morning';
  }

  if (hour < 17) {
    return 'afternoon';
  }

  return 'evening';
}
