/**
 * Sport Image Map — Curated Unsplash URLs for expanded pill backgrounds
 *
 * Each sport ID maps to a high-quality landscape photo.
 * Used with next/image fill + dark gradient overlay.
 * Requires `images.unsplash.com` in next.config remotePatterns.
 */

export const SPORT_IMAGES: Record<string, string> = {
  'alpine-skiing':
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  biathlon:
    'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80',
  bobsleigh:
    'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80',
  'cross-country-skiing':
    'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80',
  curling:
    'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&q=80',
  'figure-skating':
    'https://images.unsplash.com/photo-1547347298-4f21de2d4857?w=800&q=80',
  'freestyle-skiing':
    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80',
  'ice-hockey':
    'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800&q=80',
  luge:
    'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80',
  'nordic-combined':
    'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80',
  'short-track':
    'https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=800&q=80',
  skeleton:
    'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80',
  'ski-jumping':
    'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800&q=80',
  'ski-mountaineering':
    'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80',
  snowboard:
    'https://images.unsplash.com/photo-1522056615691-da7b8106c665?w=800&q=80',
  'speed-skating':
    'https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=800&q=80',
};

export function getSportImage(sportId: string): string | null {
  return SPORT_IMAGES[sportId] ?? null;
}
