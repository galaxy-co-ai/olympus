'use client';

/**
 * Mountain Background
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - Three-layer Dolomite mountain silhouette scene
 * - SVG paths, no external assets — loads instantly
 * - Parallax at 0.1x / 0.3x / 0.5x scroll speed
 * - Disabled on mobile and reduced-motion
 *
 * Inspired by: Tre Cime di Lavaredo, Tofane, Marmolada silhouettes
 */

import { useEffect, useRef, useCallback } from 'react';

/**
 * Check if we should enable parallax
 * - Desktop only (>= 768px)
 * - No reduced motion preference
 */
function useCanParallax(): boolean {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  return mediaQuery.matches && !reducedMotion.matches;
}

/**
 * Dolomite Layer 1 — Distant peaks (Tre Cime style)
 * Jagged limestone towers, iconic needle spires
 */
function DistantPeaks() {
  return (
    <svg
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 h-[40vh] w-full"
      aria-hidden="true"
    >
      <path
        d="M0,400 L0,280
           L80,260 L120,290 L160,240 L200,270
           L260,180 L280,200 L320,120 L340,140 L360,80 L380,100 L400,60 L420,90 L440,50 L460,80 L480,120
           L520,150 L560,130 L600,160 L640,140 L680,170
           L720,100 L740,130 L760,70 L780,100 L800,40 L820,80 L840,60 L860,100 L880,80 L900,130
           L940,160 L980,140 L1020,180 L1060,150 L1100,190
           L1140,130 L1160,160 L1180,100 L1200,140 L1220,80 L1240,120 L1260,90 L1280,140 L1300,120 L1320,180
           L1360,220 L1400,200 L1440,240 L1440,400 Z"
        className="fill-[var(--olympus-slate)] opacity-30 dark:fill-[var(--olympus-stone)] dark:opacity-15"
      />
    </svg>
  );
}

/**
 * Dolomite Layer 2 — Mid-range mountains
 * Rounder alpine foothills, forested slopes
 */
function MidRangeMountains() {
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 h-[30vh] w-full"
      aria-hidden="true"
    >
      <path
        d="M0,300 L0,220
           L60,210 L120,180 L180,195 L240,160 L300,185 L360,150 L420,175 L480,140
           L540,165 L600,130 L660,155 L720,120 L780,150 L840,110 L900,145
           L960,115 L1020,150 L1080,125 L1140,160 L1200,130 L1260,165 L1320,140 L1380,175 L1440,150
           L1440,300 Z"
        className="fill-[var(--olympus-slate)] opacity-50 dark:fill-[var(--olympus-stone)] dark:opacity-25"
      />
    </svg>
  );
}

/**
 * Dolomite Layer 3 — Foreground ridge
 * Close slope — "you're standing here" feeling
 */
function ForegroundRidge() {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 h-[15vh] w-full"
      aria-hidden="true"
    >
      <path
        d="M0,200 L0,160
           L120,150 L240,140 L360,145 L480,130 L600,140 L720,125 L840,135 L960,120 L1080,130 L1200,115 L1320,125 L1440,110
           L1440,200 Z"
        className="fill-[var(--olympus-charcoal)] opacity-20 dark:fill-[var(--olympus-dusk)] dark:opacity-40"
      />
    </svg>
  );
}

export function MountainBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const canParallaxRef = useRef(false);

  // Check parallax capability on mount
  useEffect(() => {
    canParallaxRef.current = useCanParallax();
  }, []);

  const handleScroll = useCallback(() => {
    if (rafId.current !== null) return;
    if (!canParallaxRef.current) return;

    rafId.current = requestAnimationFrame(() => {
      const y = window.scrollY;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${y * 0.1}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${y * 0.3}px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${y * 0.5}px)`;
      }

      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    // Check capabilities
    canParallaxRef.current = useCanParallax();

    if (!canParallaxRef.current) return;

    // Add will-change during scroll
    [layer1Ref, layer2Ref, layer3Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.style.willChange = 'transform';
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      // Clean up will-change
      [layer1Ref, layer2Ref, layer3Ref].forEach((ref) => {
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      });
    };
  }, [handleScroll]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Atmospheric gradient — Enrosadira effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at 50% 80%,
            rgba(212, 165, 116, 0.15) 0%,
            rgba(123, 167, 194, 0.08) 40%,
            transparent 70%
          )`,
        }}
      />
      {/* Dark mode gradient override */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(
            ellipse at 50% 80%,
            rgba(222, 180, 133, 0.1) 0%,
            rgba(143, 189, 212, 0.05) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* Layer 1 — Distant peaks (slowest parallax) */}
      <div ref={layer1Ref} className="absolute inset-0">
        <DistantPeaks />
      </div>

      {/* Layer 2 — Mid-range mountains */}
      <div ref={layer2Ref} className="absolute inset-0">
        <MidRangeMountains />
      </div>

      {/* Layer 3 — Foreground ridge (fastest parallax) */}
      <div ref={layer3Ref} className="absolute inset-0">
        <ForegroundRidge />
      </div>
    </div>
  );
}
