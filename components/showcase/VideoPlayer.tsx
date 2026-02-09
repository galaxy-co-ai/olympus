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
import { motion, AnimatePresence } from 'framer-motion';
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

          {/* Top vignette for cinematic wrap */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: '30%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Play button overlay — frosted glass */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                'play-button-glass flex h-16 w-16 items-center justify-center rounded-full transition-interactive',
              )}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.5)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Play className="ml-1 h-7 w-7 text-white" fill="white" />
            </div>
          </div>

          {/* Bottom gradient with title — animated on video change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)',
                minHeight: '40%',
              }}
            >
              <span
                className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wider font-medium text-white/80"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              >
                {video.sport}
              </span>
              <h3
                className="font-semibold text-white leading-snug mt-1.5"
                style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
              >
                {video.title}
              </h3>
            </motion.div>
          </AnimatePresence>

        </button>
      )}

      {/* Accent progress bar — animates during playback */}
      {isPlaying && (
        <div
          key={video.id}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left"
          style={{
            backgroundColor: 'var(--country-accent-primary)',
            animation: `progress-bar ${video.duration}s linear forwards`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
