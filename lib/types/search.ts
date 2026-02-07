/**
 * Search Types
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 8
 * - Unified search across sports, countries, events, venues, pages
 * - Recent searches persisted in localStorage
 */

import { z } from 'zod';

// =============================================================================
// SEARCHABLE ITEM
// =============================================================================

export const SearchableItemTypeSchema = z.enum([
  'page',
  'sport',
  'country',
  'event',
  'venue',
]);

export type SearchableItemType = z.infer<typeof SearchableItemTypeSchema>;

export const SearchableItemSchema = z.object({
  id: z.string(),
  type: SearchableItemTypeSchema,
  title: z.string(),
  subtitle: z.string().optional(),
  keywords: z.array(z.string()),
  href: z.string(),
  icon: z.string().optional(),
  meta: z
    .object({
      status: z.string().optional(),
      medals: z.string().optional(),
      flag: z.string().optional(),
    })
    .optional(),
});

export type SearchableItem = z.infer<typeof SearchableItemSchema>;

// =============================================================================
// RECENT SEARCH
// =============================================================================

export const RecentSearchSchema = z.object({
  query: z.string(),
  href: z.string(),
  title: z.string(),
  timestamp: z.number(),
});

export type RecentSearch = z.infer<typeof RecentSearchSchema>;

export const RecentSearchesSchema = z.array(RecentSearchSchema);

// =============================================================================
// GROUPED RESULTS
// =============================================================================

export type GroupedResults = Partial<Record<SearchableItemType, SearchableItem[]>>;
