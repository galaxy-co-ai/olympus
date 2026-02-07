'use client';

/**
 * StorySection — Full scroll-driven narrative experience
 *
 * Reference: OLYMPUS_CONSTITUTION.md Section 7
 * - Five chapters: Return, Dolomites, Two Cities, By the Numbers, Let the Games Begin
 * - Scroll-triggered reveals, sticky stats, typography showcase
 * - All content is real, factual content about Milan Cortina 2026
 * - The emotional core — transforms data into story
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollChapter } from './ScrollChapter';
import { ChapterDivider } from './ChapterDivider';
import { StickyStatBlock } from './StickyStatBlock';
import { AnimatedCounter } from './AnimatedCounter';
import { TypographyShowcase } from './TypographyShowcase';
import { ParallaxImage } from './ParallaxImage';
import { VenueCard } from './VenueCard';

export function StorySection() {
  return (
    <section className="py-24 sm:py-32" aria-label="The Story of Milan Cortina 2026">
      {/* Section title — entry point */}
      <ScrollChapter>
        <p
          className="text-sm uppercase tracking-[0.2em] text-center mb-4"
          style={{ color: 'var(--color-text-muted)' }}
        >
          The Story
        </p>
        <h2
          className="text-[clamp(32px,5vw,56px)] font-semibold text-center leading-[1.1] tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Milan Cortina 2026
        </h2>
      </ScrollChapter>

      <ChapterDivider />

      {/* ================================================================
          CHAPTER 1: Return to the Mountains
          Italy's Olympic homecoming after 70 years
          ================================================================ */}
      <ScrollChapter id="story-return">
        <p
          className="text-lg leading-relaxed text-center max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          In 1956, the world came to Cortina d&apos;Ampezzo for the VII Olympic Winter Games —
          the first to be broadcast on television. Seventy years later, the mountains are calling again.
        </p>
      </ScrollChapter>

      <StickyStatBlock
        stat="70"
        label="Years in the Making"
        sublabel="Cortina 1956 → Milan Cortina 2026"
      />

      <ScrollChapter>
        <p
          className="text-lg leading-relaxed text-center max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Italy has hosted the Winter Olympics twice before — Cortina in 1956 and Turin in 2006.
          Now, for the first time, two cities share the stage. Milan brings urban energy and architectural
          ambition. Cortina brings alpine intimacy and seven decades of anticipation.
        </p>
      </ScrollChapter>

      <ChapterDivider />

      {/* ================================================================
          CHAPTER 2: The Pale Mountains
          The Dolomites — UNESCO World Heritage, Enrosadira
          ================================================================ */}
      <ScrollChapter id="story-dolomites">
        <p
          className="text-sm uppercase tracking-[0.2em] text-center mb-6"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Chapter II
        </p>
        <h3
          className="text-[clamp(24px,4vw,40px)] font-semibold text-center leading-[1.15] tracking-tight mb-8"
          style={{ color: 'var(--color-text-primary)' }}
        >
          The Pale Mountains
        </h3>
        <p
          className="text-lg leading-relaxed text-center max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          The Dolomites — Le Pale in Ladin, &ldquo;the pale ones&rdquo; — are UNESCO World Heritage peaks
          of ancient coral reef limestone. At dawn and dusk, they glow pink and gold in a phenomenon
          called Enrosadira, when calcium magnesium carbonate catches the alpine light.
        </p>
      </ScrollChapter>

      {/* Typography showcase — the scroll-driven weight animation */}
      <TypographyShowcase
        text="Where the mountains meet the sky, where snow becomes speed, where nations become one."
      />

      {/* Subtle parallax mountain gradient behind this section */}
      <ParallaxImage variant="mountains">
        <ScrollChapter>
          <p
            className="text-lg leading-relaxed text-center max-w-2xl mx-auto py-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            These mountains have shaped Olympic history. The Cortina Sliding Centre sits on the site
            of the 1956 Olympic bobsled track. The Tofane peaks above Cortina will host Alpine Skiing —
            the same slopes where the legends of downhill were born.
          </p>
        </ScrollChapter>
      </ParallaxImage>

      <ChapterDivider />

      {/* ================================================================
          CHAPTER 3: Two Cities, One Dream
          Milan + Cortina venues
          ================================================================ */}
      <ScrollChapter id="story-cities" variant="wide">
        <p
          className="text-sm uppercase tracking-[0.2em] text-center mb-6"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Chapter III
        </p>
        <h3
          className="text-[clamp(24px,4vw,40px)] font-semibold text-center leading-[1.15] tracking-tight mb-12"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Two Cities, One Dream
        </h3>

        {/* Venue cards — 2-column grid on desktop, stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <VenueCard
            name="San Siro Stadium"
            event="Opening Ceremony"
            location="Milano"
            capacity="75,000"
            funFact="Known as 'The Temple of Football' — La Scala del Calcio"
          />
          <VenueCard
            name="Arena di Verona"
            event="Closing Ceremony"
            location="Verona"
            capacity="15,000"
            funFact="Roman amphitheater built ~30 AD — still hosts opera every summer"
          />
          <VenueCard
            name="Cortina Sliding Centre"
            event="Bobsleigh · Luge · Skeleton"
            location="Cortina d'Ampezzo"
            funFact="Built on the site of the 1956 Olympic track"
          />
          <VenueCard
            name="Livigno Snow Park"
            event="Snowboard · Freestyle Skiing"
            location="Livigno"
            funFact="Big air jump exceeds 160 feet tall"
          />
        </div>
      </ScrollChapter>

      <ChapterDivider />

      {/* ================================================================
          CHAPTER 4: By the Numbers
          Animated statistics
          ================================================================ */}
      <ScrollChapter id="story-numbers">
        <p
          className="text-sm uppercase tracking-[0.2em] text-center mb-6"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Chapter IV
        </p>
        <h3
          className="text-[clamp(24px,4vw,40px)] font-semibold text-center leading-[1.15] tracking-tight mb-16"
          style={{ color: 'var(--color-text-primary)' }}
        >
          By the Numbers
        </h3>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 max-w-3xl mx-auto text-center">
          <div>
            <AnimatedCounter
              value={16}
              className="block text-[clamp(36px,6vw,64px)] font-bold tracking-tight"
              style={{ color: 'var(--olympus-glacier)' }}
            />
            <span
              className="text-sm uppercase tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Sports
            </span>
          </div>
          <div>
            <AnimatedCounter
              value={116}
              className="block text-[clamp(36px,6vw,64px)] font-bold tracking-tight"
              style={{ color: 'var(--olympus-glacier)' }}
            />
            <span
              className="text-sm uppercase tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Medal Events
            </span>
          </div>
          <div>
            <AnimatedCounter
              value={93}
              className="block text-[clamp(36px,6vw,64px)] font-bold tracking-tight"
              style={{ color: 'var(--olympus-glacier)' }}
            />
            <span
              className="text-sm uppercase tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Countries
            </span>
          </div>
          <div>
            <AnimatedCounter
              value={2900}
              suffix="+"
              className="block text-[clamp(36px,6vw,64px)] font-bold tracking-tight"
              style={{ color: 'var(--olympus-glacier)' }}
            />
            <span
              className="text-sm uppercase tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Athletes
            </span>
          </div>
        </div>
      </ScrollChapter>

      <StickyStatBlock
        stat="1st"
        label="Olympic Debut"
        sublabel="Ski Mountaineering makes its first-ever Olympic appearance"
        accentColor="var(--olympus-dolomite)"
      />

      <ChapterDivider />

      {/* ================================================================
          CHAPTER 5: Let the Games Begin
          Transition back to live experience
          ================================================================ */}
      <ScrollChapter id="story-begin">
        <p
          className="text-sm uppercase tracking-[0.2em] text-center mb-6"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Chapter V
        </p>
        <h3
          className="text-[clamp(24px,4vw,40px)] font-semibold text-center leading-[1.15] tracking-tight mb-8"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Let the Games Begin
        </h3>
        <p
          className="text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          The story is being written right now — on the ice, on the slopes, in the mountains
          where legends are made. Every race, every routine, every record is a chapter waiting
          to unfold.
        </p>

        {/* CTAs back to the live experience */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent-primary)' }}
          >
            View Today&apos;s Schedule
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-[var(--color-surface-hover)]"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Explore Sports
          </Link>
          <Link
            href="/medals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-[var(--color-surface-hover)]"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Medal Standings
          </Link>
        </div>
      </ScrollChapter>
    </section>
  );
}
