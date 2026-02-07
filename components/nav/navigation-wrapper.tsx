'use client';

/**
 * Navigation Wrapper
 *
 * Manages the command palette state and wires up:
 * - Desktop nav search trigger
 * - Mobile nav search tab
 * - Global ⌘K / Ctrl+K shortcut
 * - Command palette rendering
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 + Section 8
 */

import { useState, useCallback } from 'react';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';
import { CommandPalette } from '@/components/search';
import { useCommandK } from '@/lib/hooks/useCommandK';

export function NavigationWrapper() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  // Global ⌘K / Ctrl+K listener
  useCommandK(openSearch);

  return (
    <>
      <DesktopNav onSearchClick={openSearch} />
      <MobileNav onSearchClick={openSearch} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
