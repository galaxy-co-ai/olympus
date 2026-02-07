'use client';

/**
 * MobileSidebarOverlay — Sidebar as overlay on mobile
 *
 * Slides in from the left with scrim backdrop
 * Dismissible via scrim click or swipe
 *
 * Only renders on mobile (<768px)
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Tv,
  LayoutGrid,
  Calendar,
  Trophy,
  MapPin,
  Globe,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShellStore } from '@/lib/stores/shell-store';
import type { LucideIcon } from 'lucide-react';

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/highlights', label: 'Highlights', icon: Tv },
  { href: '/sports', label: 'Sports', icon: LayoutGrid },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/medals', label: 'Medals', icon: Trophy },
  { href: '/venues', label: 'Venues', icon: MapPin },
  { href: '/countries', label: 'Countries', icon: Globe },
];

interface MobileSidebarOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebarOverlay({ open, onClose }: MobileSidebarOverlayProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Trap focus and prevent scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] md:hidden"
            style={{ backgroundColor: 'var(--color-bg-overlay)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-[201] w-72 flex flex-col md:hidden"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderRight: '1px solid var(--color-border)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between h-14 px-4"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={onClose}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--olympus-glacier), var(--olympus-alpine))',
                  }}
                >
                  <span className="text-white font-bold text-xs">O</span>
                </div>
                <span
                  className="font-semibold tracking-tight"
                  style={{
                    fontSize: 'var(--text-body)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Olympus
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-full transition-colors hover:bg-[var(--color-surface-hover)]"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg',
                      'transition-colors duration-150',
                      isActive
                        ? 'bg-[color-mix(in_srgb,var(--country-accent-primary)_10%,transparent)]'
                        : 'hover:bg-[var(--color-surface-hover)]'
                    )}
                  >
                    <Icon
                      size={22}
                      style={{
                        color: isActive
                          ? 'var(--country-accent-primary)'
                          : 'var(--color-text-secondary)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 'var(--text-body)',
                        color: isActive
                          ? 'var(--color-text-primary)'
                          : 'var(--color-text-secondary)',
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
