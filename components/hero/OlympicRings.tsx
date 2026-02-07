'use client';

/**
 * Olympic Rings
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 1
 * - Five interlocking rings, classic Olympic colors
 * - SVG with stroke (outline rings, not filled)
 * - Draw animation on load using stroke-dasharray/dashoffset
 * - Purely decorative — aria-hidden
 */

import { motion } from 'framer-motion';

// Official Olympic ring colors
const RING_COLORS = {
  blue: '#0085C7',
  yellow: '#F4C300',
  black: 'currentColor', // Adapts to theme
  green: '#009F3D',
  red: '#DF0024',
};

// Ring positions (top row: blue, black, red; bottom row: yellow, green)
// Classic interlocking pattern
const RINGS = [
  { id: 'blue', cx: 22, cy: 22, color: RING_COLORS.blue, delay: 0 },
  { id: 'yellow', cx: 33, cy: 33, color: RING_COLORS.yellow, delay: 0.08 },
  { id: 'black', cx: 44, cy: 22, color: RING_COLORS.black, delay: 0.16 },
  { id: 'green', cx: 55, cy: 33, color: RING_COLORS.green, delay: 0.24 },
  { id: 'red', cx: 66, cy: 22, color: RING_COLORS.red, delay: 0.32 },
];

const RING_RADIUS = 10;
const STROKE_WIDTH = 2;

// Circumference for stroke animation
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function OlympicRings() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mb-6"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 88 55"
        width="110"
        height="70"
        className="mx-auto"
        role="img"
        aria-label="Olympic Rings"
      >
        {/* Render rings in proper interlocking order */}
        {/* Bottom row first (so they appear behind) */}
        {RINGS.filter((r) => r.id === 'yellow' || r.id === 'green').map((ring) => (
          <motion.circle
            key={ring.id}
            cx={ring.cx}
            cy={ring.cy}
            r={RING_RADIUS}
            fill="none"
            stroke={ring.color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            initial={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: CIRCUMFERENCE,
            }}
            animate={{
              strokeDashoffset: 0,
            }}
            transition={{
              delay: 0.3 + ring.delay,
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Top row (renders on top) */}
        {RINGS.filter(
          (r) => r.id === 'blue' || r.id === 'black' || r.id === 'red'
        ).map((ring) => (
          <motion.circle
            key={ring.id}
            cx={ring.cx}
            cy={ring.cy}
            r={RING_RADIUS}
            fill="none"
            stroke={ring.color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            initial={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: CIRCUMFERENCE,
            }}
            animate={{
              strokeDashoffset: 0,
            }}
            transition={{
              delay: 0.3 + ring.delay,
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
