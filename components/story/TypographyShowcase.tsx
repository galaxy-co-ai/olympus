'use client';

/**
 * TypographyShowcase — Variable font weight animation driven by scroll
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - Font weight shifts as user scrolls through
 * - Uses Framer Motion useScroll + useTransform
 * - Weight: 200 → 700 → 200 as text enters and exits view
 * - prefers-reduced-motion: static weight 500
 *
 * The typography portfolio moment — type as experience.
 */

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

type TypographyShowcaseProps = {
  text: string;
  className?: string;
};

export function TypographyShowcase({ text, className }: TypographyShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [fontWeight, setFontWeight] = useState(200);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    if (motionQuery.matches) {
      setFontWeight(500);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const weightTransform = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [200, 700, 200]);

  useMotionValueEvent(weightTransform, 'change', (v) => {
    if (!reducedMotion) {
      setFontWeight(Math.round(v));
    }
  });

  return (
    <div ref={ref} className="py-24 sm:py-32">
      <motion.p
        className={cn(
          'text-[clamp(28px,5vw,56px)] leading-[1.1] tracking-tight text-center max-w-4xl mx-auto px-4',
          className
        )}
        style={{
          fontVariationSettings: `'wght' ${fontWeight}`,
          color: 'var(--color-text-primary)',
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}
