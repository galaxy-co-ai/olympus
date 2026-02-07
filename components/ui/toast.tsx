'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Toast Component
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section I
 * - Accessible: role="alert", aria-live="polite"
 * - Respects prefers-reduced-motion via Framer Motion
 * - Auto-dismiss with configurable duration
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}

const icons: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconColors: Record<ToastType, string> = {
  success: 'var(--color-success)',
  error: 'var(--color-live)',
  warning: 'var(--color-warning)',
  info: 'var(--country-accent-primary)',
};

export function Toast({ id, title, description, type, onDismiss }: ToastProps) {
  const Icon = icons[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      role="alert"
      aria-live="polite"
      className={cn(
        'pointer-events-auto',
        'flex items-start gap-3 w-full max-w-sm p-4',
        'rounded-lg border shadow-lg',
        'bg-[var(--color-bg-elevated)]',
        'border-[var(--color-border)]'
      )}
      style={{
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Icon */}
      <Icon
        size={20}
        className="shrink-0 mt-0.5"
        style={{ color: iconColors[type] }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="font-medium"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </p>
        {description && (
          <p
            className="mt-1"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(id)}
        className={cn(
          'shrink-0 p-1 rounded-md -m-1',
          'text-[var(--color-text-muted)]',
          'transition-colors duration-150',
          '@media(hover:hover):hover:bg-[var(--color-surface-hover)]',
          '@media(hover:hover):hover:text-[var(--color-text-primary)]',
          'focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]'
        )}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

/**
 * Toast Container
 *
 * Renders toasts in a portal at bottom-right (desktop) or bottom-center (mobile).
 */
interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      className={cn(
        'fixed z-[9999]',
        // Mobile: bottom center
        'bottom-24 left-4 right-4',
        // Desktop: bottom right
        'md:bottom-6 md:left-auto md:right-6 md:w-auto'
      )}
      style={{ pointerEvents: 'none' }}
    >
      <div className="flex flex-col gap-2 items-center md:items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
