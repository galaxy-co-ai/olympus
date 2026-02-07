import Link from 'next/link';
import { OlympicRingsFooter } from './OlympicRingsFooter';
import { cn } from '@/lib/utils';

/**
 * Footer Component
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 13
 * - Olympic Rings (decorative)
 * - Credits (Built with Claude Code + GalaxyCo.ai)
 * - Colophon (typography, stack, inspiration)
 * - Links (Olympics.com, IOC, Milan Cortina 2026)
 * - Legal (© 2026, disclaimer)
 *
 * Full-width with centered content. Responsive layout.
 */

const EXTERNAL_LINKS = [
  { label: 'Olympics.com', href: 'https://olympics.com' },
  { label: 'IOC', href: 'https://ioc.org' },
  { label: 'Milan Cortina 2026', href: 'https://milanocortina2026.org' },
];

const COLOPHON = {
  typography: 'Inter Variable',
  stack: 'Next.js 16, Tailwind v4, Framer Motion',
  inspiration: 'Rauno Freiberg, Linear, Vercel',
};

export function Footer() {
  return (
    <footer
      className={cn(
        'w-full mt-auto',
        'border-t border-[var(--color-border)]',
        'bg-[var(--color-bg-secondary)]'
      )}
    >
      <div className="container py-12 md:py-16">
        {/* Olympic Rings — decorative */}
        <div className="flex justify-center mb-8">
          <OlympicRingsFooter size="md" />
        </div>

        {/* Main footer grid */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-12 text-center md:text-left">
          {/* Credits */}
          <div>
            <h3
              className="font-semibold mb-3"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-primary)',
              }}
            >
              Built With
            </h3>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Crafted with{' '}
              <a
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--country-accent-primary)]"
              >
                Claude Code
              </a>{' '}
              by{' '}
              <a
                href="https://galaxyco.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--country-accent-primary)]"
              >
                GalaxyCo.ai
              </a>
            </p>
          </div>

          {/* Colophon */}
          <div>
            <h3
              className="font-semibold mb-3"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-primary)',
              }}
            >
              Colophon
            </h3>
            <dl
              className="space-y-1"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <div className="flex flex-col md:flex-row md:gap-2 justify-center md:justify-start">
                <dt className="text-[var(--color-text-muted)]">Typography:</dt>
                <dd>{COLOPHON.typography}</dd>
              </div>
              <div className="flex flex-col md:flex-row md:gap-2 justify-center md:justify-start">
                <dt className="text-[var(--color-text-muted)]">Stack:</dt>
                <dd>{COLOPHON.stack}</dd>
              </div>
              <div className="flex flex-col md:flex-row md:gap-2 justify-center md:justify-start">
                <dt className="text-[var(--color-text-muted)]">Inspired by:</dt>
                <dd>{COLOPHON.inspiration}</dd>
              </div>
            </dl>
          </div>

          {/* External Links */}
          <div>
            <h3
              className="font-semibold mb-3"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-primary)',
              }}
            >
              Official Resources
            </h3>
            <ul className="space-y-2">
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--country-accent-primary)] transition-colors"
                    style={{
                      fontSize: 'var(--text-small)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {link.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div
          className="mt-12 pt-6 border-t text-center"
          style={{
            borderColor: 'var(--color-border)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            © 2026 Olympus. This is a demonstration project and is not affiliated
            with the International Olympic Committee or the Milan Cortina 2026
            Organizing Committee.
          </p>
        </div>
      </div>
    </footer>
  );
}
