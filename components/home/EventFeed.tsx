'use client';

/**
 * EventFeed — Rolodex drum timeline
 *
 * Vertical timeline with scroll-driven depth effect. The center pill
 * auto-expands into a hero card; pills above/below shrink and fade
 * like a physical rolodex drum.
 *
 * - Drum viewport is fixed height, forcing scroll
 * - Scroll position determines which pill is "center" (auto-expanded)
 * - Spine + pills scroll together inside one container
 * - Click any pill to scroll it to center
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { LayoutGroup } from 'framer-motion';

import { getTodaysEvents } from '@/lib/data/schedule';
import { TimelineSpine } from './timeline/TimelineSpine';
import { TimelinePill } from './timeline/TimelinePill';

/**
 * Pick the featured event (same logic as FeaturedHighlight)
 * so we can exclude it from the feed.
 */
function getFeaturedEventId(): string | null {
  const events = getTodaysEvents();
  if (events.length === 0) return null;

  const live = events.find((e) => e.status === 'live');
  if (live) return live.id;

  const upcomingMedal = events.find(
    (e) => e.status === 'upcoming' && e.isMedalEvent
  );
  if (upcomingMedal) return upcomingMedal.id;

  const upcoming = events.find((e) => e.status === 'upcoming');
  if (upcoming) return upcoming.id;

  return events[0]?.id ?? null;
}

/** Drum fills remaining viewport below hero (topbar 56 + padding 32 + hero ~200 + gap 24 + bottom 24) */
const DRUM_HEIGHT = 'calc(100vh - 336px)';
/** Hysteresis threshold — current center pill "sticks" unless this far from center */
const HYSTERESIS_PX = 80;

export function EventFeed() {
  const allEvents = getTodaysEvents();
  const featuredId = getFeaturedEventId();
  const events = allEvents.filter((e) => e.id !== featuredId);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const anchorPillRef = useRef<HTMLDivElement>(null);

  // Find the best anchor: first live event in feed, or first upcoming
  const anchorId =
    events.find((e) => e.status === 'live')?.id ??
    events.find((e) => e.status === 'upcoming')?.id ??
    null;

  // On mount, scroll so the anchor event sits in the center of the drum
  const hasScrolled = useRef(false);
  useEffect(() => {
    if (hasScrolled.current || !anchorPillRef.current || !scrollContainerRef.current) return;
    hasScrolled.current = true;

    const container = scrollContainerRef.current;
    const pill = anchorPillRef.current;
    const pillTop = pill.offsetTop;
    const pillHeight = pill.offsetHeight;
    const containerHeight = container.clientHeight;

    container.scrollTop = pillTop - containerHeight / 2 + pillHeight / 2;
  }, [anchorId]);

  // Scroll-driven auto-expand: the pill closest to center is always expanded
  const detectCenter = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    const pills = container.querySelectorAll<HTMLElement>('[data-event-id]');
    let bestId: string | null = null;
    let bestDist = Infinity;

    pills.forEach((el) => {
      const r = el.getBoundingClientRect();
      const dist = Math.abs(r.top + r.height / 2 - centerY);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = el.dataset.eventId ?? null;
      }
    });

    if (bestId) {
      setExpandedId((prev) => {
        if (prev === bestId) return prev;
        // Hysteresis: keep current center pill if it's still close
        if (prev) {
          const currentEl = container.querySelector<HTMLElement>(
            `[data-event-id="${prev}"]`
          );
          if (currentEl) {
            const cr = currentEl.getBoundingClientRect();
            const cd = Math.abs(cr.top + cr.height / 2 - centerY);
            if (cd < HYSTERESIS_PX) return prev;
          }
        }
        return bestId;
      });
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          detectCenter();
          ticking = false;
        });
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    // Initial detection after mount + auto-scroll settles
    const timer = setTimeout(detectCenter, 200);

    return () => {
      container.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [detectCenter]);

  if (events.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <p style={{ fontSize: 'var(--text-small)' }}>
          No other events today
        </p>
        <Link
          href="/schedule"
          className="mt-2 inline-flex items-center gap-1 transition-colors"
          style={{
            fontSize: '12px',
            color: 'var(--country-accent-primary)',
          }}
        >
          View schedule
          <ChevronRight size={12} />
        </Link>
      </div>
    );
  }

  // Build spine dots from events (deduplicated by time)
  const seenTimes = new Set<string>();
  const spineDots = events
    .filter((e) => {
      if (seenTimes.has(e.time)) return false;
      seenTimes.add(e.time);
      return true;
    })
    .map((e) => ({
      time: e.time,
      status: e.status as 'live' | 'upcoming' | 'completed',
    }));

  return (
    <div className="space-y-4">
      {/* Drum viewport — spine + pills scroll together */}
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto pr-1"
        style={{
          height: DRUM_HEIGHT,
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-border) transparent',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[48px_1fr] gap-0 sm:gap-2">
          {/* Spine — desktop only */}
          <TimelineSpine dots={spineDots} />

          {/* Pills column */}
          <div
            className="flex flex-col gap-2"
            style={{ perspective: '1200px' }}
          >
            <LayoutGroup>
              {events.map((event) => (
                <TimelinePill
                  key={event.id}
                  event={event}
                  isExpanded={expandedId === event.id}
                  containerRef={scrollContainerRef}
                  externalRef={event.id === anchorId ? anchorPillRef : undefined}
                />
              ))}
            </LayoutGroup>
          </div>
        </div>
      </div>

    </div>
  );
}
