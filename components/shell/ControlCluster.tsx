'use client';

/**
 * ControlCluster — Right-side controls in TopBar
 *
 * Contains:
 * - Country flag (from CountryProvider)
 * - Theme toggle
 * - Live indicator
 * - Drawer toggle
 */

import { Sun, Moon, PanelRight, PanelRightClose } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCountry, type CountryCode } from '@/components/theme';
import { useShellStore } from '@/lib/stores/shell-store';
import { cn } from '@/lib/utils';

// Country flags (emoji)
const COUNTRY_FLAGS: Record<string, string> = {
  usa: '🇺🇸',
  nor: '🇳🇴',
  jpn: '🇯🇵',
  sui: '🇨🇭',
  ger: '🇩🇪',
  fra: '🇫🇷',
  can: '🇨🇦',
  swe: '🇸🇪',
  kor: '🇰🇷',
  ita: '🇮🇹',
  aut: '🇦🇹',
  fin: '🇫🇮',
  ned: '🇳🇱',
  chn: '🇨🇳',
  aus: '🇦🇺',
};

// Country codes for cycling
const COUNTRY_CODES: CountryCode[] = [
  null, // Olympus default
  'usa',
  'nor',
  'jpn',
  'sui',
  'ger',
  'fra',
  'can',
  'swe',
  'kor',
  'ita',
  'aut',
  'fin',
  'ned',
  'chn',
  'aus',
];

export function ControlCluster() {
  const { setTheme, resolvedTheme } = useTheme();
  const { country, setCountry } = useCountry();
  const drawerOpen = useShellStore((s) => s.drawerOpen);
  const toggleDrawer = useShellStore((s) => s.toggleDrawer);

  const isDark = resolvedTheme === 'dark';
  const flag = country ? COUNTRY_FLAGS[country] || '🏔️' : '🏔️';

  // Simple country picker - cycles through countries
  const cycleCountry = () => {
    const currentIndex = COUNTRY_CODES.indexOf(country);
    const nextIndex = (currentIndex + 1) % COUNTRY_CODES.length;
    setCountry(COUNTRY_CODES[nextIndex]);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Live indicator */}
      <div
        className="flex items-center gap-1.5 px-2 py-1 rounded-full mr-2"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-live) 10%, transparent)',
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span
          className="font-medium uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--color-live)' }}
        >
          Live
        </span>
      </div>

      {/* Country picker */}
      <button
        onClick={cycleCountry}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-full',
          'transition-colors duration-150',
          'hover:bg-[var(--color-surface-hover)]'
        )}
        aria-label={`Current country: ${country || 'Olympus'}. Click to change.`}
        title="Change country"
      >
        <span className="text-lg">{flag}</span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-full',
          'transition-colors duration-150',
          'hover:bg-[var(--color-surface-hover)]'
        )}
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Drawer toggle */}
      <button
        onClick={toggleDrawer}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-full',
          'transition-colors duration-150',
          'hover:bg-[var(--color-surface-hover)]'
        )}
        style={{
          color: drawerOpen
            ? 'var(--country-accent-primary)'
            : 'var(--color-text-secondary)',
        }}
        aria-label={drawerOpen ? 'Close panel' : 'Open panel'}
        aria-expanded={drawerOpen}
      >
        {drawerOpen ? <PanelRightClose size={18} /> : <PanelRight size={18} />}
      </button>
    </div>
  );
}
