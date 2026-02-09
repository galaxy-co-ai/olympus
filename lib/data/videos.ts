/**
 * Video Showcase — Olympic Highlight Dataset
 *
 * Real YouTube video IDs scraped from YouTube search results.
 * Lite-load pattern: thumbnail first, iframe on play.
 */

import type { Video } from '@/lib/types';

export const VIDEOS: Video[] = [
  {
    id: 'v-01',
    youtubeId: 'V6_nf1Hup-Y',
    title: 'Best Figure Skating Performances at the Olympics',
    sport: 'Figure Skating',
    duration: 612,
  },
  {
    id: 'v-02',
    youtubeId: 'hqHaqri-b6U',
    title: 'Short Track Speed Skating — Best Olympic Moments',
    sport: 'Short Track',
    duration: 480,
  },
  {
    id: 'v-03',
    youtubeId: '6vPS5voOkew',
    title: 'Alpine Skiing — Best Olympic Runs of All Time',
    sport: 'Alpine Skiing',
    duration: 540,
  },
  {
    id: 'v-04',
    youtubeId: 'e5mseV1dvXY',
    title: 'Biathlon — Most Dramatic Olympic Finishes',
    sport: 'Biathlon',
    duration: 390,
  },
  {
    id: 'v-05',
    youtubeId: 'CMReX9tfFqs',
    title: 'Snowboard Halfpipe — Best Tricks at the Olympics',
    sport: 'Snowboard',
    duration: 450,
  },
  {
    id: 'v-06',
    youtubeId: 'a42J5UhMtdE',
    title: 'Ice Hockey — Greatest Olympic Goals Ever',
    sport: 'Ice Hockey',
    duration: 720,
  },
  {
    id: 'v-07',
    youtubeId: 'JfgO5MdEns4',
    title: 'Freestyle Skiing — Best Olympic Moments',
    sport: 'Freestyle Skiing',
    duration: 360,
  },
  {
    id: 'v-08',
    youtubeId: 'JlbszPXZXoI',
    title: 'Cross-Country Skiing — Olympic Highlights',
    sport: 'Cross-Country',
    duration: 510,
  },
  {
    id: 'v-09',
    youtubeId: '4pCbOoNEtc4',
    title: 'Bobsled — Fastest Olympic Runs in History',
    sport: 'Bobsled',
    duration: 420,
  },
  {
    id: 'v-10',
    youtubeId: 'd6l5-6_gsTk',
    title: 'Ski Jumping — Best Olympic Jumps Ever',
    sport: 'Ski Jumping',
    duration: 480,
  },
];

/** Get a video's YouTube thumbnail URL */
export function getVideoThumbnail(video: Video): string {
  return video.thumbnail ?? `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
}

/** Format seconds to mm:ss display */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
