/**
 * Shell Store — Zustand state for workspace shell
 *
 * Manages:
 * - Sidebar collapsed state
 * - Right drawer open/tab state
 * - Search state
 *
 * Persists sidebarCollapsed and drawerTab to localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DrawerTab = 'schedule' | 'medals';

interface ShellState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Drawer
  drawerOpen: boolean;
  drawerTab: DrawerTab;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  setDrawerTab: (tab: DrawerTab) => void;

  // Search
  searchQuery: string;
  searchFocused: boolean;
  setSearchQuery: (query: string) => void;
  setSearchFocused: (focused: boolean) => void;
  clearSearch: () => void;
}

export const useShellStore = create<ShellState>()(
  persist(
    (set) => ({
      // Sidebar defaults
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Drawer defaults
      drawerOpen: true,
      drawerTab: 'schedule',
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      setDrawerOpen: (open) => set({ drawerOpen: open }),
      setDrawerTab: (tab) => set({ drawerTab: tab }),

      // Search defaults
      searchQuery: '',
      searchFocused: false,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchFocused: (focused) => set({ searchFocused: focused }),
      clearSearch: () => set({ searchQuery: '', searchFocused: false }),
    }),
    {
      name: 'olympus-shell',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        drawerTab: state.drawerTab,
      }),
    }
  )
);
