'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Button Component
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section I (Rauno's guidelines)
 * - Focus rings via box-shadow, not outline
 * - Hover states gated with @media (hover: hover)
 * - Touch targets >= 44px on mobile
 * - user-select: none on interactive elements
 *
 * 6 Variants:
 * - primary: Main CTAs, country accent background
 * - secondary: Secondary actions, subtle background
 * - ghost: Tertiary actions, transparent
 * - outline: Form actions, bordered
 * - destructive: Delete/remove actions, red
 * - link: Inline links, text-only
 *
 * 3 Sizes: sm, md, lg
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Loading spinner component
 */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Base styles
    const baseStyles = cn(
      // Layout
      'inline-flex items-center justify-center gap-2',
      // Typography
      'font-medium whitespace-nowrap',
      // Interaction
      'select-none',
      'transition-interactive',
      // Focus ring via box-shadow (Rauno's rule)
      'focus-visible:outline-none',
      // Disabled state
      'disabled:pointer-events-none disabled:opacity-50'
    );

    // Variant styles
    const variantStyles = {
      primary: cn(
        'text-white',
        'bg-[var(--country-accent-primary)]',
        // Hover gated behind capability query
        '@media(hover:hover):hover:brightness-110',
        // Active
        'active:brightness-95',
        // Focus ring
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--country-accent-primary)]'
      ),
      secondary: cn(
        'text-[var(--color-text-primary)]',
        'bg-[var(--color-bg-secondary)]',
        '@media(hover:hover):hover:bg-[var(--color-bg-elevated)]',
        'active:bg-[var(--color-bg-secondary)]',
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--color-focus-ring)]'
      ),
      ghost: cn(
        'text-[var(--color-text-secondary)]',
        'bg-transparent',
        '@media(hover:hover):hover:bg-[var(--color-surface-hover)]',
        '@media(hover:hover):hover:text-[var(--color-text-primary)]',
        'active:bg-[var(--color-surface-active)]',
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--color-focus-ring)]'
      ),
      outline: cn(
        'text-[var(--color-text-primary)]',
        'bg-transparent',
        'border border-[var(--color-border-strong)]',
        '@media(hover:hover):hover:bg-[var(--color-surface-hover)]',
        '@media(hover:hover):hover:border-[var(--country-accent-primary)]',
        'active:bg-[var(--color-surface-active)]',
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--color-focus-ring)]'
      ),
      destructive: cn(
        'text-white',
        'bg-red-500',
        '@media(hover:hover):hover:bg-red-600',
        'active:bg-red-700',
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_#EF4444]'
      ),
      link: cn(
        'text-[var(--country-accent-primary)]',
        'bg-transparent',
        'underline-offset-2',
        '@media(hover:hover):hover:underline',
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--color-focus-ring)]'
      ),
    };

    // Size styles
    const sizeStyles = {
      sm: cn(
        'h-8 px-3 rounded-md',
        'text-[var(--text-small)]',
        // Spinner size
        '[&_svg.animate-spin]:h-3 [&_svg.animate-spin]:w-3'
      ),
      md: cn(
        'h-10 px-4 rounded-lg',
        'text-[var(--text-body)]',
        '[&_svg.animate-spin]:h-4 [&_svg.animate-spin]:w-4'
      ),
      lg: cn(
        'h-12 px-6 rounded-lg',
        'text-[var(--text-body)]',
        '[&_svg.animate-spin]:h-5 [&_svg.animate-spin]:w-5'
      ),
    };

    // Link variant has no padding/height
    const linkOverrides = variant === 'link' ? 'h-auto px-0 py-0' : '';

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          linkOverrides,
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner replaces left icon */}
        {loading ? (
          <Spinner />
        ) : leftIcon ? (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}

        {children}

        {/* Right icon */}
        {rightIcon && !loading && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
