'use client';

/**
 * Favorites Hook
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - "Favorite toggle: small heart/star, persists in localStorage"
 *
 * Manages favorited events in localStorage with hydration-safe access.
 */

import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';

const STORAGE_KEY = 'olympus-favorites';
const FavoritesSchema = z.array(z.string());

/**
 * Safe localStorage read with Zod validation
 */
function readFavorites(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return new Set();
    }

    const parsed = JSON.parse(stored);
    const validated = FavoritesSchema.parse(parsed);
    return new Set(validated);
  } catch {
    // Invalid data, return empty set
    return new Set();
  }
}

/**
 * Safe localStorage write
 */
function writeFavorites(favorites: Set<string>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const array = Array.from(favorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
  } catch {
    // Storage error, fail silently
  }
}

export interface UseFavoritesReturn {
  /** Set of favorited event IDs */
  favorites: Set<string>;
  /** Toggle favorite status for an event */
  toggleFavorite: (eventId: string) => void;
  /** Check if an event is favorited */
  isFavorite: (eventId: string) => boolean;
  /** Clear all favorites */
  clearFavorites: () => void;
  /** Number of favorited events */
  count: number;
}

/**
 * Hook for managing favorited events
 *
 * Handles SSR hydration safely by initializing empty and syncing with
 * localStorage on mount.
 */
export function useFavorites(): UseFavoritesReturn {
  // Start with empty set for SSR
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = readFavorites();
    setFavorites(stored);
    setIsHydrated(true);
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((eventId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      // Write to localStorage
      writeFavorites(next);
      return next;
    });
  }, []);

  // Check if event is favorited
  const isFavorite = useCallback(
    (eventId: string) => favorites.has(eventId),
    [favorites]
  );

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    writeFavorites(new Set());
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.size,
  };
}
