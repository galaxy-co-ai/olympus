'use client';

/**
 * Theme Provider for Olympus
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 3: Country Vibe System (lines 525-536)
 * - Section 9: Dark / Light Mode (lines 948-965)
 *
 * CRITICAL per Rauno's Rule (Section 3 line 527):
 * Theme switching NEVER triggers transitions on elements.
 * We achieve this by:
 * 1. Using next-themes with disableTransitionOnChange
 * 2. Applying theme via data-theme attribute (not class)
 * 3. CSS handles all color swaps instantly
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // Rauno's Rule: no transitions on theme switch
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
