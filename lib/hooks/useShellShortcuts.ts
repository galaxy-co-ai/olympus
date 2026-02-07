'use client';

/**
 * Shell Keyboard Shortcuts
 *
 * Global shortcuts for workspace shell controls:
 * - ⌘B / Ctrl+B: Toggle sidebar
 * - ⌘\ / Ctrl+\: Toggle drawer
 */

import { useEffect } from 'react';
import { useShellStore } from '@/lib/stores/shell-store';

export function useShellShortcuts() {
  const toggleSidebar = useShellStore((s) => s.toggleSidebar);
  const toggleDrawer = useShellStore((s) => s.toggleDrawer);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      // ⌘B / Ctrl+B: Toggle sidebar
      if (mod && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // ⌘\ / Ctrl+\: Toggle drawer
      if (mod && e.key === '\\') {
        e.preventDefault();
        toggleDrawer();
        return;
      }

      // ⌘. / Ctrl+.: Also toggle drawer (alternative)
      if (mod && e.key === '.') {
        e.preventDefault();
        toggleDrawer();
        return;
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [toggleSidebar, toggleDrawer]);
}
