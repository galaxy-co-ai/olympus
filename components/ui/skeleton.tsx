import { cn } from '@/lib/utils';

/**
 * Skeleton Loading Primitive
 *
 * Uses the shimmer animation defined in globals.css.
 * Reference: OLYMPUS_CONSTITUTION.md Section I (loading states)
 *
 * The animation is automatically disabled when the user
 * prefers reduced motion via the CSS media query in globals.css.
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton. Can be CSS value or number (px). */
  width?: string | number;
  /** Height of the skeleton. Can be CSS value or number (px). */
  height?: string | number;
  /** Border radius preset */
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  /** Whether to animate. Defaults to true. */
  animate?: boolean;
}

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

function Skeleton({
  className,
  width,
  height,
  rounded = 'md',
  animate = true,
  style,
  ...props
}: SkeletonProps) {
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        // Use skeleton class from globals.css for shimmer
        animate && 'skeleton',
        // Fallback background for no-animation case
        !animate && 'bg-[var(--color-bg-secondary)]',
        // Border radius
        roundedMap[rounded],
        className
      )}
      style={{
        width: widthValue,
        height: heightValue,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Common skeleton presets for rapid prototyping
 */

function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? '75%' : '100%'}
          rounded="sm"
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="full"
      className={className}
    />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        'border-[var(--color-border)]',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton height={14} width="60%" rounded="sm" />
          <Skeleton height={12} width="40%" rounded="sm" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard };
export type { SkeletonProps };
