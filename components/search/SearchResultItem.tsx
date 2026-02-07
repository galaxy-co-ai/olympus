'use client';

/**
 * Search Result Item
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Individual result row in command palette
 * - Icon + title + subtitle layout
 * - Status badges for live events
 */

import { Command } from 'cmdk';
import * as LucideIcons from 'lucide-react';
import { MapPin } from 'lucide-react';
import type { SearchableItem } from '@/lib/types/search';

interface SearchResultItemProps {
  item: SearchableItem;
  onSelect: (item: SearchableItem) => void;
}

/**
 * Get Lucide icon by name
 */
function getIcon(iconName: string): React.ReactNode {
  // If it's an emoji (flag), render as text
  if (/\p{Emoji}/u.test(iconName)) {
    return <span className="text-base">{iconName}</span>;
  }

  // Convert to PascalCase for Lucide
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  const IconComponent = icons[pascalName] || MapPin;

  return <IconComponent size={20} />;
}

export function SearchResultItem({ item, onSelect }: SearchResultItemProps) {
  const isLive = item.meta?.status === 'live';

  // Build the search value for cmdk filtering
  const searchValue = [item.title, ...item.keywords, item.subtitle]
    .filter(Boolean)
    .join(' ');

  return (
    <Command.Item
      value={searchValue}
      onSelect={() => onSelect(item)}
      className="
        group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
        transition-colors duration-100
        data-[selected=true]:bg-[var(--color-surface-hover)]
      "
    >
      {/* Icon */}
      <span
        className="
          shrink-0 w-5 h-5 flex items-center justify-center
          text-[var(--color-text-secondary)]
          group-data-[selected=true]:text-[var(--country-accent-primary)]
        "
        aria-hidden="true"
      >
        {getIcon(item.icon || 'circle')}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="truncate font-medium"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-primary)',
            }}
          >
            {item.title}
          </span>

          {/* Live badge */}
          {isLive && (
            <span className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
              </span>
              <span
                className="uppercase font-semibold tracking-wide"
                style={{ fontSize: '10px', color: 'var(--color-live)' }}
              >
                Live
              </span>
            </span>
          )}
        </div>

        {item.subtitle && (
          <p
            className="truncate"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Meta (medals for countries) */}
      {item.meta?.medals && item.type === 'country' && (
        <span
          className="shrink-0 tabular-nums"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          {item.meta.medals}
        </span>
      )}
    </Command.Item>
  );
}
