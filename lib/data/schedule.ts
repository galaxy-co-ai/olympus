/**
 * Schedule Data — Feb 6-12, 2026 (First Week of the Games)
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 6: Schedule & Timeline (lines 876-897)
 *
 * Status reflects Day 2 (Feb 7, 2026):
 * - Feb 6: All completed (Opening Ceremony)
 * - Feb 7 morning: Completed
 * - Feb 7 afternoon (1-2 events): Live
 * - Feb 7 evening and beyond: Upcoming
 * - Feb 8+: All upcoming
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

  // Curling
  {
    id: 'cur-mixed-rr-d1-1',
    date: '2026-02-07',
    time: '09:00',
    sport: 'curling',
    event: 'Mixed Doubles: USA vs CAN',
    venue: 'Cortina Curling Stadium',
    status: 'completed',
    result: 'CAN 8-5 USA',
    isMedalEvent: false,
  },
  {
    id: 'cur-mixed-rr-d1-2',
    date: '2026-02-07',
    time: '14:00',
    sport: 'curling',
    event: 'Mixed Doubles: ITA vs GBR',
    venue: 'Cortina Curling Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },
  {
    id: 'cur-mixed-rr-d1-3',
    date: '2026-02-07',
    time: '19:00',
    sport: 'curling',
    event: 'Mixed Doubles: NOR vs SWE',
    venue: 'Cortina Curling Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // ==========================================================================
  // FEBRUARY 8 — Day 3
  // ==========================================================================

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

  // Curling
  {
    id: 'cur-mixed-rr-d2-1',
    date: '2026-02-08',
    time: '09:00',
    sport: 'curling',
    event: 'Mixed Doubles: SUI vs KOR',
    venue: 'Cortina Curling Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

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
  {
    id: 'xc-m-sprint-qual',
    date: '2026-02-08',
    time: '11:45',
    sport: 'cross-country-skiing',
    event: "Men's Sprint Free Qualification",
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
    event: "Women's Prelim: USA vs CAN",
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

  // Cross-Country Finals
  {
    id: 'xc-w-sprint-final',
    date: '2026-02-08',
    time: '14:30',
    sport: 'cross-country-skiing',
    event: "Women's Sprint Free Final",
    venue: 'Tesero Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },
  {
    id: 'xc-m-sprint-final',
    date: '2026-02-08',
    time: '15:15',
    sport: 'cross-country-skiing',
    event: "Men's Sprint Free Final",
    venue: 'Tesero Stadium',
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

  // Short Track
  {
    id: 'st-mixed-relay-final',
    date: '2026-02-08',
    time: '18:00',
    sport: 'short-track',
    event: 'Mixed Team Relay Final',
    venue: 'Milano Ice Skating Arena',
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

  // Ice Hockey
  {
    id: 'ih-w-prelim-2',
    date: '2026-02-08',
    time: '17:00',
    sport: 'ice-hockey',
    event: "Women's Prelim: SWE vs FIN",
    venue: 'Santagiulia Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // ==========================================================================
  // FEBRUARY 9 — Day 4
  // ==========================================================================

  // Alpine Skiing
  {
    id: 'as-m-dh-training-2',
    date: '2026-02-09',
    time: '10:00',
    sport: 'alpine-skiing',
    event: "Men's Downhill Training 2",
    venue: 'Tofane Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Biathlon
  {
    id: 'bia-m-pursuit',
    date: '2026-02-09',
    time: '10:30',
    sport: 'biathlon',
    event: "Men's 12.5km Pursuit",
    venue: 'Anterselva Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Cross-Country
  {
    id: 'xc-m-skiathlon',
    date: '2026-02-09',
    time: '11:30',
    sport: 'cross-country-skiing',
    event: "Men's Skiathlon 15km + 15km",
    venue: 'Tesero Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Figure Skating
  {
    id: 'fs-team-fs',
    date: '2026-02-09',
    time: '10:00',
    sport: 'figure-skating',
    event: 'Team Event Free Skate',
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Luge
  {
    id: 'luge-m-run3',
    date: '2026-02-09',
    time: '14:30',
    sport: 'luge',
    event: "Men's Singles Run 3 & 4",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Speed Skating
  {
    id: 'ss-m-1500',
    date: '2026-02-09',
    time: '16:00',
    sport: 'speed-skating',
    event: "Men's 1500m",
    venue: 'Milano Speed Skating Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Snowboard
  {
    id: 'sb-w-slopestyle-final',
    date: '2026-02-09',
    time: '09:30',
    sport: 'snowboard',
    event: "Women's Slopestyle Final",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },
  {
    id: 'sb-m-slopestyle-qual',
    date: '2026-02-09',
    time: '13:00',
    sport: 'snowboard',
    event: "Men's Slopestyle Qualification",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Short Track
  {
    id: 'st-w-500-heats',
    date: '2026-02-09',
    time: '19:00',
    sport: 'short-track',
    event: "Women's 500m Heats",
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Ice Hockey
  {
    id: 'ih-m-prelim-1',
    date: '2026-02-09',
    time: '12:00',
    sport: 'ice-hockey',
    event: "Men's Prelim: USA vs GER",
    venue: 'Rho Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },
  {
    id: 'ih-m-prelim-2',
    date: '2026-02-09',
    time: '17:00',
    sport: 'ice-hockey',
    event: "Men's Prelim: CAN vs FIN",
    venue: 'Rho Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Curling
  {
    id: 'cur-mixed-rr-d3-1',
    date: '2026-02-09',
    time: '09:00',
    sport: 'curling',
    event: 'Mixed Doubles: JPN vs GBR',
    venue: 'Cortina Curling Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },
  {
    id: 'cur-mixed-rr-d3-2',
    date: '2026-02-09',
    time: '14:00',
    sport: 'curling',
    event: 'Mixed Doubles: CAN vs NOR',
    venue: 'Cortina Curling Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // ==========================================================================
  // FEBRUARY 10 — Day 5
  // ==========================================================================

  // Alpine Skiing
  {
    id: 'as-m-dh',
    date: '2026-02-10',
    time: '11:00',
    sport: 'alpine-skiing',
    event: "Men's Downhill",
    venue: 'Tofane Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Biathlon
  {
    id: 'bia-w-individual',
    date: '2026-02-10',
    time: '14:00',
    sport: 'biathlon',
    event: "Women's 15km Individual",
    venue: 'Anterselva Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Cross-Country
  {
    id: 'xc-w-10km',
    date: '2026-02-10',
    time: '11:00',
    sport: 'cross-country-skiing',
    event: "Women's 10km Classic",
    venue: 'Tesero Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Snowboard
  {
    id: 'sb-m-slopestyle-final',
    date: '2026-02-10',
    time: '09:30',
    sport: 'snowboard',
    event: "Men's Slopestyle Final",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Freestyle
  {
    id: 'fs-m-moguls-final',
    date: '2026-02-10',
    time: '19:00',
    sport: 'freestyle-skiing',
    event: "Men's Moguls Final",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Luge
  {
    id: 'luge-w-run1',
    date: '2026-02-10',
    time: '14:30',
    sport: 'luge',
    event: "Women's Singles Run 1 & 2",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Speed Skating
  {
    id: 'ss-w-5000',
    date: '2026-02-10',
    time: '16:00',
    sport: 'speed-skating',
    event: "Women's 5000m",
    venue: 'Milano Speed Skating Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Ski Mountaineering
  {
    id: 'skmo-mixed-relay',
    date: '2026-02-10',
    time: '09:00',
    sport: 'ski-mountaineering',
    event: 'Mixed Relay',
    venue: 'Stelvio Ski Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Short Track
  {
    id: 'st-m-1000-heats',
    date: '2026-02-10',
    time: '18:30',
    sport: 'short-track',
    event: "Men's 1000m Heats",
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Bobsleigh
  {
    id: 'bob-w-monobob-1',
    date: '2026-02-10',
    time: '09:30',
    sport: 'bobsleigh',
    event: "Women's Monobob Run 1 & 2",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // ==========================================================================
  // FEBRUARY 11 — Day 6
  // ==========================================================================

  // Alpine Skiing
  {
    id: 'as-w-gs-run1',
    date: '2026-02-11',
    time: '10:00',
    sport: 'alpine-skiing',
    event: "Women's Giant Slalom Run 1",
    venue: 'Stelvio Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },
  {
    id: 'as-w-gs-run2',
    date: '2026-02-11',
    time: '13:30',
    sport: 'alpine-skiing',
    event: "Women's Giant Slalom Run 2",
    venue: 'Stelvio Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Biathlon
  {
    id: 'bia-m-individual',
    date: '2026-02-11',
    time: '14:00',
    sport: 'biathlon',
    event: "Men's 20km Individual",
    venue: 'Anterselva Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Cross-Country
  {
    id: 'xc-m-15km',
    date: '2026-02-11',
    time: '11:00',
    sport: 'cross-country-skiing',
    event: "Men's 15km Classic",
    venue: 'Tesero Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Nordic Combined
  {
    id: 'nc-m-nh',
    date: '2026-02-11',
    time: '10:00',
    sport: 'nordic-combined',
    event: "Men's Individual NH/10km",
    venue: 'Predazzo / Tesero',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Luge
  {
    id: 'luge-w-run3',
    date: '2026-02-11',
    time: '14:30',
    sport: 'luge',
    event: "Women's Singles Run 3 & 4",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Ski Jumping
  {
    id: 'sj-m-nh-qual',
    date: '2026-02-11',
    time: '16:00',
    sport: 'ski-jumping',
    event: "Men's Normal Hill Qualification",
    venue: 'Predazzo Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Speed Skating
  {
    id: 'ss-m-1000',
    date: '2026-02-11',
    time: '17:00',
    sport: 'speed-skating',
    event: "Men's 1000m",
    venue: 'Milano Speed Skating Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Short Track
  {
    id: 'st-w-500-final',
    date: '2026-02-11',
    time: '19:00',
    sport: 'short-track',
    event: "Women's 500m Final",
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Freestyle
  {
    id: 'fs-w-moguls-qual',
    date: '2026-02-11',
    time: '18:00',
    sport: 'freestyle-skiing',
    event: "Women's Moguls Qualification",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Bobsleigh
  {
    id: 'bob-w-monobob-3',
    date: '2026-02-11',
    time: '09:30',
    sport: 'bobsleigh',
    event: "Women's Monobob Run 3 & 4",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // ==========================================================================
  // FEBRUARY 12 — Day 7
  // ==========================================================================

  // Alpine Skiing
  {
    id: 'as-m-sg',
    date: '2026-02-12',
    time: '11:00',
    sport: 'alpine-skiing',
    event: "Men's Super-G",
    venue: 'Tofane Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Figure Skating
  {
    id: 'fs-m-sp',
    date: '2026-02-12',
    time: '10:00',
    sport: 'figure-skating',
    event: "Men's Singles Short Program",
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Ski Jumping
  {
    id: 'sj-m-nh-final',
    date: '2026-02-12',
    time: '18:00',
    sport: 'ski-jumping',
    event: "Men's Normal Hill Individual",
    venue: 'Predazzo Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Snowboard
  {
    id: 'sb-w-halfpipe-qual',
    date: '2026-02-12',
    time: '09:30',
    sport: 'snowboard',
    event: "Women's Halfpipe Qualification",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Cross-Country
  {
    id: 'xc-w-relay',
    date: '2026-02-12',
    time: '11:30',
    sport: 'cross-country-skiing',
    event: "Women's 4x5km Relay",
    venue: 'Tesero Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Biathlon
  {
    id: 'bia-w-relay',
    date: '2026-02-12',
    time: '14:00',
    sport: 'biathlon',
    event: "Women's 4x6km Relay",
    venue: 'Anterselva Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Speed Skating
  {
    id: 'ss-w-500',
    date: '2026-02-12',
    time: '16:00',
    sport: 'speed-skating',
    event: "Women's 500m",
    venue: 'Milano Speed Skating Stadium',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Short Track
  {
    id: 'st-m-1500-heats',
    date: '2026-02-12',
    time: '19:00',
    sport: 'short-track',
    event: "Men's 1500m Heats",
    venue: 'Milano Ice Skating Arena',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Skeleton
  {
    id: 'skel-m-run1',
    date: '2026-02-12',
    time: '09:30',
    sport: 'skeleton',
    event: "Men's Skeleton Run 1 & 2",
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: false,
  },

  // Luge
  {
    id: 'luge-doubles-run1',
    date: '2026-02-12',
    time: '14:30',
    sport: 'luge',
    event: 'Doubles Run 1 & 2',
    venue: 'Cortina Sliding Centre',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
  },

  // Freestyle
  {
    id: 'fs-w-moguls-final',
    date: '2026-02-12',
    time: '19:00',
    sport: 'freestyle-skiing',
    event: "Women's Moguls Final",
    venue: 'Livigno Snow Park',
    status: 'upcoming',
    result: null,
    isMedalEvent: true,
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

/**
 * Get all unique venues from the schedule
 */
export function getUniqueVenues(): string[] {
  const venues = new Set<string>();
  SCHEDULE.forEach((e) => venues.add(e.venue));
  return Array.from(venues).sort();
}

/**
 * Get all unique sports from the schedule
 */
export function getUniqueSports(): string[] {
  const sports = new Set<string>();
  SCHEDULE.forEach((e) => sports.add(e.sport));
  return Array.from(sports).sort();
}

/**
 * Get event count by date for the day selector
 */
export function getEventCountByDate(): Record<string, number> {
  const counts: Record<string, number> = {};
  SCHEDULE.forEach((e) => {
    counts[e.date] = (counts[e.date] || 0) + 1;
  });
  return counts;
}
