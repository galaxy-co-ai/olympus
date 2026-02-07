'use client';

/**
 * SearchDropdown — Inline search results dropdown below TopBar search input
 *
 * Features:
 * - Shows when typing in search input
 * - Groups results by type (pages, sports, countries, events)
 * - Keyboard navigation (↑↓ to navigate, Enter to select, Esc to close)
 * - Click result to navigate
 *
 * Uses useSearch hook for Fuse.js fuzzy search
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { MapPin, Search } from 'lucide-react';
import { useShellStore } from '@/lib/stores/shell-store';
import { useSearch } from '@/lib/hooks/useSearch';
import type { SearchableItem } from '@/lib/types/search';

const GROUP_LABELS: Record<string, string> = {
  page: 'Pages',
  sport: 'Sports',
  country: 'Countries',
  event: 'Events',
  venue: 'Venues',
};

function getIcon(iconName: string): React.ReactNode {
  if (/\p{Emoji}/u.test(iconName)) {
    return <span className="text-base">{iconName}</span>;
  }
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  const IconComponent = icons[pascalName] || MapPin;
  return <IconComponent size={16} />;
}

interface SearchDropdownProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function SearchDropdown({ inputRef }: SearchDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchQuery = useShellStore((s) => s.searchQuery);
  const searchFocused = useShellStore((s) => s.searchFocused);
  const clearSearch = useShellStore((s) => s.clearSearch);
  const setSearchFocused = useShellStore((s) => s.setSearchFocused);

  // Use the search hook for fuzzy matching
  const { setQuery, results, groupedResults, resultCount } = useSearch();

  // Sync store query to search hook
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, setQuery]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Flatten results for keyboard navigation
  const flatResults = Object.values(groupedResults).flat();

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!searchFocused || flatResults.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            handleSelect(flatResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          clearSearch();
          inputRef.current?.blur();
          break;
      }
    },
    [searchFocused, flatResults, selectedIndex, clearSearch]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle result selection
  const handleSelect = (item: SearchableItem) => {
    router.push(item.href);
    clearSearch();
    setSearchFocused(false);
    inputRef.current?.blur();
  };

  // Show dropdown when focused and has query
  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  if (!showDropdown) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 100,
        }}
      >
        {resultCount === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <Search
              size={24}
              style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
            />
            <p
              className="mt-2"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              No results for &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        ) : (
          // Grouped results
          <div className="py-2">
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                {/* Group header */}
                <div
                  className="px-3 py-1.5 uppercase tracking-wider"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-bg-secondary)',
                  }}
                >
                  {GROUP_LABELS[type] || type}
                </div>

                {/* Group items */}
                {items?.map((item) => {
                  const globalIndex = flatResults.indexOf(item);
                  const isSelected = globalIndex === selectedIndex;
                  const isLive = item.meta?.status === 'live';

                  return (
                    <button
                      key={`${item.type}-${item.href}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                      style={{
                        backgroundColor: isSelected
                          ? 'var(--color-surface-hover)'
                          : 'transparent',
                      }}
                    >
                      {/* Icon */}
                      <span
                        style={{
                          color: isSelected
                            ? 'var(--country-accent-primary)'
                            : 'var(--color-text-secondary)',
                        }}
                      >
                        {getIcon(item.icon || 'circle')}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="truncate"
                            style={{
                              fontSize: 'var(--text-small)',
                              color: 'var(--color-text-primary)',
                              fontWeight: isSelected ? 500 : 400,
                            }}
                          >
                            {item.title}
                          </span>
                          {isLive && (
                            <span className="flex items-center gap-1">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                              </span>
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <p
                            className="truncate"
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Keyboard hint */}
        {resultCount > 0 && (
          <div
            className="flex items-center justify-between px-3 py-2 border-t"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              fontSize: '10px',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
