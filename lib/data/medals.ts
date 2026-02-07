/**
 * Medal Standings — Day 2 (February 7, 2026)
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 5: Data Visualization & Medal Tracker (lines 833-874)
 *
 * Day 2 realistic data:
 * - 3 medal events completed (Mixed Relay, Skiathlon, 5000m)
 * - Total: 9 medals awarded (3 gold, 3 silver, 3 bronze)
 * - Norway and Germany typically lead early
 */

import {
  MedalStandingsArraySchema,
  type CountryMedals,
} from '@/lib/types/olympics';

export const MEDAL_STANDINGS: CountryMedals[] = [
  {
    code: 'NOR',
    name: 'Norway',
    flag: '🇳🇴',
    medals: { gold: 2, silver: 1, bronze: 0, total: 3 },
    rank: 1,
  },
  {
    code: 'GER',
    name: 'Germany',
    flag: '🇩🇪',
    medals: { gold: 1, silver: 1, bronze: 1, total: 3 },
    rank: 2,
  },
  {
    code: 'NED',
    name: 'Netherlands',
    flag: '🇳🇱',
    medals: { gold: 0, silver: 1, bronze: 1, total: 2 },
    rank: 3,
  },
  {
    code: 'SWE',
    name: 'Sweden',
    flag: '🇸🇪',
    medals: { gold: 0, silver: 0, bronze: 1, total: 1 },
    rank: 4,
  },
  {
    code: 'USA',
    name: 'United States',
    flag: '🇺🇸',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'CAN',
    name: 'Canada',
    flag: '🇨🇦',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'SUI',
    name: 'Switzerland',
    flag: '🇨🇭',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'AUT',
    name: 'Austria',
    flag: '🇦🇹',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'FRA',
    name: 'France',
    flag: '🇫🇷',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'ITA',
    name: 'Italy',
    flag: '🇮🇹',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'JPN',
    name: 'Japan',
    flag: '🇯🇵',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'KOR',
    name: 'South Korea',
    flag: '🇰🇷',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'CHN',
    name: 'China',
    flag: '🇨🇳',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'FIN',
    name: 'Finland',
    flag: '🇫🇮',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'AUS',
    name: 'Australia',
    flag: '🇦🇺',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'RUS',
    name: 'ROC',
    flag: '🏳️',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'GBR',
    name: 'Great Britain',
    flag: '🇬🇧',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'CZE',
    name: 'Czech Republic',
    flag: '🇨🇿',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'POL',
    name: 'Poland',
    flag: '🇵🇱',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'SLO',
    name: 'Slovenia',
    flag: '🇸🇮',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'BEL',
    name: 'Belgium',
    flag: '🇧🇪',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'ESP',
    name: 'Spain',
    flag: '🇪🇸',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'NZL',
    name: 'New Zealand',
    flag: '🇳🇿',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'SVK',
    name: 'Slovakia',
    flag: '🇸🇰',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
  {
    code: 'LAT',
    name: 'Latvia',
    flag: '🇱🇻',
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
    rank: 5,
  },
];

// Validate in development
if (process.env.NODE_ENV === 'development') {
  const result = MedalStandingsArraySchema.safeParse(MEDAL_STANDINGS);
  if (!result.success) {
    console.error('Medal standings validation failed:', result.error);
  }
}

/**
 * Sort standings by Olympic rules: gold → silver → bronze → country name
 */
export function sortStandings(standings: CountryMedals[]): CountryMedals[] {
  return [...standings].sort((a, b) => {
    // First by gold
    if (a.medals.gold !== b.medals.gold) {
      return b.medals.gold - a.medals.gold;
    }
    // Then silver
    if (a.medals.silver !== b.medals.silver) {
      return b.medals.silver - a.medals.silver;
    }
    // Then bronze
    if (a.medals.bronze !== b.medals.bronze) {
      return b.medals.bronze - a.medals.bronze;
    }
    // Finally alphabetically
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get standings with computed ranks
 */
export function getStandingsWithRanks(): CountryMedals[] {
  const sorted = sortStandings(MEDAL_STANDINGS);
  let currentRank = 1;
  let previousMedals = { gold: -1, silver: -1, bronze: -1 };

  return sorted.map((country, index) => {
    const isSameMedals =
      country.medals.gold === previousMedals.gold &&
      country.medals.silver === previousMedals.silver &&
      country.medals.bronze === previousMedals.bronze;

    if (!isSameMedals) {
      currentRank = index + 1;
    }

    previousMedals = { ...country.medals };

    return { ...country, rank: currentRank };
  });
}

/**
 * Get top N countries
 */
export function getTopCountries(n: number = 10): CountryMedals[] {
  return getStandingsWithRanks().slice(0, n);
}

/**
 * Get total medals across all countries
 */
export function getTotalMedals(): {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
} {
  return MEDAL_STANDINGS.reduce(
    (acc, country) => ({
      gold: acc.gold + country.medals.gold,
      silver: acc.silver + country.medals.silver,
      bronze: acc.bronze + country.medals.bronze,
      total: acc.total + country.medals.total,
    }),
    { gold: 0, silver: 0, bronze: 0, total: 0 }
  );
}
