/**
 * Country Theme Definitions
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 3: Country Vibe System (lines 395-438)
 *
 * These match the CSS custom property overrides in globals.css.
 * Used for programmatic access (data viz, icons, etc.)
 */

import type { CountryTheme } from '@/lib/types/olympics';

/**
 * Helper to compute surface (8% opacity) and glow (20% opacity) values
 */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function computeMuted(hex: string): string {
  // Desaturate and lighten for muted variant
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Blend with gray (desaturate 40%) and lighten to 70%
  const gray = 180;
  const factor = 0.6;
  const nr = Math.round(r * factor + gray * (1 - factor));
  const ng = Math.round(g * factor + gray * (1 - factor));
  const nb = Math.round(b * factor + gray * (1 - factor));

  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

function createTheme(
  primary: string,
  secondary: string | null = null
): CountryTheme {
  return {
    accentPrimary: primary,
    accentSecondary: secondary,
    accentMuted: computeMuted(primary),
    accentSurface: hexToRgba(primary, 0.08),
    accentGlow: hexToRgba(primary, 0.2),
  };
}

export const COUNTRY_THEMES: Record<string, CountryTheme> = {
  // USA — Old Glory Red & Blue
  usa: createTheme('#B22234', '#3C3B6E'),

  // Norway — Norwegian Red & Blue
  nor: createTheme('#BA0C2F', '#00205B'),

  // Japan — Hinomaru Red (monochrome)
  jpn: createTheme('#BC002D', null),

  // Switzerland — Swiss Red (monochrome)
  sui: createTheme('#DA291C', null),

  // Germany — German Red & Gold
  ger: createTheme('#DD0000', '#FFCC00'),

  // France — French Blue & Red
  fra: createTheme('#002395', '#ED2939'),

  // Canada — Maple Red (monochrome)
  can: createTheme('#FF0000', null),

  // Sweden — Swedish Blue & Yellow
  swe: createTheme('#004B87', '#FECC02'),

  // South Korea — Taegeuk Red & Blue
  kor: createTheme('#CD2E3A', '#0047A0'),

  // Italy (host) — Italian Green & Red
  ita: createTheme('#009246', '#CE2B37'),

  // Brazil — Brazilian Green & Yellow
  bra: createTheme('#009739', '#FEDD00'),

  // Austria — Austrian Red (monochrome)
  aut: createTheme('#ED2939', null),

  // Finland — Finnish Blue (monochrome)
  fin: createTheme('#003580', null),

  // Netherlands — Dutch Red & Blue
  ned: createTheme('#AE1C28', '#21468B'),

  // China — PRC Red & Yellow
  chn: createTheme('#EE1C25', '#FFFF00'),
};

/**
 * Get theme for a country code
 * Falls back to Olympus glacier/dolomite if not found
 */
export function getCountryTheme(code: string): CountryTheme {
  return (
    COUNTRY_THEMES[code.toLowerCase()] ?? {
      accentPrimary: '#7BA7C2', // olympus-glacier
      accentSecondary: '#D4A574', // olympus-dolomite
      accentMuted: '#B8D4E3',
      accentSurface: 'rgba(123, 167, 194, 0.08)',
      accentGlow: 'rgba(123, 167, 194, 0.20)',
    }
  );
}

/**
 * List of all available country codes
 */
export const AVAILABLE_COUNTRIES = Object.keys(COUNTRY_THEMES);
