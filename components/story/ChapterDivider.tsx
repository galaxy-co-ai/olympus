/**
 * ChapterDivider — Visual separator between story chapters
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * Simple, restrained visual breathing room.
 * Uses thin centered line — matches Olympus philosophy of restraint.
 */

export function ChapterDivider() {
  return (
    <div
      className="w-16 h-px mx-auto my-16 sm:my-24"
      style={{ backgroundColor: 'var(--color-border)' }}
      role="separator"
      aria-hidden="true"
    />
  );
}
