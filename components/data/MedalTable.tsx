'use client';

/**
 * Medal Table Component
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 5 (lines 833-874)
 *
 * Sortable country leaderboard with:
 * - Animated count-up on mount
 * - Horizontal stacked medal bar
 * - Row hover with country accent
 * - Click to expand (placeholder)
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CountryMedals } from '@/lib/types/olympics';

interface MedalTableProps {
  standings: CountryMedals[];
  limit?: number;
}

type SortKey = 'rank' | 'gold' | 'silver' | 'bronze' | 'total';
type SortDirection = 'asc' | 'desc';

/**
 * Animated number component
 */
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <motion.span
      className="tabular-nums"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        delay: delay / 1000,
      }}
    >
      {value}
    </motion.span>
  );
}

/**
 * Medal bar visualization
 */
function MedalBar({
  gold,
  silver,
  bronze,
  maxTotal,
}: {
  gold: number;
  silver: number;
  bronze: number;
  maxTotal: number;
}) {
  const total = gold + silver + bronze;
  if (total === 0 || maxTotal === 0) {
    return (
      <div
        className="h-2 w-full rounded-full"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
    );
  }

  const width = (total / maxTotal) * 100;
  const goldPercent = (gold / total) * 100;
  const silverPercent = (silver / total) * 100;
  const bronzePercent = (bronze / total) * 100;

  return (
    <div
      className="h-2 overflow-hidden rounded-full"
      style={{
        width: `${width}%`,
        minWidth: '24px',
      }}
    >
      <div className="flex h-full">
        {gold > 0 && (
          <div
            style={{
              width: `${goldPercent}%`,
              backgroundColor: 'var(--color-gold)',
            }}
          />
        )}
        {silver > 0 && (
          <div
            style={{
              width: `${silverPercent}%`,
              backgroundColor: 'var(--color-silver)',
            }}
          />
        )}
        {bronze > 0 && (
          <div
            style={{
              width: `${bronzePercent}%`,
              backgroundColor: 'var(--color-bronze)',
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Sort indicator
 */
function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  if (!active) return null;
  return direction === 'asc' ? (
    <ChevronUp className="h-3 w-3" />
  ) : (
    <ChevronDown className="h-3 w-3" />
  );
}

export function MedalTable({ standings, limit }: MedalTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Sort standings
  const sortedStandings = useMemo(() => {
    const sorted = [...standings].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'gold':
          comparison = b.medals.gold - a.medals.gold;
          break;
        case 'silver':
          comparison = b.medals.silver - a.medals.silver;
          break;
        case 'bronze':
          comparison = b.medals.bronze - a.medals.bronze;
          break;
        case 'total':
          comparison = b.medals.total - a.medals.total;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return limit ? sorted.slice(0, limit) : sorted;
  }, [standings, sortKey, sortDirection, limit]);

  // Max total for bar scaling
  const maxTotal = Math.max(...standings.map((s) => s.medals.total), 1);

  // Toggle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection(key === 'rank' ? 'asc' : 'desc');
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full border-collapse"
        aria-label="Olympic medal standings"
      >
        <thead>
          <tr
            className="border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {/* Rank */}
            <th
              scope="col"
              className="cursor-pointer px-3 py-3 text-left"
              onClick={() => handleSort('rank')}
              aria-sort={
                sortKey === 'rank'
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              <div
                className="flex items-center gap-1"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                #
                <SortIndicator
                  active={sortKey === 'rank'}
                  direction={sortDirection}
                />
              </div>
            </th>

            {/* Country */}
            <th
              scope="col"
              className="px-3 py-3 text-left"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              Country
            </th>

            {/* Gold */}
            <th
              scope="col"
              className="cursor-pointer px-3 py-3 text-center"
              onClick={() => handleSort('gold')}
              aria-sort={
                sortKey === 'gold'
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              <div
                className="flex items-center justify-center gap-1"
                style={{ color: 'var(--color-gold)' }}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
                <SortIndicator
                  active={sortKey === 'gold'}
                  direction={sortDirection}
                />
              </div>
            </th>

            {/* Silver */}
            <th
              scope="col"
              className="cursor-pointer px-3 py-3 text-center"
              onClick={() => handleSort('silver')}
              aria-sort={
                sortKey === 'silver'
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              <div
                className="flex items-center justify-center gap-1"
                style={{ color: 'var(--color-silver)' }}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-silver)' }}
                />
                <SortIndicator
                  active={sortKey === 'silver'}
                  direction={sortDirection}
                />
              </div>
            </th>

            {/* Bronze */}
            <th
              scope="col"
              className="cursor-pointer px-3 py-3 text-center"
              onClick={() => handleSort('bronze')}
              aria-sort={
                sortKey === 'bronze'
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              <div
                className="flex items-center justify-center gap-1"
                style={{ color: 'var(--color-bronze)' }}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-bronze)' }}
                />
                <SortIndicator
                  active={sortKey === 'bronze'}
                  direction={sortDirection}
                />
              </div>
            </th>

            {/* Total */}
            <th
              scope="col"
              className="cursor-pointer px-3 py-3 text-center"
              onClick={() => handleSort('total')}
              aria-sort={
                sortKey === 'total'
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
            >
              <div
                className="flex items-center justify-center gap-1"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Total
                <SortIndicator
                  active={sortKey === 'total'}
                  direction={sortDirection}
                />
              </div>
            </th>

            {/* Medal Bar (hidden on mobile) */}
            <th
              scope="col"
              className="hidden px-3 py-3 text-left md:table-cell"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              <span className="sr-only">Medal distribution</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedStandings.map((country, index) => (
            <motion.tr
              key={country.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                delay: index * 0.03,
              }}
              className={cn(
                'cursor-pointer border-b transition-colors duration-150',
                expandedRow === country.code &&
                  'bg-[var(--country-accent-surface)]'
              )}
              style={{ borderColor: 'var(--color-border)' }}
              onClick={() =>
                setExpandedRow((r) =>
                  r === country.code ? null : country.code
                )
              }
              // Apply country-specific hover via inline style
              onMouseEnter={(e) => {
                if (expandedRow !== country.code) {
                  e.currentTarget.style.backgroundColor =
                    'var(--color-surface-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (expandedRow !== country.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Rank */}
              <td
                className="px-3 py-3 text-right tabular-nums"
                style={{
                  fontSize: 'var(--text-data)',
                  color: 'var(--color-text-muted)',
                  width: '48px',
                }}
              >
                <AnimatedNumber value={country.rank} delay={index * 30} />
              </td>

              {/* Country */}
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{country.flag}</span>
                  <span
                    className="font-medium"
                    style={{
                      fontSize: 'var(--text-data)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {country.name}
                  </span>
                </div>
              </td>

              {/* Gold */}
              <td
                className="px-3 py-3 text-center tabular-nums"
                style={{ fontSize: 'var(--text-data)' }}
              >
                <AnimatedNumber
                  value={country.medals.gold}
                  delay={index * 30 + 50}
                />
              </td>

              {/* Silver */}
              <td
                className="px-3 py-3 text-center tabular-nums"
                style={{ fontSize: 'var(--text-data)' }}
              >
                <AnimatedNumber
                  value={country.medals.silver}
                  delay={index * 30 + 100}
                />
              </td>

              {/* Bronze */}
              <td
                className="px-3 py-3 text-center tabular-nums"
                style={{ fontSize: 'var(--text-data)' }}
              >
                <AnimatedNumber
                  value={country.medals.bronze}
                  delay={index * 30 + 150}
                />
              </td>

              {/* Total */}
              <td
                className="px-3 py-3 text-center font-semibold tabular-nums"
                style={{ fontSize: 'var(--text-data)' }}
              >
                <AnimatedNumber
                  value={country.medals.total}
                  delay={index * 30 + 200}
                />
              </td>

              {/* Medal Bar (hidden on mobile) */}
              <td className="hidden w-32 px-3 py-3 md:table-cell">
                <MedalBar
                  gold={country.medals.gold}
                  silver={country.medals.silver}
                  bronze={country.medals.bronze}
                  maxTotal={maxTotal}
                />
              </td>
            </motion.tr>
          ))}

          {/* Expanded row content */}
          <AnimatePresence>
            {expandedRow && (
              <motion.tr
                key={`${expandedRow}-expanded`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td
                  colSpan={7}
                  className="px-3 py-6"
                  style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <Trophy
                      size={32}
                      style={{ color: 'var(--color-text-muted)' }}
                    />
                    <p
                      style={{
                        fontSize: 'var(--text-small)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Athlete medal breakdown — coming soon
                    </p>
                  </div>
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
