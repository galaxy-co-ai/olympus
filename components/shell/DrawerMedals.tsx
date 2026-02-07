'use client';

/**
 * DrawerMedals — Medals tab content in RightDrawer
 *
 * Adapted from MedalsPanel for drawer layout
 * Shows compact medal standings
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getTopCountries, getTotalMedals } from '@/lib/data';

const COUNTRY_FLAGS: Record<string, string> = {
  NOR: '🇳🇴',
  GER: '🇩🇪',
  NED: '🇳🇱',
  SWE: '🇸🇪',
  USA: '🇺🇸',
  CAN: '🇨🇦',
  SUI: '🇨🇭',
  AUT: '🇦🇹',
  FRA: '🇫🇷',
  ITA: '🇮🇹',
  JPN: '🇯🇵',
  KOR: '🇰🇷',
  CHN: '🇨🇳',
  FIN: '🇫🇮',
  AUS: '🇦🇺',
};

const GAMES_START = new Date('2026-02-06');

function getGamesDay(): number {
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - GAMES_START.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(1, Math.min(diff + 1, 17));
}

export function DrawerMedals() {
  const topCountries = getTopCountries(8);
  const { total, gold } = getTotalMedals();
  const gamesDay = getGamesDay();

  return (
    <div
      className="space-y-4"
      role="tabpanel"
      id="panel-medals"
      aria-labelledby="tab-medals"
    >
      {/* Summary */}
      <div
        className="tabular-nums"
        style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}
      >
        Day {gamesDay} · {total} medals ({gold} gold)
      </div>

      {/* Standings table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid var(--color-border)' }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-[auto_1fr_32px_32px_32px_40px] gap-2 px-3 py-2 text-center"
          style={{
            fontSize: '10px',
            color: 'var(--color-text-muted)',
            backgroundColor: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <span className="w-5">#</span>
          <span className="text-left">Country</span>
          <span style={{ color: 'var(--color-gold)' }}>G</span>
          <span style={{ color: 'var(--color-silver)' }}>S</span>
          <span style={{ color: 'var(--color-bronze)' }}>B</span>
          <span>Total</span>
        </div>

        {/* Rows */}
        {topCountries.map((country, index) => (
          <Link
            key={country.code}
            href={`/countries/${country.code.toLowerCase()}`}
            className="grid grid-cols-[auto_1fr_32px_32px_32px_40px] gap-2 px-3 py-2.5 items-center
              transition-colors duration-150 hover:bg-[var(--color-surface-hover)]"
            style={{
              fontSize: 'var(--text-small)',
              borderBottom:
                index < topCountries.length - 1
                  ? '1px solid var(--color-border)'
                  : 'none',
            }}
          >
            <span
              className="w-5 text-center tabular-nums"
              style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}
            >
              {country.rank}
            </span>
            <span className="flex items-center gap-2 min-w-0">
              <span>{COUNTRY_FLAGS[country.code] || country.flag}</span>
              <span
                className="truncate"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {country.name}
              </span>
            </span>
            <span
              className="text-center tabular-nums font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {country.medals.gold}
            </span>
            <span
              className="text-center tabular-nums"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {country.medals.silver}
            </span>
            <span
              className="text-center tabular-nums"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {country.medals.bronze}
            </span>
            <span
              className="text-center tabular-nums font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {country.medals.total}
            </span>
          </Link>
        ))}
      </div>

      {/* Link to full standings */}
      <Link
        href="/medals"
        className="inline-flex items-center gap-1 transition-colors"
        style={{
          fontSize: '12px',
          color: 'var(--country-accent-primary)',
        }}
      >
        Full standings
        <ChevronRight size={12} />
      </Link>
    </div>
  );
}
