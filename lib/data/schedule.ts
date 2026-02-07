/**
 * Schedule Data — Feb 6-8, 2026
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 6: Schedule & Timeline (lines 876-897)
 *
 * Three days of events:
 * - Feb 6: Opening Ceremony (completed)
 * - Feb 7 (today): First medal events
 * - Feb 8 (tomorrow): More events starting
 */

import type { ScheduleEvent } from '@/lib/types/olympics';

export const SCHEDULE: ScheduleEvent[] = [
  // ==========================================================================
  // FEBRUARY 6 — Opening Ceremony
  // ==========================================================================
  {
    id: 'opening-ceremony',
    date: '2026-02-06',
    time: '20:00',
    sport: 'ceremony',
    event: 'Opening Ceremony',
    venue: 'San Siro Stadium',
    status: 'completed',
    result: null,
    isMedalEvent: false,
  },

  // ==========================================================================
  // FEBRUARY 7 — Day 2 (Today)
  // ==========================================================================

  // Biathlon
  {
    id: 'bia-mixed-relay',
    date: '2026-02-07',
    time: '10:00',
    sport: 'biathlon',
    event: 'Mixed Relay 4x6km',
    venue: 'Anterselva Arena',
    status: 'completed',
    result: 'GER 🥇, NOR 🥈, SWE 🥉',
    isMedalEvent: true,
  },
  {
    id: 'bia-w-sprint',
    date: '2026-02-07',
    time: '11:30',
    sport: 'biathlon',
    event: "Women's 7.5km Sprint",
    venue: 'Anterselva Arena',
    status: 'live',
    result: null,
    isMedalEvent: true,
  },
  {
    id: 'bia-m-sprint',
    date: '2026-02-07',
    time: '14:30',
    sport: 'biathlon',
    event: "Men's 10km Sprint",
    venue: 'Anterselva Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Cross-Country Skiing
  {
    id: 'xc-w-skiathlon',
    date: '2026-02-07',
    time: '09:30',
    sport: 'cross-country-skiing',
    event: "Women's Skiathlon 7.5km + 7.5km",
    venue: 'Tesero Stadium',
    status: 'completed',
    result: 'NOR 🥇, NOR 🥈, GER 🥉',
    isMedalEvent: true,
  },

  // Speed Skating
  {
    id: 'ss-m-5000',
    date: '2026-02-07',
    time: '16:00',
    sport: 'speed-skating',
    event: "Men's 5000m",
    venue: 'Milano Speed Skating Stadium',
    status: 'completed',
    result: 'NED 🥇, NED 🥈, NOR 🥉',
    isMedalEvent: true,
  },

  // Ski Jumping
  {
    id: 'sj-w-nh-qual',
    date: '2026-02-07',
    time: '16:30',
    sport: 'ski-jumping',
    event: "Women's Normal Hill Qualification",
    venue: 'Predazzo Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Freestyle Skiing
  {
    id: 'fs-m-moguls-qual',
    date: '2026-02-07',
    time: '18:00',
    sport: 'freestyle-skiing',
    event: "Men's Moguls Qualification",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Short Track
  {
    id: 'st-mixed-relay-heats',
    date: '2026-02-07',
    time: '19:00',
    sport: 'short-track',
    event: 'Mixed Team Relay Heats',
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // ==========================================================================
  // FEBRUARY 8 — Day 3
  // ==========================================================================

  // Alpine Skiing
  {
    id: 'as-m-dh-training',
    date: '2026-02-08',
    time: '10:00',
    sport: 'alpine-skiing',
    event: "Men's Downhill Training",
    venue: 'Tofane Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Curling
  {
    id: 'cur-mixed-rr-1',
    date: '2026-02-08',
    time: '09:00',
    sport: 'curling',
    event: 'Mixed Doubles Round Robin',
    venue: 'Cortina Curling Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Figure Skating
  {
    id: 'fs-team-sp',
    date: '2026-02-08',
    time: '10:00',
    sport: 'figure-skating',
    event: 'Team Event Short Program',
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Luge
  {
    id: 'luge-m-run1',
    date: '2026-02-08',
    time: '10:30',
    sport: 'luge',
    event: "Men's Singles Run 1 & 2",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Cross-Country
  {
    id: 'xc-w-sprint-qual',
    date: '2026-02-08',
    time: '11:00',
    sport: 'cross-country-skiing',
    event: "Women's Sprint Free Qualification",
    venue: 'Tesero Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Ice Hockey
  {
    id: 'ih-w-prelim-1',
    date: '2026-02-08',
    time: '12:00',
    sport: 'ice-hockey',
    event: "Women's Preliminary Round",
    venue: 'Santagiulia Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Biathlon
  {
    id: 'bia-w-pursuit',
    date: '2026-02-08',
    time: '14:00',
    sport: 'biathlon',
    event: "Women's 10km Pursuit",
    venue: 'Anterselva Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Speed Skating
  {
    id: 'ss-w-3000',
    date: '2026-02-08',
    time: '16:00',
    sport: 'speed-skating',
    event: "Women's 3000m",
    venue: 'Milano Speed Skating Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Ski Jumping
  {
    id: 'sj-w-nh-final',
    date: '2026-02-08',
    time: '18:00',
    sport: 'ski-jumping',
    event: "Women's Normal Hill Individual",
    venue: 'Predazzo Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Snowboard
  {
    id: 'sb-w-slopestyle-qual',
    date: '2026-02-08',
    time: '09:30',
    sport: 'snowboard',
    event: "Women's Slopestyle Qualification",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },
];

/**
 * Get events for a specific date
 */
export function getEventsByDate(date: string): ScheduleEvent[] {
  return SCHEDULE.filter((e) => e.date === date).sort((a, b) =>
    a.time.localeCompare(b.time)
  );
}

/**
 * Get events for a specific sport
 */
export function getEventsBySport(sportId: string): ScheduleEvent[] {
  return SCHEDULE.filter((e) => e.sport === sportId).sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
}

/**
 * Get today's events
 */
export function getTodaysEvents(): ScheduleEvent[] {
  return getEventsByDate('2026-02-07');
}

/**
 * Get live events
 */
export function getLiveEvents(): ScheduleEvent[] {
  return SCHEDULE.filter((e) => e.status === 'live');
}

/**
 * Get upcoming medal events
 */
export function getUpcomingMedalEvents(): ScheduleEvent[] {
  return SCHEDULE.filter(
    (e) => e.status === 'upcoming' && e.isMedalEvent
  ).sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
}
