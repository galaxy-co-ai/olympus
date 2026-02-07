'use client';

/**
 * ScrollChapter — Reusable scroll-triggered reveal container
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - Content fades/slides in as user scrolls
 * - Uses Framer Motion useInView with { once: true, amount: 0.2 }
 * - Editorial feel: ease curves, not springs
 * - prefers-reduced-motion: opacity only, no y offset
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type ScrollChapterProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'wide' | 'full-bleed';
};

const variantStyles = {
  default: 'max-w-3xl mx-auto px-4 sm:px-6',
  wide: 'max-w-5xl mx-auto px-4 sm:px-6',
  'full-bleed': 'w-full',
};

export function ScrollChapter({
  children,
  className,
  id,
  variant = 'default',
}: ScrollChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={cn(variantStyles[variant], 'py-8 sm:py-12', className)}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: reducedMotion ? 0 : 24,
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : reducedMotion ? 0 : 24,
        }}
        transition={{
          duration: reducedMotion ? 0.4 : 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
