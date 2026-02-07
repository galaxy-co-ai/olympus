'use client';

/**
 * MobileTopBar — Top bar for mobile devices
 *
 * Contains:
 * - Left: Hamburger menu (opens sidebar overlay)
 * - Center: Current context title
 * - Right: Search icon (opens command palette)
 *
 * Only renders on mobile (<768px)
 */

import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Map routes to titles
const ROUTE_TITLES: Record<string, string> = {
  '/': 'Olympus',
  '/highlights': 'Highlights',
  '/sports': 'Sports',
  '/schedule': 'Schedule',
  '/medals': 'Medals',
  '/venues': 'Venues',
  '/countries': 'Countries',
  '/stories': 'Stories',
};

interface MobileTopBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  className?: string;
}

export function MobileTopBar({ onMenuClick, onSearchClick, className }: MobileTopBarProps) {
  const pathname = usePathname();

  // Get title from pathname
  const title = ROUTE_TITLES[pathname] ||
    pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ||
    'Olympus';

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4',
        'border-b md:hidden', // Only on mobile
        className
      )}
      style={{
        height: '56px',
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--color-glass-border)',
      }}
      role="banner"
    >
      {/* Left: Hamburger */}
      <button
        onClick={onMenuClick}
        className="p-2 -ml-2 rounded-full transition-colors hover:bg-[var(--color-surface-hover)]"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Center: Title */}
      <h1
        className="font-semibold"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h1>

      {/* Right: Search */}
      <button
        onClick={onSearchClick}
        className="p-2 -mr-2 rounded-full transition-colors hover:bg-[var(--color-surface-hover)]"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Search"
      >
        <Search size={22} />
      </button>
    </header>
  );
}
