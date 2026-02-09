'use client';

/**
 * VideoPlayer — Lite YouTube embed with auto-advance
 *
 * Initial state: static thumbnail + play button (zero iframe).
 * On play: swaps to YouTube iframe with autoplay + JS API.
 * Listens for postMessage ENDED event to auto-advance.
 * Fallback timer at duration + 10s if no event received.
 *
 * Reference: YouTube IFrame Player API postMessage protocol
 */

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVideoThumbnail } from '@/lib/data/videos';
import type { Video } from '@/lib/types';

interface VideoPlayerProps {
  video: Video;
  isPlaying: boolean;
  onPlay: () => void;
  onEnded: () => void;
}

export function VideoPlayer({ video, isPlaying, onPlay, onEnded }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Listen for YouTube postMessage ENDED event
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        // YouTube API sends state 0 when video ends
        if (data.event === 'onStateChange' && data.info === 0) {
          onEnded();
        }
      } catch {
        // Not a JSON message from YouTube — ignore
      }
    },
    [onEnded]
  );

  useEffect(() => {
    if (!isPlaying) return;

    window.addEventListener('message', handleMessage);

    // Fallback timer in case postMessage doesn't fire
    fallbackTimerRef.current = setTimeout(() => {
      onEnded();
    }, (video.duration + 10) * 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimerRef.current);
    };
  }, [isPlaying, video.id, video.duration, handleMessage, onEnded]);

  // Reset fallback timer when video changes
  useEffect(() => {
    return () => {
      clearTimeout(fallbackTimerRef.current);
    };
  }, [video.id]);

  // Send listen command to YouTube iframe after load
  const handleIframeLoad = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'listening' }),
        'https://www.youtube.com'
      );
    }
  }, []);

  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {isPlaying ? (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          onLoad={handleIframeLoad}
        />
      ) : (
        /* Lite mode: thumbnail + play button overlay */
        <button
          onClick={onPlay}
          className="group relative h-full w-full cursor-pointer"
          aria-label={`Play ${video.title}`}
        >
          <Image
            src={getVideoThumbnail(video)}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
            priority
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full transition-interactive',
                'bg-[rgba(0,0,0,0.7)] group-hover:bg-[rgba(0,0,0,0.85)] group-hover:scale-110'
              )}
            >
              <Play className="ml-1 h-7 w-7 text-white" fill="white" />
            </div>
          </div>

          {/* Bottom gradient with title */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              minHeight: '40%',
            }}
          >
            <span className="text-sm font-medium text-white/70">{video.sport}</span>
            <h3 className="text-lg font-semibold text-white leading-snug">{video.title}</h3>
          </div>
        </button>
      )}
    </div>
  );
}
