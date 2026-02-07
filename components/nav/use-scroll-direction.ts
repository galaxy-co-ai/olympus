'use client';

import { useSyncExternalStore } from 'react';

interface ScrollState {
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
  isScrolled: boolean;
}

const SCROLL_THRESHOLD = 80;
const DIRECTION_THRESHOLD = 10;

// Module-level state for scroll tracking
let currentState: ScrollState = {
  scrollDirection: null,
  scrollY: 0,
  isScrolled: false,
};
let lastScrollY = 0;
let lastDirection: 'up' | 'down' | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): ScrollState {
  return currentState;
}

function getServerSnapshot(): ScrollState {
  return {
    scrollDirection: null,
    scrollY: 0,
    isScrolled: false,
  };
}

// Initialize scroll listener once
if (typeof window !== 'undefined') {
  let ticking = false;

  const updateState = () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    let direction = lastDirection;
    if (delta > DIRECTION_THRESHOLD) {
      direction = 'down';
    } else if (delta < -DIRECTION_THRESHOLD) {
      direction = 'up';
    }

    const isScrolled = scrollY > SCROLL_THRESHOLD;

    if (direction !== lastDirection || scrollY !== lastScrollY) {
      lastDirection = direction;
      lastScrollY = scrollY;
      currentState = { scrollDirection: direction, scrollY, isScrolled };
      listeners.forEach((cb) => cb());
    }

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateState);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initialize with current scroll position
  lastScrollY = window.scrollY;
  currentState = {
    scrollDirection: null,
    scrollY: window.scrollY,
    isScrolled: window.scrollY > SCROLL_THRESHOLD,
  };
}

/**
 * Hook for detecting scroll direction with debouncing
 *
 * Returns scroll direction for hide/reveal nav behavior.
 * Uses threshold buffer to prevent jitter from small scroll movements.
 * Uses useSyncExternalStore for proper React 18+ integration.
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 (lines 123-271)
 */
export function useScrollDirection(): ScrollState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
