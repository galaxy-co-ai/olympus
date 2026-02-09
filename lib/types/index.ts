/**
 * Core Type Definitions for Olympus
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section V: Content Reference (lines 1204-1243)
 * - Section VII F: Zod Schemas (lines 1543-1555)
 *
 * All external data is validated with Zod schemas.
 * These TypeScript types are derived from those schemas.
 */

import { z } from 'zod';

// =============================================================================
// OLYMPIC SPORTS
// =============================================================================

export const SportSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  venue: z.string(),
  territory: z.string(),
  eventCount: z.number(),
  isDebut: z.boolean().default(false),
  category: z.enum(['dynamic', 'precision', 'endurance', 'style', 'team']),
});

export type Sport = z.infer<typeof SportSchema>;

// =============================================================================
// VENUES
// =============================================================================

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  territory: z.string(),
  capacity: z.number().optional(),
  sports: z.array(z.string()),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  description: z.string().optional(),
  funFact: z.string().optional(),
});

export type Venue = z.infer<typeof VenueSchema>;

// =============================================================================
// COUNTRIES
// =============================================================================

export const CountrySchema = z.object({
  id: z.string(), // ISO 3166-1 alpha-3
  code: z.string(), // ISO 3166-1 alpha-2
  name: z.string(),
  flagUrl: z.string(),
  continent: z.enum([
    'africa',
    'asia',
    'europe',
    'north-america',
    'oceania',
    'south-america',
  ]),
});

export type Country = z.infer<typeof CountrySchema>;

// =============================================================================
// MEDALS
// =============================================================================

export const MedalTypeSchema = z.enum(['gold', 'silver', 'bronze']);

export type MedalType = z.infer<typeof MedalTypeSchema>;

export const MedalStandingsSchema = z.object({
  countryId: z.string(),
  gold: z.number(),
  silver: z.number(),
  bronze: z.number(),
  total: z.number(),
  rank: z.number(),
});

export type MedalStandings = z.infer<typeof MedalStandingsSchema>;

// =============================================================================
// EVENTS & SCHEDULE
// =============================================================================

export const EventStatusSchema = z.enum([
  'upcoming',
  'live',
  'completed',
  'delayed',
  'cancelled',
]);

export type EventStatus = z.infer<typeof EventStatusSchema>;

export const ScheduleEntrySchema = z.object({
  id: z.string(),
  sportId: z.string(),
  eventName: z.string(),
  venueId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  status: EventStatusSchema,
  isMedalEvent: z.boolean().default(false),
  broadcast: z.string().optional(),
});

export type ScheduleEntry = z.infer<typeof ScheduleEntrySchema>;

// =============================================================================
// ATHLETES
// =============================================================================

export const AthleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  countryId: z.string(),
  sports: z.array(z.string()),
  dateOfBirth: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  medals: z
    .object({
      gold: z.number().default(0),
      silver: z.number().default(0),
      bronze: z.number().default(0),
    })
    .optional(),
});

export type Athlete = z.infer<typeof AthleteSchema>;

// =============================================================================
// EVENT RESULTS
// =============================================================================

export const EventResultSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  sportId: z.string(),
  eventName: z.string(),
  status: EventStatusSchema,
  timestamp: z.string().datetime(),
  results: z.array(
    z.object({
      athleteId: z.string(),
      rank: z.number(),
      score: z.string().optional(),
      time: z.string().optional(),
      medal: MedalTypeSchema.optional(),
    })
  ),
});

export type EventResult = z.infer<typeof EventResultSchema>;

// =============================================================================
// DATA FRESHNESS
// =============================================================================

export const DataFreshnessSchema = z.object({
  source: z.string(),
  lastUpdated: z.string().datetime(),
  status: z.enum(['fresh', 'stale', 'fallback']),
});

export type DataFreshness = z.infer<typeof DataFreshnessSchema>;

// =============================================================================
// VIDEO SHOWCASE
// =============================================================================

export const VideoSchema = z.object({
  id: z.string(),
  youtubeId: z.string(),
  title: z.string(),
  sport: z.string(),
  duration: z.number(), // seconds
  thumbnail: z.string().url().optional(),
});

export type Video = z.infer<typeof VideoSchema>;

// =============================================================================
// AI RESPONSES
// =============================================================================

export const ClaudeInsightSchema = z.object({
  content: z.string(),
  elementType: z.string(),
  elementId: z.string(),
  generatedAt: z.string().datetime(),
});

export type ClaudeInsight = z.infer<typeof ClaudeInsightSchema>;

export const PerplexityResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string().url(),
    })
  ),
  followUpQuestions: z.array(z.string()).optional(),
});

export type PerplexityResponse = z.infer<typeof PerplexityResponseSchema>;
