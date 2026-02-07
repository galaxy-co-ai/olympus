'use client';

/**
 * Hero Section — Main Orchestrator
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - Full-viewport immersive moment on first load
 * - Layers: gradient → mountains → snow → content
 * - Single scroll handler drives all effects
 * - Scroll-triggered dissolve into content below
 * - HeroToolbar replaces GamesIndicator for tabbed navigation
 *
 * The hero must make someone feel the Olympics in 3 seconds.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { MountainBackground } from './MountainBackground';
import { SnowParticles } from './SnowParticles';
import { OlympicRings } from './OlympicRings';
import { HeroTypography } from './HeroTypography';
import { HeroToolbar, type HeroTab } from '@/components/home';

interface HeroSectionProps {
  activeTab?: HeroTab;
  onTabChange?: (tab: HeroTab) => void;
}

/**
 * Format time in Italy timezone (Europe/Rome)
 */
function getItalyTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'Europe/Rome',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function HeroSection({ activeTab = 'live', onTabChange }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [italyTime, setItalyTime] = useState<string>('');

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Initialize and update Italy time
    setItalyTime(getItalyTime());
    const interval = setInterval(() => {
      setItalyTime(getItalyTime());
    }, 1000);

    return () => clearInterval(interval);
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

  // Handle tab changes - pass to parent if provided
  const handleTabChange = (tab: HeroTab) => {
    onTabChange?.(tab);
  };

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

      {/* Layer 3: Content (foreground) — shifted upward */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center"
        style={{ marginTop: '-80px' }}
      >
        <OlympicRings />
        <HeroTypography />
      </div>

      {/* Layer 4: Corner info */}
      {/* Bottom left: Date range */}
      <div
        className="absolute bottom-6 left-6 z-10 uppercase tracking-[0.15em]"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
        }}
      >
        February 6–22
      </div>

      {/* Bottom right: Italy + live time */}
      <div
        className="absolute bottom-6 right-6 z-10 flex items-center gap-2 uppercase tracking-[0.1em] tabular-nums"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
        }}
      >
        <span>Italy</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>{italyTime}</span>
      </div>

      {/* Layer 5: Toolbar (docked at bottom edge) */}
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <HeroToolbar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </section>
  );
}
