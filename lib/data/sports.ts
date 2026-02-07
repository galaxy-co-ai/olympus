/**
 * Live Sports Data — Day 2 (February 7, 2026)
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section V: Content Reference (lines 1205-1227)
 * - Section 4: Sport Cards (lines 755-776)
 *
 * Status reflects Day 2 of the Games (Feb 7, 2026):
 * - Several early events completed (Biathlon, Speed Skating, Short Track heats)
 * - 1-2 sports currently live
 * - Most events still upcoming
 */

import { LiveSportSchema, type LiveSport } from '@/lib/types/olympics';

export const SPORTS: LiveSport[] = [
  {
    id: 'alpine-skiing',
    name: 'Alpine Skiing',
    icon: 'mountain-snow',
    venue: 'Tofane Centre / Stelvio',
    territory: 'Cortina / Bormio',
    category: 'dynamic',
    totalEvents: 11,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Men's Downhill Training",
    nextEventTime: '2026-02-08T10:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'biathlon',
    name: 'Biathlon',
    icon: 'target',
    venue: 'Anterselva Arena',
    territory: 'Anterselva',
    category: 'precision',
    totalEvents: 11,
    completedEvents: 1,
    status: 'live',
    currentEvent: "Women's 7.5km Sprint",
    nextEvent: "Men's 10km Sprint",
    nextEventTime: '2026-02-07T14:30:00+01:00',
    medals: { gold: 1, silver: 1, bronze: 1 },
  },
  {
    id: 'bobsleigh',
    name: 'Bobsleigh',
    icon: 'tram-front',
    venue: 'Cortina Sliding Centre',
    territory: 'Cortina',
    category: 'dynamic',
    totalEvents: 4,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Women's Monobob Run 1",
    nextEventTime: '2026-02-10T09:30:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'cross-country-skiing',
    name: 'Cross-Country Skiing',
    icon: 'trees',
    venue: 'Tesero Stadium',
    territory: 'Tesero',
    category: 'endurance',
    totalEvents: 12,
    completedEvents: 1,
    status: 'completed',
    currentEvent: null,
    nextEvent: "Women's Sprint Qualification",
    nextEventTime: '2026-02-08T11:00:00+01:00',
    medals: { gold: 1, silver: 1, bronze: 1 },
  },
  {
    id: 'curling',
    name: 'Curling',
    icon: 'circle-dot',
    venue: 'Cortina Curling Stadium',
    territory: 'Cortina',
    category: 'precision',
    totalEvents: 3,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: 'Mixed Doubles Round Robin',
    nextEventTime: '2026-02-08T09:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'figure-skating',
    name: 'Figure Skating',
    icon: 'sparkles',
    venue: 'Milano Ice Skating Arena',
    territory: 'Milano',
    category: 'precision',
    totalEvents: 5,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: 'Team Event Short Program',
    nextEventTime: '2026-02-08T10:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'freestyle-skiing',
    name: 'Freestyle Skiing',
    icon: 'wind',
    venue: 'Livigno Snow Park / Aerials Park',
    territory: 'Livigno',
    category: 'style',
    totalEvents: 13,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Men's Moguls Qualification",
    nextEventTime: '2026-02-07T18:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'ice-hockey',
    name: 'Ice Hockey',
    icon: 'circle',
    venue: 'Santagiulia Arena / Rho Arena',
    territory: 'Milano',
    category: 'team',
    totalEvents: 2,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Women's Preliminary Round",
    nextEventTime: '2026-02-08T12:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'luge',
    name: 'Luge',
    icon: 'arrow-down-wide-narrow',
    venue: 'Cortina Sliding Centre',
    territory: 'Cortina',
    category: 'dynamic',
    totalEvents: 4,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Men's Singles Run 1",
    nextEventTime: '2026-02-08T10:30:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'nordic-combined',
    name: 'Nordic Combined',
    icon: 'mountain',
    venue: 'Predazzo / Tesero',
    territory: 'Predazzo / Tesero',
    category: 'endurance',
    totalEvents: 3,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Men's Individual Normal Hill",
    nextEventTime: '2026-02-11T10:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'short-track',
    name: 'Short Track',
    icon: 'timer',
    venue: 'Milano Ice Skating Arena',
    territory: 'Milano',
    category: 'style',
    totalEvents: 9,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: 'Mixed Team Relay Heats',
    nextEventTime: '2026-02-07T19:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    icon: 'arrow-down',
    venue: 'Cortina Sliding Centre',
    territory: 'Cortina',
    category: 'dynamic',
    totalEvents: 2,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Men's Skeleton Run 1",
    nextEventTime: '2026-02-12T09:30:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'ski-jumping',
    name: 'Ski Jumping',
    icon: 'plane-takeoff',
    venue: 'Predazzo Stadium',
    territory: 'Predazzo',
    category: 'precision',
    totalEvents: 5,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Women's Normal Hill Qualification",
    nextEventTime: '2026-02-07T16:30:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'ski-mountaineering',
    name: 'Ski Mountaineering',
    icon: 'mountain-snow',
    venue: 'Stelvio Ski Centre',
    territory: 'Bormio',
    category: 'endurance',
    totalEvents: 6,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: 'Mixed Relay',
    nextEventTime: '2026-02-10T09:00:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'snowboard',
    name: 'Snowboard',
    icon: 'snowflake',
    venue: 'Livigno Snow Park',
    territory: 'Livigno',
    category: 'style',
    totalEvents: 11,
    completedEvents: 0,
    status: 'upcoming',
    currentEvent: null,
    nextEvent: "Women's Slopestyle Qualification",
    nextEventTime: '2026-02-08T09:30:00+01:00',
    medals: { gold: 0, silver: 0, bronze: 0 },
  },
  {
    id: 'speed-skating',
    name: 'Speed Skating',
    icon: 'gauge',
    venue: 'Milano Speed Skating Stadium',
    territory: 'Milano',
    category: 'dynamic',
    totalEvents: 14,
    completedEvents: 1,
    status: 'completed',
    currentEvent: null,
    nextEvent: "Women's 3000m",
    nextEventTime: '2026-02-08T16:00:00+01:00',
    medals: { gold: 1, silver: 1, bronze: 1 },
  },
];

// Validate at module load in development
if (process.env.NODE_ENV === 'development') {
  SPORTS.forEach((sport, index) => {
    const result = LiveSportSchema.safeParse(sport);
    if (!result.success) {
      console.error(`Sport validation failed at index ${index}:`, result.error);
    }
  });
}

export function getSportById(id: string): LiveSport | undefined {
  return SPORTS.find((s) => s.id === id);
}

export function getSportsByStatus(status: LiveSport['status']): LiveSport[] {
  return SPORTS.filter((s) => s.status === status);
}

export function getSportsByCategory(
  category: LiveSport['category']
): LiveSport[] {
  return SPORTS.filter((s) => s.category === category);
}

export function getLiveSports(): LiveSport[] {
  return SPORTS.filter((s) => s.status === 'live');
}

export function getUpcomingSports(): LiveSport[] {
  return SPORTS.filter((s) => s.status === 'upcoming').sort((a, b) => {
    if (!a.nextEventTime) return 1;
    if (!b.nextEventTime) return -1;
    return (
      new Date(a.nextEventTime).getTime() - new Date(b.nextEventTime).getTime()
    );
  });
}
