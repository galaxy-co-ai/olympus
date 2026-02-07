import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, CountryProvider } from '@/components/theme';
import { DesktopNav, MobileNav } from '@/components/nav';
import './globals.css';

/**
 * Root Layout for Olympus
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section III: Technical Constitution (lines 1088-1168)
 * - Section 11: Typography System (lines 1008-1045)
 * - Section I: Quality Bar (lines 39-90)
 *
 * Fonts:
 * - Inter Variable for body text, UI elements, data
 * - Self-hosted for performance (subsetted via next/font)
 *
 * Theme:
 * - next-themes with data-theme attribute (not class)
 * - disableTransitionOnChange per Rauno's rule
 *
 * Country:
 * - CountryProvider applies data-country attribute
 * - CSS handles all accent color changes
 */

// Inter Variable — primary sans-serif
// Reference: Section 11 line 1015
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // font-display: swap for body
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Olympus — Milan Cortina 2026 Winter Olympics',
    template: '%s | Olympus',
  },
  description:
    'A design-forward web experience for the 2026 Winter Olympics. Every component is a craft challenge inspired by the world\'s best design engineers.',
  keywords: [
    'Olympics',
    'Winter Olympics',
    'Milan Cortina 2026',
    '2026 Olympics',
    'Olympic Games',
    'Winter Sports',
    'Alpine Skiing',
    'Figure Skating',
    'Ice Hockey',
    'Medal Tracker',
  ],
  authors: [{ name: 'GalaxyCo.ai' }],
  creator: 'GalaxyCo.ai',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Olympus',
    title: 'Olympus — Milan Cortina 2026 Winter Olympics',
    description:
      'A design-forward web experience for the 2026 Winter Olympics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olympus — Milan Cortina 2026 Winter Olympics',
    description:
      'A design-forward web experience for the 2026 Winter Olympics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F6F3' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1816' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <CountryProvider>
            {/* Skip to content link — first focusable element per Section 2 line 251 */}
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>

            {/* Navigation - outside main, never unmounts */}
            <DesktopNav />
            <MobileNav />

            {/* Main content wrapper */}
            <div className="relative min-h-screen">
              {/* Bottom padding for mobile nav spacing */}
              <main id="main-content" className="pb-20 md:pb-0">
                {children}
              </main>
            </div>
          </CountryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
