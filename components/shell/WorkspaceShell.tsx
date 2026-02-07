'use client';

/**
 * WorkspaceShell — Main layout container
 *
 * CSS Grid with 4 zones:
 * - TopBar (56px)
 * - Sidebar (240px / 64px collapsed)
 * - CenterStage (flexible)
 * - RightDrawer (360px / 0 closed)
 *
 * Responsive behavior:
 * - Desktop (>1024px): Full grid with sidebar and drawer
 * - Tablet (768-1024px): Sidebar visible, drawer overlays
 * - Mobile (<768px): Mobile topbar, sidebar overlay, drawer bottom sheet
 *
 * Shell never unmounts; content swaps in CenterStage
 *
 * Reference: Linear/Arc style workspace shell
 */

import { useState, useCallback } from 'react';
import { useShellStore } from '@/lib/stores/shell-store';
import { useCommandK } from '@/lib/hooks/useCommandK';
import { useShellShortcuts } from '@/lib/hooks/useShellShortcuts';
import { CommandPalette } from '@/components/search';
import { TopBar } from './TopBar';
import { MobileTopBar } from './MobileTopBar';
import { Sidebar } from './Sidebar';
import { MobileSidebarOverlay } from './MobileSidebarOverlay';
import { CenterStage } from './CenterStage';
import { RightDrawer } from './RightDrawer';
import { MobileBottomSheet } from './MobileBottomSheet';

interface WorkspaceShellProps {
  children: React.ReactNode;
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const sidebarCollapsed = useShellStore((s) => s.sidebarCollapsed);
  const drawerOpen = useShellStore((s) => s.drawerOpen);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Global ⌘K / Ctrl+K listener
  useCommandK(openSearch);

  // Shell keyboard shortcuts (⌘B sidebar, ⌘\ drawer)
  useShellShortcuts();

  // Calculate grid template columns
  const sidebarWidth = sidebarCollapsed ? '64px' : '240px';
  const drawerWidth = drawerOpen ? '360px' : '0px';

  return (
    <>
      {/* Mobile layout (<768px) */}
      <div
        className="flex flex-col h-screen w-screen overflow-hidden md:hidden"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <MobileTopBar
          onMenuClick={() => setMobileMenuOpen(true)}
          onSearchClick={openSearch}
        />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden p-4"
          role="main"
        >
          {children}
        </main>
      </div>

      {/* Desktop/Tablet layout (>=768px) */}
      <div
        className="h-screen w-screen overflow-hidden hidden md:grid"
        style={{
          gridTemplateAreas: `
            "topbar topbar topbar"
            "sidebar stage drawer"
          `,
          gridTemplateRows: '56px 1fr',
          gridTemplateColumns: `${sidebarWidth} 1fr ${drawerWidth}`,
          transition: 'grid-template-columns 200ms ease-out',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <TopBar onSearchFocus={openSearch} />
        <Sidebar />
        <CenterStage>{children}</CenterStage>
        <RightDrawer />
      </div>

      {/* Mobile sidebar overlay */}
      <MobileSidebarOverlay open={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* Mobile bottom sheet */}
      <MobileBottomSheet />

      {/* Command Palette — outside shell grid, overlays everything */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
