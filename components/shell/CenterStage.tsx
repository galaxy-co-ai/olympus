'use client';

/**
 * CenterStage — Main content viewport in workspace shell
 *
 * Wraps route content with:
 * - AnimatePresence for route transitions
 * - Scroll reset on route change
 * - Responsive padding
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section I
 */

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CenterStageProps {
  children: React.ReactNode;
  className?: string;
}

export function CenterStage({ children, className }: CenterStageProps) {
  const pathname = usePathname();

  return (
    <main
      id="main-content"
      className={cn(
        'scrollbar-hide overflow-y-auto overflow-x-hidden',
        'p-6 lg:p-8',
        className
      )}
      style={{
        gridArea: 'stage',
        backgroundColor: 'var(--color-bg-primary)',
      }}
      role="main"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
