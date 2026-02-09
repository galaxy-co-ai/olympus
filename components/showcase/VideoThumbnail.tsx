'use client';

/**
 * VideoThumbnail — Queue card for individual video
 *
 * Shows YouTube thumbnail, title, sport badge, and duration.
 * Active state: left border accent, elevated background.
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getVideoThumbnail, formatDuration } from '@/lib/data/videos';
import type { Video } from '@/lib/types';

interface VideoThumbnailProps {
  video: Video;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function VideoThumbnail({ video, index, isActive, onClick }: VideoThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full gap-3 rounded-lg p-2 text-left transition-interactive',
        'border-l-2',
        isActive
          ? 'border-l-[var(--country-accent-primary)] bg-[var(--country-accent-surface)]'
          : 'border-l-transparent hover:bg-[var(--color-surface-hover)]'
      )}
      aria-label={`Play ${video.title}`}
      aria-current={isActive ? 'true' : undefined}
    >
      {/* Thumbnail */}
      <div className="relative h-[56px] w-[100px] shrink-0 overflow-hidden rounded-md"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <Image
          src={getVideoThumbnail(video)}
          alt=""
          fill
          sizes="100px"
          className="object-cover"
        />
        {/* Duration badge */}
        <span
          className="absolute bottom-0.5 right-0.5 rounded px-1 py-0.5 text-[10px] font-medium tabular-nums"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
          }}
        >
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <span
          className={cn(
            'line-clamp-2 text-xs font-medium leading-snug',
            isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
          )}
        >
          {video.title}
        </span>
        <span
          className="text-[10px]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {video.sport}
        </span>
      </div>

      {/* Queue number */}
      <span
        className="mt-1 shrink-0 text-[10px] tabular-nums"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {index + 1}
      </span>
    </button>
  );
}
