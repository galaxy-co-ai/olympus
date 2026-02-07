'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  label: string;
  icon?: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  children?: ReactNode;
}

/**
 * Navigation link with active state detection
 *
 * Uses Next.js Link for client-side navigation (cmd+click, right-click work).
 * Applies aria-current="page" when active for accessibility.
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 (lines 123-271)
 */
export function NavLink({
  href,
  label,
  icon,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
  children,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
      data-active={isActive}
    >
      {icon}
      {children ?? label}
    </Link>
  );
}

/**
 * Check if a path is currently active
 * Utility for external components that need active state
 */
export function useIsActive(href: string): boolean {
  const pathname = usePathname();
  return pathname === href;
}
