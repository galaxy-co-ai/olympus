/**
 * Enhanced Olympic Type Definitions
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 4: Sport Cards (lines 601-830)
 * - Section 5: Data Visualization & Medal Tracker (lines 833-874)
 * - Section VII F: Zod Schemas (lines 1543-1555)
 *
 * These are the live-data-aware schemas used for sport cards and medal tracking.
 */

import { z } from 'zod';

// =============================================================================
// SPORT STATUS (for live/upcoming/completed states)
// =============================================================================

export const SportStatusSchema = z.enum(['live', 'upcoming', 'completed']);
export type SportStatus = z.infer<typeof SportStatusSchema>;

export const SportCategorySchema = z.enum([
  'dynamic',
  'precision',
  'endurance',
  'style',
  'team',
]);
export type SportCategory = z.infer<typeof SportCategorySchema>;

// =============================================================================
// LIVE SPORT (enhanced for sport cards)
// =============================================================================

export const LiveSportSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(), // Lucide icon name
  venue: z.string(),
  territory: z.string(),
  category: SportCategorySchema,
  totalEvents: z.number(),
  completedEvents: z.number(),
  status: SportStatusSchema,
  currentEvent: z.string().nullable(),
  nextEvent: z.string().nullable(),
  nextEventTime: z.string().nullable(), // ISO 8601
  medals: z.object({
    gold: z.number(),
    silver: z.number(),
    bronze: z.number(),
  }),
});

export type LiveSport = z.infer<typeof LiveSportSchema>;

// =============================================================================
// COUNTRY (with medals)
// =============================================================================

export const CountryMedalsSchema = z.object({
  code: z.string(), // ISO 3166-1 alpha-3
  name: z.string(),
  flag: z.string(), // emoji
  medals: z.object({
    gold: z.number(),
    silver: z.number(),
    bronze: z.number(),
    total: z.number(),
  }),
  rank: z.number(),
});

export type CountryMedals = z.infer<typeof CountryMedalsSchema>;

export const MedalStandingsArraySchema = z.array(CountryMedalsSchema);

// =============================================================================
// SCHEDULE EVENT
// =============================================================================

export const ScheduleEventStatusSchema = z.enum([
  'upcoming',
  'live',
  'completed',
]);

export const ScheduleEventSchema = z.object({
  id: z.string(),
  date: z.string(), // YYYY-MM-DD
  time: z.string(), // HH:MM (24h CET)
  sport: z.string(), // matches sport id
  event: z.string(), // event name
  venue: z.string(),
  status: ScheduleEventStatusSchema,
  result: z.string().nullable(),
  isMedalEvent: z.boolean().default(true),
});

export type ScheduleEvent = z.infer<typeof ScheduleEventSchema>;

// =============================================================================
// ATHLETE (enhanced)
// =============================================================================

export const AthleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(), // ISO code
  sport: z.string(), // sport id
  events: z.array(z.string()),
  medals: z.object({
    gold: z.number(),
    silver: z.number(),
    bronze: z.number(),
  }),
  bio: z.string().nullable(),
});

export type Athlete = z.infer<typeof AthleteSchema>;

// =============================================================================
// VENUE
// =============================================================================

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  sports: z.array(z.string()), // sport ids
  capacity: z.number().nullable(),
});

export type Venue = z.infer<typeof VenueSchema>;

// =============================================================================
// COUNTRY THEME
// =============================================================================

export const CountryThemeSchema = z.object({
  accentPrimary: z.string(),
  accentSecondary: z.string().nullable(),
  accentMuted: z.string(),
  accentSurface: z.string(),
  accentGlow: z.string(),
});

export type CountryTheme = z.infer<typeof CountryThemeSchema>;
