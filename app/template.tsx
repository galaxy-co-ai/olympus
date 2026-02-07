/**
 * Template Component
 *
 * In the new workspace shell architecture, route transitions
 * are handled by CenterStage with AnimatePresence.
 *
 * This template now passes children through directly.
 * The animation happens in the shell's CenterStage component.
 *
 * Reference: Next.js App Router - Templates
 */

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
