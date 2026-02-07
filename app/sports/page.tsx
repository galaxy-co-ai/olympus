/**
 * Sports Grid Page — Placeholder
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 4: Sport Cards / Content Tiles (lines 601-830)
 */

export default function SportsPage() {
  return (
    <div className="container py-12">
      <h1
        className="font-semibold"
        style={{
          fontSize: 'var(--text-h1)',
          lineHeight: 'var(--leading-snug)',
        }}
      >
        Sports
      </h1>
      <p
        className="mt-4"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
        }}
      >
        16 Winter Olympic sports awaiting their grid layout.
      </p>
    </div>
  );
}
