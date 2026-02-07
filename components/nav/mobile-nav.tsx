'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Grid2X2, Calendar, Trophy, Search } from 'lucide-react';
import { useScrollDirection } from './use-scroll-direction';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/sports', label: 'Sports', icon: Grid2X2 },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/medals', label: 'Medals', icon: Trophy },
  { href: '/search', label: 'Search', icon: Search },
];

/**
 * Mobile Navigation Bar (Layer 2)
 *
 * Fixed bottom tab bar that:
 * - Hides on scroll down, reveals on scroll up
 * - Has active state with filled icon + label
 * - Respects safe-area-inset-bottom for notched devices
 * - Has touch feedback with scale animation
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 (lines 123-271)
 */
export function MobileNav() {
  const pathname = usePathname();
  const { scrollDirection, isScrolled } = useScrollDirection();

  // Hide when scrolling down, show when scrolling up
  const isHidden = scrollDirection === 'down' && isScrolled;

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        border-t border-[var(--color-border)]
        transition-transform duration-300 ease-out
      "
      style={{
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: isHidden ? 'translateY(100%)' : 'translateY(0)',
      }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          // Search is a special case - no-op for now
          const isSearch = item.href === '/search';

          return (
            <Link
              key={item.href}
              href={isSearch ? '#' : item.href}
              onClick={
                isSearch
                  ? (e) => {
                      e.preventDefault();
                      // TODO: Wire up cmdk command palette
                      console.log('Search clicked - cmdk coming later');
                    }
                  : undefined
              }
              className="
                relative flex flex-col items-center justify-center
                min-w-[60px] py-1
                active:scale-[0.92] transition-transform duration-100
              "
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                animate={{
                  y: isActive ? -2 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                className="relative"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={
                    isActive
                      ? 'text-[var(--country-accent-primary)]'
                      : 'text-[var(--color-text-muted)] opacity-60'
                  }
                />
              </motion.div>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  y: isActive ? -2 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                className={`
                  mt-1
                  ${isActive ? 'text-[var(--country-accent-primary)] font-medium' : 'text-[var(--color-text-muted)]'}
                `}
                style={{ fontSize: 'var(--text-caption, 11px)' }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
