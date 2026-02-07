'use client';

/**
 * Breadcrumb — Route-aware breadcrumb in TopBar
 *
 * Derives breadcrumb from current pathname
 * Examples:
 * - / → Olympus
 * - /sports → Olympus / Sports
 * - /sports/alpine-skiing → Olympus / Sports / Alpine Skiing
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

// Map route segments to display names
const ROUTE_LABELS: Record<string, string> = {
  '': 'Home',
  highlights: 'Highlights',
  sports: 'Sports',
  schedule: 'Schedule',
  medals: 'Medals',
  venues: 'Venues',
  countries: 'Countries',
  stories: 'Stories',
  // Sport slugs
  'alpine-skiing': 'Alpine Skiing',
  'cross-country': 'Cross-Country',
  'figure-skating': 'Figure Skating',
  'ice-hockey': 'Ice Hockey',
  biathlon: 'Biathlon',
  bobsled: 'Bobsled',
  curling: 'Curling',
  luge: 'Luge',
  skeleton: 'Skeleton',
  snowboard: 'Snowboard',
  'ski-jumping': 'Ski Jumping',
  'nordic-combined': 'Nordic Combined',
  'speed-skating': 'Speed Skating',
  'short-track': 'Short Track',
  freestyle: 'Freestyle',
};

function getLabel(segment: string): string {
  return ROUTE_LABELS[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const items: { label: string; href: string }[] = [
    { label: 'Olympus', href: '/' },
  ];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    items.push({
      label: getLabel(segment),
      href: currentPath,
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1.5">
          {index > 0 && (
            <ChevronRight
              size={14}
              style={{ color: 'var(--color-text-muted)' }}
              aria-hidden="true"
            />
          )}
          {index === items.length - 1 ? (
            // Current page (not a link)
            <span
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
              }}
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            // Link to parent
            <Link
              href={item.href}
              className="transition-colors hover:underline"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
