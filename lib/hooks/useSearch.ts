'use client';

/**
 * Search Hook
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Fuse.js fuzzy search across all Olympic data
 * - Debounced input (100ms)
 * - Results grouped by type
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { buildSearchIndex } from '@/lib/search/searchIndex';
import type { SearchableItem, GroupedResults } from '@/lib/types/search';

/**
 * Group search results by type
 */
function groupResults(results: SearchableItem[]): GroupedResults {
  const groups: GroupedResults = {};

  results.forEach((item) => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    groups[item.type]!.push(item);
  });

  return groups;
}

/**
 * Order for result groups
 */
const GROUP_ORDER: SearchableItem['type'][] = [
  'page',
  'sport',
  'country',
  'event',
  'venue',
];

export function useSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Build index once (lazy initialization)
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Configure Fuse.js
  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: 'title', weight: 1.0 },
          { name: 'keywords', weight: 0.5 },
          { name: 'subtitle', weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [searchIndex]
  );

  // Debounce query input
  useEffect(() => {
    setIsSearching(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 100);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Search results
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const fuseResults = fuse.search(debouncedQuery, { limit: 20 });
    return fuseResults.map((r) => r.item);
  }, [fuse, debouncedQuery]);

  // Grouped results in display order
  const groupedResults = useMemo(() => {
    const groups = groupResults(results);

    // Return in specific order
    const ordered: GroupedResults = {};
    GROUP_ORDER.forEach((type) => {
      if (groups[type] && groups[type]!.length > 0) {
        ordered[type] = groups[type];
      }
    });

    return ordered;
  }, [results]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    groupedResults,
    isSearching,
    resultCount: results.length,
    clearSearch,
  };
}
