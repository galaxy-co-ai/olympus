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
 * Floating glass pill that:
 * - Hides on scroll down, reveals on scroll up
 * - Transitions from transparent (resting) to glass (scrolled)
 * - Has animated active indicator using Framer Motion layoutId
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 (lines 123-271)
 */
export function DesktopNav() {
  const pathname = usePathname();
  const { scrollDirection, scrollY, isScrolled } = useScrollDirection();
  const { setTheme, resolvedTheme } = useTheme();

  // Hide when scrolling down and past threshold
  const isHidden = scrollDirection === 'down' && isScrolled;

  // Resting state: scrollY < 20 — fully transparent, relaxed padding
  const isResting = scrollY < 20;

  // Determine current theme for icon display
  const isDark = resolvedTheme === 'dark';

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <nav
      className="
        fixed top-4 left-4 right-4 z-[200]
        hidden md:flex items-center justify-between
        max-w-[960px] mx-auto
        rounded-full
        transition-all duration-300 ease-out
      "
      style={{
        // Border radius: full pill
        borderRadius: '100vw',

        // Hide/reveal transform
        transform: isHidden ? 'translateY(-120%)' : 'translateY(0)',

        // Padding: relaxed when resting, tighter when scrolled
        padding: isResting ? '12px 20px' : '10px 16px',

        // Glass material: subtle at rest, intensified when scrolled
        backgroundColor: isResting
          ? 'var(--color-glass-bg-subtle)'
          : 'var(--color-glass-bg)',
        backdropFilter: isResting ? 'blur(12px)' : 'blur(16px)',
        WebkitBackdropFilter: isResting ? 'blur(12px)' : 'blur(16px)',

        // Border: always visible, intensifies when scrolled
        border: isResting
          ? '1px solid var(--color-glass-border-subtle)'
          : '1px solid var(--color-glass-border)',

        // Shadow: always present
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)',
      }}
      aria-label="Main navigation"
    >
      {/* Left: Logo */}
      <Link
        href="/"
        className="
          font-semibold tracking-tight
          text-[var(--color-text-primary)]
          hover:text-[var(--country-accent-primary)]
          transition-colors
        "
        style={{ fontSize: 'var(--text-body)' }}
      >
        Olympus
      </Link>

      {/* Center: Nav links */}
      <div className="relative flex items-center gap-1 mx-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.href} className="relative group">
              {/* Active indicator - Framer Motion layoutId */}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--country-accent-primary) 8%, transparent)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              {/* Hover indicator for non-active items */}
              {!isActive && (
                <div
                  className="
                    absolute inset-0 rounded-full
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-150
                  "
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--country-accent-primary) 4%, transparent)',
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

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          className="
            p-2 rounded-full
            text-[var(--color-text-muted)]
            hover:text-[var(--color-text-primary)]
            hover:bg-[color-mix(in_srgb,var(--country-accent-primary)_4%,transparent)]
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
            hover:bg-[color-mix(in_srgb,var(--country-accent-primary)_4%,transparent)]
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
            hover:bg-[color-mix(in_srgb,var(--country-accent-primary)_4%,transparent)]
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
