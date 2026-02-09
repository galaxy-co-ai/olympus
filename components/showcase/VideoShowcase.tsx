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
    <div className="flex flex-col gap-4">
      {/* Main showcase area: queue + player */}
      <div
        className="flex gap-4 overflow-hidden rounded-xl"
        style={{
          height: 'calc(100vh - 216px)',
          minHeight: 400,
        }}
      >
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
        <div className="flex-1 min-w-0">
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
