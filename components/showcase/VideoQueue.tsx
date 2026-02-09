'use client';

/**
 * VideoQueue — Vertical scrollable thumbnail sidebar
 *
 * Active thumbnail auto-scrolls into view.
 * Staggered entrance animation with Framer Motion.
 */

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoThumbnail } from './VideoThumbnail';
import type { Video } from '@/lib/types';

interface VideoQueueProps {
  videos: Video[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function VideoQueue({ videos, activeIndex, onSelect }: VideoQueueProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const activeEl = itemRefs.current[activeIndex];
    if (activeEl && containerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1"
      style={{ scrollbarWidth: 'thin' }}
    >
      <h2
        className="sticky top-0 z-10 px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider"
        style={{
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        Up Next
      </h2>

      {videos.map((video, i) => (
        <motion.div
          key={video.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: i * 0.04,
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          <VideoThumbnail
            video={video}
            index={i}
            isActive={i === activeIndex}
            onClick={() => onSelect(i)}
          />
        </motion.div>
      ))}
    </div>
  );
}
