'use client';

/**
 * Recent Searches Hook
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Persist recent searches in localStorage
 * - Max 8 items
 * - Zod validation on read
 * - Hydration-safe
 */

import { useState, useEffect, useCallback } from 'react';
import { RecentSearchesSchema, type RecentSearch } from '@/lib/types/search';

const STORAGE_KEY = 'olympus-recent-searches';
const MAX_RECENT = 8;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (hydration-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validated = RecentSearchesSchema.safeParse(parsed);
        if (validated.success) {
          setRecentSearches(validated.data);
        }
      }
    } catch {
      // Invalid localStorage data — ignore
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever recentSearches changes (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch {
      // localStorage full or unavailable — ignore
    }
  }, [recentSearches, isHydrated]);

  // Add a recent search
  const addRecent = useCallback(
    (item: Omit<RecentSearch, 'timestamp'>) => {
      setRecentSearches((prev) => {
        // Remove existing entry with same href (dedup)
        const filtered = prev.filter((r) => r.href !== item.href);

        // Prepend new item with timestamp
        const newItem: RecentSearch = {
          ...item,
          timestamp: Date.now(),
        };

        // Trim to max
        return [newItem, ...filtered].slice(0, MAX_RECENT);
      });
    },
    []
  );

  // Clear all recent searches
  const clearRecent = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    recentSearches,
    addRecent,
    clearRecent,
    isHydrated,
  };
}
