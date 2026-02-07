/**
 * Medal Tracker Page — Placeholder
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 5: Data Visualization & Medal Tracker (lines 833-874)
 */

export default function MedalsPage() {
  return (
    <div className="container py-12">
      <h1
        className="font-semibold"
        style={{
          fontSize: 'var(--text-h1)',
          lineHeight: 'var(--leading-snug)',
        }}
      >
        Medal Tracker
      </h1>
      <p
        className="mt-4"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
        }}
      >
        116 medal events. Every count matters.
      </p>

      {/* Medal color preview */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: 'var(--color-gold)' }}
          />
          <span className="tabular-nums" style={{ fontSize: 'var(--text-data)' }}>
            0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: 'var(--color-silver)' }}
          />
          <span className="tabular-nums" style={{ fontSize: 'var(--text-data)' }}>
            0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: 'var(--color-bronze)' }}
          />
          <span className="tabular-nums" style={{ fontSize: 'var(--text-data)' }}>
            0
          </span>
        </div>
      </div>
    </div>
  );
}
