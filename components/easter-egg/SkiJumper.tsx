'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/lib/hooks/useKonamiCode';

/**
 * Ski Jumper Easter Egg
 *
 * Triggered by the Konami code sequence.
 * A ski jumper flies across the screen in an arc trajectory.
 *
 * Purely decorative and non-interactive.
 */

export function SkiJumper() {
  const [isFlying, setIsFlying] = useState(false);

  const triggerJump = useCallback(() => {
    if (isFlying) return; // Prevent multiple triggers
    setIsFlying(true);
  }, [isFlying]);

  useKonamiCode(triggerJump);

  const handleAnimationComplete = () => {
    setIsFlying(false);
  };

  return (
    <AnimatePresence>
      {isFlying && (
        <motion.div
          initial={{ x: '-10vw', y: '60vh', rotate: -30, opacity: 1 }}
          animate={{
            x: ['0vw', '50vw', '110vw'],
            y: ['60vh', '15vh', '40vh'],
            rotate: [-30, -15, 15],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.5,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.5, 1],
          }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed z-[9998] pointer-events-none select-none"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        >
          {/* Ski Jumper SVG */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Skis */}
            <rect
              x="8"
              y="52"
              width="48"
              height="4"
              rx="2"
              fill="var(--country-accent-primary)"
            />
            {/* Ski poles (behind body) */}
            <line
              x1="20"
              y1="38"
              x2="8"
              y2="50"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="44"
              y1="38"
              x2="56"
              y2="50"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Body */}
            <ellipse
              cx="32"
              cy="32"
              rx="10"
              ry="14"
              fill="var(--country-accent-primary)"
            />
            {/* Head */}
            <circle cx="32" cy="14" r="8" fill="var(--color-text-primary)" />
            {/* Helmet */}
            <path
              d="M24 12 C24 6, 40 6, 40 12 L40 14 L24 14 Z"
              fill="var(--country-accent-primary)"
            />
            {/* Goggles */}
            <rect
              x="26"
              y="11"
              width="12"
              height="4"
              rx="2"
              fill="var(--color-bg-secondary)"
              opacity="0.8"
            />
            {/* Arms stretched back */}
            <line
              x1="28"
              y1="26"
              x2="16"
              y2="36"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="36"
              y1="26"
              x2="48"
              y2="36"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Legs */}
            <line
              x1="28"
              y1="44"
              x2="20"
              y2="52"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="36"
              y1="44"
              x2="44"
              y2="52"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
