/**
 * Sport Detail Page
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 4 (lines 601-830)
 *
 * Dynamic route for individual sport details.
 * Pre-rendered at build time via generateStaticParams.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Calendar, MapPin, Trophy } from 'lucide-react';
import { SPORTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils';
import type { LiveSport } from '@/lib/types/olympics';
import type { Metadata } from 'next';

interface SportPageProps {
  params: Promise<{ sport: string }>;
}

/**
 * Generate static params for all sports
 */
export function generateStaticParams() {
  return SPORTS.map((sport) => ({ sport: sport.id }));
}

/**
 * Generate metadata for each sport page
 */
export async function generateMetadata({
  params,
}: SportPageProps): Promise<Metadata> {
  const { sport: sportId } = await params;
  const sport = SPORTS.find((s) => s.id === sportId);

  if (!sport) {
    return { title: 'Sport Not Found' };
  }

  return {
    title: sport.name,
    description: `${sport.name} at Milan Cortina 2026 — ${sport.venue}`,
  };
}

/**
 * Get gradient classes based on sport category
 */
function getCategoryGradient(category: LiveSport['category']): string {
  switch (category) {
    case 'dynamic':
      return 'from-sky-100/80 via-blue-50/60 to-white/40 dark:from-sky-950/80 dark:via-blue-950/60 dark:to-slate-900/40';
    case 'precision':
      return 'from-slate-50/80 to-gray-100/60 dark:from-slate-900/80 dark:to-gray-900/60';
    case 'endurance':
      return 'from-amber-50/40 via-stone-50/60 to-white/80 dark:from-amber-950/40 dark:via-stone-900/60 dark:to-slate-900/80';
    case 'style':
      return 'from-violet-50/60 via-indigo-50/40 to-white/60 dark:from-violet-950/60 dark:via-indigo-950/40 dark:to-slate-900/60';
    case 'team':
      return 'from-red-50/40 to-blue-50/40 dark:from-red-950/40 dark:to-blue-950/40';
    default:
      return 'from-gray-50 to-white dark:from-gray-900 dark:to-gray-950';
  }
}

/**
 * Get category display label
 */
function getCategoryLabel(category: LiveSport['category']): string {
  const labels: Record<LiveSport['category'], string> = {
    dynamic: 'Dynamic',
    precision: 'Precision',
    endurance: 'Endurance',
    style: 'Style',
    team: 'Team',
  };
  return labels[category];
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(
  iconName: string
): React.ComponentType<{ className?: string; size?: number }> | null {
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  return icons[pascalName] || LucideIcons.Circle;
}

/**
 * Status display component
 */
function StatusDisplay({ sport }: { sport: LiveSport }) {
  if (sport.status === 'live' && sport.currentEvent) {
    return (
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
        <div>
          <span
            className="font-semibold uppercase tracking-wide"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-live)',
            }}
          >
            LIVE NOW
          </span>
          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {sport.currentEvent}
          </p>
        </div>
      </div>
    );
  }

  if (sport.status === 'upcoming' && sport.nextEventTime) {
    const relativeTime = formatRelativeTime(sport.nextEventTime);
    return (
      <div>
        <p
          className="tabular-nums font-medium"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--country-accent-primary)',
          }}
        >
          Next: {relativeTime}
        </p>
        {sport.nextEvent && (
          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {sport.nextEvent}
          </p>
        )}
      </div>
    );
  }

  if (sport.status === 'completed') {
    return (
      <p
        className="font-medium"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-muted)',
        }}
      >
        All events completed
      </p>
    );
  }

  return (
    <p
      style={{
        fontSize: 'var(--text-body)',
        color: 'var(--color-text-muted)',
      }}
    >
      Events upcoming
    </p>
  );
}

export default async function SportPage({ params }: SportPageProps) {
  const { sport: sportId } = await params;
  const sport = SPORTS.find((s) => s.id === sportId);

  if (!sport) {
    notFound();
  }

  const Icon = getIconComponent(sport.icon);
  const totalMedals = sport.medals.gold + sport.medals.silver + sport.medals.bronze;

  return (
    <div className="min-h-screen">
      {/* Header with gradient background */}
      <header className="relative overflow-hidden">
        {/* Category gradient */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            getCategoryGradient(sport.category)
          )}
        />

        {/* Country accent overlay */}
        <div
          className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
          style={{ backgroundColor: 'var(--country-accent-surface)' }}
        />

        {/* Content */}
        <div className="container relative z-10 max-w-5xl px-4 py-8 sm:px-6 md:py-12">
          {/* Back link */}
          <Link
            href="/sports"
            className="group mb-8 inline-flex items-center gap-2 transition-colors"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
            }}
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-150 group-hover:-translate-x-1"
            />
            Back to Sports
          </Link>

          {/* Sport icon and title */}
          <div className="flex items-start gap-6">
            {Icon && (
              <span style={{ color: 'var(--country-accent-primary)' }}>
                <Icon size={64} />
              </span>
            )}
            <div className="flex-1">
              <h1
                className="font-semibold"
                style={{
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {sport.name}
              </h1>

              {/* Category badge */}
              <span
                className="mt-2 inline-block rounded-full px-3 py-1"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--country-accent-primary)',
                  backgroundColor: 'var(--country-accent-surface)',
                }}
              >
                {getCategoryLabel(sport.category)}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8">
            <StatusDisplay sport={sport} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        {/* Info grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Venue */}
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <MapPin
                size={20}
                style={{ color: 'var(--color-text-muted)' }}
              />
              <span
                className="font-medium"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Venue
              </span>
            </div>
            <p
              className="font-medium"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-primary)',
              }}
            >
              {sport.venue}
            </p>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {sport.territory}
            </p>
          </div>

          {/* Events progress */}
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Calendar
                size={20}
                style={{ color: 'var(--color-text-muted)' }}
              />
              <span
                className="font-medium"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Events
              </span>
            </div>
            <p
              className="tabular-nums font-medium"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-primary)',
              }}
            >
              {sport.completedEvents} of {sport.totalEvents} completed
            </p>
            {/* Progress bar */}
            <div
              className="mt-3 h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: 'var(--color-border)' }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(sport.completedEvents / sport.totalEvents) * 100}%`,
                  backgroundColor: 'var(--country-accent-primary)',
                }}
              />
            </div>
          </div>

          {/* Medals */}
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Trophy
                size={20}
                style={{ color: 'var(--color-text-muted)' }}
              />
              <span
                className="font-medium"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Medals Awarded
              </span>
            </div>
            {totalMedals > 0 ? (
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                  <span
                    className="tabular-nums font-medium"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {sport.medals.gold}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: 'var(--color-silver)' }}
                  />
                  <span
                    className="tabular-nums font-medium"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {sport.medals.silver}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: 'var(--color-bronze)' }}
                  />
                  <span
                    className="tabular-nums font-medium"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {sport.medals.bronze}
                  </span>
                </span>
              </div>
            ) : (
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                No medals yet
              </p>
            )}
          </div>
        </div>

        {/* Coming soon placeholder */}
        <div
          className="mt-12 flex flex-col items-center justify-center rounded-xl py-16"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <Calendar
            size={48}
            style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
          />
          <p
            className="mt-4 text-center"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Full schedule, results, and athlete profiles coming soon
          </p>
        </div>
      </main>
    </div>
  );
}
