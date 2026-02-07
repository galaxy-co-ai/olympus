'use client';

/**
 * AnimatedCounter — Number that counts up on scroll-into-view
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - Uses Framer Motion animate() for smooth counting
 * - DOM ref mutation (NOT React state) — zero re-renders during animation
 * - tabular-nums via className to prevent layout shift
 * - prefers-reduced-motion: skip animation, show final value
 */

import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function AnimatedCounter({
  value,
  duration = 1.5,
  suffix,
  prefix,
  className,
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Set initial value for reduced motion users
    if (motionQuery.matches && ref.current) {
      ref.current.textContent = `${prefix ?? ''}${value.toLocaleString()}${suffix ?? ''}`;
    }
  }, [value, prefix, suffix]);

  useEffect(() => {
    if (isInView && !hasAnimated.current && !reducedMotion) {
      hasAnimated.current = true;
      animate(motionValue, value, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [isInView, motionValue, value, duration, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix ?? ''}${v.toLocaleString()}${suffix ?? ''}`;
      }
    });

    return unsubscribe;
  }, [rounded, prefix, suffix, reducedMotion]);

  return (
    <span
      ref={ref}
      className={cn('tabular-nums', className)}
      style={style}
      aria-label={`${prefix ?? ''}${value.toLocaleString()}${suffix ?? ''}`}
    >
      {/* Initial value for SSR */}
      {reducedMotion ? `${prefix ?? ''}${value.toLocaleString()}${suffix ?? ''}` : '0'}
    </span>
  );
}
