'use client';

/**
 * Hero Section — Main Orchestrator
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - Full-viewport immersive moment on first load
 * - Layers: gradient → mountains → snow → content
 * - Single scroll handler drives all effects
 * - Scroll-triggered dissolve into content below
 *
 * The hero must make someone feel the Olympics in 3 seconds.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MountainBackground } from './MountainBackground';
import { SnowParticles } from './SnowParticles';
import { OlympicRings } from './OlympicRings';
import { HeroTypography } from './HeroTypography';
import { GamesIndicator } from './GamesIndicator';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
  }, []);

  // Master scroll handler — drives all dissolve effects
  const handleScroll = useCallback(() => {
    if (rafId.current !== null) return;
    if (reducedMotion) return;

    rafId.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      const progress = Math.min(y / heroHeight, 1);

      // Fade out hero content (30% → 80%)
      if (contentRef.current) {
        const fadeStart = 0.3;
        const fadeEnd = 0.8;
        const opacity =
          progress < fadeStart
            ? 1
            : progress > fadeEnd
              ? 0
              : 1 - (progress - fadeStart) / (fadeEnd - fadeStart);
        contentRef.current.style.opacity = String(opacity);
      }

      // Fade out chevron faster
      if (chevronRef.current) {
        chevronRef.current.style.opacity = String(Math.max(0, 1 - progress * 3));
      }

      rafId.current = null;
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, reducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ marginTop: '-96px' }} // Offset nav padding so hero is truly full-viewport
    >
      {/* Layer 0: Base gradient (atmospheric sky) */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
        }}
      />

      {/* Layer 1: Mountain silhouettes with parallax */}
      <MountainBackground />

      {/* Layer 2: Snow particles */}
      <SnowParticles />

      {/* Layer 3: Content (foreground) */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 text-center"
      >
        <OlympicRings />
        <HeroTypography />
        <GamesIndicator />
      </div>

      {/* Scroll chevron */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{
          opacity: 0.4,
          animation: 'chevron-bounce 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <ChevronDown
          size={24}
          style={{ color: 'var(--color-text-muted)' }}
        />
      </div>

      {/* Chevron bounce animation */}
      <style jsx>{`
        @keyframes chevron-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </section>
  );
}
