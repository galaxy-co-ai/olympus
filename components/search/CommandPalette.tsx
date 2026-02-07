'use client';

/**
 * Command Palette
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - cmdk-powered search modal
 * - Triggered by ⌘K / Ctrl+K or nav search button
 * - Full-screen overlay with centered modal
 * - Keyboard-first navigation
 */

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, X } from 'lucide-react';
import { useSearch } from '@/lib/hooks/useSearch';
import { useRecentSearches } from '@/lib/hooks/useRecentSearches';
import { useIsMac } from '@/lib/hooks/useCommandK';
import { SearchResultItem } from './SearchResultItem';
import { SearchEmpty } from './SearchEmpty';
import type { SearchableItem } from '@/lib/types/search';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Group labels
const GROUP_LABELS: Record<string, string> = {
  page: 'Pages',
  sport: 'Sports',
  country: 'Countries',
  event: 'Events',
  venue: 'Venues',
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isMac = useIsMac();

  const { query, setQuery, groupedResults, resultCount, clearSearch } = useSearch();
  const { recentSearches, addRecent, clearRecent } = useRecentSearches();

  // Auto-focus input on open (desktop only)
  useEffect(() => {
    if (open) {
      // Small delay to ensure modal is mounted
      const timer = setTimeout(() => {
        // Only auto-focus on devices with hover (likely desktop)
        if (window.matchMedia('(hover: hover)').matches) {
          inputRef.current?.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      clearSearch();
    }
  }, [open, clearSearch]);

  // Handle item selection
  const handleSelect = useCallback(
    (item: SearchableItem) => {
      // Add to recent
      addRecent({
        query: query || item.title,
        href: item.href,
        title: item.title,
      });

      // Navigate
      router.push(item.href);

      // Close palette
      onOpenChange(false);
    },
    [query, addRecent, router, onOpenChange]
  );

  // Handle recent item selection
  const handleRecentSelect = useCallback(
    (recent: { href: string; title: string }) => {
      router.push(recent.href);
      onOpenChange(false);
    },
    [router, onOpenChange]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60"
            style={{ backdropFilter: 'blur(20px)' }}
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.15,
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          >
            <Command
              className="
                w-full max-w-xl overflow-hidden rounded-xl
                border shadow-2xl
              "
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border)',
                boxShadow: '0 16px 70px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
                maxHeight: 'min(70vh, 500px)',
              }}
              label="Search Olympics"
              shouldFilter={false} // We handle filtering via Fuse.js
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  onOpenChange(false);
                }
              }}
            >
              {/* Input */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <Search
                  size={18}
                  className="shrink-0"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-hidden="true"
                />
                <Command.Input
                  ref={inputRef}
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search sports, countries, events..."
                  className="
                    flex-1 bg-transparent border-none outline-none
                    placeholder:text-[var(--color-text-muted)]
                  "
                  style={{
                    fontSize: '16px', // Prevents iOS zoom
                    color: 'var(--color-text-primary)',
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Search sports, athletes, countries, and events"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)]"
                    aria-label="Clear search"
                  >
                    <X size={16} style={{ color: 'var(--color-text-muted)' }} />
                  </button>
                )}
                <span
                  className="shrink-0 px-1.5 py-0.5 rounded text-[10px] tracking-wide"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {isMac ? '⌘K' : 'Ctrl K'}
                </span>
              </div>

              {/* Results */}
              <Command.List
                className="overflow-y-auto p-2"
                style={{ maxHeight: 'calc(min(70vh, 500px) - 120px)' }}
              >
                {/* Empty state */}
                {query && resultCount === 0 && (
                  <Command.Empty>
                    <SearchEmpty query={query} />
                  </Command.Empty>
                )}

                {/* Recent searches (when no query) */}
                {!query && recentSearches.length > 0 && (
                  <Command.Group
                    heading={
                      <div className="flex items-center justify-between">
                        <span>Recent</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearRecent();
                          }}
                          className="text-[10px] hover:underline"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          Clear
                        </button>
                      </div>
                    }
                    className="mb-2"
                  >
                    <div
                      className="px-2 py-1.5 text-xs uppercase tracking-wide flex items-center justify-between"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Recent
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearRecent();
                        }}
                        className="text-[10px] normal-case hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                    {recentSearches.map((recent) => (
                      <Command.Item
                        key={recent.href + recent.timestamp}
                        value={recent.title}
                        onSelect={() => handleRecentSelect(recent)}
                        className="
                          flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                          transition-colors duration-100
                          data-[selected=true]:bg-[var(--color-surface-hover)]
                        "
                      >
                        <Clock
                          size={16}
                          style={{ color: 'var(--color-text-muted)' }}
                          aria-hidden="true"
                        />
                        <span style={{ color: 'var(--color-text-primary)' }}>
                          {recent.title}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Grouped search results */}
                {query &&
                  Object.entries(groupedResults).map(([type, items]) => (
                    <Command.Group key={type} className="mb-2">
                      <div
                        className="px-2 py-1.5 text-xs uppercase tracking-wide"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {GROUP_LABELS[type] || type}
                      </div>
                      {items.map((item) => (
                        <SearchResultItem
                          key={item.id}
                          item={item}
                          onSelect={handleSelect}
                        />
                      ))}
                    </Command.Group>
                  ))}
              </Command.List>

              {/* Footer — keyboard hints */}
              <div
                className="flex items-center justify-center gap-6 px-4 py-2 border-t"
                style={{
                  borderColor: 'var(--color-border)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>esc Close</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
