/**
 * Olympus Home Page — Foundation Scaffold
 *
 * This is a placeholder that demonstrates the design system is working.
 * It shows:
 * - Olympus typography scale
 * - Semantic color tokens
 * - Country accent system
 * - Dark/light mode
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 1: Hero / Landing Experience (lines 99-118)
 */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Hero typography showcase */}
      <div className="max-w-4xl text-center">
        {/* Display heading using fluid type scale */}
        <h1
          className="font-semibold tracking-tight"
          style={{
            fontSize: 'var(--text-hero)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          <span className="text-[var(--color-text-primary)]">Olympus</span>
        </h1>

        {/* Subtitle with accent color */}
        <p
          className="mt-4"
          style={{
            fontSize: 'var(--text-h3)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Milan Cortina 2026 Winter Olympics
        </p>

        {/* Tagline with country accent */}
        <p
          className="mt-6"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-muted)',
          }}
        >
          February 6–22, 2026 · 16 Sports · 116 Medal Events
        </p>

        {/* Token showcase */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Color palette preview */}
          <div className="rounded-lg border border-[var(--color-border)] p-6 text-left">
            <h2
              className="font-medium"
              style={{ fontSize: 'var(--text-h3)' }}
            >
              Olympus Palette
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--olympus-glacier)' }}
                title="Glacier"
              />
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--olympus-dolomite)' }}
                title="Dolomite"
              />
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--olympus-alpine)' }}
                title="Alpine"
              />
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--olympus-peak)' }}
                title="Peak"
              />
              <div
                className="h-10 w-10 rounded-md border border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--olympus-white)' }}
                title="White"
              />
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--olympus-charcoal)' }}
                title="Charcoal"
              />
            </div>

            {/* Medal colors */}
            <h3
              className="mt-6 font-medium"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Medal Colors
            </h3>
            <div className="mt-2 flex gap-2">
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: 'var(--color-gold)' }}
                title="Gold"
              />
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: 'var(--color-silver)' }}
                title="Silver"
              />
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: 'var(--color-bronze)' }}
                title="Bronze"
              />
            </div>
          </div>

          {/* Country accent preview */}
          <div className="rounded-lg border border-[var(--color-border)] p-6 text-left">
            <h2
              className="font-medium"
              style={{ fontSize: 'var(--text-h3)' }}
            >
              Country Accent
            </h2>
            <p
              className="mt-2"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              Active accent follows selected country theme
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--country-accent-primary)' }}
                title="Accent Primary"
              />
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--country-accent-secondary)' }}
                title="Accent Secondary"
              />
              <div
                className="h-10 w-10 rounded-md"
                style={{ backgroundColor: 'var(--country-accent-muted)' }}
                title="Accent Muted"
              />
            </div>

            {/* Surface examples */}
            <div
              className="mt-4 rounded-md p-3"
              style={{ backgroundColor: 'var(--country-accent-surface)' }}
            >
              <span
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Surface tint (8% opacity)
              </span>
            </div>
          </div>
        </div>

        {/* Typography scale preview */}
        <div className="mt-12 rounded-lg border border-[var(--color-border)] p-6 text-left">
          <h2 className="font-medium" style={{ fontSize: 'var(--text-h3)' }}>
            Typography Scale
          </h2>
          <div className="mt-6 space-y-4">
            <p style={{ fontSize: 'var(--text-hero)', lineHeight: 'var(--leading-tight)' }}>
              Hero
            </p>
            <p style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-snug)' }}>
              Heading 1
            </p>
            <p style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-snug)' }}>
              Heading 2
            </p>
            <p style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-snug)' }}>
              Heading 3
            </p>
            <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-normal)' }}>
              Body text — The app has its own design identity rooted in the Dolomites.
            </p>
            <p
              className="tabular-nums"
              style={{
                fontSize: 'var(--text-data)',
                lineHeight: 'var(--leading-data)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Data: 00:45.892 | Medal Count: 15
            </p>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              Caption — Updated 3 min ago
            </p>
          </div>
        </div>

        {/* Glass effect preview */}
        <div className="mt-12">
          <div className="glass rounded-full px-6 py-3 inline-flex items-center gap-4">
            <span
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Glass navigation preview — backdrop blur 16px
            </span>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span
            className="pulse-live inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: 'var(--color-live)' }}
          />
          <span
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-live)',
            }}
          >
            LIVE
          </span>
        </div>

        {/* Foundation status */}
        <p
          className="mt-16"
          style={{
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          Foundation scaffold complete. Design tokens active.
        </p>
      </div>
    </div>
  );
}
