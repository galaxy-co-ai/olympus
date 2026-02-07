'use client';

/**
 * View Mode Toggle
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 6
 * - View modes: "By Time" (chronological), "By Sport" (grouped), "By Venue" (location-based)
 *
 * Segmented control with sliding pill animation.
 */

import { motion } from 'framer-motion';
import { Clock, Grid2X2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewMode = 'time' | 'sport' | 'venue';

interface ViewModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: typeof Clock }[] = [
  { id: 'time', label: 'By Time', icon: Clock },
  { id: 'sport', label: 'By Sport', icon: Grid2X2 },
  { id: 'venue', label: 'By Venue', icon: MapPin },
];

export function ViewModeToggle({ mode, onModeChange }: ViewModeToggleProps) {
  return (
    <div
      className="relative flex rounded-full p-1"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      role="radiogroup"
      aria-label="View mode"
    >
      {VIEW_OPTIONS.map((option) => {
        const isActive = mode === option.id;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            onClick={() => onModeChange(option.id)}
            className={cn(
              'relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5',
              'transition-colors duration-150',
              'focus-visible:outline-none',
              isActive
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-muted)]'
            )}
            style={{
              fontSize: 'var(--text-small)',
            }}
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
          >
            {/* Sliding pill background */}
            {isActive && (
              <motion.div
                layoutId="view-mode-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            <Icon size={16} className="relative z-10" aria-hidden="true" />
            <span className="relative z-10 hidden font-medium sm:inline">
              {option.label.replace('By ', '')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
