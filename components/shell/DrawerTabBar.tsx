'use client';

/**
 * DrawerTabBar — Tab switcher in RightDrawer
 *
 * Two tabs: Schedule, Medals
 * Uses layoutId for animated indicator
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useShellStore, type DrawerTab } from '@/lib/stores/shell-store';

const TABS: { id: DrawerTab; label: string }[] = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'medals', label: 'Medals' },
];

export function DrawerTabBar() {
  const drawerTab = useShellStore((s) => s.drawerTab);
  const setDrawerTab = useShellStore((s) => s.setDrawerTab);

  return (
    <div
      className="flex items-center h-14 px-4 gap-1"
      style={{ borderBottom: '1px solid var(--color-border)' }}
      role="tablist"
      aria-label="Panel tabs"
    >
      {TABS.map((tab) => {
        const isActive = drawerTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setDrawerTab(tab.id)}
            className={cn(
              'relative px-3 py-1.5 rounded-full',
              'transition-colors duration-150'
            )}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
          >
            {isActive && (
              <motion.div
                layoutId="drawer-tab-indicator"
                className="absolute inset-0 rounded-full"
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
            <span
              className="relative z-10"
              style={{
                fontSize: 'var(--text-small)',
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
