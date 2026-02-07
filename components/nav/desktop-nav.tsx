'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useScrollDirection } from './use-scroll-direction';
import { NavLink } from './nav-link';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/sports', label: 'Sports' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/medals', label: 'Medals' },
  { href: '/stories', label: 'Stories' },
];

/**
 * Desktop Navigation Bar (Layer 1)
 *
 * Fixed, glass, pill-shaped navigation that:
 * - Hides on scroll down, reveals on scroll up
 * - Transitions from transparent to glass when scrolled
 * - Has animated active indicator using Framer Motion layoutId
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 (lines 123-271)
 */
export function DesktopNav() {
  const pathname = usePathname();
  const { scrollDirection, isScrolled } = useScrollDirection();
  const { setTheme, resolvedTheme } = useTheme();

  // Hide when scrolling down, show when scrolling up
  const isHidden = scrollDirection === 'down' && isScrolled;

  // Determine current theme for icon display
  const isDark = resolvedTheme === 'dark';

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <nav
      className="
        fixed top-4 left-1/2 z-50 -translate-x-1/2
        hidden md:flex items-center gap-1
        rounded-full border border-[var(--color-border)]
        transition-all duration-300 ease-out
      "
      style={{
        backgroundColor: isScrolled
          ? 'var(--color-glass-bg)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        padding: isScrolled ? '0.5rem 1rem' : '0.75rem 1.25rem',
        transform: `translateX(-50%) translateY(${isHidden ? '-120%' : '0'})`,
        borderColor: isScrolled
          ? 'var(--color-border)'
          : 'transparent',
      }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href="/"
        className="
          mr-4 font-semibold tracking-tight
          text-[var(--color-text-primary)]
          hover:text-[var(--country-accent-primary)]
          transition-colors
        "
        style={{ fontSize: 'var(--text-body)' }}
      >
        Olympus
      </Link>

      {/* Center nav links */}
      <div className="relative flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.href} className="relative">
              {/* Active indicator - Framer Motion layoutId */}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--country-accent-primary) 12%, transparent)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <NavLink
                href={item.href}
                label={item.label}
                className="
                  relative z-10 px-3 py-1.5 rounded-full
                  text-[var(--color-text-secondary)]
                  transition-colors
                  hover:text-[var(--color-text-primary)]
                "
                activeClassName="text-[var(--color-text-primary)] font-medium"
              >
                <span style={{ fontSize: 'var(--text-small)' }}>
                  {item.label}
                </span>
              </NavLink>
            </div>
          );
        })}
      </div>

      {/* Right actions */}
      <div className="ml-4 flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          className="
            p-2 rounded-full
            text-[var(--color-text-muted)]
            hover:text-[var(--color-text-primary)]
            hover:bg-[var(--color-surface-secondary)]
            transition-colors
          "
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Country selector placeholder */}
        <button
          className="
            p-2 rounded-full
            text-[var(--color-text-muted)]
            hover:text-[var(--color-text-primary)]
            hover:bg-[var(--color-surface-secondary)]
            transition-colors
          "
          aria-label="Select country (coming soon)"
          title="Country selector coming soon"
        >
          <Globe size={18} />
        </button>

        {/* Search */}
        <button
          className="
            p-2 rounded-full
            text-[var(--color-text-muted)]
            hover:text-[var(--color-text-primary)]
            hover:bg-[var(--color-surface-secondary)]
            transition-colors
          "
          aria-label="Search"
          onClick={() => {
            // TODO: Wire up cmdk command palette
            console.log('Search clicked - cmdk coming later');
          }}
        >
          <Search size={18} />
        </button>
      </div>
    </nav>
  );
}
