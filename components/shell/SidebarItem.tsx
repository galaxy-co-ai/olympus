'use client';

/**
 * SidebarItem — Navigation item in sidebar
 *
 * Features:
 * - Icon + label
 * - Active state with layoutId pill animation
 * - Collapse-aware (icon only when collapsed)
 * - Hover state
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed: boolean;
}

export function SidebarItem({ href, label, icon: Icon, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        'relative flex items-center gap-3 rounded-lg',
        'transition-colors duration-150',
        collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5',
        !isActive && 'hover:bg-[var(--color-surface-hover)]'
      )}
      title={collapsed ? label : undefined}
    >
      {/* Active indicator - Framer Motion layoutId */}
      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--country-accent-primary) 10%, transparent)',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 35,
          }}
        />
      )}

      {/* Icon */}
      <span
        className="relative z-10 shrink-0"
        style={{
          color: isActive
            ? 'var(--country-accent-primary)'
            : 'var(--color-text-secondary)',
        }}
      >
        <Icon size={20} />
      </span>

      {/* Label */}
      {!collapsed && (
        <span
          className="relative z-10 truncate"
          style={{
            fontSize: 'var(--text-small)',
            color: isActive
              ? 'var(--color-text-primary)'
              : 'var(--color-text-secondary)',
            fontWeight: isActive ? 500 : 400,
          }}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
