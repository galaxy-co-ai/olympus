'use client';

/**
 * useVideoShowcase — State hook for video showcase
 *
 * Manages active video index, selection, and auto-advance.
 * Page-scoped state — no need for Zustand.
 */

import { useState, useCallback } from 'react';
import { VIDEOS } from '@/lib/data/videos';

export function useVideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeVideo = VIDEOS[activeIndex];

  const selectVideo = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
  }, []);

  const advanceToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    setIsPlaying(true);
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return {
    videos: VIDEOS,
    activeIndex,
    activeVideo,
    isPlaying,
    selectVideo,
    advanceToNext,
    play,
  };
}
