'use client';

import { motion } from 'framer-motion';

/**
 * Page Transition Wrapper
 *
 * Wraps page content with a subtle fade + slide animation.
 * Used in template.tsx for route transitions.
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section I
 * - Respects prefers-reduced-motion (Framer handles this)
 * - Subtle, quick transitions (150ms)
 */

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1], // --ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
