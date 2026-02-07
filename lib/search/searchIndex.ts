/**
 * Search Index Builder
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Builds unified search index from all Olympic data
 * - Pages, sports, countries, events, venues
 */

import { SPORTS, MEDAL_STANDINGS, SCHEDULE, getUniqueVenues } from '@/lib/data';
import type { SearchableItem } from '@/lib/types/search';

/**
 * Alternative names / keywords for better fuzzy matching
 */
const SPORT_ALIASES: Record<string, string[]> = {
  'alpine-skiing': ['downhill', 'slalom', 'giant slalom', 'super-g', 'combined'],
  'biathlon': ['rifle', 'shooting', 'skiing'],
  'bobsleigh': ['bobsled', 'sled'],
  'cross-country-skiing': ['xc', 'nordic', 'skiathlon', 'distance'],
  'curling': ['stones', 'ice'],
  'figure-skating': ['ice skating', 'pairs', 'ice dance', 'singles'],
  'freestyle-skiing': ['moguls', 'aerials', 'halfpipe', 'slopestyle', 'ski cross'],
  'ice-hockey': ['hockey', 'puck'],
  'luge': ['sled', 'sliding'],
  'nordic-combined': ['ski jumping', 'cross country'],
  'short-track': ['speed skating', 'relay'],
  'skeleton': ['sled', 'sliding', 'headfirst'],
  'ski-jumping': ['jumping', 'hill', 'flying'],
  'snowboard': ['halfpipe', 'slopestyle', 'cross', 'big air', 'parallel'],
  'speed-skating': ['long track', 'oval'],
};

const COUNTRY_ALIASES: Record<string, string[]> = {
  USA: ['united states', 'america', 'us'],
  GBR: ['great britain', 'uk', 'united kingdom', 'england'],
  NOR: ['norway', 'norwegian'],
  GER: ['germany', 'german'],
  CAN: ['canada', 'canadian'],
  SWE: ['sweden', 'swedish'],
  NED: ['netherlands', 'dutch', 'holland'],
  SUI: ['switzerland', 'swiss'],
  AUT: ['austria', 'austrian'],
  FRA: ['france', 'french'],
  ITA: ['italy', 'italian'],
  JPN: ['japan', 'japanese'],
  CHN: ['china', 'chinese'],
  KOR: ['korea', 'south korea', 'korean'],
  FIN: ['finland', 'finnish'],
  RUS: ['russia', 'russian', 'roc'],
  AUS: ['australia', 'australian'],
};

/**
 * Build the complete search index
 */
export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  // ============================================================================
  // PAGES (always present)
  // ============================================================================
  items.push(
    {
      id: 'page-home',
      type: 'page',
      title: 'Home',
      href: '/',
      keywords: ['dashboard', 'landing', 'main', 'start'],
      icon: 'Home',
    },
    {
      id: 'page-sports',
      type: 'page',
      title: 'Sports',
      href: '/sports',
      keywords: ['disciplines', 'events', 'all sports', 'browse'],
      icon: 'LayoutGrid',
    },
    {
      id: 'page-schedule',
      type: 'page',
      title: 'Schedule',
      href: '/schedule',
      keywords: ['calendar', 'timeline', 'today', 'tomorrow', 'when'],
      icon: 'Calendar',
    },
    {
      id: 'page-medals',
      type: 'page',
      title: 'Medal Standings',
      href: '/medals',
      keywords: ['leaderboard', 'rankings', 'table', 'countries', 'gold'],
      icon: 'Trophy',
    },
    {
      id: 'page-stories',
      type: 'page',
      title: 'Stories',
      href: '/stories',
      keywords: ['news', 'articles', 'highlights', 'features'],
      icon: 'Newspaper',
    }
  );

  // ============================================================================
  // SPORTS
  // ============================================================================
  SPORTS.forEach((sport) => {
    const aliases = SPORT_ALIASES[sport.id] || [];
    items.push({
      id: `sport-${sport.id}`,
      type: 'sport',
      title: sport.name,
      subtitle: sport.venue,
      href: `/sports/${sport.id}`,
      keywords: [sport.venue, sport.territory, sport.category, ...aliases],
      icon: sport.icon,
      meta: {
        status: sport.status,
      },
    });
  });

  // ============================================================================
  // COUNTRIES
  // ============================================================================
  MEDAL_STANDINGS.forEach((country) => {
    const aliases = COUNTRY_ALIASES[country.code] || [];
    const medalString =
      country.medals.total > 0
        ? `${country.medals.gold}G ${country.medals.silver}S ${country.medals.bronze}B`
        : 'No medals yet';

    items.push({
      id: `country-${country.code}`,
      type: 'country',
      title: country.name,
      subtitle: medalString,
      href: '/medals',
      keywords: [country.code.toLowerCase(), ...aliases],
      icon: country.flag,
      meta: {
        flag: country.flag,
        medals: medalString,
      },
    });
  });

  // ============================================================================
  // VENUES (unique from sports data)
  // ============================================================================
  const venues = getUniqueVenues();
  venues.forEach((venue) => {
    // Find which sports use this venue
    const sportsAtVenue = SPORTS.filter((s) => s.venue.includes(venue));
    const sportNames = sportsAtVenue.map((s) => s.name).slice(0, 2);

    items.push({
      id: `venue-${venue.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'venue',
      title: venue,
      subtitle: sportNames.length > 0 ? sportNames.join(', ') : undefined,
      href: '/schedule',
      keywords: [
        ...venue.toLowerCase().split(' '),
        ...sportsAtVenue.map((s) => s.name.toLowerCase()),
      ],
      icon: 'MapPin',
    });
  });

  // ============================================================================
  // EVENTS (today + tomorrow only to keep index small)
  // ============================================================================
  const today = '2026-02-07'; // Simulated Day 2
  const tomorrow = '2026-02-08';
  const relevantEvents = SCHEDULE.filter(
    (e) => e.date === today || e.date === tomorrow
  ).slice(0, 30); // Cap at 30 events

  relevantEvents.forEach((event) => {
    const sport = SPORTS.find((s) => s.id === event.sport);
    items.push({
      id: `event-${event.id}`,
      type: 'event',
      title: event.event,
      subtitle: `${event.date} · ${event.time} · ${event.venue}`,
      href: '/schedule',
      keywords: [
        event.sport,
        sport?.name || '',
        event.venue,
        event.date,
        event.isMedalEvent ? 'medal' : '',
      ].filter(Boolean),
      icon: sport?.icon || 'circle',
      meta: {
        status: event.status,
      },
    });
  });

  return items;
}
