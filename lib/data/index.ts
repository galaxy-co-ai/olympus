/**
 * Data Layer Barrel Export
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section III lines 1159-1167
 */

export {
  SPORTS,
  getSportById,
  getSportsByStatus,
  getSportsByCategory,
  getLiveSports,
  getUpcomingSports,
} from './sports';

export {
  MEDAL_STANDINGS,
  sortStandings,
  getStandingsWithRanks,
  getTopCountries,
  getTotalMedals,
} from './medals';

export {
  SCHEDULE,
  getEventsByDate,
  getEventsBySport,
  getTodaysEvents,
  getLiveEvents,
  getUpcomingMedalEvents,
  getUniqueVenues,
  getUniqueSports,
  getEventCountByDate,
} from './schedule';

export {
  VIDEOS,
  getVideoThumbnail,
  formatDuration,
} from './videos';

export {
  TICKER_ATHLETES,
  type TickerAthlete,
} from './athletes';
