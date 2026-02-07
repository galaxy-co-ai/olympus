/**
 * Static Sports Data
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section V: Content Reference (lines 1205-1227)
 * - Section 4: Sport Cards (lines 755-776)
 */

import type { Sport } from '@/lib/types';

export const sports: Sport[] = [
  {
    id: 'alpine-skiing',
    name: 'Alpine Skiing',
    slug: 'alpine-skiing',
    venue: 'Tofane Centre / Stelvio',
    territory: 'Cortina / Bormio',
    eventCount: 11,
    isDebut: false,
    category: 'dynamic',
    description:
      'Racing down groomed snow runs, athletes compete for the fastest time in events including downhill, slalom, giant slalom, super-G, and combined.',
  },
  {
    id: 'biathlon',
    name: 'Biathlon',
    slug: 'biathlon',
    venue: 'Anterselva Arena',
    territory: 'Anterselva',
    eventCount: 11,
    isDebut: false,
    category: 'precision',
    description:
      'A demanding combination of cross-country skiing and rifle shooting, testing both endurance and precision under pressure.',
  },
  {
    id: 'bobsleigh',
    name: 'Bobsleigh',
    slug: 'bobsleigh',
    venue: 'Cortina Sliding Centre',
    territory: 'Cortina',
    eventCount: 4,
    isDebut: false,
    category: 'dynamic',
    description:
      'Teams of two or four navigate a narrow, twisting ice track at speeds exceeding 150 km/h in a gravity-powered sled.',
  },
  {
    id: 'cross-country-skiing',
    name: 'Cross-Country Skiing',
    slug: 'cross-country-skiing',
    venue: 'Tesero Stadium',
    territory: 'Tesero',
    eventCount: 12,
    isDebut: false,
    category: 'endurance',
    description:
      'The ultimate test of cardiovascular endurance, athletes race over varied terrain using either classic or skating technique.',
  },
  {
    id: 'curling',
    name: 'Curling',
    slug: 'curling',
    venue: 'Cortina Curling Stadium',
    territory: 'Cortina',
    eventCount: 3,
    isDebut: false,
    category: 'precision',
    description:
      'Teams slide polished granite stones across ice toward a target, using strategic sweeping to control speed and curl.',
  },
  {
    id: 'figure-skating',
    name: 'Figure Skating',
    slug: 'figure-skating',
    venue: 'Milano Ice Skating Arena',
    territory: 'Milano',
    eventCount: 5,
    isDebut: false,
    category: 'precision',
    description:
      'Athletes perform jumps, spins, and intricate footwork to music, judged on both technical elements and artistic presentation.',
  },
  {
    id: 'freestyle-skiing',
    name: 'Freestyle Skiing',
    slug: 'freestyle-skiing',
    venue: 'Livigno Snow Park / Aerials Park',
    territory: 'Livigno',
    eventCount: 13,
    isDebut: false,
    category: 'style',
    description:
      'Acrobatic skiing featuring aerials, moguls, halfpipe, slopestyle, and ski cross—where style meets athleticism.',
  },
  {
    id: 'ice-hockey',
    name: 'Ice Hockey',
    slug: 'ice-hockey',
    venue: 'Santagiulia Arena / Rho Arena',
    territory: 'Milano',
    eventCount: 2,
    isDebut: false,
    category: 'team',
    description:
      'Fast-paced team sport where players use sticks to shoot a puck into the opponent\'s goal while skating at high speeds.',
  },
  {
    id: 'luge',
    name: 'Luge',
    slug: 'luge',
    venue: 'Cortina Sliding Centre',
    territory: 'Cortina',
    eventCount: 4,
    isDebut: false,
    category: 'dynamic',
    description:
      'Athletes race feet-first on a small sled, navigating an icy track using subtle body movements at speeds over 140 km/h.',
  },
  {
    id: 'nordic-combined',
    name: 'Nordic Combined',
    slug: 'nordic-combined',
    venue: 'Predazzo / Tesero',
    territory: 'Predazzo / Tesero',
    eventCount: 3,
    isDebut: false,
    category: 'endurance',
    description:
      'A unique combination of ski jumping and cross-country skiing, testing both aerial skill and endurance.',
  },
  {
    id: 'short-track',
    name: 'Short Track Speed Skating',
    slug: 'short-track',
    venue: 'Milano Ice Skating Arena',
    territory: 'Milano',
    eventCount: 9,
    isDebut: false,
    category: 'style',
    description:
      'Pack-style racing on a 111-meter oval, featuring tight turns, strategic positioning, and thrilling photo finishes.',
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    slug: 'skeleton',
    venue: 'Cortina Sliding Centre',
    territory: 'Cortina',
    eventCount: 2,
    isDebut: false,
    category: 'dynamic',
    description:
      'Athletes race head-first on a small sled, their faces just inches from the ice at speeds exceeding 130 km/h.',
  },
  {
    id: 'ski-jumping',
    name: 'Ski Jumping',
    slug: 'ski-jumping',
    venue: 'Predazzo Stadium',
    territory: 'Predazzo',
    eventCount: 5,
    isDebut: false,
    category: 'precision',
    description:
      'Athletes launch from a steep ramp, flying through the air and landing with style, judged on distance and technique.',
  },
  {
    id: 'ski-mountaineering',
    name: 'Ski Mountaineering',
    slug: 'ski-mountaineering',
    venue: 'Stelvio Ski Centre',
    territory: 'Bormio',
    eventCount: 6,
    isDebut: true, // Olympic debut!
    category: 'endurance',
    description:
      'Making its Olympic debut, this grueling sport combines climbing and skiing through mountain terrain in a race against the clock.',
  },
  {
    id: 'snowboard',
    name: 'Snowboard',
    slug: 'snowboard',
    venue: 'Livigno Snow Park',
    territory: 'Livigno',
    eventCount: 11,
    isDebut: false,
    category: 'style',
    description:
      'From halfpipe to big air to snowboard cross, riders showcase aerial tricks, speed, and style on a single board.',
  },
  {
    id: 'speed-skating',
    name: 'Speed Skating',
    slug: 'speed-skating',
    venue: 'Milano Speed Skating Stadium',
    territory: 'Milano',
    eventCount: 14,
    isDebut: false,
    category: 'dynamic',
    description:
      'Athletes race around a 400-meter oval, reaching speeds over 60 km/h in pursuit of the fastest time.',
  },
];

export function getSportById(id: string): Sport | undefined {
  return sports.find((s) => s.id === id);
}

export function getSportBySlug(slug: string): Sport | undefined {
  return sports.find((s) => s.slug === slug);
}

export function getSportsByCategory(category: Sport['category']): Sport[] {
  return sports.filter((s) => s.category === category);
}
