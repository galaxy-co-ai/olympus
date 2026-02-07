'use client';

/**
 * Country Theme Provider for Olympus
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 3: Country Vibe System (lines 274-598)
 * - Section 3: Country Selection UX (lines 441-470)
 *
 * This provider manages the country accent system:
 * - Stores selected country in localStorage
 * - Applies data-country attribute to document root
 * - Provides context for country selector UI
 *
 * Per the constitution:
 * - Default state (no country) uses pure Olympus theme
 * - Theme changes are CSS-only (no React re-renders for colors)
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

// ISO 3166-1 alpha-3 country codes for participating nations
export type CountryCode =
  | 'usa'
  | 'nor'
  | 'jpn'
  | 'sui'
  | 'ger'
  | 'fra'
  | 'can'
  | 'swe'
  | 'kor'
  | 'ita'
  | 'aut'
  | 'fin'
  | 'ned'
  | 'chn'
  | 'aus'
  | null; // null = pure Olympus, no country accent

interface CountryContextValue {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  clearCountry: () => void;
}

const CountryContext = createContext<CountryContextValue | undefined>(undefined);

const STORAGE_KEY = 'olympus-country';

interface CountryProviderProps {
  children: ReactNode;
  defaultCountry?: CountryCode;
}

export function CountryProvider({
  children,
  defaultCountry = null,
}: CountryProviderProps) {
  const [country, setCountryState] = useState<CountryCode>(defaultCountry);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCountryState(stored as CountryCode);
    }
  }, []);

  // Apply data-country attribute to document root
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (country) {
      root.setAttribute('data-country', country);
    } else {
      root.removeAttribute('data-country');
    }
  }, [country, mounted]);

  const setCountry = useCallback((newCountry: CountryCode) => {
    setCountryState(newCountry);
    if (newCountry) {
      localStorage.setItem(STORAGE_KEY, newCountry);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const clearCountry = useCallback(() => {
    setCountry(null);
  }, [setCountry]);

  return (
    <CountryContext.Provider value={{ country, setCountry, clearCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry(): CountryContextValue {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
