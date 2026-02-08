'use client';

/**
 * RightDrawer — Right panel in workspace shell
 *
 * Contains:
 * - Tab bar at top (Schedule/Medals)
 * - Scrollable content area
 * - Open/close with translateX animation
 * - Keyboard: Cmd+. / Ctrl+. to toggle
 *
 * Width: 360px
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 */

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useShellStore } from '@/lib/stores/shell-store';
import { DrawerTabBar } from './DrawerTabBar';
import { DrawerSchedule } from './DrawerSchedule';
import { DrawerMedals } from './DrawerMedals';

interface RightDrawerProps {
  className?: string;
}

export function RightDrawer({ className }: RightDrawerProps) {
  const drawerOpen = useShellStore((s) => s.drawerOpen);
  const drawerTab = useShellStore((s) => s.drawerTab);
  const toggleDrawer = useShellStore((s) => s.toggleDrawer);

  // Keyboard shortcut: Cmd+. / Ctrl+. to toggle drawer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        toggleDrawer();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [toggleDrawer]);

  // Get content component based on active tab
  const TabContent = {
    schedule: DrawerSchedule,
    medals: DrawerMedals,
  }[drawerTab];

  return (
    <aside
      className={cn(
        'flex flex-col border-l overflow-hidden',
        'hidden lg:flex', // Hide on tablet and below
        className
      )}
      style={{
        gridArea: 'drawer',
        width: drawerOpen ? '360px' : '0px',
        minWidth: drawerOpen ? '360px' : '0px',
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: drawerOpen ? 'var(--color-border)' : 'transparent',
        transition: 'width 200ms ease-out, min-width 200ms ease-out, border-color 200ms ease-out',
      }}
      aria-label="Activity panel"
      aria-hidden={!drawerOpen}
    >
      {/* Grabber handle */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-ew-resize"
        style={{ backgroundColor: 'var(--color-text-muted)' }}
        aria-hidden="true"
      />

      {/* Tab bar */}
      <DrawerTabBar />

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={drawerTab}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <TabContent />
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
