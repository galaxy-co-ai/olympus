'use client';

/**
 * TopBar — Top navigation bar in workspace shell
 *
 * Contains:
 * - Left: Breadcrumb (route-aware)
 * - Center: Search input with dropdown (always visible)
 * - Right: Controls cluster (theme, country, drawer toggle)
 *
 * Height: 56px fixed
 * Glass material with blur
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2
 */

import { useRef, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShellStore } from '@/lib/stores/shell-store';
import { useIsMac } from '@/lib/hooks/useCommandK';
import { Breadcrumb } from './Breadcrumb';
import { ControlCluster } from './ControlCluster';
import { SearchDropdown } from './SearchDropdown';

// Placeholder cycling for search input
const SEARCH_PLACEHOLDERS = [
  'Search events, sports, countries...',
  'Try "alpine skiing"',
  'Try "Norway medals"',
  'Try "schedule tomorrow"',
];

interface TopBarProps {
  className?: string;
  onSearchFocus?: () => void;
}

export function TopBar({ className, onSearchFocus }: TopBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchQuery = useShellStore((s) => s.searchQuery);
  const setSearchQuery = useShellStore((s) => s.setSearchQuery);
  const searchFocused = useShellStore((s) => s.searchFocused);
  const setSearchFocused = useShellStore((s) => s.setSearchFocused);
  const isMac = useIsMac();

  // Cycle placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % SEARCH_PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle Cmd+K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        onSearchFocus?.();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onSearchFocus]);

  // Handle blur with delay to allow click on dropdown
  const handleBlur = () => {
    // Delay blur to allow click events on dropdown
    setTimeout(() => {
      setSearchFocused(false);
    }, 150);
  };

  return (
    <header
      className={cn(
        'flex items-center justify-between gap-4 px-4',
        'border-b',
        className
      )}
      style={{
        gridArea: 'topbar',
        height: '56px',
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--color-glass-border)',
        zIndex: 50,
      }}
      role="banner"
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center shrink-0">
        <Breadcrumb />
      </div>

      {/* Center: Search input with dropdown */}
      <div className="relative flex-1 max-w-md mx-4">
        <div
          className={cn(
            'relative flex items-center h-9 rounded-full px-3 gap-2',
            'transition-all duration-150',
            searchFocused && 'ring-2'
          )}
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            // @ts-expect-error CSS custom property
            '--tw-ring-color': 'var(--country-accent-primary)',
          }}
        >
          <Search
            size={16}
            style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
          />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={handleBlur}
            placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
            className="flex-1 bg-transparent outline-none"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-primary)',
            }}
            aria-label="Search"
            aria-expanded={searchFocused && searchQuery.length > 0}
            aria-haspopup="listbox"
          />
          {!searchFocused && !searchQuery && (
            <span
              className="px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              {isMac ? '⌘K' : 'Ctrl K'}
            </span>
          )}
        </div>

        {/* Search dropdown */}
        <SearchDropdown inputRef={searchRef} />
      </div>

      {/* Right: Controls */}
      <div className="flex items-center shrink-0">
        <ControlCluster />
      </div>
    </header>
  );
}
