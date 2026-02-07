'use client';

/**
 * Search Empty State
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Shown when search query has no matches
 * - Helpful, not dismissive
 */

import { SearchX } from 'lucide-react';

interface SearchEmptyProps {
  query: string;
}

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <SearchX
        size={24}
        className="mb-3"
        style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
        aria-hidden="true"
      />
      <p
        className="text-center"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
        }}
      >
        No results for{' '}
        <span style={{ color: 'var(--color-text-secondary)' }}>"{query}"</span>
      </p>
      <p
        className="mt-1 text-center"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
          opacity: 0.7,
        }}
      >
        Try searching for a sport, country, or event
      </p>
    </div>
  );
}
