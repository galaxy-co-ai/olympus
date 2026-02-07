'use client';

/**
 * Hero Typography — THE CENTERPIECE
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - Kinetic variable font animation (weight 100 → 800 → 600)
 * - "Milano Cortina 2026" + subtitle stack
 * - Scroll-driven weight reduction as user scrolls
 * - Respects prefers-reduced-motion
 *
 * This is the signature moment — the thing that makes people screenshot.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Weight animation keyframe (CSS — more performant than JS for this)
const WEIGHT_ANIMATION = `
@keyframes weight-in {
  0% { font-variation-settings: 'wght' 100; opacity: 0.3; }
  60% { font-variation-settings: 'wght' 800; opacity: 1; }
  100% { font-variation-settings: 'wght' 600; opacity: 1; }
}
`;

export function HeroTypography() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Check mobile
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', handleMobileChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  // Scroll-driven weight animation (desktop only, no reduced motion)
  const handleScroll = useCallback(() => {
    if (rafId.current !== null) return;
    if (reducedMotion || isMobile) return;

    rafId.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(y / heroHeight, 1);

      // Weight shifts from 600 to 300 as user scrolls
      if (titleRef.current) {
        const weight = 600 - progress * 300;
        titleRef.current.style.fontVariationSettings = `'wght' ${weight}`;
      }

      // Year parallax (moves slightly slower)
      if (yearRef.current) {
        yearRef.current.style.transform = `translateY(${y * 0.2}px)`;
      }

      rafId.current = null;
    });
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, reducedMotion, isMobile]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Inject weight animation keyframes */}
      {!reducedMotion && <style>{WEIGHT_ANIMATION}</style>}

      {/* Line 1: MILANO CORTINA */}
      <motion.h1
        ref={titleRef}
        className="uppercase tracking-tight"
        style={{
          fontSize: 'clamp(48px, 10vw, 120px)',
          lineHeight: 'var(--leading-tight)',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          fontVariationSettings: reducedMotion ? "'wght' 600" : "'wght' 100",
          animation: reducedMotion
            ? 'none'
            : 'weight-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        }}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.8 }}
      >
        Milano Cortina
      </motion.h1>

      {/* Line 2: 2026 */}
      <motion.span
        ref={yearRef}
        className="tabular-nums font-extrabold uppercase"
        style={{
          fontSize: 'clamp(64px, 15vw, 200px)',
          lineHeight: 'var(--leading-tight)',
          color: 'var(--olympus-glacier)',
          willChange: isMobile || reducedMotion ? 'auto' : 'transform',
        }}
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                delay: 0.4,
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }
        }
      >
        <span
          className="hidden dark:inline"
          style={{
            textShadow: '0 0 80px rgba(123, 167, 194, 0.3)',
          }}
        >
          2026
        </span>
        <span className="dark:hidden">2026</span>
      </motion.span>

      {/* Line 3: XXVI Olympic Winter Games */}
      <motion.p
        className="mt-4 uppercase tracking-[0.2em]"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-secondary)',
        }}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { delay: 0.6, duration: 0.3, ease: 'easeOut' }
        }
      >
        XXVI Olympic Winter Games
      </motion.p>

    </div>
  );
}
