/**
 * Utility Functions for Olympus
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section III
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with tabular figures for consistent width
 * Used for medal counts, timers, statistics
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat('en-US', {
    ...options,
  }).format(value);
}

/**
 * Format a date for display
 * Respects user locale
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(d);
}

/**
 * Format time for event schedules
 * Converts to user's local timezone
 */
export function formatTime(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    ...options,
  }).format(d);
}

/**
 * Format relative time (e.g., "in 2h 15m", "3 min ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMins) < 1) {
    return 'just now';
  }

  if (Math.abs(diffMins) < 60) {
    return diffMins > 0
      ? `in ${diffMins}m`
      : `${Math.abs(diffMins)} min ago`;
  }

  if (Math.abs(diffHours) < 24) {
    const remainingMins = Math.abs(diffMins) % 60;
    const hourStr = diffHours > 0 ? `in ${diffHours}h` : `${Math.abs(diffHours)}h ago`;
    if (remainingMins > 0) {
      return diffHours > 0
        ? `in ${diffHours}h ${remainingMins}m`
        : `${Math.abs(diffHours)}h ${remainingMins}m ago`;
    }
    return hourStr;
  }

  if (Math.abs(diffDays) === 1) {
    return diffDays > 0 ? 'Tomorrow' : 'Yesterday';
  }

  return formatDate(d);
}

/**
 * Create a debounced function
 * Used for search input, scroll handlers
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Map a value from one range to another
 * Used for scroll-linked animations
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
