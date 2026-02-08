/**
 * useRolodex — Scroll-driven drum/cylinder depth effect
 *
 * Simulates a physical rolodex drum: center items face you at full size,
 * items above/below curve away — progressively smaller and dimmer.
 *
 * Visual model:
 *   edge (top)    → scale 0.88, opacity 0.15  (furthest from viewer)
 *   near-center   → scale 0.94, opacity 0.4
 *   center        → scale 1.0,  opacity 1.0   (facing viewer)
 *   near-center   → scale 0.94, opacity 0.4
 *   edge (bottom) → scale 0.88, opacity 0.15  (furthest from viewer)
 *
 * Respects prefers-reduced-motion: returns static values when enabled.
 */

'use client';

import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

interface RolodexValues {
  opacity: MotionValue<number> | number;
  scale: MotionValue<number> | number;
}

interface UseRolodexOptions {
  /** Ref to the scroll container */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Ref to this specific pill element */
  itemRef: React.RefObject<HTMLElement | null>;
}

export function useRolodex({
  containerRef,
  itemRef,
}: UseRolodexOptions): RolodexValues {
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: itemRef,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  // Wide center plateau (0.3–0.7) = ~40% of viewport at full prominence
  // Sharp falloff at edges for dramatic depth
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [1, 0.5, 0.15, 0.15, 0.5, 1]
  );

  // 12% scale range — edges are full size, center shrinks (inverted for scroll direction)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [1, 0.96, 0.88, 0.88, 0.96, 1]
  );

  if (prefersReduced) {
    return { opacity: 1, scale: 1 };
  }

  return { opacity, scale };
}
