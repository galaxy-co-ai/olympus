'use client';

/**
 * ParallaxImage — Subtle background parallax using CSS/SVG gradients
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - No actual photos — CSS/SVG gradient compositions
 * - Subtle translateY parallax at different speeds
 * - Mobile: disable parallax (static y: 0)
 * - prefers-reduced-motion: no parallax
 */

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

type ParallaxImageProps = {
  variant: 'mountains' | 'sky' | 'ice';
  children: React.ReactNode;
  className?: string;
};

export function ParallaxImage({ variant, children, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Mobile check
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Different parallax speeds per variant
  const speeds = {
    mountains: { start: '-5%', end: '5%' },
    sky: { start: '-2%', end: '2%' },
    ice: { start: '-3%', end: '3%' },
  };

  const { start, end } = speeds[variant];
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  // Gradient backgrounds per variant
  const gradients = {
    mountains: `
      linear-gradient(
        to bottom,
        transparent 0%,
        color-mix(in srgb, var(--olympus-glacier) 5%, transparent) 30%,
        color-mix(in srgb, var(--olympus-glacier) 10%, transparent) 50%,
        color-mix(in srgb, var(--olympus-peak) 8%, transparent) 70%,
        transparent 100%
      )
    `,
    sky: `
      radial-gradient(
        ellipse 80% 50% at 50% 20%,
        color-mix(in srgb, var(--olympus-glacier) 8%, transparent) 0%,
        transparent 70%
      )
    `,
    ice: `
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--olympus-glacier) 4%, transparent) 0%,
        transparent 40%,
        color-mix(in srgb, var(--olympus-peak) 3%, transparent) 60%,
        transparent 100%
      )
    `,
  };

  const shouldAnimate = !reducedMotion && !isMobile;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: shouldAnimate ? y : 0,
          background: gradients[variant],
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
