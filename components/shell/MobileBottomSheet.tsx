'use client';

/**
 * MobileBottomSheet — Drawer as bottom sheet on mobile
 *
 * Slides up from the bottom with drag gesture
 * Snap points: closed, half (50vh), full (90vh)
 *
 * Only renders on mobile/tablet (<1024px)
 */

import { useState } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useShellStore, type DrawerTab } from '@/lib/stores/shell-store';
import { DrawerFeed } from './DrawerFeed';
import { DrawerSchedule } from './DrawerSchedule';
import { DrawerMedals } from './DrawerMedals';

type SnapPoint = 'closed' | 'half' | 'full';

const SNAP_HEIGHTS: Record<SnapPoint, string> = {
  closed: '0vh',
  half: '50vh',
  full: '90vh',
};

const TAB_LABELS: Record<DrawerTab, string> = {
  feed: 'Feed',
  schedule: 'Schedule',
  medals: 'Medals',
};

interface MobileBottomSheetProps {
  className?: string;
}

export function MobileBottomSheet({ className }: MobileBottomSheetProps) {
  const drawerOpen = useShellStore((s) => s.drawerOpen);
  const drawerTab = useShellStore((s) => s.drawerTab);
  const setDrawerTab = useShellStore((s) => s.setDrawerTab);
  const setDrawerOpen = useShellStore((s) => s.setDrawerOpen);
  const dragControls = useDragControls();

  const [snapPoint, setSnapPoint] = useState<SnapPoint>('half');

  // Get content component based on active tab
  const TabContent = {
    feed: DrawerFeed,
    schedule: DrawerSchedule,
    medals: DrawerMedals,
  }[drawerTab];

  // Handle drag end
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Fast swipe down = close
    if (velocity > 500 || offset > 200) {
      if (snapPoint === 'half') {
        setDrawerOpen(false);
        setSnapPoint('closed');
      } else if (snapPoint === 'full') {
        setSnapPoint('half');
      }
      return;
    }

    // Fast swipe up = expand
    if (velocity < -500 || offset < -200) {
      if (snapPoint === 'closed') {
        setDrawerOpen(true);
        setSnapPoint('half');
      } else if (snapPoint === 'half') {
        setSnapPoint('full');
      }
      return;
    }
  };

  // Toggle between half and closed
  const handleHandleClick = () => {
    if (!drawerOpen) {
      setDrawerOpen(true);
      setSnapPoint('half');
    } else if (snapPoint === 'half') {
      setSnapPoint('full');
    } else {
      setSnapPoint('half');
    }
  };

  return (
    <>
      {/* Floating handle pill — always visible on mobile */}
      <motion.button
        onClick={handleHandleClick}
        className={cn(
          'fixed bottom-4 left-1/2 -translate-x-1/2 z-[150]',
          'flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg',
          'lg:hidden', // Hide on desktop
          className
        )}
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
        }}
        whileTap={{ scale: 0.98 }}
      >
        {Object.entries(TAB_LABELS).map(([key, label], index) => (
          <span key={key} className="flex items-center">
            {index > 0 && (
              <span
                className="mx-1.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                ·
              </span>
            )}
            <span
              style={{
                fontSize: 'var(--text-small)',
                color:
                  drawerTab === key
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                fontWeight: drawerTab === key ? 500 : 400,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDrawerTab(key as DrawerTab);
                if (!drawerOpen) {
                  setDrawerOpen(true);
                  setSnapPoint('half');
                }
              }}
            >
              {label}
            </span>
          </span>
        ))}
      </motion.button>

      {/* Bottom sheet */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Scrim (only when full) */}
            {snapPoint === 'full' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[140] lg:hidden"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                onClick={() => setSnapPoint('half')}
              />
            )}

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ height: SNAP_HEIGHTS[snapPoint] }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="fixed bottom-0 left-0 right-0 z-[145] flex flex-col rounded-t-2xl lg:hidden"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                borderTop: '1px solid var(--color-border)',
                boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Drag handle */}
              <div
                className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-text-muted)', opacity: 0.3 }}
                />
              </div>

              {/* Tab bar */}
              <div
                className="flex items-center gap-4 px-4 pb-3"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {Object.entries(TAB_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setDrawerTab(key as DrawerTab)}
                    className="relative px-2 py-1"
                  >
                    {drawerTab === key && (
                      <motion.div
                        layoutId="mobile-drawer-tab"
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--country-accent-primary) 10%, transparent)',
                        }}
                      />
                    )}
                    <span
                      className="relative z-10"
                      style={{
                        fontSize: 'var(--text-small)',
                        color:
                          drawerTab === key
                            ? 'var(--color-text-primary)'
                            : 'var(--color-text-muted)',
                        fontWeight: drawerTab === key ? 500 : 400,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <TabContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
