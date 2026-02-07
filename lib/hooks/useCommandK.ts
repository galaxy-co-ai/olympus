'use client';

/**
 * Command+K / Ctrl+K Hook
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Global keyboard shortcut for command palette
 * - Works on Mac (⌘K) and Windows/Linux (Ctrl+K)
 */

import { useEffect } from 'react';

/**
 * Listen for ⌘K / Ctrl+K to open the command palette
 */
export function useCommandK(onOpen: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ⌘K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpen();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onOpen]);
}

/**
 * Detect if user is on Mac for displaying the correct shortcut
 */
export function useIsMac(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    navigator.platform.toLowerCase().includes('mac') ||
    navigator.userAgent.toLowerCase().includes('mac')
  );
}
