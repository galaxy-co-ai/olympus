'use client';

/**
 * VideoShowcase — Orchestrator component
 *
 * Layout: 30% queue sidebar | 70% video player
 * Below: athlete ticker marquee
 *
 * Height: calc(100vh - 56px topbar - 64px padding - 72px ticker - 24px gap)
 */

import { VideoPlayer } from './VideoPlayer';
import { VideoQueue } from './VideoQueue';
import { AthleteTicker } from './AthleteTicker';
import { useVideoShowcase } from './useVideoShowcase';
import { getAmbientColor } from '@/lib/data/sport-colors';

export function VideoShowcase() {
  const {
    videos,
    activeIndex,
    activeVideo,
    isPlaying,
    selectVideo,
    advanceToNext,
    play,
  } = useVideoShowcase();

  return (
    <div className="noise-overlay flex flex-col gap-4">
      {/* Main showcase area: queue + player */}
      <div
        className="relative flex gap-4 rounded-xl"
        style={{
          height: 'calc(100vh - 216px)',
          minHeight: 400,
        }}
      >
        {/* Ambient glow behind player */}
        <div
          className="ambient-glow pointer-events-none absolute -z-10"
          style={{
            right: 0,
            top: '10%',
            width: '60%',
            height: '80%',
            filter: 'blur(80px)',
            borderRadius: '50%',
            backgroundColor: getAmbientColor(activeVideo.sport),
            opacity: 0.15,
            transition: 'background-color 1000ms ease-in-out',
          }}
          aria-hidden="true"
        />

        {/* Queue sidebar (~30%) */}
        <div
          className="w-[30%] min-w-[240px] shrink-0 overflow-hidden rounded-xl p-2"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          <VideoQueue
            videos={videos}
            activeIndex={activeIndex}
            onSelect={selectVideo}
          />
        </div>

        {/* Video player (~70%) */}
        <div className="flex-1 min-w-0 overflow-hidden rounded-xl">
          <VideoPlayer
            video={activeVideo}
            isPlaying={isPlaying}
            onPlay={play}
            onEnded={advanceToNext}
          />
        </div>
      </div>

      {/* Athlete ticker */}
      <AthleteTicker />
    </div>
  );
}
