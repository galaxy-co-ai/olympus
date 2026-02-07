'use client';

import { PageTransition } from '@/components/ui';

/**
 * Template Component
 *
 * This file wraps each route with a page transition animation.
 * Unlike layout.tsx, template.tsx re-renders on every route change,
 * which triggers the Framer Motion animation.
 *
 * Reference: Next.js App Router - Templates
 */

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
