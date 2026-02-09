/**
 * Sport Ambient Colors — Predefined color map
 *
 * Hand-tuned hex colors for ambient glow behind the video player.
 * Avoids cross-origin canvas extraction from YouTube thumbnails.
 * Each color is chosen for harmony with the sport's visual identity.
 */

export const SPORT_AMBIENT_COLORS: Record<string, string> = {
  'Alpine Skiing': '#4A90D9',
  'Biathlon': '#2E7D32',
  'Bobsled': '#5C6BC0',
  'Cross-Country': '#558B2F',
  'Curling': '#0097A7',
  'Figure Skating': '#AB47BC',
  'Freestyle Skiing': '#F4511E',
  'Ice Hockey': '#1565C0',
  'Luge': '#D84315',
  'Nordic Combined': '#00695C',
  'Short Track': '#C62828',
  'Skeleton': '#4E342E',
  'Ski Jumping': '#00838F',
  'Snowboard': '#E65100',
  'Speed Skating': '#1976D2',
};

/** Get ambient color for a sport, falling back to glacier blue */
export function getAmbientColor(sport: string): string {
  return SPORT_AMBIENT_COLORS[sport] ?? '#7BA7C2'; // --olympus-glacier
}
