/**
 * TimelinePill — Elongated pill row in the rolodex drum
 *
 * Collapsed: Compact 2-row layout (event name + icon, sport + time)
 * Expanded: Large hero card — sport image bg, venue, results, medal badge
 *
 * The center pill of the drum is auto-expanded by the parent.
 * Clicking any pill scrolls it to center (which triggers auto-expand).
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { Circle, Medal, ChevronRight, Check, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SPORTS } from '@/lib/data/sports';
import type { ScheduleEvent } from '@/lib/types/olympics';
import { getSportImage } from './sport-images';
import { useRolodex } from './useRolodex';

function getIconComponent(iconName: string) {
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  const icons = LucideIcons as Record<string, unknown>;
  return (icons[pascalName] as React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>) || Circle;
}

interface TimelinePillProps {
  event: ScheduleEvent;
  isExpanded: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  /** Optional external ref for the pill element (e.g. auto-scroll target) */
  externalRef?: React.RefObject<HTMLDivElement | null>;
}

export function TimelinePill({
  event,
  isExpanded,
  containerRef,
  externalRef,
}: TimelinePillProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const pillRef = externalRef ?? internalRef;
  const sport = SPORTS.find((s) => s.id === event.sport);
  const Icon = sport ? getIconComponent(sport.icon) : Circle;
  const isLive = event.status === 'live';
  const isCompleted = event.status === 'completed';
  const sportImage = getSportImage(event.sport);

  const { opacity, scale } = useRolodex({
    containerRef,
    itemRef: pillRef,
  });

  const handleClick = () => {
    // Scroll this pill to center of the drum — auto-expand handles the rest
    pillRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <motion.div
      ref={pillRef}
      data-event-id={event.id}
      layout
      onClick={handleClick}
      style={{
        opacity: opacity as unknown as number,
        scale: scale as unknown as number,
        borderRadius: isExpanded ? 20 : 9999,
        backgroundColor: isExpanded
          ? 'transparent'
          : 'var(--color-bg-secondary)',
        cursor: 'pointer',
      }}
      transition={{
        layout: { type: 'spring', stiffness: 400, damping: 30 },
      }}
      className={cn(
        'relative overflow-hidden w-full',
        'transition-shadow duration-150',
        !isExpanded && '@media(hover:hover):hover:-translate-y-px',
        !isExpanded && '@media(hover:hover):hover:shadow-sm',
        isCompleted && !isExpanded && 'opacity-50'
      )}
    >
      {/* Expanded: Image background */}
      {isExpanded && sportImage && (
        <div className="absolute inset-0">
          <Image
            src={sportImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          {/* Dark gradient overlay — heavier for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>
      )}

      {/* Content */}
      <motion.div
        layout="position"
        className={cn(
          'relative z-10',
          isExpanded ? 'px-8 py-7' : 'px-5 py-3'
        )}
      >
        {/* Collapsed layout */}
        {!isExpanded && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p
                className="font-medium leading-snug truncate"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {event.event}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {sport?.name}
                </span>
                {event.isMedalEvent && (
                  <Medal
                    size={11}
                    style={{ color: 'var(--color-gold)' }}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isLive && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
              )}
              {isCompleted ? (
                <Check
                  size={14}
                  style={{ color: 'var(--color-text-muted)' }}
                />
              ) : (
                <span
                  className="tabular-nums"
                  style={{
                    fontSize: '11px',
                    color: isLive
                      ? 'var(--color-live)'
                      : 'var(--color-text-muted)',
                  }}
                >
                  {event.time}
                </span>
              )}
              <Icon
                size={16}
                style={{
                  color: isLive
                    ? 'var(--color-live)'
                    : 'var(--country-accent-primary)',
                }}
              />
            </div>
          </div>
        )}

        {/* Expanded layout — hero card */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="space-y-5 min-h-[180px] flex flex-col justify-center"
            >
              {/* Sport icon + badge row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon size={24} className="text-white/70" />
                  <span
                    className="text-white/60 font-medium uppercase tracking-wider"
                    style={{ fontSize: '12px' }}
                  >
                    {sport?.name}
                  </span>
                </div>
                {event.isMedalEvent && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <Medal size={14} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-white/80" style={{ fontSize: '11px' }}>
                      Medal Event
                    </span>
                  </div>
                )}
              </div>

              {/* Event name — large */}
              <div>
                <h3
                  className="font-bold leading-tight text-white"
                  style={{ fontSize: '22px' }}
                >
                  {event.event}
                </h3>
              </div>

              {/* Meta row: venue + time */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-white/60" style={{ fontSize: '13px' }}>
                  <MapPin size={13} />
                  {event.venue}
                </span>
                <span className="flex items-center gap-1.5 tabular-nums text-white/60" style={{ fontSize: '13px' }}>
                  <Clock size={13} />
                  {event.time} CET
                </span>
              </div>

              {/* Status row */}
              <div className="flex items-center gap-4">
                {isLive && (
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-red-400 font-semibold" style={{ fontSize: '13px' }}>
                      LIVE NOW
                    </span>
                  </span>
                )}
                {isCompleted && (
                  <span className="flex items-center gap-1.5 text-white/50" style={{ fontSize: '13px' }}>
                    <Check size={14} />
                    Completed
                  </span>
                )}
                {event.result && (
                  <span className="text-white/80 font-medium" style={{ fontSize: '14px' }}>
                    {event.result}
                  </span>
                )}
              </div>

              {/* Action link */}
              <Link
                href={`/sports/${event.sport}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors font-medium"
                style={{ fontSize: '14px' }}
              >
                View {sport?.name ?? 'Sport'}
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
