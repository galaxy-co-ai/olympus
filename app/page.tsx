'use client';

/**
 * Olympus Home Page — Broadcast Dashboard
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 1: Hero / Landing Experience (lines 99-118)
 * - Section 5: Medal Tracker (lines 833-874)
 * - Section 6: Schedule & Timeline (lines 876-897)
 *
 * Day 2 of the Games — transformed into a near-zero-scroll broadcast dashboard.
 * HeroToolbar tabs switch between Live, Medals, and Schedule panels.
 */

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/hero';
import {
  type HeroTab,
  LivePanel,
  MedalsPanel,
  SchedulePanel,
} from '@/components/home';

/**
 * Get initial tab from URL hash (only on client)
 */
function getInitialTab(): HeroTab {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.slice(1);
    if (['live', 'medals', 'schedule'].includes(hash)) {
      return hash as HeroTab;
    }
  }
  return 'live';
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<HeroTab>(getInitialTab);

  // Update hash on tab change (skip initial mount)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.history.replaceState(null, '', `#${activeTab}`);
  }, [activeTab]);

  return (
    <div>
      {/* ================================================================
          SECTION 1: CINEMATIC HERO
          Full-viewport immersive experience with tabbed toolbar
          ================================================================ */}
      <HeroSection activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ================================================================
          SECTION 2: CONTENT PANEL
          Single panel that swaps based on active tab
          Sits above hero in z-index with opaque background
          ================================================================ */}
      <div
        className="relative z-20"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <section
          id="main-content"
          className="container max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'live' && <LivePanel key="live" />}
            {activeTab === 'medals' && <MedalsPanel key="medals" />}
            {activeTab === 'schedule' && <SchedulePanel key="schedule" />}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
