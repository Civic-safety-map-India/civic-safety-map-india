import type { CameraNode } from '../types/camera';

// Seed dataset for Delhi pilot: Connaught Place, Hauz Khas, India Gate, Chandni Chowk
export const INITIAL_DELHI_CAMERAS: CameraNode[] = [
  {
    id: 'osm-delhi-101',
    lat: 28.6315,
    lng: 77.2167,
    source: 'osm',
    tags: {
      name: 'Connaught Place Inner Circle - Block A',
      operator: 'Delhi Police / NDMC',
      surveillance: 'public',
    },
    operationalStatus: 'working',
    lastReportedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    reportCount: 14,
  },
  {
    id: 'osm-delhi-102',
    lat: 28.6338,
    lng: 77.2195,
    source: 'osm',
    tags: {
      name: 'Barakhamba Road Intersection',
      operator: 'Delhi Traffic Police',
      surveillance: 'outdoor',
    },
    operationalStatus: 'broken',
    lastReportedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    reportCount: 9,
  },
  {
    id: 'osm-delhi-103',
    lat: 28.6129,
    lng: 77.2295,
    source: 'osm',
    tags: {
      name: 'India Gate Radial Road - C-Hexagon',
      operator: 'Central Vista Security',
      surveillance: 'public',
    },
    operationalStatus: 'working',
    lastReportedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    reportCount: 31,
  },
  {
    id: 'osm-delhi-104',
    lat: 28.5494,
    lng: 77.2001,
    source: 'osm',
    tags: {
      name: 'Hauz Khas Village Entry Checkpoint',
      operator: 'SDMC / Local Market Association',
      surveillance: 'public',
    },
    operationalStatus: 'unsure',
    lastReportedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    reportCount: 5,
  },
  {
    id: 'osm-delhi-105',
    lat: 28.6507,
    lng: 77.2334,
    source: 'osm',
    tags: {
      name: 'Chandni Chowk Main Promenade',
      operator: 'Shahjahanabad Redevelopment Corp',
      surveillance: 'public',
    },
    operationalStatus: 'working',
    lastReportedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    reportCount: 18,
  },
  {
    id: 'osm-delhi-106',
    lat: 28.6562,
    lng: 77.2410,
    source: 'osm',
    tags: {
      name: 'Red Fort Outer Periphery',
      operator: 'ASI / Delhi Police',
      surveillance: 'public',
    },
    operationalStatus: 'broken',
    lastReportedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    reportCount: 7,
  },
];
