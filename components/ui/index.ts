/**
 * UI Primitives Index
 *
 * Re-exports all UI components for clean imports.
 * Usage: import { Button, Skeleton } from '@/components/ui';
 */

export { Button } from './button';
export type { ButtonProps } from './button';

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from './skeleton';
export type { SkeletonProps } from './skeleton';

export { Toast, ToastContainer } from './toast';
export type { ToastData, ToastType } from './toast';

export { ToastProvider, useToast } from './toast-provider';

export { PageTransition } from './page-transition';

export { Select } from './select';
