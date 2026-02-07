/**
 * Olympic Rings — Footer Version
 *
 * Static (non-animated) rings for the footer.
 * Purely decorative.
 */

// Official Olympic ring colors
const RING_COLORS = {
  blue: '#0085C7',
  yellow: '#F4C300',
  black: 'currentColor',
  green: '#009F3D',
  red: '#DF0024',
};

const RINGS = [
  { id: 'blue', cx: 22, cy: 22, color: RING_COLORS.blue },
  { id: 'yellow', cx: 33, cy: 33, color: RING_COLORS.yellow },
  { id: 'black', cx: 44, cy: 22, color: RING_COLORS.black },
  { id: 'green', cx: 55, cy: 33, color: RING_COLORS.green },
  { id: 'red', cx: 66, cy: 22, color: RING_COLORS.red },
];

const RING_RADIUS = 10;
const STROKE_WIDTH = 2;

interface OlympicRingsFooterProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function OlympicRingsFooter({
  className,
  size = 'sm',
}: OlympicRingsFooterProps) {
  const dimensions = size === 'sm' ? { width: 66, height: 42 } : { width: 88, height: 55 };

  return (
    <svg
      viewBox="0 0 88 55"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      aria-hidden="true"
      data-decorative="true"
    >
      {/* Bottom row first (renders behind) */}
      {RINGS.filter((r) => r.id === 'yellow' || r.id === 'green').map(
        (ring) => (
          <circle
            key={ring.id}
            cx={ring.cx}
            cy={ring.cy}
            r={RING_RADIUS}
            fill="none"
            stroke={ring.color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        )
      )}

      {/* Top row (renders on top) */}
      {RINGS.filter(
        (r) => r.id === 'blue' || r.id === 'black' || r.id === 'red'
      ).map((ring) => (
        <circle
          key={ring.id}
          cx={ring.cx}
          cy={ring.cy}
          r={RING_RADIUS}
          fill="none"
          stroke={ring.color}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
