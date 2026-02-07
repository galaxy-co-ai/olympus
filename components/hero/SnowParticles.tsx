'use client';

/**
 * Snow Particles
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - Lightweight CSS-only falling snow
 * - 35 particles on desktop, 15 on mobile
 * - Pauses when hero exits viewport (IntersectionObserver)
 * - Respects prefers-reduced-motion
 *
 * No canvas, no libraries — pure CSS keyframes on the GPU.
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Static particle definitions (SSR-safe, no Math.random at render)
 * Pre-generated values to avoid hydration mismatch
 */
const PARTICLES = [
  { id: 0, size: 3.2, left: 5, opacity: 0.35, duration: 12, delay: 0, drift: 15 },
  { id: 1, size: 2.1, left: 12, opacity: 0.28, duration: 14, delay: 3, drift: -18 },
  { id: 2, size: 4.5, left: 18, opacity: 0.42, duration: 9, delay: 7, drift: 8 },
  { id: 3, size: 2.8, left: 25, opacity: 0.32, duration: 11, delay: 1, drift: -12 },
  { id: 4, size: 3.6, left: 31, opacity: 0.38, duration: 13, delay: 5, drift: 20 },
  { id: 5, size: 2.4, left: 38, opacity: 0.25, duration: 15, delay: 9, drift: -8 },
  { id: 6, size: 4.1, left: 44, opacity: 0.45, duration: 10, delay: 2, drift: 14 },
  { id: 7, size: 2.9, left: 51, opacity: 0.30, duration: 12, delay: 6, drift: -16 },
  { id: 8, size: 3.4, left: 57, opacity: 0.36, duration: 14, delay: 4, drift: 10 },
  { id: 9, size: 2.2, left: 63, opacity: 0.22, duration: 11, delay: 8, drift: -20 },
  { id: 10, size: 4.8, left: 69, opacity: 0.48, duration: 8, delay: 0, drift: 18 },
  { id: 11, size: 2.6, left: 75, opacity: 0.29, duration: 13, delay: 3, drift: -10 },
  { id: 12, size: 3.8, left: 81, opacity: 0.40, duration: 10, delay: 7, drift: 12 },
  { id: 13, size: 2.3, left: 87, opacity: 0.26, duration: 15, delay: 1, drift: -14 },
  { id: 14, size: 3.1, left: 93, opacity: 0.34, duration: 12, delay: 5, drift: 16 },
  // Additional particles for desktop (15-34)
  { id: 15, size: 2.7, left: 8, opacity: 0.31, duration: 11, delay: 2, drift: -6 },
  { id: 16, size: 3.9, left: 15, opacity: 0.43, duration: 9, delay: 6, drift: 22 },
  { id: 17, size: 2.0, left: 22, opacity: 0.24, duration: 14, delay: 0, drift: -15 },
  { id: 18, size: 4.3, left: 29, opacity: 0.46, duration: 8, delay: 4, drift: 11 },
  { id: 19, size: 2.5, left: 36, opacity: 0.27, duration: 13, delay: 8, drift: -19 },
  { id: 20, size: 3.3, left: 43, opacity: 0.37, duration: 11, delay: 1, drift: 7 },
  { id: 21, size: 4.0, left: 50, opacity: 0.44, duration: 10, delay: 5, drift: -13 },
  { id: 22, size: 2.2, left: 56, opacity: 0.23, duration: 15, delay: 9, drift: 17 },
  { id: 23, size: 3.5, left: 62, opacity: 0.39, duration: 12, delay: 3, drift: -9 },
  { id: 24, size: 2.8, left: 68, opacity: 0.33, duration: 14, delay: 7, drift: 13 },
  { id: 25, size: 4.6, left: 74, opacity: 0.47, duration: 9, delay: 0, drift: -17 },
  { id: 26, size: 2.1, left: 80, opacity: 0.21, duration: 13, delay: 4, drift: 19 },
  { id: 27, size: 3.7, left: 86, opacity: 0.41, duration: 11, delay: 8, drift: -11 },
  { id: 28, size: 2.4, left: 92, opacity: 0.28, duration: 10, delay: 2, drift: 5 },
  { id: 29, size: 3.0, left: 3, opacity: 0.35, duration: 14, delay: 6, drift: -21 },
  { id: 30, size: 4.2, left: 10, opacity: 0.45, duration: 8, delay: 1, drift: 9 },
  { id: 31, size: 2.6, left: 47, opacity: 0.30, duration: 12, delay: 5, drift: -7 },
  { id: 32, size: 3.4, left: 54, opacity: 0.38, duration: 13, delay: 9, drift: 15 },
  { id: 33, size: 2.3, left: 78, opacity: 0.25, duration: 11, delay: 3, drift: -18 },
  { id: 34, size: 4.0, left: 96, opacity: 0.42, duration: 10, delay: 7, drift: 12 },
];

// Mobile uses first 15 particles only
const MOBILE_PARTICLE_COUNT = 15;

export function SnowParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setShouldRender(false);
      return;
    }

    // Check mobile
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', handleMobileChange);

    // Pause when not in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  if (!shouldRender) return null;

  const particlesToRender = isMobile
    ? PARTICLES.slice(0, MOBILE_PARTICLE_COUNT)
    : PARTICLES;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {particlesToRender.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: isMobile ? Math.min(p.size, 3) : p.size,
            height: isMobile ? Math.min(p.size, 3) : p.size,
            left: `${p.left}%`,
            top: '-10px',
            opacity: isMobile ? p.opacity * 0.6 : p.opacity,
            willChange: 'transform',
            animationName: 'snowfall',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            // Drift via CSS custom property
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}

      {/* Keyframes injected via style tag */}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          25% {
            transform: translateY(25vh) translateX(var(--drift, 0px));
          }
          50% {
            transform: translateY(55vh) translateX(0);
          }
          75% {
            transform: translateY(80vh) translateX(calc(var(--drift, 0px) * -0.5));
          }
          100% {
            transform: translateY(110vh) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
