/**
 * Venues Page — Placeholder
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section V: Key Venues (lines 1228-1237)
 */

export default function VenuesPage() {
  return (
    <div className="container py-12">
      <h1
        className="font-semibold"
        style={{
          fontSize: 'var(--text-h1)',
          lineHeight: 'var(--leading-snug)',
        }}
      >
        Venues
      </h1>
      <p
        className="mt-4"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
        }}
      >
        From San Siro to the Dolomites. 15 world-class venues.
      </p>
    </div>
  );
}
