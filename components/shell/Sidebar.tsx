'use client';

/**
 * Sidebar — Left navigation in workspace shell
 *
 * Contains:
 * - Logo at top
 * - Nav items with icons and active state
 * - Collapse toggle at bottom
 *
 * Width: 240px expanded, 64px collapsed
 * Transitions with CSS (200ms ease)
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2
 */

import Link from 'next/link';
import {
  Home,
  Tv,
  LayoutGrid,
  Calendar,
  Trophy,
  MapPin,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShellStore } from '@/lib/stores/shell-store';
import { SidebarItem } from './SidebarItem';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/highlights', label: 'Highlights', icon: Tv },
  { href: '/sports', label: 'Sports', icon: LayoutGrid },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/medals', label: 'Medals', icon: Trophy },
  { href: '/venues', label: 'Venues', icon: MapPin },
  { href: '/countries', label: 'Countries', icon: Globe },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const sidebarCollapsed = useShellStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useShellStore((s) => s.toggleSidebar);

  return (
    <aside
      className={cn(
        'flex flex-col border-r',
        'transition-[width] duration-200 ease-out',
        'hidden md:flex', // Hide on mobile
        className
      )}
      style={{
        gridArea: 'sidebar',
        width: sidebarCollapsed ? '64px' : '240px',
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center h-14',
          sidebarCollapsed ? 'justify-center px-2' : 'px-4'
        )}
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:opacity-80"
        >
          {/* Logo icon - Olympic rings simplified */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--olympus-glacier), var(--olympus-alpine))',
            }}
          >
            <span className="text-white font-bold text-xs">O</span>
          </div>

          {!sidebarCollapsed && (
            <span
              className="font-semibold tracking-tight"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-primary)',
              }}
            >
              Olympus
            </span>
          )}
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            collapsed={sidebarCollapsed}
          />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className={cn(
          'flex items-center h-12 border-t',
          'transition-colors duration-150',
          'hover:bg-[var(--color-surface-hover)]',
          sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}
        style={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {!sidebarCollapsed && (
          <span style={{ fontSize: 'var(--text-small)' }}>Collapse</span>
        )}
        {sidebarCollapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>
    </aside>
  );
}
