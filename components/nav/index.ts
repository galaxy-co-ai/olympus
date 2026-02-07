/**
 * Navigation Components
 *
 * Four-layer navigation system per OLYMPUS_CONSTITUTION.md Section 2:
 * - Layer 1: DesktopNav — floating glass bar (768px+)
 * - Layer 2: MobileNav — bottom tab bar (<768px)
 * - Layer 3: Command palette (cmdk) — future
 * - Layer 4: Contextual menus — future
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 2 (lines 123-271)
 */

export { DesktopNav } from './desktop-nav';
export { MobileNav } from './mobile-nav';
export { NavLink, useIsActive } from './nav-link';
export { useScrollDirection } from './use-scroll-direction';
